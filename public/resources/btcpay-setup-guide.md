# BTCPay Setup Guide (BTC + Lightning)

This guide is for DIY fundraisers who want to accept Bitcoin and Lightning.

## Quick note about hosting
If your fundraiser page is on the public internet (e.g., Vercel), your BTCPay Server must be reachable via **public HTTPS**.

- **Works:** `https://pay.yourdomain.org`
- **Does not work for public websites:** `.local` (LAN-only) and `.onion` (Tor-only)

## Recommended fundraiser flow
1. **Use a BTCPay checkout link** (simple, shareable).
2. Add the link to your event page / social posts.
3. Place a QR code on flyers (BTCPay provides one on the checkout page).

## What to send us so we can help
Email `hello@bitcoinforthearts.org` with:
- Your event name + date
- Target goal
- Whether you need on-chain only or on-chain + Lightning
- Your preferred public URL (if you have one)

## Best practices
- Test a tiny payment first (both on-chain and Lightning).
- Keep the checkout link consistent across posts.
- Always verify the receiving wallet / store before publishing.

---
*This guide is informational and not security advice. If you’re unsure, ask for help before publishing a public donation link.*

