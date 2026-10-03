import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Midwest Bitcoin Summit · Archive',
  description:
    'Bitcoin Arts Park at the Midwest Bitcoin Summit (September 23–24, 2026) is complete. The public record lives on Cultural Events.',
};

/**
 * Post-event hub. Live sponsor / volunteer / countdown pages are retired.
 * Public story: /programming#midwest-2026. Internal archive: docs/midwest-2026/.
 */
export default function MidwestArchivePage() {
  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">
          Fulfilled · September 23–24, 2026 · Columbus, OH
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Midwest Bitcoin Summit is complete.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          Bitcoin Arts Park at the Midwest Bitcoin Summit has concluded. The
          public record — artists, partners, photos, and the booth walkthrough —
          lives on Cultural Events. Operational pages for sponsorship, volunteer
          signup, and advance auction bids are closed.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/programming#midwest-2026"
            className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
          >
            View Cultural Events record →
          </Link>
          <Link
            href="/grants/awards"
            className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
          >
            Grant awards
          </Link>
          <Link
            href="/midwest/schedule"
            className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
          >
            Schedule archive
          </Link>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-sm leading-relaxed text-muted">
          <p>
            Silent auction lot pages remain online as a read-only archive for
            artists and patrons. Advance bidding is closed.
          </p>
          <p className="mt-3">
            <Link
              href="/midwest/auction"
              className="font-semibold text-foreground underline underline-offset-4"
            >
              Auction lot archive →
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
