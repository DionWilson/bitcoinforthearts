#!/usr/bin/env python3
"""Generate BFTA × CA Danner consignment agreement PDF (letter, B&W logo)."""

from pathlib import Path

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Image,
    Table,
    TableStyle,
    HRFlowable,
    KeepTogether,
)
from reportlab.lib import colors

ROOT = Path(__file__).resolve().parents[3]
LOGO = ROOT / "public/brand-kit/derived/main-black-transparent-800.png"
OUT = Path(__file__).resolve().parent / "consignment-agreement-ca-danner.pdf"


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
            fontSize=9,
            leading=12,
            alignment=TA_CENTER,
            spaceAfter=1,
        ),
        "parties": ParagraphStyle(
            "Parties",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=12.5,
            alignment=TA_CENTER,
            spaceAfter=2,
        ),
        "h": ParagraphStyle(
            "H",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=13,
            spaceBefore=8,
            spaceAfter=4,
            textColor=colors.black,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=11.5,
            alignment=TA_JUSTIFY,
            spaceAfter=4,
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
        "sig": ParagraphStyle(
            "Sig",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=11.5,
            spaceAfter=2,
        ),
        "sighead": ParagraphStyle(
            "SigHead",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.5,
            leading=12,
            spaceBefore=6,
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
    }


def hr():
    return HRFlowable(
        width="100%",
        thickness=0.6,
        color=colors.black,
        spaceBefore=8,
        spaceAfter=8,
    )


def build():
    s = styles()
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=letter,
        leftMargin=0.7 * inch,
        rightMargin=0.7 * inch,
        topMargin=0.45 * inch,
        bottomMargin=0.5 * inch,
        title="Artwork Consignment & Silent Auction Agreement — CA Danner × BFTA",
        author="Bitcoin for the Arts, Inc.",
    )
    story = []

    if LOGO.exists():
        logo = Image(str(LOGO), width=1.05 * inch, height=1.05 * inch)
        logo.hAlign = "CENTER"
        story.append(logo)
        story.append(Spacer(1, 4))

    story.append(Paragraph("Artwork Consignment &amp; Silent Auction Agreement", s["title"]))
    story.append(Paragraph(
        "<b>Bitcoin for the Arts, Inc.</b> (a New York 501(c)(3) nonprofit)<br/>and<br/>"
        "<b>CA Danner</b> (“Artist”)",
        s["parties"],
    ))
    story.append(Spacer(1, 6))
    story.append(Paragraph("<b>Effective date:</b> ________________", s["meta"]))
    story.append(Paragraph(
        "<b>Event:</b> Bitcoin Arts Park at the Midwest Bitcoin Summit<br/>"
        "<b>Location:</b> Greater Columbus Convention Center, Columbus, Ohio<br/>"
        "<b>Event dates:</b> September 23–24, 2026",
        s["meta"],
    ))
    story.append(hr())

    story.append(Paragraph("1. The Work", s["h"]))
    story.append(Paragraph(
        "Artist consigns the following original artwork (the “Work”) to Bitcoin for the Arts, Inc. "
        "(“BFTA”) for silent auction during the Event:",
        s["body"],
    ))

    rows = [
        [Paragraph("<b>Field</b>", s["cellb"]), Paragraph("<b>Detail</b>", s["cellb"])],
        [Paragraph("Title", s["cell"]), Paragraph("Satoshi White Paper Series #52, Block Height 770067", s["cell"])],
        [Paragraph("Artist", s["cell"]), Paragraph("CA Danner", s["cell"])],
        [Paragraph("Year", s["cell"]), Paragraph("2022–2023", s["cell"])],
        [Paragraph("Medium", s["cell"]), Paragraph("Mixed media on linen canvas", s["cell"])],
        [Paragraph("Dimensions", s["cell"]), Paragraph("22 × 28 inches", s["cell"])],
        [Paragraph("Lot code", s["cell"]), Paragraph("LOT-01", s["cell"])],
    ]
    t = Table(rows, colWidths=[1.4 * inch, 5.1 * inch])
    t.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.4, colors.black),
                ("BACKGROUND", (0, 0), (-1, 0), colors.Color(0.92, 0.92, 0.92)),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    story.append(t)
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Artist represents that Artist is the sole owner of the Work, that the Work is free of liens, "
        "and that Artist has full authority to consign and sell (or donate) the Work on the terms below.",
        s["body"],
    ))

    story.append(Paragraph("2. Auction terms", s["h"]))
    for line in [
        "The Work will be offered in a <b>peer-to-peer silent auction</b> at Bitcoin Arts Park during the Event.",
        "<b>Opening bid:</b> <b>150,000 sats</b> (displayed with an informational USD equivalent of <b>$98</b>).",
        "<b>Minimum bid increment:</b> <b>21,000 sats</b>.",
        "Bidding closes <b>Thursday, September 24, 2026 at 3:00 PM Eastern Time</b>, unless BFTA announces an earlier or later close on-site for operational reasons.",
        "The highest valid bid at close is the <b>hammer price</b>. The winning bidder must complete payment before the Work is released.",
        "Payment may be accepted in <b>USD and/or Bitcoin / Lightning</b>, at BFTA’s posted conversion practice for the Event day.",
    ]:
        story.append(Paragraph(f"• {line}", s["bullet"]))

    story.append(Paragraph("3. Proceeds split", s["h"]))
    story.append(Paragraph(
        "Of the hammer price (winning bid), after any payment-processor fees actually incurred on that payment:",
        s["body"],
    ))
    story.append(Paragraph("• <b>One-third (1/3)</b> to <b>Bitcoin for the Arts, Inc.</b> as a charitable contribution supporting its mission", s["bullet"]))
    story.append(Paragraph("• <b>Two-thirds (2/3)</b> to <b>Artist</b>", s["bullet"]))
    story.append(Paragraph(
        "BFTA will remit Artist’s share within <b>thirty (30) days</b> of cleared payment, to:",
        s["body"],
    ))
    story.append(Paragraph("• Strike: <font face='Courier'>cityalley@strike.me</font>", s["bullet"]))
    story.append(Paragraph("• and/or email payout instructions at: <font face='Courier'>cadanner@protonmail.com</font>", s["bullet"]))
    story.append(Paragraph("(Artist may update payout instructions in writing before the Event.)", s["body"]))

    story.append(Paragraph("4. No sale", s["h"]))
    story.append(Paragraph(
        "If the Work does not sell by close of auction (no winning bidder, or winning bidder defaults and no successive bidder completes purchase), "
        "<b>Artist donates the Work in full to Bitcoin for the Arts, Inc.</b> Title transfers to BFTA upon written confirmation of no sale. "
        "No further shipping cost is owed by Artist for that donation outcome, except as the parties otherwise agree in writing.",
        s["body"],
    ))

    story.append(Paragraph("5. Delivery &amp; risk", s["h"]))
    for line in [
        "Artist will ship the Work to the Midwest Bitcoin Summit <b>advance warehouse</b>, using the official warehouse label provided by BFTA / show management, to arrive <b>September 20, 21, or 22, 2026</b>.",
        "Artist will send tracking information to BFTA promptly after shipment.",
        "Risk of loss remains with Artist until the Work is received at the advance warehouse; thereafter BFTA will exercise reasonable care while the Work is in BFTA’s custody on-site. BFTA is not an insurer of the Work.",
        "If the Work sells, the buyer is responsible for packing, shipping, or hand-carry from the venue unless otherwise agreed in writing.",
        "If the Work is donated to BFTA under Section 4, BFTA is responsible for post-Event transport of the Work from Columbus.",
    ]:
        story.append(Paragraph(f"• {line}", s["bullet"]))

    story.append(Paragraph("6. Marketing &amp; credit", s["h"]))
    story.append(Paragraph(
        "Artist grants BFTA a non-exclusive license to photograph and reproduce images of the Work for Event signage, website lot pages, newsletter, social, and archival documentation, with credit to <b>CA Danner</b>. "
        "Artist may likewise reference the auction and BFTA collaboration.",
        s["body"],
    ))

    story.append(Paragraph("7. Relationship", s["h"]))
    story.append(Paragraph(
        "This Agreement is a consignment for auction (and contingent donation). It does not create employment, partnership, or an obligation for BFTA to guarantee a sale. "
        "Artist is responsible for Artist’s own tax treatment of auction proceeds or charitable donation outcomes; BFTA may issue customary acknowledgments consistent with its 501(c)(3) practices where applicable.",
        s["body"],
    ))

    story.append(Paragraph("8. Entire agreement", s["h"]))
    story.append(Paragraph(
        "This document, together with the public lot page at<br/>"
        "<font face='Courier' size='8'>https://www.bitcoinforthearts.org/midwest/auction/satoshi-white-paper-52</font><br/>"
        "is the entire agreement for this Work. Changes must be in writing (email sufficient) and acknowledged by both parties.",
        s["body"],
    ))

    story.append(hr())
    story.append(Paragraph("Signatures", s["h"]))

    artist_block = KeepTogether([
        Paragraph("<b>Artist — CA Danner</b>", s["sighead"]),
        Paragraph("Signature: _______________________________  Date: _______________", s["sig"]),
        Paragraph("Printed name: CA Danner", s["sig"]),
        Paragraph("Email: cadanner@protonmail.com", s["sig"]),
        Paragraph("Strike: cityalley@strike.me", s["sig"]),
        Paragraph("Website: https://www.cadanner.com", s["sig"]),
    ])
    bfta_block = KeepTogether([
        Paragraph("<b>Bitcoin for the Arts, Inc.</b>", s["sighead"]),
        Paragraph("Signature: _______________________________  Date: _______________", s["sig"]),
        Paragraph("Printed name: Dion Wilson", s["sig"]),
        Paragraph("Title: Founder &amp; Executive Director", s["sig"]),
        Paragraph("Email: dionwilson@bitcoinforthearts.org", s["sig"]),
        Paragraph("EIN: 41-2642260", s["sig"]),
    ])
    story.append(artist_block)
    story.append(Spacer(1, 8))
    story.append(bfta_block)

    doc.build(story)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    build()
