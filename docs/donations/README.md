# BFTA Donation Documentation Templates

How to handle donor requests for tax receipts on Bitcoin / Lightning donations.

## Files

| File | Use it when... |
|---|---|
| `bitcoin-donation-receipt-template.md` | A donor needs a **proper tax receipt** for a BTC/Lightning donation. Fill in `[brackets]`, sign, send as PDF. Covers the IRS rules for non-cash charitable contributions of cryptocurrency. |
| `donor-receipt-reply-template.md` | You're **replying to a donor's email** asking for the receipt. 3 templates: simple request, donor-with-questions, apology+correction. |
| `btc-donation-receipt-protocol.md` | The **6-step process** for issuing receipts: find invoice, capture data, fill template, generate PDF, send, file. Plus edge cases (Form 8283, amount discrepancies, custodial wallets, etc.). |

## When to use what

```
Donor donates BTC / Lightning
    │
    ▼
Auto-email confirmation goes out (BTCPay → BFTA's existing system)
    │
    ▼
Donor emails asking for tax receipt
    │
    ├──► Simple ask, no questions   ──► Reply Template 1 + receipt PDF
    │
    ├──► Donor has questions        ──► Reply Template 2 + receipt PDF
    │
    └──► BFTA made a mistake        ──► Reply Template 3 + corrected receipt PDF
```

For ANY of those paths, the **receipt PDF** is generated from `bitcoin-donation-receipt-template.md` following the protocol in `btc-donation-receipt-protocol.md`.

## Pre-flight checklist (do once)

- [ ] **Get your CPA's blessing on `bitcoin-donation-receipt-template.md`.** The language is consistent with current IRS guidance for cryptocurrency donations (Notice 2014-21, FAQs on Virtual Currency Transactions) but should be reviewed for your specific 501(c)(3) circumstances.
- [ ] Confirm your **EIN** and update placeholders in all three files.
- [ ] Confirm BFTA's **legal mailing address** for the donor-facing receipt and update placeholders.
- [ ] Decide on a **file naming convention** for receipt PDFs (suggested: `BFTA-Donation-Receipt-[Donor Last Name]-[YYYY-MM-DD].pdf`)
- [ ] Set up a **donor database / spreadsheet** if you don't have one (CRM, Google Sheet, whatever — just one source of truth)

## Out of scope for these templates

- **Stripe / card donations** — Stripe issues automatic tax receipts; no manual work needed
- **Stock / appreciated securities donations** — different IRS rules; loop in your CPA
- **Donated services** (e.g., podcaster hosting time, donated artist time) — see `docs/art-zap-weekend/05-podcaster-acknowledgment-letter-template.md` and `06-podcaster-acknowledgment-letter-fillable.md`. Services are NOT tax-deductible per IRS Pub 526; the acknowledgment letter is the right document for those.
- **Donations of physical goods** (artwork, hardware wallets, etc.) — same IRS framework as crypto (FMV at time of donation), but the receipt language needs slight adjustment. Adapt the BTC template if the volume warrants it.
