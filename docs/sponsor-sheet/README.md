# Sponsor Sheet — Art + Zap Weekend (Sept 2026, Pubkey DC)

Two formats of the same sponsor sheet. Pick whichever is fastest for the moment.

## Files

| File | When to use it |
| --- | --- |
| **`sept-2026-pubkey-dc-benefit.md`** | Paste body of an email, paste into a Google Doc, copy/paste tier blocks into a DM. Plain Markdown — survives any client. |
| **`sept-2026-pubkey-dc-benefit.html`** | The pretty version. Open in any browser → File ▸ Print ▸ "Save as PDF" (Letter, default margins, no headers/footers). That PDF is the new one-pager you can attach to outreach emails. |

## Authoring rules (until the September event details are locked)

- **No firm date.** Always say "September 2026" — never Sept 14 or Sept 28 publicly until the date is locked with Pubkey DC.
- **No firm performer list.** "21 featured artists across music, dance, theater, visual art, film, writing, and storytelling" is the ceiling — do not list specific names.
- **No Geyser link.** The Geyser fund stays on a separate track until Pubkey DC is confirmed and we can promise specific deliverables to backers. Do not reference Geyser on the sponsor sheet.
- **Tier dollar amounts are stable.** $25K Title (1 slot), $10K Supporting (3 slots), $5K Friend (5 slots). These match what's on `/art-zap-weekend` and the BFTA budget model — keep them in sync if anything changes.
- **Single source of truth = `app/art-zap-weekend/page.tsx`.** If you change a tier deliverable on the website, update the sheet here too.

## Replacing the old PDF on the website

The old `public/Bitcoin-For-The-Arts-Art-Zap-Weekend-One-Pager.pdf` is stale. The "Download one-pager" button on `/art-zap-weekend` has been replaced with a "Request the sponsor sheet" mailto button. When the event details are locked, regenerate the PDF from `sept-2026-pubkey-dc-benefit.html`, drop it in `public/`, and re-add the download button on the page.
