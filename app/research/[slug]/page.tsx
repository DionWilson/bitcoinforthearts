import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ResearchBarChart from '@/components/research/ResearchBarChart';
import ResearchReportShell from '@/components/research/ResearchReportShell';
import {
  getResearchReportBySlug,
  researchReports,
  stateOfArtsFunding2026,
} from '@/lib/research';

type PageProps = {
  params: { slug: string };
};

function sectionId(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function generateStaticParams() {
  return researchReports.map((report) => ({ slug: report.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const report = getResearchReportBySlug(params.slug);

  if (!report) {
    return {
      title: 'Research report',
    };
  }

  return {
    title: report.title,
    description: report.dek,
    alternates: {
      canonical: report.href,
    },
  };
}

export default function ResearchReportPage({ params }: PageProps) {
  const report = getResearchReportBySlug(params.slug);

  if (!report) notFound();

  const sections = report.expectedSections.map((label) => ({
    id: sectionId(label),
    label,
  }));
  const isStateReport = report.slug === stateOfArtsFunding2026.slug;

  return (
    <ResearchReportShell
      title={report.title}
      dek={report.dek}
      kicker={report.kicker}
      status={`${report.status} (${report.phase})`}
      lastReviewed={isStateReport ? stateOfArtsFunding2026.lastReviewed : undefined}
      sections={sections}
      sources={isStateReport ? stateOfArtsFunding2026.sources : []}
    >
      <section
        id={sections[0]?.id}
        className="scroll-mt-24 rounded-2xl border border-border bg-surface p-6"
      >
        <h2 className="text-2xl font-semibold tracking-tight">{sections[0]?.label}</h2>
        <p>
          This report scaffold is live so the portal, URL structure, report
          shell, section navigation, print styles, and citation framework can be
          validated before the full report text ships.
        </p>
        <p>
          The final report will use the institutional byline, cite every factual
          claim, and pull chart values from JSON files in the research data
          layer.
        </p>
      </section>

      {isStateReport ? (
        <>
          <section
            id="baseline-stats"
            className="mt-8 scroll-mt-24 rounded-2xl border border-border bg-background p-6"
          >
            <h2 className="text-2xl font-semibold tracking-tight">
              Baseline stats migrated to data
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {stateOfArtsFunding2026.heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-surface p-4"
                >
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {stat.label}
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight">
                    {stat.value}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {stat.context}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="chart-scaffold"
            className="mt-8 scroll-mt-24"
          >
            <ResearchBarChart chart={stateOfArtsFunding2026.charts[0]} />
          </section>
        </>
      ) : null}

      {sections.slice(1).map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="mt-8 scroll-mt-24 rounded-2xl border border-border bg-surface p-6"
        >
          <h2 className="text-2xl font-semibold tracking-tight">{section.label}</h2>
          <p>
            This section is reserved for the {report.phase} report draft. Full
            content will be added in the dedicated report phase after source
            tables, citations, and chart data are assembled.
          </p>
        </section>
      ))}
    </ResearchReportShell>
  );
}
