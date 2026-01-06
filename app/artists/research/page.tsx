import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import MobileCarousel from '@/components/MobileCarousel';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Research and economic data supporting the case for funding artists — and why Bitcoin-native grants matter.',
};

function SourceLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold underline underline-offset-4"
    >
      {label}
    </a>
  );
}

export default function ArtistsResearchPage() {
  const charts = [
    {
      src: '/research/chart.png',
      alt: 'Bar chart comparing growth rate: Arts Sector 6.6% vs Overall US Economy 2.5%.',
      caption:
        'Growth: the arts sector outpaced overall GDP growth (2023).',
    },
    {
      src: '/research/chart-2.png',
      alt: 'Bar chart of arts and culture value added: about $1.1T in 2022 and $1.17T in 2023.',
      caption:
        'Value added: arts and culture contribute over $1T to U.S. GDP.',
    },
    {
      src: '/research/chart-3.png',
      alt: 'Bar chart showing arts employment at 5.2 million jobs in 2022.',
      caption:
        'Employment: millions of jobs supported by arts and culture.',
    },
    {
      src: '/research/chart-1.png',
      alt: 'Pie chart showing arts and cultural sector as a small portion of the total economy.',
      caption:
        'Share: a meaningful slice of GDP — often underestimated.',
    },
  ] as const;

  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <Link href="/artists" className="hover:underline">
              Artists
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">Research</span>
          </div>

          <div className="mt-6 rounded-3xl border border-border bg-surface/80 p-8 shadow-sm">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Empowering Artists – The Case for Support in the U.S. Economy
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              At Bitcoin For The Arts, we see the arts not as a luxury, but as a
              cornerstone of innovation, community, and economic vitality. While
              artists drive cultural richness and inspire generations, they often
              navigate financial hurdles that limit their potential. By channeling
              donations into Bitcoin grants, we provide artists with appreciating
              assets that foster independence and creativity.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Below are data highlights from public sources like the{' '}
              <SourceLink href="https://www.arts.gov" label="National Endowment for the Arts (NEA)" />{' '}
              and the{' '}
              <SourceLink href="https://www.bea.gov" label="Bureau of Economic Analysis (BEA)" />, showing
              the arts&apos; outsized contributions — and why investing in creators
              yields profound returns.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
              >
                Fund Bitcoin grants
              </Link>
              <Link
                href="/grants"
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
              >
                Learn about grants
              </Link>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border mobile-pop-card p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Growth (2023)
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight">
                6.6% vs 2.5%
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Arts sector growth outpaced the overall U.S. economy.
              </p>
            </div>
            <div className="rounded-2xl border border-border mobile-pop-card p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                GDP contribution (2023)
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight">
                $1.17T (4.2%)
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Arts &amp; culture value added to U.S. GDP.
              </p>
            </div>
            <div className="rounded-2xl border border-border mobile-pop-card p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Jobs (2022)
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight">
                5.2M
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Arts employment recovered to millions of jobs.
              </p>
            </div>
            <div className="rounded-2xl border border-border mobile-pop-card p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Multiplier
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight">
                Up to $5 / $1
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Arts spending can catalyze local economic activity.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <section className="lg:col-span-7 rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-2xl font-semibold tracking-tight">
                The economic powerhouse of the arts
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted sm:text-base">
                <li>
                  <span className="font-semibold text-foreground">Rapid growth:</span>{' '}
                  The arts sector outpaced broader economic growth in 2023.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Massive GDP contribution:</span>{' '}
                  Arts &amp; culture add over a trillion dollars in value.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Job creation:</span>{' '}
                  Millions of jobs across creators, venues, education, and production.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Multiplier effect:</span>{' '}
                  Arts activity supports tourism, small businesses, and local spending.
                </li>
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                For full reports, visit{' '}
                <SourceLink href="https://www.arts.gov" label="NEA.gov" /> or{' '}
                <SourceLink href="https://www.bea.gov" label="BEA.gov" />.
              </p>
            </section>

            <section className="lg:col-span-5 rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Why Bitcoin grants?
              </div>
              <p className="mt-3 text-base leading-relaxed text-foreground/90">
                We’re building Bitcoin-native patronage: fast grants, transparent
                allocation, and a long-term reserve.
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                <li>
                  <span className="font-semibold text-foreground">Direct:</span> fewer
                  intermediaries, more to creators.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Global:</span> support
                  can cross borders instantly.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Long-term:</span> a
                  Bitcoin endowment mindset (HODL Vault).
                </li>
              </ul>
            </section>
          </div>

          <div className="mt-12 -mx-6 px-6">
            <MobileCarousel ariaLabel="Research charts carousel">
              {charts.map((c) => (
                <figure
                  key={c.src}
                  data-carousel-item="true"
                  className="snap-start shrink-0 w-[92%] sm:w-[70%] lg:w-[48%] overflow-hidden rounded-2xl border border-border bg-background"
                >
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={c.src}
                      alt={c.alt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 48vw"
                    />
                  </div>
                  <figcaption className="p-5 text-sm text-muted">
                    <span className="font-semibold text-foreground">
                      {c.caption.split(':')[0]}:
                    </span>{' '}
                    {c.caption.split(':').slice(1).join(':').trim()}
                  </figcaption>
                </figure>
              ))}
            </MobileCarousel>
          </div>

          <section className="mt-12 rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Further research (primary sources)
            </h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
              <li>
                <SourceLink href="https://www.bea.gov/data/special-topics/arts-and-culture" label="BEA — Arts & Culture" />
              </li>
              <li>
                <SourceLink href="https://www.arts.gov/impact/research" label="NEA — Research & Analysis" />
              </li>
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              Note: Figures shown here are presented as provided in your site’s
              research summary and associated charts. For the latest updates and
              methodologies, use the primary sources above.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

