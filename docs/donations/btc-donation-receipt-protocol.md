# BTC / Lightning Donation Receipt Protocol

How BFTA handles donor requests for tax-purpose receipts on Bitcoin and Lightning donations. Run this protocol every time.

## When this protocol applies

Any time a donor requests a receipt **for tax purposes** for a Bitcoin (on-chain) or Lightning donation made through BTCPay Server. This is **separate** from:

- The auto-generated thank-you email BFTA sends on donation confirmation (which is a courtesy notification, not a tax receipt)
- The podcaster acknowledgment letter (`docs/art-zap-weekend/05` and `06`) — which covers donated *services*, not money/property
- Stripe / card donations (Stripe issues its own automatic receipt)

## The protocol — 6 steps

### 1. Find the BTCPay invoice

In BTCPay admin → **Invoices** → search by Invoice ID. The donor will usually quote it. If not, search by their email.

### 2. Capture the source-of-truth fields

For each invoice, write down (do not estimate):

| BTCPay field | Use it for |
|---|---|
| **Created (UTC date+time)** | Date of donation on the receipt |
| **Sats / BTC paid** | Amount of Bitcoin received |
| **Currency: USD, Amount** | Fair market value at time of receipt |
| **Payment method** (BTC vs BTC-LightningNetwork) | Determines whether to fill txid or payment hash |
| **TxId** (on-chain only) | On-chain payment ID |
| **Payment hash** (Lightning only) | Lightning payment proof |
| **Order ID / metadata** | Cross-reference if multiple donations from same donor |

> **Trust BTCPay, not the donor's wallet display.** Donors using Strike, Cash App, or other custodial wallets sometimes see UI overlays that combine balances and transactions. The receipt records what BFTA's BTCPay actually received.

### 3. Open the receipt template

`docs/donations/bitcoin-donation-receipt-template.md` — fill in every `[bracketed]` field with the data from step 2 + BFTA's standard info (EIN, address, etc.).

### 4. Generate a PDF

Either:
- Open the filled template in any markdown editor → export to PDF
- OR paste into Google Docs → File → Download → PDF Document
- OR print to PDF from your browser

Naming convention: `BFTA-Donation-Receipt-[Donor Last Name]-[YYYY-MM-DD].pdf` (e.g. `BFTA-Donation-Receipt-Smith-2026-04-19.pdf`)

### 5. Send the email

Use the template in `docs/donations/donor-receipt-reply-template.md` for any donor who has asked questions or wants context. For a simple receipt request with no questions, the email body can be short:

> Hi [Donor First Name],
>
> Thank you again for your donation to Bitcoin For The Arts. The attached PDF is your tax receipt for the contribution made on [date]. Please reach out if you need anything else for your tax return.
>
> Sincerely,
> Dion Wilson
> Founder & Director, Bitcoin For The Arts, Inc.
> 501(c)(3) | EIN: [EIN]

### 6. File and log

- Save the signed PDF in BFTA's records (`receipts/[year]/[Donor Last Name]-[YYYY-MM-DD].pdf` or however your nonprofit document storage is organized)
- Update donor database (CRM, spreadsheet, whatever you use) with: donor name, donation date, sats received, FMV USD, receipt sent date

---

## Edge cases

### "My wallet says I sent more (or less) than your receipt shows"

Most common cause: donor's wallet UI is showing a confusing overlay (Strike especially does this — the same screen often shows running balance, recent activity, AND the transaction). **Trust BTCPay's recorded amount.**

If after a careful review they still disagree, ask them to send:
- A screenshot of their wallet's transaction history showing the specific transaction
- The Lightning payment hash or on-chain txid

Then look up the invoice again. If BTCPay genuinely recorded a different amount than what was sent (rare but possible due to routing fees on Lightning, or partial payments), document the actual received amount. **The receipt always reflects what BFTA actually received**, which is what the donor can deduct.

### "I want a receipt for a donation I made months ago"

Same protocol. BTCPay keeps invoices indefinitely unless you've manually purged them. Look up by date range or donor email.

### "Can you send a receipt before I actually donate?"

No. The receipt documents what was received. Direct them to donate, then request the receipt.

### "I donated more than $5,000 — what about Form 8283?"

For non-cash contributions exceeding $5,000, the donor must obtain a **qualified appraisal** AND BFTA must sign **IRS Form 8283 Section B Part IV** acknowledging receipt. The donor will provide the form for BFTA to sign. The Director (or Board Treasurer) signs on behalf of the organization.

> Important: signing Form 8283 only acknowledges receipt of the property. It does NOT mean BFTA agrees with the donor's claimed FMV. The signature line says exactly that.

### "I want to donate stock or other non-BTC property"

Different protocol — that's outside this document. Loop in your CPA.

### Lightning vs on-chain — which fields apply?

- **Lightning:** Use the **payment hash** field. The "transaction ID" line on the receipt should say "N/A — Lightning payment." Lightning payments don't appear on the Bitcoin blockchain.
- **On-chain:** Use the **txid** field. The "payment hash" line should say "N/A — on-chain payment."

Either way, the BTCPay invoice ID is always recorded.

### Donor used a custodial wallet (Strike, Cash App, Wallet of Satoshi, etc.)

Receipt looks identical. The donor doesn't actually own the keys to the BTC, but for charitable contribution purposes the donor is the legal donor — they directed the property to BFTA. Strike (or whoever) is just the donor's intermediary.

---

## What the donor's CPA actually needs

For non-cash gifts under $5,000, a typical CPA will accept:

1. The dated, signed receipt from BFTA stating: amount received, FMV at time of receipt, no goods or services provided
2. The donor's own record of when they made the donation (their wallet/exchange transaction history)
3. BFTA's 501(c)(3) status (EIN on the receipt is sufficient; CPAs can verify against IRS Pub 78 / Tax Exempt Organization Search)

The receipt template above provides #1 and #3. The donor handles #2.

---

## When in doubt

Loop in a CPA before sending. The cost of one CPA-confirmed template is much lower than the cost of issuing dozens of receipts that get rejected on audit.
