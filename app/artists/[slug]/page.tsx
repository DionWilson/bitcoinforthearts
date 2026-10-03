import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  FEATURED_KIND_LABEL,
  FEATURED_PROJECTS,
  designationDonateHref,
  getFeaturedProject,
} from '@/lib/featured-projects';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return FEATURED_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getFeaturedProject(slug);
  if (!project) return { title: 'Project' };
  const title = `${project.name} · ${project.projectTitle}`;
  return {
    title,
    description: project.cardSummary,
    openGraph: {
      title,
      description: project.cardSummary,
      images: project.imageSrc ? [project.imageSrc] : undefined,
    },
  };
}

export default async function FeaturedProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getFeaturedProject(slug);
  if (!project) notFound();

  const designateHref = designationDonateHref(project.slug);
  const designateMail = `mailto:hello@bitcoinforthearts.org?subject=${encodeURIComponent(
    `Designated gift: ${project.projectTitle}`,
  )}`;

  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8 sm:py-14">
        <Link
          href="/artists"
          className="text-sm font-semibold text-muted underline-offset-4 hover:text-foreground hover:underline"
        >
          ← All projects
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white">
              <Image
                src={project.imageSrc}
                alt={project.imageAlt}
                fill
                priority
                className={
                  project.imageFit === 'contain'
                    ? 'object-contain object-center p-8'
                    : 'object-cover object-center'
                }
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide">
                {FEATURED_KIND_LABEL[project.kind]}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                {project.relationshipLabel}
                {project.location ? ` · ${project.location}` : ''}
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              {project.name}
              {project.alsoKnownAs ? (
                <span className="text-muted"> ({project.alsoKnownAs})</span>
              ) : null}
            </h1>
            <p className="mt-2 text-lg font-medium text-foreground sm:text-xl">
              {project.projectTitle}
            </p>

            <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted sm:text-base">
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">
                  The work
                </h2>
                <p className="mt-3">{project.theWork}</p>
                {project.stations?.length ? (
                  <ol className="mt-6 space-y-3">
                    {project.stations.map((station, index) => (
                      <li key={station.title} className="flex gap-3">
                        <span className="w-6 shrink-0 font-semibold text-foreground">
                          {index + 1}
                        </span>
                        <span>
                          <span className="font-semibold text-foreground">
                            {station.title}.
                          </span>{' '}
                          {station.lesson}
                        </span>
                      </li>
                    ))}
                  </ol>
                ) : null}
                {project.stations?.length ? (
                  <p className="mt-4 text-sm">
                    These twenty-one lines are the plan. A station is real when
                    the community pins a place people already use, with a photo
                    and the name of the person who must say yes. An empty line
                    stays empty until then.
                  </p>
                ) : null}
              </section>
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">
                  Why long-term funding
                </h2>
                <p className="mt-3 text-base font-medium text-foreground sm:text-lg">
                  Bitcoin puts time on the maker’s side.
                </p>
                <p className="mt-3">{project.time}</p>
              </section>
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">
                  Why it belongs here
                </h2>
                <p className="mt-3">{project.alignment}</p>
              </section>
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">
                  Why support it now
                </h2>
                <p className="mt-3">{project.whySupport}</p>
                <ul className="mt-4 space-y-2">
                  {project.whatFundingUnlocks.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
              {project.budget ? (
                <section>
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">
                    What one year costs
                  </h2>
                  <p className="mt-3 text-base font-medium text-foreground sm:text-lg">
                    {project.budget.title}
                  </p>
                  <p className="mt-3">{project.budget.intro}</p>
                  <div className="mt-5 overflow-hidden rounded-xl border border-border">
                    {project.budget.lines.map((line) => (
                      <div
                        key={line.label}
                        className="grid grid-cols-1 gap-1 border-b border-border px-4 py-3 sm:grid-cols-[1fr_auto] sm:gap-6"
                      >
                        <div>
                          <div className="font-semibold text-foreground">{line.label}</div>
                          <p className="mt-1 text-sm leading-relaxed">{line.detail}</p>
                        </div>
                        <div className="font-semibold text-foreground sm:text-right">
                          {line.amount}
                        </div>
                      </div>
                    ))}
                    <div className="flex items-baseline justify-between bg-surface px-4 py-3">
                      <div className="font-semibold text-foreground">
                        {project.budget.totalLabel}
                      </div>
                      <div className="text-lg font-semibold text-foreground">
                        {project.budget.totalAmount}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4">{project.budget.note}</p>
                </section>
              ) : null}
            </div>
          </div>

          <aside className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-border bg-surface/80 p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-accent">
                Support this work
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Two ways in.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Give straight to the project, or give to Bitcoin for the Arts
                and designate this program. Both are real support.
              </p>

              <div className="mt-6 border-t border-border pt-6">
                <h3 className="text-sm font-semibold">Support them directly</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Their sites and projects. Peer-to-peer payment appears here
                  only after they confirm an address for this page.
                </p>
                <ul className="mt-4 space-y-2">
                  {project.directSupport.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm font-semibold text-foreground underline underline-offset-4"
                        {...(link.href.startsWith('http')
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                {project.directPaymentNote ? (
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {project.directPaymentNote}
                  </p>
                ) : null}
              </div>

              <div className="mt-6 border-t border-border pt-6">
                <h3 className="text-sm font-semibold">
                  Support them through Bitcoin for the Arts
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  A gift to Bitcoin For The Arts, Inc. can fund our grantmaking
                  in general, or be designated for {project.projectTitle}.
                  Designated gifts are restricted to that program.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href={designateHref}
                    className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
                  >
                    Designate a gift for this project
                  </Link>
                  <Link
                    href="/donate"
                    className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:bg-surface"
                  >
                    Give to BFTA generally
                  </Link>
                  <a
                    href={designateMail}
                    className="inline-flex items-center justify-center rounded-md border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-surface"
                  >
                    Email us about a designated gift
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
