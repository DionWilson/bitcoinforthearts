#!/usr/bin/env python3
"""Generate printable 5×7 in landscape vinyl / wall cards for Midwest Bitcoin Arts Park.

Trim size: 7.00 in wide × 5.00 in tall. Outputs PDFs + 300dpi PNGs under
docs/midwest-2026/auction/vinyl-cards/ and a combined print PDF.
Uses brand-kit square-cream-orange bug.
"""

from __future__ import annotations

from pathlib import Path

import pymupdf
import qrcode
from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas as pdfcanvas
from reportlab.platypus import (
    HRFlowable,
    Image,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = Path(__file__).resolve().parent / "vinyl-cards"
LOGO = ROOT / "public/brand-kit/square-bugs/square-cream-orange.png"
PUBLIC_OUT = ROOT / "public/midwest/vinyl-cards"

ORANGE = colors.HexColor("#FF4F14")
CREAM = colors.HexColor("#FFFAF0")
BLACK = colors.black
MUTED = colors.HexColor("#333333")

# Landscape 5×7: 7 in wide × 5 in tall
CARD_W = 7 * inch
CARD_H = 5 * inch


class CardSpec:
    def __init__(
        self,
        filename: str,
        eyebrow: str,
        title: str,
        lines: list[str],
        qr_url: str | None = None,
        footer_url: str | None = None,
    ):
        self.filename = filename
        self.eyebrow = eyebrow
        self.title = title
        self.lines = lines
        self.qr_url = qr_url
        self.footer_url = footer_url


CARDS: list[CardSpec] = [
    CardSpec(
        "lot-01-satoshi-white-paper-52",
        "LOT-01 · PEER-TO-PEER SILENT AUCTION",
        "Satoshi White Paper Series #52",
        [
            "Block Height 770067",
            "CA Danner · 2022-2023 · Mixed media on linen canvas · 22 × 28 in",
            "",
            "Opening bid  150,000 sats (about $125)",
            "Minimum increase  21,000 sats",
            "",
            "Of the winning bid: 1/3 → BFTA (501c3) · 2/3 → CA Danner",
            "Closes Thursday, Sept 24 · 3:00 PM ET",
            "Pickup in Columbus only. Sign the bid sheet to enter.",
        ],
        qr_url="https://www.bitcoinforthearts.org/midwest/auction/satoshi-white-paper-52",
        footer_url="bitcoinforthearts.org/midwest/auction/satoshi-white-paper-52",
    ),
    CardSpec(
        "lot-02-transfer-of-light",
        "LOT-02 · PEER-TO-PEER SILENT AUCTION",
        "The Transfer of Light",
        [
            "Lady RedHorns · Angels of Freedom · Acrylic on canvas · 16 × 16 in",
            "",
            "Connection and transformation as orange Bitcoin light",
            "passes through a gaze and awakens another soul.",
            "",
            "Opening bid  1,000,000 sats (about $850)",
            "Minimum increase  21,000 sats",
            "",
            "Of the winning bid:",
            "________ → Bitcoin for the Arts (501c3)",
            "________ → Lady RedHorns",
            "",
            "Closes Thursday, Sept 24 · 3:00 PM ET · Columbus pickup",
            "Lightning: ladyredhorns@coinos.io",
        ],
        qr_url="https://www.bitcoinforthearts.org/midwest/auction/transfer-of-light",
        footer_url="bitcoinforthearts.org/midwest/auction/transfer-of-light",
    ),
    CardSpec(
        "lot-05-bitcoin-keeper",
        "LOT-05 · PEER-TO-PEER SILENT AUCTION",
        "The Bitcoin Keeper",
        [
            "Lady RedHorns · Angels of Freedom · Acrylic on canvas · 16 × 16 in",
            "",
            "Bitcoin as hope, inner freedom, and conviction.",
            "The angel as guardian of values beyond measure.",
            "",
            "Opening bid  1,000,000 sats (about $850)",
            "Minimum increase  21,000 sats",
            "",
            "Of the winning bid:",
            "________ → Bitcoin for the Arts (501c3)",
            "________ → Lady RedHorns",
            "",
            "Closes Thursday, Sept 24 · 3:00 PM ET · Columbus pickup",
            "Lightning: ladyredhorns@coinos.io",
        ],
        qr_url="https://www.bitcoinforthearts.org/midwest/auction/bitcoin-keeper",
        footer_url="bitcoinforthearts.org/midwest/auction/bitcoin-keeper",
    ),
    CardSpec(
        "lot-06-temptation-of-bitcoin-angel",
        "LOT-06 · PEER-TO-PEER SILENT AUCTION",
        "The Temptation of Bitcoin Angel",
        [
            "Lady RedHorns · Angels of Freedom · Acrylic on canvas · 16 × 16 in",
            "",
            "The Fiat Demon offers a tempting bargain;",
            "the Bitcoin Angel turns toward the symbol on its wing.",
            "",
            "Opening bid  1,000,000 sats (about $850)",
            "Minimum increase  21,000 sats",
            "",
            "Of the winning bid:",
            "________ → Bitcoin for the Arts (501c3)",
            "________ → Lady RedHorns",
            "",
            "Closes Thursday, Sept 24 · 3:00 PM ET · Columbus pickup",
            "Lightning: ladyredhorns@coinos.io",
        ],
        qr_url="https://www.bitcoinforthearts.org/midwest/auction/temptation-of-bitcoin-angel",
        footer_url="bitcoinforthearts.org/midwest/auction/temptation-of-bitcoin-angel",
    ),
    CardSpec(
        "lot-03-hodl-on",
        "LOT-03 · PEER-TO-PEER SILENT AUCTION",
        "HODL On",
        [
            "Bitsby holding onto the Bitcoin balloon",
            "Shipwreck Sean · Original painting · 40 × 16 in (H × W)",
            "",
            "Opening bid  2,100,000 sats (about $1,700)",
            "Minimum increase  21,000 sats",
            "",
            "Of the winning bid: 100% → Bitcoin for the Arts (501c3)",
            "Closes Thursday, Sept 24 · 3:00 PM ET",
            "Pickup in Columbus only. Sign the bid sheet to enter.",
        ],
        qr_url="https://www.bitcoinforthearts.org/midwest/auction/hodl-on",
        footer_url="bitcoinforthearts.org/midwest/auction/hodl-on",
    ),
    CardSpec(
        "lot-04-timechain-magazine-genesis",
        "LOT-04 · PEER-TO-PEER SILENT AUCTION",
        "Timechain Art Magazine",
        [
            "Gold Foil Genesis Edition",
            "",
            "Includes: Gold Foil Genesis /210 (signed Asanoha);",
            "Genesis Edition Limited 1720;",
            "Silk Mandala Archival Serigraph /210 (signed Asanoha)",
            "",
            "Retail $269 · 100% → Bitcoin for the Arts",
            "Opens at 0 sats · Min bid / increase  21,000 sats",
            "",
            "Closes Thursday, Sept 24 · 3:00 PM ET",
            "Pickup in Columbus only. Sign the bid sheet to enter.",
        ],
        qr_url="https://www.bitcoinforthearts.org/midwest/auction/timechain-magazine-genesis",
        footer_url="bitcoinforthearts.org/midwest/auction/timechain-magazine-genesis",
    ),
    CardSpec(
        "sean-volatility-blues",
        "SHIPWRECK SEAN · FOR SALE",
        "The Volatility Blues",
        [
            "Old-fashioned drink and Bitsby",
            "Original painting · 20 × 24 in (H × W)",
            "",
            "3,500,000 sats",
            "0.035 BTC · about $3,000",
            "",
            "Ask the booth to purchase. Pickup in Columbus only.",
            "shipwrecksean.com · bitsby.co · @artbyshipwreck",
        ],
    ),
    CardSpec(
        "sean-slice-of-history",
        "SHIPWRECK SEAN · FOR SALE",
        "A Slice of History",
        [
            "The pizza slice painting",
            "Original painting · 40 × 16 in (H × W)",
            "",
            "3,000,000 sats",
            "0.03 BTC · about $2,550",
            "",
            "Ask the booth to purchase. Pickup in Columbus only.",
            "shipwrecksean.com · bitsby.co · @artbyshipwreck",
        ],
    ),
    CardSpec(
        "sean-cold-storage",
        "SHIPWRECK SEAN · FOR SALE",
        "Cold Storage",
        [
            "Bitsby frozen in an ice cube",
            "Original painting · 20 × 24 in (H × W)",
            "",
            "2,000,000 sats",
            "0.02 BTC · about $1,700",
            "",
            "Ask the booth to purchase. Pickup in Columbus only.",
            "shipwrecksean.com · bitsby.co · @artbyshipwreck",
        ],
    ),
    CardSpec(
        "sean-live-raffle",
        "SHIPWRECK SEAN · LIVE PAINTING · RAFFLE",
        "Live Canvas",
        [
            "Title TBD · painted live at Bitcoin Arts Park",
            "Bitsby appears on the canvas; the rest comes from the room.",
            "Original painting · 20 × 16 in (H × W)",
            "",
            "Raffle entry  6,500 sats (about $5)",
            "Winner announced Thursday, Sept 24 · 3:00 PM ET",
            "Ask the booth how to enter.",
            "",
            "shipwrecksean.com · bitsby.co · @artbyshipwreck",
        ],
    ),
]


def make_qr(url: str, path: Path) -> Path:
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=12,
        border=2,
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white").convert("RGB")
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path)
    return path


def styles():
    base = getSampleStyleSheet()
    return {
        "eyebrow": ParagraphStyle(
            "eyebrow",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=7.5,
            leading=9,
            textColor=ORANGE,
            alignment=TA_LEFT,
            spaceAfter=2,
        ),
        "title": ParagraphStyle(
            "title",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=15,
            textColor=BLACK,
            alignment=TA_LEFT,
            spaceAfter=3,
        ),
        "body": ParagraphStyle(
            "body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8,
            leading=10,
            textColor=BLACK,
            alignment=TA_LEFT,
            spaceAfter=0,
        ),
        "qr_label": ParagraphStyle(
            "qr_label",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7,
            leading=9,
            textColor=BLACK,
            alignment=TA_CENTER,
        ),
        "footer": ParagraphStyle(
            "footer",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=6,
            leading=7.5,
            textColor=MUTED,
            alignment=TA_CENTER,
        ),
        "event": ParagraphStyle(
            "event",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7,
            leading=9,
            textColor=MUTED,
            alignment=TA_LEFT,
        ),
    }


def draw_page(c: pdfcanvas.Canvas, doc):
    c.saveState()
    c.setFillColor(CREAM)
    c.rect(0, 0, CARD_W, CARD_H, fill=1, stroke=0)
    # Footer pinned to bottom of landscape card
    c.setStrokeColor(BLACK)
    c.setLineWidth(0.8)
    y_line = 0.32 * inch
    c.line(0.28 * inch, y_line, CARD_W - 0.28 * inch, y_line)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 6)
    tag = "UNCENSORABLE MONEY · UNCENSORABLE MINDS · 501(c)(3)"
    c.drawCentredString(CARD_W / 2, 0.16 * inch, tag)
    c.restoreState()


def build_card(spec: CardSpec, out_pdf: Path) -> None:
    s = styles()
    doc = SimpleDocTemplate(
        str(out_pdf),
        pagesize=(CARD_W, CARD_H),
        leftMargin=0.28 * inch,
        rightMargin=0.28 * inch,
        topMargin=0.22 * inch,
        bottomMargin=0.45 * inch,  # room for pinned footer
    )

    logo_img = PILImage.open(LOGO).convert("RGBA")
    bbox = logo_img.getbbox()
    if bbox:
        logo_img = logo_img.crop(bbox)
    logo_path = OUT_DIR / "_logo-square.png"
    logo_img.save(logo_path)
    logo_w = 0.78 * inch
    aspect = logo_img.height / logo_img.width
    logo_h = logo_w * aspect

    header = Table(
        [
            [
                Image(str(logo_path), width=logo_w, height=logo_h),
                Paragraph(
                    "<b><font color='#FF4F14'>BITCOIN FOR THE ARTS</font></b><br/>"
                    "Bitcoin Arts Park · Midwest Bitcoin Summit · "
                    "Sept 23-24, 2026 · Columbus, OH",
                    s["event"],
                ),
            ]
        ],
        colWidths=[0.95 * inch, 5.45 * inch],
    )
    header.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
            ]
        )
    )

    body_parts: list[str] = []
    for line in spec.lines:
        if line:
            body_parts.append(line.replace("&", "&amp;"))
        else:
            body_parts.append("<font size='4'>&nbsp;</font>")
    left_col = [
        Paragraph(spec.eyebrow.replace("·", "&middot;"), s["eyebrow"]),
        Paragraph(spec.title, s["title"]),
        Paragraph("<br/>".join(body_parts), s["body"]),
    ]

    if spec.qr_url:
        qr_path = OUT_DIR / f"_qr-{spec.filename}.png"
        make_qr(spec.qr_url, qr_path)
        # Short display path under QR (avoid ugly mid-word wraps)
        short = (spec.footer_url or "").replace("bitcoinforthearts.org", "bfta.org")
        right_col = [
            Image(str(qr_path), width=1.25 * inch, height=1.25 * inch),
            Spacer(1, 6),
            Paragraph("<b>Scan for details</b><br/>&amp; advance bid", s["qr_label"]),
            Spacer(1, 4),
            Paragraph(f"<font size='5.5' color='#333333'>{short}</font>", s["qr_label"]),
        ]
    else:
        right_col = [
            Spacer(1, 24),
            Paragraph(
                "<b>Bitcoin for the Arts</b><br/>bitcoinforthearts.org",
                s["qr_label"],
            ),
        ]

    main = Table(
        [[left_col, right_col]],
        colWidths=[4.55 * inch, 1.85 * inch],
    )
    main.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (0, 0), 10),
                ("RIGHTPADDING", (1, 0), (1, 0), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )

    story: list = [
        header,
        HRFlowable(width="100%", thickness=2, color=ORANGE, spaceBefore=2, spaceAfter=8),
        main,
    ]

    doc.build(story, onFirstPage=draw_page, onLaterPages=draw_page)

    check = pymupdf.open(str(out_pdf))
    pages = check.page_count
    w_in = check[0].rect.width / 72
    h_in = check[0].rect.height / 72
    check.close()
    if pages != 1:
        raise RuntimeError(f"{out_pdf.name} spilled to {pages} pages; tighten copy/layout")
    if abs(w_in - 7.0) > 0.01 or abs(h_in - 5.0) > 0.01:
        raise RuntimeError(f"{out_pdf.name} is {w_in:.2f}×{h_in:.2f} in; expected 7×5 landscape")


def pdf_to_png(pdf_path: Path, png_path: Path, dpi: int = 300) -> None:
    doc = pymupdf.open(str(pdf_path))
    page = doc[0]
    zoom = dpi / 72
    pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=False)
    pix.save(str(png_path))


def build_combined(pdf_paths: list[Path], out_path: Path) -> None:
    combined = pymupdf.open()
    for p in pdf_paths:
        src = pymupdf.open(str(p))
        if src.page_count != 1:
            raise RuntimeError(f"{p.name} has {src.page_count} pages; refuse to pack")
        combined.insert_pdf(src, from_page=0, to_page=0)
        src.close()
    combined.save(str(out_path))
    combined.close()


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_OUT.mkdir(parents=True, exist_ok=True)

    pdf_paths: list[Path] = []
    for spec in CARDS:
        pdf_path = OUT_DIR / f"{spec.filename}.pdf"
        png_path = OUT_DIR / f"{spec.filename}.png"
        build_card(spec, pdf_path)
        pdf_to_png(pdf_path, png_path)
        (PUBLIC_OUT / pdf_path.name).write_bytes(pdf_path.read_bytes())
        (PUBLIC_OUT / png_path.name).write_bytes(png_path.read_bytes())
        pdf_paths.append(pdf_path)
        print(f"ok {spec.filename}")

    combined = OUT_DIR / "all-midwest-vinyl-cards.pdf"
    build_combined(pdf_paths, combined)
    (PUBLIC_OUT / combined.name).write_bytes(combined.read_bytes())
    print(f"combined {combined} ({len(pdf_paths)} cards · landscape 7×5)")

    for scratch in OUT_DIR.glob("_*.png"):
        scratch.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
