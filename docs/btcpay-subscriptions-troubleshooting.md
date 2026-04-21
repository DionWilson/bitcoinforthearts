# BTCPay Subscriptions — Troubleshooting Runbook

Use this when subscription / Plan Checkout pages are broken on `donate.bitcoinforthearts.org`.

---

## TL;DR for the current outage

- **Diagnosis:** every `https://donate.bitcoinforthearts.org/plan-checkout/<anything>` returns **HTTP 500** with empty body and content-length 0 — including non-existent IDs that should return 404. The Subscriptions plugin is crashing at the controller level, not at the data lookup level. This is post-upgrade breakage, not a deleted plan.
- **Fix path:** SSH in → grab the BTCPay container stack trace → run a clean upgrade-and-restart cycle → if needed, re-apply database migrations. Steps are in §3 below.
- **Optional safety net:** in Vercel, set `NEXT_PUBLIC_BTCPAY_SUBSCRIPTIONS_DISABLED=1` and redeploy. Subscribe-with-Bitcoin buttons fall back to one-time invoices so signups don't break while you fix the server. (You said you don't want this for now — leaving it documented.)

---

## 1. Diagnostic evidence (so you don't have to re-prove it)

Run these from any machine with `curl`:

```bash
# Healthy: BTCPay root redirects to login — the server itself is up
curl -sI https://donate.bitcoinforthearts.org/
# HTTP/2 302   Location: /login?ReturnUrl=%2F

# BROKEN: real Plan Checkout ID returns 500 with empty body
curl -sI https://donate.bitcoinforthearts.org/plan-checkout/plancheckout_2wNcJxX3ciboUcS3MX
# HTTP/2 500   content-length: 0

# BROKEN: nonsense Plan Checkout ID also returns 500 — proves the controller itself is crashing
curl -sI https://donate.bitcoinforthearts.org/plan-checkout/plancheckout_doesnotexist123
# HTTP/2 500   content-length: 0

# Routing OK: bare /plan-checkout (no ID) returns 404 — so nginx and routing are fine
curl -sI https://donate.bitcoinforthearts.org/plan-checkout
# HTTP/2 404
```

**Why this matters:** if only one specific plan were broken (deleted, archived, etc.), random IDs would return 404 and only the real ID would 500. The fact that *every* ID returns 500 with no rendered error page means an unhandled exception is firing in the Subscriptions controller before it reaches the lookup layer. That is the classic shape of a **partially-applied or incompatible database migration after a BTCPay version upgrade**, or a **plugin / core version mismatch.**

---

## 2. Most likely root causes (in priority order, given the evidence above)

| # | Cause | Likelihood | Fix |
|---|---|---|---|
| 1 | Database migration for the Subscriptions schema did not fully apply during the upgrade. The controller boots but throws when it queries a column/table that doesn't match what the new code expects. | **High** | §3 — restart cycle; if logs show migration errors, force migrations to re-run |
| 2 | A pinned external Subscriptions plugin is on a version mismatched with the core BTCPay version. Subscriptions is part of core in newer BTCPay (v2.x), but if you previously had a separate plugin installed it can collide. | **High** | §4 — check installed plugins, uninstall old standalone Subscriptions plugin if present |
| 3 | The upgrade was interrupted (network, OOM, killed midway) and left containers in a half-restarted state. | Medium | §3 step A — full down-up cycle |
| 4 | Postgres ran out of disk or shared memory and the migration silently failed. | Medium | §3 step C — `df -h` and Postgres logs |
| 5 | A specific Plan / Plan Checkout / Offering has invalid data (bad recurrence, NULL where NOT NULL, etc.) that the new schema rejects on every render. | Lower (would normally only break that specific plan, not all) | §5 — identify and fix the bad row |

---

## 3. Fix procedure (run this in order)

You'll need SSH access to the server running BTCPay. Replace `your-vps` with the actual host.

### Step A — Get into the server and find the BTCPay containers

```bash
ssh root@your-vps
sudo su -
cd btcpayserver-docker
docker ps
```

You should see containers like `generated_btcpayserver_1`, `generated_postgres_1`, `nginx-gen`, `nginx`, `letsencrypt-nginx-proxy-companion`. Note the exact names; they may differ slightly.

### Step B — Pull the BTCPay stack trace (this is the gold)

```bash
docker logs --tail 300 generated_btcpayserver_1 2>&1 | tail -200
```

Look for a stack trace mentioning **Subscription**, **PlanCheckout**, **Migration**, **Npgsql**, or **EntityFramework**. The first such trace tells you exactly which migration or query is failing.

Save the output to a file you can reference:

```bash
docker logs --tail 1000 generated_btcpayserver_1 > /root/btcpay-debug-$(date +%Y%m%d).log 2>&1
```

If you want to send it to me to interpret, paste the last ~200 lines or attach the file.

### Step C — Sanity check disk and Postgres

```bash
df -h                                                # any volume above ~90% is suspect
docker logs --tail 200 generated_postgres_1 2>&1 | tail -100
```

If disk is full or Postgres logs show shutdown / OOM / "no space left on device" — fix that first (free space or add disk), then go to step D.

### Step D — The standard "clean upgrade & restart" cycle

This is BTCPay's official recommended fix when something breaks after an update. It re-pulls the current images and restarts everything cleanly, which on its own re-runs any pending migrations.

```bash
cd /root/btcpayserver-docker          # or wherever yours lives
./btcpay-update.sh
```

If `btcpay-update.sh` is not present (some deployments use different names):

```bash
cd /root/btcpayserver-docker
git pull
./btcpay-setup.sh -i
```

Wait until it finishes ("BTCPay Server is now configured" or similar). Then:

```bash
docker ps                             # all containers should be Up
docker logs --tail 100 generated_btcpayserver_1
curl -sI https://donate.bitcoinforthearts.org/plan-checkout/plancheckout_doesnotexist123
```

If the test curl now returns **404** instead of 500, the controller is healthy again — proceed to Step F.

### Step E — If 500 persists after restart: force migrations

If the BTCPay log still shows a `Migration` / `Npgsql` / `column does not exist` error, the schema is still out of sync. Restart with a forced migration:

```bash
cd /root/btcpayserver-docker
docker compose -f Generated/docker-compose.generated.yml restart btcpayserver
docker logs -f generated_btcpayserver_1
```

Watch the startup log. You should see migration lines applying cleanly. If it crashes in the same spot, that's the place to grab the exact exception text — at that point, the right next move is to post the trace into BTCPay's support Mattermost (`chat.btcpayserver.org` → #support) with:

> "After upgrade to vX.X.X, all `/plan-checkout/<anything>` URLs return HTTP 500 with empty body. BTCPay log shows: \<paste your stack trace\>. What's the right migration / rollback path?"

This is a known-style failure and the BTCPay maintainers respond to specific stack traces in hours.

### Step F — Verify the fix

```bash
# Should now be 404 (route works, plan not found)
curl -sI https://donate.bitcoinforthearts.org/plan-checkout/plancheckout_doesnotexist123

# Should now be 200 (route works, plan exists)
curl -sI https://donate.bitcoinforthearts.org/plan-checkout/plancheckout_2wNcJxX3ciboUcS3MX
```

Then in a private/incognito browser window, open the real URL and confirm the BTCPay payment screen loads with the right amount and BTC + Lightning options. Repeat for one URL of each tier.

---

## 4. If a standalone Subscriptions plugin is installed

In newer BTCPay (v2.x), Subscriptions are part of core. If at some point you installed a separate "Subscriptions" plugin and then upgraded, the old plugin can collide with the new core code and crash the controller.

1. BTCPay UI → top-right gear → **Server Settings** → **Plugins**
2. If "Subscriptions" appears as an *installed plugin* (not as part of core), uninstall it
3. Restart BTCPay (Server Settings → "Restart" button, or `docker restart generated_btcpayserver_1`)
4. Re-test `/plan-checkout/plancheckout_doesnotexist123` — should be 404, not 500

---

## 5. If the controller is healthy but a specific plan still 500s

(Only relevant after Step F shows the controller is fixed and most plans work.)

1. BTCPay → Stores → [your store] → **Subscriptions** → Plans
2. Open each plan and confirm:
   - Currency is set
   - Price > 0
   - Recurrence is set (Monthly or Yearly)
   - At least one payment method (BTC and/or Lightning) is enabled
   - Anonymous public checkout is allowed (otherwise non-members hit a login wall)
3. Click "Plan Checkout link" on each Plan and copy the new ID. Test it in incognito.
4. If a specific plan still 500s while others work, recreate that one plan from scratch and update the env var (table in §7).

---

## 6. Optional safety net — kill-switch on the website

If you want signups to keep working while BTCPay is being repaired, set this in Vercel and redeploy:

```
NEXT_PUBLIC_BTCPAY_SUBSCRIPTIONS_DISABLED=1
```

Effect:
- All "Subscribe with Bitcoin — $X / mo" buttons disappear
- They are replaced with **"Bitcoin one-time — $X"** buttons that hit `/api/btcpay/create-invoice` and create a regular one-time BTCPay invoice (which uses a different code path that is not affected by the Subscriptions plugin)
- Card / Stripe buttons unaffected
- When BTCPay is fixed, remove the env var (or set to `0`) and redeploy

---

## 7. Env-var reference (Vercel → Project → Environment Variables)

The website builds Plan Checkout URLs as `${NEXT_PUBLIC_BTCPAY_URL}/plan-checkout/${ENV_VAR_VALUE}`. The value is **just the `plancheckout_XXX` ID** (not the full URL). If you paste a full URL, the helper will use it as-is.

| Tier | Cadence | Env var name |
|---|---|---|
| Friends of Satoshi Circle ($5) | Monthly | `NEXT_PUBLIC_BTCPAY_MONTHLY_5_PLAN` |
| Friends of Satoshi Circle ($55) | Annual | `NEXT_PUBLIC_BTCPAY_ANNUAL_55_PLAN` |
| Orange Pilling Friends Circle ($11) | Monthly | `NEXT_PUBLIC_BTCPAY_MONTHLY_11_PLAN` |
| Orange Pilling Friends Circle ($121) | Annual | `NEXT_PUBLIC_BTCPAY_ANNUAL_121_PLAN` |
| Hard Cap Heroes ($21) | Monthly | `NEXT_PUBLIC_BTCPAY_MONTHLY_21_PLAN` |
| Hard Cap Heroes ($231) | Annual | `NEXT_PUBLIC_BTCPAY_ANNUAL_231_PLAN` |
| Sovereign Leaders Circle ($51) | Monthly | `NEXT_PUBLIC_BTCPAY_MONTHLY_51_PLAN` |
| Sovereign Leaders Circle ($561) | Annual | `NEXT_PUBLIC_BTCPAY_ANNUAL_561_PLAN` |
| Renaissance Guardian Circle ($101) | Monthly | `NEXT_PUBLIC_BTCPAY_MONTHLY_101_PLAN` |
| Renaissance Guardian Circle ($1,111) | Annual | `NEXT_PUBLIC_BTCPAY_ANNUAL_1111_PLAN` |

---

## 8. Long-term: an uptime check

Once this is fixed, add a simple scheduled curl (Vercel cron, GitHub Actions cron, or any uptime monitor) that hits one of the Plan Checkout URLs every hour. Alert if the response is anything other than 200. This would have caught the current outage before a member did.

Recommended check (GitHub Actions cron, runs hourly, free):

```yaml
# .github/workflows/btcpay-uptime.yml
name: BTCPay Uptime
on:
  schedule:
    - cron: '0 * * * *'
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - run: |
          STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
            "https://donate.bitcoinforthearts.org/plan-checkout/${PLAN_ID}")
          echo "Status: $STATUS"
          if [ "$STATUS" != "200" ]; then
            echo "BTCPay subscription endpoint unhealthy: $STATUS"
            exit 1
          fi
        env:
          PLAN_ID: ${{ secrets.BTCPAY_HEALTHCHECK_PLAN_ID }}
```
