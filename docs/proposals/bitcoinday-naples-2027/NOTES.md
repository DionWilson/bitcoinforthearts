# BitcoinDay Naples 2027: internal budget note

For Dion. Not the document that goes to John.

Event: BitcoinDay Naples, January 16, 2027. John Drew, john@bitcoinday.io.

October 21 clarification:

- Kyle Knight is a BFTA advisor. He is not paid from either offer, and he is not attending.
- The old $2,100 for him to attend and bring the art stays off.
- CLCT is paid one fee. That fee includes shipping, scheduling the artists, listing the auction on the CLCT site, and marketing the event.
- Shipping is inside the CLCT fee. It is not its own line.
- There is no separate stipend for the visual artists in this budget. If a work sells, that sale is outside the proposal.
- After Ainsley and CLCT, the rest stays with Bitcoin For The Arts.

$10,000: Ainsley $2,500. CLCT $3,500. BFTA $4,000.

$5,000: Ainsley $2,500. CLCT $1,500, and that fee ships one work, not a group. BFTA $1,000.

The two offers are alternatives. Dion's travel and lodging are in neither. The table comes out of the BFTA line.

Inside the $3,500 CLCT fee, about $2,000 is the practical ceiling for freight. If the carrier quote is higher, fewer works ship, and the fee does not grow. The $1,500 CLCT fee on the smaller offer is for a parcel, not a crate.

## Funder sheets, October 21

The two PDFs are now five-page sponsor sheets in the Nashville style, for John to show funders. The program and the giving section come from Julie's draft as revised for the board. The three totals per offer are unchanged.

$10,000 detail:

- Ainsley $2,500: one appearance fee for the Friday set, the talk and demo, and the panel.
- CLCT $3,500: shipping $2,000, artist scheduling $500, auction listing $500, marketing $500.
- BFTA $4,000: table and display $700, photo and recap video $1,200, event insurance $300, Lightning demo $100, program coordination $700, Artist Grants Pool $1,000.

$5,000 detail:

- Ainsley $2,500: same fee and same three appearances.
- CLCT $1,500: parcel shipping for one work $600, scheduling $300, listing $300, marketing $300.
- BFTA $1,000: table and display $350, event insurance $300, Lightning demo $100, program coordination $250. No paid video and no grants pool at this level.

To confirm before John sends them: BitcoinDay provides the room, sound, and stage. The January 15 Friday VIP party is on the 2027 schedule. Kyle Shirkness is on the panel.

Render from this folder (each run needs its own profile, and Chrome may need `timeout` to exit):

```bash
google-chrome --headless --disable-gpu --no-sandbox --user-data-dir=/tmp/chrome-naples \
  --no-pdf-header-footer --print-to-pdf=BFTA-BitcoinDay-Naples-2027-10000.pdf \
  "file://$(pwd)/proposal-10000.html"
```
