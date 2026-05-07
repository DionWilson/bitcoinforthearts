# Sponsor Sheet — Art + Zap Weekend (Sept 2026, Pubkey DC)

Three formats of the same sponsor sheet. Pick whichever is fastest for the moment.

## Files

| File | When to use it |
| --- | --- |
| **`sept-2026-pubkey-dc-benefit.pdf`** | **The file to attach to outreach emails.** Pre-rendered, 3 pages, Letter size. This is what Ben (and any other volunteer) sends prospects. Click the file in GitHub → "Download raw file". |
| **`sept-2026-pubkey-dc-benefit.md`** | Paste body of an email, paste into a Google Doc, copy/paste tier blocks into a DM. Plain Markdown — survives any client. |
| **`sept-2026-pubkey-dc-benefit.html`** | The *source* the PDF is generated from. You only need this if you're regenerating the PDF (see below). Don't attach the HTML to emails — only the PDF. |

## Authoring rules (until the September event details are locked)

- **No firm date.** Always say "September 2026" — never Sept 14 or Sept 28 publicly until the date is locked with Pubkey DC.
- **No firm performer list.** "21 featured artists across music, dance, theater, visual art, film, writing, and storytelling" is the ceiling for the **livestream** — do not list specific names. The in-person Pubkey night is described as "live performance + silent art auction + Broadway-caliber headliner" with no specific names.
- **No Geyser link.** The Geyser fund stays on a separate track until Pubkey DC is confirmed and we can promise specific deliverables to backers. Do not reference Geyser on the sponsor sheet.
- **Tier dollar amounts are stable.** $25K Title (1 slot), $10K Supporting (3 slots), $5K Friend (5 slots). These match what's on `/art-zap-weekend` and the BFTA budget model — keep them in sync if anything changes.
- **The event has TWO halves.** Always describe both: (1) a 21-artist livestream and (2) one in-person night at Pubkey DC. Don't conflate them.
- **Single source of truth = `app/art-zap-weekend/page.tsx`.** If you change a tier deliverable on the website, update the markdown + HTML here and re-render the PDF.

## Regenerating the PDF (after edits)

If you edit `sept-2026-pubkey-dc-benefit.html` (e.g. to update tier copy after Pubkey locks the date), regenerate the PDF with one of:

**Option 1 — headless Chrome (most reliable):**

```bash
google-chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=docs/sponsor-sheet/sept-2026-pubkey-dc-benefit.pdf \
  "file://$(pwd)/docs/sponsor-sheet/sept-2026-pubkey-dc-benefit.html"
```

**Option 2 — your own browser:**

1. Open `docs/sponsor-sheet/sept-2026-pubkey-dc-benefit.html` in Chrome or Safari.
2. File ▸ Print ▸ Save as PDF.
3. Letter size, default margins, "Headers and footers" OFF, "Background graphics" ON.
4. Save into `docs/sponsor-sheet/` overwriting the old PDF, then commit.

## Replacing the old public/ PDF on the website

The old `public/Bitcoin-For-The-Arts-Art-Zap-Weekend-One-Pager.pdf` is stale. The "Download one-pager" button on `/art-zap-weekend` has been replaced with a "Request the sponsor sheet" mailto button. When the event details are locked, copy the regenerated PDF into `public/` and re-add the download button on the page.
