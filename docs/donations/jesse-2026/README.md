# Jesse — Donation Receipt Package (Feb + April 2026) — READY TO SEND

Everything you need to respond to Jesse's email and send him two tax receipts. **As of latest commit, the email body and both receipts are filled in with confirmed BTCPay data + EIN 41-2642260.** Just need to: verify mailing addresses, export receipts to PDF, attach, send.

## Important findings from the BTCPay data

- **Feb 3 donation = $21.00 / 27,674 sats.** Pure one-time donation, fully deductible. (Donor's wallet showed $21.23 / 28,384 — the difference is normal Lightning routing fees.)
- **April 19 donation = $231.00 / 310,644 sats** — NOT $5 as Jesse remembered. This is his **Hard Cap Heroes Yearly Sovereign Circle membership**. The $5 figure he saw is the FMV of the welcome-kit sticker pack listed in the membership perks. **Deductible portion = $226** (the $5 sticker-pack FMV must be subtracted per IRS rules). Receipt explains this clearly.
- **Jesse is your first paid Sovereign Circle member through the relaunched subscription system.** Plan checkout `plancheckout_5eZU2zZxMk6t2c73da` worked end-to-end. Worth acknowledging in the reply.
- **Duplicate email cause confirmed:** BTCPay fires both `InvoiceSettled` AND `InvoicePaymentSettled` webhooks; your email handler is sending a confirmation for each. Real bug, knowable fix. Separate from Jesse's reply.

## Files in this folder

| File | What it is |
|---|---|
| `00-reply-email-to-jesse.md` | The reply email — fill in `[brackets]`, paste into your email client, attach the two PDFs |
| `01-receipt-feb-3-2026.md` | Receipt for the **Feb 3** donation (BTCPay invoice `TfKwZfriMje17QzXPoJASr`) — fill in, export to PDF |
| `02-receipt-april-19-2026.md` | Receipt for the **April 19** donation (BTCPay invoice `452LCoUipXQGFTdNpKxi2e`) — fill in, export to PDF |

## What to do — in order (15 minutes total)

### Step 1 — Verify the two receipts and export each to PDF (10 min)

Open each:

- `01-receipt-feb-3-2026.md` (the $21 donation)
- `02-receipt-april-19-2026.md` (the $231 Hard Cap Heroes Yearly membership)

Each one is filled in with confirmed BTCPay data and EIN 41-2642260. Three things you may want to add or check before exporting to PDF:

1. **BFTA's legal mailing address** — there's a `[BFTA legal mailing address]` placeholder near the top. Add yours.
2. **Jesse's mailing address** — leave blank if you don't have it on file. The April 19 receipt + welcome kit shipping makes it useful to ask Jesse for it (the email already does this).
3. **Date receipt issued** — fill in today's date.

Then export each to PDF using whichever method you prefer (Google Docs / online tool / browser print — instructions are at the bottom of each receipt file).

Final filenames should be:
- `BFTA-Donation-Receipt-Jesse-2026-02-03.pdf`
- `BFTA-Donation-Receipt-Jesse-2026-04-19.pdf`

### Step 2 — Send the email (3 min)

Open `00-reply-email-to-jesse.md`. The email body is already filled in. Sanity-check the EIN line, copy the body into your email client (between the START / STOP markers), attach both PDFs, send to **jnm@jesseandjulie.com**.

### Step 3 — File and log (2 min)

- Save the signed PDFs in BFTA's records (`receipts/2026/Jesse-Markowitz-...`)
- Add Jesse to your donor database with **both** donations
- Mark him as your first Hard Cap Heroes Yearly Sovereign Circle member
- Mail him the welcome-kit sticker pack once he confirms his address
