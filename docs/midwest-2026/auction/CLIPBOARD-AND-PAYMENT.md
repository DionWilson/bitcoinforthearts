# Midwest silent auction · clipboard print pack (PDFs)

**Do not use browser Cmd+P on the HTML pages for the floor clipboards.**  
Print these **letter-size PDFs** at **100% scale** (portrait).

## Download

| File | Use |
| --- | --- |
| `/midwest/bid-sheets/all-midwest-bid-sheets.pdf` | All 6 lots (2 pages each) + extra pages |
| `/midwest/bid-sheets/lot-01-…-bid-sheet.pdf` … `lot-06-…` | One clipboard per lot |
| `/midwest/bid-sheets/extra-bid-pages.pdf` | Shared blank continuation (any lot) |

Source copies also live in `docs/midwest-2026/auction/bid-sheets/`.

Regenerate after lot edits:

```bash
python3 docs/midwest-2026/auction/generate-bid-sheets.py
```

## What’s on each lot PDF (2 pages)

**Page 1** — lot details, rules, full-page tall rows (Name · Email · Phone · Bid in sats)  
**Page 2** — more tall rows + **winner claim** box at the bottom  

Row height is at least **0.55 in** and stretches so the table fills the page (no dead band).

## Booth setup

1. Print all 6 lot PDFs → one clipboard each + pen  
2. Print several `extra-bid-pages.pdf` copies for overflow  
3. Seed **row 1** from Airtable advance bids before doors open  
4. Close 3:00 PM ET · claim by 4:00 PM ET · else next highest bidder  
