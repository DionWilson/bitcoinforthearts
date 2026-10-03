import type { Metadata } from 'next';
import Link from 'next/link';
import FeaturedProjectsGrid from '@/components/FeaturedProjectsGrid';

export const metadata: Metadata = {
  title: 'Artists',
  description:
    'Long-term artists, communities, institutions, and cultural projects Bitcoin for the Arts makes visible — support them directly, or fund the work through BFTA.',
};

const principles = [
  {
    title: 'Time is the work',
    body: 'A song, a stitch, a cut, a wall. High standards take energy and passes. Bitcoin is the tool that keeps that time on the maker’s side.',
  },
  {
    title: 'We make the work public',
    body: 'Each dossier says who they are, what the project is, why it belongs on sound money, and exactly how a patron can help.',
  },
  {
    title: 'You choose the rail',
    body: 'Support the project directly on its own terms, or give to Bitcoin for the Arts and designate that program.',
  },
];

export default function ArtistsPage() {
  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-20">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wide text-accent">
            Artists · communities · institutions
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            The work that needs a longer clock.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Bitcoin for the Arts exists to make serious culture visible on a
            sound money standard. Some of these projects we fund. Some we
            introduce because they are aligned and they need patrons we are not
            the only source of. Either way, the job is the same: put the work
            in public, and give people a clear way to support it.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#dossiers"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
            >
              View projects
            </a>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
            >
              Fund this work
            </Link>
            <a
              href="mailto:hello@bitcoinforthearts.org?subject=Nominate%20a%20long-term%20project"
              className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
            >
              Nominate a project
            </a>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {principles.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-surface/70 p-5"
            >
              <h2 className="text-base font-semibold tracking-tight">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>

        <section id="dossiers" className="mt-16 scroll-mt-28">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Projects in public
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              Open a card for the full record: the work, why it aligns, and both
              ways to support it. Communities and institutions join this shelf
              as each dossier is complete — we do not publish a project until
              the ask is specific.
            </p>
          </div>
          <div className="mt-8">
            <FeaturedProjectsGrid />
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 gap-6 border-t border-border pt-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">
              What a dossier includes
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Specific enough to fund.
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted sm:text-base">
              <li>Who they are — artist, community, institution, or cultural project.</li>
              <li>The long-term work, in plain language.</li>
              <li>Why it belongs on a Bitcoin standard.</li>
              <li>What money actually unlocks.</li>
              <li>Direct links, and a Bitcoin or Lightning address once they confirm it.</li>
              <li>A path through Bitcoin for the Arts when the gift should be designated.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6 lg:col-span-5">
            <h2 className="text-lg font-semibold tracking-tight">
              Grants are one tool. Visibility is the other.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Awarded grants live on their own page, with amounts and status.
              This shelf is wider: work we stand behind that still needs
              patrons — including projects we may never be the funder of.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Link
                href="/grants/awards"
                className="inline-flex items-center justify-center rounded-md border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-surface"
              >
                See grant awards
              </Link>
              <Link
                href="/artists/why-bitcoin"
                className="inline-flex items-center justify-center rounded-md border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-surface"
              >
                Why Bitcoin for artists
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
