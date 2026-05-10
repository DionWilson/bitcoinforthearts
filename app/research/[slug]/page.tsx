import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ResearchReportShell from '@/components/research/ResearchReportShell';
import StateOfArtsFunding2026Report, {
  stateOfArtsFundingSections,
} from '@/components/research/StateOfArtsFunding2026Report';
import SoundMoneyForTheArtsReport, {
  soundMoneyForTheArtsSections,
} from '@/components/research/SoundMoneyForTheArtsReport';
import TheArpaCliffReport, {
  theArpaCliffSections,
} from '@/components/research/TheArpaCliffReport';
import {
  getResearchReportBySlug,
  researchReports,
  soundMoneyForTheArts,
  stateOfArtsFunding2026,
  theArpaCliff,
} from '@/lib/research';

type PageProps = {
  params: Promise<{ slug: string }>;
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const report = getResearchReportBySlug(slug);

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
    robots:
      report.slug === stateOfArtsFunding2026.slug ||
      report.slug === theArpaCliff.slug ||
      report.slug === soundMoneyForTheArts.slug
        ? undefined
        : {
            index: false,
            follow: false,
          },
  };
}

export default async function ResearchReportPage({ params }: PageProps) {
  const { slug } = await params;
  const report = getResearchReportBySlug(slug);

  if (!report) notFound();

  if (report.slug === stateOfArtsFunding2026.slug) {
    return (
      <ResearchReportShell
        title={report.title}
        dek={report.dek}
        kicker={report.kicker}
        status="Version 1.0"
        lastReviewed={stateOfArtsFunding2026.lastReviewed}
        sections={stateOfArtsFundingSections}
        sources={stateOfArtsFunding2026.sources}
      >
        <StateOfArtsFunding2026Report />
      </ResearchReportShell>
    );
  }

  if (report.slug === theArpaCliff.slug) {
    return (
      <ResearchReportShell
        title={report.title}
        dek={report.dek}
        kicker={report.kicker}
        status="Version 1.0"
        lastReviewed={theArpaCliff.lastReviewed}
        sections={theArpaCliffSections}
        sources={theArpaCliff.sources}
      >
        <TheArpaCliffReport />
      </ResearchReportShell>
    );
  }

  if (report.slug === soundMoneyForTheArts.slug) {
    return (
      <ResearchReportShell
        title={report.title}
        dek={report.dek}
        kicker={report.kicker}
        status="Version 1.0"
        lastReviewed={soundMoneyForTheArts.lastReviewed}
        sections={soundMoneyForTheArtsSections}
        sources={soundMoneyForTheArts.sources}
      >
        <SoundMoneyForTheArtsReport />
      </ResearchReportShell>
    );
  }

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
