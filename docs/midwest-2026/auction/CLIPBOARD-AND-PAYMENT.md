# Midwest silent auction · clipboard + payment ops

## What to print (one clipboard per lot)

| Print | URL | Use |
| --- | --- | --- |
| Lot bid sheet (2 pages) | `/midwest/auction/[slug]/bid-sheet` | Artwork details, rules, 12 + 16 bid rows, winner claim box |
| Extra blank pages | `/midwest/auction/bid-sheet-extra` | Shared template for any lot when a clipboard fills |

Print checklist before doors:

1. One lot sheet per auction lot (page 1 + page 2), clipboard + pen  
2. 4–6 extra blank pages from `/bid-sheet-extra` in a folder at the booth  
3. Seed **row 1** of each lot sheet with the high Airtable advance bid  
4. Tape or clip page 2 under page 1  

Live lot sheets:

- LOT-01 `/midwest/auction/satoshi-white-paper-52/bid-sheet`
- LOT-02 `/midwest/auction/transfer-of-light/bid-sheet`
- LOT-03 `/midwest/auction/hodl-on/bid-sheet`
- LOT-04 `/midwest/auction/timechain-magazine-genesis/bid-sheet`
- LOT-05 `/midwest/auction/bitcoin-keeper/bid-sheet`
- LOT-06 `/midwest/auction/temptation-of-bitcoin-angel/bid-sheet`

## Floor rules (printed on the sheets)

1. Bidder signs **name**, **email** and/or **phone**, and **bid in sats**  
2. Close: **Thursday, Sept 24 · 3:00 PM ET**  
3. Winner must **claim by 4:00 PM ET** (in person or as staff confirms by contact)  
4. No claim by 4:00 PM → offer to **next highest bidder**, then down the sheet  
5. Columbus pickup only  

## How winners pay (show up)

When the winner is present:

| Method | How |
| --- | --- |
| Card / Apple Pay | `bitcoinforthearts.org/donate` → enter the **USD equivalent of the winning sats bid** as a custom amount (Stripe) |
| Bitcoin | BTCPay on the donate / pay flows → enter the same hammer amount |
| Lightning | If using artist or booth Lightning for peer lots, record on the winner box |

Staff: write payment method + initials on the winner claim box before releasing the work.

## Credit card “pre-hold” / charge-if-absent (what’s realistic)

Charity galas that “already have your card” almost always do one of these:

### A. Do not put full card numbers on the clipboard (recommended)

Paper card forms = PCI risk and easy theft. **Never** write full PAN / CVV on bid sheets.

### B. Best simple path for this summit (no new build)

1. Collect **name + email + phone** on the sheet (already on the form)  
2. At 3:00 PM, call/text/email the winner  
3. If they can’t come by 4:00 PM, send a **Stripe Payment Link** or ask them to pay the exact USD amount on `/donate`  
4. If they don’t pay / don’t claim by 4:00 PM, move to the next bidder  

This matches your forfeit rule without storing cards.

### C. True card-on-file / pre-authorization (Stripe, later build)

Possible with your existing Stripe account, but it needs a **digital** step (phone/tablet QR), not paper:

1. Bidder scans a QR: “Save a card to bid”  
2. Stripe Checkout or Payment Element in **setup** mode saves a PaymentMethod  
3. Bidder agrees in writing: “If I win and do not claim by 4:00 PM ET, BFTA may charge this card for the hammer amount (USD conversion posted at close)”  
4. At close, staff creates a PaymentIntent against the saved card (`capture_method: automatic` or manual auth+capture)  

**Pre-authorization hold** (freeze funds then capture) works best when you know a max amount up front. Silent auctions with rising sats bids make a fixed hold awkward unless you hold a high ceiling or only charge after close.

### D. Paper “credit card authorization” form (only if you insist)

A one-page authorization with name, last four after a **staff tablet swipe**, signature, and lot/bid blank can support absent winners, but:

- Full card data must go through Stripe Terminal / Checkout, not a clipboard  
- Keep signed consent; never store CVV  
- Have counsel review the charge language for a 501(c)(3) art auction  

## Suggested booth kit

- 6 lot clipboards (sheets printed)  
- Folder of extra bid pages  
- Phone for winner calls at 3:00 PM  
- Tablet or laptop open to `/donate` for card payment  
- BTCPay / Lightning receive ready  
- Spare pens  

## After 3:00 PM script

1. Circle the high bid; fill winner name / email / phone  
2. Announce or call winner  
3. If present → take payment → release art  
4. If absent → note time of contact attempts  
5. At 4:00 PM with no claim/payment → mark forfeit → contact next bidder  
6. Update Airtable Status (`Pending` / `Won` / `Forfeit` / `Outbid`) when you can  
