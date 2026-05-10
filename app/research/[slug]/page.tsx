import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ResearchReportShell from '@/components/research/ResearchReportShell';
import {
  getResearchReportBySlug,
  researchReports,
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
    robots: {
      index: false,
      follow: false,
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
  const overviewSection = {
    id: 'overview',
    label: 'Overview',
  };
  const coverageSection = {
    id: 'coverage',
    label: 'What this report will cover',
  };

  return (
    <ResearchReportShell
      title={report.title}
      dek={report.dek}
      kicker={report.kicker}
      status={report.status}
      sections={[overviewSection, coverageSection]}
    >
      <section
        id={overviewSection.id}
        className="scroll-mt-24 rounded-2xl border border-border bg-surface p-6"
      >
        <h2 className="text-2xl font-semibold tracking-tight">
          {overviewSection.label}
        </h2>
        <p>
          This report is in production. Bitcoin for the Arts will publish it
          here after source review, citation checks, and editorial review are
          complete.
        </p>
        <p>
          Until then, the research portal summarizes the themes BFTA is tracking
          and links readers to the primary-source baseline.
        </p>
      </section>

      <section
        id={coverageSection.id}
        className="mt-8 scroll-mt-24 rounded-2xl border border-border bg-surface p-6"
      >
        <h2 className="text-2xl font-semibold tracking-tight">
          {coverageSection.label}
        </h2>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-base">
          {sections.map((section) => (
            <li key={section.id}>{section.label}</li>
          ))}
        </ul>
      </section>
    </ResearchReportShell>
  );
}
