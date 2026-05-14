# 2026 Year-End Goal — One-Pager

Single-page document that answers the question Bruce asked Dion on May 14, 2026: *"What would a successful year at the end of 2026 look like for BFTA?"* Designed so any sponsor or donor can hand it to a peer, a foundation officer, or a curious philanthropist and walk away with a clear picture of what the year is trying to accomplish, what the funding model looks like, and how their gift converts into artists funded.

## Files

| File | When to use |
| --- | --- |
| **`year-end-2026-goal.pdf`** | **The file to attach to emails.** Pre-rendered, 1 page, Letter size, BFTA-branded with the lockup at the masthead. This is what gets attached to outreach. |
| `year-end-2026-goal.md` | For pasting the same content into an email body or a Google Doc when an attached PDF feels too formal for the channel. |
| `year-end-2026-goal.html` | Source for the PDF. Self-contained — the BFTA logo is base64-embedded so the file has no external dependencies and can be opened in any browser to re-render. |

## Public URL after merge + deploy

This doc lives in `docs/` and is **not deployed to the public website** by default — it's a sponsor / advisor / board-prospect handout, not a public commitment to specific dollar numbers. If we ever want it served on the public site (e.g. at `bitcoinforthearts.org/2026-goal`), that's a separate decision and a separate PR.

For now, the way to share it is:

- Attach the PDF to outreach emails (preferred)
- Or: paste the Markdown version into an email body
- Or: send a GitHub raw URL to the PDF (works for trusted recipients but not for cold outreach)

## How to regenerate

If the numbers change, the funding allocation shifts, or the headline goal evolves:

1. Edit `year-end-2026-goal.html`. Numbers live in the `<table class="scenarios">` block and the headline `<div class="headline-card">`. The 55/30/10/5 percentages are hardcoded in the row labels.
2. Re-render the PDF from the HTML:

```bash
google-chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=docs/year-end-2026-goal/year-end-2026-goal.pdf \
  "file://$(pwd)/docs/year-end-2026-goal/year-end-2026-goal.html"
```

3. Update the Markdown version (`year-end-2026-goal.md`) so the two stay in sync.
4. Commit all three files together.

## The math underlying the numbers

The numbers are derived from the BFTA allocation framework (55/30/10/5):

```
Floor scenario:
  50 artists × $1,000 average grant size      = $50,000 to direct grants (55% of total)
  Total raise = $50,000 / 0.55                 = $91,000
    of which: $50,000  artist grants  (55%)
              $27,300  programs       (30%)
              $9,100   operations     (10%)
              $4,550   HODL Vault     (5%)

Stretch scenario:
  50 artists × $2,000 average grant size      = $100,000 to direct grants (55% of total)
  Total raise = $100,000 / 0.55                = $182,000
    of which: $100,000 artist grants  (55%)
              $54,600  programs       (30%)
              $18,200  operations     (10%)
              $9,100   HODL Vault     (5%)
```

If either the headline artist count (currently 50) or the average grant range changes, recompute and update both the HTML and Markdown versions.

## Why two scenarios instead of one

Single-number fundraising goals look like wishes. Two-scenario goals look like operating plans. Showing donors both a floor and a stretch signals real budget discipline — there's a math-backed plan at both levels of giving, and the percentage allocation framework holds at both. Sophisticated donors find this more credible than a single hopeful number.

## Maintenance notes

- Don't post this publicly until BFTA is confident in hitting at least the floor scenario. Public commitments to specific dollar numbers create accountability that's hard to walk back.
- Update annually (next version: `year-end-2027-goal.html` etc.).
- If/when actual progress diverges meaningfully from these targets, update the doc rather than letting it become a lie. Donors track the gap between commitments and reality.
