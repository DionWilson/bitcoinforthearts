#!/usr/bin/env python3
"""Generate a single-sheet letter PDF for Bitcoin Arts Park schedule.

Outputs:
  docs/midwest-2026/bitcoin-arts-park-schedule.pdf
  public/midwest/bitcoin-arts-park-schedule.pdf
"""

from __future__ import annotations

from pathlib import Path

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas as pdfcanvas

ROOT = Path(__file__).resolve().parents[2]
LOGO = ROOT / "public/brand-kit/main-lockups/main-cream-orange.png"
OUT_DOCS = Path(__file__).resolve().parent / "bitcoin-arts-park-schedule.pdf"
OUT_PUBLIC = ROOT / "public/midwest/bitcoin-arts-park-schedule.pdf"

ORANGE = (1.0, 0.310, 0.078)  # #FF4F14
CREAM = (1.0, 0.980, 0.941)  # #FFFAF0
BLACK = (0, 0, 0)
MUTED = (0.27, 0.27, 0.27)
WHITE = (1, 1, 1)

# Wednesday Expo lunch: Ainsley 45-min set + grant presentation (no Short North / Sweeney on Wed).
WED = [
    ("10:00–10:20", "Booth", "Doors · Proof of Print"),
    ("10:20–10:50", "Booth", "Cinema: Liberty · Poverty Ep 1"),
    ("10:55–11:25", "Booth", "Cinema: Liberty · Poverty Ep 2"),
    ("11:30–11:45", "Booth", "Nadia Vaeh · film pitch"),
    ("12:00–12:10", "Expo", "Dion · BFTA intro → Ainsley"),
    ("12:10–12:55", "Expo", "Live: Ainsley Costello (45 min)"),
    ("12:55–1:10", "Expo", "Grant presentation · Ainsley BFTA"),
    ("1:15–1:45", "Booth", "Cinema: Liberty · Poverty Ep 3"),
    ("1:45–2:15", "Booth", "Cinema: Hummingbird"),
    ("2:20–2:50", "Booth", "Cinema: Bigger Than Bitcoin"),
    ("2:55–3:10", "Booth", "Jason R. Johnston · film pitch"),
    ("3:15–4:00", "Booth", "Cinema: Finding Home"),
    ("4:00–5:00", "Booth", "Soft close · trailer loop"),
]

THU = [
    ("10:00–10:20", "Booth", "Doors · Proof of Print"),
    ("10:20–11:05", "Booth", "Cinema: Finding Home"),
    ("11:10–11:40", "Booth", "Cinema: Liberty · Poverty Ep 1"),
    ("11:45–12:00", "Booth", "Nadia Vaeh · film pitch"),
    ("12:00–12:10", "Expo", "Dion · BFTA intro → Andy"),
    ("12:10–12:40", "Expo", "Live: Andy Breakheart"),
    ("12:40–12:50", "Expo", "Dion · transition → Short North"),
    ("12:50–1:00", "Expo", "Short North · youth theater"),
    ("1:05–1:35", "Booth", "Cinema: Hummingbird / Liberty"),
    ("1:35–1:50", "Booth", "Jason R. Johnston · film pitch"),
    ("1:50–2:15", "Booth", "Ainsley · booth storytelling"),
    ("2:20–2:50", "Expo", "Panel: Does Bitcoin Need Art?"),
    ("3:00", "Booth", "Auction close + raffle draw"),
    ("3:10–3:40", "Booth", "Cinema: Bigger Than Bitcoin"),
    ("3:45–4:15", "Booth", "Cinema: Liberty / Finding Home"),
    ("4:15–5:00", "Booth", "Claims · soft close"),
]


def fit_text(c: pdfcanvas.Canvas, text: str, font: str, size: float, max_w: float) -> tuple[str, float]:
    """Shrink font slightly if needed so text fits max_w. Returns (text, size)."""
    s = size
    while s > 6.5 and stringWidth(text, font, s) > max_w:
        s -= 0.25
    if stringWidth(text, font, s) <= max_w:
        return text, s
    # Truncate with ellipsis as last resort
    ell = "…"
    t = text
    while t and stringWidth(t + ell, font, s) > max_w:
        t = t[:-1]
    return (t + ell) if t else ell, s


def build(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    c = pdfcanvas.Canvas(str(path), pagesize=letter)
    w, h = letter

    margin = 0.32 * inch
    frame = 0.22 * inch

    # Cream background + orange frame
    c.setFillColorRGB(*CREAM)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setStrokeColorRGB(*ORANGE)
    c.setLineWidth(2.75)
    c.rect(frame, frame, w - 2 * frame, h - 2 * frame)

    # Footer band first so we know content bottom
    band_h = 0.52 * inch
    band_bottom = frame + 0.12 * inch
    band_top = band_bottom + band_h

    c.setFillColorRGB(*BLACK)
    c.rect(margin, band_bottom, w - 2 * margin, band_h, fill=1, stroke=0)
    c.setFillColorRGB(*CREAM)
    c.setFont("Helvetica", 7.2)
    always = (
        "Always on both days: Gallery + silent auction  ·  Sean live painting + raffle  ·  "
        "Proof of Print  ·  Living Room  ·  A13MW loop  ·  IndeeHub  ·  Podcast tapings throughout"
    )
    c.drawCentredString(w / 2, band_bottom + 0.30 * inch, always)
    c.setFillColorRGB(0.7, 1.0, 0.28)
    c.setFont("Helvetica", 6.8)
    c.drawCentredString(
        w / 2,
        band_bottom + 0.12 * inch,
        "bitcoinforthearts.org/midwest/schedule   ·   Art panel Thu 2:20 PM ET   ·   Auction + raffle Thu 3:00 PM ET   ·   EIN 41-2642260",
    )

    # Header
    y = h - margin - 0.06 * inch
    if LOGO.exists():
        logo_w = 0.68 * inch
        logo_h = 0.67 * inch
        c.drawImage(
            str(LOGO),
            (w - logo_w) / 2,
            y - logo_h,
            width=logo_w,
            height=logo_h,
            mask="auto",
            preserveAspectRatio=True,
            anchor="c",
        )
        y -= logo_h + 0.05 * inch

    c.setFillColorRGB(*ORANGE)
    c.setFont("Helvetica-Bold", 8)
    c.drawCentredString(w / 2, y, "BITCOIN FOR THE ARTS")
    y -= 0.17 * inch

    c.setFillColorRGB(*BLACK)
    c.setFont("Helvetica", 15)
    c.drawCentredString(w / 2, y, "Bitcoin Arts Park  ·  Run of Show")
    y -= 0.16 * inch

    c.setFillColorRGB(*MUTED)
    c.setFont("Helvetica", 8)
    c.drawCentredString(
        w / 2,
        y,
        "Midwest Bitcoin Summit  ·  Columbus  ·  Sept 23–24, 2026  ·  10:00 AM–5:00 PM ET",
    )
    y -= 0.22 * inch

    # Two columns — fill from header down to just above footer
    gutter = 0.18 * inch
    left_x = margin
    col_w = (w - 2 * margin - gutter) / 2
    right_x = left_x + col_w + gutter
    list_top = y
    list_bottom = band_top + 0.08 * inch
    day_header_h = 0.26 * inch

    def draw_day(x: float, title: str, rows: list[tuple[str, str, str]]) -> None:
        c.setFillColorRGB(*ORANGE)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(x, list_top, title)
        c.setStrokeColorRGB(*ORANGE)
        c.setLineWidth(1.6)
        rule_y = list_top - 0.09 * inch
        c.line(x, rule_y, x + col_w, rule_y)

        area_top = list_top - day_header_h
        area_h = area_top - list_bottom
        n = len(rows)
        # Spread this day's rows across the full column height.
        row_h = area_h / n

        time_size = min(10.5, max(8.8, row_h * 0.34))
        place_size = min(10.0, max(8.4, row_h * 0.32))
        title_size = min(11.5, max(9.5, row_h * 0.40))

        for i, (time, place, title_txt) in enumerate(rows):
            row_top = area_top - i * row_h
            row_bot = row_top - row_h

            if i % 2 == 0:
                c.setFillColorRGB(*WHITE)
                c.rect(x, row_bot, col_w, row_h, fill=1, stroke=0)

            mid = (row_top + row_bot) / 2
            line1_y = mid + row_h * 0.16
            line2_y = mid - row_h * 0.20

            c.setFillColorRGB(*MUTED)
            c.setFont("Helvetica-Bold", time_size)
            c.drawString(x + 0.10 * inch, line1_y, time)

            time_w = stringWidth(time, "Helvetica-Bold", time_size)
            c.setFillColorRGB(*ORANGE)
            c.setFont("Helvetica-Bold", place_size)
            c.drawString(x + 0.16 * inch + time_w, line1_y, place)

            text, used = fit_text(
                c, title_txt, "Helvetica", title_size, col_w - 0.20 * inch
            )
            c.setFillColorRGB(*BLACK)
            c.setFont("Helvetica", used)
            c.drawString(x + 0.10 * inch, line2_y, text)

            c.setStrokeColorRGB(0.87, 0.84, 0.78)
            c.setLineWidth(0.45)
            c.line(x, row_bot, x + col_w, row_bot)

    draw_day(left_x, "WEDNESDAY  ·  SEPT 23", WED)
    c.setStrokeColorRGB(*ORANGE)
    c.setLineWidth(1.5)
    c.line(w / 2, list_bottom, w / 2, list_top + 0.06 * inch)
    draw_day(right_x, "THURSDAY  ·  SEPT 24", THU)

    c.showPage()
    c.save()


def main() -> None:
    build(OUT_DOCS)
    build(OUT_PUBLIC)
    print(f"Wrote {OUT_DOCS}")
    print(f"Wrote {OUT_PUBLIC}")


if __name__ == "__main__":
    main()
