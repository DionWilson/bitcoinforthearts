import ResearchBarChart from '@/components/research/ResearchBarChart';
import { Cite } from '@/components/research/Citations';
import { stateOfArtsFunding2026 } from '@/lib/research';
import type { ReactNode } from 'react';

const chartsById = new Map(
  stateOfArtsFunding2026.charts.map((chart) => [chart.id, chart]),
);

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

export const stateOfArtsFundingSections = [
  { id: 'executive-summary', label: 'Executive summary' },
  { id: 'economic-baseline', label: 'The economic baseline' },
  { id: 'public-funding-risk', label: 'Public funding at risk' },
  { id: 'municipal-stress', label: 'Municipal stress and the ARPA cliff' },
  { id: 'private-market-response', label: 'The private-market response' },
  { id: 'who-gets-hurt', label: 'Who gets hurt first' },
  { id: 'bfta-thesis', label: "BFTA's analytical conclusion" },
  { id: 'methodology', label: 'References and methodology' },
];

export default function StateOfArtsFunding2026Report() {
  return (
    <>
      <section
        id="executive-summary"
        className="scroll-mt-24 rounded-2xl border border-border bg-surface p-6"
      >
        <h2 className="text-2xl font-semibold tracking-tight">Executive summary</h2>
        <p>
          The U.S. arts economy entered 2026 with a paradox at its center. On
          the one hand, the most recent national satellite account shows arts and
          cultural economic activity growing faster than the broader economy:
          real arts and cultural value added rose 6.6 percent in 2023, compared
          with 2.9 percent real GDP growth overall. The sector accounted for
          $1.17 trillion, or 4.2 percent of U.S. GDP, and supported 5.4 million
          jobs.
          <Cite n={1} />
        </p>
        <p>
          On the other hand, the funding rails below that economic footprint are
          tightening. NASAA&apos;s FY2026 preview projects total state and
          jurisdictional arts agency appropriations of $650.2 million, a $54
          million decline from the prior year and a 7.7 percent decrease.
          <Cite n={3} /> Federal arts support is also politically exposed: the
          President&apos;s FY2026 budget proposal recommended eliminating the
          National Endowment for the Arts, while the NEA separately cancelled
          the FY2026 Challenge America opportunity and revised Grants for Arts
          Projects eligibility.
          <Cite n={5} />
          <Cite n={6} />
        </p>
        <p>
          The result is not a simple story of decline. Private giving to arts,
          culture, and humanities recovered strongly in 2024, reaching $25.13
          billion according to Giving USA, up 9.5 percent in current dollars and
          6.4 percent after inflation.
          <Cite n={8} /> But private growth does not automatically replace
          public cuts. Philanthropy is unevenly distributed, relationship
          dependent, and generally easier for established institutions to access
          than small or emerging artist-led organizations.
        </p>
        <PullQuote>
          The arts are economically large, publicly vulnerable, and unevenly
          backstopped. That combination is the funding problem BFTA was built to
          address.
        </PullQuote>
        <div className="not-prose mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {stateOfArtsFunding2026.heroStats.map((stat) => (
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

      <section id="economic-baseline" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          The economic baseline
        </h2>
        <p>
          The strongest argument for arts funding begins with scale. The BEA
          Arts and Cultural Production Satellite Account measures arts and
          cultural production across 35 industry groups, including commercial and
          nonprofit activity. Its 2023 release shows that arts and culture were
          not a marginal economic category: $1.17 trillion in value added, 4.2
          percent of GDP, and 5.4 million jobs.
          <Cite n={1} />
        </p>
        <p>
          The growth rate matters because it contradicts a common assumption
          embedded in many public budget debates: that arts spending is a luxury
          add-on to the &quot;real&quot; economy. In 2023, arts and cultural
          economic activity grew at more than twice the rate of the broader
          economy in real terms.
          <Cite n={1} /> The NEA&apos;s summary of the same data emphasizes both
          the recovery and the unevenness: many industries exceeded 2019 value
          added levels by 2023, but performing arts organizations remained 12.3
          percent below their 2019 value-added level despite strong 2022-2023
          growth.
          <Cite n={2} />
        </p>
        <ChartById id="arts-growth-vs-economy" />
        <WhyItMatters>
          <p>
            A sector can be economically large and still financially fragile.
            Aggregate GDP contribution does not mean small venues, working
            artists, or community arts organizations have reserves, bargaining
            power, or reliable access to capital.
          </p>
        </WhyItMatters>
      </section>

      <section id="public-funding-risk" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          Public funding at risk
        </h2>
        <p>
          State arts agencies are one of the clearest early indicators of public
          arts funding pressure. NASAA&apos;s FY2026 preview projects $650.2
          million in total appropriations across state and jurisdictional arts
          agencies, down $54 million from the prior year. The preview describes
          the information as preliminary, collected before the start of most
          states&apos; fiscal years, but it is still a meaningful warning signal:
          total appropriations are projected to decline 7.7 percent.
          <Cite n={3} />
        </p>
        <ChartById id="state-arts-appropriations" />
        <p>
          Federal support faces a different kind of risk. NASAA reported that
          the President&apos;s FY2026 budget proposal recommended eliminating the
          NEA, while also noting that Congress, not the executive branch, sets
          final funding levels.
          <Cite n={5} /> That distinction matters: a presidential budget request
          is not a final appropriation. But it is a policy signal, and it
          affects how state agencies, local governments, nonprofits, and donors
          plan.
        </p>
        <p>
          Separately, the NEA announced FY2026 grant-opportunity changes:
          Challenge America was cancelled for FY2026; the February Grants for
          Arts Projects deadline was cancelled; updated deadlines moved to March
          and July 2025; and applicants were required to show a five-year history
          of arts programming.
          <Cite n={6} /> These are administrative changes, not the same thing as
          congressional defunding. But for small and newer organizations, changes
          in eligibility and deadlines can function as access restrictions even
          when a funding program formally remains open.
        </p>
      </section>

      <section id="municipal-stress" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          Municipal stress and the ARPA cliff
        </h2>
        <p>
          The American Rescue Plan Act&apos;s State and Local Fiscal Recovery
          Funds program delivered $350 billion to state, territorial, local, and
          Tribal governments.
          <Cite n={4} /> Treasury guidance places the program in the category of
          pandemic recovery funds designed to maintain services, replace lost
          public-sector revenue, and support recovery investments. The practical
          arts-funding issue is timing: temporary recovery funds helped local
          governments support programs that may now have to survive on ordinary
          revenue.
        </p>
        <p>
          San Diego illustrates the municipal pressure pattern. KPBS reported in
          April 2026 that the mayor&apos;s proposed budget would reduce arts
          funding from $13.8 million to $2 million, an $11.8 million cut and
          roughly an 85 percent reduction.
          <Cite n={9} /> The details are local, but the structure is national:
          when cities face budget gaps, discretionary categories such as arts and
          culture have fewer legal or political protections than core service
          obligations.
        </p>
        <WhyItMatters>
          <p>
            The ARPA cliff is not only about one federal program ending. It is
            about the exposure created when temporary emergency money is used to
            support cultural capacity that ordinary municipal budgets were never
            built to sustain.
          </p>
        </WhyItMatters>
      </section>

      <section id="private-market-response" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          The private-market response
        </h2>
        <p>
          The private funding picture is stronger than the public-funding picture
          in the latest available national data. Giving USA 2025 reports that
          total U.S. charitable giving reached $592.50 billion in 2024. Giving
          to arts, culture, and humanities reached $25.13 billion, up 9.5
          percent in current dollars and 6.4 percent after inflation.
          <Cite n={8} />
        </p>
        <ChartById id="arts-giving-real-dollars" />
        <p>
          This is encouraging, but it should not be misread as a full substitute
          for public funding. Giving USA also notes that individuals remain the
          largest source of charitable giving, while foundation grantmaking
          surpassed $100 billion for the third straight year.
          <Cite n={8} /> Those facts imply opportunity for arts organizations,
          but they also imply competition. Organizations with established donor
          networks, major-gift capacity, and foundation relationships are better
          positioned to convert broad philanthropic growth into actual operating
          dollars.
        </p>
        <p>
          The nonprofit arts sector also creates local economic spillovers that
          funders often overlook. Americans for the Arts describes Arts &
          Economic Prosperity 6 as covering 373 regions across all 50 states and
          Puerto Rico, measuring economic and social impact across rural,
          suburban, and large urban communities.
          <Cite n={7} /> This supports the case that arts funding is not merely
          cultural spending; it is part of visitor economies, local identity, and
          community infrastructure.
        </p>
      </section>

      <section id="who-gets-hurt" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          Who gets hurt first
        </h2>
        <p>
          The first organizations harmed by funding volatility are usually not
          the institutions with large boards, endowments, and development teams.
          They are smaller organizations, artist-led projects, newer nonprofits,
          fiscally sponsored groups, and community programs whose budgets depend
          on one or two grants. When a grant deadline moves, eligibility changes,
          a city line item disappears, or a pass-through appropriation is cut,
          these groups have fewer reserves and less staff capacity to absorb the
          shock.
        </p>
        <p>
          That is why the distinction between aggregate sector strength and
          distributional fragility is central to this report. BEA and NEA data
          show a trillion-dollar arts economy.
          <Cite n={1} />
          <Cite n={2} /> NASAA data show state funding pressure.
          <Cite n={3} /> City reporting shows local grant programs can be
          proposed for deep cuts when municipal budgets tighten.
          <Cite n={9} /> Giving USA shows private giving growth.
          <Cite n={8} /> Taken together, the data describe a sector with real
          economic power but uneven access to durable capital.
        </p>
      </section>

      <section id="bfta-thesis" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          BFTA&apos;s analytical conclusion
        </h2>
        <p>
          The conclusion is not that public funding should disappear, or that
          philanthropy alone can solve arts funding. The evidence points in the
          opposite direction: public support, private giving, earned revenue, and
          local cultural policy all remain necessary. The weakness is
          concentration. An artist or organization dependent on one funding rail
          is exposed to the failure mode of that rail.
        </p>
        <p>
          Bitcoin for the Arts argues for an additional rail: a non-state-
          dependent funding mechanism that can pay artists directly, settle
          quickly, and preserve a portion of donated value in a long-term Bitcoin
          reserve. That is an analytical conclusion drawn from the funding
          landscape above, not a claim that Bitcoin replaces public investment.
          The more accurate claim is narrower: if the arts are economically
          important but funding is politically and institutionally fragile, then
          the sector needs at least some capital that fails differently.
        </p>
        <PullQuote>
          The 2026 arts funding problem is not lack of cultural value. It is a
          mismatch between the value artists create and the durability of the
          systems that fund them.
        </PullQuote>
      </section>

      <section id="methodology" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          References and methodology
        </h2>
        <p>
          This v1 report uses public, citable sources available as of May 10,
          2026. National economic figures come from the BEA Arts and Cultural
          Production Satellite Account and the NEA&apos;s accompanying summary.
          State appropriations context comes from NASAA&apos;s FY2026 preview and
          related federal-policy commentary. ARPA context comes from Treasury
          SLFRF materials. Private giving figures come from Giving USA 2025,
          researched by the Indiana University Lilly Family School of
          Philanthropy. Local stress examples use reported municipal budget
          coverage.
        </p>
        <p>
          BFTA does not treat preliminary projections as final appropriations.
          Where data are preliminary, this report says so. Where a budget
          proposal is not binding, this report says so. Where national data are
          lagged, this report uses the latest available national release rather
          than inventing 2026 estimates.
        </p>
      </section>
    </>
  );
}
