# BTCPay Server theme + integration assets

This folder holds artifacts that live on the BTCPay Server side of BFTA's stack rather than inside the Next.js codebase. The website itself is at `app/` — this is for things you upload into BTCPay's admin UI.

## Files

| File | Purpose |
| --- | --- |
| **`bfta-checkout.css`** | Custom CSS uploaded to BTCPay → Stores → Settings → "Customize the look" / Custom CSS file. Re-skins the BTCPay-hosted invoice / checkout / receipt pages to match `bitcoinforthearts.org`'s brand kit (cream background, orange CTAs, lime success states). |

## How to apply `bfta-checkout.css`

1. Log into BTCPay Server admin.
2. **Stores** → click your store → in the left sidebar, look for **Settings** → **"Customize the look"** (some BTCPay versions label this "Theme" or "Branding").
3. Find the **Custom CSS** field — it's a file picker that accepts a `.css` file.
4. Upload `docs/btcpay/bfta-checkout.css` from this repo (download from GitHub, or click "View raw" and save the file).
5. Save the store settings.
6. **Test:** open `https://bitcoinforthearts.org/donate`, click "Pay with Bitcoin," follow through to the BTCPay-hosted invoice page. The page should now use cream background, orange accents, BFTA fonts.

## When to re-upload

Re-upload this file whenever:

- BTCPay Server is upgraded to a major version and styling regresses (rare but possible — BTCPay sometimes restructures its DOM, which can break selectors in this CSS).
- You edit `bfta-checkout.css` in this repo (e.g. to adjust palette, fonts, or add new selectors). Vercel does not push CSS into BTCPay automatically; the upload is manual.
- You spin up a new BTCPay store. Each store has its own custom CSS slot.

## Maintenance notes

- **The `:root` block at the top is the safest part of this file.** It overrides BTCPay's documented CSS custom properties (`--btcpay-*` and `--bs-*` Bootstrap fallbacks). Even if BTCPay restructures markup in a future release, the palette swap will likely keep working.
- **Element-level rules below `:root` are more brittle.** They target specific class names on the rendered page. If BTCPay changes a class name, that rule becomes a no-op. Symptom: parts of the page revert to default (white, blue) after a BTCPay upgrade. Fix: open the live page in DevTools, find the new class name, update the corresponding selector here.
- **Do not hide "Powered by BTCPay"** — BTCPay Server's branding policy requires this attribution. The CSS retints it but keeps it visible.
- **Test after each upgrade.** Make a $1 test invoice on BTCPay, walk through the donor flow yourself, eyeball every page (invoice, payment-pending, expired, settled receipt). Anything that looks default-Bootstrap is a selector that needs updating.

## When to retire this file

Long-term, the better solution is to embed the BTCPay payment flow directly in `bitcoinforthearts.org/donate` so donors never see BTCPay's hosted pages at all. That's tracked separately and doesn't block this CSS from being useful in the meantime. When the embedded flow ships, the BTCPay-hosted checkout becomes a fallback that few donors will see — at that point this CSS becomes lower-priority polish but is still worth keeping as a safety net.
