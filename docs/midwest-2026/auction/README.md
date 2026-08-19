# Midwest silent auction — ops pack

## Live URLs (after deploy)

| Asset | URL |
| --- | --- |
| All lots | https://www.bitcoinforthearts.org/midwest/auction |
| LOT-01 detail (QR target) | https://www.bitcoinforthearts.org/midwest/auction/satoshi-white-paper-52 |
| LOT-01 printable bid sheet | https://www.bitcoinforthearts.org/midwest/auction/satoshi-white-paper-52/bid-sheet |

## Add another donated lot

1. Append a new object to `midwestAuctionLots` in `lib/midwest-auction-lots.ts`
2. Add artwork image under `public/auction/`
3. Detail page + bid sheet generate automatically from the slug
4. Duplicate/adapt the vinyl card + consignment agreement in this folder

## Print checklist — LOT-01 (CA Danner)

- [ ] Vinyl/wall card from `vinyl-card-satoshi-white-paper-52.md`
- [ ] QR code → lot detail URL above
- [ ] Bid sheet printed from `/bid-sheet` (clipboard + pen)
- [ ] Signed consignment agreement
- [ ] Warehouse label + tracking from artist (arrive Sept 20–22)

## Agreed economics (LOT-01)

- Opening: **$322 / 500,000 sats**
- Increment: **$21**
- Split: **1/3 BFTA · 2/3 CA Danner**
- No sale: **donated in full to BFTA**
