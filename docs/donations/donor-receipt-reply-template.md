# Donor Receipt Email Reply — Templates

For when a donor emails asking for a tax receipt and/or asks technical questions. Use the version that fits.

---

## Template 1 — Simple receipt request (no questions, no issues)

**Subject:** Re: Donation receipt for tax purposes — [Date]

Hi [Donor First Name],

Thank you again for your donation to Bitcoin For The Arts. The attached PDF is your tax receipt for the contribution made on **[Date]**.

A quick note on what's documented: the receipt records the amount of Bitcoin we received and the fair market value at the moment of receipt as observed by our BTCPay Server. The IRS treats Bitcoin as property, so your charitable deduction is the FMV at time of donation. Bitcoin For The Arts, Inc. is a 501(c)(3) tax-exempt nonprofit (EIN: **[EIN]**); donations are deductible to the extent permitted by law. No goods or services were provided in exchange for this donation.

Please reach out if you need anything else for your tax return.

Sincerely,

**Dion Wilson**
Founder & Director
Bitcoin For The Arts, Inc.
501(c)(3) | EIN: [EIN]
donate@bitcoinforthearts.org | bitcoinforthearts.org

---

## Template 2 — Donor with questions about Lightning, missing transaction ID, duplicate emails, or amount discrepancies

Use this when a donor (like Jesse, the example case that prompted this template) sends a thoughtful technical email with multiple questions.

**Subject:** Re: Donation receipts for tax return purposes — [date(s) of donation]

Hi [Donor First Name],

Thank you so much for your donation[s] and for the thoughtful technical questions — it's helpful for us as we improve the donor experience. [Number] PDF receipt[s] [is/are] attached for your tax records[, one for each donation].

Quick answers to your points:

**1. Lightning vs on-chain transaction ID.** You're exactly right — Lightning payments don't have an on-chain transaction ID, only a payment hash and pre-image. Our automated email is generic and shows "(not available yet)" for that field on Lightning donations. Going forward we'll update that copy so it doesn't read like a missing piece of information for Lightning payers. The BTCPay invoice ID, the date, and the sats received are what matter for your records, and those are all on the receipt. The "Order ID" field in your wallet's payment description was [blank/showing X] because [reason] — we'll [include a meaningful order ID on future invoices / explain however applies].

**2. Duplicate confirmation email.** [If applicable:] Apologies for that. I'm investigating — most likely a webhook fired twice from BTCPay, but I want to confirm the cause before promising it won't happen again. You only made one donation and only one is being acknowledged; the duplicate was just the confirmation email, not a duplicate charge.

**3. Tax receipts.** Attached. A few notes for tax-prep purposes:

- For the IRS, **Bitcoin is treated as property, not currency.** Your charitable deduction is the **fair market value at the time of donation**, which we've stated on each receipt as recorded by our BTCPay Server at the moment your Lightning payment settled.
- The IRS rule is that **the donor (you), not the charity, is ultimately responsible for documenting the FMV** of donated property. We're confirming the sats we received and the FMV BTCPay observed at that moment, which most CPAs accept as sufficient for non-cash gifts under $5,000.
- [If donation > $5,000:] Because this contribution exceeds $5,000, IRS rules require a qualified appraisal and we'll need to sign Form 8283 Section B Part IV. Send the form when you're ready.
- [If donation ≤ $5,000:] Your donation is well under the $5,000 threshold that would require IRS Form 8283 Section B and a qualified appraisal — the attached receipt is sufficient documentation.
- Bitcoin For The Arts, Inc. is a 501(c)(3) tax-exempt nonprofit. Our EIN is **[EIN]**.
- **No goods or services were provided** in exchange for [either / this / your] donation.

[INCLUDE THIS SECTION ONLY IF the donor noted a discrepancy between what their wallet showed and what BFTA's email or receipt shows:]

**On the discrepancy you noted between [wallet name]'s display and BFTA's records:** The amount we confirm received in the attached receipt is **[BTCPay-confirmed amount]**, which is what BFTA can attest to. The figure shown on [your wallet]'s app may include other purchases or balance overlays — many custodial wallets like Strike show running totals and recent activity on the same screen as the transaction itself, which can make the "transaction amount" hard to read at a glance. If after reviewing the attached receipt you believe a different amount was actually intended for BFTA, please reply with a screenshot of the specific transaction and we'll dig into it together.

Please let me know if you need anything else for your tax return — happy to send a corrected receipt if any detail needs adjusting after you review.

Thank you again for supporting sovereign creators and the BFTA mission.

Sincerely,

**Dion Wilson**
Founder & Director
Bitcoin For The Arts, Inc.
501(c)(3) | EIN: [EIN]
donate@bitcoinforthearts.org | bitcoinforthearts.org

---

## Template 3 — Apology + receipt when there was a real error

Use this if BFTA legitimately got something wrong (charged twice, recorded the wrong amount, sent a bad receipt, etc.).

**Subject:** Re: Your donation receipt — corrected

Hi [Donor First Name],

Thank you for catching this and for your patience.

You're right — [describe what went wrong, e.g. "our system recorded the donation amount as $5 USD but BTCPay actually received $X USD, so the original receipt was incorrect"]. The corrected PDF receipt is attached. Please discard the previous version and use the attached one for your tax return.

[If applicable:] We've also [refunded the duplicate / fixed the underlying issue / etc.] so this doesn't happen again.

I appreciate you flagging this — it helps us improve our donor experience. Thank you again for your support.

Sincerely,

**Dion Wilson**
Founder & Director
Bitcoin For The Arts, Inc.
501(c)(3) | EIN: [EIN]
donate@bitcoinforthearts.org | bitcoinforthearts.org

---

## Tone notes

- **Lead with thanks.** A donor asking detailed questions is engaged and serious. Treat that as a positive signal.
- **Be honest about gaps.** If your auto-email is confusing for Lightning payers, say so. If the duplicate email shouldn't have happened, say so. Donors trust transparency much more than polished defensiveness.
- **Reference the IRS rules without being preachy.** A short, accurate paragraph about Bitcoin being treated as property is exactly the right level. Don't lecture.
- **Don't promise specifics you can't deliver.** "I'm investigating the duplicate email" is fine. "It will never happen again" is a promise you may not be able to keep until you've actually fixed the root cause.
- **Always include EIN, 501(c)(3) status, and "no goods or services provided" language** in any tax-context reply. Donors' CPAs look for these phrases.
