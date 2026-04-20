# Bitcoin / Lightning Donation Receipt — Template

> ⚠️ **Have your CPA approve this template language once before sending the first one.** The language below is consistent with current IRS guidance for non-cash charitable contributions of cryptocurrency (Notice 2014-21, FAQs on Virtual Currency Transactions) but should be blessed by your tax preparer for your specific 501(c)(3) situation.

This is the receipt to send to anyone who donates Bitcoin (on-chain or Lightning) and requests tax documentation. It is a **proper non-cash charitable contribution receipt** — different from the podcaster acknowledgment letter (which is for donated services and is *not* deductible).

## Key IRS rules underlying this receipt

- The IRS treats Bitcoin as **property**, not currency (Notice 2014-21).
- The donor's deduction is the **fair market value (FMV)** of the BTC at the time of donation.
- For non-cash gifts under **$250**, no formal receipt is required (but a courtesy receipt is good practice).
- For non-cash gifts of **$250 or more**, a **contemporaneous written acknowledgment** is required from the charity. The receipt below satisfies this requirement.
- For non-cash gifts over **$500**, the donor must file IRS Form 8283 with their tax return. The charity's receipt does not need to be Form 8283 itself — donors complete that themselves.
- For non-cash gifts over **$5,000**, the donor must obtain a **qualified appraisal** (with limited exceptions for publicly traded securities — Bitcoin is NOT publicly traded property under this definition, so an appraisal IS required for >$5,000 BTC donations). The charity must sign **Form 8283 Section B Part IV** acknowledging receipt.
- The charity's job is to **state what it received** (sats) and **the FMV BTCPay observed** at the moment of receipt. The donor is ultimately responsible for documenting and substantiating their deduction.

---

## The Receipt — fillable template

Print on Bitcoin For The Arts letterhead. Fill in every `[bracketed]` field. Sign in ink. Save a PDF copy in BFTA's records.

---

[BFTA letterhead with logo, address, EIN, website, phone]


**CHARITABLE DONATION RECEIPT**


[Date receipt issued]


**Donor:**
[Donor full legal name]
[Donor mailing address line 1]
[Donor mailing address line 2]
[City, State ZIP]


**Donee Organization:**
**Bitcoin For The Arts, Inc.**
[Mailing address]
EIN: **[EIN]**
501(c)(3) tax-exempt status confirmed by the IRS

---

## Donation Details

| Field | Value |
|---|---|
| **Date of donation** | [Date — UTC date of payment confirmation in BTCPay] |
| **Time of donation (UTC)** | [HH:MM:SS UTC] |
| **Property donated** | Bitcoin (BTC) |
| **Amount of Bitcoin received** | **[X.XXXXXXXX] BTC** *(equivalent to [Y] sats)* |
| **Fair market value at time of receipt** | **$[Z.ZZ] USD** *(as recorded by BTCPay Server at the moment of payment confirmation)* |
| **FMV source / methodology** | BTCPay Server's BTC/USD exchange rate at the moment the donation was confirmed on the payment network. BTCPay sources real-time BTC/USD pricing from public exchange APIs (Kraken, Bitstamp, Coinbase) at invoice creation. |
| **Payment network** | [Bitcoin on-chain] OR [Lightning Network] |
| **On-chain transaction ID** *(on-chain only)* | [txid or "N/A — Lightning payment"] |
| **Lightning payment hash** *(Lightning only)* | [hash or "N/A — on-chain payment"] |
| **BTCPay invoice ID** | [BTCPay invoice ID, e.g. TfKwZfriMje17QzXPoJASr] |
| **Receiving address / node** | Bitcoin For The Arts BTCPay Server (donate.bitcoinforthearts.org) |

---

## Goods or Services Provided

**No goods or services were provided by Bitcoin For The Arts, Inc. in exchange for this contribution.**

[OPTIONAL — only if you DID provide goods or services, replace the above with:]
> *In exchange for this contribution, Bitcoin For The Arts, Inc. provided [description of goods or services] with an estimated fair market value of $[amount]. Per IRS rules, the deductible portion of your contribution is the amount paid less the FMV of goods or services received: $[Z.ZZ] − $[FMV of goods] = $[deductible amount].*

---

## Important IRS Notes for the Donor

- The IRS treats Bitcoin as **property**, not currency (Notice 2014-21). Your charitable deduction is the fair market value at the time of donation, as stated above.
- **For your tax return**, you may need to file **IRS Form 8283** if your total non-cash charitable contributions exceed **$500**. For non-cash contributions exceeding **$5,000** (per item or aggregated similar items), a **qualified appraisal** is required and Bitcoin For The Arts, Inc. must sign Form 8283 Section B Part IV — please contact us if this applies.
- BFTA's confirmation of the FMV at the moment of receipt is one piece of documentation. **You, the donor, are ultimately responsible for substantiating the FMV claimed on your tax return.** Most CPAs accept the BTCPay-observed FMV as sufficient documentation for gifts under $5,000.
- This receipt is informational and does not constitute tax advice. **Please consult your tax advisor** for guidance specific to your situation.

---

## Bitcoin For The Arts, Inc. — Charity Confirmation

Bitcoin For The Arts, Inc. is a **501(c)(3) tax-exempt nonprofit corporation** organized under the laws of the State of [State of incorporation], with IRS Employer Identification Number (EIN) **[EIN]**. We are recognized as a publicly supported charity under section 170(b)(1)(A)(vi) of the Internal Revenue Code. **Donations are tax-deductible to the extent permitted by law.**

Our public allocation model commits **55% of every donation** to direct artist grants, **30%** to programs (workshops, residencies, productions), **10%** to operations, and **5%** to a permanent Bitcoin endowment reserve.

---

Sincerely,



______________________________
**Dion Wilson**
Founder & Director
Bitcoin For The Arts, Inc.
donate@bitcoinforthearts.org | bitcoinforthearts.org

---

## Internal checklist before sending

- [ ] All `[bracketed]` fields filled in
- [ ] Sats received and FMV cross-checked against BTCPay invoice (do NOT rely on donor's wallet display — use BTCPay's recorded amount)
- [ ] Date is the UTC date BTCPay confirmed the payment
- [ ] Payment method is correct (on-chain vs Lightning)
- [ ] Goods-or-services language is correct (default: NONE provided; switch to "with FMV deduction" only if a perk was actually given)
- [ ] If gift > $5,000: contact donor proactively about Form 8283 Section B Part IV
- [ ] Receipt signed in ink before scanning
- [ ] PDF emailed to donor (and mailed if the gift is > $250 and they have a US address — best practice)
- [ ] Internal copy filed in BFTA's nonprofit records (year folder)
- [ ] Donor entered into BFTA donor database with the same FMV figure
