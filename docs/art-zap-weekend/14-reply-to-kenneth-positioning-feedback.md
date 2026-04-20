# Reply to Kenneth — Positioning / "Direct vs Mediated" Language Feedback

For replying to Kenneth's email about the alignment gap between presenting this as "Bitcoin-native, direct-to-artist" and the structural reality of the donation flow (BFTA → grants, with optional artist tipping as the only real-time direct flow).

Kenneth's point is substantive and correct. The Bitcoin-Nostr value-for-value (v4v) culture is uniquely intolerant of mediation, so leaning on "direct" or "Bitcoin-native" framing without owning the actual structure risks a credibility hit with the audience that matters most.

---

## EMAIL

**To:** Kenneth [@board-email]
**Subject:** Re: Positioning — yes, you caught a real gap. Proposed language fix attached.
**(Reply privately first to align on the language, then update docs and surface the change to the rest of the board.)**

---

Kenneth,

You caught a real gap. Thank you for raising this carefully — it's exactly the kind of detail that matters in a Bitcoin context where the v4v ethos is uniquely intolerant of mediation. A sophisticated Bitcoiner who reads "Bitcoin-native, direct-to-artist" and shows up expecting direct patronage will absolutely notice that the QR is BFTA's. Even if the underlying model is sound (and it is), the framing mismatch is its own credibility risk. Owning what we actually are protects trust.

Adopting your suggestion. Specifically, here's the language tightening I want to push through every artifact this week. Tell me where you'd push back or sharpen further.

**Current loose framing (in current docs):**

> "Art + Zap Weekend is the first global, Bitcoin-native arts fundraiser..."
> "All audience zaps default to BFTA's mission..."

**Tightened framing (proposed):**

> **"Art + Zap Weekend is a Bitcoin-funded fundraiser for Bitcoin For The Arts, our 501(c)(3) that funds artists nationwide through quarterly micro-grants. Audience donations route to BFTA and flow through our public 55/30/10/5 allocation. Featured artists also receive 100% of any optional direct tips sent to their personal Lightning addresses during their broadcast segments."**

Three deliberate moves in that wording:

1. **"Bitcoin-funded fundraiser for BFTA"** instead of "Bitcoin-native direct-to-artist event." Honest about who the recipient of donations actually is.
2. **"funds artists nationwide through quarterly micro-grants"** — names the actual mechanism by which artists get paid. Removes any implied real-time patronage promise.
3. **"Featured artists also receive 100% of any optional direct tips"** — preserves the real but secondary v4v component without overstating it. The word "optional" matters; the word "also" matters.

**Where this language gets propagated:**

I want to update this consistently so we don't have one document leaning v4v while another walks it back:

- The one-page sponsor pitch (`00`)
- The full sponsor leave-behind (`01`)
- The artist outreach email (`07`) — **most important, since artists themselves need to be unambiguous about the model before they say yes**
- The board presentation deck (`08`)
- The conference pitch runner Avi and Kyle are using in Vegas (`09`)
- The recent Beehiiv newsletter and social posts — those are already out, so the fix applies going forward, not retroactively
- The Pubkey DC outreach email — depending on whether I've sent it yet, either update before sending or note for the next venue conversation

**One open question for you:**

Does the **event name** itself — "Art + Zap Weekend" — push too hard in the v4v direction even after we tighten the surrounding language? The word "zap" is loaded in Nostr/Bitcoin culture and typically connotes direct creator-to-fan value transfer. Two ways to read it:

- **Keep the name:** zaps still happen (artist tip jars + BFTA donations are both technically zaps), and the surrounding language now does the work of clarifying who's the primary recipient. The name stays evocative and on-mission.
- **Change the name:** something like "Bitcoin Arts Weekend" or "Art for Sats" repositions away from any v4v implication. Loses the punchy Nostr-flavored hook but eliminates the framing tension entirely.

I lean toward keeping the name and letting the tightened language do the work — partly because we've already used it in the newsletter and social posts and rebrand cost is real, but mostly because "Art + Zap Weekend" is genuinely a better hook than the alternatives. But I want your read before I commit. If you think the name itself is the problem, we should know now rather than after Vegas.

**Action plan, assuming you sign off on the language above:**

1. I update the 6 internal docs this week with the tightened framing
2. The next Beehiiv newsletter will include a dedicated paragraph clarifying the model — fundraiser for BFTA, with optional direct tipping during segments — so the framing for the audience evolves with us, not in contradiction to past communications
3. Avi and Kyle's Vegas pitch runner gets the updated language before they fly out
4. I'll surface the change to the rest of the board so we're aligned on this language before Pubkey, sponsors, or artists hear different versions of it from different people

**One last thing:** thank you for writing this carefully. Board feedback that catches a positioning issue *before* it ships into the world is the highest-leverage thing a board does. I'd rather adjust here, with you, than discover it during Vegas hallway conversations.

Reply with thoughts on the proposed language and the event-name question and I'll move on the updates.

Dion

---

## After Kenneth replies — what to do based on response

### If Kenneth signs off on the proposed language and says keep the event name
Run the doc updates immediately:
- Replace the `00-one-page-pitch.md` opening "What" line with the tightened framing
- Replace the `01-sponsor-leave-behind.md` one-liner
- Update the `07-artist-outreach.md` "Honest framing up front" paragraph (already in the right direction; just sharper)
- Refresh the `08-board-presentation-revised-plan.md` Slide 3 and Slide 6 framings
- Drop the new framing into the `09-board-conference-pitch-runner.md` 30-second and 2-minute pitches before Avi and Kyle leave for Vegas
- Add a "framing model clarifier" paragraph to the next newsletter draft (file already in the repo)
- Decide on Pubkey email timing — if not yet sent, update before send

### If Kenneth wants the event name changed
Larger lift, but doable. Options:
- "Bitcoin Arts Weekend" (cleanest, most descriptive)
- "Sats for Sovereign Art" (nods at the mission language already used)
- "BFTA Festival 2026" (most institutional, least Nostr-flavored)
Pros of changing: eliminates framing tension entirely. Cons: rebrand cost across newsletter, social, planning materials. If we go this route, do it BEFORE Vegas so we're not introducing two names to sponsors in the same week.

### If Kenneth wants the language even tighter than what I proposed
Specifically, if he wants the term "Bitcoin-native" dropped entirely (some Bitcoin orgs reserve "Bitcoin-native" for protocol-level builders, not nonprofits accepting BTC), update to "Bitcoin-funded" or "Bitcoin-accepting" throughout. Easy global find-replace.

### If Kenneth wants to escalate this to a full board conversation before any change
Schedule it. This is the right kind of decision to take to a full board. Worth a 30-minute board call dedicated specifically to event positioning if anyone else has reservations.

---

## Why this email is structured this way

- **"You caught a real gap" first.** Same principle as the Julie reply. Acknowledgment of substantive feedback comes before any "yes but" or context. Defensive board replies kill future feedback loops.
- **Quote the current language and the proposed language side by side.** Makes Kenneth's job concrete — he can react to specific words rather than abstract notions. Gets to alignment in one round-trip instead of three.
- **Explicit list of every doc that needs updating.** Shows him you're taking it seriously across the entire surface area, not just patching one slide. Builds trust that the change is real.
- **The "one open question for you" on the event name.** This either earns his deeper buy-in (if he likes the name and you take his pulse on it) OR surfaces a bigger issue early (if he hates the name). Either outcome is better than discovering the name issue mid-Vegas.
- **"Reply with thoughts and I'll move on the updates"** — gives him a clean ball to return. Doesn't ask him to schedule a call (unnecessary friction); doesn't promise updates without his sign-off (skips alignment).
- **Thank him for catching it before shipping.** Same closing principle as the Julie reply — the highest-value thing a board does is catch problems early. Naming that explicitly trains the board to keep doing it.

## Strategic context for future use

Kenneth's feedback is the **right kind of board feedback** — substantive, specific, and offered with proposed solution. Reward this kind of feedback by responding substantively in return. The wrong response would be:

- ❌ "Great point, I'll think about it" (closes the loop without action)
- ❌ "We've actually thought about this..." (defensive; signals their input wasn't needed)
- ❌ "Let's bring this to the next board meeting" (kicks the can without using their actual expertise)

The right response treats them as a genuine collaborator: specifics in, specifics out.
