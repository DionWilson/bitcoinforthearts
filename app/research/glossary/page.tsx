import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Research Glossary',
  description:
    'Definitions for arts funding, public finance, nonprofit research, and Bitcoin terms used by Bitcoin for the Arts Research.',
  alternates: {
    canonical: '/research/glossary',
  },
};

const sections = [
  {
    title: 'Arts funding and cultural policy',
    terms: [
      {
        term: 'Arts and Cultural Production Satellite Account (ACPSA)',
        definition:
          'A BEA/NEA statistical account measuring the economic value of arts and cultural production in the United States and states.',
      },
      {
        term: 'Local arts agency',
        definition:
          'A local public or nonprofit entity that supports artists, arts organizations, cultural planning, grants, public art, or community arts activity.',
      },
      {
        term: 'Operating support',
        definition:
          'Funding that supports general operations, staffing, rent, utilities, administration, or organizational capacity rather than a single restricted project.',
      },
      {
        term: 'Regranting',
        definition:
          'A funding structure in which one agency or organization receives funds and redistributes them to eligible artists, organizations, or local partners.',
      },
      {
        term: 'State arts agency',
        definition:
          'A state-level public agency that supports arts participation, grants, cultural policy, and statewide arts infrastructure.',
      },
      {
        term: 'Unrestricted grant',
        definition:
          'A grant that gives the recipient flexibility to use funds for broad mission or operating needs, subject to the grant agreement.',
      },
    ],
  },
  {
    title: 'Public finance and philanthropy',
    terms: [
      {
        term: 'Appropriation',
        definition:
          'A formal authorization of public funds by a legislature or governing body for a specific agency, program, purpose, or fiscal year.',
      },
      {
        term: 'Balance sheet',
        definition:
          'A financial statement showing assets, liabilities, and net assets or equity at a point in time.',
      },
      {
        term: 'Endowment',
        definition:
          'A pool of assets intended to support an institution or purpose over a long horizon, usually through investment returns and a spending policy.',
      },
      {
        term: 'Line-item appropriation',
        definition:
          'A specific appropriation for a named project, recipient, or program, often separate from a base agency budget.',
      },
      {
        term: 'Operating expense',
        definition:
          'A recurring cost required to run an organization, such as staff, rent, insurance, software, utilities, or administration.',
      },
      {
        term: 'Spending rule',
        definition:
          'A policy that determines how much an endowment or reserve may distribute each year, commonly based on a percentage of trailing market value.',
      },
    ],
  },
  {
    title: 'Monetary economics',
    terms: [
      {
        term: 'Consumer Price Index (CPI)',
        definition:
          'A price index measuring changes in the cost of a basket of goods and services purchased by consumers. BFTA uses CPI cautiously as a broad purchasing-power proxy.',
      },
      {
        term: 'Fiat money',
        definition:
          'Government-issued money not redeemable for a fixed quantity of a commodity and whose supply is governed by policy and financial institutions.',
      },
      {
        term: 'M2',
        definition:
          'A broad money-stock measure that includes currency, checking deposits, savings deposits, small time deposits, and retail money market funds, with methodology changes over time.',
      },
      {
        term: 'Monetary debasement',
        definition:
          'A decline in the purchasing power or scarcity of a monetary unit. In BFTA reports, the term is used analytically and should be tied to data such as CPI, money supply, or real purchasing power.',
      },
      {
        term: 'Purchasing power',
        definition:
          'The amount of goods or services a unit of money can buy. A dollar can retain its nominal face value while losing purchasing power over time.',
      },
    ],
  },
  {
    title: 'Bitcoin and custody',
    terms: [
      {
        term: 'Bitcoin',
        definition:
          'A peer-to-peer monetary network and digital asset governed by protocol rules, proof-of-work consensus, and a supply schedule approaching 21 million bitcoin.',
      },
      {
        term: 'Lightning Network',
        definition:
          'A payment network built on Bitcoin that enables fast, low-cost payments using payment channels.',
      },
      {
        term: 'Multisignature custody',
        definition:
          'A custody structure requiring multiple private keys to authorize movement of funds, reducing single-key failure risk when governed properly.',
      },
      {
        term: 'Satoshi',
        definition:
          'The smallest commonly referenced unit of bitcoin, equal to one hundred-millionth of one bitcoin.',
      },
      {
        term: 'Self-custody',
        definition:
          'Holding and controlling private keys directly rather than relying entirely on a third-party custodian.',
      },
      {
        term: 'Sound money',
        definition:
          'Money with rules or properties designed to resist arbitrary dilution. BFTA uses the term in relation to long-horizon cultural patronage and reserve design.',
      },
    ],
  },
] as const;

export default function ResearchGlossaryPage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
          <Link href="/research" className="hover:underline">
            Research
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">Glossary</span>
        </div>

        <section className="mt-8 border-b border-border pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Bitcoin for the Arts Research
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Research glossary
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
            Definitions for the arts funding, nonprofit finance, public policy,
            monetary economics, and Bitcoin terms used across BFTA Research.
          </p>
        </section>

        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-2xl font-semibold tracking-tight">
                {section.title}
              </h2>
              <dl className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {section.terms.map((item) => (
                  <div key={item.term} className="rounded-xl border border-border bg-background p-5">
                    <dt className="text-base font-semibold tracking-tight">
                      {item.term}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted">
                      {item.definition}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <section className="mt-10 rounded-2xl border border-border bg-background p-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Suggest a term
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            If a report uses a term that should be defined here, send the term,
            report link, and proposed source context to{' '}
            <a
              href="mailto:info@bitcoinforthearts.org?subject=BFTA%20Research%20glossary%20term"
              className="font-semibold underline underline-offset-4"
            >
              info@bitcoinforthearts.org
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
