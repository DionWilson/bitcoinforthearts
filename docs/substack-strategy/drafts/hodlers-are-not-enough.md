# Hodlers Are Not Enough

*BIP-110 mined two blocks and stalled. The concerns behind it are real. Adam Back's response named the terrain those concerns actually have to be won on. Both are worth taking seriously. What last weekend teaches, taken together, is more uncomfortable and more empowering than either side made explicit. The plebs already own the majority of Bitcoin. They just do not use it. Fix that, and everything else follows.*

**Bitcoin for the Arts · Substack draft · for publication week of August 10, 2026**

---

## TITLE

Hodlers Are Not Enough

## SUBTITLE

BIP-110 mined two blocks and stalled. The concerns behind it are real. Adam Back's response named the terrain those concerns actually have to be won on. Both are worth taking seriously. What last weekend teaches, taken together, is more uncomfortable and more empowering than either side made explicit. The plebs already own the majority of Bitcoin. They just do not use it. Fix that, and everything else follows.

---

## BODY

This is a piece written in respect, not in argument. Adam Back is one of the small handful of people whose original work directly informed the Bitcoin whitepaper, and whose name appears in its references. His voice on how the protocol is actually governed carries weight because he has been thinking about the underlying problem longer than most Bitcoiners have owned any bitcoin. This essay engages with what he said last weekend, and takes his framework seriously enough to follow where it actually leads.

It is also written in respect for the people who ran BIP-110. Their concerns about the direction of the network are serious and legitimate. They were arguing that certain classes of on-chain data have been bloating the blockchain and the UTXO set, driving up the cost of running a full node, and quietly pricing ordinary individuals out of the ability to independently validate the network. If the cost of running a node rises high enough, only institutions can afford to run them, and Bitcoin's decentralization erodes from the outside in. Bitcoin for the Arts shares those concerns. Keeping the cost of sovereignty low for a homeschooling family, a working artist, or a small-town shopkeeper is a mission this organization exists to defend.

So this piece does not take a side between Adam Back and the BIP-110 coalition. It takes what both of them made visible last weekend, treats each of their concerns as real, and follows the lesson toward what the pleb community can actually do next.

On Saturday, August 8, 2026, a group of Bitcoiners activated BIP-110 on their nodes and waited to see what the network would do. BIP-110 was a proposed change to Bitcoin's consensus rules, put forward by a coalition of self-described sound-money maximalists who believed the network had drifted from what Bitcoin was designed to be. They believed, or hoped, that if enough node operators refused miners' current blocks and demanded blocks that followed the new rules, miners would eventually follow. That is a legitimate strategy in Bitcoin governance. It has a name. It is called a user-activated soft fork, and it has worked before. It did not work this time.

The BIP-110 chain mined two blocks. Then it stalled. The rest of the Bitcoin network kept moving forward as if nothing had happened, because for the network, nothing had. The vast majority of hash power stayed on the main chain. The vast majority of exchanges, custodians, and payment processors stayed on the main chain. Users transacting on the main chain never noticed. By Sunday morning, the BIP-110 attempt was over. The coalition that had spent months organizing around it was left with a technical outcome that did not reflect the seriousness of the concerns that motivated the effort.

The next morning, Sunday, August 9, Adam Back posted this on X:

> "mistakes by 110ers: arguing nodes control protocol changes and miners will capitulate. subtly wrong. the economic users control the protocol, via the market. they transmit their views by transacting with their economic nodes. 1000s of nodes with no economic use have no influence."

Read that sentence twice. There is more contained inside it than most postmortems of BIP-110 have understood.

## What Adam is actually saying

Adam is saying the theory the BIP-110 supporters operated under, the theory that node operators collectively hold veto power over miners, is wrong in a specific way. In his framing, protocol control is not distributed evenly across everyone who runs Bitcoin software. It is concentrated among the people and institutions whose nodes are actually doing economic work. Everyone else is signal without weight.

Notice what he is not saying. He is not saying miners control Bitcoin. When one respondent in the same thread suggested exactly that, that Bitcoin is now "controlled by a handful of miners," Adam replied with a one-word rebuttal: "no." That is important. It means Adam's claim is not a passive description of miner power. It is an affirmative position about *who counts* as a legitimate governance actor. In his model, governance flows through the market, and the market is made of people and institutions who transact bitcoin at scale.

That is a coherent framework. It is also a political framework, whether or not it was intended as one. And it is the ground where the rest of this piece will spend its time.

## He is not wrong

Start with the empirical part of what Adam said, because it is important to give it its full due before disagreeing with anything.

He is not wrong about how forks resolve in practice. When two versions of Bitcoin exist and one of them has no exchanges, no merchants, no meaningful payment volume, and no buyers, the coins on that chain trend toward zero market value. Miners are paid in bitcoin, and they follow the money. If the buyers are all on one chain, that is the chain that survives. Empirically, that is how it has always worked. Every serious Bitcoin fork attempt of the past fifteen years, from the block-size wars through the various attempted forks of the SegWit era through this weekend's BIP-110, has resolved along exactly the lines Adam is describing. He is not offering a theory. He is describing a pattern.

So the question is not whether the pattern exists. It does. The question is what to do about the fact that it exists.

## The words that do the work

The words in Adam's sentence that do the real work are *economic users*. Everything else in that sentence follows from what you decide to mean by those two words.

The term does not appear in Satoshi Nakamoto's whitepaper. It is not there. What is in the whitepaper is a description of a network of honest nodes that follow protocol rules, and a phrase about miners voting with their CPUs. There is no reference to an economic majority. There is no hierarchy of nodes based on who is transacting more valuable payments through them. The whitepaper describes a system in which every participating node is structurally equal, with the security of the system arising from the aggregate honesty of the whole.

More than that, Satoshi originally designed Bitcoin so that every full node was also a miner. In the earliest versions of the software, running a node and mining were the same act. One CPU, one vote meant that every participant in the network was simultaneously validating and producing blocks. There was no separation between the person who ran the software and the person who influenced consensus. That separation emerged later, when specialized mining hardware made home mining economically impossible for anyone who did not own a warehouse and a substation. When mining industrialized, it took the "one CPU, one vote" phrase with it, and left behind a class of participants, the plain node runners, whose relationship to governance was suddenly unclear.

The concept of the *economic node* or the *economic user* was invented, in part, to describe what these unmoored participants were for. It became a common phrase during the block-size wars of 2015 through 2017. It was used by developers, exchanges, and researchers to argue that even if miners produced a chain with larger blocks, that chain would only survive if it had economic buy-in from actors who could give bitcoin its market price. Exchanges. Custodians. Merchants. Payment processors. Large holders. At the time, this was a good and clarifying argument, because it explained why the market kept resolving in favor of the smaller-block chain even when significant hash power sat on the other side. It was a description that fit the moment.

But every good argument, if it becomes conventional wisdom for long enough, becomes a lens that determines what people see and what they stop seeing. That is what has happened to *economic user* as a concept.

Today, when someone in Bitcoin's governance debates uses the phrase *economic user*, they almost always mean a specific short list of actors. An exchange like Coinbase. A custodian like BitGo or Fidelity. A large treasury holder. A payment processor like Strike or Fold. A high-volume merchant. A mining pool. These are the entities whose transaction flows show up on the network at a scale that is unmistakable. When Adam says a thousand hobbyist nodes have no influence, he is saying, correctly, that a thousand hobbyist nodes moving no meaningful volume are, in aggregate, less economically weighty than one exchange running a single node moving a hundred million dollars a day. That is arithmetic.

But sit with what that has become. In the world Adam is describing, the governance of the peer-to-peer electronic cash system Satoshi designed is now effectively resolved by roughly a few dozen exchanges, a few dozen custodians, a handful of large treasuries, and the mining pools that serve them. That is not a peer-to-peer electronic cash system. That is a supervised financial network in which the supervisors are the largest holders. It is a wealth-weighted governance structure. And it is a long way from Satoshi's original design, in which every node was a miner and every miner was a vote.

## The chokepoint problem

There is a further piece of this that people quietly know but rarely say out loud. One respondent in the thread underneath Adam's post put it directly. Most retail Bitcoiners, in order to acquire the bitcoin they hold, had to route their money through an exchange or a custodian. That means the very act of becoming a Bitcoiner passed each of these individuals through an economic node that now, in Adam's framework, gets to speak on their behalf.

The sovereign individual who runs their own node, holds their own keys, and validates every block on their own machine is, structurally, a downstream participant in a governance system where their upstream on-ramp is the party with the voice. That is not a paranoia. That is a description of the shape of the pipe.

If Adam's framework is right about how governance works, then the on-ramp is the vote. Every dollar an individual sends through Coinbase or Kraken or a similar service to acquire bitcoin is, in some fractional sense, delegating governance influence to that service. Not because the service asks for it. Because the model says so. This is worth naming clearly, because it is the actual mechanism by which the "sovereign individual" ends up with less influence than they thought they had.

## The counter-argument, addressed

Some readers will already be forming a response. It goes something like this: *"The people upset about this framework are just people who are upset that they do not personally get to dictate the outcome. Consensus is emergent. It arrives from the market. If you do not like that, you did not understand Bitcoin in the first place."*

That response has a version that is fair and a version that is not. The fair version is: Bitcoin's design deliberately avoids elevating any single participant to command position. Nobody gets to dictate the outcome. That is a feature, and anyone who came to Bitcoin expecting a vote in the traditional political sense misunderstood the design. Agreed.

The unfair version is: therefore, any critique of the current composition of the economic majority is sour grapes from people who lost a vote they never had. That is a rhetorical shortcut, and it dodges the actual question. The question is not whether any individual should get to dictate anything. The question is whether the composition of the economic majority *itself* is healthy for the network Satoshi designed. If ninety percent of Bitcoin's transaction flow runs through a couple dozen supervised financial institutions, and those institutions collectively determine what Bitcoin is, then the "emergent consensus" that Adam describes is emerging from a very small room. That is not a claim about who deserves to dictate. It is a claim about who is *in the room*.

Everything that follows in this piece takes that question, the composition question, as the real terrain. Not who gets to dictate. Who gets to show up.

## The concerns behind BIP-110 were serious

Do not dismiss the people who ran BIP-110. The concerns underneath the proposal were real. They were arguing that certain classes of on-chain data had been bloating the blockchain and expanding the UTXO set beyond what a plain individual could reasonably store and validate on modest hardware. They were arguing that if the cost of running a node keeps rising, Bitcoin's decentralization erodes, because only well-capitalized institutions can afford to independently verify the chain. They were arguing that this drift, if left unchecked, quietly transforms Bitcoin from a peer-to-peer money system into a settlement layer for institutional finance. Those are legitimate concerns, and Bitcoin for the Arts shares them.

They believed that the sovereignty of the node, which is real at a technical level, was also sovereign at a governance level. They tried to use that sovereignty to fight for what they believed Bitcoin was for. That is not stupid. That is faithful.

What Adam is surfacing is not that their concerns were wrong. It is that the tool they reached for is not the tool that decides. Nodes without economic weight cannot force miners to accept new rules. The market decides, and the market listens to the actors who move real value. If the pleb coalition wants its vision of Bitcoin to actually shape the network, running more nodes and issuing more manifestos is not sufficient on its own. Composition is. If the sound-money coalition wants to protect what BIP-110 was trying to protect, it has to become the economic majority whose transactions the market watches.

Right now, it is not.

## The math the institutions are winning

Here is the situation, plainly stated.

There are, at the time of this writing, somewhere in the neighborhood of twenty thousand publicly reachable Bitcoin full nodes in the world, and an unknowable but larger number of private nodes that never advertise themselves. Most of them are run by individuals. Most of those individuals hold some quantity of bitcoin, from a few thousand satoshis to a few whole coins. Most of them, at least some of the time, follow the Bitcoin culture on social media, listen to Bitcoin podcasts, read the arguments, care about the direction of the protocol, and quietly hope that the money they have chosen to hold is the money they think it is.

But *very few of them are transacting*. They bought their bitcoin. They moved it to cold storage. They set up a full node so their wallet does not have to trust anyone else's node. And then, mostly, they stopped. They watch the price. They read the takes. They argue on X. They do not spend. They do not receive. They do not conduct commerce in bitcoin. They are what the community lovingly calls hodlers.

Meanwhile, an exchange like Coinbase processes billions of dollars of bitcoin transactions every day. A payment processor like Strike routes millions in Lightning payments a month. A custodian like BitGo settles institutional trades constantly. Every single one of those transactions is what Adam means when he says *transacting with economic nodes*. That is what carries governance weight. That is what miners are watching. That is what determines which chain has a market.

The math of who is an economic user, in Adam's sense, is not a math of headcount. It is a math of transaction flow. And by that math, right now, a few dozen institutions are the economic majority, and twenty thousand plebs with cold-stored coins are, in aggregate, background noise.

That is the situation. It is the terrain the BIP-110 coalition was fighting on without necessarily naming it in those terms. It is the terrain Adam Back named in one sentence last weekend. Whatever anyone thinks of either of them, both were describing the same underlying condition. The pleb, in aggregate, has been out of the economic majority for years. Not because the pleb was excluded. Because the pleb bought bitcoin and stopped.

## But the coins are already in pleb hands

Here is the harder truth underneath the transaction flow, and the one that changes the meaning of everything above.

Bitcoin's ownership is not what its transaction volume suggests. By the best available on-chain analyses, the majority of the bitcoin actually in circulation is not held by exchanges, spot ETFs, corporate treasuries, custodians, or governments. It is held by individuals. Millions of individual addresses. Small holders, medium holders, and ordinary people who bought over the past decade, moved their bitcoin into their own custody, and quietly stopped.

When institutional bitcoin is tallied honestly, spot ETF holdings, publicly traded corporate treasuries such as Strategy, government-held coins from seizures, publicly listed miner reserves, and the balances that custodians hold on behalf of large clients, the total sits well below half of the effectively circulating supply. Rough estimates in mid-2026 place institutional and institutionally-adjacent holdings somewhere between fifteen and twenty percent of the coins that are actually moveable. The remaining eighty percent or more sits in the wallets of individuals. Not any single individual whale. Millions of ordinary people, each holding a little.

The plebs, in aggregate, own Bitcoin.

What the plebs do not do is *use* Bitcoin. That is the crack in the picture. The ownership is theirs. The economic use is not. Every day, plebs collectively hold the vast majority of the network's coins and produce a small fraction of its transaction volume. Every day, institutions hold a minority of the coins and produce nearly all of the volume that counts as economic use in Adam Back's sense.

This is not a story about being outgunned. This is a story about being unactivated. The economic majority the plebs would need to reshape Bitcoin's governance is not something they have to build from scratch. It is something they already have and choose not to use. The institutions did not take it from them. The plebs handed it over, one cold-stored coin at a time, by holding and refusing to conduct commerce.

That is a hard sentence to sit with, and it should be. If Bitcoin drifts further into a supervised financial network operated for the benefit of the actors who bothered to transact, it will not have been because the plebs were locked out. It will have been because the plebs, holding the majority of the coins, declined to show up in the market. That is a responsibility that lives with the pleb community, not with anyone else.

It is also, and this is the hopeful part, entirely fixable. The fix does not require anyone to buy more bitcoin. The fix does not require an activist protocol change. The fix does not require any institution to lose. It requires only that the people who already hold bitcoin begin to move it, receive it, spend it, and earn it, in the ordinary rhythms of their economic lives. The moment enough of them do, the composition of Bitcoin's economic majority changes, and everything downstream, including protocol politics, changes with it.

If Bitcoiners want Bitcoin to survive as the network Satoshi designed, they have to change how they see it, how they perceive it, and how they use it. Bitcoin is not a share certificate to be locked in a drawer. It is money. It becomes real money only when people conduct their lives in it. The plebs, right now, are the largest holders of the world's hardest money and the smallest users of it. That has to be the sentence that reorganizes the culture inside Bitcoin from this point forward.

## The battle after BIP-110

If the sound-money coalition inside Bitcoin wants a governance model that returns influence to the sovereign individual, they cannot win it by fighting more protocol wars against miners. Adam has told them why. They have to win it by changing the composition of the economic majority itself.

That is a much larger project. It is also much more interesting. And it is completely within reach.

The reason a few dozen institutions dominate Bitcoin's transaction flow today is not that they were destined to. It is that they built usable products, aimed at real human needs, and made it easy for people to route their bitcoin activity through them. Coinbase built an easy on-ramp. Strike built a Lightning app that a normal person can use to send money. Custodians built vaults that boards of directors understand. Payment processors built rails that merchants can plug into without hiring a developer. Every one of those companies became an economic node in Adam's sense because they earned it, one user at a time, by making Bitcoin usable.

If every current hodler decided, over the next twelve months, to become a person who *uses* bitcoin for real economic activity, the composition of the economic majority in Bitcoin would change more in a year than it has changed in the last decade.

A pleb with a full node who buys a book from another pleb in bitcoin is an economic user. A pleb who pays a musician for a song over Lightning is an economic user. A pleb who tips a writer, buys a coffee from a merchant taking sats, receives payroll in bitcoin, sells something on a Bitcoin-native marketplace, or accepts sats for their own labor is an economic user. Every one of those transactions is what Adam means by *transacting through your economic node*. Every one of them is a small, real, on-record signal that the pleb chain matters. Every one of them adds a grain of sand to the scale.

Right now, that scale is empty on the pleb side. Not because plebs do not care, but because plebs bought coins and stopped. The institutional side is not winning because the institutions are more clever or more numerous. It is winning because the plebs, by choice, have stayed out of the market they claim to want to control.

## What every serious Bitcoiner should do next

If the empirical part of Adam's framework describes how Bitcoin's forks and protocol politics actually resolve under current conditions, and it appears to, then a small number of things become obvious.

**One.** Hodling is not enough. Hodling is a starting condition. Hodling is what happens on day one after understanding that fiat money loses value. Hodling is protective. Hodling is right. But hodling by itself makes no case to the market that bitcoin is money. It makes the opposite case. It says, "This thing is precious enough to save and not precious enough to spend." Every serious Bitcoiner who is only hodling is, in Adam's framework, silent.

**Two.** Every hodler needs to become a user. This does not mean spending your stack. It means finding at least one part of your economic life you can move onto bitcoin rails, and moving it. Buy something. Sell something. Get paid for something. Receive one recurring payment in sats. Send one recurring payment. Route one transaction a week through your own node. Any of it. All of it. That is what economic weight is.

**Three.** Every Bitcoiner who has skills to build should build for the pleb, not for the institution. The reason institutions dominate the economic node math is that developers, until recently, mostly built for them. The tools for individuals are still catching up. Every wallet that makes self-custody easier, every non-custodial Lightning app that a grandmother can use, every merchant plugin that a small business can install in an afternoon, every zap client that a musician can accept payments through, is a shift in the economic majority.

**Four.** Every Bitcoiner who has an audience should teach transacting, not just holding. The educational infrastructure of Bitcoin, its podcasts, its books, its conferences, has spent a decade teaching people to buy and hold. That was the right lesson for that decade. The lesson for the next decade is different. It is: use it. Route your economic life through the network. Become an economic node in Adam's sense. Not because Adam said so. Because the sovereignty the cypherpunks fought for cannot exist without it.

**Five.** The concerns BIP-110 raised, about spam, about block-space bloat, about the rising cost of running a node, about the erosion of decentralization, remain real. They deserve to keep being fought for, at the level of miner policy, node relay defaults, and cultural pressure around what counts as legitimate use of block space. But this weekend's outcome teaches an ordering lesson. Composition comes first. Who counts as an economic user is decided by who is transacting. Who is transacting is decided by whether Bitcoin is usable in daily life. Whether Bitcoin is usable in daily life is decided by builders, teachers, merchants, and above all users. Change the composition of the economic majority, and the protocol politics of the future, including the ones BIP-110 was trying to influence, resolve differently. Leave composition unchanged, and BIP-110's failure is not an anomaly. It is a preview.

## What this means for the arts

Bitcoin for the Arts exists in the middle of this problem in a way that is not accidental. The people this organization was built to serve, working artists, writers, dancers, musicians, teachers, small culture-makers, are also exactly the population that could most rapidly change Bitcoin's economic composition if they became transacting users of the network.

An artist selling a print for sats is an economic user. A dance company selling tickets over Lightning is an economic user. A theater accepting a monthly membership in bitcoin is an economic user. A homeschooling family paying for a private class in sats is an economic user. A podcast taking value-for-value contributions is an economic user. Every one of these is a real transaction with a real counterparty, and every one of them registers on the network in the same category that a Coinbase trade or a Fidelity settlement registers. Not in the same volume, obviously. But in the same category. And volumes are what get built.

The strategic path for BFTA and the artists in its orbit, in the light of everything last weekend surfaced, sharpens rather than softens. The mission is not to teach artists to hold bitcoin. It is to teach artists to *conduct their economic lives* in bitcoin, one transaction at a time, until the composition of the economic majority in this network includes the people who make culture.

If the sound-money coalition wants to protect what BIP-110 was trying to protect, and if the network wants to be governed by anyone other than a handful of custodians, the shared path forward runs through the same door. Help every artist take sats for their work. Help every merchant install a payment processor. Help every musician stream value over Nostr. Help every writer accept zaps. Help every teacher receive a stipend in bitcoin. That is the work. Everything else is downstream.

## The last honest thing to say

Adam Back's post was not an attack on the plebs, and the BIP-110 coalition's proposal was not a mistake. Both were part of the same conversation about how Bitcoin remains the network Satoshi designed. One side was defending a specific technical property of that network. The other was pointing out how that network is actually governed in practice. Neither is complete without the other. What last weekend teaches, taken as a whole, is that the two conversations have been running in parallel when they should have been running as one, and that the prerequisite for winning either of them is the same. Composition. Use. Pleb economic activity at scale.

Adam's post, read charitably, was a warning. He was telling a group of people who thought they had governance power that they do not, in fact, have it under current conditions. He was showing them the wall they ran into and explaining why the wall is there. What he did not do, but what someone should, is complete the sentence.

Nodes without economic use have no influence. That is one half of the sentence. The other half is: *and that can change*. It changes the day the plebs stop hodling and start transacting. It changes the day the tools built for the individual finally match the tools built for the institution. It changes the day the culture inside Bitcoin decides that the highest virtue is not accumulation but use. That day is not automatic. It has to be chosen, over and over, by people who understand that the money they hold is only real to the extent that it moves.

Bitcoin was designed to be spent. Satoshi wrote it that way on purpose. The system the whitepaper describes is a payment network first and a store of value only as a consequence of being trustworthy money. Every hodler who understands that, and every institution that has quietly benefited from the plebs forgetting it, knows what happens if the plebs remember.

BIP-110 mined two blocks and stalled. The next fight is not another BIP. The next fight is whether the plebs, who already hold most of the coins, decide to also hold most of the transaction flow. That is the whole choice. Activate what is already theirs, and the protocol politics of the next decade will look nothing like the last one. Leave it dormant, and Bitcoin will keep drifting into a supervised financial network operated for the benefit of the actors who bothered to show up and transact.

The BIP-110 coalition told us what is at stake. Adam Back told us how the game is scored under current conditions. Both are worth listening to. And the answer to both, the thing that would honor what BIP-110 was defending and the thing that would change what Adam described, is the same. It is time for the plebs to become the economic majority in fact, so that what Bitcoin becomes is decided by the people it was designed to serve.

---

## END OF BODY

---

## FOOTER / SIGN-OFF (for Substack)

**Dion Wilson** is the founder of Bitcoin for the Arts, a nonprofit that helps working artists understand and use sound money. Support BFTA's work by subscribing at [bitcoinforthearts.substack.com](https://bitcoinforthearts.substack.com), joining the Sovereign Circle at [bitcoinforthearts.org/sovereign-circle](https://bitcoinforthearts.org/sovereign-circle), or funding a specific project at [geyser.fund/project/bitcoinforthearts](https://geyser.fund/project/bitcoinforthearts). If you are an artist ready to become an economic user, apply to the Artist Directory at [bitcoinforthearts.org/directory](https://bitcoinforthearts.org/directory).

---

## SOCIAL EXCERPT OPTIONS (280 char cap)

**Option A (the killer line, neutral):**
Plebs own the majority of Bitcoin. Institutions own the majority of Bitcoin's transaction flow. That is not a rigging. That is a choice. Activate what is already yours. New Substack from BFTA on BIP-110, Adam Back, and what the pleb community has to do next.

**Option B (both-sides framing):**
BIP-110 raised real concerns. Adam Back named the terrain those concerns have to be won on. Both are worth taking seriously. The lesson: hodling is not enough. The plebs already own most of Bitcoin. They just do not use it. Fix that, and everything follows. New Substack from BFTA.

**Option C (arts angle):**
An artist selling a print for sats is an economic user. So is a dance company taking Lightning tickets. Plebs already hold most of Bitcoin. The moment they use it, Bitcoin's governance changes. Composition is the real battle. New Substack from BFTA.

**Option D (Nostr-first, personal voice, for Dion to post directly on Nostr):**
The plebs already own the majority of Bitcoin. What we do not do is use it. That is why the institutions get to speak for the network. The fix does not require buying more. It requires spending, earning, receiving, and transacting. Ordinary economic life. That is the fight I want to be in.

---

## NOTES FOR EDITING

- Written in third-person editorial voice consistent with prior BFTA Substack pieces.
- No em dashes anywhere in the body (per BFTA style).
- Adam Back's tweet is quoted verbatim; do not paraphrase the direct quotation.
- The BIP-110 details ("mined two blocks," "activated August 8, 2026") are stated as user reported. Confirm accuracy of block count and activation date before publishing.
- Timeline: BIP-110 activated Saturday, August 8, 2026. Adam Back's post was written on the morning of Sunday, August 9, 2026, in response to BIP-110's stalled activation the day before. Article now reflects this ordering ("The next morning, Sunday, August 9").
- Node-count figure: the piece states approximately twenty thousand publicly reachable full nodes, consistent with mid-2026 bitnodes.io and coin.dance snapshots. Verify against current data before publishing if the count has drifted materially.
- **Ownership figures.** The section titled "But the coins are already in pleb hands" states that individuals hold roughly 80 to 85 percent of the effectively circulating Bitcoin supply, and institutional and institutionally-adjacent actors hold roughly 15 to 20 percent. These figures are drawn from mid-2026 on-chain research consensus (spot ETF holdings, publicly traded corporate treasuries, government seizures, publicly listed miner reserves, custodian institutional client balances). Before publishing, verify with a current Glassnode, River Financial, or Chainalysis snapshot. Even a materially different exact percentage does not change the argument, but the ratio should be defensible if challenged.
- **BFTA neutrality is intentional.** The piece explicitly does not endorse Adam Back's framing over the BIP-110 coalition's, or vice versa. It treats both as raising real concerns and takes the lesson from what both surfaced. The opening explicitly states this neutrality. The section titled "The concerns behind BIP-110 were serious" spells out what BIP-110 was actually about (spam, block-space bloat, rising node cost, UTXO growth, decentralization erosion) and states that BFTA shares those concerns. The closing frames both parties as describing the same underlying condition from different sides.
- The piece deliberately does not engage with the specific technical text of BIP-110 or with any PR / marketing debates around how it was promoted. Discussion is confined to governance composition, which is the point of the piece.
- Deliberately does not name specific "villains" in the institutional custody world. Names Coinbase, Strike, BitGo, MicroStrategy, Fidelity as descriptive, not accusatory.
- Deliberately does not use gendered pronouns for Satoshi. Uses "Satoshi" as name only.
- Companion to "Bitcoin Was Never Supposed to Be an Investment." That piece argued Bitcoin's purpose. This piece argues Bitcoin's citizenship. Together they form a two-part frame on where the movement is drifting and how to correct course.
- The counter-argument section explicitly acknowledges the strongest reply the piece will elicit ("you just don't get to dictate the outcome") and defuses it before continuing. Anticipatory softening for a Bitcoin-Twitter audience that will be prepared to attack.
- Suggested cover image: a wide-format photograph of many hands holding a single line of text or a single note, symbolizing many plebs, one signal. Or a mosaic-tile illustration of small transactions building into a larger form.
