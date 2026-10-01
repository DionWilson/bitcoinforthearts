#!/usr/bin/env python3
"""Generate DocuSign-ready BFTA micro-grant agreement PDFs for Arcella + Zasinets."""

from pathlib import Path

from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_RIGHT
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

ORANGE = colors.HexColor("#FF4F14")
BLACK = colors.HexColor("#111111")
GRAY = colors.HexColor("#444444")
LIGHT = colors.HexColor("#F5F5F5")
ROOT = Path(__file__).resolve().parents[2]
ART = Path("/opt/cursor/artifacts")
DOCS = Path(__file__).resolve().parent
LOGO = ROOT / "public/brand-kit/inline-bugs/inline-cream-orange.png"
ADDRESS_LINE = "27 West 60th Street, PO Box 20069, New York, NY 10023"


def styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "title",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=16,
            textColor=BLACK,
            alignment=TA_CENTER,
            spaceBefore=6,
            spaceAfter=2,
        ),
        "sub": ParagraphStyle(
            "sub",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            textColor=GRAY,
            alignment=TA_CENTER,
            spaceAfter=8,
        ),
        "org": ParagraphStyle(
            "org",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8,
            leading=11,
            textColor=BLACK,
            alignment=TA_RIGHT,
        ),
        "h": ParagraphStyle(
            "h",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=13,
            textColor=ORANGE,
            spaceBefore=10,
            spaceAfter=4,
        ),
        "body": ParagraphStyle(
            "body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            textColor=BLACK,
            alignment=TA_JUSTIFY,
            spaceAfter=6,
        ),
        "bullet": ParagraphStyle(
            "bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            textColor=BLACK,
            leftIndent=12,
            spaceAfter=3,
        ),
        "meta": ParagraphStyle(
            "meta",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            textColor=BLACK,
            spaceAfter=2,
        ),
        "label": ParagraphStyle(
            "label",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8,
            leading=10,
            textColor=GRAY,
        ),
        "small": ParagraphStyle(
            "small",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.5,
            leading=10,
            textColor=GRAY,
            alignment=TA_JUSTIFY,
            spaceBefore=8,
        ),
        "sign": ParagraphStyle(
            "sign",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            textColor=BLACK,
            spaceBefore=4,
            spaceAfter=2,
        ),
        "foot": ParagraphStyle(
            "foot",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.5,
            leading=10,
            textColor=GRAY,
            alignment=TA_CENTER,
            spaceBefore=10,
        ),
    }


def letterhead(s):
    im = PILImage.open(LOGO)
    w, h = im.size
    logo_w = 2.35 * inch
    logo_h = logo_w * (h / w)
    org = Paragraph(
        "<b><font color='#FF4F14'>BITCOIN FOR THE ARTS, INC.</font></b><br/>"
        "New York 501(c)(3) Nonprofit · EIN 41-2642260<br/>"
        "27 West 60th Street, PO Box 20069<br/>"
        "New York, NY 10023<br/>"
        "grants@bitcoinforthearts.org<br/>"
        "www.bitcoinforthearts.org",
        s["org"],
    )
    header = Table(
        [[Image(str(LOGO), width=logo_w, height=logo_h), org]],
        colWidths=[3.3 * inch, 3.7 * inch],
    )
    header.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return header


def payout_block(s, prefilled_address: str | None = None):
    """DocuSign-ready payout fields for on-chain and/or Lightning."""
    lines = [
        Paragraph("Payout destination (required before payment)", s["h"]),
        Paragraph(
            "Artist must provide at least one valid payout destination. BFTA will pay the grant in Bitcoin to the address(es) confirmed below. Double-check spelling — Bitcoin transactions are irreversible.",
            s["body"],
        ),
    ]
    if prefilled_address:
        lines.append(
            Paragraph(
                f"<b>On-chain address listed on application (confirm or update):</b><br/>{prefilled_address}",
                s["meta"],
            )
        )
        lines.append(Spacer(1, 6))

    rows = [
        [
            Paragraph("<b>On-chain Bitcoin address</b><br/>(bc1… / legacy)", s["meta"]),
            Paragraph(
                "_______________________________________________<br/>"
                "_______________________________________________",
                s["meta"],
            ),
        ],
        [
            Paragraph("<b>Lightning address</b><br/>(name@domain or LNURL / invoice)", s["meta"]),
            Paragraph(
                "_______________________________________________<br/>"
                "_______________________________________________",
                s["meta"],
            ),
        ],
        [
            Paragraph("<b>Preferred rail</b>", s["meta"]),
            Paragraph(
                "☐ On-chain &nbsp;&nbsp; ☐ Lightning &nbsp;&nbsp; ☐ Either (BFTA chooses)",
                s["meta"],
            ),
        ],
        [
            Paragraph("<b>Artist confirms address is correct</b>", s["meta"]),
            Paragraph(
                "Initials: __________ &nbsp;&nbsp; Date: __________",
                s["meta"],
            ),
        ],
    ]
    table = Table(rows, colWidths=[2.35 * inch, 4.65 * inch])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), LIGHT),
                ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#DDDDDD")),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#EEEEEE")),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    lines.append(table)
    lines.append(Spacer(1, 6))
    return lines


def header(s, agreement_id):
    story = [
        letterhead(s),
        HRFlowable(width="100%", thickness=2.2, color=ORANGE, spaceBefore=2, spaceAfter=8),
        Paragraph("Micro-Grant Agreement", s["title"]),
        Paragraph(
            f"{ADDRESS_LINE}<br/>Agreement ID: {agreement_id}",
            s["sub"],
        ),
    ]
    return story


def payout_block(s, prefilled_address: str | None = None):
    """DocuSign-ready payout fields for on-chain and/or Lightning."""
    lines = [
        Paragraph("Payout destination (required before payment)", s["h"]),
        Paragraph(
            "Artist must provide at least one valid payout destination. BFTA will pay the grant in Bitcoin to the address(es) confirmed below. Double-check spelling — Bitcoin transactions are irreversible.",
            s["body"],
        ),
    ]
    if prefilled_address:
        lines.append(
            Paragraph(
                f"<b>On-chain address listed on application (confirm or update):</b><br/>{prefilled_address}",
                s["meta"],
            )
        )
        lines.append(Spacer(1, 6))

    rows = [
        [
            Paragraph("<b>On-chain Bitcoin address</b><br/>(bc1… / legacy)", s["meta"]),
            Paragraph(
                "_______________________________________________<br/>"
                "_______________________________________________",
                s["meta"],
            ),
        ],
        [
            Paragraph("<b>Lightning address</b><br/>(name@domain or LNURL / invoice)", s["meta"]),
            Paragraph(
                "_______________________________________________<br/>"
                "_______________________________________________",
                s["meta"],
            ),
        ],
        [
            Paragraph("<b>Preferred rail</b>", s["meta"]),
            Paragraph(
                "☐ On-chain &nbsp;&nbsp; ☐ Lightning &nbsp;&nbsp; ☐ Either (BFTA chooses)",
                s["meta"],
            ),
        ],
        [
            Paragraph("<b>Artist confirms address is correct</b>", s["meta"]),
            Paragraph(
                "Initials: __________ &nbsp;&nbsp; Date: __________",
                s["meta"],
            ),
        ],
    ]
    table = Table(rows, colWidths=[2.35 * inch, 4.65 * inch])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), LIGHT),
                ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#DDDDDD")),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#EEEEEE")),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    lines.append(table)
    lines.append(Spacer(1, 6))
    return lines


def facts_table(s, facts, left_w=1.55):
    rows = [
        [Paragraph(f"<b>{a}</b>", s["meta"]), Paragraph(b, s["meta"])] for a, b in facts
    ]
    table = Table(rows, colWidths=[left_w * inch, (7.0 - left_w) * inch])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), LIGHT),
                ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#DDDDDD")),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#EEEEEE")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return table


def sig_block(s):
    left = [
        Paragraph("<b>GRANTEE</b>", s["label"]),
        Spacer(1, 18),
        Paragraph("Signature: _______________________________", s["sign"]),
        Paragraph("Print name: _____________________________", s["sign"]),
        Paragraph("Title (if any): ___________________________", s["sign"]),
        Paragraph("Date: ___________________________________", s["sign"]),
        Paragraph("Email: __________________________________", s["sign"]),
    ]
    right = [
        Paragraph("<b>BITCOIN FOR THE ARTS, INC.</b>", s["label"]),
        Spacer(1, 14),
        Paragraph("Signature: _______________________________", s["sign"]),
        Paragraph("Print name: Dion Wilson", s["sign"]),
        Paragraph("Title: Founder &amp; Executive Director", s["sign"]),
        Paragraph("Date: ___________________________________", s["sign"]),
        Paragraph("Email: grants@bitcoinforthearts.org", s["sign"]),
        Paragraph("27 West 60th Street, PO Box 20069", s["sign"]),
        Paragraph("New York, NY 10023", s["sign"]),
    ]
    t = Table([[left, right]], colWidths=[3.5 * inch, 3.5 * inch])
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return t


def build_pdf(filename: str, story_builder):
    ART.mkdir(parents=True, exist_ok=True)
    DOCS.mkdir(parents=True, exist_ok=True)
    out = ART / filename
    copy = DOCS / filename
    doc = SimpleDocTemplate(
        str(out),
        pagesize=letter,
        leftMargin=0.65 * inch,
        rightMargin=0.65 * inch,
        topMargin=0.55 * inch,
        bottomMargin=0.55 * inch,
    )
    doc.build(story_builder(styles()))
    copy.write_bytes(out.read_bytes())
    print(f"Wrote {out}")
    print(f"Copied {copy}")


def christopher_story(s):
    story = header(s, "BFTA-MG-2026-ARCELLA-1000")
    story.append(
        facts_table(
            s,
            [
                ("Grantor", "Bitcoin for the Arts, Inc. (“BFTA”)"),
                ("Grantee", "Christopher Arcella / Mega Mellivora LLC (“Artist”)"),
                ("Project title", "The Bitcoin Executor"),
                ("Application ID", "6a5c1c7f7cc78870fce4127c"),
                ("Grant amount", "USD $1,000.00 equivalent, paid in Bitcoin"),
                (
                    "Payment method",
                    "On-chain Bitcoin and/or Lightning (as agreed in writing)",
                ),
                (
                    "Artist contact",
                    "christopher@thebitcoinexecutor.com · 929-280-0650",
                ),
                ("Mailing address", "1749 NE Miami Ct #408, Miami, FL 33132"),
                ("Project timeline", "Now through Winter–Spring 2027"),
                ("Effective date", "Date of last signature below"),
            ],
        )
    )
    story += [
        Paragraph("1. Purpose", s["h"]),
        Paragraph(
            "This micro-grant supports Artist’s project <i>The Bitcoin Executor</i>, a Bitcoin-themed narrative feature film in post-production, including work toward completion, marketing, and distribution / theatrical-screening development as described in Artist’s BFTA grant application. Artist retains full creative control of the Work.",
            s["body"],
        ),
        Paragraph("2. Grant amount and payment", s["h"]),
        Paragraph(
            "BFTA awards <b>One Thousand U.S. Dollars (USD $1,000.00)</b>, payable in Bitcoin (on-chain and/or Lightning) at the BTC/USD rate reasonably used by BFTA on the payment date. Payment will be sent after (a) this Agreement is fully signed, (b) Artist provides a completed IRS Form W-9, and (c) Artist provides a valid Bitcoin and/or Lightning payout destination in writing. Artist acknowledges Bitcoin price volatility and transaction finality. BFTA is not responsible for wallet loss, user error, incorrect addresses, or exchange-rate movement after payment is sent.",
            s["body"],
        ),
        Paragraph("3. Use of funds", s["h"]),
        Paragraph(
            "Funds may be used for reasonable project-related expenses consistent with the application, including without limitation:",
            s["body"],
        ),
    ]
    for b in [
        "Theatrical screening / tour planning and related consulting",
        "Marketing package for the tour (including Nostr/X campaign and printed posters)",
        "Commerce / ticketing site development supporting Bitcoin payment options",
        "Other reasonable costs directly tied to completing, marketing, or distributing the film",
    ]:
        story.append(Paragraph(f"• {b}", s["bullet"]))
    story += [
        Paragraph(
            "Funds may not be used for illegal activity, unlawful political campaign intervention, or purposes unrelated to the Project.",
            s["body"],
        ),
        Paragraph("4. Recognition and attribution", s["h"]),
        Paragraph(
            "Artist agrees to provide Bitcoin for the Arts with clear recognition reflecting the level of support, including listing BFTA in the film’s end credits (sponsor / supporter acknowledgment, or such other high-visibility credit as the parties confirm in writing before final lock). Where Artist publicly shares Project updates related to this grant, Artist will credit BFTA where reasonable: “Supported by Bitcoin for the Arts.”",
            s["body"],
        ),
        Paragraph("5. Reporting", s["h"]),
        Paragraph(
            "Within <b>60 days</b> of receiving the grant (and upon reasonable request thereafter through Project completion), Artist will provide a short written update (approximately 3–10 sentences) and, when appropriate, links or media documenting progress (e.g., screening plans, marketing materials, or release milestones). Artist agrees to notify BFTA if the Project becomes impossible to complete as described.",
            s["body"],
        ),
        Paragraph("6. Publicity", s["h"]),
        Paragraph(
            "BFTA may publicly feature Artist’s name, Project title, a short description, and media Artist provides or approves, including on BFTA’s website, newsletter, social channels, and grant storytelling. Artist may request reasonable corrections to factual errors.",
            s["body"],
        ),
        Paragraph("7. Relationship of the parties", s["h"]),
        Paragraph(
            "Artist is an independent grantee, not an employee, partner, or agent of BFTA. This grant does not create an employment relationship. Artist is solely responsible for any taxes arising from receipt of the grant.",
            s["body"],
        ),
        Paragraph("8. Termination / unused funds", s["h"]),
        Paragraph(
            "If the Project cannot proceed, Artist will notify BFTA promptly. BFTA may request return of unused grant funds on a best-effort basis. Either party may terminate this Agreement for material breach not cured within 14 days after written notice.",
            s["body"],
        ),
        Paragraph("9. Entire agreement", s["h"]),
        Paragraph(
            "This Agreement is the entire agreement between the parties concerning this micro-grant and may be signed electronically (including via DocuSign). Electronic signatures are effective. Governing law: State of New York, without regard to conflict-of-law rules.",
            s["body"],
        ),
        Paragraph(
            "This document is an organizational grant instrument. It is not legal, tax, or investment advice. Artist should consult Artist’s own advisors as needed.",
            s["small"],
        ),
        Spacer(1, 8),
        *payout_block(s),
        Spacer(1, 8),
        HRFlowable(width="100%", thickness=1, color=ORANGE, spaceAfter=10),
        Paragraph("Signatures", s["h"]),
        sig_block(s),
        Paragraph(
            "Bitcoin for the Arts, Inc. · 27 West 60th Street, PO Box 20069 · New York, NY 10023 · www.bitcoinforthearts.org",
            s["foot"],
        ),
    ]
    return story


def aksana_story(s):
    story = header(s, "BFTA-MG-2026-ZASINETS-400")
    story.append(
        facts_table(
            s,
            [
                ("Grantor", "Bitcoin for the Arts, Inc. (“BFTA”)"),
                ("Grantee", "Aksana Zasinets (5Ksana) (“Artist”)"),
                ("Project title", "Embroidery for Freedom"),
                ("Application ID", "69ba6939aa1ff5b9e1834046"),
                ("Grant amount", "USD $400.00 equivalent, paid in Bitcoin"),
                (
                    "Payment method",
                    "On-chain Bitcoin (preferred to Artist’s provided address)",
                ),
                ("Artist contact", "info@buybitart.com · +48 572 313 056"),
                ("Mailing address", "Belgradzka 8, m. 45, 02-793 Warsaw, Poland"),
                (
                    "Bitcoin address (application)",
                    "bc1q7xzx7gacnkhlt8j09k5f6krqwjsmhcn85lye5j",
                ),
                ("Project timeline", "Approximately 6 months from funding"),
                ("Effective date", "Date of last signature below"),
            ],
            left_w=1.7,
        )
    )
    story += [
        Paragraph("1. Purpose", s["h"]),
        Paragraph(
            "This micro-grant supports Artist’s project <i>Embroidery for Freedom</i>: handmade textile / embroidery works exploring freedom, independence, and Bitcoin-aligned values, including creation of a special embroidered artwork dedicated to Bitcoin for the Arts. Artist retains full creative control of the Work.",
            s["body"],
        ),
        Paragraph("2. Grant amount and payment", s["h"]),
        Paragraph(
            "BFTA awards <b>Four Hundred U.S. Dollars (USD $400.00)</b>, payable in Bitcoin at the BTC/USD rate reasonably used by BFTA on the payment date. Payment will be sent after (a) this Agreement is fully signed, (b) Artist provides a completed IRS tax form appropriate to Artist’s status (typically Form <b>W-8BEN</b> for a non-U.S. individual; Form W-9 if Artist is a U.S. person), and (c) Artist confirms the Bitcoin payout address in writing. Artist acknowledges Bitcoin price volatility and transaction finality. BFTA is not responsible for wallet loss, user error, incorrect addresses, or exchange-rate movement after payment is sent.",
            s["body"],
        ),
        Paragraph("3. Use of funds", s["h"]),
        Paragraph(
            "Funds may be used for reasonable project-related expenses consistent with the application, centered on creating the embroidered artwork(s), including materials and the workspace tools needed to complete the work at a high level of craft (for example, embroidery table / supportive chair), documentation, and shipping of the dedicated piece to BFTA. Funds may not be used for illegal activity or purposes unrelated to the Project.",
            s["body"],
        ),
        Paragraph("4. Deliverable and attribution", s["h"]),
        Paragraph(
            "Artist will create and send to BFTA one embroidered artwork dedicated to Bitcoin for the Arts, reflecting values of independence, transparency, and support for artists. Shipping details will be confirmed by email. Where Artist publicly shares Project updates related to this grant, Artist will credit BFTA where reasonable: “Supported by Bitcoin for the Arts.”",
            s["body"],
        ),
        Paragraph("5. Reporting", s["h"]),
        Paragraph(
            "Within <b>60 days</b> of receiving the grant, and again at Project completion (or within 6 months, whichever is earlier), Artist will provide a short written update on fund use and progress, including photos/video of process and the finished dedicated artwork when available, and confirmation when the piece has been sent to BFTA. Artist agrees to notify BFTA if the Project becomes impossible to complete as described.",
            s["body"],
        ),
        Paragraph("6. Publicity", s["h"]),
        Paragraph(
            "BFTA may publicly feature Artist’s name, Project title, a short description, and media Artist provides or approves, including on BFTA’s website, newsletter, social channels, and grant storytelling. Artist may request reasonable corrections to factual errors.",
            s["body"],
        ),
        Paragraph("7. Relationship of the parties", s["h"]),
        Paragraph(
            "Artist is an independent grantee, not an employee, partner, or agent of BFTA. This grant does not create an employment relationship. Artist is solely responsible for any taxes arising from receipt of the grant under applicable law.",
            s["body"],
        ),
        Paragraph("8. Termination / unused funds", s["h"]),
        Paragraph(
            "If the Project cannot proceed, Artist will notify BFTA promptly. BFTA may request return of unused grant funds on a best-effort basis. Either party may terminate this Agreement for material breach not cured within 14 days after written notice.",
            s["body"],
        ),
        Paragraph("9. Entire agreement", s["h"]),
        Paragraph(
            "This Agreement is the entire agreement between the parties concerning this micro-grant and may be signed electronically (including via DocuSign). Electronic signatures are effective. Governing law: State of New York, without regard to conflict-of-law rules.",
            s["body"],
        ),
        Paragraph(
            "This document is an organizational grant instrument. It is not legal, tax, or investment advice. Artist should consult Artist’s own advisors as needed.",
            s["small"],
        ),
        Spacer(1, 8),
        *payout_block(
            s,
            prefilled_address="bc1q7xzx7gacnkhlt8j09k5f6krqwjsmhcn85lye5j",
        ),
        Spacer(1, 8),
        HRFlowable(width="100%", thickness=1, color=ORANGE, spaceAfter=10),
        Paragraph("Signatures", s["h"]),
        sig_block(s),
        Paragraph(
            "Bitcoin for the Arts, Inc. · 27 West 60th Street, PO Box 20069 · New York, NY 10023 · www.bitcoinforthearts.org",
            s["foot"],
        ),
    ]
    return story


def main():
    build_pdf(
        "BFTA-Micro-Grant-Agreement-Christopher-Arcella-Bitcoin-Executor.pdf",
        christopher_story,
    )
    build_pdf(
        "BFTA-Micro-Grant-Agreement-Aksana-Zasinets-Embroidery-for-Freedom.pdf",
        aksana_story,
    )


if __name__ == "__main__":
    main()
