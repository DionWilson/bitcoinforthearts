# Reply Email to Jesse

**Status:** Ready to send once you fill in the `[bracketed]` fields.

**To:** [Jesse's email address]
**From:** donate@bitcoinforthearts.org (or hello@bitcoinforthearts.org — whichever is your usual)
**Subject:** Re: Donation receipts for tax return purposes — Feb 3 and April 19 donations
**Attachments:** 2 PDF receipts (see `01-receipt-feb-3-2026.md` and `02-receipt-april-19-2026.md` in this folder, after you fill them in and export to PDF)

---

## Email body — copy from here ↓

Hi Jesse,

Thank you so much for your donations and for the thoughtful technical questions — it's helpful for us as we improve the donor experience. Two PDF receipts are attached for your tax records, one for each donation.

Quick answers to your three points:

**1. Lightning vs on-chain transaction ID.** You're exactly right — Lightning payments don't have an on-chain transaction ID, only a payment hash and pre-image. Our automated email is generic and shows "(not available yet)" for that field on Lightning donations. Going forward we'll update that copy so it doesn't read like a missing piece of information for Lightning payers. The BTCPay invoice ID, the date, and the sats received are what matter for your records, and those are all on the receipt. The "Order ID" field in your Strike description was blank because we didn't pass an order number on this donation — that's our gap, not Strike's, and we'll start including a meaningful order ID on future invoices.

**2. Duplicate email.** Apologies for that. I'm investigating — most likely a webhook fired twice from BTCPay, but I want to confirm the cause before promising it won't happen again. You only made one donation that night and only one is being acknowledged; the duplicate was just the confirmation email, not a duplicate charge.

**3. Tax receipts.** Both attached. A few notes for tax-prep purposes:

- For the IRS, **Bitcoin is treated as property, not currency.** Your charitable deduction is the **fair market value at the time of donation**, which we've stated on each receipt as recorded by our BTCPay Server at the moment your Lightning payment settled.
- The IRS rule is that **the donor (you), not the charity, is ultimately responsible for documenting the FMV** of donated property. We're confirming the sats we received and the FMV BTCPay observed at that moment, which most CPAs accept as sufficient for non-cash gifts under $5,000.
- Both of your donations are well under the $5,000 threshold that would require IRS Form 8283 Section B and a qualified appraisal — the receipts as attached are sufficient documentation.
- Bitcoin For The Arts, Inc. is a 501(c)(3) tax-exempt nonprofit. Our EIN is **[EIN]**.
- **No goods or services were provided** in exchange for either donation.

**On the discrepancy you noted between BFTA's email ($5 / 6,685 sats) and Strike's display ($233.56 / 312,263 sats) for the April 19 donation:** the amount we confirm received in our receipt is **[amount BTCPay confirms — fill in after looking up the invoice]**, which is what BFTA can attest to. The figure shown on the Strike app may include other purchases or your total Bitcoin balance value (Strike's UI sometimes overlays running totals on the transaction view). If after reviewing the attached receipt you believe a different amount was actually intended for BFTA, please reply and we'll dig into it together.

Please let me know if you need anything else for your tax return — happy to send a corrected receipt if any detail needs adjusting after you review.

Thank you again for supporting sovereign creators and the BFTA mission.

Sincerely,

**Dion Wilson**
Founder & Director
Bitcoin For The Arts, Inc.
501(c)(3) | EIN: [EIN]
donate@bitcoinforthearts.org | bitcoinforthearts.org

---

## ↑ Stop copying here

## Before you send — checklist

- [ ] Fill in `[Jesse's email address]` in the To field
- [ ] Fill in **`[EIN]`** in two places in the email body (your nonprofit's IRS EIN)
- [ ] Look up both BTCPay invoices and fill in `[amount BTCPay confirms — fill in after looking up the invoice]` with the actual sats and USD that BTCPay recorded for the April 19 donation
- [ ] Generate the two PDF receipts (see `01-receipt-feb-3-2026.md` and `02-receipt-april-19-2026.md`)
- [ ] Attach both PDFs to the email
- [ ] Send from `donate@bitcoinforthearts.org` (or your usual donor-comms address)
