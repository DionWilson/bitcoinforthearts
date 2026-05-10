import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ResearchBarChart from '@/components/research/ResearchBarChart';
import {
  getSourcesForIds,
  researchReports,
  stateOfArtsFunding2026,
} from '@/lib/research';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Bitcoin for the Arts Research: reports, data, and methodology on arts funding and Bitcoin-native patronage.',
  alternates: {
    canonical: '/research',
  },
};

const featuredChart = stateOfArtsFunding2026.charts[0];
const featuredSources = getSourcesForIds(featuredChart.sourceIds);

export default function ResearchPortalPage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <section className="border-b border-border pb-10">
          <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                Bitcoin for the Arts Research
              </h1>
              <p className="mt-5 max-w-3xl text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
                Data and analysis for the future of arts funding.
              </p>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
                BFTA Research is building an institutional, citable body of work
                on arts funding, the ARPA cliff, and Bitcoin-native patronage.
                The goal is simple: make Bitcoin for the Arts useful to
                journalists, foundation officers, donors, and researchers trying
                to understand why arts funding needs more durable rails.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5 lg:col-span-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Institutional byline
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight">
                Bitcoin for the Arts Research
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                No personal report bylines. Reports are designed to be cited as
                research from Bitcoin for the Arts.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stateOfArtsFunding2026.heroStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-surface p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                {stat.label}
              </div>
              <div className="mt-3 text-3xl font-semibold tracking-tight">
                {stat.value}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {stat.context}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <ResearchBarChart chart={featuredChart} />
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Source:{' '}
              {featuredSources.map((source, index) => (
                <span key={source.id}>
                  {index > 0 ? ', ' : ''}
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline underline-offset-4"
                  >
                    {source.label}
                  </a>
                </span>
              ))}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6 lg:col-span-5">
            <h2 className="text-2xl font-semibold tracking-tight">
              Research standards
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
              <li>
                <span className="font-semibold text-foreground">Institutional:</span>{' '}
                reports are published under the Bitcoin for the Arts Research
                byline, not personal authorship.
              </li>
              <li>
                <span className="font-semibold text-foreground">Cited:</span>{' '}
                factual claims should point back to primary sources or clearly
                named secondary reporting.
              </li>
              <li>
                <span className="font-semibold text-foreground">Measured:</span>{' '}
                charts and summary stats are included only when the underlying
                data can be reviewed and updated.
              </li>
              <li>
                <span className="font-semibold text-foreground">Serious:</span>{' '}
                the intended reader is a journalist, grantmaker, researcher, or
                critical donor looking for verifiable analysis.
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-14">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                V1 report scope
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Reports in production
              </h2>
            </div>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
            >
              Fund the research work
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {researchReports.map((report) => {
              const isPublished = report.status.toLowerCase().includes('published');

              const cardContent = (
                <>
                  {report.imageSrc ? (
                    <div className="-mx-6 -mt-6 mb-5 overflow-hidden rounded-t-2xl border-b border-border bg-background">
                      <div className="relative aspect-[16/10] w-full">
                        <Image
                          src={report.imageSrc}
                          alt={report.imageAlt ?? ''}
                          fill
                          className="object-cover object-center transition-transform duration-300"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {report.kicker}
                    </div>
                    <div className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted">
                      {report.phase}
                    </div>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                    {report.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {report.dek}
                  </p>
                  <p className="mt-5 text-sm font-semibold text-accent">
                    {isPublished ? 'Read the report' : 'Report in production'}
                  </p>
                </>
              );

              if (isPublished) {
                return (
                  <Link
                    key={report.slug}
                    href={report.href}
                    className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/60"
                  >
                    {cardContent}
                  </Link>
                );
              }

              return (
                <article
                  key={report.slug}
                  className="rounded-2xl border border-border bg-surface p-6"
                >
                  {cardContent}
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-border bg-surface p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                Phase 5
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Methodology and glossary
              </h2>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            BFTA Research is built on primary sources first, no hype, no
            unsourced statistics, and clear correction pathways. The methodology
            and glossary pages document how we select sources, update reports,
            define terms, and handle professional disclaimers.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              href="/research/methodology"
              className="rounded-xl border border-border bg-background p-5 transition-colors hover:border-accent/60"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Standards
              </div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">
                Research methodology
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Source hierarchy, update cadence, corrections, AI usage,
                disclaimers, and institutional byline policy.
              </p>
            </Link>
            <Link
              href="/research/glossary"
              className="rounded-xl border border-border bg-background p-5 transition-colors hover:border-accent/60"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Definitions
              </div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">
                Research glossary
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Plain-language definitions for arts funding, public finance,
                monetary economics, nonprofit finance, and Bitcoin terms.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
