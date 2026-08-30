# Midwest silent auction - ops pack

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
4. Fill/adapt a consignment agreement from the template in this folder

## Consignment agreements

| File | Use |
| --- | --- |
| `consignment-agreement-template.md` / `.pdf` | Blank reusable form for future artists |
| `consignment-agreement-lady-redhorns.md` / `.pdf` | Lady RedHorns - *The Transfer of Light* (choices left open) |
| `consignment-agreement-ca-danner.md` / `.pdf` | LOT-01 CA Danner (fixed 1/3 · 2/3 + donate if no sale) |

Regenerate PDFs:

```bash
python3 docs/midwest-2026/auction/generate-consignment-pdf.py
# or: --artist redhorns | --artist template | --artist danner
```

(Uses BFTA black logo: `public/brand-kit/derived/main-black-transparent-800.png`)

Entity language: **New York 501(c)(3)** - no street / operating address on the agreement.

### Template choices (artist initials)

**Proceeds (pick one):**
- A. Full donation (100% to BFTA)
- B. Half / half (50% BFTA · 50% artist)
- C. One-third / two-thirds (1/3 BFTA · 2/3 artist)

**If no sale (pick one):**
- Donate in full to BFTA
- Artist reclaims (artist covers return shipping / pickup unless otherwise agreed)

**Opening bid (pick one):**
- Artist sets the opening bid (sats + informational USD)
- Artist authorizes BFTA to set a reasonable opening bid

Default Event use: silent auction unless artist and BFTA agree otherwise in writing.

## Print checklist - LOT-01 (CA Danner)

- [ ] Vinyl/wall card from `vinyl-card-satoshi-white-paper-52.md`
- [ ] QR code → lot detail URL above
- [ ] Bid sheet printed from `/bid-sheet` (clipboard + pen)
- [ ] Signed consignment agreement (`consignment-agreement-ca-danner.pdf` - send to artist)
- [ ] Warehouse label + tracking from artist (arrive Sept 20-22)

## Agreed economics (LOT-01)

- Opening: **150,000 sats / $98**
- Increment: **21,000 sats**
- Split: **1/3 BFTA · 2/3 CA Danner**
- No sale: **donated in full to BFTA**

## Checklist - Lady RedHorns (*The Transfer of Light*)

- [ ] Send `consignment-agreement-lady-redhorns.pdf` for artist to initial choices + sign
- [ ] Collect year / medium / dimensions / email / payout handle
- [ ] Assign lot code and add to `midwestAuctionLots` after terms are chosen
- [ ] Warehouse label + mid-September ship aiming for arrive Sept 20-22
- [ ] Confirm framing before ship
