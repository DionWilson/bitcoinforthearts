import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Get involved',
  description:
    'Volunteer, fundraise, partner, and advocate with Bitcoin for the Arts.',
};

export default function GetInvolvedPage() {
  return (
    <main className="bg-background relative overflow-hidden min-h-screen">
      {/* Background image (same treatment as Artists page) */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/Get%20Involved%20-background.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Get Involved
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Join The Sovereign Art Revolution.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Whether you&apos;re an artist, Bitcoiner, or supporter, there are many ways
            to contribute your time, talents, or resources. Help us fund uncensorable
            creativity—donate, volunteer, fundraise, partner, or advocate. Every
            action stacks culture on sound money.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <section className="lg:col-span-7 rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-xl font-semibold tracking-tight">
              Donate BTC Or Fiat
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Fuel artists directly—our policy targets the majority of every gift to
              creator support in Bitcoin, with a transparent allocation model.
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
              <li>
                <strong>Bitcoin</strong>: scan QR, send on-chain, or use Lightning
                (BTCPay).
              </li>
              <li>
                <strong>Fiat</strong>: credit card/check (Stripe, when enabled) and
                converted to BTC per policy.
              </li>
              <li>
                <strong>Perks</strong>: optional leaderboard spot, thank-you notes,
                and naming opportunities for major gifts.
              </li>
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
              >
                Donate now
              </Link>
              <Link
                href="/donate#bitcoin"
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
              >
                Donate BTC
              </Link>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              Tax treatment depends on your jurisdiction and the organization’s
              status; consult your advisor.
            </p>
          </section>

          <section className="lg:col-span-5 rounded-2xl border border-border bg-background p-6">
            <h2 className="text-xl font-semibold tracking-tight">Volunteer</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              No heavy commitment—low-time roles to fit your schedule. Individuals,
              nonprofits, or corporations can help.
            </p>
            <div className="mt-4 space-y-3 text-sm text-muted">
              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="font-semibold text-foreground">
                  Individuals
                </div>
                <div className="mt-1">
                  Review grant applications (1 hr/mo), lead workshops, scout artists,
                  promote on X/Nostr.
                </div>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="font-semibold text-foreground">
                  Nonprofits & Arts Orgs
                </div>
                <div className="mt-1">
                  Co-host events, share grant calls, collaborate on residencies and
                  productions.
                </div>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="font-semibold text-foreground">
                  Corporations
                </div>
                <div className="mt-1">
                  Offer pro bono services (marketing, tech, legal), match employee
                  donations, or sponsor programs.
                </div>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="mailto:volunteer@bitcoinforthearts.org?subject=Volunteer%20interest&body=Name%3A%0AHow%20I%20can%20help%3A%0AAvailability%3A%0ALinks%20(optional)%3A%0A"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 border border-accent/60"
              >
                Volunteer form (email)
              </a>
            </div>
          </section>

          <section className="lg:col-span-6 rounded-2xl border border-border bg-background p-6">
            <h2 className="text-xl font-semibold tracking-tight">
              Fundraise Your Way (DIY Events)
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Create your own fundraiser—like a “BTC Art Night” or online auction—to
              support us. We can provide templates, a BTCPay link, and a promo kit.
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
              <li>Virtual gallery show (ticketed in BTC)</li>
              <li>Artist livestream (zaps)</li>
              <li>Corporate matching drive</li>
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/get-involved/diy-fundraising-guide"
                className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
              >
                DIY fundraising guide
              </Link>
              <a
                href="mailto:events@bitcoinforthearts.org?subject=I%20want%20to%20host%20a%20fundraiser"
                className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:opacity-90"
              >
                Get support
              </a>
            </div>
          </section>

          <section className="lg:col-span-6 rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-xl font-semibold tracking-tight">Partner With Us</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Collaborate for bigger impact: joint grants, co-productions, residencies,
              and sponsorships that bring artists and Bitcoiners together.
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
              <li>
                <strong>Arts orgs</strong>: joint grants, BTC-funded residencies,
                showcases.
              </li>
              <li>
                <strong>Bitcoin companies</strong>: sponsor a grant series, match
                donations, or provide tools (wallets, onboarding).
              </li>
              <li>
                <strong>Individuals</strong>: become an advisor/ambassador for ideas
                and networking.
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="mailto:hello@bitcoinforthearts.org?subject=Partnership%20inquiry"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 border border-accent/60"
              >
                Email partnerships
              </a>
            </div>
          </section>

          <section className="lg:col-span-12 rounded-2xl border border-border bg-background p-6">
            <h2 className="text-xl font-semibold tracking-tight">
              Advocate For Sovereign Art
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Spread the word: share our mission, post about grants, or help educate
              artists on Bitcoin. Small actions compound.
            </p>
            <div className="mt-4 rounded-xl border border-border bg-surface p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Copy/paste post
              </div>
              <div className="mt-2 rounded-lg border border-border bg-background p-3 font-mono text-xs text-foreground/90">
                Artists, get funded in BTC! bitcoinforthearts.org/grants
              </div>
            </div>
          </section>
        </div>

        <div className="mt-10 max-w-3xl">
          <p className="text-sm leading-relaxed text-muted">
            Ready to get involved? Start with a small step today—your low time
            contribution could ignite the next renaissance.
          </p>
        </div>
      </div>
    </main>
  );
}

