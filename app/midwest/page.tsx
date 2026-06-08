import type { Metadata } from 'next';
import Link from 'next/link';
import FullBleedHero from '@/components/FullBleedHero';
import MidwestVolunteerForm from './MidwestVolunteerForm';
import MidwestCountdown from './MidwestCountdown';

export const metadata: Metadata = {
  title: 'BFTA at the Midwest Bitcoin Summit',
  description:
    'Bitcoin for the Arts is co-curating Generations with Kyle Knight at the Midwest Bitcoin Summit. September 23\u201324, 2026, Greater Columbus Convention Center, Columbus, Ohio. Live performances, visual art, live painting, podcast station, artist panel, Lightning Lounge, and raffles. Sponsor a working artist for $2,500, take a sponsorship tier, contribute in-kind, or volunteer.',
  openGraph: {
    title: 'Where Culture Meets Sound Money — BFTA at the Midwest Bitcoin Summit',
    description:
      'BFTA × Midwest Bitcoin Summit · September 23–24, 2026 · Columbus, OH. Live performances, visual art, live painting, podcast station, panel, Lightning Lounge, raffles. Sponsor, support in-kind, or volunteer.',
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
      title: 'Live Performances',
      detail:
        '6\u201310 working artists performing live across two days. Professional broadcast sound. Ticketed audience and Bitcoiners alike.',
    },
    {
      title: 'Visual Artist Showcase',
      detail:
        '10\u201315 visual artists featured on the gallery walls of Generations. Lightning QR codes on every piece, so the audience can zap the artist directly.',
    },
    {
      title: 'Live Painting',
      detail:
        'A featured artist creating a piece in real time across the run of the event. The work itself becomes the room\u2019s anchor moment.',
    },
    {
      title: 'Share Your Bitcoin Journey \u2014 Live',
      detail:
        'A dedicated podcast station where artists, builders, and patrons record episodes of BFTA\u2019s podcast on-site. Multiple episodes captured over two days.',
    },
    {
      title: 'Artist Discussion Panel',
      detail:
        'A moderated conversation with featured artists about how Bitcoin and value-for-value are reshaping the working creative life. Open to all attendees.',
    },
    {
      title: 'Lightning Lounge',
      detail:
        'Staffed on-site Lightning wallet onboarding for first-time users. The lounge that turns Lightning curiosity into a working wallet and a real first transaction.',
    },
    {
      title: 'Live Broadcast to Nostr',
      detail:
        'All live music performances streamed to Nostr in real time. The room reaches a global Bitcoin audience that can boost the artists live during their sets.',
    },
    {
      title: 'Artist Funding Raffle',
      detail:
        'Underwritten by a sponsor. A randomly selected applying artist wins a $2,500 Bitcoin micro-grant in the sponsor\u2019s name, drawn live on stage.',
    },
    {
      title: 'Artwork Raffle',
      detail:
        'Open to any attendee. The winner takes home an original work donated by a featured artist. One ticket, one chance at a piece of working art.',
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
        'Co-branded as "Bitcoin for the Arts at Generations, presented by [Sponsor]"',
        'Dedicated branded booth space inside the gallery floor (the only tier that includes a booth)',
        'Prominent logo placement on the BFTA wall installation, panel stage backdrop, and podcast set',
        '2-minute speaking slot at the BFTA mission panel',
        'One named-artist sponsorship included ($2,500 value)',
        'First mention in every BFTA newsletter from announcement through year-end',
        'Sponsor branding throughout the post-event recap video',
        'Permanent listing on BFTA Sponsors page and in the 2026 transparency report',
        'Tax-deductible to the full extent of the law',
      ],
    },
    {
      name: 'Curatorial Sponsor',
      price: '$15,000',
      slots: '2 slots',
      featured: false,
      benefits: [
        'Standing banner placement inside the gallery (no booth)',
        'Logo on the gallery wall as the named "Visual Artists Sponsor"',
        'Named recognition with the visual artist program — "Visual Artists Program presented by [Sponsor]"',
        'Sponsor logo on the livestream lower-third during gallery walkthroughs',
        'Two named-artist sponsorships included',
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
        'The Lightning Lounge takes the sponsor\u2019s name \u2014 "The [Sponsor] Lightning Lounge"',
        'On-site staffed onboarding station inside the gallery, branded throughout',
        'Lightning QR codes on all artworks routed through the sponsor\u2019s wallet (every zap demos their product)',
        'Sponsor logo on every Lightning QR placard, the program, and the livestream',
        '2-minute demo or speaking slot during the panel programming',
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
        'Logo on the panel stage backdrop',
        'Named credit in the live podcast taping intro/outro \u2014 "This live taping of Share Your Bitcoin Journey is presented by [Sponsor]"',
        'Logo on livestream lower-third during the panel',
        'One named-artist sponsorship included',
        'Featured in BFTA newsletter and post-event recap',
        'Permanent listing on BFTA Sponsors page',
        'Tax-deductible',
      ],
    },
    {
      name: 'Sponsor an Artist',
      price: '$2,500',
      slots: '8\u201310 slots',
      featured: false,
      benefits: [
        'Named program credit \u2014 "[Artist] presented by [Sponsor]"',
        'Personal thank-you from the artist during their set introduction',
        'Logo on artist\u2019s program card and livestream lower-third during their performance',
        'Sponsor name in post-event social posts about that artist',
        'Listing on BFTA Sponsors page',
        'Tax-deductible',
      ],
    },
    {
      name: 'Raffle Underwriter',
      price: '$2,500',
      slots: '1 slot',
      featured: false,
      benefits: [
        'The Artist Funding Raffle is named \u2014 "The [Sponsor] Artist Funding Raffle"',
        'Live raffle moment on stage with sponsor named',
        'Sponsor logo on all raffle materials and livestream lower-third during the draw',
        'Winning artist receives the $2,500 Bitcoin micro-grant in the sponsor\u2019s name',
        'Listing on BFTA Sponsors page',
        'Tax-deductible',
      ],
    },
    {
      name: 'Visual Artist Stipend',
      price: '$500',
      slots: '8\u201315 slots',
      featured: false,
      benefits: [
        'Named credit on the visual artist\u2019s wall card \u2014 "[Artist], stipend supported by [Sponsor]"',
        'Listing in event program and on BFTA Sponsors page',
        'Tax-deductible',
      ],
    },
    {
      name: 'Friend of BFTA at Midwest',
      price: '$1,000',
      slots: 'Open',
      featured: false,
      benefits: [
        'Logo on a shared "Made possible by" wall card',
        'Mention in BFTA newsletter and post-event recap',
        'Listing on BFTA Sponsors page',
        'Tax-deductible',
      ],
    },
  ];

  /* ──────────────────────────── IN-KIND ASKS ──────────────────────────── */

  const inKindAsks = [
    {
      label: 'A/V production support',
      detail:
        'Beyond the equipment Phantom Power Music has donated \u2014 additional gear, monitor mixing, or stage backline (~$2,000\u2013$5,000 value).',
    },
    {
      label: 'Photography & videography',
      detail:
        'On-site coverage of the performances, gallery, and panel + edited recap reel for downstream use (~$3,000\u2013$5,000 value).',
    },
    {
      label: 'Hardware wallets for artists',
      detail:
        'A great fit for any hardware vendor who wants to put their device in the hands of working artists who will talk about it on the broadcast (~$1,500\u2013$3,000 value).',
    },
    {
      label: 'Backline gear for live music',
      detail:
        'Instruments, amps, drum kit, keyboard. A real contribution to the live performance program (~$1,500\u2013$3,000 value).',
    },
    {
      label: 'Live painting materials',
      detail:
        'Canvases, paints, brushes, easels for the featured live painter (~$300\u2013$800 value).',
    },
    {
      label: 'Catering & beverage',
      detail:
        'Meals or coffee for artists and crew during install and show days (~$2,000\u2013$5,000 value).',
    },
    {
      label: 'Travel & lodging for performing artists',
      detail:
        'Hotel rooms or flights for one or more featured artists (~$1,500\u2013$5,000 value).',
    },
    {
      label: 'Print & signage',
      detail:
        'Sponsor banners, wall labels, programs, step-and-repeat (~$500\u2013$1,500 value).',
    },
    {
      label: 'Donated artwork (auction, raffle, or sale)',
      detail:
        'Artists donating original work to BFTA \u2014 for use in a silent auction, the artwork raffle, or direct sale. Proceeds (in whole or in part, by the artist\u2019s preference) support BFTA\u2019s artist grants program. A featured artist has already donated one piece. Each additional donor publicly named.',
    },
  ];

  /* ──────────────────────────── FAQ ──────────────────────────── */

  const faqs = [
    {
      q: 'What is BFTA\u2019s role at the Midwest Bitcoin Summit?',
      a: 'Bitcoin for the Arts is co-curating Generations with Kyle Knight inside the Midwest Bitcoin Summit. Together we program the gallery: live performances, visual art, live painting, podcast station, artist panel, and Lightning Lounge.',
    },
    {
      q: 'Can a single sponsor combine tiers?',
      a: 'Yes. A sponsor can name a specific artist and take a curatorial tier on the same agreement. Tiers stack, and the recognition for each is delivered as described.',
    },
    {
      q: 'Are sponsorships tax-deductible?',
      a: `Yes. Bitcoin for the Arts, Inc. is a 501(c)(3) tax-exempt nonprofit, EIN ${ein}. Sponsorships are tax-deductible to the full extent allowed by law.`,
    },
    {
      q: 'How does the Artist Funding Raffle work?',
      a: 'The raffle is underwritten by a sponsor (the Raffle Underwriter tier). Participating artists submit an entry; one is drawn live on stage during the event. The winning artist receives a $2,500 Bitcoin micro-grant paid in the sponsor\u2019s name.',
    },
    {
      q: 'How does the Artwork Raffle work?',
      a: 'Open to any attendee. Tickets are sold during the event; the winner takes home an original artwork donated by a featured artist. Proceeds support BFTA\u2019s artist grants program.',
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
        imageAlt="Bitcoin for the Arts at the Midwest Bitcoin Summit · September 23–24, 2026, Columbus, Ohio."
        label="BFTA × Midwest Bitcoin Summit · Sept 23–24 · Columbus, OH"
        title="Where Culture Meets Sound Money."
        description="Two days of live performances, visual art, a live painting, a podcast station, an artist panel, and a Lightning Lounge — co-curated by Bitcoin for the Arts inside Generations at the Midwest Bitcoin Summit. Working artists, paid in Bitcoin. The audience that already understands sound money — meeting the artists who deserve it."
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
              Counting down to Generations
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
              The Midwest Bitcoin Summit runs both days at the Greater Columbus Convention Center, 10:00 AM – 5:00 PM. Generations is the gallery and live-programming room inside it.
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
            Bitcoin conferences have grown into serious institutions. What has been quietly missing alongside them is a curatorial counterpart — a serious cultural room, with serious working artists, treated as central to the programming rather than peripheral to it. <em>Generations</em> is that room, and Columbus is where Bitcoin for the Arts is going to help build it.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            <em>Generations</em> is co-curated by <strong className="text-foreground">Kyle Knight</strong> — a producer with deep roots in the Bitcoin culture world — and <strong className="text-foreground">Bitcoin for the Arts</strong>. Together we program the gallery: live performances, visual art, live painting, the podcast station, the artist panel, and the Lightning Lounge inside a 100×60 footprint.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            The audience is the reason. The room at the Midwest Summit is a crowd of Bitcoiners who already understand sound money — and who are, by every definition, the future patron base for the next generation of working artists. Bringing real artists into that room, paid in Bitcoin, supported by infrastructure that lets the audience zap them in real time, is exactly the kind of moment our 501(c)(3) was built to create.
          </p>
        </section>

        {/* ── Two Days at Generations (NEW: Programming) ────────────────────── */}
        <section className="mt-16">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            What&rsquo;s Happening
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Two days at Generations.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            Nine programming threads run across the two days of the summit. Most happen in parallel inside the gallery footprint. All of it is built to put working artists in front of a Bitcoin audience that can support them directly.
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
            Eight tiers. Pick the one that fits your organization. Sponsorships are tax-deductible to the full extent allowed by law — Bitcoin for the Arts, Inc. is a 501(c)(3) tax-exempt nonprofit, EIN <strong className="text-foreground">{ein}</strong>. Tailored sponsorships above the Presenting tier are also welcome.
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
            Our Midwest fundraising target is <strong className="text-foreground">$80,000+</strong> — the level that lets us bring working artists into Columbus and pay them like the working professionals they are.
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

        {/* ── Volunteer ────────────────────── */}
        <section id="volunteer" className="mt-16 rounded-2xl border border-accent/30 bg-surface/60 p-6 sm:p-10">
          <div className="text-xs font-semibold uppercase tracking-wide text-accent">
            Volunteer with Us
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Be in the room. Make it happen.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            Two days, nine programming threads, working artists from across the country in one room — and a small core team holding it all together. If you can give time during install (Sept 22), the show days (Sept 23–24), strike (Sept 25), or pre-event remote help, sign up here. We&rsquo;ll be in touch as the event gets closer with specific roles and the run-of-show.
          </p>

          <div className="mt-8 max-w-2xl">
            <MidwestVolunteerForm />
          </div>
        </section>

        {/* ── The Generations Brief ────────────────────── */}
        <section className="mt-16">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            The Curatorial Frame
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Generations.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            <em>Generations</em> is a curated cultural installation inside the Midwest Bitcoin Summit, organized as four named zones across roughly a 100×60 footprint. It is <strong className="text-foreground">co-curated by Kyle Knight and Bitcoin for the Arts</strong>.
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
