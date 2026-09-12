#!/usr/bin/env python3
"""Generate letter-size Midwest silent-auction bid sheet PDFs.

Full-page handwriting forms (not cramped HTML print). Each lot PDF is exactly
2 pages: page 1 = lot details + tall bid rows; page 2 = more rows + winner box.

Also writes a shared extra-page template PDF.

Usage:
  python3 docs/midwest-2026/auction/generate-bid-sheets.py
"""

from __future__ import annotations

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas as pdfcanvas

ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = Path(__file__).resolve().parent / "bid-sheets"
PUBLIC_OUT = ROOT / "public/midwest/bid-sheets"

PAGE_W, PAGE_H = letter  # 8.5 x 11
MARGIN_X = 0.55 * inch
MARGIN_TOP = 0.45 * inch
MARGIN_BOTTOM = 0.45 * inch
ORANGE = colors.HexColor("#FF4F14")
BLACK = colors.black
MUTED = colors.HexColor("#444444")
RULE = colors.HexColor("#999999")

# Comfortable handwriting row height; rows stretch to fill each page edge-to-edge
MIN_ROW_H = 0.55 * inch

LOTS = [
    {
        "slug": "satoshi-white-paper-52",
        "lot_code": "LOT-01",
        "title": "Satoshi White Paper Series #52",
        "subtitle": "Block Height 770067",
        "artist": "CA Danner",
        "meta": "2022-2023 · Mixed media on linen canvas · 22 × 28 in",
        "opening": "Opening 150,000 sats (about $125)",
        "increment": "Min increase 21,000 sats",
        "proceeds": "Proceeds 1/3 BFTA · 2/3 CA Danner",
    },
    {
        "slug": "transfer-of-light",
        "lot_code": "LOT-02",
        "title": "The Transfer of Light",
        "subtitle": "Angels of Freedom",
        "artist": "Lady RedHorns",
        "meta": "Acrylic on canvas · 16 × 16 in",
        "opening": "Opening 1,000,000 sats (about $850)",
        "increment": "Min increase 21,000 sats",
        "proceeds": "Proceeds split: fill on consignment (blank on vinyl)",
    },
    {
        "slug": "hodl-on",
        "lot_code": "LOT-03",
        "title": "HODL On",
        "subtitle": "Bitsby holding onto the Bitcoin balloon",
        "artist": "Shipwreck Sean",
        "meta": "Original painting · 40 × 16 in (H × W)",
        "opening": "Opening 2,100,000 sats (about $1,700)",
        "increment": "Min increase 21,000 sats",
        "proceeds": "Proceeds 100% Bitcoin for the Arts",
    },
    {
        "slug": "timechain-magazine-genesis",
        "lot_code": "LOT-04",
        "title": "Timechain Art Magazine - Gold Foil Genesis",
        "subtitle": "Genesis package donated by Timechain / Asanoha",
        "artist": "Timechain Art Magazine",
        "meta": "Gold Foil /210 + Genesis 1720 + Silk Mandala serigraph /210",
        "opening": "Opens at 0 sats · minimum bid 21,000 sats",
        "increment": "Min increase 21,000 sats",
        "proceeds": "Proceeds 100% Bitcoin for the Arts",
    },
    {
        "slug": "bitcoin-keeper",
        "lot_code": "LOT-05",
        "title": "The Bitcoin Keeper",
        "subtitle": "Angels of Freedom",
        "artist": "Lady RedHorns",
        "meta": "Acrylic on canvas · 16 × 16 in",
        "opening": "Opening 1,000,000 sats (about $850)",
        "increment": "Min increase 21,000 sats",
        "proceeds": "Proceeds split: fill on consignment (blank on vinyl)",
    },
    {
        "slug": "temptation-of-bitcoin-angel",
        "lot_code": "LOT-06",
        "title": "The Temptation of Bitcoin Angel",
        "subtitle": "Angels of Freedom",
        "artist": "Lady RedHorns",
        "meta": "Acrylic on canvas · 16 × 16 in",
        "opening": "Opening 1,000,000 sats (about $850)",
        "increment": "Min increase 21,000 sats",
        "proceeds": "Proceeds split: fill on consignment (blank on vinyl)",
    },
]


def draw_header_band(c: pdfcanvas.Canvas, y: float, lot_code: str, page_label: str) -> float:
    c.setFillColor(ORANGE)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN_X, y, "BITCOIN FOR THE ARTS")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8)
    c.drawRightString(PAGE_W - MARGIN_X, y, "501(c)(3)")
    y -= 12
    c.setFillColor(BLACK)
    c.setFont("Helvetica", 8)
    c.drawString(
        MARGIN_X,
        y,
        "Bitcoin Arts Park · Midwest Bitcoin Summit · Sept 23-24, 2026 · Columbus, OH",
    )
    c.setFont("Helvetica-Bold", 8)
    c.drawRightString(PAGE_W - MARGIN_X, y, f"{lot_code}  ·  {page_label}")
    y -= 8
    c.setStrokeColor(ORANGE)
    c.setLineWidth(2)
    c.line(MARGIN_X, y, PAGE_W - MARGIN_X, y)
    return y - 14


def draw_wrapped(c: pdfcanvas.Canvas, text: str, x: float, y: float, max_w: float, font="Helvetica", size=8, leading=10, color=BLACK) -> float:
    c.setFont(font, size)
    c.setFillColor(color)
    words = text.split()
    lines: list[str] = []
    cur = ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if c.stringWidth(trial, font, size) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_lot_block(c: pdfcanvas.Canvas, y: float, lot: dict, compact: bool = False) -> float:
    inner_w = PAGE_W - 2 * MARGIN_X
    box_top = y + 4
    if compact:
        c.setFont("Helvetica-Bold", 12)
        c.setFillColor(BLACK)
        c.drawString(MARGIN_X, y, lot["title"])
        y -= 14
        c.setFont("Helvetica", 9)
        c.drawString(
            MARGIN_X,
            y,
            f"{lot['artist']}  ·  {lot['opening']}  ·  {lot['increment']}",
        )
        y -= 12
        return y

    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(BLACK)
    c.drawCentredString(PAGE_W / 2, y, "PEER-TO-PEER SILENT AUCTION BID SHEET")
    y -= 16
    c.setFont("Helvetica-Bold", 14)
    c.drawString(MARGIN_X, y, lot["title"])
    y -= 13
    if lot.get("subtitle"):
        c.setFont("Helvetica", 9)
        c.setFillColor(MUTED)
        c.drawString(MARGIN_X, y, lot["subtitle"])
        y -= 12
    c.setFillColor(BLACK)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(MARGIN_X, y, lot["artist"])
    y -= 12
    c.setFont("Helvetica", 9)
    c.drawString(MARGIN_X, y, lot["meta"])
    y -= 12
    c.drawString(MARGIN_X, y, f"{lot['opening']}   ·   {lot['increment']}")
    y -= 11
    c.drawString(MARGIN_X, y, lot["proceeds"])
    y -= 14

    # Rules box
    rules = (
        "Sign with name, email and/or phone, and bid in sats (at least 21,000 sats above the previous bid). "
        "Closes Thursday, Sept 24 · 3:00 PM ET. Winner must claim and arrange payment by 4:00 PM ET "
        "or the lot is offered to the next highest bidder. Columbus pickup only. "
        "Staff: write the high Airtable advance bid on row 1 before doors open."
    )
    rules_top = y
    y = draw_wrapped(c, rules, MARGIN_X + 6, y - 2, inner_w - 12, size=8, leading=10)
    y -= 6
    c.setStrokeColor(BLACK)
    c.setLineWidth(0.8)
    c.rect(MARGIN_X, y, inner_w, rules_top - y + 4, stroke=1, fill=0)
    y -= 14
    return y


def draw_table_header(c: pdfcanvas.Canvas, y: float) -> float:
    cols = column_xs()
    c.setFont("Helvetica-Bold", 8)
    c.setFillColor(BLACK)
    labels = [("#", cols[0]), ("NAME", cols[1]), ("EMAIL", cols[2]), ("PHONE", cols[3]), ("BID IN SATS", cols[4])]
    for label, x in labels:
        c.drawString(x + 3, y, label)
    y -= 4
    c.setStrokeColor(BLACK)
    c.setLineWidth(1.2)
    c.line(MARGIN_X, y, PAGE_W - MARGIN_X, y)
    return y


def column_xs() -> list[float]:
    # # | Name | Email | Phone | Bid
    left = MARGIN_X
    right = PAGE_W - MARGIN_X
    width = right - left
    return [
        left,
        left + 0.35 * inch,
        left + 2.35 * inch,
        left + 4.55 * inch,
        left + 5.95 * inch,
    ]


def draw_bid_rows(c: pdfcanvas.Canvas, y_top: float, y_bottom: float, start_num: int) -> tuple[int, int]:
    """Fill [y_bottom, y_top] with equal-height handwriting rows. Returns (rows, next_num)."""
    cols = column_xs()
    usable = y_top - y_bottom
    if usable < MIN_ROW_H:
        return 0, start_num

    n = max(1, int(usable // MIN_ROW_H))
    row_h = usable / n  # stretch so the table meets the bottom edge (no dead gap)

    c.setLineWidth(0.6)
    y = y_top
    for i in range(n):
        y_line = y - row_h
        text_y = y_line + row_h * 0.35
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 8)
        c.drawRightString(cols[1] - 6, text_y, str(start_num + i))
        c.setStrokeColor(colors.HexColor("#DDDDDD"))
        for x in cols[1:]:
            c.line(x, y, x, y_line)
        c.setStrokeColor(RULE)
        c.line(MARGIN_X, y_line, PAGE_W - MARGIN_X, y_line)
        y = y_line

    c.setStrokeColor(BLACK)
    c.setLineWidth(1.0)
    c.rect(MARGIN_X, y_bottom, PAGE_W - 2 * MARGIN_X, usable, stroke=1, fill=0)
    c.setStrokeColor(colors.HexColor("#BBBBBB"))
    c.setLineWidth(0.5)
    for x in cols[1:]:
        c.line(x, y_top, x, y_bottom)

    return n, start_num + n


def draw_winner_box(c: pdfcanvas.Canvas, y_bottom: float) -> float:
    """Draw winner box sitting on y_bottom; returns top y of the box."""
    box_h = 1.55 * inch
    y0 = y_bottom
    y1 = y_bottom + box_h
    c.setStrokeColor(BLACK)
    c.setLineWidth(1)
    c.rect(MARGIN_X, y0, PAGE_W - 2 * MARGIN_X, box_h, stroke=1, fill=0)

    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(BLACK)
    c.drawString(MARGIN_X + 8, y1 - 14, "WINNER CLAIM  ·  STAFF USE")

    c.setFont("Helvetica", 8)
    fields = [
        (MARGIN_X + 8, y1 - 36, "Winning bid (sats)"),
        (PAGE_W / 2 + 4, y1 - 36, "Winner name"),
        (MARGIN_X + 8, y1 - 68, "Winner email"),
        (PAGE_W / 2 + 4, y1 - 68, "Winner phone"),
    ]
    for x, yy, label in fields:
        c.setFillColor(MUTED)
        c.drawString(x, yy + 10, label)
        c.setStrokeColor(RULE)
        c.line(x, yy, x + 3.1 * inch, yy)

    c.setFillColor(BLACK)
    c.setFont("Helvetica", 8)
    c.drawString(
        MARGIN_X + 8,
        y0 + 28,
        "Claimed by 4:00 PM ET?   □ Yes · paid / arranged     □ No · offered to next bidder     Staff: __________",
    )
    c.drawString(
        MARGIN_X + 8,
        y0 + 12,
        "Payment:  □ Card (Stripe / donate)   □ Bitcoin / BTCPay   □ Lightning   □ Other: _______________",
    )
    return y1


def build_lot_pdf(lot: dict, path: Path) -> None:
    c = pdfcanvas.Canvas(str(path), pagesize=letter)
    c.setTitle(f"{lot['lot_code']} Bid Sheet · {lot['title']}")

    # ---- Page 1: details + max writing rows ----
    y = PAGE_H - MARGIN_TOP
    y = draw_header_band(c, y, lot["lot_code"], "Page 1 of 2")
    y = draw_lot_block(c, y, lot, compact=False)
    y = draw_table_header(c, y)
    rows1, next_num = draw_bid_rows(c, y, MARGIN_BOTTOM + 0.28 * inch, 1)
    c.setFont("Helvetica", 7)
    c.setFillColor(MUTED)
    c.drawCentredString(
        PAGE_W / 2,
        0.18 * inch,
        f"Rows 1–{rows1}  ·  Continue on page 2  ·  Extra blanks: bitcoinforthearts.org/midwest/bid-sheets/extra-bid-pages.pdf",
    )
    c.showPage()

    # ---- Page 2: more rows + winner box at bottom ----
    y = PAGE_H - MARGIN_TOP
    y = draw_header_band(c, y, lot["lot_code"], "Page 2 of 2")
    y = draw_lot_block(c, y, lot, compact=True)
    y = draw_table_header(c, y)
    winner_top = draw_winner_box(c, MARGIN_BOTTOM)
    # Bid rows fill all space above the winner box (no dead band)
    rows2, end_num = draw_bid_rows(c, y, winner_top + 0.08 * inch, next_num)
    c.setFont("Helvetica", 7)
    c.setFillColor(MUTED)
    c.drawCentredString(
        PAGE_W / 2,
        winner_top + 0.02 * inch,
        f"Rows {next_num}–{end_num - 1}  ·  Closes Thu Sept 24 · 3:00 PM ET  ·  Claim by 4:00 PM ET or next bidder",
    )
    c.showPage()
    c.save()
    print(f"ok {lot['lot_code']}  page1={rows1} rows  page2={rows2} rows  → {path.name}")


def build_extra_pdf(path: Path) -> None:
    c = pdfcanvas.Canvas(str(path), pagesize=letter)
    c.setTitle("Midwest Silent Auction · Extra Bid Pages")

    for page in (1, 2):
        y = PAGE_H - MARGIN_TOP
        y = draw_header_band(c, y, "EXTRA", f"Blank page {page} of 2")

        c.setFont("Helvetica-Bold", 12)
        c.setFillColor(BLACK)
        c.drawCentredString(PAGE_W / 2, y, "SILENT AUCTION · EXTRA BID PAGE")
        y -= 16
        c.setFont("Helvetica", 8)
        c.setFillColor(MUTED)
        c.drawCentredString(
            PAGE_W / 2,
            y,
            "Write lot code / title / artist below, then clip under that lot’s clipboard",
        )
        y -= 14

        # Fill-in lot identity
        c.setStrokeColor(BLACK)
        c.setLineWidth(0.8)
        box_h = 0.85 * inch
        c.rect(MARGIN_X, y - box_h, PAGE_W - 2 * MARGIN_X, box_h, stroke=1, fill=0)
        c.setFont("Helvetica", 8)
        c.setFillColor(MUTED)
        c.drawString(MARGIN_X + 8, y - 14, "Lot code")
        c.drawString(PAGE_W / 2, y - 14, "Artwork title")
        c.setStrokeColor(RULE)
        c.line(MARGIN_X + 8, y - 28, PAGE_W / 2 - 12, y - 28)
        c.line(PAGE_W / 2, y - 28, PAGE_W - MARGIN_X - 8, y - 28)
        c.setFillColor(MUTED)
        c.drawString(MARGIN_X + 8, y - 46, "Artist")
        c.line(MARGIN_X + 8, y - 60, PAGE_W - MARGIN_X - 8, y - 60)
        y = y - box_h - 12

        c.setFont("Helvetica", 8)
        c.setFillColor(BLACK)
        y = draw_wrapped(
            c,
            "Continues the lot above. Closes Thu Sept 24 · 3:00 PM ET. "
            "Winner claims by 4:00 PM ET or next highest bidder. "
            "Name · email and/or phone · bid in sats.",
            MARGIN_X,
            y,
            PAGE_W - 2 * MARGIN_X,
            size=8,
            leading=10,
        )
        y -= 8
        y = draw_table_header(c, y)
        rows, _ = draw_bid_rows(c, y, MARGIN_BOTTOM + 0.28 * inch, 1)
        c.setFont("Helvetica", 7)
        c.setFillColor(MUTED)
        c.drawCentredString(PAGE_W / 2, 0.18 * inch, f"{rows} writing rows on this page")
        c.showPage()

    c.save()
    print(f"ok EXTRA  → {path.name}")


def build_combined(lot_paths: list[Path], extra: Path, out: Path) -> None:
    from pypdf import PdfWriter, PdfReader

    w = PdfWriter()
    for p in lot_paths:
        w.append(PdfReader(str(p)))
    w.append(PdfReader(str(extra)))
    with out.open("wb") as f:
        w.write(f)
    print(f"ok COMBINED ({len(lot_paths)} lots + extra) → {out.name}")


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_OUT.mkdir(parents=True, exist_ok=True)

    lot_paths: list[Path] = []
    for lot in LOTS:
        path = OUT_DIR / f"{lot['lot_code'].lower()}-{lot['slug']}-bid-sheet.pdf"
        build_lot_pdf(lot, path)
        (PUBLIC_OUT / path.name).write_bytes(path.read_bytes())
        lot_paths.append(path)

    extra = OUT_DIR / "extra-bid-pages.pdf"
    build_extra_pdf(extra)
    (PUBLIC_OUT / extra.name).write_bytes(extra.read_bytes())

    combined = OUT_DIR / "all-midwest-bid-sheets.pdf"
    try:
        build_combined(lot_paths, extra, combined)
        (PUBLIC_OUT / combined.name).write_bytes(combined.read_bytes())
    except Exception as e:
        # pypdf optional; pymupdf fallback
        import pymupdf

        doc = pymupdf.open()
        for p in lot_paths + [extra]:
            src = pymupdf.open(str(p))
            doc.insert_pdf(src)
            src.close()
        doc.save(str(combined))
        doc.close()
        (PUBLIC_OUT / combined.name).write_bytes(combined.read_bytes())
        print(f"ok COMBINED via pymupdf → {combined.name} ({e.__class__.__name__} on pypdf)")


if __name__ == "__main__":
    main()
