#!/usr/bin/env python3
"""Generate a print-ready wall flyer for Midwest Bitcoin Arts Park soft goods.

Letter size (8.5 × 11 in portrait). Vector PDF + 300 dpi PNG.
T-shirts and hats are not for sale — suggested donations with QR to give.
"""

from __future__ import annotations

from pathlib import Path

import pymupdf
import qrcode
from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    Image,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[3]
OUT_DIR = Path(__file__).resolve().parent
PUBLIC_OUT = ROOT / "public/midwest/merch-flyer"
LOGO = ROOT / "public/brand-kit/main-lockups/main-cream-orange.png"
BUG = ROOT / "public/brand-kit/square-bugs/square-cream-orange.png"

ORANGE = colors.HexColor("#FF4F14")
CREAM = colors.HexColor("#FFFAF0")
BLACK = colors.black
MUTED = colors.HexColor("#3A3A3A")

PAGE_W = 8.5 * inch
PAGE_H = 11 * inch

# Open-amount Zaprite checkout so donors can enter $30 / $35 (or any gift).
DONATE_URL = "https://pay.zaprite.com/pl_BFbJ9QnTfB"
DONATE_DISPLAY = "bitcoinforthearts.org/donate"


def make_qr_png(path: Path, url: str, box_size: int = 16) -> None:
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=box_size,
        border=2,
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white").convert("RGB")
    # Upscale cleanly for print sharpness if needed
    target = 1200
    if max(img.size) < target:
        scale = target / max(img.size)
        img = img.resize(
            (int(img.size[0] * scale), int(img.size[1] * scale)),
            PILImage.Resampling.NEAREST,
        )
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, format="PNG", dpi=(300, 300))


def build_flyer(pdf_path: Path, qr_path: Path) -> None:
    make_qr_png(qr_path, DONATE_URL)

    doc = SimpleDocTemplate(
        str(pdf_path),
        pagesize=(PAGE_W, PAGE_H),
        leftMargin=0.6 * inch,
        rightMargin=0.6 * inch,
        topMargin=0.4 * inch,
        bottomMargin=0.4 * inch,
    )

    styles = {
        "eyebrow": ParagraphStyle(
            "eyebrow",
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=13,
            textColor=ORANGE,
            alignment=TA_CENTER,
            spaceAfter=4,
        ),
        "title": ParagraphStyle(
            "title",
            fontName="Helvetica-Bold",
            fontSize=26,
            leading=30,
            textColor=BLACK,
            alignment=TA_CENTER,
            spaceAfter=6,
        ),
        "dek": ParagraphStyle(
            "dek",
            fontName="Helvetica",
            fontSize=11,
            leading=15,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=10,
        ),
        "price_label": ParagraphStyle(
            "price_label",
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=12,
            textColor=ORANGE,
            alignment=TA_CENTER,
        ),
        "price_item": ParagraphStyle(
            "price_item",
            fontName="Helvetica-Bold",
            fontSize=20,
            leading=24,
            textColor=BLACK,
            alignment=TA_CENTER,
        ),
        "price_sub": ParagraphStyle(
            "price_sub",
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            textColor=MUTED,
            alignment=TA_CENTER,
        ),
        "scan": ParagraphStyle(
            "scan",
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=16,
            textColor=BLACK,
            alignment=TA_CENTER,
            spaceBefore=4,
            spaceAfter=2,
        ),
        "url": ParagraphStyle(
            "url",
            fontName="Helvetica",
            fontSize=10,
            leading=13,
            textColor=MUTED,
            alignment=TA_CENTER,
        ),
        "fine": ParagraphStyle(
            "fine",
            fontName="Helvetica",
            fontSize=8,
            leading=10,
            textColor=MUTED,
            alignment=TA_CENTER,
        ),
    }

    def draw_page(canvas, _doc):
        canvas.saveState()
        canvas.setFillColor(CREAM)
        canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
        canvas.setFillColor(ORANGE)
        canvas.rect(0, PAGE_H - 0.14 * inch, PAGE_W, 0.14 * inch, fill=1, stroke=0)
        canvas.rect(0, 0, PAGE_W, 0.1 * inch, fill=1, stroke=0)
        canvas.restoreState()

    logo = LOGO if LOGO.exists() else BUG
    logo_w = 3.1 * inch
    with PILImage.open(logo) as im:
        aspect = im.size[1] / im.size[0]
    logo_h = logo_w * aspect

    story = []
    story.append(Image(str(logo), width=logo_w, height=logo_h, hAlign="CENTER"))
    story.append(Spacer(1, 0.18 * inch))
    story.append(Paragraph("BITCOIN ARTS PARK · MIDWEST BITCOIN SUMMIT", styles["eyebrow"]))
    story.append(Paragraph("Soft goods · take what fits", styles["title"]))
    story.append(
        Paragraph(
            "These shirts and hats are <b>not for sale</b>. "
            "If you take one, please leave a donation to support Bitcoin for the Arts "
            "and the artists we fund.",
            styles["dek"],
        )
    )

    price_table = Table(
        [
            [
                Paragraph("T-SHIRT", styles["price_label"]),
                Paragraph("HAT", styles["price_label"]),
            ],
            [
                Paragraph("$30", styles["price_item"]),
                Paragraph("$35", styles["price_item"]),
            ],
            [
                Paragraph("Suggested donation", styles["price_sub"]),
                Paragraph("Suggested donation", styles["price_sub"]),
            ],
        ],
        colWidths=[3.15 * inch, 3.15 * inch],
    )
    price_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("BOX", (0, 0), (-1, -1), 1.5, ORANGE),
                ("INNERGRID", (0, 0), (-1, -1), 0.75, colors.HexColor("#E8E0D4")),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        )
    )
    story.append(price_table)
    story.append(Spacer(1, 0.22 * inch))
    story.append(Paragraph("Scan to give", styles["scan"]))
    story.append(
        Paragraph(
            "Enter <b>$30</b> for a shirt or <b>$35</b> for a hat "
            "(or any amount that feels right).",
            styles["dek"],
        )
    )

    qr_display = 2.35 * inch
    story.append(Image(str(qr_path), width=qr_display, height=qr_display, hAlign="CENTER"))
    story.append(Spacer(1, 0.08 * inch))
    story.append(Paragraph(DONATE_DISPLAY, styles["url"]))
    story.append(Spacer(1, 0.14 * inch))
    story.append(
        Paragraph(
            "Bitcoin for the Arts · 501(c)(3) · EIN 41-2642260<br/>"
            "Bitcoin, Lightning, or card · Thank you for supporting working artists.",
            styles["fine"],
        )
    )

    pdf_path.parent.mkdir(parents=True, exist_ok=True)
    doc.build(story, onFirstPage=draw_page, onLaterPages=draw_page)

    check = pymupdf.open(str(pdf_path))
    if check.page_count != 1:
        check.close()
        raise RuntimeError(f"{pdf_path.name} spilled to more than one page")
    w_in = check[0].rect.width / 72
    h_in = check[0].rect.height / 72
    check.close()
    if abs(w_in - 8.5) > 0.01 or abs(h_in - 11.0) > 0.01:
        raise RuntimeError(f"Unexpected page size {w_in:.2f}×{h_in:.2f} in")


def pdf_to_png(pdf_path: Path, png_path: Path, dpi: int = 300) -> None:
    doc = pymupdf.open(str(pdf_path))
    page = doc[0]
    zoom = dpi / 72
    pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=False)
    img = PILImage.frombytes("RGB", (pix.width, pix.height), pix.samples)
    png_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(str(png_path), format="PNG", dpi=(dpi, dpi))
    doc.close()


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_OUT.mkdir(parents=True, exist_ok=True)

    pdf_path = OUT_DIR / "bfta-merch-donation-flyer.pdf"
    png_path = OUT_DIR / "bfta-merch-donation-flyer.png"
    qr_path = OUT_DIR / "_qr-donate.png"
    print_specs = OUT_DIR / "PRINT-SPECS.md"

    build_flyer(pdf_path, qr_path)
    pdf_to_png(pdf_path, png_path, dpi=300)

    print_specs.write_text(
        """# Print specs · BFTA merch donation wall flyer

Hand this to the printer with `bfta-merch-donation-flyer.pdf`.

| Spec | Value |
| --- | --- |
| Trim size | **8.50 × 11.00 in** (US Letter, portrait) |
| Preferred file | **PDF** (vector text + embedded QR/logo) |
| Scale | **100% / actual size** (do not fit to page) |
| Color | Cream `#FFFAF0` + orange `#FF4F14` + black |
| Stock | Matte cardstock or foam-core backed print for wall |
| Bleed | None required if printing exact letter |

Do **not** print from a phone screenshot. Use the PDF.
PNG proof is 2550×3300 px at 300 dpi if the shop insists on raster.

QR opens the open-amount Zaprite checkout so donors can enter $30 (shirt) or $35 (hat).
""",
        encoding="utf-8",
    )

    for name in (
        "bfta-merch-donation-flyer.pdf",
        "bfta-merch-donation-flyer.png",
        "PRINT-SPECS.md",
    ):
        src = OUT_DIR / name
        (PUBLIC_OUT / name).write_bytes(src.read_bytes())

    qr_path.unlink(missing_ok=True)
    print(f"ok {pdf_path}")
    print(f"ok {png_path} (300 dpi)")


if __name__ == "__main__":
    main()
