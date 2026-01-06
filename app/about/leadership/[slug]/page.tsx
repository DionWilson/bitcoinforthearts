import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { leadership } from '@/lib/leadership';

export function generateStaticParams() {
  return leadership.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const person = leadership.find((p) => p.slug === params.slug);
  if (!person) return { title: 'Leadership' };
  return {
    title: person.name,
    description: `${person.name} — ${person.title}`,
  };
}

export default function LeadershipProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const person = leadership.find((p) => p.slug === params.slug);
  if (!person) notFound();

  const [overview, ...restBio] = person.fullBio;
  const sections: Array<{ title: string; paragraphs: string[] }> = [
    { title: 'Overview', paragraphs: [overview] },
    { title: 'Career & artistry', paragraphs: restBio.slice(0, Math.max(0, restBio.length - 2)) },
    { title: 'Bitcoin community', paragraphs: restBio.slice(Math.max(0, restBio.length - 2)) },
  ];

  return (
    <main className="bg-background relative overflow-hidden min-h-screen">
      {/* Match About page background treatment */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/about-background.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/about/leadership" className="hover:underline">
              Leadership
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">{person.name}</span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-border bg-surface/80 p-6 shadow-sm">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-accent/50 bg-background shadow-[0_0_0_6px_rgba(247,147,26,0.10)]">
                  <Image
                    src={person.imageSrc}
                    alt={person.imageAlt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                </div>
                <div className="mt-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {person.title}
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight">
                    {person.name}
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/donate"
                    className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                  >
                    Support the mission
                  </Link>
                  <Link
                    href="/about/leadership"
                    className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
                  >
                    Back to Leadership
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-border bg-background p-8">
                <div className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
                  Bio
                </div>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {person.name}
                </h1>
                <p className="mt-3 text-sm font-semibold text-muted">
                  {person.title}
                </p>

                {/* Mobile + Desktop: collapse long bios into sections */}
                <div className="mt-6 space-y-3">
                  {sections.map((section) => (
                    <details
                      key={section.title}
                      className="rounded-2xl border border-accent/30 bg-surface/70 p-4"
                      open={section.title === 'Overview'}
                    >
                      <summary className="cursor-pointer list-none">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-semibold tracking-tight">
                            {section.title}
                          </div>
                          <div className="shrink-0 rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold">
                            Toggle
                          </div>
                        </div>
                      </summary>
                      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
                        {section.paragraphs.map((para) => (
                          <p key={para}>{para}</p>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
                <h2 className="text-xl font-semibold tracking-tight">
                  Why this leadership matters
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Bitcoin For The Arts exists to protect creative freedom and fund
                  artists on sound money. Leadership is stewardship — our duty is to
                  serve artists, donors, and the mission with transparency, courage,
                  and long-term conviction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

