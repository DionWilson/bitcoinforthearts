import type { ReactNode } from 'react';
import ResearchBarChart from '@/components/research/ResearchBarChart';
import { Cite } from '@/components/research/Citations';
import { theArpaCliff } from '@/lib/research';

const chartsById = new Map(theArpaCliff.charts.map((chart) => [chart.id, chart]));

function ChartById({ id }: { id: string }) {
  const chart = chartsById.get(id);
  if (!chart) return null;
  return (
    <div className="not-prose my-8">
      <ResearchBarChart chart={chart} />
    </div>
  );
}

function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-8 border-l-4 border-accent bg-surface px-6 py-5">
      <p className="font-display text-xl leading-relaxed text-foreground">
        {children}
      </p>
    </blockquote>
  );
}

function WhyItMatters({ children }: { children: ReactNode }) {
  return (
    <aside className="not-prose my-8 rounded-2xl border border-accent/40 bg-surface p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
        Why this matters
      </div>
      <div className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
        {children}
      </div>
    </aside>
  );
}

export const theArpaCliffSections = [
  { id: 'executive-summary', label: 'Executive summary' },
  { id: 'two-rails', label: 'Two federal rails, one local cliff' },
  { id: 'nea-distribution', label: 'How NEA ARP funding moved' },
  { id: 'slfrf-local-choices', label: 'How cities and states used SLFRF' },
  { id: 'the-2026-cliff', label: 'What changes in 2026' },
  { id: 'comparative-examples', label: 'Selected examples and comparison' },
  { id: 'bfta-conclusion', label: "BFTA's analytical conclusion" },
  { id: 'methodology', label: 'Methodology and source limits' },
];

export default function TheArpaCliffReport() {
  return (
    <>
      <section
        id="executive-summary"
        className="scroll-mt-24 rounded-2xl border border-border bg-surface p-6"
      >
        <h2 className="text-2xl font-semibold tracking-tight">Executive summary</h2>
        <p>
          The ARPA cliff is not a slogan. It is the end of an emergency funding
          architecture that temporarily changed how arts money moved in the
          United States. In 2021, the American Rescue Plan allocated $135
          million to the National Endowment for the Arts for arts-sector
          recovery.
          <Cite n={1} /> At the same time, the State and Local Fiscal Recovery
          Funds program delivered $350 billion to state, local, territorial, and
          Tribal governments.
          <Cite n={5} />
        </p>
        <p>
          Those two rails functioned differently. NEA ARP dollars were explicitly
          arts-sector relief. SLFRF dollars were flexible state and local
          recovery funds; arts support happened where public officials chose to
          treat artists, venues, local arts agencies, and cultural organizations
          as part of community recovery.
        </p>
        <p>
          By 2026, the question is no longer whether ARPA stabilized parts of
          the arts sector. It did. The question is what survives after temporary
          relief moves off the balance sheet and ordinary public budgets resume.
          The fiscal risk is not that every ARPA-funded program vanishes at once.
          The risk is that many local arts ecosystems were briefly capitalized by
          one-time federal money but were not converted into durable recurring
          funding.
        </p>
        <PullQuote>
          ARPA did not create a new permanent arts funding system. It revealed
          what became possible when emergency public capital reached artists and
          cultural organizations quickly enough to matter.
        </PullQuote>
        <div className="not-prose mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {theArpaCliff.heroStats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-background p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                {stat.label}
              </div>
              <div className="mt-2 text-3xl font-semibold tracking-tight">
                {stat.value}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {stat.context}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="two-rails" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          Two federal rails, one local cliff
        </h2>
        <p>
          ARPA arts funding is often discussed as if it were a single grant
          program. That misses the structure. The first rail was the NEA&apos;s
          $135 million ARP allocation, which was designed specifically for the
          arts and culture sector.
          <Cite n={1} /> The second rail was SLFRF, a much larger $350 billion
          recovery program for state, local, territorial, and Tribal governments.
          <Cite n={5} /> SLFRF did not require cities to fund the arts, but it
          gave them enough flexibility to do so.
        </p>
        <p>
          This distinction matters for 2026. NEA ARP dollars can be tracked as a
          federal arts intervention. SLFRF arts dollars are harder to summarize
          nationally because they depended on local budget choices, local arts
          advocacy, and local definitions of recovery. That is why the cliff is
          uneven: one city may have used recovery funds for artists and cultural
          agencies; another may have prioritized infrastructure, payroll,
          broadband, public health, or revenue replacement.
        </p>
        <WhyItMatters>
          <p>
            The ARPA cliff is not just the expiration of a grant program. It is
            the loss of flexible fiscal room that allowed cities and states to
            treat cultural infrastructure as recovery infrastructure.
          </p>
        </WhyItMatters>
      </section>

      <section id="nea-distribution" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          How NEA ARP funding moved
        </h2>
        <p>
          The NEA&apos;s ARP allocation moved through three primary channels. In
          April 2021, the agency announced that 40 percent of its $135 million
          allocation — more than $52 million — would go to 62 state,
          jurisdictional, and regional arts organizations for regranting through
          their own programs.
          <Cite n={2} />
        </p>
        <p>
          In November 2021, the NEA announced $20.2 million to 66 local arts
          agencies for subgranting. Those agencies could distribute local grants
          to eligible recipients for jobs, operations, facilities, health and
          safety supplies, and marketing or promotional efforts.
          <Cite n={3} /> In January 2022, the NEA recommended $57.75 million in
          direct ARP awards to 567 arts organizations. The agency reported that
          27 percent of those recommended organizations were first-time NEA
          grantees and 78 percent were small or medium-sized organizations with
          budgets below $2 million.
          <Cite n={4} />
        </p>
        <ChartById id="nea-arp-distribution" />
        <p>
          That distribution design is important. It did not only route money
          through large national institutions. It intentionally used state
          agencies, regional organizations, local arts agencies, and direct
          organizational grants to reach different parts of the arts ecosystem.
        </p>
      </section>

      <section id="slfrf-local-choices" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          How cities and states used SLFRF
        </h2>
        <p>
          SLFRF was broader than arts relief. Treasury describes the program as
          support for governments responding to and recovering from COVID-19,
          including replacement of lost public-sector revenue, maintenance of
          public services, and investments in long-term recovery.
          <Cite n={5} /> Within that broad authority, some governments directed
          money toward artists, cultural organizations, and local arts agencies.
        </p>
        <p>
          The National League of Cities documented cities using SLFRF for arts
          and culture, including St. Louis, where the Regional Arts Commission
          was set to receive $10.6 million in ARPA funds, and Winston-Salem,
          where $1 million supported a local arts-and-health initiative.
          <Cite n={7} /> Pennsylvania created the COVID-19 ARPA PA Arts and
          Culture Recovery Program with minimum grants of $25,000 and maximum
          grants of 25 percent of an applicant&apos;s operating budget or
          $500,000, whichever was less.
          <Cite n={8} />
        </p>
        <p>
          Cuyahoga County, Ohio proposed $3.3 million in ARPA funds for the
          creative economy, split between Cuyahoga Arts &amp; Culture and
          Assembly for the Arts to support arts nonprofits, creative workers,
          and for-profit creative businesses.
          <Cite n={9} /> Baltimore established a $500,000 ARPA Artist Grant
          Fund for local artists and separately reported $8.2 million committed
          to revitalizing the arts as of October 2024.
          <Cite n={10} />
          <Cite n={11} />
        </p>
        <ChartById id="local-arpa-arts-examples" />
      </section>

      <section id="the-2026-cliff" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          What changes in 2026
        </h2>
        <p>
          The 2026 cliff is a spending and replacement problem. NLC notes that
          after the December 2024 SLFRF obligation deadline, municipalities had
          until December 2026 to spend the dollars.
          <Cite n={6} /> For arts programs funded with one-time ARPA dollars,
          this creates a planning question: does the activity become part of a
          recurring city, state, foundation, or earned-revenue budget, or does it
          end when the recovery allocation is spent?
        </p>
        <p>
          State arts appropriations provide one comparison point for the
          post-relief environment. Arts Midwest&apos;s summary of NASAA FY2026
          data reports national legislative appropriations to state arts agencies
          of $646 million, down 5.9 percent from $694.3 million in FY2025.
          <Cite n={12} /> That number is not an ARPA-only metric, and it should
          not be treated as a direct measure of the cliff. It is better read as
          evidence of the fiscal environment into which ARPA-funded arts
          capacity is landing.
        </p>
        <ChartById id="fy2026-state-transition" />
      </section>

      <section id="comparative-examples" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          Selected examples and comparison
        </h2>
        <p>
          The examples above show four different uses of temporary recovery
          capital. St. Louis routed a large city allocation through a regional
          arts commission. Pennsylvania used a statewide recovery program for
          nonprofit arts and culture organizations, local arts districts, and
          arts and culture professionals. Cuyahoga County split relief between
          nonprofit arts organizations and creative workers or businesses.
          Baltimore used ARPA for both direct artist support and organizational
          arts grants.
        </p>
        <p>
          The common thread is not program design; it is the temporary nature of
          the source. ARPA helped stabilize organizations and artists after an
          acute shock. But one-time relief is structurally different from
          recurring operating support, endowment income, earned revenue, or
          durable donor pipelines.
        </p>
        <WhyItMatters>
          <p>
            A local ARPA grant can save a program in the year it is received.
            It does not automatically create the next year&apos;s budget. The
            cliff begins when recovery dollars are mistaken for a funding model.
          </p>
        </WhyItMatters>
      </section>

      <section id="bfta-conclusion" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          BFTA&apos;s analytical conclusion
        </h2>
        <p>
          The evidence does not support a simplistic claim that ARPA failed. The
          opposite is closer to the truth: ARPA showed that artists, local arts
          agencies, and cultural organizations can absorb public capital and turn
          it into jobs, operations, reopening, programming, and direct relief.
          The problem is that emergency funding solved an emergency-funding
          problem. It did not solve the durability problem.
        </p>
        <p>
          BFTA&apos;s conclusion is that the post-ARPA arts economy needs
          complementary funding rails that are not synchronized to the same
          political and municipal budget cycles. Public arts funding remains
          necessary. Philanthropy remains necessary. Earned revenue remains
          necessary. But the ARPA cliff shows why a serious arts ecosystem also
          needs funding mechanisms that can keep value available across cycles
          rather than only during emergencies.
        </p>
        <PullQuote>
          The lesson of ARPA is not that emergency arts funding was too large.
          The lesson is that the ordinary funding system was too brittle to make
          emergency support unnecessary.
        </PullQuote>
      </section>

      <section id="methodology" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          Methodology and source limits
        </h2>
        <p>
          This v1 report uses NEA, Treasury, National League of Cities, state
          agency, local government, and local intermediary sources available as
          of May 10, 2026. It distinguishes between NEA ARP dollars, which were
          explicitly arts-sector relief, and SLFRF dollars, which were flexible
          recovery funds that some governments directed toward the arts.
        </p>
        <p>
          This report does not use unsourced claims from AI summaries. Claims
          about city-leader sentiment, Title II arts education usage, and other
          comparison statistics were excluded unless a source could be identified
          and reviewed. Figures from Arts Midwest/NASAA are used as context for
          the FY2026 funding environment, not as direct measurements of ARPA
          program outcomes.
        </p>
      </section>
    </>
  );
}
