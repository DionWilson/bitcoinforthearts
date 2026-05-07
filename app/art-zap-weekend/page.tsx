import type { Metadata } from 'next';
import Link from 'next/link';
import FullBleedHero from '@/components/FullBleedHero';

export const metadata: Metadata = {
  title: 'Art + Zap Weekend',
  description:
    'A Bitcoin-funded fundraiser for Bitcoin For The Arts. A one-day, 4.5-hour, 21-artist Bitcoin podcast livestream leading into one in-person night at Pubkey DC, Washington, DC — September 2026. Sponsorship tiers, in-kind opportunities, and how to support the first 501(c)(3) Bitcoin arts benefit.',
  openGraph: {
    title: 'Art + Zap Weekend — Bitcoin For The Arts',
    description:
      'A Bitcoin-funded fundraiser for Bitcoin For The Arts. 4.5-hour, 21-artist livestream + one in-person night at Pubkey DC. September 2026. Sponsor + support.',
    type: 'website',
  },
};

export default function ArtZapWeekendPage() {
  const heroImage = '/21-artist.jpg';
  const sponsorEmail = 'sponsor@bitcoinforthearts.org';
  const ein = '41-2642260';

  const tiers = [
    {
      name: 'Title Sponsor',
      price: '$25,000',
      slots: '1 slot',
      featured: true,
      benefits: [
        'Co-branding: "Art + Zap Weekend, presented by [Sponsor]"',
        'Persistent on-screen logo throughout the 4.5-hour livestream',
        '5-minute branded segment during the livestream',
        'Title billing on the in-person night at Pubkey DC',
        'Persistent on-stage branding + stage banner + step-and-repeat at the in-person night',
        'Title billing on all event collateral (digital + print) and post-event recap',
        '6 reserved seats / VIP table at the in-person night',
        'Named silent-auction lot ("The [Sponsor Name] Lot")',
        '6 dedicated co-promotion social posts before, during, and after',
        'Permanent listing in BFTA 2026 transparency report and Sponsors page',
      ],
    },
    {
      name: 'Supporting Sponsor',
      price: '$10,000',
      slots: '3 slots',
      featured: false,
      benefits: [
        'Rotating on-screen logo throughout the livestream',
        'Logo on the live donation / zap overlay during the stream',
        'Logo on signage at the in-person night',
        'Brief on-stage thank-you with sponsor logo card at the in-person night',
        '3 reserved seats at the in-person night',
        '3 dedicated co-promotion social posts',
        'Listing in BFTA 2026 transparency report',
      ],
    },
    {
      name: 'Friend of the Arts',
      price: '$5,000',
      slots: '5 slots',
      featured: false,
      benefits: [
        'Logo on the rotating sponsor card during the livestream',
        'Hosts read sponsor name in a thank-you scroll during the stream',
        'Logo on signage at the in-person night',
        '1 reserved seat at the in-person night',
        '1 dedicated co-promotion social post around the event',
        'Listing on BFTA Sponsors page',
      ],
    },
  ];

  const inKindAsks = [
    {
      label: 'A/V production',
      detail:
        'On-site sound + lighting at the Pubkey DC in-person night (~$2,000–$4,000 value).',
    },
    {
      label: 'Photography & videography',
      detail:
        'Coverage of the livestream and the in-person night + edited recap reel (~$2,000–$4,000 value).',
    },
    {
      label: 'Hardware wallets for artists',
      detail:
        'A great fit for any hardware vendor who wants to put their device in the hands of working artists who will talk about it on the livestream (~$1,000–$3,000 value).',
    },
    {
      label: 'Catering & beverage',
      detail:
        'Bar tab, beer/wine, or light food at the in-person night (~$2,000–$5,000 value).',
    },
    {
      label: 'Print & signage',
      detail:
        'Step-and-repeat, posters, printed sponsor signage for the in-person night (~$500–$1,500 value).',
    },
    {
      label: 'Travel & hospitality',
      detail:
        'Hotel rooms or travel for performing artists at the in-person night (~$1,500–$5,000 value).',
    },
    {
      label: 'Silent auction items',
      detail:
        'Hardware wallets, art prints, services, experiences for the in-person auction. Each donor publicly named.',
    },
  ];

  return (
    <main className="bg-background">
      <FullBleedHero
        imageSrc={heroImage}
        imageAlt="21 featured artists for Art + Zap Weekend."
        label="Art + Zap Weekend"
        title="A Bitcoin-funded fundraiser for the arts."
        description="A one-day, 4.5-hour Bitcoin podcast livestream featuring 21 artists, leading into one in-person night at Pubkey DC, Washington, DC. September 2026 — the first 501(c)(3) Bitcoin arts benefit."
        priority
      />

      <div className="mx-auto max-w-6xl px-6 py-14">
        {/* ── Intro ────────────────────────────────────── */}
        <section className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            About the event
          </div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Art + Zap Weekend
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Art + Zap Weekend is a <strong className="text-foreground">Bitcoin-funded fundraiser for Bitcoin For The Arts</strong>,
            our 501(c)(3) that funds artists nationwide through quarterly Bitcoin micro-grants. The event has two halves:
            a <strong className="text-foreground">one-day, 4.5-hour livestream featuring 21 artists</strong> across music, dance,
            theater, visual art, film, writing, and storytelling — hosted by Bitcoin podcasters and broadcast on YouTube, X, and
            Nostr — leading into <strong className="text-foreground">one in-person night at Pubkey DC</strong> in Washington, DC
            with live performance, a silent art auction, and a Broadway-caliber headliner. A handful of the stream&rsquo;s 21
            artists also perform live at the Pubkey night.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Audience donations route to BFTA and flow through our public 55/30/10/5 allocation. Featured artists also receive 100%
            of any optional direct tips sent to their personal Lightning addresses during their livestream segments and at the
            in-person night.
          </p>
        </section>

        {/* ── At-a-glance ──────────────────────────────── */}
        <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'When', value: 'Sept 2026', sub: 'Date locking with venue' },
            { label: 'Livestream', value: '4.5 hrs', sub: 'One-day broadcast, 21 artists' },
            { label: 'In-person night', value: 'Pubkey DC', sub: 'Washington, DC' },
            { label: 'Format', value: 'Live + auction', sub: 'Broadway-caliber headliner' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border bg-surface/80 p-5 text-center shadow-sm"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                {item.label}
              </div>
              <div className="mt-2 text-2xl font-semibold text-foreground">
                {item.value}
              </div>
              <div className="mt-1 text-xs text-muted">{item.sub}</div>
            </div>
          ))}
        </section>

        {/* ── Why this matters ────────────────────────── */}
        <section className="mt-12 rounded-2xl border border-border bg-surface/60 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Why this matters</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Federal arts funding is collapsing. The NEA was targeted for elimination in two consecutive federal budgets. State
            arts appropriations are projected to drop 7.7% nationally for FY2026. Artists are being told that the institutional
            funding model they depend on is no longer reliable.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Bitcoin and the Lightning Network make a non-state-dependent arts funding model possible for the first time. We are
            the first 501(c)(3) building it. <strong className="text-foreground">Sponsors at this event are written into the
            founding narrative.</strong>
          </p>
        </section>

        {/* ── Sponsor tiers ──────────────────────────── */}
        <section className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tight">Sponsorship tiers</h2>
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              9 slots total
            </span>
          </div>
          <p className="mt-3 text-base leading-relaxed text-muted">
            All tiers are payable in USD (card / wire / ACH) or Bitcoin (on-chain or Lightning).
            Bitcoin For The Arts, Inc. is a registered 501(c)(3); all sponsorships are tax-deductible
            to the extent allowed by law.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={
                  tier.featured
                    ? 'rounded-2xl bg-[linear-gradient(135deg,#000000_0%,#FF4F14_55%,#B3FF48_100%)] p-[2px] shadow-lg'
                    : 'rounded-2xl border border-border bg-background p-[1px] shadow-sm'
                }
              >
                <div
                  className={
                    tier.featured
                      ? 'h-full rounded-[14px] bg-background p-6'
                      : 'h-full rounded-[14px] bg-background p-6'
                  }
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                        {tier.slots}
                      </div>
                      <div className="mt-1 text-xl font-semibold text-foreground">
                        {tier.name}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-accent">{tier.price}</div>
                  </div>

                  <ul className="mt-5 space-y-2">
                    {tier.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2 text-sm leading-relaxed text-muted"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <a
                      href={`mailto:${sponsorEmail}?subject=${encodeURIComponent(
                        `Art + Zap Weekend ${tier.name} interest`,
                      )}&body=${encodeURIComponent(
                        `Hi BFTA team,\n\nI'd like to learn more about the ${tier.name} sponsorship for Art + Zap Weekend.\n\nMy company: \nMy role: \nBest contact: \n\n`,
                      )}`}
                      className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
                    >
                      Inquire about {tier.name}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── In-kind ──────────────────────────────── */}
        <section className="mt-12 rounded-2xl border border-border bg-surface/60 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tight">In-kind sponsorship</h2>
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              Credited dollar-for-dollar
            </span>
          </div>
          <p className="mt-3 text-base leading-relaxed text-muted">
            In-kind contributions are credited dollar-for-dollar at the corresponding tier. We
            strongly encourage Bitcoin-native businesses, hardware vendors, and creative-services
            providers who can give in-kind.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {inKindAsks.map((ask) => (
              <div
                key={ask.label}
                className="rounded-xl border border-border bg-background p-4"
              >
                <div className="text-sm font-semibold text-foreground">{ask.label}</div>
                <p className="mt-1 text-sm leading-relaxed text-muted">{ask.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How donations flow ──────────────────── */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">
            How donations flow
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Honest framing: this is a <strong className="text-foreground">fundraiser FOR Bitcoin
            For The Arts</strong>, not a real-time direct-patronage event. Audience donations
            route to BFTA and feed our nationwide quarterly artist micro-grant cycle. Featured
            artists also receive 100% of any optional direct tips sent to their personal Lightning
            addresses during their livestream segments and at the in-person night.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
            {[
              { pct: '55%', label: 'Direct artist grants', sub: 'Quarterly micro-grants nationwide' },
              { pct: '30%', label: 'Programs', sub: 'Workshops, residencies, this event' },
              { pct: '10%', label: 'Operations', sub: 'Software, banking, admin' },
              { pct: '5%', label: 'HODL Vault', sub: 'Long-term Bitcoin endowment' },
            ].map((row) => (
              <div
                key={row.label}
                className="rounded-2xl border border-border bg-background p-5 text-center shadow-sm"
              >
                <div className="text-3xl font-bold text-accent">{row.pct}</div>
                <div className="mt-2 text-sm font-semibold text-foreground">{row.label}</div>
                <div className="mt-1 text-xs text-muted">{row.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why a sponsor cares ────────────────── */}
        <section className="mt-12 rounded-2xl border border-border bg-surface/60 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Why sponsors care</h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                title: 'First-mover story',
                body: 'Sponsors are written into the founding narrative of an arts-funding model built on Bitcoin rails.',
              },
              {
                title: 'Permanent on-brand content',
                body: 'Logos visible on every event clip and recap on YouTube, X, and Nostr — long after the event.',
              },
              {
                title: 'High-signal audience',
                body: 'Bitcoin + arts overlap = high-intent, high-net-worth, deeply loyal to brands that show up early.',
              },
              {
                title: 'Tax-deductible',
                body: `501(c)(3) with public governance, on-chain transparency, and EIN ${ein}.`,
              },
            ].map((item) => (
              <li key={item.title} className="rounded-xl border border-border bg-background p-4">
                <div className="text-sm font-semibold text-foreground">{item.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── CTA ─────────────────────────────────── */}
        <section className="mt-12 rounded-2xl bg-primary p-6 text-white shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <div className="text-xs font-semibold uppercase tracking-wide text-white/80">
                Ready to talk?
              </div>
              <div className="mt-2 text-xl font-semibold sm:text-2xl">
                Sponsor Art + Zap Weekend.
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/90">
                Email us to start a conversation, request the full sponsor proposal, or
                ask about in-kind opportunities. We respond within 24 hours.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`mailto:${sponsorEmail}?subject=${encodeURIComponent('Art + Zap Weekend sponsor inquiry')}`}
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:opacity-90"
              >
                Email {sponsorEmail}
              </a>
              <a
                href={`mailto:${sponsorEmail}?subject=${encodeURIComponent('Request: Art + Zap Weekend sponsor sheet')}&body=${encodeURIComponent(
                  "Hi BFTA team,\n\nPlease send me the sponsor sheet for Art + Zap Weekend.\n\nMy company: \nMy role: \nBest contact: \n\n",
                )}`}
                className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Request the sponsor sheet
              </a>
            </div>
          </div>
        </section>

        {/* ── Footer / housekeeping ───────────────── */}
        <div className="mt-10 rounded-2xl border border-border bg-background p-6 text-sm leading-relaxed text-muted">
          <strong className="text-foreground">Bitcoin For The Arts, Inc.</strong> is a 501(c)(3)
          tax-exempt nonprofit corporation, EIN <strong className="text-foreground">{ein}</strong>,
          headquartered at 27 West 60th Street, PO Box 20069, New York, NY 10023. Donations and sponsorships are
          tax-deductible to the extent permitted by law. Receipts are provided automatically. This
          page is informational and does not constitute tax advice.
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/donate"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
          >
            Support BFTA directly
          </Link>
          <Link
            href="/about"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
          >
            About Bitcoin For The Arts
          </Link>
        </div>
      </div>
    </main>
  );
}
