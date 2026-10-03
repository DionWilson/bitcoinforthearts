import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Midwest Volunteer Signup Closed',
  description:
    'Volunteer signup for Bitcoin Arts Park at the Midwest Bitcoin Summit has closed. The event took place September 23–24, 2026.',
  robots: { index: false, follow: true },
};

export default function MidwestVolunteerClosedPage() {
  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">
          Signup closed
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Midwest volunteer signup is closed.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted">
          Thank you to everyone who volunteered at Bitcoin Arts Park during the
          Midwest Bitcoin Summit. The event is complete; this form is no longer
          accepting signups.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/programming#midwest-2026"
            className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-fg"
          >
            Cultural Events record →
          </Link>
          <Link
            href="/get-involved/volunteer"
            className="inline-flex items-center justify-center rounded-md border border-border px-5 py-3 text-sm font-semibold"
          >
            Ongoing volunteer opportunities
          </Link>
        </div>
      </div>
    </main>
  );
}
