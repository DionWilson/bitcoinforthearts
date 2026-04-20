# Reply Email to Jesse — READY TO SEND

**Status:** Filled in with confirmed BTCPay data. Just verify the EIN line, attach the two PDFs, paste into your email client, send.

**To:** jnm@jesseandjulie.com
**From:** donate@bitcoinforthearts.org (or your usual donor-comms address)
**Subject:** Re: Donation receipts for tax return purposes — Feb 3 and April 19 donations
**Attachments:** 2 PDF receipts (after you export `01-receipt-feb-3-2026.md` and `02-receipt-april-19-2026.md` to PDF)

---

## Email body — copy from here ↓

Hi Jesse,

Thank you for your donations and for the thoughtful technical questions — these are exactly the kind of details we want to get right as we serve our donor community. Two PDF receipts are attached for your tax records, one for each donation.

Quick answers to your three points, plus one important correction:

**1. Lightning vs on-chain transaction ID.** You are exactly right — Lightning payments don't have an on-chain transaction ID, only a payment hash and pre-image. Our automated email is generic and shows "(not available yet)" for that field on Lightning donations, which is misleading for Lightning payers like you. We're going to update that copy. The BTCPay invoice ID, the date, and the sats received are what matter for your records, and those are all on the receipts. The "Order ID" line in your Strike payment description was blank because we did not pass an order number on these particular donations — that is our gap, not Strike's, and we'll start including a meaningful order ID on future invoices.

**2. Duplicate confirmation email.** We identified the cause: our BTCPay Server fires two separate webhooks on a successful donation (`InvoiceSettled` and `InvoicePaymentSettled`), and our email handler is currently sending a confirmation for each one. It's a software bug on our end, not a duplicate charge — only one donation was made and only one is being acknowledged. We have a fix queued. Apologies for the noise.

**3. Tax receipts — and an important correction on the April 19 donation.** Both receipts are attached. A few notes:

- For the IRS, **Bitcoin is treated as property, not currency** (Notice 2014-21). Your charitable deduction is the **fair market value at the moment of donation**, as recorded by our BTCPay Server when each Lightning payment settled. Both receipts state that FMV explicitly.
- Bitcoin For The Arts, Inc. is a 501(c)(3) tax-exempt nonprofit. Our **EIN is 41-2642260**.
- Both donations are well under the $250 IRS threshold for required formal acknowledgment, but we are providing receipts as a matter of good practice for your records.

**On the April 19 donation specifically — the amount was $231.00, not $5.00.**

I want to clear this up because it affects your tax filing. Looking at the BTCPay record, the April 19 transaction was **$231.00 USD / 310,644 sats received** — this was your **Hard Cap Heroes Yearly Sovereign Circle membership subscription** (which is priced at $231/year for Bitcoin payers). Strike's display of $233.56 / 312,263 sats was approximately correct — the small difference is normal Lightning routing fees taken from your send amount.

Where the "$5" likely came from: our Hard Cap Heroes tier description on the website includes the line *"Estimated FMV: ~$5 one-time (sticker pack, US only)"* — that **$5 is the value of the welcome-kit sticker pack** that comes with the membership, not the donation amount itself. Easy to misread; happens to us too.

Per IRS rules, when a donor receives goods or services in exchange for a contribution, the deductible portion is the contribution amount minus the FMV of the goods received. So for your April 19 Hard Cap Heroes annual membership:

| | Amount |
|---|---|
| Total contribution | $231.00 |
| FMV of goods received (welcome-kit sticker pack) | $5.00 |
| **Tax-deductible portion** | **$226.00** |

This is reflected on the April 19 receipt. The Feb 3 donation has no goods-or-services adjustment — it's a straight $21.00 deductible contribution.

**One more thing — thank you, genuinely.** A Hard Cap Heroes Yearly membership funded entirely in Bitcoin is exactly the kind of support that lets BFTA plan grant cycles with confidence rather than scramble each quarter. Per our published 55/30/10/5 allocation, $127 of your $231 goes directly to artist grants. And quietly: you are the first paid member through our newly relaunched Sovereign Circle subscription system — appreciate you being patient with us through the technical rollout.

A welcome kit will go out to you at the address you have on file. If you'd like to confirm or update your mailing address, please reply with it.

Please let me know if you need anything else for your tax return — happy to issue corrected receipts if any detail needs adjusting after you review.

Sincerely,

**Dion Wilson**
Founder & Director
Bitcoin For The Arts, Inc.
27 West 60th Street, New York, NY 10023
501(c)(3) | EIN: 41-2642260
donate@bitcoinforthearts.org | bitcoinforthearts.org

---

## ↑ Stop copying here

## Before you send — checklist

- [ ] Generate the two PDF receipts from `01-receipt-feb-3-2026.md` and `02-receipt-april-19-2026.md` (each file has 3 PDF-export options at the bottom)
- [ ] Attach both PDFs to the email
- [ ] Send from `donate@bitcoinforthearts.org` (or your usual donor-comms address)
- [ ] After sending, log Jesse in your donor database with both donations + receipt-sent date
- [ ] Mail Jesse the welcome-kit sticker pack once he replies with his address
- [ ] Note for separate followup: file a bug to fix the duplicate-webhook → duplicate-email issue (separate PR)
