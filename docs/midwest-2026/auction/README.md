# Midwest silent auction - ops pack

## Live URLs (after deploy)

| Asset | URL |
| --- | --- |
| All lots | https://www.bitcoinforthearts.org/midwest/auction |
| LOT-01 CA Danner | https://www.bitcoinforthearts.org/midwest/auction/satoshi-white-paper-52 |
| LOT-02 Lady RedHorns | https://www.bitcoinforthearts.org/midwest/auction/transfer-of-light |
| LOT-03 Shipwreck Sean *HODL On* | https://www.bitcoinforthearts.org/midwest/auction/hodl-on |
| LOT-04 Timechain Mag Genesis | https://www.bitcoinforthearts.org/midwest/auction/timechain-magazine-genesis |

Vinyl QR codes should point at the lot URLs above. Lot pages show artist bio, website, social, email, Strike / Lightning / Bitcoin when provided.

Artist bios: `artist-bios.md`


## Add another donated lot

1. Append a new object to `midwestAuctionLots` in `lib/midwest-auction-lots.ts`
2. Add artwork image under `public/auction/`
3. Detail page + bid sheet generate automatically from the slug
4. Duplicate/adapt the vinyl card + consignment agreement in this folder

## Vinyl / wall cards

| File | Artist / works |
| --- | --- |
| `vinyl-card-satoshi-white-paper-52.md` | CA Danner · LOT-01 |
| `vinyl-card-transfer-of-light.md` | Lady RedHorns · *The Transfer of Light* (LOT-02 draft) |
| `vinyl-card-shipwreck-sean.md` | Shipwreck Sean · 4 gallery + 1 live raffle |

Print size: 5×7 or 6×8 in vinyl/matte, mounted beside each work.

### Lady RedHorns specs (from redhornsbtc.store/products/angel-1)

- Acrylic on canvas · 40 × 40 cm / 15.7 × 15.7 in · listed $850 (she is framing for exhibition)
- Opening bid / split: fill after signed consignment

### Shipwreck Sean (prices confirmed)

- *The Volatility Blues* - fixed sale **$2,500 | 0.03 BTC** · 20×24 in
- *A Slice of History* - fixed sale **$2,000 | 0.03 BTC** · 40×16 in
- *HODL On* - **silent auction, 100% BFTA** · 40×16 in · opening bid TBD
- *Cold Storage* - fixed sale **$1,500 | 0.02 BTC** · 20×24 in
- Live raffle canvas: title TBD · 20×16 in · winner Thu Sept 24 · 3:00 PM ET

## Print checklist - LOT-01 (CA Danner)

- [ ] Vinyl/wall card from `vinyl-card-satoshi-white-paper-52.md`
- [ ] Optional CA Danner artist bio card (same file)
- [ ] QR code → lot detail URL above
- [ ] Bid sheet printed from `/bid-sheet` (clipboard + pen)
- [ ] Signed consignment agreement (`consignment-agreement-ca-danner.pdf` - send to artist)
- [ ] Warehouse label + tracking from artist (arrive Sept 20-22)

## Print checklist - Lady RedHorns

- [ ] Vinyl card from `vinyl-card-transfer-of-light.md` (fill bid/split blanks after she signs)
- [ ] Signed consignment + lot page live before printing final QR
- [ ] Warehouse label · mid-September ship · arrive Sept 20-22

## Print checklist - Shipwreck Sean

- [ ] Send `consignment-agreement-shipwreck-sean.pdf` for signature (email + payout + raffle split + HODL On no-sale)
- [ ] Three for-sale vinyls + *HODL On* auction vinyl + raffle vinyl from `vinyl-card-shipwreck-sean.md`
- [ ] Optional bio card for the Sean wall
- [ ] *HODL On*: set opening bid, lot code, lot page/QR, bid sheet

Regenerate Sean PDF: `python3 docs/midwest-2026/auction/generate-shipwreck-sean-pdf.py`

## Consignment PDF

Source: `consignment-agreement-ca-danner.md`  
Regenerate: `python3 docs/midwest-2026/auction/generate-consignment-pdf.py`  
(Uses BFTA black logo: `public/brand-kit/derived/main-black-transparent-800.png`)

Entity language: **New York 501(c)(3)** - no street / operating address on the agreement.

## Agreed economics (LOT-01)

- Opening: **150,000 sats / $98**
- Increment: **21,000 sats**
- Split: **1/3 BFTA · 2/3 CA Danner**
- No sale: **donated in full to BFTA**
