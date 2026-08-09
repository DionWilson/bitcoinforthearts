# Hodlers Are Not Enough

*BIP-110 mined two blocks and died. In one sentence, Adam Back explained why. What he said about how Bitcoin is actually governed should reorganize the priorities of every serious Bitcoiner. This is the fight that comes next, and it is a fight the plebs can win.*

**Bitcoin for the Arts · Substack draft · for publication week of August 10, 2026**

---

## TITLE

Hodlers Are Not Enough

## SUBTITLE

BIP-110 mined two blocks and died. In one sentence, Adam Back explained why. The people who supported BIP-110 had the right instinct and the wrong battlefield. The real fight is turning every Bitcoiner from a passive holder into a working economic user, because that is where Bitcoin's governance actually lives, and it is a fight the plebs can win.

---

## BODY

This is a piece written in respect, not in argument. Adam Back is one of the small handful of people whose original work directly informed the Bitcoin whitepaper, and whose name appears in its references. His voice on how the protocol is actually governed carries weight because he has been thinking about the underlying problem longer than most Bitcoiners have owned any bitcoin. This essay engages with what he said last weekend, and takes his framework seriously enough to follow where it actually leads.

On Saturday, August 8, 2026, a group of Bitcoiners activated BIP-110 on their nodes and waited to see what the network would do. BIP-110 was a proposed change to Bitcoin's consensus rules, put forward by a coalition of self-described sound-money maximalists who believed the network had drifted from what Bitcoin was designed to be. They believed, or hoped, that if enough node operators refused miners' current blocks and demanded blocks that followed the new rules, miners would eventually follow. That is a legitimate strategy in Bitcoin governance. It has a name. It is called a user-activated soft fork, and it has worked before. It did not work this time.

The BIP-110 chain mined two blocks. Then it stalled. The rest of the Bitcoin network kept moving forward as if nothing had happened, because for the network, nothing had. Two blocks on a minority chain is not a fork. It is a rounding error. The vast majority of hash power stayed on the main chain. The vast majority of exchanges, custodians, and payment processors stayed on the main chain. Users transacting on the main chain never noticed. By Sunday morning, the BIP-110 attempt was over.

Later that same morning, Adam Back posted this on X:

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

## The instinct behind BIP-110 was right

Do not dismiss the people who ran BIP-110. Whatever anyone thinks of the specifics of the proposal, or of the way it was marketed, the instinct underneath it was correct. They were watching Bitcoin drift into being a settlement layer for institutional finance, and they were trying, with the only tools they had, to pull it back toward being money. They believed that the sovereignty of the node, which is real at a technical level, was also sovereign at a governance level. They tried to use that sovereignty to fight for what they believed Bitcoin was for. That is not stupid. That is faithful.

The problem is that Adam is telling them, correctly, that the tool they reached for is not the tool that decides. Nodes without economic weight cannot force miners to accept new rules. The market decides, and the market listens to the actors who move real value. If BIP-110 supporters want their vision of Bitcoin to actually shape the network, they cannot get there by running more nodes and issuing more manifestos. They have to get there by becoming the economic majority.

Right now, they are not.

## The math the institutions are winning

Here is the situation, plainly stated.

There are, at the time of this writing, somewhere in the neighborhood of fifty thousand publicly reachable Bitcoin full nodes in the world, and an unknowable but larger number of private nodes. Most of them are run by individuals. Most of those individuals hold some quantity of bitcoin, from a few thousand satoshis to a few whole coins. Most of them, at least some of the time, follow the Bitcoin culture on social media, listen to Bitcoin podcasts, read the arguments, care about the direction of the protocol, and quietly hope that the money they have chosen to hold is the money they think it is.

But *very few of them are transacting*. They bought their bitcoin. They moved it to cold storage. They set up a full node so their wallet does not have to trust anyone else's node. And then, mostly, they stopped. They watch the price. They read the takes. They argue on X. They do not spend. They do not receive. They do not conduct commerce in bitcoin. They are what the community lovingly calls hodlers.

Meanwhile, an exchange like Coinbase processes billions of dollars of bitcoin transactions every day. A payment processor like Strike routes millions in Lightning payments a month. A custodian like BitGo settles institutional trades constantly. Every single one of those transactions is what Adam means when he says *transacting with economic nodes*. That is what carries governance weight. That is what miners are watching. That is what determines which chain has a market.

The math of who is an economic user, in Adam's sense, is not a math of headcount. It is a math of transaction flow. And by that math, right now, a few dozen institutions are the economic majority, and fifty thousand plebs with cold-stored coins are, in aggregate, background noise.

That is the situation. That is what the BIP-110 supporters were railing against without quite naming it. And it is what Adam has now named for them, in one sentence, without flinching.

## The battle after BIP-110

If the sound-money coalition inside Bitcoin wants a governance model that returns influence to the sovereign individual, they cannot win it by fighting more protocol wars against miners. Adam has told them why. They have to win it by changing the composition of the economic majority itself.

That is a much larger project. It is also much more interesting. And it is completely within reach.

The reason a few dozen institutions dominate Bitcoin's transaction flow today is not that they were destined to. It is that they built usable products, aimed at real human needs, and made it easy for people to route their bitcoin activity through them. Coinbase built an easy on-ramp. Strike built a Lightning app that a normal person can use to send money. Custodians built vaults that boards of directors understand. Payment processors built rails that merchants can plug into without hiring a developer. Every one of those companies became an economic node in Adam's sense because they earned it, one user at a time, by making Bitcoin usable.

If every current hodler decided, over the next twelve months, to become a person who *uses* bitcoin for real economic activity, the composition of the economic majority in Bitcoin would change more in a year than it has changed in the last decade.

A pleb with a full node who buys a book from another pleb in bitcoin is an economic user. A pleb who pays a musician for a song over Lightning is an economic user. A pleb who tips a writer, buys a coffee from a merchant taking sats, receives payroll in bitcoin, sells something on a Bitcoin-native marketplace, or accepts sats for their own labor is an economic user. Every one of those transactions is what Adam means by *transacting through your economic node*. Every one of them is a small, real, on-record signal that the pleb chain matters. Every one of them adds a grain of sand to the scale.

Right now, that scale is empty on the pleb side. Not because plebs do not care, but because plebs bought coins and stopped. The institutional side is not winning because the institutions are more clever or more numerous. It is winning because the plebs, by choice, have stayed out of the market they claim to want to control.

## What every serious Bitcoiner should do next

If Adam's framework is correct, and it is, then a small number of things become obvious.

**One.** Hodling is not enough. Hodling is a starting condition. Hodling is what happens on day one after understanding that fiat money loses value. Hodling is protective. Hodling is right. But hodling by itself makes no case to the market that bitcoin is money. It makes the opposite case. It says, "This thing is precious enough to save and not precious enough to spend." Every serious Bitcoiner who is only hodling is, in Adam's framework, silent.

**Two.** Every hodler needs to become a user. This does not mean spending your stack. It means finding at least one part of your economic life you can move onto bitcoin rails, and moving it. Buy something. Sell something. Get paid for something. Receive one recurring payment in sats. Send one recurring payment. Route one transaction a week through your own node. Any of it. All of it. That is what economic weight is.

**Three.** Every Bitcoiner who has skills to build should build for the pleb, not for the institution. The reason institutions dominate the economic node math is that developers, until recently, mostly built for them. The tools for individuals are still catching up. Every wallet that makes self-custody easier, every non-custodial Lightning app that a grandmother can use, every merchant plugin that a small business can install in an afternoon, every zap client that a musician can accept payments through, is a shift in the economic majority.

**Four.** Every Bitcoiner who has an audience should teach transacting, not just holding. The educational infrastructure of Bitcoin, its podcasts, its books, its conferences, has spent a decade teaching people to buy and hold. That was the right lesson for that decade. The lesson for the next decade is different. It is: use it. Route your economic life through the network. Become an economic node in Adam's sense. Not because Adam said so. Because the sovereignty the cypherpunks fought for cannot exist without it.

**Five.** BIP-110, and the fights that come after BIP-110, are worth having. But they are second-order. The first-order fight is composition. Who counts as an economic user is decided by who is transacting. Who is transacting is decided by whether Bitcoin is usable in daily life. Whether Bitcoin is usable in daily life is decided by builders, teachers, merchants, and above all users. Change the composition of the economic majority, and the protocol politics resolve differently. Fail to change it, and BIP-110's failure is not an anomaly. It is a preview.

## What this means for the arts

Bitcoin for the Arts exists in the middle of this problem in a way that is not accidental. The people this organization was built to serve, working artists, writers, dancers, musicians, teachers, small culture-makers, are also exactly the population that could most rapidly change Bitcoin's economic composition if they became transacting users of the network.

An artist selling a print for sats is an economic user. A dance company selling tickets over Lightning is an economic user. A theater accepting a monthly membership in bitcoin is an economic user. A homeschooling family paying for a private class in sats is an economic user. A podcast taking value-for-value contributions is an economic user. Every one of these is a real transaction with a real counterparty, and every one of them registers on the network in the same category that a Coinbase trade or a Fidelity settlement registers. Not in the same volume, obviously. But in the same category. And volumes are what get built.

The strategic path for BFTA and the artists in its orbit, in the light of what Adam has said, sharpens rather than softens. The mission is not to teach artists to hold bitcoin. It is to teach artists to *conduct their economic lives* in bitcoin, one transaction at a time, until the composition of the economic majority in this network includes the people who make culture.

If the sound-money coalition wants to win the next BIP-110, they should be helping every artist take sats for their work, every merchant install a payment processor, every musician stream value over Nostr, every writer accept zaps, every teacher receive a stipend in bitcoin. That is the war. Everything else is skirmish.

## The last honest thing to say

Adam Back's post was not an attack on the plebs. Read charitably, it was a warning. He was telling a group of people who thought they had governance power that they do not, in fact, have it under current conditions. He was showing them the wall they ran into and explaining why the wall is there. What he did not do, but what someone should, is complete the sentence.

Nodes without economic use have no influence. That is one half of the sentence. The other half is: *and that can change*. It changes the day the plebs stop hodling and start transacting. It changes the day the tools built for the individual finally match the tools built for the institution. It changes the day the culture inside Bitcoin decides that the highest virtue is not accumulation but use. That day is not automatic. It has to be chosen, over and over, by people who understand that the money they hold is only real to the extent that it moves.

Bitcoin was designed to be spent. Satoshi wrote it that way on purpose. The system the whitepaper describes is a payment network first and a store of value only as a consequence of being trustworthy money. Every hodler who understands that, and every institution that has quietly benefited from the plebs forgetting it, knows what happens if the plebs remember.

BIP-110 mined two blocks and died. The next fight is not another BIP. The next fight is whether the fifty thousand plebs running nodes and holding sats can, together, make themselves into the economic majority of Bitcoin. If they do, the protocol politics of the next decade will look nothing like the last one. If they do not, Bitcoin will keep drifting into a supervised financial network operated for the benefit of the actors who bothered to show up and transact.

Adam told us how the game is scored. It is time to play it that way.

---

## END OF BODY

---

## FOOTER / SIGN-OFF (for Substack)

**Dion Wilson** is the founder of Bitcoin for the Arts, a nonprofit that helps working artists understand and use sound money. Support BFTA's work by subscribing at [bitcoinforthearts.substack.com](https://bitcoinforthearts.substack.com), joining the Sovereign Circle at [bitcoinforthearts.org/sovereign-circle](https://bitcoinforthearts.org/sovereign-circle), or funding a specific project at [geyser.fund/project/bitcoinforthearts](https://geyser.fund/project/bitcoinforthearts). If you are an artist ready to become an economic user, apply to the Artist Directory at [bitcoinforthearts.org/directory](https://bitcoinforthearts.org/directory).

---

## SOCIAL EXCERPT OPTIONS (280 char cap)

**Option A (Adam quote pull):**
"the economic users control the protocol, via the market." — Adam Back. He is right about how forks resolve. What every pleb should do about it is the more important question. New Substack.

**Option B (thesis, softened):**
BIP-110 mined two blocks and died. Adam Back explained why. The lesson is not that plebs are powerless. The lesson is that hodling is not enough. Every hodler must become an economic user. That is the real fight, and the plebs can win it.

**Option C (arts angle):**
An artist selling a print for sats is an economic user. So is a dance company taking Lightning tickets. If the sound-money coalition wants to shape Bitcoin's future, help the plebs transact. Composition is the real battle.

**Option D (Nostr-first, personal voice, for Dion to post directly on Nostr):**
Adam Back is not wrong about how forks resolve. But the sentence he wrote deserves to be completed. Nodes without economic use have no influence, and that can change. It changes the day plebs stop hodling and start transacting. That is the fight I want to be in.

---

## NOTES FOR EDITING

- Written in third-person editorial voice consistent with prior BFTA Substack pieces.
- No em dashes anywhere in the body (per BFTA style).
- Adam Back's tweet is quoted verbatim; do not paraphrase the direct quotation.
- The BIP-110 details ("mined two blocks," "activated August 8, 2026") are stated as user reported. Confirm accuracy of block count and activation date before publishing.
- Piece deliberately does not engage with the specific content of BIP-110 or the marketing choices of its supporters. Discussion is confined to governance composition, which is the point of the piece.
- Deliberately does not name specific "villains" in the institutional custody world. Names Coinbase, Strike, BitGo, MicroStrategy, Fidelity as descriptive, not accusatory.
- Deliberately does not use gendered pronouns for Satoshi. Uses "Satoshi" as name only.
- Companion to "Bitcoin Was Never Supposed to Be an Investment." That piece argued Bitcoin's purpose. This piece argues Bitcoin's citizenship. Together they form a two-part frame on where the movement is drifting and how to correct course.
- The opening paragraph explicitly grounds the piece in respect for Adam Back's stature. The counter-argument section explicitly acknowledges the strongest reply Adam's framework will elicit ("you just don't get to dictate the outcome") and defuses it before continuing. Both are anticipatory softening for a Bitcoin-Twitter audience that will be prepared to attack.
- Suggested cover image: a wide-format photograph of many hands holding a single line of text or a single note, symbolizing many plebs, one signal. Or a mosaic-tile illustration of small transactions building into a larger form.
