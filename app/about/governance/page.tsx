import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import BoardNominationForm from '@/components/BoardNominationForm';

export const metadata: Metadata = {
  title: 'Governance',
  description:
    'Governing documents for Bitcoin For The Arts (BFTA): bylaws, conflict of interest policy, endowment management, curatorial manifesto, code of ethics, and CSR policy.',
};

const DOCS = [
  {
    title: 'Bylaws (PDF)',
    description: 'Board structure, voting, officer roles, and organizational rules.',
    href: '/resources/governance/bylaws.pdf',
  },
  {
    title: 'Conflict of Interest Policy (PDF)',
    description: 'Disclosures, recusals, and integrity safeguards for decision-making.',
    href: '/resources/governance/conflict-of-interest-policy.pdf',
  },
  {
    title: 'Endowment / Reserve Management (PDF)',
    description: 'How BFTA manages reserves with transparency and long-term stewardship.',
    href: '/resources/governance/endowment-management.pdf',
  },
  {
    title: 'Curatorial Manifesto (PDF)',
    description: 'Our curatorial principles for sovereign art in the Bitcoin era.',
    href: '/resources/governance/curatorial-manifesto.pdf',
  },
  {
    title: 'Code of Ethics (PDF)',
    description: 'Standards of conduct for board members, staff, and volunteers.',
    href: '/BFTA Code of Ethics.pdf',
  },
  {
    title: 'Corporate Social Responsibility Policy (PDF)',
    description: 'Our commitments to ethical, social, and environmental responsibility.',
    href: '/BFTA CSR Policy.pdf',
  },
] as const;

function DocCard(props: { title: string; description: string; href: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted">Governance document</div>
      <div className="mt-3 text-lg font-semibold tracking-tight">{props.title}</div>
      <div className="mt-2 text-sm leading-relaxed text-muted">{props.description}</div>
      <div className="mt-5">
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
        >
          View / Download PDF
        </a>
      </div>
      <div className="mt-2 text-xs text-muted">
        If a link opens a 404, the PDF is still being uploaded or renamed.
      </div>
    </div>
  );
}

export default function GovernancePage() {
  const trusteesEmail = (
    process.env.GOVERNANCE_TO_EMAIL ??
    process.env.BOARD_NOMINATION_TO_EMAIL ??
    'trustees@bitcoinforthearts.org'
  ).trim();
  return (
    <main className="bg-background min-h-screen">
      <section className="relative h-[320px] w-full overflow-hidden border-b border-border sm:h-[420px]">
        <Image
          src="/bitcoin-court.JPG"
          alt="Bitcoin For The Arts governance"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/80">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">Governance</span>
          </div>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Governance & Transparency.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
            How we structure decision-making, safeguard integrity, and steward long-term sustainability—aligned with
            uncensorable money and uncensorable minds.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-5xl">
          <div className="rounded-3xl border border-border bg-surface/80 p-8 shadow-sm">
            <div className="rounded-2xl border border-accent/40 bg-surface/80 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Nonprofit status
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Bitcoin For The Arts, Inc. is a{' '}
                <span className="font-semibold text-foreground">501(c)(3) tax-exempt nonprofit</span>.
                {process.env.NEXT_PUBLIC_BFTA_EIN?.trim() ? (
                  <>
                    <br />
                    <span className="font-semibold text-foreground">EIN:</span>{' '}
                    {process.env.NEXT_PUBLIC_BFTA_EIN.trim()}
                  </>
                ) : null}
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-accent/40 bg-background p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Grant settlements
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Public ledger of micro-grant payments — Lightning or on-chain —
                including transaction IDs when settled on-chain.
              </p>
              <Link
                href="/about/governance/grant-settlements"
                className="mt-4 inline-flex items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
              >
                View grant settlements ledger
              </Link>
            </div>

            <div className="mt-8 text-xs font-semibold uppercase tracking-wide text-muted">
              Brief overview of governance for Bitcoin For The Arts, Inc.
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Based on our conversations (Nov 2025 – Jan 2026), content from bitcoinforthearts.org, and our Bitcoin-aligned
              ethos of uncensorability, radical transparency, and long-term sustainability, this is a synthesized overview
              of how BFTA approaches governance as an early-stage nonprofit.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4">
              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="text-sm font-semibold tracking-tight">Core governance principles</div>
                <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted">
                  <li>
                    <span className="font-semibold text-foreground">Mission-driven focus:</span> Governance ensures decisions
                    align with <span className="font-semibold text-foreground">“Uncensorable money • Uncensorable minds”</span>
                    — funding sovereign creators through Bitcoin micro-grants, workshops, residencies, and productions.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Transparency & accountability:</span> Public reporting and
                    verifiability are central—allocations (55% grants / 30% programs / 10% ops / 5% reserve) and on-chain
                    tracking support a no-gatekeepers culture.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Board structure:</span> As BFTA matures, the goal is a
                    diverse board of <span className="font-semibold text-foreground">5–9 members</span> (artists, Bitcoin
                    experts, legal/finance) with clear terms and responsibilities. Founding trustees include Avi Burra
                    (Treasurer) and Cheryl McGinnis (Secretary).
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Decision-making:</span> Clear agendas, documented votes,
                    hybrid meetings, and strong policies (conflict-of-interest, ethics, whistleblower) tailored to Bitcoin
                    realities (e.g., secure wallet management).
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Committees & operations:</span> Grants, Education/Programs,
                    and Finance/Endowment committees help keep operations lean and mission-aligned.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Risk management & compliance:</span> Responsible Bitcoin
                    stewardship and nonprofit compliance (e.g., IRS filings) to protect the mission across cycles.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Community involvement:</span> Governance is not top-down—
                    artist input is invited through newsletters, workshops, and partnerships.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Governance documents
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {DOCS.map((d) => (
                  <DocCard key={d.href} title={d.title} description={d.description} href={d.href} />
                ))}
              </div>
            </div>

            <div className="mt-10">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Board member nominations
              </div>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                Nominate a board member
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Help us build a diverse board of sovereign creators, Bitcoin experts, and arts advocates. Nominations are
                reviewed internally; nominees are contacted only if shortlisted.
              </p>
              <div className="mt-3 text-xs text-muted">
                Submissions are routed to{' '}
                <a
                  className="font-semibold underline underline-offset-4"
                  href={`mailto:${trusteesEmail}?subject=BFTA%20board%20nomination`}
                >
                  {trusteesEmail}
                </a>
                .
              </div>
              <div className="mt-5">
                <BoardNominationForm />
              </div>
            </div>

            <div className="mt-8 text-sm text-muted">
              Prefer to ask questions? Email{' '}
              <a
                className="font-semibold underline underline-offset-4"
                href="mailto:hello@bitcoinforthearts.org?subject=Governance%20question"
              >
                hello@bitcoinforthearts.org
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

