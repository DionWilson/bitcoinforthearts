#!/usr/bin/env python3
"""Generate a DocuSign-ready PDF of Ainsley Costello's Midwest grant award agreement.

Usage:
  python3 docs/grants/generate-ainsley-grant-agreement-pdf.py
"""

from __future__ import annotations

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable,
    Image,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[2]
LOGO = ROOT / "public/brand-kit/derived/main-black-transparent-800.png"
OUT = Path(__file__).resolve().parent / "ainsley-costello-midwest-grant-award-agreement.pdf"
ARTIFACT = Path("/opt/cursor/artifacts/Ainsley-Costello-Midwest-Grant-Award-Agreement.pdf")


def styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "Title",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=16,
            alignment=TA_CENTER,
            spaceAfter=4,
            textColor=colors.black,
        ),
        "meta": ParagraphStyle(
            "Meta",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            alignment=TA_CENTER,
            spaceAfter=1,
        ),
        "parties": ParagraphStyle(
            "Parties",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            alignment=TA_CENTER,
            spaceAfter=2,
        ),
        "h": ParagraphStyle(
            "H",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=12.5,
            spaceBefore=8,
            spaceAfter=3,
            textColor=colors.black,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=11.5,
            alignment=TA_JUSTIFY,
            spaceAfter=3,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=11.5,
            leftIndent=12,
            spaceAfter=2,
        ),
        "subbullet": ParagraphStyle(
            "SubBullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            leftIndent=24,
            spaceAfter=1.5,
        ),
        "note": ParagraphStyle(
            "Note",
            parent=base["Normal"],
            fontName="Helvetica-Oblique",
            fontSize=8,
            leading=10.5,
            alignment=TA_CENTER,
            spaceAfter=3,
        ),
        "sig": ParagraphStyle(
            "Sig",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            spaceAfter=2,
            alignment=TA_LEFT,
        ),
        "sighead": ParagraphStyle(
            "SigHead",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.5,
            leading=12,
            spaceBefore=4,
            spaceAfter=4,
        ),
        "cell": ParagraphStyle(
            "Cell",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
        ),
        "cellb": ParagraphStyle(
            "CellB",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.5,
            leading=11,
        ),
        "footer": ParagraphStyle(
            "Footer",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.5,
            leading=9,
            alignment=TA_CENTER,
            textColor=colors.Color(0.35, 0.35, 0.35),
        ),
    }


def hr():
    return HRFlowable(
        width="100%",
        thickness=0.6,
        color=colors.black,
        spaceBefore=6,
        spaceAfter=6,
    )


def detail_table(s, rows):
    data = [
        [Paragraph("<b>Field</b>", s["cellb"]), Paragraph("<b>Detail</b>", s["cellb"])]
    ]
    for label, value in rows:
        data.append([Paragraph(label, s["cell"]), Paragraph(value, s["cell"])])
    t = Table(data, colWidths=[1.55 * inch, 5.0 * inch])
    t.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.4, colors.black),
                ("BACKGROUND", (0, 0), (-1, 0), colors.Color(0.92, 0.92, 0.92)),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 3),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ]
        )
    )
    return t


def add_page_number(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(colors.Color(0.35, 0.35, 0.35))
    text = (
        f"Bitcoin for the Arts, Inc. · EIN 41-2642260 · "
        f"Ainsley Costello Grant Award Agreement · Page {doc.page}"
    )
    canvas.drawCentredString(letter[0] / 2, 0.45 * inch, text)
    canvas.restoreState()


def build(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    s = styles()
    doc = SimpleDocTemplate(
        str(path),
        pagesize=letter,
        leftMargin=0.7 * inch,
        rightMargin=0.7 * inch,
        topMargin=0.55 * inch,
        bottomMargin=0.7 * inch,
        title="Bitcoin Micro-Grant Award Agreement - Ainsley Costello",
        author="Bitcoin for the Arts, Inc.",
        subject="Midwest Bitcoin Conference Appearance - $2,500 BTC micro-grant",
    )

    story = []

    if LOGO.exists():
        logo = Image(str(LOGO), width=0.9 * inch, height=0.9 * inch)
        logo.hAlign = "CENTER"
        story.append(logo)
        story.append(Spacer(1, 4))

    story.append(Paragraph("Bitcoin Micro-Grant Award Agreement", s["title"]))
    story.append(
        Paragraph(
            "<b>Bitcoin for the Arts, Inc.</b> (“BFTA”), a New York 501(c)(3) nonprofit corporation<br/>"
            "and<br/>"
            "<b>Ainsley Costello</b> (“Grantee”)",
            s["parties"],
        )
    )
    story.append(Spacer(1, 4))
    story.append(
        Paragraph(
            "This PDF is intended for DocuSign / e-signature upload. "
            "Blank signature and address lines are left for tagging in DocuSign.",
            s["note"],
        )
    )
    story.append(hr())

    story.append(
        detail_table(
            s,
            [
                ("Grantor", "Bitcoin for the Arts, Inc. · EIN 41-2642260"),
                ("Grantee", "Ainsley Costello"),
                (
                    "Project",
                    "Midwest Bitcoin Conference Appearance (performance, panel, and related "
                    "Bitcoin Arts Park / Summit activities)",
                ),
                (
                    "Award amount",
                    "<b>$2,500 USD</b> equivalent, disbursed in <b>Bitcoin (BTC)</b>",
                ),
                ("Award date", "________________"),
                (
                    "Period of performance",
                    "From award date through completion of Summit deliverables and reporting "
                    "(not to exceed 12 months unless BFTA agrees in writing)",
                ),
                ("Event", "Midwest Bitcoin Summit / Bitcoin Arts Park · September 23–24, 2026 · Columbus, Ohio"),
            ],
        )
    )

    story.append(Paragraph("1. Purpose", s["h"]))
    story.append(
        Paragraph(
            "BFTA awards this micro-grant in furtherance of its charitable and educational mission: "
            "supporting working artists with Bitcoin-native funding, education, and public cultural programming.",
            s["body"],
        )
    )
    story.append(
        Paragraph(
            "Grantee accepts the award solely to carry out the Project described in Grantee’s submitted "
            "application (and any written clarifications accepted by BFTA), including appearance and related "
            "work at the Midwest Bitcoin Summit / Bitcoin Arts Park, September 23–24, 2026, Columbus, Ohio.",
            s["body"],
        )
    )

    story.append(Paragraph("2. Grant amount and disbursement", s["h"]))
    for line in [
        "2.1. Award value: <b>$2,500 USD</b> equivalent.",
        "2.2. Payment method: <b>Bitcoin only</b>, sent to the wallet address Grantee provides in writing.",
        "2.3. Grantee acknowledges that Bitcoin’s market value may change after disbursement. "
        "BFTA will not adjust the award for later price movement.",
        "2.4. For BFTA’s records, the USD fair market value on the transfer date will be documented "
        "with the transaction ID.",
        "2.5. BFTA will disburse after this Agreement is signed by both parties and Grantee has provided "
        "(a) a valid Bitcoin / Lightning receiving address and (b) a completed IRS Form <b>W-9</b>. "
        "At $2,500, this award is above the 2026 Form 1099 reporting threshold. BFTA collects the W-9 so it can "
        "report the grant on Form <b>1099-MISC</b> (generally Box 3 for prizes, awards, and certain "
        "non-government grants to individuals), unless BFTA’s CPA later classifies the payment differently.",
    ]:
        story.append(Paragraph(line, s["bullet"]))

    story.append(Paragraph("3. Use of funds", s["h"]))
    for line in [
        "3.1. Funds must be used for Project-related costs consistent with the approved application budget "
        "(including travel, lodging, meals, and performance fees for the Midwest appearance, as applicable).",
        "3.2. Funds may not be used for unlawful purposes, lobbying prohibited for 501(c)(3) private grant "
        "practice, or personal expenses unrelated to the Project.",
        "3.3. Grantee is responsible for any taxes arising from receipt of the grant under applicable law.",
    ]:
        story.append(Paragraph(line, s["bullet"]))

    story.append(Paragraph("4. Public benefit and representation", s["h"]))
    for line in [
        "4.1. Grantee will perform the Project in a professional manner and will not misrepresent BFTA or the grant.",
        "4.2. Grantee agrees BFTA may publicly acknowledge the grant (name, project title, award announcement, "
        "Summit programming credit), unless Grantee requests limited anonymity in writing and BFTA agrees.",
        "4.3. Grantee grants BFTA a non-exclusive, royalty-free right to use Project photos, clips, and statements "
        "for nonprofit reporting, website, newsletter, and archival documentation, with credit to Grantee.",
    ]:
        story.append(Paragraph(line, s["bullet"]))

    story.append(Paragraph("5. Reporting and follow-up (required)", s["h"]))
    story.append(
        Paragraph(
            "Aligned with BFTA Grant Guidelines (post-award reporting) and Grantee’s application reporting plan:",
            s["body"],
        )
    )
    story.append(
        Paragraph(
            "5.1. <b>Interim update</b> within <b>30 days after the Summit</b> "
            "(email to grants@bitcoinforthearts.org or dionwilson@bitcoinforthearts.org): "
            "brief status of the appearance and any outstanding items.",
            s["bullet"],
        )
    )
    story.append(
        Paragraph(
            "5.2. <b>Final report within 90 days after the Summit</b> (or project end, whichever is later), including:",
            s["bullet"],
        )
    )
    for item in [
        "Summary of activities and outcomes",
        "Approximate attendance / engagement notes for performance, panel, and booth conversations",
        "Budget accounting confirming use of the $2,500 (receipts available upon request)",
        "On-chain / value-for-value metrics if any (zaps, sats, links)",
        "Photos, video clips, or other public artifacts suitable for BFTA archives",
        "Short reflection: what worked, audience response, lessons for Bitcoin music / arts community",
    ]:
        story.append(Paragraph(f"• {item}", s["subbullet"]))
    for line in [
        "5.3. Grantee will maintain records related to the grant for <b>three (3) years</b> and will make them "
        "available to BFTA upon reasonable request for audit or verification.",
        "5.4. Failure to report may make Grantee ineligible for future BFTA funding until cured.",
    ]:
        story.append(Paragraph(line, s["bullet"]))

    story.append(Paragraph("6. Compliance", s["h"]))
    for line in [
        "6.1. Grantee confirms the Project produces a public benefit consistent with BFTA’s program "
        "(including U.S. public-benefit eligibility representations in the application).",
        "6.2. Grantee will comply with applicable laws and venue rules at the Summit.",
        "6.3. If material facts in the application were false, or funds are misused, BFTA may require return "
        "of unused funds or the USD equivalent of the disbursement.",
    ]:
        story.append(Paragraph(line, s["bullet"]))

    story.append(Paragraph("7. Relationship of the parties", s["h"]))
    story.append(
        Paragraph(
            "This Agreement creates a <b>grant</b> relationship, not employment, partnership, or joint venture. "
            "Grantee is responsible for their own taxes, insurance, and band/contractor arrangements.",
            s["body"],
        )
    )

    story.append(Paragraph("8. Entire agreement", s["h"]))
    story.append(
        Paragraph(
            "This document, together with the Grantee’s application materials as accepted by BFTA, is the entire "
            "award agreement for this grant. Changes must be in writing and signed (email confirmation by both "
            "parties is acceptable for minor timeline adjustments).",
            s["body"],
        )
    )

    story.append(hr())
    story.append(Paragraph("Signatures", s["h"]))
    story.append(
        Paragraph(
            "By signing below (including via DocuSign or other electronic signature), each party agrees to the "
            "terms of this Agreement.",
            s["body"],
        )
    )

    bfta_block = KeepTogether(
        [
            Paragraph("<b>Bitcoin for the Arts, Inc.</b>", s["sighead"]),
            Paragraph("Name: Dion Wilson", s["sig"]),
            Paragraph("Title: Executive Director", s["sig"]),
            Paragraph(
                "Signature: ________________________________  Date: _______________",
                s["sig"],
            ),
            Paragraph("Email: dionwilson@bitcoinforthearts.org", s["sig"]),
            Paragraph("EIN: 41-2642260", s["sig"]),
        ]
    )
    grantee_block = KeepTogether(
        [
            Paragraph("<b>Grantee</b>", s["sighead"]),
            Paragraph("Legal name: Ainsley Costello", s["sig"]),
            Paragraph(
                "Signature: ________________________________  Date: _______________",
                s["sig"],
            ),
            Paragraph("Email: ainsleycostelloofficial@gmail.com", s["sig"]),
            Spacer(1, 4),
            Paragraph(
                "Bitcoin / Lightning receiving address for disbursement:",
                s["sig"],
            ),
            Paragraph(
                "_________________________________________________________________",
                s["sig"],
            ),
            Paragraph(
                "_________________________________________________________________",
                s["sig"],
            ),
            Spacer(1, 6),
            Paragraph(
                "Form W-9 attached (required before disbursement): Yes ____",
                s["sig"],
            ),
        ]
    )
    story.append(bfta_block)
    story.append(Spacer(1, 10))
    story.append(grantee_block)

    doc.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)
    print(f"Wrote {path}")


def main() -> None:
    build(OUT)
    ARTIFACT.parent.mkdir(parents=True, exist_ok=True)
    ARTIFACT.write_bytes(OUT.read_bytes())
    print(f"Copied to {ARTIFACT}")


if __name__ == "__main__":
    main()
