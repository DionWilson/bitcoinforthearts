# Midwest silent auction - ops pack

## Live URLs (after deploy)

| Asset | URL |
| --- | --- |
| All lots | https://www.bitcoinforthearts.org/midwest/auction |
| LOT-01 CA Danner | https://www.bitcoinforthearts.org/midwest/auction/satoshi-white-paper-52 |

Artwork sources:
- LOT-01 CA: full work crop from `public/Satoshi-white-paper-52.JPG` (artist-confirmed). Install/wall shot retained as `public/auction/satoshi-white-paper-52-install.jpg` from `public/whaite-paper-52-backgroind.JPG`. Artist page: https://www.cadanner.com/view/5400977/1/6617154
- LOT-03 Sean *HODL On*: newer finished photo from `public/hodl-on-1.jpeg` (canvas cropped for lot pages; install shot at `public/auction/hodl-on-install.jpg`).
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


## Add another donated lot

1. Append a new object to `midwestAuctionLots` in `lib/midwest-auction-lots.ts`
2. Add artwork image under `public/auction/`
3. Detail page + bid sheet generate automatically from the slug
4. Duplicate/adapt the vinyl card + consignment agreement in this folder

## Vinyl / wall cards

| File | Artist / works |
| --- | --- |
| `vinyl-card-satoshi-white-paper-52.md` | CA Danner · LOT-01 |
| `vinyl-card-transfer-of-light.md` | Lady RedHorns · three Angels of Freedom works (LOT-02, 05, 06) |
| `vinyl-card-shipwreck-sean.md` | Shipwreck Sean · 4 gallery + 1 live raffle |

Print size: 5×7 or 6×8 in vinyl/matte, mounted beside each work.

### Lady RedHorns specs (Angels of Freedom · three works)

- Acrylic on canvas · **16 × 16 in** · Lightning: `ladyredhorns@coinos.io`
- *The Transfer of Light* - silent auction LOT-02 · opening **1,000,000 sats (about $850)**
- *The Bitcoin Keeper* - LOT-05 · sale format confirming (auction or fixed price)
- *The Temptation of Bitcoin Angel* - LOT-06 · sale format confirming (auction or fixed price)
- Artist promo cards + easel photos under `public/auction/` (`*-card.jpg` + main jpgs)
- Multi-work consignment: `consignment-agreement-lady-redhorns.md` (Artist initials auction vs fixed per work)

### Shipwreck Sean (prices confirmed, sats-primary)

- *The Volatility Blues* - fixed sale **3,000,000 sats (0.03 BTC)** · 20×24 in
- *A Slice of History* - fixed sale **3,000,000 sats (0.03 BTC)** · 40×16 in
- *HODL On* - **silent auction, 100% BFTA** · 40×16 in · opening **2,100,000 sats (about $1,700)**
- *Cold Storage* - fixed sale **2,000,000 sats (0.02 BTC)** · 20×24 in
- Live raffle canvas: title TBD · 20×16 in · winner Thu Sept 24 · 3:00 PM ET

## Print checklist - LOT-01 (CA Danner)

- [ ] Vinyl/wall card from `vinyl-card-satoshi-white-paper-52.md`
- [ ] Optional CA Danner artist bio card (same file)
- [ ] QR code → lot detail URL above
- [ ] Bid sheet printed from `/bid-sheet` (clipboard + pen)
- [ ] Signed consignment agreement (`consignment-agreement-ca-danner.pdf` - send to artist)
- [ ] Warehouse label + tracking from artist (arrive Sept 20-22)

## Print checklist - Lady RedHorns

- [ ] Vinyl cards from `vinyl-card-transfer-of-light.md` for LOT-02, 05, 06
- [ ] Signed multi-work consignment (auction vs fixed + splits + no-sale)
- [ ] LOT-05 / LOT-06 opening or list prices filled before final print
- [ ] Warehouse label · mid-September ship · arrive Sept 20-22
- [ ] Lot pages live with easel photo + promo card + Lightning tip address

## Print checklist - Shipwreck Sean

- [ ] Send `consignment-agreement-shipwreck-sean.pdf` for signature (email + payout + raffle split + HODL On no-sale)
- [ ] Three for-sale vinyls + *HODL On* auction vinyl + raffle vinyl from `vinyl-card-shipwreck-sean.md`
- [ ] Optional bio card for the Sean wall
- [ ] *HODL On*: opening **2,100,000 sats (about $1,700)** · lot page/QR · bid sheet

Regenerate Sean PDF: `python3 docs/midwest-2026/auction/generate-shipwreck-sean-pdf.py`

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
- Image: `public/auction/hodl-on.jpg` (from `public/Hodl On.jpg`)

## Agreed economics (LOT-04 Timechain Mag)

- Package: **Gold Foil Genesis Edition /210** hand-signed and numbered by Asanoha; **Genesis Edition Limited 1720**; **Silk Mandala Archival Serigraph Print /210** hand-signed and numbered by Asanoha
- Retail: **$269** (stated separately; not used as the opening USD guide)
- Opening: **0 sats**
- Minimum first bid: **21,000 sats**
- Increment: **21,000 sats**
- Split: **100% BFTA**
- Display: `Opens at 0 sats · minimum bid 21,000 sats · increments 21,000 sats`
