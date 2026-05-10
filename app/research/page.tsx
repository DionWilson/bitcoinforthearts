import type { Metadata } from 'next';
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
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Bitcoin for the Arts Research
          </p>
          <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                Research for non-state-dependent arts funding.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
                BFTA Research is building an institutional, citable body of work
                on arts funding, the ARPA cliff, and Bitcoin-native patronage.
                Phase 1 establishes the portal, data layer, charting, report
                shell, table of contents, and citation framework.
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
              Phase 1 foundation
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
              <li>
                <span className="font-semibold text-foreground">Data:</span>{' '}
                report metadata and chart values live in JSON under
                <code className="mx-1 rounded bg-surface px-1 py-0.5 text-foreground">
                  data/research/
                </code>
                .
              </li>
              <li>
                <span className="font-semibold text-foreground">Charts:</span>{' '}
                Recharts renders chart definitions from the data layer.
              </li>
              <li>
                <span className="font-semibold text-foreground">Reports:</span>{' '}
                long-form pages share one report shell with sticky section
                navigation and sources.
              </li>
              <li>
                <span className="font-semibold text-foreground">Legacy URL:</span>{' '}
                <code className="rounded bg-surface px-1 py-0.5 text-foreground">
                  /artists/research
                </code>{' '}
                now redirects permanently to this portal.
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
            {researchReports.map((report) => (
              <Link
                key={report.slug}
                href={report.href}
                className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/60"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {report.kicker}
                  </div>
                  <div className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted">
                    {report.phase}
                  </div>
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight group-hover:text-accent">
                  {report.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {report.dek}
                </p>
                <p className="mt-5 text-sm font-semibold underline underline-offset-4">
                  Open report scaffold
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Methodology and glossary
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            The locked plan reserves full methodology and glossary pages for
            Phase 5. Phase 1 keeps those URLs out of production content until
            the citation standards, source review process, and definitions are
            ready to publish.
          </p>
        </section>
      </div>
    </main>
  );
}
