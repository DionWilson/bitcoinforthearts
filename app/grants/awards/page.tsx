import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  GRANT_AWARDS,
  formatUsd,
  type GrantAward,
} from '@/lib/grant-awards';

export const metadata: Metadata = {
  title: 'Grant Awards',
  description:
    'Artists awarded Bitcoin micro-grants by Bitcoin for the Arts — projects, reasons, and what they are building.',
};

function StatusBadge({ status }: { status: GrantAward['status'] }) {
  if (status === 'paid') {
    return (
      <span className="inline-flex items-center rounded-full border border-accent/50 bg-accent/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-foreground">
        Awarded
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
      Approved · paperwork in progress
    </span>
  );
}

function AwardBlock({ award }: { award: GrantAward }) {
  const amountLine = award.amountBtcLabel
    ? `${formatUsd(award.amountUsd)} · ${award.amountBtcLabel}`
    : formatUsd(award.amountUsd);

  return (
    <article
      id={award.id}
      className="scroll-mt-28 border-t border-border pt-12 first:border-t-0 first:pt-0"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg lg:col-span-5">
          <Image
            src={award.imageSrc}
            alt={award.imageAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </div>

        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={award.status} />
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              {award.discipline}
              {award.location ? ` · ${award.location}` : ''}
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {award.artistName}
            {award.artistAlsoKnownAs ? (
              <span className="text-muted"> ({award.artistAlsoKnownAs})</span>
            ) : null}
          </h2>
          <p className="mt-1 text-base font-medium text-foreground">
            {award.projectTitle}
          </p>
          <p className="mt-3 text-lg font-semibold tracking-tight text-foreground">
            {amountLine}
          </p>

          <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted sm:text-base">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-foreground">
                Why we awarded this
              </div>
              <p className="mt-2">{award.why}</p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-foreground">
                What they are doing
              </div>
              <p className="mt-2">{award.whatTheyAreDoing}</p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-foreground">
                Why this matters for donors
              </div>
              <p className="mt-2">{award.impactForDonors}</p>
            </div>
          </div>

          {award.links.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-3">
              {award.links.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold transition-colors hover:bg-surface"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function GrantAwardsPage() {
  const paid = GRANT_AWARDS.filter((a) => a.status === 'paid');
  const pending = GRANT_AWARDS.filter(
    (a) => a.status === 'approved_pending_paperwork',
  );

  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Grants · Awards
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Artists we have awarded.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Bitcoin for the Arts funds working artists in Bitcoin. This page is
            about who we support, why, and what they are building. Payment rails
            and transaction records live on our governance settlements ledger.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
            >
              Fund the next grant
            </Link>
            <Link
              href="/about/governance/grant-settlements"
              className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
            >
              Grant settlements ledger
            </Link>
            <Link
              href="/programming"
              className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:bg-background"
            >
              See our programming
            </Link>
          </div>
        </div>

        <section className="mt-16" aria-labelledby="paid-awards">
          <h2
            id="paid-awards"
            className="text-xs font-semibold uppercase tracking-wide text-muted"
          >
            Awarded
          </h2>
          <div className="mt-8 space-y-16">
            {paid.map((award) => (
              <AwardBlock key={award.id} award={award} />
            ))}
          </div>
        </section>

        {pending.length > 0 ? (
          <section className="mt-20" aria-labelledby="pending-awards">
            <h2
              id="pending-awards"
              className="text-xs font-semibold uppercase tracking-wide text-muted"
            >
              Approved · awaiting paperwork
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              These awards are approved by BFTA. Settlement posts on the{' '}
              <Link
                href="/about/governance/grant-settlements"
                className="font-semibold text-foreground underline underline-offset-2"
              >
                grant settlements ledger
              </Link>{' '}
              after paperwork is complete.
            </p>
            <div className="mt-8 space-y-16">
              {pending.map((award) => (
                <AwardBlock key={award.id} award={award} />
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-20 rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight">
            For foundations and grant partners
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            We run cultural programming — like Bitcoin Arts Park at the Midwest
            Bitcoin Summit — and we settle artist support in Bitcoin. If you fund
            arts, education, or financial inclusion, partner with us to expand
            micro-grants and bring this footprint to more rooms.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:grants@bitcoinforthearts.org?subject=Partnership%20%2F%20grant%20collaboration"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 border border-accent/60"
            >
              Talk to us about funding
            </a>
            <Link
              href="/about/governance/grant-settlements"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
            >
              View settlements ledger
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
