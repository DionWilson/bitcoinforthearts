# BitcoinDay Naples 2027: internal note

For Dion and Julie. Not the document that goes to John.

Event: BitcoinDay Naples, January 15 to 16, 2027. John Drew, john@bitcoinday.io.

## October 21 decisions (Dion and Julie)

- CLCT and Kyle Knight are out. Kyle can't attend. Bitcoin For The Arts curates the art.
- Kyle Shirkness is out of the proposal until he confirms.
- Bitcoin For The Arts presents. Partners volunteer their services with or for Bitcoin For The Arts.
- The Bitcoin For The Arts gift follows 55 / 30 / 10 / 5, with the 5 percent to the HODL Vault.
- Phantom Power Music is the production team. Its $2,500 production fee is a separate item outside the gift, so John can find a sponsor for it on its own.
- Internal only: Phantom Power Music pays Ainsley Costello from the $2,500 production fee. The proposal does not say this.
- Friday performance is venue permitting.
- Saturday: Ainsley's 10-minute TED-style talk (her journey, art, story, and bitcoin, with a live Lightning payment), and the panel "Bitcoin Needs Art to Survive" with Dion and Ainsley, led by Dion's pitch on the fiat funding crisis.
- Art sales: two-thirds to the artist, one-third to Bitcoin For The Arts. A fully donated work goes 100 percent to Bitcoin For The Arts.

## Budgets

$10,000 gift: artist grants $5,500 (five exhibiting artist grants at $500, which include shipping, plus $3,000 to the Artist Grants Pool), programs $3,000, operations $1,000, HODL Vault $500.

$5,000 gift: artist grants $2,750 (one featured artist grant at $500, plus $2,250 to the pool), programs $1,500, operations $500, HODL Vault $250.

Both: plus a separate $2,500 production sponsorship, payable to Phantom Power Music.

## Before sending

- Julie is a Bitcoin For The Arts advisor and Ainsley's mother and manager. Phantom Power Music is paid by the sponsor, not by Bitcoin For The Arts, so no Bitcoin For The Arts funds go to it. Note the arrangement in the board minutes anyway.
- If the production sponsor wants a tax deduction, the $2,500 would have to run through Bitcoin For The Arts. That puts it back in the gift and makes it a related-party payment, so it would need board approval.
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
