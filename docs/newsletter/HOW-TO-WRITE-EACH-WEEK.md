# How to write the BFTA newsletter each week

**You should not need to write any code.** This guide walks you through changing
the content each Monday using Beehiiv's normal visual editor.

## One-time setup (do this once, never again)

1. Make sure the template designed by Ahmed is **saved as a Beehiiv Template**
   in your Beehiiv account. If it isn't, ask Ahmed to do this — it's a single
   "Save as template" button in his Beehiiv account, takes 30 seconds. He may
   already have done it; check your Beehiiv "Templates" tab.
2. Confirm the template name. Probably something like "BFTA Issue Template."
   Whatever it's called, that's the name you'll click each week.

If for any reason the template gets lost in Beehiiv, the full HTML backup lives
at `docs/newsletter/beehiiv-template.html` in this repo. Copy-paste it into a
new Beehiiv post in HTML mode and re-save as a template.

## Weekly workflow (every Monday morning)

1. Sign in to Beehiiv → click **New Post**
2. Click **Use Template** → pick the BFTA Issue Template
3. The template loads with all the colors, fonts, and layout already set
4. **Now just edit the visible text and images, like a Google Doc.** Click any
   block and type. Click any image and use "Replace image."
5. When you're done, click **Schedule** → set it for Monday at 11 AM
6. Walk away. Beehiiv sends it on the schedule.

You should never have to touch the underlying HTML again unless something breaks.

## The 9 sections you'll change each week

Here's what's in the template, in the order it appears, and what content goes
in each section. Bracketed `[items]` in the template are placeholders — replace
those with real content each week.

### 1. Header bar (very top, black background)
- **Issue number** — bump by 1 each week (e.g. Issue #5 → Issue #6)
- **Block height** — paste the current Bitcoin block height (look it up at
  [mempool.space](https://mempool.space) — the big number on the front page)
- **Date** — the Monday this issue is sending

### 2. Hero image (orange block, BFTA lockup)
- This is the BFTA lockup on an orange background. **Don't change it.** It's
  the brand visual that ties every issue together.
- (If for some reason you ever need to swap it: the file is at
  `https://bitcoinforthearts.org/brand-kit/main-lockups/main-orange.png`)

### 3. Issue Headline (large black text under hero)
- One short, punchy headline that tells the reader what this issue is about.
- All caps in the template — Beehiiv handles that automatically.
- Examples: "FUNDING THE NEXT RENAISSANCE" — "WHEN BITCOIN MEETS THE BRUSH" —
  "ART + ZAP WEEKEND IS HERE"

### 4. From the Editor (your personal note)
- 2–3 sentences in your voice. What you've been thinking about, what's
  happening at BFTA right now, why this issue matters.
- Don't overthink it. This is the section that makes readers feel they know
  the org behind the brand.

### 5. Featured Grant
- One artist or project you're highlighting that week.
- Fields: artist name, discipline, location, grant amount in sats.
- Then 2 paragraphs: who they are + what this grant unlocks for them.
- Then a "Read the Story →" button — link to the full story on
  bitcoinforthearts.org/stories/[their-slug]

### 6. Across the Disciplines (the four colored tiles)
- Four colored tiles for Music, Theater, Film, Dance.
- Each tile links to a page on the BFTA site (e.g.,
  bitcoinforthearts.org/stories filtered by discipline, or a specific
  featured story).
- These can stay the same most weeks. Only change them if you want to
  highlight different content.

### 7. Field Notes (numbered links)
- 4 quick links to interesting things from the week — articles, news,
  artist work, anything BFTA's audience would care about.
- Each one: short headline + one-sentence summary of why it matters.
- Think of this as your "things worth reading this week" list.

### 8. Upcoming (lime green block)
- One event you want readers to RSVP for. Right now this is the September
  PubKey DC benefit.
- Fields: event name, date range, venue/city, one-paragraph description,
  RSVP link.

### 9. By the Numbers (3 stats)
- Three running totals: Artists Funded, Sats Granted, Cities Reached.
- Update each Monday with current numbers.

### 10. Sign-off
- "Until next issue — keep building, keep making."
- Your name + title.
- Don't change much here unless someone else is writing the issue that week.

### 11. Patronage is Contagious (footer CTA)
- Subscribe button at the bottom. Don't change this.

## The 4 BFTA brand colors (in case you ever need them)

If you're ever pasting from elsewhere or asked about the colors:

| Color | Hex | Where it's used |
|---|---|---|
| Cream | `#FFFAF0` | Page background |
| Black | `#000000` | Type, header bar, structural blocks |
| Orange | `#FF4F14` | Accent, hero block, CTAs |
| Lime | `#B3FF48` | Highlights, "Upcoming" block, Subscribe button |

These match the website's brand palette, so the email looks like it came
from BFTA at a glance.

## Where the brand assets live

If you ever need to add an image and aren't sure which BFTA asset to use:
- Main lockups (the full "BITCOIN FOR THE ARTS" wrap):
  https://bitcoinforthearts.org/brand-kit/main-lockups/
- Square BFTA bug logos: https://bitcoinforthearts.org/brand-kit/square-bugs/
- Inline BFTA bug logos: https://bitcoinforthearts.org/brand-kit/inline-bugs/

Browse those folders in a web browser to pick the variant you want, then
right-click → "Copy image address" and paste into Beehiiv's "Replace image"
dialog.

## When something breaks

If the template ever stops working in Beehiiv (Beehiiv updates their editor,
the template gets deleted, etc.):

1. Go to `docs/newsletter/beehiiv-template.html` in this repo
2. Open it in any text editor (TextEdit, Notes, even GitHub's web view)
3. Copy the entire contents
4. In Beehiiv, create a new post → switch to **HTML mode** (not visual mode)
5. Paste the contents → save as template
6. You're back in business.

If Beehiiv doesn't have a clear HTML mode, ask Ahmed for help — he built it,
he'll know how to recover it.

## The honest reality of weekly newsletters

Don't write each issue from scratch. Most successful newsletters reuse a
strong week's structure and only swap out the content. Once you've sent
3–4 issues you'll have a rhythm and a 30-minute weekly task, not a
4-hour weekly task.

If you find yourself spending more than 90 minutes on a Monday morning
producing the newsletter, something's gone wrong with the workflow —
either the template needs simplifying, you're trying to fit too much into
one issue, or you should be writing it Sunday night with a fresh head and
just hitting "send" Monday morning.
