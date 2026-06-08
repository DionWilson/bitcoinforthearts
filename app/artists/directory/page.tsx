import type { Metadata } from 'next';
import Link from 'next/link';
import ArtistDirectoryForm from './ArtistDirectoryForm';

export const metadata: Metadata = {
  title: 'BFTA Artist Directory',
  description:
    'The Bitcoin for the Arts Artist Directory \u2014 a private, opt-in roster of artists in our network. Sign up to be counted and to access introductions to other directory members through BFTA.',
  openGraph: {
    title: 'The BFTA Artist Directory',
    description:
      'A private, opt-in roster of working artists in BFTA\u2019s network. Introductions facilitated by BFTA \u2014 contact information never published.',
    type: 'website',
  },
};

/**
 * Fetch the current artist count from Airtable.
 * Returns null if Airtable is unreachable or unconfigured \u2014 the page falls back gracefully.
 *
 * Note: counts up to 100 records on the first page. If the directory grows past 100,
 * paginate via the offset parameter.
 */
async function getArtistCount(): Promise<number | null> {
  const pat = process.env.AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName =
    process.env.AIRTABLE_ARTIST_DIRECTORY_TABLE ?? 'Artist Directory';

  if (!pat || !baseId) return null;

  try {
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(
      tableName,
    )}?fields%5B%5D=Name&pageSize=100`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${pat}` },
      // Cache for 5 minutes \u2014 fresh enough that a new signup is reflected
      // soon after, but doesn't hammer Airtable from every page render.
      next: { revalidate: 300 },
    });

    if (!res.ok) return null;
    const data = (await res.json()) as { records?: unknown[] };
    return Array.isArray(data.records) ? data.records.length : null;
  } catch {
    return null;
  }
}

export default async function ArtistDirectoryPage() {
  const count = await getArtistCount();

  return (
    <main className="min-h-screen bg-background">
      {/* ── Hero ────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border bg-foreground text-background">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24">
          <div className="inline-flex items-center rounded-full border border-background/30 bg-background/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
            Bitcoin for the Arts
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            The Artist Directory.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed opacity-85 sm:text-lg">
            A private, opt-in roster of working artists in BFTA&rsquo;s network.
            Introductions are facilitated by us. Contact information is never
            published.
          </p>

          {count !== null ? (
            <div className="mt-10 inline-flex items-baseline gap-3 rounded-2xl border border-background/20 bg-background/10 px-8 py-6">
              <span className="font-mono text-5xl font-bold tabular-nums sm:text-6xl">
                {count}
              </span>
              <span className="text-sm font-semibold uppercase tracking-widest opacity-80">
                {count === 1 ? 'artist' : 'artists'} signed up
              </span>
            </div>
          ) : null}
        </div>
      </section>

      {/* ── Sign Up Form ────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-14 sm:py-16">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">
          Join the directory
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Be counted.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Sign up to be part of the BFTA Artist Directory. Your information
          stays private. The directory&rsquo;s artist count is the only thing
          shown publicly &mdash; everything else is for our internal records and
          for facilitating introductions you specifically request.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-surface/60 p-6 sm:p-8">
          <ArtistDirectoryForm />
        </div>
      </section>

      {/* ── How It Works ────────────────────────────── */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:py-16">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            How It Works
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple. Private. By introduction only.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-accent">
                Step 1
              </div>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">
                You sign up.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Submit your name, art discipline, and contact information.
                Optionally include your website and social profiles. Choose
                whether you consent to having your contact shared with other
                verified directory members.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-accent">
                Step 2
              </div>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">
                You&rsquo;re counted.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                The directory&rsquo;s public count goes up by one. Your details
                stay private &mdash; only the count is ever shown publicly. The
                directory itself is never published, exported, or sold.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-accent">
                Step 3
              </div>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">
                Introductions, on request.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Want to meet another artist in the directory? Email{' '}
                <a
                  href="mailto:artists@bitcoinforthearts.org"
                  className="font-semibold text-accent underline-offset-2 hover:underline"
                >
                  artists@bitcoinforthearts.org
                </a>{' '}
                from the email you registered with. We verify you&rsquo;re a
                directory member, then reach out to the artist you&rsquo;ve
                named to confirm consent before any introduction is made.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-14 sm:py-16">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">
          FAQ
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          A few quick answers.
        </h2>

        <div className="mt-8 divide-y divide-border border-y border-border">
          <div className="py-6">
            <h3 className="text-lg font-semibold tracking-tight">
              Is the directory public?
            </h3>
            <p className="mt-2 text-base leading-relaxed text-muted">
              No. Only the running count of artists is public. Names, contact
              information, websites, and profiles are never published. The
              directory exists to facilitate introductions, not to broadcast
              your information.
            </p>
          </div>

          <div className="py-6">
            <h3 className="text-lg font-semibold tracking-tight">
              Who can request an introduction?
            </h3>
            <p className="mt-2 text-base leading-relaxed text-muted">
              Only other artists who are already in the directory. Each request
              is verified against the directory before BFTA reaches out. We
              don&rsquo;t share your information with anyone outside the network.
            </p>
          </div>

          <div className="py-6">
            <h3 className="text-lg font-semibold tracking-tight">
              Can I leave the directory later?
            </h3>
            <p className="mt-2 text-base leading-relaxed text-muted">
              Yes. Email{' '}
              <a
                href="mailto:artists@bitcoinforthearts.org"
                className="font-semibold text-accent underline-offset-2 hover:underline"
              >
                artists@bitcoinforthearts.org
              </a>{' '}
              and we&rsquo;ll remove you immediately. No questions, no friction.
            </p>
          </div>

          <div className="py-6">
            <h3 className="text-lg font-semibold tracking-tight">
              Do I have to be a Bitcoin user to join?
            </h3>
            <p className="mt-2 text-base leading-relaxed text-muted">
              Not at all. The directory is open to any working artist whose work
              you consider serious enough to put your name on it. You can be at
              any stage of your Bitcoin learning &mdash; including none.
            </p>
          </div>

          <div className="py-6">
            <h3 className="text-lg font-semibold tracking-tight">
              Why does BFTA need this?
            </h3>
            <p className="mt-2 text-base leading-relaxed text-muted">
              Two reasons. First, growing connectivity inside the artist network
              we&rsquo;re building is part of how BFTA delivers value beyond
              grants. Second, knowing how many artists are in our network is a
              meaningful signal to sponsors, donors, and fellow institutions
              about the scale of what we&rsquo;re supporting.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ──────────────────────────────── */}
      <section className="bg-surface/40">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:py-16">
          <div className="rounded-2xl border border-border bg-background p-8 sm:p-10">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">
              While you&rsquo;re here
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Other ways to connect with BFTA.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              The directory is one of several ways to be part of what
              we&rsquo;re building.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/connect"
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
              >
                Subscribe to the Newsletter →
              </Link>
              <Link
                href="/grants"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-foreground/20 bg-background px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
              >
                Apply for a Grant →
              </Link>
              <Link
                href="/midwest"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-foreground/20 bg-background px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
              >
                BFTA at Midwest →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
