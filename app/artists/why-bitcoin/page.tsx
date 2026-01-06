import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Why Bitcoin',
  description:
    'Why Bitcoin matters for artists: ownership, censorship resistance, and long-term creation.',
};

export default function WhyBitcoinPage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <Link href="/artists" className="hover:underline">
              Artists
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">Why Bitcoin</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Why Bitcoin?
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                Artists create value that outlives trends — but the old system takes
                huge cuts, moves slowly, and quietly erodes your earnings. Bitcoin
                is a tool for <span className="font-semibold text-foreground">direct patronage</span>,{' '}
                <span className="font-semibold text-foreground">true ownership</span>, and{' '}
                <span className="font-semibold text-foreground">long-term creation</span>.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/grants"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 border border-accent/60"
                >
                  Apply for a grant
                </Link>
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                >
                  Donate
                </Link>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Start here
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  If you want the “why” straight from the source, read the original
                  paper that kicked it all off.
                </p>
                <a
                  href="https://bitcoin.org/bitcoin.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:bg-surface"
                >
                  Read the Bitcoin whitepaper
                </a>
                <p className="mt-4 text-xs text-muted">
                  Tip: search for “peer-to-peer” and “no trusted third party.”
                </p>
              </div>
            </aside>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-border mobile-pop-card p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Sound money
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                A fixed supply (21 million) means your savings aren’t designed to be
                diluted over time.
              </p>
            </div>
            <div className="rounded-2xl border border-border mobile-pop-card p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Direct patronage
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Get paid by supporters without waiting on platforms, gatekeepers, or
                bank approvals.
              </p>
            </div>
            <div className="rounded-2xl border border-border mobile-pop-card p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Censorship resistance
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                A payment rail that can’t be “turned off” because your work is
                unpopular or inconvenient.
              </p>
            </div>
            <div className="rounded-2xl border border-border mobile-pop-card p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Global by default
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Anyone can support you anywhere — small tips or large patron gifts —
                without international payment friction.
              </p>
            </div>
            <div className="rounded-2xl border border-border mobile-pop-card p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Self-custody
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                You can hold your own money. No account freezes, no surprise limits,
                no “permission” required.
              </p>
            </div>
            <div className="rounded-2xl border border-border mobile-pop-card p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Low time preference
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                A culture of patience and long-term thinking — better aligned with
                deep craft than fast-content incentives.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <section className="lg:col-span-7 rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                Bitcoin for artists (practical wins)
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>
                  <span className="font-semibold text-foreground">Keep more of what you earn:</span>{' '}
                  fewer intermediaries, fewer fees, and a savings tool built for the
                  long run.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Get paid faster:</span>{' '}
                  grants and patronage can move in minutes instead of weeks.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Build a patron community:</span>{' '}
                  supporters can tip in sats, fund milestones, or sponsor a full
                  project.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Create without compromise:</span>{' '}
                  a censorship-resistant rail supports bold work and independent
                  voices.
                </li>
              </ul>
            </section>

            <section className="lg:col-span-5 rounded-2xl border border-border mobile-pop-card p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                The big idea
              </div>
              <p className="mt-4 text-base leading-relaxed text-foreground/90">
                When money can’t be debased, creators can plan further ahead. A Bitcoin
                standard favors craft, patience, and work that lasts.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Bitcoin is volatile. We don’t promise number-go-up — we advocate for
                sovereignty, transparency, and a better patronage model.
              </p>
            </section>
          </div>

          <section className="mt-12 rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-xl font-semibold tracking-tight">How to start (3 steps)</h2>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-border mobile-pop-card p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  1) Get a wallet
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  We can help you set up a wallet and receive your first sats safely.
                </p>
              </div>
              <div className="rounded-xl border border-border mobile-pop-card p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  2) Receive support
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Apply for a BTC micro-grant or share your address with patrons.
                </p>
              </div>
              <div className="rounded-xl border border-border mobile-pop-card p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  3) Share your work
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Build a long-term relationship with supporters and publish updates.
                </p>
              </div>
            </div>
          </section>

          <p className="mt-10 text-sm leading-relaxed text-muted">
            Bitcoin isn&apos;t just money — it&apos;s a tool for uncensorable, abundant
            creative life. Let&apos;s build it together.
          </p>
        </div>
      </div>
    </main>
  );
}

