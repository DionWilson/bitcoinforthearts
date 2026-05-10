import type { ReactNode } from 'react';
import ResearchBarChart from '@/components/research/ResearchBarChart';
import { Cite } from '@/components/research/Citations';
import { soundMoneyForTheArts } from '@/lib/research';

const chartsById = new Map(
  soundMoneyForTheArts.charts.map((chart) => [chart.id, chart]),
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

export const soundMoneyForTheArtsSections = [
  { id: 'executive-summary', label: 'Executive summary' },
  { id: 'fiat-debasement', label: 'The monetary background condition' },
  { id: 'artist-exposure', label: 'Why working artists are exposed' },
  { id: 'fixed-grants', label: 'The purchasing power of fixed grants' },
  { id: 'traditional-endowments', label: 'The limits of conventional endowments' },
  { id: 'bitcoin-reserve', label: 'Bitcoin as reserve design' },
  { id: 'donor-institution-implications', label: 'Implications for donors and institutions' },
  { id: 'methodology', label: 'Methodology and limits' },
];

export default function SoundMoneyForTheArtsReport() {
  return (
    <>
      <section
        id="executive-summary"
        className="scroll-mt-24 rounded-2xl border border-border bg-surface p-6"
      >
        <h2 className="text-2xl font-semibold tracking-tight">Executive summary</h2>
        <p>
          The distinctive research question for Bitcoin for the Arts is not
          whether artists need more funding. The earlier reports already show
          that arts funding is economically important, politically exposed, and
          vulnerable to temporary public relief cycles. This report asks a
          narrower monetary question: what happens to artists and arts
          institutions when funding is awarded, budgeted, and endowed in a unit
          of account that loses purchasing power over time?
        </p>
        <p>
          Since January 1971, the Consumer Price Index has risen from 39.9 to
          330.293 as of March 2026. Stated the other way, one 1971 dollar
          retains roughly twelve cents of CPI purchasing power in 2026.
          <Cite n={1} /> Over the same period, the Federal Reserve&apos;s M2
          money stock series rose from $632.9 billion to $22.686 trillion.
          <Cite n={2} /> These measures are not identical: CPI measures consumer
          prices, while M2 measures liquid money balances. Read together, they
          describe the monetary environment in which artists price labor, buy
          materials, rent studios, accept grants, and plan projects.
        </p>
        <p>
          The burden is not evenly distributed. The NEA&apos;s statistical
          portrait found that artists were 3.6 times as likely as other workers
          to be self-employed: roughly 34 percent of artists compared with 9
          percent of all workers in 2012-2016.
          <Cite n={6} /> Fine artists and photographers had self-employment
          rates above 50 percent. This makes the artist labor market unusually
          exposed to fixed-price contracts, irregular income, delayed payment,
          and limited inflation pass-through.
        </p>
        <PullQuote>
          Monetary debasement is not a neutral background condition for cultural
          production. It is a slow conversion of future artistic capacity into
          present fiscal room.
        </PullQuote>
        <div className="not-prose mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {soundMoneyForTheArts.heroStats.map((stat) => (
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

      <section id="fiat-debasement" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          The monetary background condition
        </h2>
        <p>
          This report uses &quot;debasement&quot; descriptively, not as a
          moral slogan. In modern fiat systems, money supply and credit
          conditions are elastic. That elasticity can be useful during crises,
          but it also means the unit in which artists are paid is not a stable
          measuring stick across decades. The CPI series shows the consumer-price
          side of that problem. M2 shows the liquidity side.
          <Cite n={1} />
          <Cite n={2} />
        </p>
        <ChartById id="dollar-purchasing-power-remaining" />
        <p>
          For many institutions, inflation is treated as an accounting variable.
          For artists, it is often a production variable. A painter cannot
          invoice yesterday&apos;s linen prices after rent, insurance, shipping,
          pigments, fabrication, and labor costs move higher. A dancer cannot
          reprice a grant after rehearsal space rises. A composer cannot
          recover lost purchasing power from a fixed commission after the
          contract is signed.
        </p>
        <WhyItMatters>
          <p>
            The core arts-funding problem is not only that there is too little
            money. It is that the money arrives in a depreciating unit while many
            artistic costs are paid later, after prices have changed.
          </p>
        </WhyItMatters>
      </section>

      <section id="artist-exposure" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          Why working artists are exposed
        </h2>
        <p>
          Artists are not a single labor category, and a rigorous report should
          avoid pretending they are. Architects, designers, dancers, musicians,
          writers, photographers, actors, producers, fine artists, and
          multidisciplinary workers face different markets. Still, the NEA data
          show a structural feature across the artist workforce: self-employment
          is much more common among artists than among workers overall.
          <Cite n={6} />
        </p>
        <p>
          Self-employment can be desirable. The same NEA report notes that most
          self-employed artists did not prefer to work for someone else, and many
          cited flexible schedules and independence.
          <Cite n={6} /> But independence also changes monetary exposure. A
          salaried worker may receive cost-of-living adjustments, employer
          benefits, retirement contributions, and partial insulation from
          payment delays. A working artist often faces lumpy income, no automatic
          indexing, upfront production costs, and weak bargaining power.
        </p>
        <p>
          The BLS Occupational Outlook Handbook reports a median annual wage of
          $56,260 for craft and fine artists in May 2024.
          <Cite n={8} /> That figure is useful but incomplete: it does not
          capture the full volatility of project-based income, the unpaid time
          embedded in development, or the way artists often combine art work
          with teaching, service, design, administration, or unrelated jobs.
          The monetary point is that irregular nominal income is harder to hedge
          than regular nominal income.
        </p>
        <PullQuote>
          The artist is often a price-taker in a world designed for institutions
          with pricing power.
        </PullQuote>
      </section>

      <section id="fixed-grants" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          The purchasing power of fixed grants
        </h2>
        <p>
          Grants and commissions are usually stated in nominal dollars. A
          $10,000 grant sounds stable because the number stays the same. In real
          terms, the value changes with the price level. Using CPI, a fixed
          $10,000 nominal grant in 2000 has the purchasing power of about $5,126
          by March 2026 when measured in 2000 dollars.
          <Cite n={1} />
        </p>
        <ChartById id="fixed-grant-purchasing-power" />
        <p>
          This arithmetic is simple, but its institutional implications are
          large. If grant sizes are not indexed, artists absorb the difference.
          If grants are indexed but endowments are not earning enough real
          return after spending, institutions absorb the difference. If neither
          side has a reserve asset that preserves purchasing power, the system
          relies on future donors to recapitalize yesterday&apos;s promises.
        </p>
        <WhyItMatters>
          <p>
            One-time nominal generosity can become long-term real austerity.
            Sound funding design has to specify not just the amount of a grant,
            but how that amount is protected between commitment and use.
          </p>
        </WhyItMatters>
      </section>

      <section id="traditional-endowments" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          The limits of conventional endowments
        </h2>
        <p>
          Conventional endowments remain one of the most important institutional
          inventions in nonprofit finance. They pool gifts, invest for the long
          term, and spend a portion of assets each year. The FY2024
          NACUBO-Commonfund Study of Endowments reported that participating
          higher education institutions held $873.7 billion in endowment assets,
          withdrew $30.0 billion during the fiscal year, earned an average
          10-year annual return of 6.8 percent, and reported an average
          effective spending rate of 4.8 percent.
          <Cite n={3} />
        </p>
        <p>
          NACUBO describes endowments through the principle of intergenerational
          equity: preserving real value so future beneficiaries receive support
          comparable to present beneficiaries.
          <Cite n={3} /> That principle is exactly the right standard for arts
          patronage. The challenge is the arithmetic. A conventional endowment
          must earn enough to fund spending, inflation, costs, and future growth
          before it has truly preserved real capital. When inflation is high or
          returns are low, the margin narrows.
        </p>
        <ChartById id="reserve-scenario" />
        <p>
          The scenario above is deliberately conservative and illustrative. It
          is not a forecast. It shows why endowment managers focus on real
          returns, not headline nominal returns. A 6.8 percent nominal return is
          strong only after the spending rule, inflation, and costs are
          considered. In arts philanthropy, where many organizations lack the
          scale and professional investment access of large universities, the
          problem is harder.
        </p>
      </section>

      <section id="bitcoin-reserve" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          Bitcoin as reserve design
        </h2>
        <p>
          Bitcoin does not remove volatility, fiduciary responsibility, custody
          risk, or the need for governance. It does something narrower and
          structurally important: it removes discretionary monetary dilution from
          the reserve asset itself. The Bitcoin white paper describes a
          peer-to-peer electronic cash system based on cryptographic proof
          rather than a trusted third party.
          <Cite n={4} /> The issuance schedule is defined by protocol rules:
          new bitcoin is created through block subsidies that halve every
          210,000 blocks, with total issuance approaching slightly less than 21
          million bitcoin.
          <Cite n={5} />
        </p>
        <ChartById id="bitcoin-supply-schedule" />
        <p>
          For an arts endowment, the relevant distinction is not that bitcoin
          guarantees a future dollar price. It does not. The distinction is that
          bitcoin-denominated principal cannot be diluted by a central issuer.
          A fiat endowment must outrun monetary and price inflation. A Bitcoin
          reserve must manage volatility, custody, liquidity, and governance —
          but not supply inflation beyond the protocol schedule.
        </p>
        <WhyItMatters>
          <p>
            Bitcoin is best understood here as an institutional reserve design,
            not as a magic yield product. Its contribution is credible scarcity,
            auditability, and settlement finality; its risks must be governed
            openly.
          </p>
        </WhyItMatters>
      </section>

      <section id="donor-institution-implications" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          Implications for donors and institutions
        </h2>
        <p>
          Donors who want durable cultural impact should ask a harder question
          than &quot;How much did I give?&quot; They should ask what monetary
          unit, reserve policy, custody model, spending rule, and transparency
          standard will protect the gift&apos;s real artistic capacity. A
          million-dollar gift that is spent quickly can be valuable. A
          million-dollar endowment that loses real purchasing power can still be
          insufficient. A Bitcoin reserve introduces a different set of tradeoffs
          that may be appropriate for a portion of long-horizon arts patronage.
        </p>
        <p>
          For BFTA, the practical implication is not an all-or-nothing mandate.
          The more disciplined position is a portfolio principle: direct grants
          should meet current artist needs; operating reserves should remain
          liquid enough to manage obligations; and a long-term Bitcoin reserve
          can preserve exposure to a scarce monetary asset for future artists.
          That is a funding architecture, not a slogan.
        </p>
        <PullQuote>
          Sound money does not replace artistic judgment. It protects the time
          horizon in which artistic judgment can matter.
        </PullQuote>
      </section>

      <section id="methodology" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">
          Methodology and limits
        </h2>
        <p>
          This report uses public data available as of May 10, 2026. CPI and M2
          values are drawn from FRED series CPIAUCSL and M2SL. Purchasing-power
          calculations compare index values across dates; they are broad
          consumer-price estimates and do not perfectly measure artists&apos;
          specific cost baskets. Artist labor-market claims rely primarily on
          NEA statistical reports and BLS occupational summaries.
        </p>
        <p>
          Endowment analysis uses NACUBO-Commonfund public summary statistics.
          The reserve scenario is illustrative and should not be read as a
          forecast of market returns. Bitcoin analysis distinguishes between
          monetary supply rules, which are protocol-governed, and future
          purchasing power, which is market-dependent and uncertain. This report
          does not provide investment, legal, accounting, or tax advice.
        </p>
      </section>
    </>
  );
}
