# BitcoinDay Naples 2027: internal note

For Dion and Julie. Not the document that goes to John.

Event: BitcoinDay Naples, January 15 to 16, 2027. John Drew, john@bitcoinday.io.

## October 21 decisions (Dion and Julie)

- CLCT and Kyle Knight are out. Kyle can't attend. Bitcoin For The Arts curates the art.
- Kyle Shirkness is out of the proposal until he confirms.
- Bitcoin For The Arts presents. Partners volunteer their services with or for Bitcoin For The Arts.
- The Bitcoin For The Arts gift follows 55 / 30 / 10 / 5, with the 5 percent to the HODL Vault.
- Phantom Power Music is the production team. The $2,500 production sponsorship is paid to Bitcoin For The Arts as a separate funding item outside the budgeted gift, so John can find a sponsor for it on its own. Bitcoin For The Arts then pays Phantom Power Music.
- Internal only: Phantom Power Music pays Ainsley Costello from the $2,500 production fee. The proposal does not say this.
- Friday performance is venue permitting.
- Saturday: Ainsley's 10-minute TED-style talk (her journey, art, story, and bitcoin, with a live Lightning payment), and the panel "Bitcoin Needs Art to Survive" with Dion and Ainsley, led by Dion's pitch on the fiat funding crisis.
- Art sales: two-thirds to the artist, one-third to Bitcoin For The Arts. A fully donated work goes 100 percent to Bitcoin For The Arts.

## Budgets

$10,000 gift: artist grants $5,500 (five exhibiting artist grants at $500, which include shipping, plus $3,000 to the Artist Grants Pool), programs $3,000, operations $1,000, HODL Vault $500.

$5,000 gift: artist grants $2,750 (one featured artist grant at $500, plus $2,250 to the pool), programs $1,500, operations $500, HODL Vault $250.

Both: plus a separate $2,500 production sponsorship, payable to Bitcoin For The Arts, which pays Phantom Power Music.

## Before sending

- Julie is a Bitcoin For The Arts advisor and Ainsley's mother and manager, and Bitcoin For The Arts pays her company, Phantom Power Music. That is a related-party payment. Before signing, have the directors approve the $2,500 production agreement, with Julie disclosing the relationship and stepping out of the vote. Record it in the minutes, with a written agreement and an invoice from Phantom Power Music.
- The production sponsorship is a gift to Bitcoin For The Arts, restricted to the production, and is deductible like any gift to a 501(c)(3), less the value of any benefits. Book it as a separate restricted line, outside the 55 / 30 / 10 / 5 split of the main gift.
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
