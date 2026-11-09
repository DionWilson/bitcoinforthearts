import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { facilitators } from '@/lib/facilitators';

export const metadata: Metadata = {
  title: 'Facilitators',
  description:
    'The people who teach Bitcoin for the Arts sound money classes in their own voice, for their own communities.',
};

export default function FacilitatorsPage() {
  return (
    <main className="bg-background relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/bitcoin gallery.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <Link href="/education" className="hover:underline">
              Education
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">Facilitators</span>
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Facilitators
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            Facilitators teach the Bitcoin for the Arts sound money classes in
            their own voice, for their own communities. Each one records the
            class, opens it with their own introduction, and carries the
            material to the people who already trust them. The roster grows as
            more facilitators join.
          </p>

          <div className="mt-10 space-y-8">
            {facilitators.map((person) => (
              <article
                key={person.slug}
                id={person.slug}
                className="scroll-mt-28 overflow-hidden rounded-3xl border border-border bg-surface/80 shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-start">
                  <div className="bg-background p-6 pb-0 lg:col-span-4 lg:pb-6">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                      <Image
                        src={person.imageSrc}
                        alt={person.imageAlt}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 320px"
                        priority
                      />
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 lg:col-span-8">
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {person.role}
                      {person.location ? ` · ${person.location}` : ''}
                    </div>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                      {person.name}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                      {person.shortBio}
                    </p>

                    {person.links.length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                        {person.links.map((link) => (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-semibold underline underline-offset-4"
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-6 space-y-4 border-t border-border pt-6">
                      {person.bio.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 48)}
                          className="text-sm leading-relaxed text-muted"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-border bg-background p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Teach this in your community
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
              The class materials are free to adapt under Creative Commons (CC
              BY 4.0), with credit to Bitcoin for the Arts. If you have a
              community and want to record a class in your own voice, write to
              us.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:education@bitcoinforthearts.org?subject=Facilitator%20interest"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
              >
                education@bitcoinforthearts.org
              </a>
              <Link
                href="/education"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:bg-background"
              >
                Back to Education
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
