#!/usr/bin/env python3
"""Generate print-ready Zaprana table card + circle sticker assets.

Same fix as Midwest vinyl cards: exact physical page size + 300 dpi PNG
metadata (shops that trust a 72 dpi tag will scale wrong and print soft).

Outputs under docs/midwest-2026/zaprana-print/ and /opt/cursor/artifacts/.

Usage:
  python3 docs/midwest-2026/zaprana-print/generate-zaprana-print.py
"""

from __future__ import annotations

import math
import shutil
import urllib.request
from pathlib import Path

import qrcode
from PIL import Image, ImageDraw, ImageEnhance, ImageFont
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas as pdfcanvas

ROOT = Path(__file__).resolve().parents[3]
OUT = Path(__file__).resolve().parent
ARTIFACTS = Path("/opt/cursor/artifacts")

SRC_CARD = Path(
    "/home/ubuntu/.cursor/projects/workspace/assets/f259fb57-a962-4e04-96a7-f8f088ebd2a6.jpg"
)
SRC_CIRCLE = Path(
    "/home/ubuntu/.cursor/projects/workspace/assets/ec3a832f-d9c3-499b-8b17-8ac1b7edcacc.jpg"
)

PEACH = (241, 232, 203)
TERRACOTTA = (179, 109, 73)
CREAM_CARD = (246, 220, 190)
BROWN = (62, 42, 32)

FONT_DIR = OUT / "fonts"
SCRIPT_FONT = FONT_DIR / "GreatVibes-Regular.ttf"
SANS_FONT = Path("/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf")

QR_URL = "https://zaprana.life"

CARD_W_IN, CARD_H_IN = 5.0, 7.0
DPI = 300
CARD_PX = (int(CARD_W_IN * DPI), int(CARD_H_IN * DPI))  # 1500 × 2100
STICKER_SIZES_IN = (2.0, 3.0, 4.0)


def ensure_fonts() -> None:
    FONT_DIR.mkdir(parents=True, exist_ok=True)
    if SCRIPT_FONT.exists():
        return
    urllib.request.urlretrieve(
        "https://github.com/google/fonts/raw/main/ofl/greatvibes/GreatVibes-Regular.ttf",
        SCRIPT_FONT,
    )


def register_pdf_fonts() -> None:
    ensure_fonts()
    if "ZapranaScript" not in pdfmetrics.getRegisteredFontNames():
        pdfmetrics.registerFont(TTFont("ZapranaScript", str(SCRIPT_FONT)))


def make_qr(px: int) -> Image.Image:
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=14,
        border=2,
    )
    qr.add_data(QR_URL)
    qr.make(fit=True)
    img = qr.make_image(fill_color=BROWN, back_color="white").convert("RGB")
    # Frame like the original card
    framed = Image.new("RGB", (img.width + 16, img.height + 16), BROWN)
    framed.paste(img, (8, 8))
    return framed.resize((px, px), Image.Resampling.NEAREST)


def draw_sun(draw: ImageDraw.ImageDraw, cx: float, cy: float, r: float, color=TERRACOTTA) -> None:
    horizon_w = r * 2.6
    draw.arc(
        [cx - horizon_w / 2, cy - r * 0.15, cx + horizon_w / 2, cy + r * 1.4],
        start=200,
        end=340,
        fill=color,
        width=max(2, int(r * 0.08)),
    )
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color)
    for i, ang in enumerate([-70, -50, -30, -15, 0, 15, 30, 50, 70]):
        rad = math.radians(ang - 90)
        length = r * (2.1 if i == 4 else 1.55)
        x0 = cx + math.cos(rad) * (r * 1.15)
        y0 = cy + math.sin(rad) * (r * 1.15)
        x1 = cx + math.cos(rad) * length
        y1 = cy + math.sin(rad) * length
        draw.line([(x0, y0), (x1, y1)], fill=color, width=max(2, int(r * 0.08)))


def render_circle_logo(size_px: int) -> Image.Image:
    """Supersampled circular logo, then LANCZOS down to print pixels."""
    ensure_fonts()
    scale = 3
    s = size_px * scale
    img = Image.new("RGB", (s, s), PEACH)
    draw = ImageDraw.Draw(img)

    pad = int(s * 0.035)
    draw.ellipse(
        [pad, pad, s - pad - 1, s - pad - 1],
        outline=TERRACOTTA,
        width=max(3, int(s * 0.012)),
    )
    draw_sun(draw, s * 0.50, s * 0.34, s * 0.055)

    font = ImageFont.truetype(str(SCRIPT_FONT), int(s * 0.22))
    text = "Zaprana"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    draw.text(
        ((s - tw) / 2 - bbox[0], s * 0.52 - bbox[1]),
        text,
        font=font,
        fill=TERRACOTTA,
    )
    return img.resize((size_px, size_px), Image.Resampling.LANCZOS)


def build_circle_outputs() -> list[Path]:
    register_pdf_fonts()
    outs: list[Path] = []

    master_pdf = OUT / "zaprana-circle-logo.pdf"
    side = 4.0 * inch
    c = pdfcanvas.Canvas(str(master_pdf), pagesize=(side, side))
    c.setFillColorRGB(*[x / 255 for x in PEACH])
    c.rect(0, 0, side, side, fill=1, stroke=0)
    c.setStrokeColorRGB(*[x / 255 for x in TERRACOTTA])
    c.setFillColorRGB(*[x / 255 for x in PEACH])
    c.setLineWidth(3.2)
    c.circle(side / 2, side / 2, side * 0.46, fill=1, stroke=1)
    c.setFillColorRGB(*[x / 255 for x in TERRACOTTA])
    c.setStrokeColorRGB(*[x / 255 for x in TERRACOTTA])
    cx, cy, r = side / 2, side * 0.62, side * 0.055
    c.circle(cx, cy, r, fill=1, stroke=0)
    c.setLineWidth(1.4)
    for ang in (-70, -50, -30, -15, 0, 15, 30, 50, 70):
        rad = math.radians(ang + 90)
        length = r * (2.2 if ang == 0 else 1.7)
        c.line(
            cx + math.cos(rad) * r * 1.2,
            cy + math.sin(rad) * r * 1.2,
            cx + math.cos(rad) * length,
            cy + math.sin(rad) * length,
        )
    c.setLineWidth(1.6)
    c.arc(cx - r * 1.4, cy - r * 1.1, cx + r * 1.4, cy + r * 0.3, 200, 140)
    c.setFillColorRGB(*[x / 255 for x in TERRACOTTA])
    c.setFont("ZapranaScript", 54)
    c.drawCentredString(side / 2, side * 0.28, "Zaprana")
    c.save()
    outs.append(master_pdf)

    for inches in STICKER_SIZES_IN:
        px = int(inches * DPI)
        png = OUT / f"zaprana-circle-sticker-{inches:g}in-{DPI}dpi.png"
        render_circle_logo(px).save(png, format="PNG", dpi=(DPI, DPI))
        outs.append(png)

        pdf = OUT / f"zaprana-circle-sticker-{inches:g}in.pdf"
        page = inches * inch
        c = pdfcanvas.Canvas(str(pdf), pagesize=(page, page))
        c.drawImage(str(png), 0, 0, width=page, height=page, mask="auto")
        c.save()
        outs.append(pdf)

    return outs


def upscale_card_base() -> Image.Image:
    src = Image.open(SRC_CARD).convert("RGB")
    base = src.resize(CARD_PX, Image.Resampling.LANCZOS)
    return ImageEnhance.Sharpness(base).enhance(1.25)


def overlay_crisp_branding(card: Image.Image) -> Image.Image:
    w, h = card.size
    out = card.copy()
    ensure_fonts()

    # Cream wash over soft logo / tagline
    band_top, band_bot = int(h * 0.035), int(h * 0.275)
    cream = Image.new("RGBA", (w, band_bot - band_top), (*CREAM_CARD, 245))
    out.paste(
        Image.alpha_composite(
            out.crop((0, band_top, w, band_bot)).convert("RGBA"), cream
        ).convert("RGB"),
        (0, band_top),
    )

    draw = ImageDraw.Draw(out)
    draw_sun(draw, w * 0.50, h * 0.09, w * 0.042, color=TERRACOTTA)

    script = ImageFont.truetype(str(SCRIPT_FONT), int(w * 0.13))
    bbox = draw.textbbox((0, 0), "Zaprana", font=script)
    tw = bbox[2] - bbox[0]
    draw.text(
        ((w - tw) / 2 - bbox[0], h * 0.12 - bbox[1]),
        "Zaprana",
        font=script,
        fill=TERRACOTTA,
    )

    sans = ImageFont.truetype(str(SANS_FONT), int(w * 0.030))
    tag = "A space for well-being and sovereignty"
    bbox = draw.textbbox((0, 0), tag, font=sans)
    tw = bbox[2] - bbox[0]
    draw.text(
        ((w - tw) / 2 - bbox[0], h * 0.225 - bbox[1]),
        tag,
        font=sans,
        fill=BROWN,
    )

    # Cover full soft QR region (source 1414×2000 bbox) — include remnant under code
    sx0, sy0, sx1, sy1 = 300, 680, 1110, 1540
    src_w, src_h = 1414, 2000
    cover = [
        int(sx0 * w / src_w),
        int(sy0 * h / src_h),
        int(sx1 * w / src_w),
        int(sy1 * h / src_h),
    ]
    draw.rectangle(cover, fill=CREAM_CARD)

    # Leave a little air under the QR before the Bitcoin watermark / wave
    qr_size = min(cover[2] - cover[0], int((cover[3] - cover[1]) * 0.88)) - 20
    qr = make_qr(qr_size)
    qx = (w - qr_size) // 2
    qy = cover[1] + 20
    out.paste(qr, (qx, qy))

    # Fill any leftover strip under QR still inside cover with cream
    draw = ImageDraw.Draw(out)
    draw.rectangle([cover[0], qy + qr_size - 2, cover[2], min(h - 1, cover[3] + 40)], fill=CREAM_CARD)
    # Footer: cream center strip, keep side wave art
    footer_h = int(h * 0.085)
    region = out.crop((0, h - footer_h, w, h)).convert("RGBA")
    center = Image.new("RGBA", (w, footer_h), (0, 0, 0, 0))
    ImageDraw.Draw(center).rectangle(
        [int(w * 0.16), int(footer_h * 0.12), int(w * 0.84), int(footer_h * 0.92)],
        fill=(*CREAM_CARD, 235),
    )
    out.paste(Image.alpha_composite(region, center).convert("RGB"), (0, h - footer_h))

    draw = ImageDraw.Draw(out)
    foot_font = ImageFont.truetype(str(SANS_FONT), int(w * 0.028))
    foot = "- zaprana.life -"
    bbox = draw.textbbox((0, 0), foot, font=foot_font)
    tw = bbox[2] - bbox[0]
    draw.text(
        ((w - tw) / 2 - bbox[0], h * 0.955 - bbox[1]),
        foot,
        font=foot_font,
        fill=BROWN,
    )
    return out


def save_card_png_and_pdf(card: Image.Image) -> tuple[Path, Path]:
    png = OUT / f"zaprana-table-card-5x7-{DPI}dpi.png"
    card.save(png, format="PNG", dpi=(DPI, DPI))

    pdf = OUT / "zaprana-table-card-5x7.pdf"
    c = pdfcanvas.Canvas(str(pdf), pagesize=(CARD_W_IN * inch, CARD_H_IN * inch))
    c.drawImage(
        str(png),
        0,
        0,
        width=CARD_W_IN * inch,
        height=CARD_H_IN * inch,
        preserveAspectRatio=False,
        mask="auto",
    )
    c.save()
    return png, pdf


def write_print_specs() -> Path:
    path = OUT / "PRINT-SPECS.md"
    path.write_text(
        """# Print shop specs · Zaprana partner assets

Hand this sheet to the printer with the PDFs below.

## Why the last files looked soft

The previous JPGs were tagged **72 dpi** and were **undersized** for the trim:

| File | Pixels | At 300 dpi |
| --- | --- | --- |
| Table card JPG | 1414 × 2000 | ~4.7 × 6.7 in (short of 5×7) |
| Circle logo JPG | 1024 × 1024 | ~3.4 in |

Print shops that honor the 72 dpi tag (or “fit to page”) scale wrong. Same failure mode as the Midwest vinyl cards.

## Preferred files (send these)

### 5×7 stand-up table card (portrait)

| Spec | Value |
| --- | --- |
| **Best file** | `zaprana-table-card-5x7.pdf` |
| Trim size | **5.00 × 7.00 inches portrait** |
| Scale | **100% / actual size** (do not “fit to page”) |
| Also available | `zaprana-table-card-5x7-300dpi.png` (**1500 × 2100 px @ 300 dpi**) |

### Circle logo stickers

| Spec | Value |
| --- | --- |
| **Best files** | `zaprana-circle-sticker-2in.pdf`, `3in.pdf`, `4in.pdf` |
| Also available | Matching `*-300dpi.png` files |
| Vector master | `zaprana-circle-logo.pdf` (4 in square) |

If the shop must use PNG: honor **300 dpi** / print at the listed inch size. Do not open and re-export from an office app.

## Color / stock

| Spec | Value |
| --- | --- |
| Palette | Peach ground · terracotta logo · brown QR/type |
| Color mode | RGB OK; convert to CMYK if shop requires |
| Table card stock | Matte cardstock, 8–14 pt, stand-up tent or easel back |
| Stickers | Matte vinyl circle die-cut (2 / 3 / 4 in) |

## Bleed

| Spec | Value |
| --- | --- |
| Bleed | None required if printing to exact page box |
| Optional | Add 0.125 in if shop requires; keep peach / cream to edge |

## Checklist for the shop

1. Print **PDF at 100%** (actual size)
2. Confirm page box is **5×7 in** (card) or **2/3/4 in** square (stickers)
3. Soft/blurry last time = wrong file or wrong scale — reprint from these PDFs
""",
        encoding="utf-8",
    )
    return path


def verify() -> None:
    card_png = Image.open(OUT / f"zaprana-table-card-5x7-{DPI}dpi.png")
    assert card_png.size == CARD_PX, card_png.size
    for inches in STICKER_SIZES_IN:
        png = Image.open(OUT / f"zaprana-circle-sticker-{inches:g}in-{DPI}dpi.png")
        expect = int(inches * DPI)
        assert png.size == (expect, expect), png.size


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    ensure_fonts()

    for src, name in (
        (SRC_CARD, "source-table-card-soft.jpg"),
        (SRC_CIRCLE, "source-circle-logo-soft.jpg"),
    ):
        if src.exists():
            shutil.copy2(src, OUT / name)

    outs: list[Path] = []
    outs.extend(build_circle_outputs())

    card = overlay_crisp_branding(upscale_card_base())
    png, pdf = save_card_png_and_pdf(card)
    outs.extend([png, pdf])
    outs.append(write_print_specs())

    verify()
    ARTIFACTS.mkdir(parents=True, exist_ok=True)
    for p in outs:
        if p.suffix.lower() in {".pdf", ".png", ".md"}:
            shutil.copy2(p, ARTIFACTS / p.name)

    print("Wrote:")
    for p in outs:
        print(" ", p)


if __name__ == "__main__":
    main()
