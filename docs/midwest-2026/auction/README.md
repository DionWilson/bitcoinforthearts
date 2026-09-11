# Midwest silent auction - ops pack

## Live URLs (after deploy)

| Asset | URL |
| --- | --- |
| All lots | https://www.bitcoinforthearts.org/midwest/auction |
| LOT-01 CA Danner | https://www.bitcoinforthearts.org/midwest/auction/satoshi-white-paper-52 |

Artwork sources:
- LOT-01 CA: full work crop from `public/Satoshi-white-paper-52.JPG` (artist-confirmed). Install/wall shot retained as `public/auction/satoshi-white-paper-52-install.jpg` from `public/whaite-paper-52-backgroind.JPG`. Artist page: https://www.cadanner.com/view/5400977/1/6617154
- LOT-03 Sean *HODL On*: final photo from `public/Hodl-on-final.jpg` (lot pages use `public/auction/hodl-on.jpg`; prior install shot retained at `public/auction/hodl-on-install.jpg`).
| LOT-02 Lady RedHorns *Transfer of Light* | https://www.bitcoinforthearts.org/midwest/auction/transfer-of-light |
| LOT-03 Shipwreck Sean *HODL On* | https://www.bitcoinforthearts.org/midwest/auction/hodl-on |
| LOT-04 Timechain Mag Genesis | https://www.bitcoinforthearts.org/midwest/auction/timechain-magazine-genesis |
| LOT-05 Lady RedHorns *The Bitcoin Keeper* | https://www.bitcoinforthearts.org/midwest/auction/bitcoin-keeper |
| LOT-06 Lady RedHorns *Temptation of Bitcoin Angel* | https://www.bitcoinforthearts.org/midwest/auction/temptation-of-bitcoin-angel |

Vinyl QR codes should point at the lot URLs above. Lot pages show artist bio, website, social, email, Strike / Lightning / Bitcoin when provided. Each lot page also has an **advance bid** form that posts to Airtable (`MBS Advance Bids`) via `/api/midwest-advance-bid` using the same `AIRTABLE_PAT` + `AIRTABLE_BASE_ID` as volunteers/connect.

Artist bios: `artist-bios.md`

## Advance bids → Airtable

1. In the existing BFTA Airtable base, create a table named **`MBS Advance Bids`** (or set `AIRTABLE_ADVANCE_BIDS_TABLE`).
2. Exact column names (API field names must match):

| Field | Type |
| --- | --- |
| Full Name | Single line text |
| Email | Email |
| Phone | Phone / single line text |
| Lot Code | Single line text |
| Lot Title | Single line text |
| Artist | Single line text |
| Bid Sats | Number |
| Opening Bid Sats | Number |
| Will Attend Midwest | Checkbox |
| Notes | Long text |
| Source | Single line text |
| Status | Single select (`Pending`, `Seeded`, `Outbid`, `Won`, `Forfeit`) |

3. Vercel already has `AIRTABLE_PAT` and `AIRTABLE_BASE_ID`. Optional: `AIRTABLE_ADVANCE_BIDS_TABLE`, `AUCTION_TO_EMAIL`.
4. Ops: before doors open, sort Airtable by lot + Bid Sats desc, write the high advance bid onto row 1 of each printed bid sheet.
5. Rules on the form: bid ≥ opening, steps of 21,000 sats, must confirm in-person Columbus pickup (no shipping).

### Clipboard print pack (PDFs)

Print the **letter PDFs** (not browser Cmd+P on HTML):

| File | URL |
| --- | --- |
| All lots + extras | `/midwest/bid-sheets/all-midwest-bid-sheets.pdf` |
| Per-lot sheet | `/midwest/bid-sheets/lot-0N-…-bid-sheet.pdf` |
| Extra blank pages | `/midwest/bid-sheets/extra-bid-pages.pdf` |

Download pages: `/midwest/auction/[slug]/bid-sheet` and `/midwest/auction/bid-sheet-extra`.  
Floor rules: close **3:00 PM ET**, claim by **4:00 PM ET** or next bidder. Details: `CLIPBOARD-AND-PAYMENT.md`.

## Add another donated lot

1. Append a new object to `midwestAuctionLots` in `lib/midwest-auction-lots.ts`
2. Add artwork image under `public/auction/`
3. Detail page + bid sheet generate automatically from the slug
4. Duplicate/adapt the vinyl card + consignment agreement in this folder

## Vinyl / wall cards

Print-ready **5×7 in** PDFs + 300dpi PNGs (BFTA square bug + QR on auction lots):

| Print file | Work |
| --- | --- |
| `vinyl-cards/lot-01-satoshi-white-paper-52.pdf` | CA Danner · LOT-01 |
| `vinyl-cards/lot-02-transfer-of-light.pdf` | Lady RedHorns · LOT-02 |
| `vinyl-cards/lot-05-bitcoin-keeper.pdf` | Lady RedHorns · LOT-05 |
| `vinyl-cards/lot-06-temptation-of-bitcoin-angel.pdf` | Lady RedHorns · LOT-06 |
| `vinyl-cards/lot-03-hodl-on.pdf` | Shipwreck Sean · LOT-03 |
| `vinyl-cards/lot-04-timechain-magazine-genesis.pdf` | Timechain Mag Genesis · LOT-04 |
| `vinyl-cards/sean-volatility-blues.pdf` | Sean for sale |
| `vinyl-cards/sean-slice-of-history.pdf` | Sean for sale |
| `vinyl-cards/sean-cold-storage.pdf` | Sean for sale |
| `vinyl-cards/sean-live-raffle.pdf` | Sean live raffle |
| `vinyl-cards/all-midwest-vinyl-cards.pdf` | All 10 cards, one PDF |

Also mirrored under `public/midwest/vinyl-cards/` for download after deploy.

Copy sources (markdown):

| File | Artist / works |
| --- | --- |
| `vinyl-card-satoshi-white-paper-52.md` | CA Danner · LOT-01 |
| `vinyl-card-transfer-of-light.md` | Lady RedHorns · three Angels of Freedom works (LOT-02, 05, 06) |
| `vinyl-card-shipwreck-sean.md` | Shipwreck Sean · 4 gallery + 1 live raffle |
| `vinyl-card-timechain-magazine.md` | Timechain Mag Genesis · LOT-04 |

Regenerate: `python3 docs/midwest-2026/auction/generate-vinyl-cards.py`  
(Needs `Pillow`, `qrcode[pil]`, `reportlab`, `pymupdf`. Logo: `public/brand-kit/square-bugs/square-cream-orange.png`.)

Print size: **7.00 × 5.00 in landscape** vinyl/matte only (do not scale). See `vinyl-cards/PRINT-SPECS.md`.

### Lady RedHorns specs (Angels of Freedom · three works)

- Acrylic on canvas · **16 × 16 in** · Lightning: `ladyredhorns@coinos.io`
- All three peer-to-peer silent auction · opening **1,000,000 sats (about $850)** · increments **21,000 sats**
- *The Transfer of Light* - LOT-02
- *The Bitcoin Keeper* - LOT-05
- *The Temptation of Bitcoin Angel* - LOT-06
- Artist promo cards + easel photos under `public/auction/` (`*-card.jpg` + main jpgs)
- Multi-work consignment: `consignment-agreement-lady-redhorns.md` (proceeds split + no-sale still Artist choice)

### Shipwreck Sean (prices confirmed, sats-primary)

- *The Volatility Blues* - fixed sale **3,500,000 sats (0.035 BTC · about $3,000)** · 20×24 in
- *A Slice of History* - fixed sale **3,000,000 sats (0.03 BTC · about $2,550)** · 40×16 in
- *HODL On* - **silent auction, 100% BFTA** · 40×16 in · opening **2,100,000 sats (about $1,700)**
- *Cold Storage* - fixed sale **2,000,000 sats (0.02 BTC · about $1,700)** · 20×24 in
- Live raffle canvas: title TBD · 20×16 in · entry **6,500 sats (about $5)** · winner Thu Sept 24 · 3:00 PM ET

**Print shop:** hand them `vinyl-cards/PRINT-SPECS.md` + `vinyl-cards/all-midwest-vinyl-cards.pdf`. Trim size is locked at **7.00 × 5.00 in landscape**.

## Print checklist - LOT-01 (CA Danner)

- [x] Vinyl/wall card PDF+PNG in `vinyl-cards/lot-01-satoshi-white-paper-52.*` (QR → lot URL)
- [ ] Optional CA Danner artist bio card (`vinyl-card-satoshi-white-paper-52.md`)
- [x] Bid sheet printed from `/midwest/auction/[slug]/bid-sheet` (clipboard + pen; 2 pages)
- [x] Extra continuation pages from `/midwest/auction/bid-sheet-extra`
- [ ] Signed consignment agreement (`consignment-agreement-ca-danner.pdf` - send to artist)
- [ ] Warehouse label + tracking from artist (arrive Sept 20-22)

## Print checklist - Lady RedHorns

- [x] Vinyl cards PDF+PNG for LOT-02, 05, 06 in `vinyl-cards/` (split lines blank for fill-in)
- [ ] Signed multi-work consignment (all three silent auction at 1,000,000 sats open; fill splits + no-sale)
- [ ] Warehouse label · mid-September ship · arrive Sept 20-22
- [ ] Lot pages live with easel photo + promo card + Lightning tip address + advance bid

## Print checklist - Shipwreck Sean

- [ ] Send `consignment-agreement-shipwreck-sean.pdf` for signature (email + payout + raffle split + HODL On no-sale)
- [x] Three for-sale vinyls + *HODL On* auction vinyl + raffle vinyl in `vinyl-cards/`
- [ ] Optional bio card for the Sean wall
- [ ] *HODL On*: opening **2,100,000 sats (about $1,700)** · lot page/QR · bid sheet

Regenerate Sean PDF: `python3 docs/midwest-2026/auction/generate-shipwreck-sean-pdf.py`

## Print checklist - Timechain Mag (LOT-04)

- [x] Vinyl/wall card PDF+PNG in `vinyl-cards/lot-04-timechain-magazine-genesis.*`
- [x] Bid sheet printed from `/midwest/auction/[slug]/bid-sheet` (clipboard + pen; 2 pages)

## Consignment PDF

Source: `consignment-agreement-ca-danner.md`  
Regenerate: `python3 docs/midwest-2026/auction/generate-consignment-pdf.py`  
(Uses BFTA black logo: `public/brand-kit/derived/main-black-transparent-800.png`)

Entity language: **New York 501(c)(3)** - no street / operating address on the agreement.

## Agreed economics (LOT-01)

- Opening: **150,000 sats (about $125)**
- Increment: **21,000 sats**
- Split: **1/3 BFTA · 2/3 CA Danner**
- No sale: **donated in full to BFTA**
- Public display: **sats first, with “about $X” as an orientation guide**

## Agreed economics (LOT-03 HODL On)

- Opening: **2,100,000 sats (about $1,700)**
- Increment: **21,000 sats**
- Split: **100% BFTA**
- Image: `public/auction/hodl-on.jpg` (from `public/Hodl-on-final.jpg`)

## Agreed economics (LOT-04 Timechain Mag)

- Package: **Gold Foil Genesis Edition /210** hand-signed and numbered by Asanoha; **Genesis Edition Limited 1720**; **Silk Mandala Archival Serigraph Print /210** hand-signed and numbered by Asanoha
- Retail: **$269** (stated separately; not used as the opening USD guide)
- Opening: **0 sats**
- Minimum first bid: **21,000 sats**
- Increment: **21,000 sats**
- Split: **100% BFTA**
- Display: `Opens at 0 sats · minimum bid 21,000 sats · increments 21,000 sats`
