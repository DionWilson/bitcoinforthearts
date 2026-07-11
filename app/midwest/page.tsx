import type { Metadata } from 'next';
import Link from 'next/link';
import FullBleedHero from '@/components/FullBleedHero';
import MidwestCountdown from './MidwestCountdown';

export const metadata: Metadata = {
  title: 'BFTA Bitcoin Arts Park at the Midwest Bitcoin Summit',
  description:
    'Bitcoin for the Arts is bringing Bitcoin Arts Park to the Midwest Bitcoin Summit. September 23\u201324, 2026 at the Greater Columbus Convention Center, Columbus, Ohio. A dedicated cultural footprint with a live presentation of Dirty Coin by director Alana Mediavilla, Secondary Stage performances by Ainsley Costello and other working artists, a peer-to-peer Lightning silent auction, and live podcast tapings. Sponsor, support in-kind, or volunteer.',
  openGraph: {
    title: 'Bitcoin Arts Park — BFTA at the Midwest Bitcoin Summit',
    description:
      'BFTA × Midwest Bitcoin Summit · September 23–24, 2026 · Columbus, OH. Live presentation of Dirty Coin with director Alana Mediavilla, Secondary Stage performances by Ainsley Costello and other working artists, peer-to-peer Lightning silent auction, live podcast tapings. Sponsor, support in-kind, or volunteer.',
    type: 'website',
  },
};

export default function MidwestPage() {
  const heroImage = '/21-artist.jpg';
  const sponsorEmail = 'info@bitcoinforthearts.org';
  const ein = '41-2642260';

  /* ──────────────────────────── EVENT PROGRAMMING ──────────────────────────── */

  const programming = [
    {
      title: 'Dirty Coin \u2014 Live with Alana Mediavilla',
      detail:
        'A live presentation and audience Q&A of Dirty Coin, the most-screened Bitcoin documentary in the world, hosted inside the BFTA Bitcoin Arts Park by director Alana Mediavilla, founder of Campo Libre.',
    },
    {
      title: 'BFTA Film Cinema',
      detail:
        'A curated cinema running independent Bitcoin-aligned films across both days. Silent-disco wireless headphones, no audio bleed into the hall. Theater seating and a programmed schedule.',
    },
    {
      title: 'Secondary Stage Performances',
      detail:
        'Two days of lunch-hour live performances on the Summit\u2019s Secondary Stage, anchored by Ainsley Costello and additional working artists. Professional sound, broadcast to Nostr live.',
    },
    {
      title: 'Peer-to-Peer Lightning Silent Auction',
      detail:
        'A gallery wall of donated artworks running a live Lightning silent auction. Bidders scan a QR, bid in sats, and the leaderboard updates in real time. Bitcoin-native and gallery-grade.',
    },
    {
      title: 'Living Room \u0026 Lightning Wallet Demo',
      detail:
        'The brand and conversation hub of Bitcoin Arts Park. Lounge seating, a self-serve Lightning wallet demo station, and an IndeeHub activation. Where the room gathers between performances.',
    },
    {
      title: 'Share Your Bitcoin Journey \u2014 Live Tapings',
      detail:
        'Live on-site podcast tapings of BFTA\u2019s flagship show, with artists, builders, and patrons recorded across both days. Multiple episodes captured for distribution.',
    },
    {
      title: 'On-Camera Artist Stories',
      detail:
        'A dedicated on-camera production capturing first-person Artist Stories at the booth. Distributed through BFTA\u2019s newsletter, Substack, and Nostr post-event.',
    },
    {
      title: 'BFTA Merchandise \u0026 Donation Counter',
      detail:
        'A front counter for BFTA merchandise, artist marketplace items, and Lightning-native donations. Tap-to-pay enabled. Funds support the BFTA artist grants program.',
    },
    {
      title: 'Live Broadcast to Nostr',
      detail:
        'All Secondary Stage performances and key Bitcoin Arts Park moments streamed to Nostr in real time. The room reaches a global Bitcoin audience that can boost the artists live.',
    },
  ];

  /* ──────────────────────────── SPONSOR TIERS ──────────────────────────── */

  const sponsorTiers = [
    {
      name: 'Presenting Sponsor',
      price: '$25,000',
      slots: '1 slot (possibly 2)',
      featured: true,
      benefits: [
        'Co-branded as "Bitcoin Arts Park, presented by [Sponsor]"',
        'Lead-billing logo on the 30 ft overhead banner spanning the full BFTA footprint',
        'Prominent logo across all three zones \u2014 the Cinema, the Living Room, and the Gallery wall',
        'Acknowledgment at every Secondary Stage performance and at each on-site podcast taping',
        'One named-performance sponsorship included ($2,500 value)',
        'First mention in every BFTA newsletter from announcement through year-end',
        'Sponsor branding throughout the post-event recap video',
        'Permanent listing on BFTA Sponsors page and in the 2026 transparency report',
        'Tax-deductible to the full extent of the law',
      ],
    },
    {
      name: 'Cinema Sponsor',
      price: '$15,000',
      slots: '1\u20132 slots',
      featured: false,
      benefits: [
        'The BFTA Film Cinema takes the sponsor\u2019s name \u2014 "The [Sponsor] Cinema"',
        'Logo on cinema entrance signage, the projection wall header, and every silent-disco headphone placard',
        'Named credit before each film screening across both days',
        'Two named-performance sponsorships included',
        'Featured in BFTA newsletter and post-event recap',
        'Permanent listing on BFTA Sponsors page',
        'Tax-deductible',
      ],
    },
    {
      name: 'Lightning Lounge Sponsor',
      price: '$10,000',
      slots: '1 slot',
      featured: false,
      benefits: [
        'The Living Room Lightning demo zone takes the sponsor\u2019s name \u2014 "The [Sponsor] Lightning Lounge"',
        'On-site staffed Lightning wallet activation in the Living Room, branded throughout',
        'Lightning QR codes on every silent auction piece routed through the sponsor\u2019s wallet (every zap demos their product)',
        'Sponsor logo on every Lightning QR placard, the program, and the livestream',
        '2-minute demo slot during a Secondary Stage break',
        'Featured in BFTA newsletter and post-event recap',
        'Permanent listing on BFTA Sponsors page',
        'Tax-deductible',
      ],
    },
    {
      name: 'Programming Sponsor',
      price: '$7,500',
      slots: '1 slot',
      featured: false,
      benefits: [
        'Named credit on the Secondary Stage program \u2014 "Performances presented by [Sponsor]"',
        'Named credit in the live podcast taping intro/outro \u2014 "This live taping of Share Your Bitcoin Journey is presented by [Sponsor]"',
        'Sponsor logo on the Nostr livestream lower-third during performances',
        'One named-performance sponsorship included',
        'Featured in BFTA newsletter and post-event recap',
        'Permanent listing on BFTA Sponsors page',
        'Tax-deductible',
      ],
    },
    {
      name: 'Sponsor a Performance',
      price: '$2,500',
      slots: '4\u20136 slots',
      featured: false,
      benefits: [
        'Named program credit \u2014 "[Artist] presented by [Sponsor]"',
        'Personal thank-you from the artist during their set introduction',
        'Logo on artist\u2019s program card and on the livestream lower-third during their performance',
        'Sponsor name in post-event social posts about that artist',
        'Listing on BFTA Sponsors page',
        'Tax-deductible',
      ],
    },
    {
      name: 'Silent Auction Underwriter',
      price: '$2,500',
      slots: '1 slot',
      featured: false,
      benefits: [
        'The peer-to-peer Lightning silent auction is named \u2014 "The [Sponsor] Silent Auction"',
        'Live closing moment on stage with sponsor named',
        'Sponsor logo on every auction QR placard, the Gallery wall header, and the livestream',
        'Proceeds support a Bitcoin micro-grant for a featured BFTA artist in the sponsor\u2019s name',
        'Listing on BFTA Sponsors page',
        'Tax-deductible',
      ],
    },
    {
      name: 'Featured Artist Stipend',
      price: '$500',
      slots: '4\u20138 slots',
      featured: false,
      benefits: [
        'Named credit on the featured artist\u2019s program card \u2014 "[Artist], stipend supported by [Sponsor]"',
        'Listing in event program and on BFTA Sponsors page',
        'Tax-deductible',
      ],
    },
    {
      name: 'Friend of Bitcoin Arts Park',
      price: '$1,000',
      slots: 'Open',
      featured: false,
      benefits: [
        'Logo on a shared "Made possible by" wall card inside the footprint',
        'Mention in BFTA newsletter and post-event recap',
        'Listing on BFTA Sponsors page',
        'Tax-deductible',
      ],
    },
  ];

  /* ──────────────────────────── IN-KIND ASKS ──────────────────────────── */

  const inKindAsks = [
    {
      label: 'Booth construction & on-site production staff',
      detail:
        'Modular booth build labor, install, and dismantle. On-site production crew for A/V setup and run-of-show (~$3,000\u2013$6,000 value).',
    },
    {
      label: 'A/V production support',
      detail:
        'Projection, large-screen displays, silent-disco wireless headphones, monitors, and media players for the BFTA Film Cinema and Lightning wallet demo (~$2,000\u2013$5,000 value).',
    },
    {
      label: 'Furniture & gallery lighting',
      detail:
        'Lounge seating, theater benches, counter, plinths, and track or pin lighting for the Gallery wall and Living Room zones of Bitcoin Arts Park (~$1,500\u2013$3,500 value).',
    },
    {
      label: 'Photography & videography',
      detail:
        'On-site coverage of the booth, performances, and live podcast tapings, plus an edited recap reel for downstream use (~$3,000\u2013$5,000 value).',
    },
    {
      label: 'Lightning hardware & wallet demos',
      detail:
        'Tap-to-pay terminals, NFC cards, hardware wallets, and demo devices for the BFTA Living Room and donation counter. A natural fit for any Lightning or hardware vendor (~$1,000\u2013$3,000 value).',
    },
    {
      label: 'Backline gear for live performances',
      detail:
        'Instruments, amps, drum kit, keyboard for Ainsley Costello and the Secondary Stage performers (~$1,500\u2013$3,000 value).',
    },
    {
      label: 'Catering & beverage',
      detail:
        'Meals or coffee for artists, crew, and BFTA volunteers during install and show days (~$2,000\u2013$5,000 value).',
    },
    {
      label: 'Travel & lodging for performing artists',
      detail:
        'Hotel rooms or flights for performing artists and the BFTA team coming to Columbus (~$1,500\u2013$5,000 value).',
    },
    {
      label: 'Print & signage',
      detail:
        'Booth back-wall graphics, the 30 ft overhead banner, gallery wall cards, programs, and donation-counter signage (~$500\u2013$2,000 value).',
    },
    {
      label: 'Donated artwork for the Lightning silent auction',
      detail:
        'Artists donating original work to the BFTA peer-to-peer Lightning silent auction on the Gallery wall. Proceeds (in whole or in part, by the artist\u2019s preference) support BFTA\u2019s artist grants program. Each donor publicly named.',
    },
  ];

  /* ──────────────────────────── FAQ ──────────────────────────── */

  const faqs = [
    {
      q: 'What is BFTA\u2019s role at the Midwest Bitcoin Summit?',
      a: 'Bitcoin for the Arts programs its own dedicated cultural footprint, Bitcoin Arts Park, on the Expo Hall floor at the Midwest Bitcoin Summit. The Midwest Summit leadership team has given BFTA a 30 ft footprint where we program a film cinema, a Lightning silent auction, the Living Room and wallet demo, the merchandise and donation counter, and access to the Secondary Stage for two days of live performances.',
    },
    {
      q: 'Is BFTA co-curating the visual art gallery?',
      a: 'No. The visual art gallery at the Midwest Bitcoin Summit will go forward under the leadership of curator Kyle Knight and is focused on visual art. BFTA programs Bitcoin Arts Park separately on the floor. We support the gallery and wish it every success.',
    },
    {
      q: 'Can a single sponsor combine tiers?',
      a: 'Yes. A sponsor can take a tier and also sponsor a named performance on the same agreement. Tiers stack, and the recognition for each is delivered as described.',
    },
    {
      q: 'Are sponsorships tax-deductible?',
      a: `Yes. Bitcoin for the Arts, Inc. is a 501(c)(3) tax-exempt nonprofit, EIN ${ein}. Sponsorships are tax-deductible to the full extent allowed by law.`,
    },
    {
      q: 'How does the Lightning silent auction work?',
      a: 'Artists donate original works to the Gallery wall of Bitcoin Arts Park. Each piece carries a QR code; bidders scan, bid in sats, and the leaderboard updates in real time. Proceeds (in whole or in part, by the artist\u2019s preference) support BFTA\u2019s artist grants program.',
    },
    {
      q: 'When are artist and sponsor announcements going public?',
      a: 'Artists and sponsors are named publicly only after each is confirmed in writing. Subscribers to the BFTA newsletter are first to hear as pieces lock in.',
    },
    {
      q: 'How do I get in touch?',
      a: `Email us at ${sponsorEmail}. Warm introductions are prioritized over cold outreach.`,
    },
  ];

  /* ──────────────────────────── PAGE ──────────────────────────── */

  return (
    <main className="bg-background">
      <FullBleedHero
        imageSrc={heroImage}
        imageAlt="Bitcoin Arts Park by Bitcoin for the Arts at the Midwest Bitcoin Summit · September 23–24, 2026, Columbus, Ohio."
        label="BFTA × Midwest Bitcoin Summit · Sept 23–24 · Columbus, OH"
        title="Bitcoin Arts Park."
        description="A dedicated cultural footprint by Bitcoin for the Arts on the floor of the Midwest Bitcoin Summit. A live presentation of Dirty Coin with director Alana Mediavilla, two days of Secondary Stage performances by Ainsley Costello and other working artists, a peer-to-peer Lightning silent auction, live podcast tapings, and a wallet demo. Working artists paid in Bitcoin, in front of the audience that already understands sound money."
        titleClassName="text-3xl sm:text-5xl"
        priority
      >
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${sponsorEmail}?subject=Midwest%20Summit%20Sponsorship`}
            className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
          >
            Sponsor an Artist →
          </a>
          <a
            href="#volunteer"
            className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
          >
            Volunteer →
          </a>
          <Link
            href="/connect"
            className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
          >
            Subscribe to Updates →
          </Link>
        </div>
      </FullBleedHero>

      {/* ── Countdown Band ────────────────────────── */}
      <section className="border-y border-border bg-foreground py-10 text-background sm:py-14">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-widest opacity-70 sm:text-xs">
              Counting down to Bitcoin Arts Park
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              September 23–24, 2026 · Columbus, Ohio
            </h2>
          </div>

          <div className="mt-8">
            <MidwestCountdown />
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <p className="max-w-xl text-sm leading-relaxed opacity-80">
              The Midwest Bitcoin Summit runs both days at the Greater Columbus Convention Center, 10:00 AM – 5:00 PM. Bitcoin Arts Park is BFTA\u2019s dedicated 30 ft cultural footprint on the Expo Hall floor inside the Summit.
            </p>
            <a
              href="https://www.midwestbtc.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-background/30 bg-background/10 px-6 py-3 text-sm font-semibold transition-colors hover:bg-background/20"
            >
              Visit the Midwest Bitcoin Summit →
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-14">
        {/* ── Why Columbus, Why Now ────────────────────── */}
        <section className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Why Columbus, Why Now
          </div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Bringing the culture in.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted">
            Bitcoin conferences have grown into serious institutions. What has been quietly missing alongside them is a curatorial counterpart \u2014 a serious cultural room, with serious working artists, treated as central to the programming rather than peripheral to it. <strong className="text-foreground">Bitcoin Arts Park</strong> is that room, and Columbus is where Bitcoin for the Arts is building it.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Bitcoin Arts Park is a dedicated 30 ft cultural footprint on the floor of the Midwest Bitcoin Summit, programmed end-to-end by BFTA. A film cinema anchored by a live presentation of <em>Dirty Coin</em> with director <strong className="text-foreground">Alana Mediavilla</strong>. Two days of Secondary Stage performances led by <strong className="text-foreground">Ainsley Costello</strong> and additional working artists. A peer-to-peer Lightning silent auction on the Gallery wall. A Living Room with a Lightning wallet activation. Live tapings of <em>Share Your Bitcoin Journey</em> recorded on-site.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            The audience is the reason. The room at the Midwest Summit is a crowd of Bitcoiners who already understand sound money \u2014 and who are, by every definition, the future patron base for the next generation of working artists. Bringing real artists into that room, paid in Bitcoin, supported by infrastructure that lets the audience zap them in real time, is exactly the kind of moment our 501(c)(3) was built to create.
          </p>
        </section>

        {/* ── Two Days at Bitcoin Arts Park (Programming) ────────────────────── */}
        <section className="mt-16">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            What&rsquo;s Happening
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Two days at Bitcoin Arts Park.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            Nine programming threads run across the two days of the summit. Most happen in parallel inside the BFTA Bitcoin Arts Park footprint and on the adjacent Secondary Stage. All of it is built to put working artists in front of a Bitcoin audience that can support them directly.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {programming.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-surface/60 p-6"
              >
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How To Sponsor ────────────────────── */}
        <section className="mt-16">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            How To Sponsor
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Sponsorship tiers.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            Eight tiers. Pick the one that fits your organization. Sponsorships are tax-deductible to the full extent allowed by law \u2014 Bitcoin for the Arts, Inc. is a 501(c)(3) tax-exempt nonprofit, EIN <strong className="text-foreground">{ein}</strong>. Tailored sponsorships above the Presenting tier are also welcome.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {sponsorTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl bg-surface/60 p-6 sm:p-8 ${
                  tier.featured ? 'border-2 border-accent' : 'border border-border'
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <div
                      className={`text-xs font-semibold uppercase tracking-wide ${
                        tier.featured ? 'text-accent' : 'text-muted'
                      }`}
                    >
                      {tier.slots}
                    </div>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                      {tier.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-semibold tracking-tight text-foreground">
                      {tier.price}
                    </div>
                  </div>
                </div>
                <ul className="mt-6 space-y-2 text-sm leading-relaxed text-muted">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:${sponsorEmail}?subject=Midwest%20Summit%20\u2014%20${encodeURIComponent(
                    tier.name,
                  )}`}
                  className="mt-6 inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:opacity-90"
                >
                  Discuss This Tier →
                </a>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
            Our Midwest fundraising target is <strong className="text-foreground">$80,000+</strong> \u2014 the level that lets us build Bitcoin Arts Park to professional production standards, pay the working artists like the professionals they are, and turn the weekend into a body of evergreen content for the BFTA community.
          </p>
        </section>

        {/* ── In-Kind Support ────────────────────── */}
        <section className="mt-16">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Other Ways to Support
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            In-kind contributions.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            Cash isn&rsquo;t the only way to support the event. Goods and services contributed in-kind are tax-deductible at fair market value, and each donor is publicly named. Below are the categories where in-kind support matters most.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {inKindAsks.map((ask) => (
              <div
                key={ask.label}
                className="rounded-2xl border border-border bg-surface/60 p-5"
              >
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {ask.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{ask.detail}</p>
              </div>
            ))}
          </div>

          <a
            href={`mailto:${sponsorEmail}?subject=Midwest%20Summit%20\u2014%20In-Kind%20Contribution`}
            className="mt-8 inline-flex items-center justify-center rounded-md border-2 border-foreground/20 bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
          >
            Offer an In-Kind Contribution →
          </a>
        </section>

        {/* ── Volunteer teaser (full form lives at /midwest/volunteer) ────────────────────── */}
        <section id="volunteer" className="mt-16 rounded-2xl border border-accent/30 bg-surface/60 p-6 sm:p-10">
          <div className="text-xs font-semibold uppercase tracking-wide text-accent">
            Volunteer with Us
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Be in the room. Make it happen.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            Two days, nine programming threads, working artists from across the country in one room, and a small core team holding it all together. If you can give time during load-in (Tuesday, Sept 22), the show days (Wednesday and Thursday, Sept 23 and 24), load-out (Thursday evening, Sept 24), or pre-event remote help, sign up on our dedicated Midwest volunteer page.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/midwest/volunteer"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
            >
              Volunteer with BFTA →
            </Link>
            <a
              href="mailto:volunteer@bitcoinforthearts.org?subject=Midwest%20volunteer%20question"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-foreground/20 bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
            >
              Email volunteer@bitcoinforthearts.org
            </a>
          </div>
        </section>

        {/* ── The Bitcoin Arts Park Brief ────────────────────── */}
        <section className="mt-16">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            The Footprint
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Bitcoin Arts Park.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            Bitcoin Arts Park is a dedicated 30 ft cultural footprint on the Expo Hall floor of the Midwest Bitcoin Summit, programmed end-to-end by Bitcoin for the Arts. The footprint is organized as three connected zones \u2014 a film cinema, a Living Room with Lightning wallet demo and merchandise counter, and a Gallery wall with peer-to-peer Lightning silent auction \u2014 with access to the adjacent Secondary Stage for two days of programmed live performances.
          </p>
        </section>

        {/* ── FAQ ────────────────────── */}
        <section className="mt-16">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            FAQ
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            A few quick answers.
          </h2>

          <div className="mt-8 divide-y divide-border border-y border-border">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-6">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {faq.q}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer CTA ────────────────────── */}
        <section className="mt-16 rounded-2xl border border-border bg-surface/60 p-8 sm:p-10">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Stay close to this
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Be in the room when the lineup locks.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Subscribers to the BFTA newsletter are the first to hear as artists and sponsors confirm. Get on the list to follow what we&rsquo;re building in Columbus.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/connect"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
            >
              Subscribe to Updates →
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-md border border-foreground/20 bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
            >
              Donate →
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center justify-center rounded-md border border-foreground/20 bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
            >
              Read the Research →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
