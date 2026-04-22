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

## What to do — in order (10 minutes total)

### Step 1 — Export each receipt to PDF (6 min)

Open each:

- `01-receipt-feb-3-2026.md` (the $21 donation)
- `02-receipt-april-19-2026.md` (the $231 Hard Cap Heroes Yearly membership)

**Both files are fully filled in** — confirmed BTCPay data, EIN 41-2642260, BFTA legal address (27 West 60th Street, PO Box 20069, New York, NY 10023). Only thing left is to add **today's date** at the "Date receipt issued" line in each.

Export each to PDF using whichever method you prefer (instructions at the bottom of each receipt file). Easiest:
1. Open the receipt file → copy everything between the START / END markers
2. Paste into Google Docs
3. Drop in the gold logo at the top — it lives in the repo at `public/resources/logos/exports/bfta-logo-gold.svg`
4. **File → Download → PDF Document**

Final filenames:
- `BFTA-Donation-Receipt-Jesse-2026-02-03.pdf`
- `BFTA-Donation-Receipt-Jesse-2026-04-19.pdf`

### Step 2 — Send the email (3 min)

Open `00-reply-email-to-jesse.md`. The email body is fully filled in (EIN, BFTA address, all the corrected amounts). Just copy the body between the START / STOP markers, paste into your email client, attach both PDFs, send to **jnm@jesseandjulie.com**.

### Step 3 — File and log (1 min)

- Save the signed PDFs in BFTA's records (`receipts/2026/Jesse-Markowitz-...`)
- Add Jesse to your donor database with **both** donations
- Mark him as your first Hard Cap Heroes Yearly Sovereign Circle member
- Mail him the welcome-kit sticker pack once he confirms his address
