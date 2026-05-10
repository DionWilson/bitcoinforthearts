# BFTA Research Portal — Plan

**Status:** approved, in-progress
**Owner:** Bitcoin for the Arts Research (institutional byline)
**Locked:** 2026-05-10

## Goal

Elevate `/artists/research` from a flat 261-line summary page into a full research portal at `/research` that signals institutional credibility — modeled on the American Cancer Society's Cancer Facts & Figures, Brookings policy briefs, and Pew Research's data-driven reports. The end state is BFTA being quotable as a primary source by journalists, foundation program officers, and policy researchers writing about arts funding.

## Architecture

### URLs

```
/research                              NEW PORTAL — index of all BFTA research
├── /research/state-of-arts-funding-2026   Flagship annual report (top priority)
├── /research/the-arpa-cliff               Deep-dive #1 (mirrors published Substack version)
├── /research/sound-money-for-the-arts     Deep-dive #2 (Bitcoin economics for artists)
├── /research/methodology                  How BFTA collects + cites data
└── /research/glossary                     Key terms defined

/artists/research                      DEPRECATED — 308 redirect to /research
```

### Navigation (Phase 0 prerequisite)

Restructure the top nav so research is first-class and artists-related pages are grouped:

**Current:** Home / About / Artists / Grants / Get Involved / Stories / Donate

**New:** Home / About / **Artists ▾** / **Research** / Grants / Get Involved / Donate

The `Artists ▾` dropdown contains:
- Stories
- Artist Hub
- Why Bitcoin
- Share Your Story (existing `/stories/share-your-story`)

`Research` is its own top-level — research speaks to donors, journalists, funders, and researchers, not just artists.

## Reports — V1 scope (3 reports)

### 1. The State of Arts Funding 2026 — flagship annual

Anchor document. Updated annually (becomes "2027" next year). Iterative — v1 ships credible, then v1.1 / v1.2 / v1.3 polish until the structure is the template for all future years. ~6-8 sections:

1. Executive summary — 1 page, 4 hero stats, charts
2. The funding landscape today — federal, state, local, private (charts)
3. The collapse: 2024-2026 timeline of cuts, ARPA cliff, NEA targeting (timeline visual)
4. Who gets hurt: artist demographics, geographic distribution (maps/data)
5. The market response: foundation giving trends, individual donor trends (charts)
6. The case for non-state-dependent funding (BFTA's thesis as analytical conclusion, not pitch)
7. References + methodology
8. Downloadable PDF version

### 2. The ARPA Cliff — deep-dive #1

The most newsworthy, most quotable, most aligned with BFTA's "non-state-dependent funding" thesis. Mirrors the published Substack version with more rigorous citations + state-by-state data tables.

The published Substack version stays where it is as the editorial framing. The on-site research version is the canonical document that journalists cite. ~3000 words, charted, footnoted.

### 3. Sound Money for the Arts — deep-dive #2

BFTA's intellectually distinctive contribution. Why fiat debasement hits working artists harder than any other profession (gig income, no equity, can't time markets). Why Bitcoin endowments solve a structural problem traditional endowments can't.

~2500 words. Charts: debasement, purchasing power of an arts grant over time, Bitcoin endowment durability vs. fiat endowment.

Earns respect from both Bitcoin economic readers AND arts policy readers — nobody else is writing this with rigor.

## Visual treatment

Match ACS / Brookings seriousness, inflect with BFTA brand:

- **Body:** black on cream, generous line-height, typography-driven
- **Hero stats:** giant numbers in black with one orange accent
- **Charts:** black + orange + lime palette over cream backgrounds; grayscale for supporting data
- **Pull quotes:** cream blockquote with thick orange left border
- **Callouts:** "Why this matters" boxes with light cream tint + orange accent stripe
- **Footnotes:** numbered superscripts, sources block at bottom
- **Section navigation:** sticky right-rail TOC for long reports
- **Print stylesheet:** clean PDF generation via the same headless-Chrome workflow used for the sponsor sheet

## Technical approach

| Decision | Choice | Why |
| --- | --- | --- |
| Charting library | `recharts` (~50KB gzipped) | React-native, declarative, lightweight, looks good with Tailwind. Used by NYT, Spotify. Strict no to d3 directly — too heavy. |
| Data layer | JSON files in `data/research/` with TypeScript types | Versioned source data; charts pull from these; editable without touching React |
| Content authoring | TSX components per report (NOT MDX) | MDX would feel cleaner but introduces tooling complexity. TSX with structured content blocks gets us 95% there with no new deps. Revisit MDX in v3. |
| Citations | `<Cite n={1} />` + `<SourcesBlock />` components | Numbered footnote system, sources co-located with text |
| Print/PDF | `@media print` CSS + headless-Chrome PDF generation | Same workflow as sponsor sheet PDF; each report exports as a downloadable PDF |
| Section navigation | Sticky TOC component built once, reused per report | One component, all reports get it free |
| Shared report layout | `ResearchReportShell` component | Hero, sections, TOC, citations footer all in one wrapper; each report becomes a thin TSX file |

## Bylines

**Always institutional: "Bitcoin for the Arts Research"**

Quoted in articles, this becomes *"according to research from Bitcoin for the Arts"* — exactly the institutional tone we want. No personal bylines on any report.

## Phased delivery

| Phase | Scope | PR count |
| --- | --- | --- |
| **Phase 0** | Nav restructure (Artists ▾ dropdown + Research top-level) | 1 |
| **Phase 1** | `/research` portal index + `ResearchReportShell` + TOC + footnote/citation components + recharts wired up + `data/research/` scaffolding + 308 redirect from `/artists/research` | 1 |
| **Phase 2** | "The State of Arts Funding 2026" full report (with iteration: v1 → v1.1 → v1.2) | 1+ |
| **Phase 3** | "The ARPA Cliff" deep-dive (synthesized from published Substack) | 1 |
| **Phase 4** | "Sound Money for the Arts" deep-dive | 1 |
| **Phase 5** | Methodology + Glossary pages | 1 |

Each phase ships independently. Production stays good throughout.

## Source material already in the codebase

Existing material to draw from when writing reports:

- `docs/substack-strategy/drafts/the-blueprint-david-simon-left-behind.md` — has cited stats: NEA elimination in 2 federal budgets, San Diego cutting arts 86% in one cycle, 7.7% state appropriations drop FY2026, the Baltimore School for the Arts foundation model
- `docs/substack-strategy/02-content-pillars-and-angles.md` — editorial framework
- `docs/conferences/vegas-2026/pitch-kit/01-bfta-impact-sheet.md` — pitch-side stats
- The published "The ARPA Cliff" Substack article — to be mirrored on-site as Phase 3

External primary sources to cite consistently:

- BEA (Bureau of Economic Analysis) — Arts and Cultural Production Satellite Account
- NEA (National Endowment for the Arts) — Research & Analysis publications
- Americans for the Arts — annual surveys
- National Assembly of State Arts Agencies — state-level data
- Foundation Center / Candid — foundation giving trends
- Boston Art Review — case study source for the ARPA Cliff piece

## Out of scope for v1 (future report ideas)

These are great future reports but not in the v1 list:

- "Patronage History — From the Renaissance to Bitcoin"
- "The Multiplier Effect: How Arts Spending Builds Local Economies"
- "State-by-State Interactive Map of Arts Funding"
- "The Working Artist Economy 1970-2026: Real Earnings Decay"
- "From Grants to HODL: The Case for Bitcoin Endowments in Arts Philanthropy"

Add as topics warrant. Each becomes its own Phase N+1 PR.

## Success criteria

V1 is successful when:

1. A journalist writing about arts funding cuts can cite "Bitcoin for the Arts Research" as a primary source for ARPA cliff data without losing credibility
2. A foundation program officer evaluating BFTA for a grant can read the State of Arts Funding 2026 report and verify our analytical rigor
3. A donor on the fence sees the research portal and infers "this organization is more serious than the average Bitcoin nonprofit"
4. The reports are visually indistinguishable from a Brookings / Pew brief at first glance — same typography density, same footnote rigor, same chart quality

V2 (next year): annual cycle is in place, "State of Arts Funding 2027" is a clone-and-update operation, and the portal has 5-6 reports with measurable inbound citation traffic.

## Notes for future Cloud Agents picking up this work

- The plan is locked as of 2026-05-10. URL structure, nav restructure, and the 3 v1 reports are decided. Don't re-litigate these decisions; if changes are needed, propose them as amendments to this doc, not as silent refactors.
- The author byline is **always** "Bitcoin for the Arts Research." Never personal names on reports.
- The visual style is **serious + dignified** (ACS / Brookings) with BFTA palette accents. Don't decorate. Typography over visual flourishes.
- All claims need citations. Footnote everything. If a stat doesn't have a primary source, leave it out or call it out as an estimate with explicit methodology.
- The `data/research/` JSON files are the source of truth for chart data. Charts should never have hardcoded numbers in the TSX.
- When writing report content, prefer dense factual sentences over sweeping claims. The reader is a journalist, foundation officer, or critical donor — not a Twitter audience.
