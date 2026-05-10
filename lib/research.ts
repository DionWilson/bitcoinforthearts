import reportsJson from '@/data/research/reports.json';
import stateOfArtsFunding2026Json from '@/data/research/state-of-arts-funding-2026.json';
import theArpaCliffJson from '@/data/research/the-arpa-cliff.json';

export type ResearchReportSummary = {
  slug: string;
  title: string;
  kicker: string;
  dek: string;
  status: string;
  phase: string;
  priority: number;
  href: string;
  expectedSections: string[];
};

export type ResearchSource = {
  id: string;
  label: string;
  href: string;
};

export type ResearchHeroStat = {
  label: string;
  value: string;
  context: string;
  sourceIds: string[];
};

export type ResearchChartDatum = {
  label: string;
  value: number;
};

export type ResearchChartDefinition = {
  id: string;
  title: string;
  description: string;
  type: 'bar';
  valuePrefix?: string;
  valueSuffix?: string;
  sourceIds: string[];
  data: ResearchChartDatum[];
};

export type ResearchDataSet = {
  slug: string;
  title: string;
  byline: 'Bitcoin for the Arts Research';
  lastReviewed: string;
  heroStats: ResearchHeroStat[];
  charts: ResearchChartDefinition[];
  sources: ResearchSource[];
};

export const researchReports = reportsJson as ResearchReportSummary[];

export const stateOfArtsFunding2026 =
  stateOfArtsFunding2026Json as ResearchDataSet;

export const theArpaCliff = theArpaCliffJson as ResearchDataSet;

export const researchSourcesById = new Map(
  [...stateOfArtsFunding2026.sources, ...theArpaCliff.sources].map((source) => [
    source.id,
    source,
  ]),
);

export function getResearchReportBySlug(slug: string) {
  return researchReports.find((report) => report.slug === slug);
}

export function getSourcesForIds(sourceIds: string[]) {
  return sourceIds
    .map((id) => researchSourcesById.get(id))
    .filter((source): source is ResearchSource => Boolean(source));
}
