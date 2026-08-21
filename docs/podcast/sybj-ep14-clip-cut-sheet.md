# SYBJ Episode 14 — CapCut edit bible + clip cut sheet

**Episode:** Share Your Bitcoin Journey · Episode 14  
**Guest:** MadMunky2140 (confirm spelling on camera / lower-third)  
**Goal:** Master cut for YouTube longform + Shorts + landscape social + Nostr-safe clips

This file is the **editing script**. Fill the TIMecode column in CapCut as you scrub. If you paste a transcript with timestamps later, we can lock exact in/out points.

---

## Recommended workflow (your CapCut idea, tightened)

Do this in order. Do not export 30 clips from the raw camera file.

### Pass 1 — Master cleanup (one timeline)

1. **Hard cut the pre-talk.** Start the master at the first clean frame of your standard intro (“Welcome to another episode of Share Your Bitcoin Journey…”). Everything before that goes to a “B-roll / scrap” bin, not the public cut.
2. **Light cleanup only on the master:** remove long dead air, “um” stacks that kill pace, and any false starts. Do not over-edit the conversation.
3. **Brand once on the master, not on every clip:**
   - Subtle grade / film look (what you called the filter) on the whole timeline
   - BFTA logo lower-third or corner bug (small, consistent, never covering faces)
   - Optional: episode title card 3-5 seconds after intro line
4. **Export MASTER once:**
   - 1080p (or 1440p if you shot higher), H.264, ~8-12 Mbps
   - This is the YouTube longform upload source

### Pass 2 — Pull clips FROM the master

Duplicate the master project or nest it. Mark clips with CapCut markers using the cut sheet below. Export each marker range as its own file.

### Pass 3 — Aspect + platform exports

For each approved clip, export **two aspect ratios** from the same edit:

| Version | Ratio | Use |
| --- | --- | --- |
| Portrait | 9:16 | YouTube Shorts, IG Reels, TikTok, Facebook Reels |
| Landscape | 16:9 | X, LinkedIn, Facebook feed, YouTube community, Substack embed |

Reframe portrait carefully: keep both faces / key speaker in frame. Prefer slight punch-in over wild keyframes.

### Pass 4 — Nostr-safe encodes (under 100 MB)

Nostr clients often fail uploads over ~100 MB. That is **file size**, driven by duration × resolution × bitrate.

**Safe Nostr recipe (use this for every Nostr upload):**

- Max length: prefer **under 60s**; if longer, keep under **2:00**
- Resolution: **720p** (1280×720 landscape or 720×1280 portrait), not 1080p
- Codec: H.264, AAC audio
- Bitrate video: **1.5-2.5 Mbps** (CapCut “Recommended” is often too fat)
- Target file size: **under 40-60 MB** so you have headroom
- If CapCut will not hit size: export 720p, then compress once in HandBrake (`Very Fast 720p30`, RF 28-30)

Do **not** upload the 1080p social master to Nostr. Keep a separate `nostr/` export folder.

---

## Master open (edit note)

**IN:** First frame of Dion’s formal intro  
**OUT:** End of episode / standard close + CTA  

Discard: zoom small talk, mic checks, “are we rolling,” wardrobe notes, anything before the intro.

Suggested YouTube title pattern:  
`Share Your Bitcoin Journey: Episode 14 – MadMunky2140: [short hook from best answer]`

---

## A) SHORTS / REELS — 10+ clips under 60 seconds

Export each as **9:16** and **16:9**. Keep each under 0:55 so platforms do not truncate captions weirdly.

Fill timecodes while scrubbing:

| # | Working title | What to pull | Target length | TC IN | TC OUT | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| S01 | Who is MadMunky | Guest says name / craft in one breath | 20-35s | | | Cold open possible: jump cut intro |
| S02 | Woodworker hook | Best line about making with hands / wood | 25-45s | | | Visual: if tool talk, keep hands in frame |
| S03 | Why 2140 | Meaning of 2140 / Bitcoin identity | 25-45s | | | Strong Bitcoin culture clip |
| S04 | Privacy click | Cleanest privacy conviction line | 25-50s | | | Avoid jargon pileups |
| S05 | Nostr moment | First Nostr / why it matters for artists | 30-55s | | | Tag Nostr audience |
| S06 | Fiat pain | Money / pay / industry friction for makers | 30-55s | | | Mission alignment |
| S07 | Bitcoin turn | “Something snapped” / why Bitcoin stuck | 30-55s | | | Core show DNA |
| S08 | Artist sovereignty | Working free / uncensorable creativity | 30-55s | | | BFTA thesis |
| S09 | Practical tip | One concrete tip (wallet, sats, custody) | 35-55s | | | Saveable |
| S10 | Micro-grant answer | Closing grant question highlight | 35-55s | | | Always a strong short |
| S11 | Dion bridge | Your best 1-2 sentence bridge tying guest to BFTA | 20-40s | | | Brand clip |
| S12 | Hot quote | Single best quotable sentence + 5s pad | 15-30s | | | Text-on-screen candidate |

**Short caption pattern (all platforms):**  
`[Hook line from clip]` + `Full episode: [YouTube link]` + `#ShareYourBitcoinJourney #BitcoinForTheArts #Bitcoin`

---

## B) MID / LONG SOCIAL — 7-8 clips (~1:45-1:59 or ~2:45-3:00)

Use these for LinkedIn, Facebook, X (when it allows), Substack video, IG carousel cover + link in bio.

Prefer **1:45-1:59** for X/LinkedIn attention. Use **~3:00** only for LinkedIn / Facebook / Substack when the story needs room.

| # | Working title | Structure | Target | TC IN | TC OUT |
| --- | --- | --- | --- | --- | --- |
| M01 | Origin story | Childhood / craft start → first identity as maker | 1:50 or 2:50 | | |
| M02 | From wood to Bitcoin | Craft values → sound money parallel | 1:50 | | |
| M03 | Privacy deep cut | Why privacy is not paranoia for a working artist | 1:50 or 2:45 | | |
| M04 | Nostr for creators | Discovery, zaps, audience without the algorithm leash | 1:50 | | |
| M05 | Making a living | How money actually moves in his creative life | 1:50 or 3:00 | | |
| M06 | Midwest / BFTA bridge | If mentioned: conference, arts park, why this room | 1:45 | | |
| M07 | Advice to artists | “If you think Bitcoin is only tech…” answer | 1:50 | | |
| M08 | Full closing arc | Last 2-3 questions including micro-grant | 2:00-3:00 | | |

---

## C) Platform export matrix

| Destination | Aspect | Max length | Encode | Folder name |
| --- | --- | --- | --- | --- |
| YouTube longform | 16:9 | full episode | 1080p master | `yt-long/` |
| YouTube Shorts | 9:16 | under 60s | 1080p ok | `yt-shorts/` |
| IG / FB Reels | 9:16 | under 60s | 1080p ok | `reels/` |
| X | 16:9 (also 9:16 if you want) | under 2:20 safe | 720p-1080p | `x/` |
| LinkedIn | 16:9 | 1:50-3:00 | 1080p | `linkedin/` |
| Facebook feed | 16:9 | 1:50-3:00 | 1080p | `facebook/` |
| Nostr | 16:9 or 9:16 | under 60s preferred | **720p, under 100MB** | `nostr/` |
| Substack | 16:9 | 1:50-3:00 | 1080p or 720p | `substack/` |

---

## On-screen text / end cards (keep consistent)

Every short:

1. Hook text in first 2 seconds (5-8 words max)
2. `MadMunky2140 · SYBJ Ep 14` small lower label
3. End card 2 seconds: `Full episode on YouTube` + BFTA wordmark

Do not put giant logo over the whole frame. Corner bug + end card is enough.

---

## File naming

```
SYBJ14_S01_who-is-madmunky_9x16.mp4
SYBJ14_S01_who-is-madmunky_16x9.mp4
SYBJ14_S01_who-is-madmunky_nostr720.mp4
SYBJ14_M03_privacy_16x9.mp4
```

---

## Verdict on your CapCut plan

**Yes: pre-edit the master in CapCut** (cut pre-talk, grade, BFTA logo), then pull clips from that master.

**Do not:** brand and grade differently on every short (you will waste hours and drift).

**Do:** make a dedicated Nostr export preset at 720p so you never fight the 100 MB wall at upload time.

---

## What I need from you to lock exact cuts

Any one of these and I can turn this into a finished timestamp script:

1. Rough transcript with timestamps, or  
2. CapCut marker list / chapter notes after your first scrub, or  
3. Drop the master (or audio) into the project and ask for a cut list

Until then, use the tables above as your scrub checklist and fill TC IN / TC OUT as you go.
