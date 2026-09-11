# Midwest vinyl / wall cards (print)

**Trim size (locked):** **7.00 × 5.00 in landscape** (wide)  
**Files:** PDF (preferred for shop) + 300 dpi PNG (2100 × 1500 px)  
**Logo:** `public/brand-kit/square-bugs/square-cream-orange.png`  
**Printer handoff:** see **`PRINT-SPECS.md`** in this folder.

Regenerate from repo root:

```bash
python3 docs/midwest-2026/auction/generate-vinyl-cards.py
```

## Full set (10 cards)

Auction (QR on card):

1. LOT-01 CA Danner *Satoshi White Paper Series #52*
2. LOT-02 Lady RedHorns *The Transfer of Light*
3. LOT-05 Lady RedHorns *The Bitcoin Keeper*
4. LOT-06 Lady RedHorns *The Temptation of Bitcoin Angel*
5. LOT-03 Shipwreck Sean *HODL On*
6. LOT-04 Timechain Mag Genesis

For sale / raffle (Sean):

7. *The Volatility Blues* · 3,500,000 sats (about $3,000)
8. *A Slice of History* · 3,000,000 sats (about $2,550)
9. *Cold Storage* · 2,000,000 sats (about $1,700)
10. Live canvas raffle · entry 6,500 sats (about $5)

| File | Use |
| --- | --- |
| `PRINT-SPECS.md` | Give to the print shop |
| `all-midwest-vinyl-cards.pdf` | Print all 10 cards in one job |
| `lot-01-*.pdf` … `lot-06-*.pdf` | Silent auction lots (QR → lot page) |
| `sean-*.pdf` | Sean for-sale + live raffle |
| Matching `.png` | Preview / vendor upload at 300 dpi |

Public mirrors (after deploy): `/midwest/vinyl-cards/<filename>`

Lady RedHorns proceeds lines are blank (`________`) so ops can fill splits on site.
