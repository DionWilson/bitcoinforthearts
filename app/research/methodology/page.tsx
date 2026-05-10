import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Research Methodology',
  description:
    'Research standards, source hierarchy, update cadence, corrections policy, and disclaimers for Bitcoin for the Arts Research.',
  alternates: {
    canonical: '/research/methodology',
  },
};

const sourceHierarchy = [
  {
    level: '1',
    title: 'Budgets, financial statements, and operating documents',
    description:
      'Official budgets, appropriations, operating expenses, balance sheets, audited statements, grant guidelines, and agency reports are preferred when available.',
  },
  {
    level: '2',
    title: 'Government and statistical agencies',
    description:
      'Federal, state, local, and international statistical agencies are used for labor, price, GDP, monetary, demographic, and public-finance data.',
  },
  {
    level: '3',
    title: 'Peer-reviewed and university research',
    description:
      'Academic research is used where methods are transparent and the research question matches the claim being made.',
  },
  {
    level: '4',
    title: 'Major nonprofit research organizations',
    description:
      'Sector research from established nonprofit, philanthropic, and arts-policy institutions is used as supporting evidence and as a community-building bridge.',
  },
  {
    level: '5',
    title: 'Reputable journalism and institutional reporting',
    description:
      'Journalism is used for live case studies, institutional quotes, and local examples when primary documents are unavailable or incomplete.',
  },
] as const;

const reviewCadence = [
  {
    title: 'Annual flagship report',
    description:
      'The State of Arts Funding report is reviewed and updated annually, with publication targeted for the second quarter.',
  },
  {
    title: 'Deep-dive reports',
    description:
      'Deep dives are reviewed semiannually, or sooner if a primary source materially changes the analysis.',
  },
  {
    title: 'Last reviewed dates',
    description:
      'Each report should display a last-reviewed date so readers can understand the currency of the evidence.',
  },
] as const;

export default function ResearchMethodologyPage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
          <Link href="/research" className="hover:underline">
            Research
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">Methodology</span>
        </div>

        <section className="mt-8 border-b border-border pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Bitcoin for the Arts Research
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Research methodology
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
            BFTA Research begins with the numbers: budgets, financial documents,
            operating costs, public records, statistical series, and reported
            outcomes. We use those results to guide analysis, not to decorate a
            predetermined argument.
          </p>
        </section>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <section className="rounded-2xl border border-border bg-surface p-6 lg:col-span-7">
            <h2 className="text-2xl font-semibold tracking-tight">
              Research principles
            </h2>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
              <li>
                <span className="font-semibold text-foreground">Primary sources first.</span>{' '}
                Official source material is preferred over summaries, commentary,
                or social media posts.
              </li>
              <li>
                <span className="font-semibold text-foreground">No hype.</span>{' '}
                Reports should avoid advocacy language, partisan framing, and
                inflated claims. The evidence should carry the argument.
              </li>
              <li>
                <span className="font-semibold text-foreground">No unsourced stats.</span>{' '}
                A number without a source is not ready for publication.
              </li>
              <li>
                <span className="font-semibold text-foreground">Numbers are treated seriously.</span>{' '}
                We believe the results of budgets, costs, expenses, grants,
                revenue, and balance sheets are among the strongest guides to
                institutional reality.
              </li>
              <li>
                <span className="font-semibold text-foreground">Limitations are explicit.</span>{' '}
                Preliminary, proposed, lagged, revised, or estimated data should
                be labeled as such.
              </li>
            </ul>
          </section>

          <aside className="rounded-2xl border border-border bg-background p-6 lg:col-span-5">
            <h2 className="text-2xl font-semibold tracking-tight">
              Contact and corrections
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Corrections, source updates, data requests, and institutional
              research inquiries may be sent to{' '}
              <a
                href="mailto:info@bitcoinforthearts.org?subject=BFTA%20Research%20correction%20or%20data%20request"
                className="font-semibold underline underline-offset-4"
              >
                info@bitcoinforthearts.org
              </a>
              .
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Please include the report title, the claim or data point in
              question, the source you are referencing, and any relevant page,
              table, or line number.
            </p>
          </aside>
        </div>

        <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Source hierarchy
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {sourceHierarchy.map((source) => (
              <div key={source.level} className="rounded-xl border border-border bg-background p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Source tier {source.level}
                </div>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  {source.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {source.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {reviewCadence.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-xl font-semibold tracking-tight">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            AI, analysis, and human review
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            AI tools may assist with searching, summarizing, outlining, and
            drafting, but AI output is not treated as evidence. Every factual
            claim must be traceable to a reviewed source before publication.
            Claims generated by AI without source verification are excluded or
            held for further review.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Reports are published under the institutional byline Bitcoin for the
            Arts Research. The byline signals accountability to a research
            standard rather than personal authorship.
          </p>
        </section>

        <section className="mt-10 rounded-2xl border border-border bg-background p-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Legal and professional disclaimers
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            BFTA Research is educational and informational. It is not investment
            advice, financial advice, tax advice, accounting advice, or legal
            advice. Readers, donors, institutions, and artists should consult
            qualified professional advisors for legal, tax, accounting,
            investment, custody, governance, and compliance decisions.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Bitcoin and other innovative technologies involve risk. BFTA
            encourages research, education, professional consultation, and clear
            documentation before any institution adopts new treasury, custody, or
            grantmaking practices.
          </p>
        </section>

        <section className="mt-10 rounded-2xl border border-accent/40 bg-surface p-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Research participation
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Bitcoin For The Arts, Inc. welcomes institutional researchers,
            economists, arts administrators, public finance specialists,
            nonprofit finance professionals, and data volunteers who want to
            strengthen this work. Funding and volunteer support directly improve
            our ability to maintain rigorous public research for the arts.
          </p>
        </section>
      </div>
    </main>
  );
}
