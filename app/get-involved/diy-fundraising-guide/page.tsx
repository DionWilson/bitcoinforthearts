import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'DIY Fundraising Guide',
  description:
    'Host your own fundraiser to stack sats for sovereign art. Templates and resources included.',
};

const downloads = [
  {
    name: 'DIY Fundraising Guide (Markdown)',
    href: '/resources/diy-fundraising-guide.md',
  },
  {
    name: 'BTCPay Setup Guide (Markdown)',
    href: '/resources/btcpay-setup-guide.md',
  },
  {
    name: 'Sample Grant Agreement (Markdown)',
    href: '/resources/sample-grant-agreement.md',
  },
  {
    name: 'Donor Receipt Template (Markdown)',
    href: '/resources/donor-receipt-template.md',
  },
  {
    name: 'Logo kit (SVG)',
    href: '/resources/logos/bitcoin-for-the-arts-logo.svg',
  },
  {
    name: 'Logo kit (PNG, gold)',
    href: '/resources/logos/bitcoin-for-the-arts-logo-gold.png',
  },
  {
    name: 'Logo kit (PNG, white)',
    href: '/resources/logos/bitcoin-for-the-arts-logo-white.png',
  },
];

export default function DiyFundraisingGuidePage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <Link href="/get-involved" className="hover:underline">
              Get Involved
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">DIY Fundraising Guide</span>
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            DIY Fundraising Guide: Stack sats for sovereign art
          </h1>

          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            If you&apos;re a Bitcoiner, artist, or supporter passionate about uncensorable
            creativity, you can create your own event or campaign to raise funds for
            the mission. No experience needed—we&apos;ll provide templates, tips, and
            support.
          </p>

          <div className="mt-10 space-y-10">
            <section className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                Why DIY Fundraising?
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                <li>
                  <strong>Empower creators:</strong> Your event can fund an artist’s
                  next masterpiece or workshop.
                </li>
                <li>
                  <strong>Bitcoin-native:</strong> Accept BTC/Lightning for instant,
                  low-fee impact.
                </li>
                <li>
                  <strong>Easy &amp; flexible:</strong> From virtual zaps to gallery
                  nights—do what fits your style.
                </li>
                <li>
                  <strong>Perks:</strong> We can promote your event and provide
                  logos/templates (opt-in recognition).
                </li>
              </ul>
            </section>

            <section className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                Fundraising Ideas (Start Small Or Go Big)
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                <li>
                  <strong>Bitcoin Art Night:</strong> host a virtual/in-person
                  showcase—charge entry.
                </li>
                <li>
                  <strong>Satoshi Streamathon:</strong> livestream your art creation;
                  supporters zap sats via Lightning.
                </li>
                <li>
                  <strong>Gallery Zap Party:</strong> partner with a local space; QR
                  codes for BTC donations.
                </li>
                <li>
                  <strong>Peer-to-peer campaign:</strong> “Fund 5 artists with me!”
                </li>
                <li>
                  <strong>Corporate match day:</strong> ask your employer to match
                  BTC/fiat donations.
                </li>
                <li>
                  <strong>Low-time auction:</strong> donate an artwork and direct
                  proceeds to the mission.
                </li>
              </ul>
            </section>

            <section className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                Step-By-Step: How To Run Your Fundraiser
              </h2>
              <ol className="mt-4 space-y-2 text-sm leading-relaxed text-muted list-decimal pl-5">
                <li>
                  <strong>Pick your idea &amp; set a goal:</strong> start with a
                  realistic target (e.g., $1K).
                </li>
                <li>
                  <strong>Register your event:</strong> email us your name/date/goal
                  and how you want to accept donations.
                </li>
                <li>
                  <strong>Promote it:</strong> use our logos and copy/paste posts.
                </li>
                <li>
                  <strong>Accept donations:</strong> BTC on-chain and Lightning via
                  BTCPay (we’ll help). Fiat via Stripe once enabled.
                </li>
                <li>
                  <strong>Run the event:</strong> keep it fun—share artist stories
                  and practical Bitcoin tips.
                </li>
                <li>
                  <strong>Wrap up &amp; report:</strong> send the total raised and
                  any highlights. We can feature you (opt-in).
                </li>
              </ol>
            </section>

            <section className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                Resources &amp; Templates (Downloads)
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                {downloads.map((d) => (
                  <li key={d.href}>
                    <a
                      href={d.href}
                      className="font-semibold underline underline-offset-4"
                    >
                      {d.name}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:events@bitcoinforthearts.org?subject=DIY%20fundraiser%20registration&body=Name%3A%0AEvent%20name%3A%0ADate%2Ftime%3A%0AGoal%3A%0ALocation%20(virtual%2Fin-person)%3A%0AHow%20I%20plan%20to%20accept%20donations%20(BTC%2FLN%2Ffiat)%3A%0APromo%20link(s)%3A%0A"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
            >
              Register your fundraiser
            </a>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:opacity-90"
            >
              Donate
            </Link>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-muted">
            Tax note: Deductibility depends on your jurisdiction and the
            organization’s status. Consult your advisor.
          </p>
        </div>
      </div>
    </main>
  );
}

