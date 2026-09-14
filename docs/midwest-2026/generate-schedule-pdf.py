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
from reportlab.pdfgen import canvas as pdfcanvas

ROOT = Path(__file__).resolve().parents[2]
LOGO = ROOT / "public/brand-kit/main-lockups/main-cream-orange.png"
OUT_DOCS = Path(__file__).resolve().parent / "bitcoin-arts-park-schedule.pdf"
OUT_PUBLIC = ROOT / "public/midwest/bitcoin-arts-park-schedule.pdf"

ORANGE = (1.0, 0.310, 0.078)  # #FF4F14
CREAM = (1.0, 0.980, 0.941)  # #FFFAF0
BLACK = (0, 0, 0)
MUTED = (0.27, 0.27, 0.27)

WED = [
    ("10:00–10:20", "Booth", "Doors · Proof of Print"),
    ("10:20–10:50", "Booth", "Cinema: Liberty · Poverty Ep 1"),
    ("10:55–11:25", "Booth", "Cinema: Liberty · Poverty Ep 2"),
    ("11:30–11:45", "Booth", "Nadia Vaeh · film pitch"),
    ("12:00–12:10", "Expo", "Dion · BFTA intro → Ainsley"),
    ("12:10–12:40", "Expo", "Live: Ainsley Costello"),
    ("12:40–12:50", "Expo", "Dion · Ainsley initial BFTA grantee"),
    ("12:50–1:00", "Expo", "Short North · Sweeney Todd excerpt"),
    ("1:10–1:40", "Booth", "Cinema: Liberty · Poverty Ep 3"),
    ("1:45–2:15", "Booth", "Cinema: Hummingbird"),
    ("2:20–2:50", "Booth", "Cinema: Bigger Than Bitcoin"),
    ("2:55–3:10", "Booth", "Jason R. Johnston · film pitch"),
    ("3:30–~4:40", "Booth", "Featured: Dirty Coin (Kenema)"),
    ("4:40–5:00", "Booth", "Soft close · trailer loop"),
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
    ("~1:00–1:08", "Expo", "Lindey · book handoff (TBD)"),
    ("1:10–1:45", "Booth", "Cinema: Hummingbird / Liberty"),
    ("1:15–1:30", "Booth", "Jason R. Johnston · film pitch"),
    ("1:50–2:20", "Expo", "Panel: Does Bitcoin Need Art?"),
    ("2:25–2:50", "Booth", "Ainsley · booth storytelling"),
    ("3:00", "Booth", "Auction close + raffle draw"),
    ("3:10–3:40", "Booth", "Cinema: Bigger Than Bitcoin"),
    ("3:45–4:15", "Booth", "Cinema: Liberty / Finding Home"),
    ("4:15–5:00", "Booth", "Claims · soft close"),
]


def build(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    c = pdfcanvas.Canvas(str(path), pagesize=letter)
    w, h = letter

    # Cream background + orange frame
    c.setFillColorRGB(*CREAM)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setStrokeColorRGB(*ORANGE)
    c.setLineWidth(2.5)
    c.rect(0.28 * inch, 0.28 * inch, w - 0.56 * inch, h - 0.56 * inch)

    y = h - 0.48 * inch

    if LOGO.exists():
        logo_w = 0.95 * inch
        logo_h = 0.93 * inch
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
        y -= logo_h + 0.08 * inch

    c.setFillColorRGB(*ORANGE)
    c.setFont("Helvetica-Bold", 7.5)
    c.drawCentredString(w / 2, y, "BITCOIN FOR THE ARTS")
    y -= 0.18 * inch

    c.setFillColorRGB(*BLACK)
    c.setFont("Helvetica", 14)
    c.drawCentredString(w / 2, y, "Bitcoin Arts Park  ·  Run of Show")
    y -= 0.16 * inch

    c.setFillColorRGB(*MUTED)
    c.setFont("Helvetica", 7.5)
    c.drawCentredString(
        w / 2,
        y,
        "Midwest Bitcoin Summit  ·  Greater Columbus Convention Center  ·  Sept 23–24, 2026  ·  10:00 AM–5:00 PM ET",
    )
    y -= 0.22 * inch

    # Two columns
    left_x = 0.48 * inch
    right_x = w / 2 + 0.12 * inch
    col_w = w / 2 - 0.55 * inch
    top_y = y

    def draw_day(x: float, title: str, rows: list[tuple[str, str, str]], start_y: float) -> float:
        yy = start_y
        c.setFillColorRGB(*ORANGE)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(x, yy, title)
        yy -= 0.14 * inch
        c.setStrokeColorRGB(*ORANGE)
        c.setLineWidth(1)
        c.line(x, yy + 0.06 * inch, x + col_w, yy + 0.06 * inch)
        yy -= 0.02 * inch

        row_h = 0.195 * inch
        for i, (time, place, title_txt) in enumerate(rows):
            if i % 2 == 0:
                c.setFillColorRGB(1, 1, 1)
                c.rect(x, yy - 0.04 * inch, col_w, row_h, fill=1, stroke=0)

            c.setFillColorRGB(*MUTED)
            c.setFont("Helvetica-Bold", 6.2)
            c.drawString(x + 0.04 * inch, yy + 0.04 * inch, time)

            c.setFillColorRGB(*ORANGE)
            c.setFont("Helvetica", 6.0)
            c.drawString(x + 1.05 * inch, yy + 0.04 * inch, place)

            c.setFillColorRGB(*BLACK)
            c.setFont("Helvetica", 6.4)
            c.drawString(x + 1.42 * inch, yy + 0.04 * inch, title_txt)

            yy -= row_h
        return yy

    draw_day(left_x, "WEDNESDAY  ·  SEPT 23", WED, top_y)
    # Divider
    c.setStrokeColorRGB(*ORANGE)
    c.setLineWidth(1.2)
    c.line(w / 2, 0.95 * inch, w / 2, top_y + 0.08 * inch)
    end_y = draw_day(right_x, "THURSDAY  ·  SEPT 24", THU, top_y)

    # Always-on footer band
    band_y = 0.55 * inch
    c.setFillColorRGB(*BLACK)
    c.rect(0.4 * inch, band_y, w - 0.8 * inch, 0.42 * inch, fill=1, stroke=0)
    c.setFillColorRGB(*CREAM)
    c.setFont("Helvetica", 6.0)
    always = (
        "Always on both days: Gallery + silent auction  ·  Shipwreck Sean live painting + raffle  ·  "
        "Proof of Print demos  ·  Living Room  ·  A13MW hello loop  ·  IndeeHub  ·  Podcast tapings throughout"
    )
    c.drawCentredString(w / 2, band_y + 0.24 * inch, always)
    c.setFillColorRGB(0.7, 1.0, 0.28)  # lime
    c.setFont("Helvetica", 5.8)
    c.drawCentredString(
        w / 2,
        band_y + 0.10 * inch,
        "bitcoinforthearts.org/midwest/schedule   ·   Dirty Coin Wed 3:30 PM ET (Kenema)   ·   Auction + raffle Thu 3:00 PM ET   ·   EIN 41-2642260",
    )

    c.showPage()
    c.save()


def main() -> None:
    build(OUT_DOCS)
    build(OUT_PUBLIC)
    print(f"Wrote {OUT_DOCS}")
    print(f"Wrote {OUT_PUBLIC}")


if __name__ == "__main__":
    main()
