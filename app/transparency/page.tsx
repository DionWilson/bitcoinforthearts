import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Transparency',
  description:
    'Board minutes, governance records, and funding-dependent program proposals for Bitcoin for the Arts, Inc.',
};

type DocLink = {
  title: string;
  href: string;
  subtitle?: string;
};

const minutes: DocLink[] = [
  {
    title: 'Board Meeting Minutes: Organizational Meeting (Q4 2025)',
    subtitle: 'Held November 16, 2025. Bylaws, officers, banking, and IRS filings.',
    href: '/BFTA-Incorp-Minutes-Q4-2025.pdf',
  },
  {
    title: 'Board Meeting Minutes: Q1 2026',
    subtitle: 'Held February 3, 2026. Quarterly meeting of the Board of Directors.',
    href: '/BFTA-Minutes-Q1-2026.pdf',
  },
  {
    title: 'Board Meeting Minutes: Q2 2026',
    subtitle: 'Held April 7, 2026. Quarterly meeting of the Board of Directors.',
    href: '/BFTA-Minutes-Q2-2026.pdf',
  },
  {
    title: 'Board Meeting Minutes: Q3 2026',
    subtitle: 'Held July 7, 2026. Quarterly meeting of the Board of Directors.',
    href: '/BFTA-Minutes-Q3-2026.pdf',
  },
  {
    title: 'Board Meeting Minutes: Q4 2026',
    subtitle: 'Held October 6, 2026. Midwest Bitcoin Summit results and grant awards.',
    href: '/BFTA-Minutes-Q4-2026.pdf',
  },
];

const proposals: DocLink[] = [
  {
    title:
      'Empowering Creators: Pathways to Financial Sovereignty in the Arts - Proposal Draft (Feb 2026)',
    subtitle:
      'Funding-dependent education initiative focused on Bitcoin literacy through arts partner organizations.',
    href: '/transparency/bitcoin-education-initiative-proposal',
  },
  {
    title: 'Sovereign Artist Residency Program — Proposal Draft (Feb 2026)',
    subtitle:
      'Funding-dependent residency model shared for transparency, collaboration, and donor alignment.',
    href: '/transparency/sovereign-artist-residency-proposal',
  },
];

export default function TransparencyPage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Transparency
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Board Minutes, Documents, and Proposal Drafts
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            We publish key governance records to support accountability and radical
            transparency, including funding-dependent program proposals.
          </p>

          <div className="mt-10 text-xs font-semibold uppercase tracking-wide text-muted">
            Board minutes
          </div>
          <div className="mt-4 space-y-4">
            {minutes.map((doc) => (
              <div
                key={doc.href}
                className="rounded-2xl border border-border bg-surface/60 p-5"
              >
                <div className="text-sm font-semibold tracking-tight">
                  {doc.title}
                </div>
                {doc.subtitle ? (
                  <div className="mt-1 text-sm text-muted">{doc.subtitle}</div>
                ) : null}
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
                  >
                    View PDF
                  </a>
                  <a
                    href={doc.href}
                    download
                    className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-background px-5 py-2 text-sm font-semibold transition-colors hover:bg-surface"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-xs font-semibold uppercase tracking-wide text-muted">
            Program proposals (drafts)
          </div>
          <div className="mt-4 space-y-4">
            {proposals.map((proposal) => (
              <div
                key={proposal.href}
                className="rounded-2xl border border-border bg-background p-5"
              >
                <div className="text-sm font-semibold tracking-tight">
                  {proposal.title}
                </div>
                {proposal.subtitle ? (
                  <div className="mt-1 text-sm text-muted">{proposal.subtitle}</div>
                ) : null}
                <div className="mt-3 text-xs text-muted">
                  Status: Draft subject to change. Not yet launched.
                </div>
                <div className="mt-4">
                  <Link
                    href={proposal.href}
                    className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-surface px-5 py-2 text-sm font-semibold transition-colors hover:bg-background"
                  >
                    Read proposal
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-surface/60 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <a
                href="https://app.candid.org/profile/16531141/bitcoin-for-the-arts-inc-41-2642260/?pkId=c5d73d72-2176-49f8-a0d2-9a25be9fb115"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Bitcoin for the Arts on Candid"
                className="shrink-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Candid transparency seal"
                  src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/16531141/svg"
                  width={80}
                  height={80}
                />
              </a>
              <div>
                <div className="text-sm font-semibold tracking-tight">
                  Verified on Candid (GuideStar)
                </div>
                <p className="mt-1 text-sm text-muted">
                  Bitcoin For The Arts, Inc. is registered with Candid, the
                  leading source of nonprofit data and transparency reporting.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-background p-5 text-sm text-muted">
            Looking for our governance overview? Visit{' '}
            <Link href="/about/governance" className="underline underline-offset-4">
              Governance &amp; reporting
            </Link>
            .
          </div>
        </div>
      </div>
    </main>
  );
}

