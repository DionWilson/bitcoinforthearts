#!/usr/bin/env python3
"""Generate BFTA x Shipwreck Sean multi-work exhibition / sale / auction / raffle PDF."""

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
OUT = Path(__file__).resolve().parent / "consignment-agreement-shipwreck-sean.pdf"


def styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "Title",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=11.5,
            leading=14,
            alignment=TA_CENTER,
            spaceAfter=3,
        ),
        "meta": ParagraphStyle(
            "Meta",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8,
            leading=10.5,
            alignment=TA_CENTER,
            spaceAfter=1,
        ),
        "parties": ParagraphStyle(
            "Parties",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            alignment=TA_CENTER,
            spaceAfter=2,
        ),
        "h": ParagraphStyle(
            "H",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=11.5,
            spaceBefore=6,
            spaceAfter=3,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8,
            leading=10.5,
            alignment=TA_JUSTIFY,
            spaceAfter=2,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8,
            leading=10.5,
            leftIndent=10,
            spaceAfter=1.5,
        ),
        "note": ParagraphStyle(
            "Note",
            parent=base["Normal"],
            fontName="Helvetica-Oblique",
            fontSize=7.5,
            leading=10,
            spaceAfter=2,
        ),
        "sig": ParagraphStyle(
            "Sig",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8,
            leading=10.5,
            spaceAfter=1.5,
        ),
        "sighead": ParagraphStyle(
            "SigHead",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.5,
            leading=11,
            spaceBefore=4,
            spaceAfter=2,
        ),
        "cell": ParagraphStyle(
            "Cell",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7,
            leading=9.5,
        ),
        "cellb": ParagraphStyle(
            "CellB",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=7,
            leading=9.5,
        ),
    }


def hr():
    return HRFlowable(
        width="100%", thickness=0.5, color=colors.black, spaceBefore=5, spaceAfter=5
    )


def table(data, col_widths):
    t = Table(data, colWidths=col_widths)
    t.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.35, colors.black),
                ("BACKGROUND", (0, 0), (-1, 0), colors.Color(0.92, 0.92, 0.92)),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 2.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5),
            ]
        )
    )
    return t


def build():
    s = styles()
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=letter,
        leftMargin=0.55 * inch,
        rightMargin=0.55 * inch,
        topMargin=0.35 * inch,
        bottomMargin=0.4 * inch,
        title="Artwork Exhibition, Sale, Auction & Raffle Agreement - Shipwreck Sean x BFTA",
        author="Bitcoin for the Arts, Inc.",
    )
    story = []

    if LOGO.exists():
        logo = Image(str(LOGO), width=0.85 * inch, height=0.85 * inch)
        logo.hAlign = "CENTER"
        story.append(logo)
        story.append(Spacer(1, 2))

    story.append(
        Paragraph(
            "Artwork Exhibition, Sale, Auction &amp; Raffle Agreement",
            s["title"],
        )
    )
    story.append(
        Paragraph(
            "<b>Bitcoin for the Arts, Inc.</b> (a New York 501(c)(3) nonprofit)<br/>and<br/>"
            "<b>Shipwreck Sean</b> (“Artist”)",
            s["parties"],
        )
    )
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

    story.append(Paragraph("Parties / Artist contact", s["h"]))
    story.append(
        table(
            [
                [Paragraph("<b>Field</b>", s["cellb"]), Paragraph("<b>Detail</b>", s["cellb"])],
                [Paragraph("Artist name", s["cell"]), Paragraph("Shipwreck Sean", s["cell"])],
                [Paragraph("Social", s["cell"]), Paragraph("@artbyshipwreck", s["cell"])],
                [Paragraph("Character / brand", s["cell"]), Paragraph("Bitsby", s["cell"])],
                [
                    Paragraph("Websites", s["cell"]),
                    Paragraph("https://shipwrecksean.com · https://www.bitsby.co", s["cell"]),
                ],
                [Paragraph("Location", s["cell"]), Paragraph("Maryland", s["cell"])],
                [Paragraph("Email", s["cell"]), Paragraph("________________", s["cell"])],
                [
                    Paragraph("Lightning", s["cell"]),
                    Paragraph(
                        "<font face='Courier' size='8'>shipwrecksean@walletofsatoshi.com</font>",
                        s["cell"],
                    ),
                ],
                [
                    Paragraph("Bitcoin (Taproot)", s["cell"]),
                    Paragraph(
                        "<font face='Courier' size='7'>bc1pc306rnzwz9xxfugewu4jqsqru88v023qpx070kdapf3q2zkrknxq97v65q</font>",
                        s["cell"],
                    ),
                ],
            ],
            [1.7 * inch, 5.0 * inch],
        )
    )

    story.append(Paragraph("1. Purpose", s["h"]))
    story.append(
        Paragraph(
            "Artist consigns the works listed below to Bitcoin for the Arts, Inc. (“BFTA”) for exhibition and sale "
            "facilitation at Bitcoin Arts Park during the Event, on the terms stated for each work. Unless a work’s "
            "section says otherwise, BFTA may display, photograph, and market the works at the Event and online for "
            "Event purposes, with credit to <b>Shipwreck Sean</b>.",
            s["body"],
        )
    )
    story.append(
        Paragraph(
            "Artist represents that Artist is the sole owner of each Work, that each Work is free of liens, and that "
            "Artist has full authority to consign, sell, auction, or raffle each Work on the terms below.",
            s["body"],
        )
    )

    story.append(Paragraph("2. Schedule of works", s["h"]))
    story.append(
        table(
            [
                [
                    Paragraph("<b>#</b>", s["cellb"]),
                    Paragraph("<b>Title</b>", s["cellb"]),
                    Paragraph("<b>Size</b>", s["cellb"]),
                    Paragraph("<b>Event use</b>", s["cellb"]),
                    Paragraph("<b>Price / terms</b>", s["cellb"]),
                ],
                [
                    Paragraph("1", s["cell"]),
                    Paragraph("The Volatility Blues (drink + Bitsby)", s["cell"]),
                    Paragraph("20×24 in", s["cell"]),
                    Paragraph("Fixed-price sale", s["cell"]),
                    Paragraph("$2,500 | 0.03 BTC", s["cell"]),
                ],
                [
                    Paragraph("2", s["cell"]),
                    Paragraph("A Slice of History (pizza)", s["cell"]),
                    Paragraph("40×16 in", s["cell"]),
                    Paragraph("Fixed-price sale", s["cell"]),
                    Paragraph("$2,000 | 0.03 BTC", s["cell"]),
                ],
                [
                    Paragraph("3", s["cell"]),
                    Paragraph("HODL On (Bitsby + BTC balloon)", s["cell"]),
                    Paragraph("40×16 in", s["cell"]),
                    Paragraph("Silent auction", s["cell"]),
                    Paragraph("100% net to BFTA", s["cell"]),
                ],
                [
                    Paragraph("4", s["cell"]),
                    Paragraph("Cold Storage (Bitsby in ice)", s["cell"]),
                    Paragraph("20×24 in", s["cell"]),
                    Paragraph("Fixed-price sale", s["cell"]),
                    Paragraph("$1,500 | 0.02 BTC", s["cell"]),
                ],
                [
                    Paragraph("5", s["cell"]),
                    Paragraph("Live painting (title TBD)", s["cell"]),
                    Paragraph("20×16 in", s["cell"]),
                    Paragraph("Live paint + raffle", s["cell"]),
                    Paragraph("Raffle split: Sec. 5", s["cell"]),
                ],
            ],
            [0.3 * inch, 2.15 * inch, 0.75 * inch, 1.2 * inch, 1.3 * inch],
        )
    )
    story.append(
        Paragraph(
            "Medium for all works: <b>Original painting</b> (update in writing if Artist specifies acrylic/oil/etc.).",
            s["note"],
        )
    )

    story.append(Paragraph("3. Fixed-price sales (Works #1, #2, #4)", s["h"]))
    story.append(
        Paragraph(
            "Applies to <i>The Volatility Blues</i>, <i>A Slice of History</i>, and <i>Cold Storage</i>.",
            s["body"],
        )
    )
    for line in [
        "BFTA will offer each Work for sale at Bitcoin Arts Park at the listed price (USD and/or BTC as stated). Informational USD/BTC pairings are as provided by Artist; accepted tender and Event-day conversion practice are posted by BFTA on-site.",
        "Of the cleared sale price, after any payment-processor fees actually incurred on that payment: <b>100% to Artist</b>.",
        "BFTA will remit Artist’s sale proceeds within <b>thirty (30) days</b> of cleared payment, to the payout instructions above (or as later updated in writing).",
        "If a Work does not sell by the end of the Event, Artist reclaims it. Artist is responsible for return shipping / pickup cost and timing after the Event, unless otherwise agreed in writing.",
        "Buyer is responsible for packing, shipping, or hand-carry from the venue unless otherwise agreed in writing.",
    ]:
        story.append(Paragraph(f"• {line}", s["bullet"]))

    story.append(Paragraph("4. Silent auction - HODL On (Work #3)", s["h"]))
    for line in [
        "<i>HODL On</i> will be offered in a <b>peer-to-peer silent auction</b> at Bitcoin Arts Park during the Event.",
        "<b>Opening bid:</b> set by BFTA (Artist authorizes BFTA to set a reasonable opening bid): _______________ sats (informational USD: $________), or as posted on the lot card / lot page.",
        "<b>Minimum bid increment:</b> <b>21,000 sats</b> (or as posted on-site).",
        "Bidding closes <b>Thursday, September 24, 2026 at 3:00 PM Eastern Time</b>, unless BFTA announces an earlier or later close on-site for operational reasons.",
        "The highest valid bid at close is the <b>hammer price</b>. The winning bidder must complete payment before the Work is released.",
        "Payment may be accepted in <b>USD and/or Bitcoin / Lightning</b>, at BFTA’s posted conversion practice for the Event day.",
        "Of the hammer price, after any payment-processor fees actually incurred: <b>100% to Bitcoin for the Arts, Inc.</b> Artist acknowledges this Work is provided so BFTA may raise funds from the auction.",
    ]:
        story.append(Paragraph(f"• {line}", s["bullet"]))
    story.append(
        Paragraph(
            "If <i>HODL On</i> does not sell, Artist initials <b>one</b>:",
            s["body"],
        )
    )
    story.append(
        table(
            [
                [Paragraph("<b>Initials</b>", s["cellb"]), Paragraph("<b>Option</b>", s["cellb"])],
                [
                    Paragraph("_____", s["cell"]),
                    Paragraph(
                        "<b>Donate in full</b> to BFTA. Title transfers upon written confirmation of no sale. BFTA handles post-Event transport from Columbus unless otherwise agreed.",
                        s["cell"],
                    ),
                ],
                [
                    Paragraph("_____", s["cell"]),
                    Paragraph(
                        "<b>Reclaim.</b> Artist reclaims the Work and covers return shipping / pickup unless otherwise agreed.",
                        s["cell"],
                    ),
                ],
            ],
            [0.65 * inch, 6.05 * inch],
        )
    )

    story.append(Paragraph("5. Live painting raffle (Work #5)", s["h"]))
    for line in [
        "Artist will paint Work #5 <b>live</b> at Bitcoin Arts Park (Bitsby appears; remaining content open to audience ideas, as promoted by BFTA).",
        "The finished Work is the <b>raffle prize</b> (not fixed-price sale or silent auction). Winner announced by <b>3:00 PM ET, Thursday, September 24, 2026</b> (or as BFTA announces on-site).",
        "<b>Raffle proceeds</b> means net funds actually collected from raffle entries for this prize (after processor fees), not a sale price of the painting.",
    ]:
        story.append(Paragraph(f"• {line}", s["bullet"]))
    story.append(Paragraph("Artist initials <b>one</b> split of raffle proceeds:", s["body"]))
    story.append(
        table(
            [
                [Paragraph("<b>Initials</b>", s["cellb"]), Paragraph("<b>Option</b>", s["cellb"])],
                [
                    Paragraph("_____", s["cell"]),
                    Paragraph(
                        "<b>A. Artist keeps 100%.</b> 100% of net raffle proceeds to Artist.",
                        s["cell"],
                    ),
                ],
                [
                    Paragraph("_____", s["cell"]),
                    Paragraph("<b>B. Half / half.</b> 50% to BFTA · 50% to Artist.", s["cell"]),
                ],
                [
                    Paragraph("_____", s["cell"]),
                    Paragraph(
                        "<b>C. One-third / two-thirds.</b> 1/3 to BFTA · 2/3 to Artist.",
                        s["cell"],
                    ),
                ],
                [
                    Paragraph("_____", s["cell"]),
                    Paragraph(
                        "<b>D. Full donation.</b> 100% of net raffle proceeds to Bitcoin for the Arts, Inc.",
                        s["cell"],
                    ),
                ],
            ],
            [0.65 * inch, 6.05 * inch],
        )
    )
    for line in [
        "If Option A, B, or C includes an Artist share, BFTA remits that share within <b>thirty (30) days</b> of cleared raffle funds.",
        "Title to the finished live painting transfers to the raffle winner upon award, subject to Event raffle rules posted by BFTA.",
        "BFTA administers the raffle consistent with its nonprofit practices and applicable Event / venue requirements. Entry mechanics will be posted at the booth.",
    ]:
        story.append(Paragraph(f"• {line}", s["bullet"]))

    story.append(Paragraph("6. Delivery &amp; risk", s["h"]))
    for line in [
        "Artist ships or delivers Works #1-#4 (and materials for Work #5 as needed) per BFTA advance-warehouse / booth instructions, targeting arrival <b>September 20, 21, or 22, 2026</b> (or another window BFTA confirms in writing).",
        "Artist sends tracking to BFTA promptly after shipment.",
        "Risk of loss remains with Artist until each Work is received into BFTA / show custody; thereafter BFTA exercises reasonable care on-site. BFTA is not an insurer of the Works.",
        "Post-Event handling of unsold fixed-price works and unsold <i>HODL On</i> follows Sections 3 and 4. The live raffle Work follows Section 5.",
    ]:
        story.append(Paragraph(f"• {line}", s["bullet"]))

    story.append(Paragraph("7. Marketing &amp; credit", s["h"]))
    story.append(
        Paragraph(
            "Artist grants BFTA a non-exclusive license to photograph and reproduce images of the Works for Event signage, website pages, newsletter, social, and archival documentation, "
            "with credit to <b>Shipwreck Sean</b> (and Bitsby where appropriate). Artist may likewise reference the Event and BFTA collaboration. Social credit may include <b>@artbyshipwreck</b>.",
            s["body"],
        )
    )

    story.append(Paragraph("8. Relationship", s["h"]))
    story.append(
        Paragraph(
            "This Agreement is a consignment for exhibition, sale facilitation, auction, and raffle. It does not create employment, partnership, or an obligation for BFTA to guarantee any sale or raffle outcome. "
            "Artist is responsible for Artist’s own tax treatment of proceeds or donation outcomes; BFTA may issue customary acknowledgments consistent with its 501(c)(3) practices where applicable.",
            s["body"],
        )
    )

    story.append(Paragraph("9. Entire agreement", s["h"]))
    story.append(
        Paragraph(
            "This document (and any public lot page URL BFTA later confirms for <i>HODL On</i>) is the entire agreement for these Works. "
            "Changes must be in writing (email sufficient) and acknowledged by both parties.",
            s["body"],
        )
    )

    story.append(hr())
    story.append(Paragraph("Signatures", s["h"]))
    story.append(
        KeepTogether(
            [
                Paragraph("<b>Artist - Shipwreck Sean</b>", s["sighead"]),
                Paragraph(
                    "Signature: _______________________________  Date: _______________",
                    s["sig"],
                ),
                Paragraph("Printed name: Shipwreck Sean", s["sig"]),
                Paragraph("Email: ________________", s["sig"]),
                Paragraph(
                    "Lightning: shipwrecksean@walletofsatoshi.com",
                    s["sig"],
                ),
                Paragraph(
                    "BTC: bc1pc306rnzwz9xxfugewu4jqsqru88v023qpx070kdapf3q2zkrknxq97v65q",
                    s["sig"],
                ),
                Paragraph("Websites: shipwrecksean.com · bitsby.co", s["sig"]),
                Paragraph("Social: @artbyshipwreck", s["sig"]),
            ]
        )
    )
    story.append(Spacer(1, 6))
    story.append(
        KeepTogether(
            [
                Paragraph("<b>Bitcoin for the Arts, Inc.</b>", s["sighead"]),
                Paragraph(
                    "Signature: _______________________________  Date: _______________",
                    s["sig"],
                ),
                Paragraph("Printed name: Dion Wilson", s["sig"]),
                Paragraph("Title: Founder &amp; Executive Director", s["sig"]),
                Paragraph("Email: dionwilson@bitcoinforthearts.org", s["sig"]),
                Paragraph("EIN: 41-2642260", s["sig"]),
            ]
        )
    )

    doc.build(story)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    build()
