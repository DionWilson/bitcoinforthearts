#!/usr/bin/env python3
"""Generate BFTA letterhead PDF for Susan Koch Guggenheim recommendation."""

from pathlib import Path
import shutil

from PIL import Image as PILImage
from pypdf import PdfReader
import pymupdf
from reportlab.lib import colors
from reportlab.lib.enums import TA_JUSTIFY, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable,
    Image,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[2]
OUT = Path("/opt/cursor/artifacts/Susan-Koch-Guggenheim-Recommendation-BFTA.pdf")
COPY = ROOT / "docs/letters/susan-koch-guggenheim-recommendation-2026.pdf"
LOGO = ROOT / "public/brand-kit/inline-bugs/inline-cream-orange.png"
PREVIEW = Path("/opt/cursor/artifacts/susan-koch-letter-preview.png")

ORANGE = colors.HexColor("#FF4F14")
CREAM = colors.HexColor("#FFFAF0")


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    im = PILImage.open(LOGO)
    w, h = im.size
    logo_w = 2.55 * inch
    logo_h = logo_w * (h / w)

    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=letter,
        leftMargin=0.7 * inch,
        rightMargin=0.7 * inch,
        topMargin=0.5 * inch,
        bottomMargin=0.5 * inch,
    )
    base = getSampleStyleSheet()
    styles = {
        "meta": ParagraphStyle(
            "meta",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.5,
            leading=10,
            alignment=TA_RIGHT,
        ),
        "label": ParagraphStyle(
            "label",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8,
            leading=10,
            textColor=ORANGE,
            spaceAfter=6,
        ),
        "body": ParagraphStyle(
            "body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.4,
            leading=12.5,
            alignment=TA_JUSTIFY,
            spaceAfter=7,
        ),
        "left": ParagraphStyle(
            "left",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.4,
            leading=12.5,
            alignment=TA_LEFT,
            spaceAfter=6,
        ),
        "name": ParagraphStyle(
            "name",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=12,
            spaceBefore=2,
            spaceAfter=1,
        ),
        "sig": ParagraphStyle(
            "sig",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=11.5,
            spaceAfter=0,
        ),
        "footL": ParagraphStyle(
            "footL",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7,
            leading=9,
            textColor=colors.HexColor("#333333"),
        ),
        "footR": ParagraphStyle(
            "footR",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7,
            leading=9,
            alignment=TA_RIGHT,
            textColor=colors.HexColor("#333333"),
        ),
    }

    meta = Paragraph(
        "<b><font color='#FF4F14'>BITCOIN FOR THE ARTS, INC.</font></b><br/>"
        "New York 501(c)(3) Nonprofit<br/>"
        "27 West 60th Street, PO Box 20069<br/>"
        "New York, NY 10023<br/>"
        "dionwilson@bitcoinforthearts.org<br/>"
        "www.bitcoinforthearts.org",
        styles["meta"],
    )
    header = Table(
        [[Image(str(LOGO), width=logo_w, height=logo_h), meta]],
        colWidths=[3.4 * inch, 3.6 * inch],
    )
    header.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )

    story = [
        header,
        HRFlowable(width="100%", thickness=2.2, color=ORANGE, spaceBefore=1, spaceAfter=8),
        Paragraph("LETTER OF REFERENCE", styles["label"]),
        Paragraph("September 10, 2026", styles["left"]),
        Paragraph(
            "John Simon Guggenheim Memorial Foundation<br/>Letters of Reference",
            styles["left"],
        ),
        Paragraph(
            "<b>Re: Susan Koch (A13MW) — Fellowship application</b>",
            styles["left"],
        ),
        Paragraph("To the Selection Committee:", styles["left"]),
    ]

    paragraphs = [
        "I am writing to recommend Susan Koch for a Guggenheim Fellowship. I am the founder and executive director of Bitcoin for the Arts, a New York 501(c)(3) that supports working artists with Bitcoin micro-grants, education, and sovereign funding tools. I have known Susan since the earliest days of our organization, and I know both her work and her character well enough to speak to this proposal with confidence.",
        "Susan was one of the first artists to find us when I put Bitcoin for the Arts into the world. She did not wait to be recruited. She showed up, made herself known, and stayed in the conversation. We have featured her practice on our website, and over time our relationship moved from professional introduction to a real friendship. When she visited New York, we spent a full day together at the Metropolitan Museum of Art. That day confirmed what her films already suggest: she looks carefully, she thinks in systems and stories at the same time, and she treats art as a way people can feel something true about money, power, and freedom.",
        "Susan’s personality is bright and creative. She is animated in the best sense of the word, much like the characters she draws. She is also warm, caring, and genuine. She connects easily with people across cultures and continents. That matters for the work she is proposing. Her animation series <i>Heaven Under Hell Pressure</i> is building a cast that can carry a serious conversation about the psychology of money without becoming a lecture. Scarcity, security, freedom, stress, power, and shame are not abstractions in her world. They are lived pressures she turns into story.",
        "Her completed short <i>Crying Baby, Dancing Bee</i>, starring Buzzbee, the African Bitcoin Queen, has already found festival recognition, including a Best Short Film award. The next chapters she describes, including the Mad Cow as a central-banker antagonist and the introduction of KOJI, feel like a coherent expansion of that universe rather than a side project. The Guggenheim proposal to research KOJI in Japan, study fermentation culture and animation craft there, and bring that research into character design, storyboard, script, and a third short is ambitious and specific. It is also consistent with how Susan already works: she studies living systems, indigenous frameworks of right relationship, and the long cultural life of materials and memes, then translates those ideas into hand-drawn animation that can travel.",
        "What I value most is that Susan understands Bitcoin as money, not as a novelty skin on art. She uses storytelling to invite audiences into a clearer relationship with sound money and with the incentives of fiat systems. That is precisely the kind of artist Bitcoin for the Arts exists to support, highlight, and hold up as a reference for creators who have not yet found Bitcoin. We believe in her work and in the message she carries into the broader culture.",
        "I recommend Susan Koch without reservation. A Guggenheim Fellowship would give her the time and research depth her KOJI chapter deserves, and I am confident she will use it with discipline, imagination, and care for her audience.",
    ]
    for text in paragraphs:
        story.append(Paragraph(text, styles["body"]))

    story.extend(
        [
            Paragraph("Sincerely,", styles["left"]),
            Spacer(1, 10),
            Paragraph("Dion Wilson", styles["name"]),
            Paragraph("Founder &amp; Executive Director", styles["sig"]),
            Paragraph("Bitcoin for the Arts, Inc.", styles["sig"]),
            Paragraph("27 West 60th Street, PO Box 20069", styles["sig"]),
            Paragraph("New York, NY 10023", styles["sig"]),
            Paragraph("dionwilson@bitcoinforthearts.org", styles["sig"]),
            Spacer(1, 8),
            HRFlowable(width="100%", thickness=0.8, color=colors.black, spaceBefore=1, spaceAfter=4),
        ]
    )

    footer = Table(
        [
            [
                Paragraph(
                    "<font color='#FF4F14'><b>UNCENSORABLE MONEY · UNCENSORABLE MINDS</b></font><br/>"
                    "Sound money for sovereign creators",
                    styles["footL"],
                ),
                Paragraph(
                    "27 West 60th Street, PO Box 20069<br/>"
                    "New York, NY 10023 · EIN 41-2642260<br/>"
                    "www.bitcoinforthearts.org",
                    styles["footR"],
                ),
            ]
        ],
        colWidths=[3.6 * inch, 3.4 * inch],
    )
    footer.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    story.append(footer)

    def draw_bg(canvas, _doc):
        canvas.saveState()
        canvas.setFillColor(CREAM)
        canvas.rect(0, 0, letter[0], letter[1], fill=1, stroke=0)
        canvas.restoreState()

    doc.build(story, onFirstPage=draw_bg, onLaterPages=draw_bg)

    reader = PdfReader(str(OUT))
    text = reader.pages[0].extract_text()
    print(f"pages={len(reader.pages)} bytes={OUT.stat().st_size}")
    print(f"has_address={'20069' in text and '10023' in text}")
    shutil.copy(OUT, COPY)

    pdf = pymupdf.open(str(OUT))
    pix = pdf[0].get_pixmap(matrix=pymupdf.Matrix(1.5, 1.5))
    pix.save(str(PREVIEW))
    print(f"preview={PREVIEW}")


if __name__ == "__main__":
    main()
