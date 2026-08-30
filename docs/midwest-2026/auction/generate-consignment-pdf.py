#!/usr/bin/env python3
"""Generate BFTA artwork consignment / silent auction agreement PDFs.

Usage:
  python3 generate-consignment-pdf.py                    # Lady RedHorns + blank template
  python3 generate-consignment-pdf.py --artist redhorns  # Lady RedHorns only
  python3 generate-consignment-pdf.py --artist template  # blank template only
  python3 generate-consignment-pdf.py --artist danner    # original CA Danner agreement
"""

from __future__ import annotations

import argparse
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
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

ROOT = Path(__file__).resolve().parents[3]
LOGO = ROOT / "public/brand-kit/derived/main-black-transparent-800.png"
OUT_DIR = Path(__file__).resolve().parent


def styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "Title",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=15,
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
            fontSize=9.5,
            leading=12,
            spaceBefore=7,
            spaceAfter=3,
            textColor=colors.black,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            alignment=TA_JUSTIFY,
            spaceAfter=3,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            leftIndent=12,
            spaceAfter=2,
        ),
        "note": ParagraphStyle(
            "Note",
            parent=base["Normal"],
            fontName="Helvetica-Oblique",
            fontSize=8,
            leading=10.5,
            spaceAfter=3,
        ),
        "sig": ParagraphStyle(
            "Sig",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            spaceAfter=2,
        ),
        "sighead": ParagraphStyle(
            "SigHead",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=11.5,
            spaceBefore=5,
            spaceAfter=3,
        ),
        "cell": ParagraphStyle(
            "Cell",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8,
            leading=10.5,
        ),
        "cellb": ParagraphStyle(
            "CellB",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8,
            leading=10.5,
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
    t = Table(data, colWidths=[1.35 * inch, 5.15 * inch])
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


def option_table(s, options):
    data = [
        [Paragraph("<b>Initials</b>", s["cellb"]), Paragraph("<b>Option</b>", s["cellb"])]
    ]
    for text in options:
        data.append(
            [
                Paragraph("_____", s["cell"]),
                Paragraph(text, s["cell"]),
            ]
        )
    t = Table(data, colWidths=[0.7 * inch, 5.8 * inch])
    t.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.4, colors.black),
                ("BACKGROUND", (0, 0), (-1, 0), colors.Color(0.92, 0.92, 0.92)),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return t


def header(story, s, artist_name, subtitle=None):
    if LOGO.exists():
        logo = Image(str(LOGO), width=0.95 * inch, height=0.95 * inch)
        logo.hAlign = "CENTER"
        story.append(logo)
        story.append(Spacer(1, 3))

    story.append(Paragraph("Artwork Consignment &amp; Silent Auction Agreement", s["title"]))
    if subtitle:
        story.append(Paragraph(subtitle, s["meta"]))
    story.append(
        Paragraph(
            "<b>Bitcoin for the Arts, Inc.</b> (a New York 501(c)(3) nonprofit)<br/>and<br/>"
            f"<b>{artist_name}</b> (“Artist”)",
            s["parties"],
        )
    )
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Effective date:</b> ________________", s["meta"]))
    story.append(
        Paragraph(
            "<b>Event:</b> Bitcoin Arts Park at the Midwest Bitcoin Summit<br/>"
            "<b>Location:</b> Greater Columbus Convention Center, Columbus, Ohio<br/>"
            "<b>Event dates:</b> September 23-24, 2026",
            s["meta"],
        )
    )
    story.append(hr())


def shared_tail(story, s, credit_name, artist_sig_lines):
    story.append(Paragraph("5. Delivery &amp; risk", s["h"]))
    for line in [
        "Artist will ship the Work to the Midwest Bitcoin Summit <b>advance warehouse</b>, using the official warehouse label provided by BFTA / show management, to arrive <b>September 20, 21, or 22, 2026</b> (or another window BFTA confirms in writing).",
        "Artist will send tracking information to BFTA promptly after shipment.",
        "Risk of loss remains with Artist until the Work is received at the advance warehouse; thereafter BFTA will exercise reasonable care while the Work is in BFTA’s custody on-site. BFTA is not an insurer of the Work.",
        "If the Work sells, the buyer is responsible for packing, shipping, or hand-carry from the venue unless otherwise agreed in writing.",
        "Post-Event handling of unsold Work follows the option selected in Section 4.",
    ]:
        story.append(Paragraph(f"• {line}", s["bullet"]))

    story.append(Paragraph("6. Marketing &amp; credit", s["h"]))
    story.append(
        Paragraph(
            "Artist grants BFTA a non-exclusive license to photograph and reproduce images of the Work for Event signage, website lot pages, newsletter, social, and archival documentation, "
            f"with credit to <b>{credit_name}</b>. Artist may likewise reference the auction and BFTA collaboration.",
            s["body"],
        )
    )

    story.append(Paragraph("7. Relationship", s["h"]))
    story.append(
        Paragraph(
            "This Agreement is a consignment for auction (and, if selected, donation). It does not create employment, partnership, or an obligation for BFTA to guarantee a sale. "
            "Artist is responsible for Artist’s own tax treatment of auction proceeds or charitable donation outcomes; BFTA may issue customary acknowledgments consistent with its 501(c)(3) practices where applicable.",
            s["body"],
        )
    )

    story.append(Paragraph("8. Entire agreement", s["h"]))
    story.append(
        Paragraph(
            "This document (and any public lot page URL BFTA later confirms for this Work) is the entire agreement for this Work. "
            "Changes must be in writing (email sufficient) and acknowledged by both parties.",
            s["body"],
        )
    )

    story.append(hr())
    story.append(Paragraph("Signatures", s["h"]))

    artist_block = KeepTogether(
        [Paragraph(f"<b>Artist — {credit_name}</b>", s["sighead"])]
        + [Paragraph(line, s["sig"]) for line in artist_sig_lines]
    )
    bfta_block = KeepTogether(
        [
            Paragraph("<b>Bitcoin for the Arts, Inc.</b>", s["sighead"]),
            Paragraph("Signature: _______________________________  Date: _______________", s["sig"]),
            Paragraph("Printed name: Dion Wilson", s["sig"]),
            Paragraph("Title: Founder &amp; Executive Director", s["sig"]),
            Paragraph("Email: dionwilson@bitcoinforthearts.org", s["sig"]),
            Paragraph("EIN: 41-2642260", s["sig"]),
        ]
    )
    story.append(artist_block)
    story.append(Spacer(1, 6))
    story.append(bfta_block)


def choice_sections(story, s):
    story.append(Paragraph("2. Auction terms", s["h"]))
    story.append(
        Paragraph(
            "• The Work will be offered in a <b>peer-to-peer silent auction</b> at Bitcoin Arts Park during the Event, "
            "unless Artist and BFTA agree in writing to other Event use (exhibition only, raffle, direct sale, etc.).",
            s["bullet"],
        )
    )
    story.append(Paragraph("• <b>Opening bid</b> (Artist initials one):", s["bullet"]))
    story.append(
        Paragraph(
            "☐ _____ Artist sets the opening bid: _______________ sats (informational USD: $________)",
            s["bullet"],
        )
    )
    story.append(
        Paragraph(
            "☐ _____ Artist authorizes BFTA to set a reasonable opening bid for the Event",
            s["bullet"],
        )
    )
    for line in [
        "<b>Minimum bid increment:</b> <b>21,000 sats</b> (or as posted on-site).",
        "Bidding closes <b>Thursday, September 24, 2026 at 3:00 PM Eastern Time</b>, unless BFTA announces an earlier or later close on-site for operational reasons.",
        "The highest valid bid at close is the <b>hammer price</b>. The winning bidder must complete payment before the Work is released.",
        "Payment may be accepted in <b>USD and/or Bitcoin / Lightning</b>, at BFTA’s posted conversion practice for the Event day.",
    ]:
        story.append(Paragraph(f"• {line}", s["bullet"]))

    story.append(Paragraph("3. Proceeds (Artist initials one)", s["h"]))
    story.append(
        Paragraph(
            "Of the hammer price (winning bid), after any payment-processor fees actually incurred on that payment, Artist selects <b>one</b>:",
            s["body"],
        )
    )
    story.append(
        option_table(
            s,
            [
                "<b>A. Full donation.</b> 100% of net proceeds to Bitcoin for the Arts, Inc. Artist donates the Work (and sale proceeds) to support BFTA’s mission.",
                "<b>B. Half / half.</b> 50% to BFTA · 50% to Artist.",
                "<b>C. One-third / two-thirds.</b> 1/3 to BFTA · 2/3 to Artist.",
            ],
        )
    )
    story.append(Spacer(1, 4))
    story.append(
        Paragraph(
            "BFTA prefers Option A when artists are able, but the choice is Artist’s.",
            s["note"],
        )
    )
    story.append(
        Paragraph(
            "If Option B or C is selected, BFTA will remit Artist’s share within <b>thirty (30) days</b> of cleared payment, to:",
            s["body"],
        )
    )
    story.append(
        Paragraph(
            "• Bitcoin / Lightning / Strike payout: _______________________________",
            s["bullet"],
        )
    )
    story.append(
        Paragraph(
            "• and/or email for payout instructions: _______________________________",
            s["bullet"],
        )
    )
    story.append(
        Paragraph("(Artist may update payout instructions in writing before the Event.)", s["body"])
    )

    story.append(Paragraph("4. If the Work does not sell (Artist initials one)", s["h"]))
    story.append(
        Paragraph(
            "If the Work does not sell by close of auction (no winning bidder, or winning bidder defaults and no successive bidder completes purchase), Artist selects <b>one</b>:",
            s["body"],
        )
    )
    story.append(
        option_table(
            s,
            [
                "<b>Donate in full.</b> Artist donates the Work to Bitcoin for the Arts, Inc. Title transfers to BFTA upon written confirmation of no sale. BFTA handles post-Event transport from Columbus unless otherwise agreed.",
                "<b>Reclaim.</b> Artist reclaims the Work. Artist is responsible for return shipping / pickup cost and timing after the Event, unless the parties agree otherwise in writing.",
            ],
        )
    )
    story.append(Spacer(1, 4))
    story.append(
        Paragraph(
            "BFTA hopes artists will choose donation when they can; reclaim remains available.",
            s["note"],
        )
    )


def build_template():
    s = styles()
    out = OUT_DIR / "consignment-agreement-template.pdf"
    doc = SimpleDocTemplate(
        str(out),
        pagesize=letter,
        leftMargin=0.65 * inch,
        rightMargin=0.65 * inch,
        topMargin=0.4 * inch,
        bottomMargin=0.45 * inch,
        title="Artwork Consignment & Silent Auction Agreement - Template - BFTA",
        author="Bitcoin for the Arts, Inc.",
    )
    story = []
    header(story, s, "_______________________________", subtitle="Blank template for artist donations / consignments")

    story.append(
        Paragraph(
            "<b>How to use:</b> Fill the Work table. Artist initials one proceeds option and one no-sale option. "
            "Artist chooses opening-bid authority. Both parties sign. Unless Artist states other written terms, "
            "Work provided for the Event is offered in the peer-to-peer Lightning silent auction.",
            s["note"],
        )
    )

    story.append(Paragraph("1. The Work", s["h"]))
    story.append(
        Paragraph(
            "Artist consigns the following original artwork (the “Work”) to Bitcoin for the Arts, Inc. (“BFTA”) for silent auction during the Event:",
            s["body"],
        )
    )
    story.append(
        detail_table(
            s,
            [
                ("Title", "________________"),
                ("Artist", "________________"),
                ("Year", "________________"),
                ("Medium", "________________"),
                ("Dimensions", "________________"),
                ("Framing (if any)", "________________"),
                ("Lot code", "________________"),
                ("Artist website / social", "________________"),
            ],
        )
    )
    story.append(Spacer(1, 5))
    story.append(
        Paragraph(
            "Artist represents that Artist is the sole owner of the Work, that the Work is free of liens, "
            "and that Artist has full authority to consign and sell (or donate) the Work on the terms below.",
            s["body"],
        )
    )

    choice_sections(story, s)
    shared_tail(
        story,
        s,
        "________________",
        [
            "Signature: _______________________________  Date: _______________",
            "Printed name: ________________",
            "Email: ________________",
            "Payout handle (if any): ________________",
            "Website / social: ________________",
        ],
    )
    doc.build(story)
    print(f"Wrote {out}")


def build_lady_redhorns():
    s = styles()
    out = OUT_DIR / "consignment-agreement-lady-redhorns.pdf"
    doc = SimpleDocTemplate(
        str(out),
        pagesize=letter,
        leftMargin=0.65 * inch,
        rightMargin=0.65 * inch,
        topMargin=0.4 * inch,
        bottomMargin=0.45 * inch,
        title="Artwork Consignment & Silent Auction Agreement - Lady RedHorns x BFTA",
        author="Bitcoin for the Arts, Inc.",
    )
    story = []
    header(story, s, "Lady RedHorns")

    story.append(Paragraph("1. The Work", s["h"]))
    story.append(
        Paragraph(
            "Artist consigns the following original artwork (the “Work”) to Bitcoin for the Arts, Inc. (“BFTA”) "
            "for silent auction during the Event (unless Artist and BFTA agree in writing to other Event use):",
            s["body"],
        )
    )
    story.append(
        detail_table(
            s,
            [
                ("Title", "<b>The Transfer of Light</b>"),
                ("Artist", "Lady RedHorns"),
                ("Year", "________________ (confirm with artist)"),
                ("Medium", "Acrylic on canvas (acrylic paints, glossy acrylic varnish)"),
                ("Dimensions", "40 x 40 cm / 15.7 x 15.7 in"),
                ("Framing", "Artist to choose and prepare a frame for exhibition"),
                ("Lot code", "________________ (assigned by BFTA)"),
                (
                    "Artist links",
                    "http://redhornsbtc.store · http://redhornsart.store · https://linktr.ee/ladyredhorns",
                ),
                ("Social", "@LRedhorns"),
            ],
        )
    )
    story.append(Spacer(1, 5))
    story.append(
        Paragraph(
            "Artist represents that Artist is the sole owner of the Work, that the Work is free of liens, "
            "and that Artist has full authority to consign and sell (or donate) the Work on the terms below.",
            s["body"],
        )
    )
    story.append(
        Paragraph(
            "Artist has confirmed intent to provide <i>The Transfer of Light</i> for the exhibition and plans to ship around mid-September after preparing a frame. Shipping details may be confirmed separately in writing.",
            s["note"],
        )
    )

    choice_sections(story, s)
    shared_tail(
        story,
        s,
        "Lady RedHorns",
        [
            "Signature: _______________________________  Date: _______________",
            "Printed name: Lady RedHorns",
            "Email: ________________",
            "Payout handle (if any): ________________",
            "Website: http://redhornsbtc.store · http://redhornsart.store",
            "Linktree: https://linktr.ee/ladyredhorns",
        ],
    )
    doc.build(story)
    print(f"Wrote {out}")


def build_danner():
    """Preserve original CA Danner fixed-term PDF generator behavior."""
    s = styles()
    out = OUT_DIR / "consignment-agreement-ca-danner.pdf"
    doc = SimpleDocTemplate(
        str(out),
        pagesize=letter,
        leftMargin=0.7 * inch,
        rightMargin=0.7 * inch,
        topMargin=0.45 * inch,
        bottomMargin=0.5 * inch,
        title="Artwork Consignment & Silent Auction Agreement - CA Danner x BFTA",
        author="Bitcoin for the Arts, Inc.",
    )
    story = []
    header(story, s, "CA Danner")

    story.append(Paragraph("1. The Work", s["h"]))
    story.append(
        Paragraph(
            "Artist consigns the following original artwork (the “Work”) to Bitcoin for the Arts, Inc. "
            "(“BFTA”) for silent auction during the Event:",
            s["body"],
        )
    )
    story.append(
        detail_table(
            s,
            [
                ("Title", "Satoshi White Paper Series #52, Block Height 770067"),
                ("Artist", "CA Danner"),
                ("Year", "2022-2023"),
                ("Medium", "Mixed media on linen canvas"),
                ("Dimensions", "22 x 28 inches"),
                ("Lot code", "LOT-01"),
            ],
        )
    )
    story.append(Spacer(1, 6))
    story.append(
        Paragraph(
            "Artist represents that Artist is the sole owner of the Work, that the Work is free of liens, "
            "and that Artist has full authority to consign and sell (or donate) the Work on the terms below.",
            s["body"],
        )
    )

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
    story.append(
        Paragraph(
            "Of the hammer price (winning bid), after any payment-processor fees actually incurred on that payment:",
            s["body"],
        )
    )
    story.append(
        Paragraph(
            "• <b>One-third (1/3)</b> to <b>Bitcoin for the Arts, Inc.</b> as a charitable contribution supporting its mission",
            s["bullet"],
        )
    )
    story.append(Paragraph("• <b>Two-thirds (2/3)</b> to <b>Artist</b>", s["bullet"]))
    story.append(
        Paragraph(
            "BFTA will remit Artist’s share within <b>thirty (30) days</b> of cleared payment, to:",
            s["body"],
        )
    )
    story.append(Paragraph("• Strike: <font face='Courier'>cityalley@strike.me</font>", s["bullet"]))
    story.append(
        Paragraph(
            "• and/or email payout instructions at: <font face='Courier'>cadanner@protonmail.com</font>",
            s["bullet"],
        )
    )
    story.append(Paragraph("(Artist may update payout instructions in writing before the Event.)", s["body"]))

    story.append(Paragraph("4. No sale", s["h"]))
    story.append(
        Paragraph(
            "If the Work does not sell by close of auction (no winning bidder, or winning bidder defaults and no successive bidder completes purchase), "
            "<b>Artist donates the Work in full to Bitcoin for the Arts, Inc.</b> Title transfers to BFTA upon written confirmation of no sale. "
            "No further shipping cost is owed by Artist for that donation outcome, except as the parties otherwise agree in writing.",
            s["body"],
        )
    )

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
    story.append(
        Paragraph(
            "Artist grants BFTA a non-exclusive license to photograph and reproduce images of the Work for Event signage, website lot pages, newsletter, social, and archival documentation, with credit to <b>CA Danner</b>. "
            "Artist may likewise reference the auction and BFTA collaboration.",
            s["body"],
        )
    )

    story.append(Paragraph("7. Relationship", s["h"]))
    story.append(
        Paragraph(
            "This Agreement is a consignment for auction (and contingent donation). It does not create employment, partnership, or an obligation for BFTA to guarantee a sale. "
            "Artist is responsible for Artist’s own tax treatment of auction proceeds or charitable donation outcomes; BFTA may issue customary acknowledgments consistent with its 501(c)(3) practices where applicable.",
            s["body"],
        )
    )

    story.append(Paragraph("8. Entire agreement", s["h"]))
    story.append(
        Paragraph(
            "This document, together with the public lot page at<br/>"
            "<font face='Courier' size='8'>https://www.bitcoinforthearts.org/midwest/auction/satoshi-white-paper-52</font><br/>"
            "is the entire agreement for this Work. Changes must be in writing (email sufficient) and acknowledged by both parties.",
            s["body"],
        )
    )

    story.append(hr())
    story.append(Paragraph("Signatures", s["h"]))
    story.append(
        KeepTogether(
            [
                Paragraph("<b>Artist — CA Danner</b>", s["sighead"]),
                Paragraph("Signature: _______________________________  Date: _______________", s["sig"]),
                Paragraph("Printed name: CA Danner", s["sig"]),
                Paragraph("Email: cadanner@protonmail.com", s["sig"]),
                Paragraph("Strike: cityalley@strike.me", s["sig"]),
                Paragraph("Website: https://www.cadanner.com", s["sig"]),
            ]
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        KeepTogether(
            [
                Paragraph("<b>Bitcoin for the Arts, Inc.</b>", s["sighead"]),
                Paragraph("Signature: _______________________________  Date: _______________", s["sig"]),
                Paragraph("Printed name: Dion Wilson", s["sig"]),
                Paragraph("Title: Founder &amp; Executive Director", s["sig"]),
                Paragraph("Email: dionwilson@bitcoinforthearts.org", s["sig"]),
                Paragraph("EIN: 41-2642260", s["sig"]),
            ]
        )
    )
    doc.build(story)
    print(f"Wrote {out}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--artist",
        choices=["all", "template", "redhorns", "danner"],
        default="all",
        help="Which PDF(s) to generate",
    )
    args = parser.parse_args()
    if args.artist in ("all", "template"):
        build_template()
    if args.artist in ("all", "redhorns"):
        build_lady_redhorns()
    if args.artist == "danner":
        build_danner()
    if args.artist == "all":
        # Keep regenerating danner only when explicitly requested, to avoid rewriting signed terms by accident.
        pass


if __name__ == "__main__":
    main()
