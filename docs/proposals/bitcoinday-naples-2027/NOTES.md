# BitcoinDay Naples 2027: internal note

For Dion and Julie. Not the document that goes to John.

Event: BitcoinDay Naples, January 15 to 16, 2027. John Drew, john@bitcoinday.io.

## October 21 decisions (Dion and Julie)

- CLCT and Kyle Knight are out of the program. Kyle can't attend. Bitcoin For The Arts curates the art. (October 23: CLCT returns as the online auction partner.)
- Kyle Shirkness is out of the proposal until he confirms.
- Bitcoin For The Arts presents. Partners volunteer their services with or for Bitcoin For The Arts.
- The Bitcoin For The Arts gift follows 55 / 30 / 10 / 5, with the 5 percent to the HODL Vault.
- Phantom Power Music is the production team. Bitcoin For The Arts pays Phantom Power Music $2,500 for the production. (October 23: now inside the budget, see below.)
- Internal only: Phantom Power Music pays Ainsley Costello from the $2,500 production fee. The proposal does not say this.
- Friday performance is venue permitting.
- Saturday: Ainsley's 10-minute TED-style talk (her journey, art, story, and bitcoin, with a live Lightning payment), and the panel "Bitcoin Needs Art to Survive" with Dion and Ainsley, led by Dion's pitch on the fiat funding crisis.
- Art sales: two-thirds to the artist, one-third to Bitcoin For The Arts. (Replaced October 23, see below.)

## October 23 update (Julie)

- The $2,500 Phantom Power Music production now sits inside the budget, under programs. There is no separate production sponsorship.
- The art is auctioned online through CLCT. When a work sells, two-thirds goes to the artist and one-third to CLCT, which donates a portion of its share to Bitcoin For The Arts. Dion will settle the amount with Kyle Knight. The proposal says "a portion" and gives no figure.
- CLCT's role is the online auction only. Bitcoin For The Arts still curates.

## October 23 meeting with John, as corrected by Dion

- Primary ask: a $15,000 gift from Bruce to Bitcoin For The Arts, fully receipted to him. `proposal-15000.html`.
  - Donor restriction: $7,500 (50 percent) is restricted to Bitcoin For The Arts' sponsorship of BitcoinDay Naples 2027. Because it is donor-restricted, 55 / 30 / 10 / 5 does not apply to it.
  - Bitcoin For The Arts pays BitcoinDay the $7,500 under a written sponsorship agreement listing what we receive: main-stage panel and talk, gallery space, Friday performance slot, signage.
  - BitcoinDay pays $2,500 of it to Phantom Power Music for the production. Phantom Power Music pays Ainsley. Ainsley is not in the payment structure, and the proposal does not mention her pay.
  - The unrestricted $7,500 follows 55 / 30 / 10 / 5: artist grants $4,125 (five exhibiting grants at $500 plus $1,625 to the pool), programs $2,250 (photo and recap video $900, gallery display and signage $600, printed program and Lightning demo $400, insurance $350), operations $750, HODL Vault $375.
- Backup: the $10,000 proposal as presented to John on October 23 (`proposal-10000.html`, unchanged). Bitcoin For The Arts pays Phantom Power Music the $2,500 production fee from programs. Use it only if John reworks the ask after speaking with Bruce.
- On hold: the $5,000 proposal (talk and panel only, no band, nothing to BitcoinDay). Ainsley has no fee at that level.
- John presents the $15,000 to Bruce. The $10,000 is the fallback. Julie asks Ainsley for the name of the New York angel investor as a second option.
- Art sales are unchanged: online auction through CLCT, two-thirds to the artist, one-third to CLCT, which donates a portion to Bitcoin For The Arts.
- Membership: the Renaissance Guardian Circle includes the annual strategy call with the board and early review of grant applications. That is the "board access and advisory input" discussed. It is not a board seat or a vote.
- Kyle Shirkness may join the panel if he confirms. He is not in the proposal yet.

Keeping the gift clean:
- Word the restriction as "Bitcoin For The Arts' sponsorship of BitcoinDay Naples 2027," not as a gift to BitcoinDay. Bitcoin For The Arts decides and signs the agreement, so it is our program expense.
- If Bruce receives anything of value from BitcoinDay (tickets, VIP access), the receipt must state it, and his deduction is reduced by that value.
- Ainsley is paid by Phantom Power Music, which is paid by BitcoinDay. The money still starts as Bitcoin For The Arts funds and Julie is an advisor, so disclose it to the board when the BitcoinDay agreement is approved.
- Open question for the $5,000: Ainsley's talk and panel have no fee at that level. Confirm with Julie that she is donating her time, or add a speaker fee to programs.

## Budgets

$10,000 gift, 55 / 30 / 10 / 5: artist grants $5,500 (five exhibiting artist grants at $500, which include shipping, plus $3,000 to the Artist Grants Pool). Programs $3,000: production by Phantom Power Music $2,500, gallery display and signage $300, event insurance $200. Operations $1,000. HODL Vault $500. The photo and recap video line ($1,000) was cut to make room, and the sponsor benefit now promises photos only.

$5,000 gift, 35 / 50 / 10 / 5: the $2,500 production can't fit in a 30 percent programs share of $5,000 ($1,500). Artist grants $1,750 (featured artist grant $500, pool $1,250). Programs $2,500: production by Phantom Power Music. Operations $500, now covering insurance too. HODL Vault $250. The proposal says programs carry a larger share at this level. To keep 55 / 30 / 10 / 5 with the production inside, the smaller gift would need to be at least $8,334 (for example, $8,500).

## Before sending

- Julie is a Bitcoin For The Arts advisor and Ainsley's mother and manager, and Bitcoin For The Arts pays her company, Phantom Power Music. That is a related-party payment. Before signing, have the directors approve the $2,500 production agreement, with Julie disclosing the relationship and stepping out of the vote. Record it in the minutes, with a written agreement and an invoice from Phantom Power Music.
- CLCT's donation to Bitcoin For The Arts from auction proceeds should come with a written agreement and a receipt from Bitcoin For The Arts to CLCT.
- The proposal does not call Ainsley a volunteer. It says her Friday performance and the production of her talk are part of the Phantom Power Music production. That stays accurate without showing the internal payment.
- Confirm with BitcoinDay: room, sound, stage, and a Friday venue that supports a band.
- Funding facts on page 2 are sourced in the footnote. The Met figure is the $4.4 million operating deficit from its 2024 to 2025 annual report.

## Render

From this folder (each run needs its own profile, and Chrome may need `timeout` to exit):

```bash
google-chrome --headless --disable-gpu --no-sandbox --user-data-dir=/tmp/chrome-naples \
  --no-pdf-header-footer --print-to-pdf=BFTA-BitcoinDay-Naples-2027-10000.pdf \
  "file://$(pwd)/proposal-10000.html"
```
