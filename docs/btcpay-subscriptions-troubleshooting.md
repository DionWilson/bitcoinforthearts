# BTCPay Subscriptions — Troubleshooting Runbook

Use this when a member reports that a `https://donate.bitcoinforthearts.org/plan-checkout/plancheckout_XXX` link returns a 404 or 500 error (or the page just won't load).

---

## TL;DR — Two-step triage

1. **Stop the bleeding immediately:** In Vercel → Project → Settings → Environment Variables, set `NEXT_PUBLIC_BTCPAY_SUBSCRIPTIONS_DISABLED=1` and redeploy. The "Subscribe with Bitcoin" buttons disappear and members see a one-time Bitcoin payment button instead, so signups don't break entirely.
2. **Then fix the root cause in BTCPay** (see below). When fixed, remove the env var (or set to `0`) and redeploy.

---

## Why the URL fails

The URL pattern is `https://donate.bitcoinforthearts.org/plan-checkout/<plancheckout_id>`. When it 404s or 500s, **the website is generating the URL correctly** — the problem is on the BTCPay Server side, almost always one of these:

| # | Cause | How to confirm | Fix |
|---|---|---|---|
| 1 | **The Plan Checkout was deleted** in BTCPay (or its parent Plan / Offering was deleted). The cached link in `NEXT_PUBLIC_BTCPAY_*_PLAN` env var now points to nothing. | Log into BTCPay → Stores → [your store] → Subscriptions → Plan Checkouts. Search for the ID. If it's gone, this is your cause. | Recreate the Plan Checkout (steps below) and update the env var in Vercel. |
| 2 | **The Plan Checkout exists but is disabled / archived.** | Same place — find the Plan Checkout and check the Active toggle. | Re-enable it. |
| 3 | **The parent Offering or Plan was edited** in a way that invalidates the checkout (price set to 0, payment method removed, recurrence removed). | Open the Plan and check it has: a price > 0, a recurrence (monthly/yearly), and at least one enabled payment method (BTC and/or Lightning). | Fix the Plan settings, then save. |
| 4 | **The Subscriptions plugin is disabled or broken** after a BTCPay Server upgrade. | At BTCPay top right → Server Settings → Plugins. Confirm Subscriptions is installed and enabled. Also check Server Settings → Logs for stack traces. | Reinstall / re-enable the plugin and restart BTCPay. |
| 5 | **A BTCPay Server upgrade changed the URL format.** Older versions used `/checkout/...`, newer subscription URLs use `/plan-checkout/...`. | Open BTCPay → the Plan → click "Plan Checkout link" and copy the URL it shows. Compare to what's in env vars. | Update the env var to match the new URL pattern (see "If BTCPay changed the URL format" below). |
| 6 | **The Plan Checkout has a "subscriber identity required" setting** that is incompatible with anonymous checkout. | Open the Plan Checkout and check whether it requires a logged-in subscriber. | Either turn off identity-required, or switch the website to use one-time invoices for now (kill-switch). |

---

## Repair: recreate a Plan Checkout

For each of the 5 monthly + 5 annual circles in the Sovereign Circle:

1. Log into BTCPay Server (`https://donate.bitcoinforthearts.org`)
2. Stores → [your store] → **Subscriptions**
3. Make sure there is one **Offering** called "Sovereign Circle Membership" (or similar). If not, create it.
4. Under that Offering, you need 10 **Plans** (one per amount + cadence):

| Tier | Cadence | Amount (USD) |
|---|---|---|
| Friends of Satoshi Circle | Monthly | $5 |
| Friends of Satoshi Circle | Annual | $55 |
| Orange Pilling Friends Circle | Monthly | $11 |
| Orange Pilling Friends Circle | Annual | $121 |
| Hard Cap Heroes | Monthly | $21 |
| Hard Cap Heroes | Annual | $231 |
| Sovereign Leaders Circle | Monthly | $51 |
| Sovereign Leaders Circle | Annual | $561 |
| Renaissance Guardian Circle | Monthly | $101 |
| Renaissance Guardian Circle | Annual | $1,111 |

For each Plan, set:

- **Currency:** USD
- **Price:** as in the table
- **Recurrence:** Monthly or Yearly (matching the row)
- **Payment methods:** enable BTC on-chain + Lightning
- **Allow public anonymous checkout:** ON (otherwise non-members will hit a login wall)
- **Save**

5. For each Plan, open it and click **"Plan Checkout link"** (or "Generate Plan Checkout"). Copy the URL — it should look like:

   ```
   https://donate.bitcoinforthearts.org/plan-checkout/plancheckout_XXXXXXXXXXXXXX
   ```

6. **Test each link in an incognito window before publishing.** Open the URL, confirm the BTCPay payment screen renders with the right price + payment options. Do not move to step 7 until every link renders without 500/404.

7. Update the matching env var in **Vercel → Project → Settings → Environment Variables**:

   | Tier | Cadence | Env var name |
   |---|---|---|
   | $5 | Monthly | `NEXT_PUBLIC_BTCPAY_MONTHLY_5_PLAN` |
   | $55 | Annual | `NEXT_PUBLIC_BTCPAY_ANNUAL_55_PLAN` |
   | $11 | Monthly | `NEXT_PUBLIC_BTCPAY_MONTHLY_11_PLAN` |
   | $121 | Annual | `NEXT_PUBLIC_BTCPAY_ANNUAL_121_PLAN` |
   | $21 | Monthly | `NEXT_PUBLIC_BTCPAY_MONTHLY_21_PLAN` |
   | $231 | Annual | `NEXT_PUBLIC_BTCPAY_ANNUAL_231_PLAN` |
   | $51 | Monthly | `NEXT_PUBLIC_BTCPAY_MONTHLY_51_PLAN` |
   | $561 | Annual | `NEXT_PUBLIC_BTCPAY_ANNUAL_561_PLAN` |
   | $101 | Monthly | `NEXT_PUBLIC_BTCPAY_MONTHLY_101_PLAN` |
   | $1,111 | Annual | `NEXT_PUBLIC_BTCPAY_ANNUAL_1111_PLAN` |

   The value is **just the `plancheckout_XXXX` ID** — not the full URL. The website prepends the host automatically.

8. Remove `NEXT_PUBLIC_BTCPAY_SUBSCRIPTIONS_DISABLED` from Vercel (or set to `0`).
9. **Redeploy** (Vercel → Deployments → Redeploy latest).
10. Visit `/donate/monthly` in an incognito window and click each Bitcoin subscribe button to confirm.

---

## If BTCPay changed the URL format

If the link copied from BTCPay does **not** start with `/plan-checkout/plancheckout_`, the URL pattern in the website code is out of date. As of the time of this fix, the validated pattern is:

```
https://<btcpay-host>/plan-checkout/plancheckout_XXXXXXXX
```

If your BTCPay shows a different format (for example `/subscriptions/...` or `/checkout/...`), update the helper in `app/donate/monthly/page.tsx`:

```ts
function btcSubUrl(value: string) {
  if (!value) return '';
  if (value.startsWith('http')) return value;
  if (!btcpayBase) return '';
  return `${btcpayBase}/plan-checkout/${value}`;
}
```

— and replace `/plan-checkout/` with whatever path your BTCPay version uses. Or, simpler: paste the **full URL** into the env var (the helper will use it as-is when it starts with `http`).

---

## Kill-switch behavior (what users see when subscriptions are disabled)

When `NEXT_PUBLIC_BTCPAY_SUBSCRIPTIONS_DISABLED=1`:

- All "Subscribe with Bitcoin — $X / mo" and "Subscribe with Bitcoin — $X / yr" buttons disappear.
- They are replaced with **"Bitcoin one-time — $X"** buttons that hit the existing `/api/btcpay/create-invoice` endpoint and create a regular one-time BTCPay invoice.
- Card / traditional payment buttons (Stripe) are unaffected.
- Members can still pay; they just won't be on a recurring schedule. They will need to return next month to renew, which is the same UX as before subscriptions existed.

This is the right state to be in any time BTCPay subscriptions are flaky — you keep the donation flow alive and avoid blocking signups while you debug.

---

## Long-term: a status check

If this happens again, consider adding a daily Vercel cron job (or external uptime check) that hits each Plan Checkout URL and posts to your Signal/email if any return ≥ 400. The email cost is zero and it would have caught this issue before a member did.
