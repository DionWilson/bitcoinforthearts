import type { Metadata } from 'next';
import Link from 'next/link';
import {
  GRANT_SETTLEMENTS,
  formatUsd,
  mempoolUrl,
  railLabel,
  type GrantSettlement,
} from '@/lib/grant-settlements';

export const metadata: Metadata = {
  title: 'Grant Settlements',
  description:
    'Bitcoin for the Arts grant payment ledger — Lightning and on-chain settlement records for micro-grant awards.',
};

function SettlementRow({ row }: { row: GrantSettlement }) {
  const amount = row.amountBtcLabel
    ? `${formatUsd(row.amountUsd)} · ${row.amountBtcLabel}`
    : formatUsd(row.amountUsd);

  return (
    <tr className="border-t border-border align-top">
      <td className="py-4 pr-4">
        <div className="font-semibold text-foreground">{row.artistName}</div>
        <div className="mt-1 text-sm text-muted">{row.projectTitle}</div>
        <div className="mt-1 text-xs uppercase tracking-wide text-muted">
          {row.awardedOn}
        </div>
      </td>
      <td className="py-4 pr-4 whitespace-nowrap font-semibold text-foreground">
        {amount}
      </td>
      <td className="py-4 pr-4 text-sm text-muted">{railLabel(row.rail)}</td>
      <td className="py-4 text-sm text-muted">
        {row.rail === 'lightning' ? (
          <span>{row.lightningNote}</span>
        ) : row.txid ? (
          <a
            href={mempoolUrl(row.txid)}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all font-mono text-xs font-semibold text-foreground underline underline-offset-2 sm:text-sm"
          >
            {row.txid}
          </a>
        ) : (
          <span>{row.statusNote ?? '—'}</span>
        )}
      </td>
    </tr>
  );
}

export default function GrantSettlementsPage() {
  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            About · Governance · Settlements
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Grant settlements
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            A public ledger of how Bitcoin for the Arts settles micro-grants —
            Lightning or on-chain — so donors can see payment rails and, when
            available, transaction IDs. Artist stories and project detail live on
            the Grant Awards page; this page is the settlement record.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/grants/awards"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
            >
              Grant Awards (artist projects)
            </Link>
            <Link
              href="/about/governance"
              className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
            >
              Governance
            </Link>
            <Link
              href="/transparency"
              className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:bg-background"
            >
              Transparency
            </Link>
          </div>
        </div>

        <div className="mt-12 overflow-x-auto rounded-2xl border border-border bg-surface/40">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-background/80 text-xs font-semibold uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3 sm:px-5">Artist / project</th>
                <th className="px-4 py-3 sm:px-5">Amount</th>
                <th className="px-4 py-3 sm:px-5">Rail</th>
                <th className="px-4 py-3 sm:px-5">Settlement detail</th>
              </tr>
            </thead>
            <tbody className="px-4 sm:px-5">
              {GRANT_SETTLEMENTS.map((row) => (
                <SettlementRow key={row.id} row={row} />
              ))}
            </tbody>
          </table>
          <div className="border-t border-border px-4 py-3 text-xs text-muted sm:px-5">
            On-chain IDs link to mempool.space when published. Lightning
            settlements are noted without an on-chain transaction ID.
          </div>
        </div>
      </div>
    </main>
  );
}
