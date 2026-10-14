"""Builds the board minutes HTML files. Render each to PDF with headless Chrome into public/."""
from pathlib import Path

HERE = Path(__file__).parent
LOGO = "../../public/brand-kit/square-bugs/square-orange.png"
C = lambda s: f'<mark class="confirm">{s}</mark>'


def meta(rows):
    return '<table class="meta">' + "".join(
        f'<tr><td class="k">{k}</td><td>{v}</td></tr>' for k, v in rows
    ) + "</table>"


def att(rows):
    out = '<table class="att"><tr><th>Status</th><th>Name and role</th></tr>'
    for s, names in rows:
        out += f'<tr><td class="s">{s}</td><td>{names}</td></tr>'
    return out + "</table>"


def motion(text, moved=None, second=None, vote=None, result=None, label="Motion"):
    rows = f'<div class="lbl">{label}</div><div class="row">{text}</div>'
    for k, v in (("Moved", moved), ("Second", second), ("Vote", vote), ("Result", result)):
        if v:
            rows += f'<div class="row"><b>{k}</b> {v}</div>'
    return f'<div class="motion">{rows}</div>'


def ul(items):
    return "<ul>" + "".join(f"<li>{i}</li>" for i in items) + "</ul>"


def fig(rows):
    return '<table class="fig">' + "".join(
        f'<tr><td>{k}</td><td class="a">{v}</td></tr>' for k, v in rows
    ) + "</table>"


def actions(rows):
    out = '<table class="actions"><tr><th>Action</th><th>Owner</th></tr>'
    for a, o in rows:
        out += f'<tr><td>{a}</td><td class="o">{o}</td></tr>'
    return out + "</table>"


def sections(items):
    html = ""
    for i, (title, body) in enumerate(items, 1):
        html += f'<h2><span class="n">{i}.</span>{title}</h2>{body}'
    return html


def sigs(entries, lead):
    s = "".join(
        f'<div class="sig"><div class="line">{line}</div><div class="who">{who}</div>'
        f'<div class="role">{role}</div></div>'
        for line, who, role in entries
    )
    return f'<div class="cert"><p class="lead">{lead}</p><div class="sigs">{s}</div></div>'


def page(kicker, title, short, body):
    return f"""<!doctype html><html><head><meta charset="utf-8">
<title>{title}</title><link rel="stylesheet" href="minutes.css"></head><body>
<div class="masthead">
  <div class="brand"><img src="{LOGO}" alt="">
    <div><div class="name">Bitcoin For The Arts, Inc.</div>
    <div class="sub">501(c)(3) nonprofit &middot; EIN 41-2642260 &middot; New York</div></div></div>
  <div class="doctype"><strong>Board Minutes</strong>{short}</div>
</div>
<div class="kicker">{kicker}</div>
<h1>{title}</h1>
{body}
<div class="foot">Bitcoin For The Arts, Inc. &middot; bitcoinforthearts.org/transparency &middot; Published for public transparency.</div>
</body></html>"""


DOCS = {}

# ---------------------------------------------------------------- Organizational, Nov 16 2025
DOCS["incorp-q4-2025"] = page(
    "Q4 2025 &middot; Organizational meeting",
    "Minutes of the Organizational Meeting of the Board of Trustees",
    "November 16, 2025",
    meta([
        ("Date", "Sunday, November 16, 2025"),
        ("Time", "4:00 PM to 4:25 PM Eastern"),
        ("Format", "Video conference (Zoom). Unanimous written consent in lieu of meeting authorized."),
        ("Presiding", "Dion Wilson, Chair"),
        ("Recorded by", "Dion Wilson, Acting Secretary (to be ratified)"),
    ])
    + sections([
        ("Attendance and quorum",
         att([("Present", "Dion Wilson, Founder and Chair<br>Avinash Burra, Trustee<br>Cheryl McGinnis, Trustee")])
         + "<p>All three initial trustees were present. Quorum was established under Bylaws Article V, Section 5.04.</p>"),
        ("Call to order", "<p>The Chair called the meeting to order at 4:00 PM Eastern.</p>"),
        ("Adoption of bylaws",
         motion("RESOLVED, that the Bylaws of Bitcoin For The Arts, Inc., dated November 16, 2025, as presented, are adopted in full as the governing document of the Corporation.",
                vote="Unanimous, 3 to 0", result="Adopted", label="Resolution")),
        ("Certificate of incorporation",
         motion("RESOLVED, that the Certificate of Incorporation of Bitcoin For The Arts, Inc., as prepared and signed by Incorporator Dion Wilson, is ratified and approved for filing with the New York Department of State. FURTHER RESOLVED, that the Chair is authorized to submit the Certificate with the DOS-1511-f cover sheet and the $75 filing fee, to request expedited processing if needed, and to receive and file the certified copy on return.",
                vote="Unanimous, 3 to 0", result="Adopted", label="Resolution")),
        ("Election of officers",
         motion("RESOLVED, that the following officers are elected to serve until the next annual meeting: Chair, Dion Wilson. Treasurer, Avinash Burra. Secretary, Cheryl McGinnis.",
                vote="Unanimous, 3 to 0", result="Adopted", label="Resolution")),
        ("Banking and bitcoin operations",
         motion("RESOLVED, that the Treasurer is authorized to open a business checking account at Mercury in the name of the Corporation; to establish a BTCPay Server instance at btcpay.bitcoinforthearts.org; and to create a 3-of-5 multi-signature HODL Vault using Sparrow Wallet, with keys held by the Chair, the Treasurer, the Secretary, and two additional trustees. The public address will be published after the 501(c)(3) determination. Key-holder device details are kept in the corporate record.",
                vote="Unanimous, 3 to 0", result="Adopted", label="Resolution")),
        ("IRS and compliance",
         motion("RESOLVED, that the Chair is authorized to obtain an EIN from the IRS (Form SS-4), and to file Form 1023-EZ with the $275 fee, attaching the stamped Certificate of Incorporation and the adopted Bylaws, under NTEE code A25.",
                vote="Unanimous, 3 to 0", result="Adopted", label="Resolution")),
        ("Adjournment",
         "<p>There being no further business, the meeting was adjourned at 4:25 PM Eastern.</p>"
         "<p><b>Filed with:</b> corporate records; IRS Form 1023; New York Attorney General CHAR410.<br>"
         "<b>Next meeting:</b> February 3, 2026 (annual).</p>"),
    ])
    + sigs([
        ("/s/ Dion Wilson", "Dion Wilson", "Chair and Acting Secretary &middot; November 16, 2025"),
        ("/s/ Avinash Burra", "Avinash Burra", "Trustee &middot; November 16, 2025"),
        ("/s/ Cheryl McGinnis", "Cheryl McGinnis", "Trustee &middot; November 16, 2025"),
    ], "These minutes accurately reflect the actions taken. Approved by unanimous written consent in lieu of meeting, under Bylaws Article V, Section 5.08."),
)

# ---------------------------------------------------------------- Q1, Feb 3 2026
DOCS["q1-2026"] = page(
    "Q1 2026 &middot; Annual meeting",
    "Minutes of the Q1 2026 Meeting of the Board of Trustees",
    "February 3, 2026",
    meta([
        ("Date", "Tuesday, February 3, 2026"),
        ("Time", "Scheduled 4:30 PM Eastern. Called to order 4:36 PM. Adjourned 5:50 PM."),
        ("Format", "Video conference (Zoom)"),
        ("Presiding", "Dion Wilson, Chair"),
        ("Recorded by", "Cheryl McGinnis, Secretary"),
    ])
    + sections([
        ("Attendance and quorum",
         att([
             ("Present", "Dion Wilson, Founder and Chair<br>Avinash Burra, Treasurer<br>Cheryl McGinnis, Secretary"),
             ("Candidates", "Ahmed Klink<br>Kyle Shirkness"),
             ("Advisors", "Kyle Knight, Julie Costello, Buttercup Roberts, Camas Logue (introduced)"),
         ])
         + "<p>Quorum was achieved with all current trustees present. The Secretary confirmed quorum and recorded attendance.</p>"),
        ("Call to order and welcome",
         "<p>The Chair called the meeting to order at 4:36 PM Eastern, welcomed all attendees, and noted the organization's progress.</p>"),
        ("Board candidates",
         "<p>The Chair presented two candidates for board membership:</p>"
         + ul([
             "<b>Ahmed Klink.</b> Creative Director of Sunday Afternoon, photographer, and branding specialist.",
             "<b>Kyle Shirkness.</b> Background in nonprofit governance, financial services, and partnerships.",
         ])
         + "<p>The candidates introduced themselves and their interest in BFTA's mission of supporting artists through Bitcoin-native funding. The board discussed their qualifications. No concerns were raised.</p>"
         + motion("To elect Ahmed Klink and Kyle Shirkness to the Board.",
                  moved="Avinash Burra, Treasurer", second="Cheryl McGinnis, Secretary",
                  vote="Unanimous, 3 to 0", result="Approved. Both candidates were welcomed as directors.")),
        ("Advisory board",
         "<p>The Chair introduced the advisory board and described its role: non-binding guidance on fundraising, grant applications, and partnerships. Advisors shared their perspectives, and the board noted the value of the group in expanding the organization's network and expertise.</p>"),
        ("Policies",
         "<p>The Chair confirmed that all board and advisory members received the following policies by email before the meeting: Program Policy, Donor Pipeline, Donation Policy, CSR Policy, Endowment Management Policy, and Code of Ethics Policy. No detailed review was conducted. The floor was opened for questions and amendments, and none were proposed.</p>"
         + "<p>The Granting Guidelines and donor perks were identified as needing further review. The Secretary will record any future feedback for the next meeting.</p>"),
        ("Fundraising strategy",
         "<p>The Chair presented the fundraising strategy and the donor pipeline for the next quarter:</p>"
         + ul([
             "A phased donor approach (easy, sought-after, and major), with at least three active tiers each quarter.",
             "Awareness through X and Nostr posts, webinars, and events.",
             "Grant applications after tax-exempt status, for example the NEA and the New York Community Trust.",
             "Identifying emerging artists for initial funding whose work aligns with Bitcoin themes such as sovereignty and censorship resistance.",
             "Monthly donor tiers at bitcoinforthearts.org/donate/monthly, and a New York showcase or fundraiser tied to a July 1 launch.",
             "Partnerships with AEA and AGMA for webinars, and Bitcoin events for major-donor introductions.",
         ])
         + "<p>The board reviewed metrics, including return targets and recurring revenue from tiers such as the $51 Sovereign Stacker. Suggestions included A/B testing pitches and using advisory networks for major-donor introductions. The board agreed to prioritize Bitcoin-native tactics (about 60 percent) while using Stripe for fiat donations.</p>"
         + motion("Approve the fundraising strategy, with Q1 focused on recruiting lower-tier donors.", result="Approved by consensus", label="Decision")),
        ("Multi-signature wallet and board wallets",
         "<p>The Chair discussed providing Bitcoin wallets to the new directors as part of onboarding, to be distributed after the meeting. The board agreed on the importance of a secure multi-signature setup for the endowment and operations. The Treasurer gave a brief overview of the process and its compliance with the Endowment Management Policy.</p>"),
        ("Other business", "<p>No other business was raised.</p>"),
        ("Action items",
         actions([
             ("Schedule a virtual meeting by February 10, 2026 to finalize the multi-signature wallet configuration. All members to confirm availability.", "Chair"),
             ("Distribute Bitcoin wallets to new directors.", "Chair"),
             ("Record policy feedback; bring Granting Guidelines and donor perks back for review.", "Secretary"),
         ])),
        ("Adjournment",
         "<p>The meeting was adjourned at 5:50 PM Eastern. <b>Next meeting:</b> Tuesday, April 7, 2026.</p>"),
    ])
    + sigs([
        ("/s/ Cheryl McGinnis", "Cheryl McGinnis", "Secretary &middot; Minutes prepared by"),
        ("/s/ Dion Wilson", "Dion Wilson", "Chair &middot; Approved by"),
    ], "These minutes record the discussions and decisions of the meeting. Amendments may be proposed at the next meeting."),
)

# ---------------------------------------------------------------- Q2, Apr 7 2026
DOCS["q2-2026"] = page(
    "Q2 2026 &middot; Quarterly meeting",
    "Minutes of the Q2 2026 Meeting of the Board of Directors",
    "April 7, 2026",
    meta([
        ("Date", "Tuesday, April 7, 2026"),
        ("Time", "Called to order 4:30 PM Eastern. Adjourned 6:20 PM."),
        ("Format", "Video conference (Zoom)"),
        ("Presiding", "Dion Wilson, Interim Chair"),
        ("Recorded by", "Dion Wilson"),
    ])
    + sections([
        ("Attendance",
         att([
             ("Directors", "Dion Wilson, Founder and Executive Director<br>Avi Burra, Treasurer<br>Ahmed Klink<br>Kyle Shirkness<br>" + C("Cheryl McGinnis, Secretary: present or absent?")),
             ("Advisors", "Kyle Knight, Buttercup Roberts, Julie Costello"),
             ("New", "Valerie Love, Advisor<br>Kenneth Burris, Artist Advocate"),
             ("Absent", "None recorded"),
         ])),
        ("Call to order", "<p>Dion Wilson called the meeting to order at 4:30 PM Eastern.</p>"),
        ("Welcome and introductions",
         "<p>Dion Wilson welcomed everyone and introduced Valerie Love as a new Advisor, and Kenneth Burris as Artist Advocate. Kenneth will help write and document artist stories and the organization's journey. All participants introduced themselves.</p>"),
        ("Q1 progress",
         ul([
             "Continued growth of the Share Your Bitcoin Journey podcast series and the artist database, with four to five interviews completed.",
             "New artist stories and articles published on the website.",
             "Launch of the newsletter on Beehiiv, and a Substack account for longer written work.",
         ])),
        ("Strike account",
         "<p>The organization opened a Strike account to purchase bitcoin. The Treasurer and the Executive Director will continue to manage treasury operations.</p>"),
        ("Funding applications",
         "<p>Applications have been submitted to Block, OpenSats, Start Small, and the Human Rights Foundation. Updates will be reported as responses arrive.</p>"),
        ("Wallet setup and board activation",
         "<p>All directors were reminded to schedule a short session with Dion Wilson to activate their Bitcoin wallets.</p>"),
        ("Newsletter, Substack, and YouTube",
         "<p>The first newsletter has launched. The board discussed growing the audience through consistent writing on Substack and further development of the podcast on YouTube.</p>"),
        ("Bitcoin Conference",
         "<p>Dion Wilson will represent BFTA at the upcoming Bitcoin Conference. Advisors attending were asked to mention the organization in their conversations and to arrange informal meetings with Dion to introduce potential donors and make the ask.</p>"),
        ("Branding and logo",
         "<p>Ahmed Klink reported that his production company, Sunday Afternoon, is leading the new logo and branding project. The board reviewed initial concepts and gave feedback on direction.</p>"),
        ("Board transition",
         "<p>Dion Wilson stated that he will remain a director for now, and plans to step down as a director once a new Chair is appointed. He proposed that Phindi Mkhize-Wilson be elected to replace him as a director at that time.</p>"),
        ("Strategic focus for Q2",
         "<p>The board discussed refocusing on a stronger foundation. Priorities:</p>"
         + ul([
             "Increasing donations and supporters.",
             "A/B testing for outreach and visibility.",
             "Fundraiser event ideas, venues, and a timeline for a first event in July or August.",
             "An 18-month plan for visibility at art events.",
         ])),
        ("Open discussion and new business",
         ul([
             "Partnerships with local arts organizations and institutions were discussed as a key growth area.",
             "Idealist.org for volunteer recruitment and Candid.org for nonprofit resources were noted.",
             "All members were encouraged to share leads and ideas.",
         ])),
        ("Adjournment",
         "<p>There being no further business, the meeting was adjourned at 6:20 PM Eastern. <b>Next meeting:</b> Tuesday, July 7, 2026.</p>"),
    ])
    + sigs([
        ("/s/ Dion Wilson", "Dion Wilson", "Interim Chair &middot; Minutes prepared April 7, 2026"),
        ("", "Approved by the Board", "Date approved:"),
    ], "These minutes record the discussions and decisions of the meeting."),
)

# ---------------------------------------------------------------- Q3, Jul 7 2026
DOCS["q3-2026"] = page(
    "Q3 2026 &middot; Quarterly meeting",
    "Minutes of the Q3 2026 Meeting of the Board of Directors",
    "July 7, 2026",
    meta([
        ("Date", "Tuesday, July 7, 2026"),
        ("Time", "Called to order 4:33 PM Eastern. Adjourned 5:44 PM."),
        ("Format", "Video conference"),
        ("Presiding", "Dion Wilson, Interim Chair and Executive Director"),
        ("Recorded by", "Dion Wilson, Chair (Secretary absent)"),
        ("Treasurer", "Avi Burra"),
    ])
    + sections([
        ("Attendance and quorum",
         att([
             ("Directors", "Dion Wilson, Interim Chair and Executive Director<br>Avi Burra, Treasurer<br>Ahmed Klink<br>Kyle Shirkness"),
             ("Advisors", C("Kyle Knight, Buttercup Roberts, Julie Costello, Valerie Love (Advisor), Kenneth Burris (Artist Advocate)")),
             ("Absent", "Cheryl McGinnis, Secretary"),
         ])
         + "<p>Four of five directors were present. Quorum was confirmed.</p>"),
        ("Call to order and preliminaries",
         "<p>The Chair called the meeting to order at 4:33 PM Eastern. The agenda was adopted.</p>"
         + motion("Approve the minutes of the Q2 2026 meeting held April 7, 2026.", result=C("Approved / not approved"))),
        ("Executive Director's report",
         "<p>The Executive Director reported on organizational health, team status, and the organization's public presence since the Q2 meeting. Details were covered in the items below.</p>"),
        ("Financial report",
         "<p>The Q2 2026 financial summary was presented, and the preliminary Q3 2026 budget was reviewed. The packet included a related-party disclosure covering contributions from Black Whale Holdings LLC and from the Executive Director.</p>"
         + motion("That the Board acknowledge the related-party contributions from Black Whale Holdings LLC and from the Executive Director, and their reporting on Form 990, Schedule L.",
                  vote=C("For / against / abstain. Did the Executive Director abstain?"), result=C("Approved / not approved"))),
        ("Q2 recap: cultural visibility",
         "<p><b>Public presence.</b> Bitcoin 2026 in Las Vegas; Bitcoin Is For Everyone in Portland; Camp Nakamoto on Sandy Island, New Hampshire; an introduction at the Bitcoin FilmFest; and a Founding Bitcoin Producer credit on The Six Billion Dollar Man.</p>"
         "<p><b>Published.</b> Ten episodes of Share Your Bitcoin Journey, fourteen weekly newsletters, and eight educational webinars released under CC BY 4.0.</p>"
         "<p><b>Community and infrastructure.</b> The Artist Directory; Signal and Club Orange group chats; an outreach list of Bitcoin companies; and referral programs with Bitcoin Way and Unchained Capital.</p>"
         "<p>The board was asked which of these assets should be featured more prominently in donor communications and foundation applications during Q3 and Q4.</p>"),
        ("Grant submissions",
         "<p>Q3 grant applications were reviewed, along with the disbursement timeline and the mechanics of bitcoin payouts. Awards made during the quarter are reported in the Q4 2026 minutes.</p>"),
        ("Midwest Bitcoin Summit",
         "<p>BFTA is producing Bitcoin Arts Park on the Expo Hall floor of the Greater Columbus Convention Center, September 23 and 24, 2026.</p>"
         + ul([
             "<b>Programming.</b> The BFTA Film Cinema with silent disco headphones; a Living Room for Lightning wallet activation and merchandise; a gallery wall with a peer-to-peer Lightning silent auction; secondary-stage performances by Ainsley Costello and other working artists; and a live Dirty Coin presentation with director Alana Mediavilla.",
             "<b>Sponsorship.</b> An eight-tier public sponsorship structure is live. Two additional donor-network proposals ($15,000 and $60,000) are in progress through introductions from Alana Mediavilla. Fundraising target: $80,000 or more.",
             "<b>Operations.</b> Ahmed Klink delivered the booth specification, a 30-foot, three-zone build. A production engineer has been engaged, and stagehand recruitment is under way. Outreach to homeschool groups and Junior Achievement is in progress for the Lindey Magee book reading.",
         ])
         + "<p>The board was asked where it sees the greatest execution risk before load-in on September 22, and what support each director can provide from their network in the next 60 days.</p>"),
        ("Q3 and Q4 strategic focus",
         "<p><b>Track 1: sponsorship and major gifts.</b> Systematic outreach to Bitcoin companies for a sponsorship program around the Bitcoin Conference in Nashville in 2027; growth of the Sovereign Circle from its current four donors; a named sponsor package; cultivation of ten high-capacity individual donors identified for the second half of 2026; and two to three foundation grant applications in Q3 and Q4.</p>"
         "<p><b>Track 2: local art institution partnerships.</b> Offering the eight-webinar CC BY 4.0 curriculum to art schools, community arts organizations, museum education programs, and homeschool cooperatives; 15 to 20 institutional relationships targeted for the second half of 2026; a live workshop format to be prototyped with one or two partners in Q4; priority on underserved urban and rural communities.</p>"
         "<p>The board was asked which directors can commit to warm introductions in either track, and how often the board should review pipeline progress.</p>"),
        ("Governance and operations",
         ul([
             "<b>Multi-signature HODL Vault.</b> Bitcoin remains at Strike for operations. The Executive Director will schedule individual meetings with each director within 30 days to set up the multi-signature cold-storage configuration.",
             "<b>BFTA Global Charter.</b> Version 1 draft in development, including a timeline for forming a European chapter.",
             "<b>Gift Acceptance Policy.</b> Draft in progress, with adoption by resolution expected at the Q4 meeting.",
             "<b>Endowment Management Policy.</b> Alignment work pending adoption of the Charter.",
             "<b>Charity Navigator and Candid.</b> The Charity Navigator Encompass rating requires three or more years of Form 990 filings, which BFTA does not yet have. An Impact and Measurement Beacon submission is in progress, featuring Share Your Bitcoin Journey. The Candid (formerly GuideStar) profile is the primary transparency platform, targeting the Silver seal in Q3 and Gold in Q4.",
         ])),
        ("Programming definition",
         "<p>The Chair proposed formally defining BFTA's programs.</p>"
         + motion("That the Board adopt three programs as the official programmatic framework of Bitcoin For The Arts, Inc.: (1) Share Your Bitcoin Journey, the podcast and editorial series; (2) Bitcoin Education for Artists, the webinar curriculum and workshop delivery; and (3) BFTA Cultural Programming, Bitcoin conference activations and future arts festivals.",
                  vote=C("For / against / abstain"), result=C("Approved / not approved"))),
        ("Open discussion", "<p>" + C("Any items raised by directors, or: No additional items were raised.") + "</p>"),
        ("Action items",
         actions([
             ("Schedule individual multi-signature setup meetings with each director within 30 days.", "Executive Director"),
             ("Prepare the Gift Acceptance Policy for adoption at the Q4 meeting.", "Executive Director"),
             ("Advance the Candid Silver seal (Q3) and Gold seal (Q4).", "Executive Director"),
             ("Warm introductions for sponsorship, major gifts, and institutional partners.", "All directors and advisors"),
         ])),
        ("Adjournment",
         "<p>The meeting was adjourned at 5:44 PM Eastern. The next meeting was proposed for mid-October 2026, and was held on Tuesday, October 6, 2026.</p>"),
    ])
    + sigs([
        ("/s/ Dion Wilson", "Dion Wilson", "Interim Chair &middot; Minutes prepared by"),
        ("", "Approved by the Board", "Date approved:"),
    ], "These minutes record the discussions and decisions of the meeting."),
)

# ---------------------------------------------------------------- Q4, Oct 6 2026
DOCS["q4-2026"] = page(
    "Q4 2026 &middot; Quarterly meeting",
    "Minutes of the Q4 2026 Meeting of the Board of Directors",
    "October 6, 2026",
    meta([
        ("Date", "Tuesday, October 6, 2026"),
        ("Time", "Scheduled 4:30 PM Eastern. Called to order 4:37 PM. Adjourned 5:26 PM."),
        ("Format", "Video conference"),
        ("Presiding", "Dion Wilson, Chair and Executive Director"),
        ("Recorded by", "Dion Wilson, Chair (Secretary absent)"),
        ("Handout", "Q3 2026 category statement, distributed separately and not reproduced in these minutes."),
    ])
    + sections([
        ("Attendance and quorum",
         att([
             ("Directors", "Dion Wilson, Chair and Executive Director<br>Avi Burra, Treasurer<br>Ahmed Klink<br>Kyle Shirkness"),
             ("Advisors", "Julie Costello, Kenneth Burris, Valerie Love, Buttercup Roberts"),
             ("Absent", "Cheryl McGinnis, Secretary<br>Kyle Knight, Advisor<br>Camas Logue, Advisor"),
         ])
         + "<p>Four of five directors were present. Quorum was confirmed.</p>"),
        ("Call to order", "<p>The Chair called the meeting to order at 4:37 PM Eastern.</p>"),
        ("Approval of prior minutes",
         motion("Approve the minutes of the Q3 2026 meeting held July 7, 2026.",
                moved=C("name"), second=C("name"), result=C("Approved / not approved"))),
        ("Financial summary and Midwest results",
         "<p>The Chair presented the quarter of July 1 through September 30, 2026, with the category statement as the handout. The Treasurer was invited to add comments.</p>"
         + fig([
             ("Midwest Bitcoin Summit program, including the print bill received after the quarter closed (excludes grants)", "$24,512.85"),
             ("Operating costs for the quarter: software, insurance, postage, and filings", "$986.55"),
             ("Grants awarded", "$3,900.00"),
             ("Grants paid", "$2,900.00"),
             ("Checking balance, September 30", "$5,260.84"),
             ("Bitcoin held at Strike, September 30", "0.07813010 BTC"),
         ])
         + ul([
             "The dollar value of the bitcoin balance was quoted at the price on the day of the meeting.",
             "Raffle cash of $145 is in hand and will be used to buy bitcoin into the organization's Strike account. The purchase is not yet reflected in the balance above.",
             "A contracting bill from Fern Exposition Services and the venue, estimated at about $5,000, was expected and is not included in these totals.",
         ])),
        ("Grant awards",
         "<p>The board reviewed three funded projects, totaling $3,900. Of that, $2,900 has been paid.</p>"
         + ul([
             "<b>Ainsley Costello. $2,500. Paid.</b> A Nashville musician who opened Bitcoin Arts Park at the Midwest Bitcoin Summit, performed with her band, and sat on the culture panel. The grant covered the cost of appearing: the band, food, and lodging. Funded because she is building Bitcoin into a working music career, in public.",
             "<b>Aksana Zasinets (5Ksana). $400. Paid.</b> Embroidery for Freedom. She has made Bitcoin-themed physical art by hand since 2017. The grant supports that work, and a finished embroidered piece comes to Bitcoin For The Arts. Funded because the craft is real, it takes time, and it reaches a U.S. audience.",
             "<b>Christopher Arcella. $1,000. Approved, not yet paid.</b> The Bitcoin Executor, a narrative feature film in late post-production. The award supports the theatrical plan, marketing, and ticketing that can settle in bitcoin. Bitcoin For The Arts will be credited in the end titles. Payment follows the signed grant agreement.",
         ])),
        ("Programming that generates funding",
         "<p>The Chair framed the discussion: Midwest showed what the money does, and the grants are the mission. The question for the board is what BFTA runs next that a donor can see and support. Three programs were presented:</p>"
         + ul([
             "<b>Grants.</b> Three named projects, a reason for each, and a public record of what the money did.",
             "<b>Artist education webinars.</b> The lessons are on the website with a signup. A live date has not been set.",
             "<b>An event in Nashville.</b> A program in the same week as the Bitcoin Conference, with a place and a date for donors to fund.",
         ])
         + "<p>Questions put to the board: which single program to ask for between now and January; who can introduce a donor, foundation, or partner before the next meeting; and whether the public ask should be tied to the grants, the webinars, or Nashville.</p>"
         + "<p>" + C("Board discussion and any decision") + "</p>"),
        ("Nashville",
         "<p>The Chair informed the board that BFTA is exploring an event coinciding with the Bitcoin Conference in Nashville, July 15 to 17, 2027, at Music City Center. Julie Costello described the coordination under way. A meeting with a Nashville venue is still being arranged. Nothing has been booked, and the board was not asked to approve a venue.</p>"
         + motion("Whether to continue pursuing the venue meeting.", result=C("Yes / no / discuss further"), label="Board direction")),
        ("Multi-signature wallet",
         "<p>The Chair stated that organizational bitcoin should move into multi-signature custody, and that he will schedule an individual setup meeting with each of the other four directors. No key setup took place during the meeting.</p>"),
        ("Open discussion", "<p>" + C("Any items raised by directors, or: No additional items were raised.") + "</p>"),
        ("Action items",
         actions([
             ("Schedule individual multi-signature setup meetings with Avi Burra, Cheryl McGinnis, Ahmed Klink, and Kyle Shirkness.", "Chair"),
             ("Purchase $145 of bitcoin from raffle proceeds into the organization's Strike account.", "Chair / Treasurer"),
             ("Pay Christopher Arcella's $1,000 grant according to the signed agreement.", "Chair / Treasurer"),
             ("Continue arranging the Nashville venue meeting.", "Julie Costello"),
             ("Introduce at least one donor, foundation, or partner before the next meeting.", "All directors and advisors"),
         ])),
        ("Next meeting and adjournment",
         "<p><b>Next meeting:</b> " + C("date, Q1 2027") + ". The meeting was adjourned at 5:26 PM Eastern.</p>"),
    ])
    + sigs([
        ("/s/ Dion Wilson", "Dion Wilson", "Chair and Executive Director &middot; Minutes prepared by"),
        ("", "Approved by the Board", "Date approved:"),
    ], "These minutes record the discussions and decisions of the meeting."),
)

if __name__ == "__main__":
    for name, html in DOCS.items():
        (HERE / f"minutes-{name}.html").write_text(html)
        print("wrote", name)
