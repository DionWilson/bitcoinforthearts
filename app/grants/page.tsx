import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import MobileCarousel from '@/components/MobileCarousel';

export const metadata: Metadata = {
  title: 'Grants',
  description:
    'Bitcoin micro-grants for sovereign creators across disciplines. Learn how to apply and what we fund.',
};

export default function GrantsPage() {
  const applyForm =
    'https://docs.google.com/forms/d/e/1FAIpQLScErzhYqHskUF90oZegSW-Zlw82_P-khCpxzlgPFL_n6Y6FKw/viewform?usp=header';

  const infoCards = [
    {
      title: 'What We Fund',
      items: [
        'Creation costs (materials, studio time, rehearsal space)',
        'Production costs (recording, staging, print, fabrication)',
        'Travel tied to a specific project or performance',
        'Artist-led community programming',
      ],
      imageSrc: '/paintbrush kids.jpg',
      imageAlt: 'Kids holding paintbrushes, representing creative work.',
      surface: 'bg-background',
    },
    {
      title: 'Who Can Apply',
      items: [
        'Independent artists and small collectives',
        'Any discipline: visual arts, theater, dance, music, writing, storytelling, film',
        'Working on a specific project with clear next steps',
        'Open to all geographies (subject to program capacity)',
      ],
      imageSrc: '/artfest.jpg',
      imageAlt: 'An art festival scene, representing community arts.',
      surface: 'bg-background',
    },
    {
      title: 'What To Send',
      items: [
        'Your name + links (website, portfolio, socials)',
        'Project description (what, why, and timeline)',
        'Budget + requested amount',
        'A Bitcoin address to receive funds',
      ],
      imageSrc: '/bitcoin carnival.JPG',
      imageAlt: 'Artists and community at a vibrant event, representing grant applications and creative support.',
      surface: 'bg-background',
    },
  ] as const;

  return (
    <main className="bg-background relative overflow-hidden min-h-screen">
      {/* Background image (same treatment as other pages) */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/grants-background.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <div className="relative mx-auto max-w-6xl px-8 py-14 sm:px-6">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Bitcoin Micro-Grants
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Grants for working artists — paid in Bitcoin.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            We support sovereign creators across visual arts, theater, dance, music,
            writing, storytelling, and film. Grants are designed to be small, fast,
            and impactful — helping you keep creating.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
            >
              Fund a grant
            </Link>
          </div>
        </div>

        <div className="mt-10 max-w-3xl">
        <div className="max-w-3xl">
          <div className="rounded-2xl border border-accent/40 bg-surface/80 p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">
              Temporary notice
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              We’re collecting applications now, but we won’t begin processing grant
              applications until{' '}
              <span className="font-semibold text-foreground">Q3 2026</span>.
            </p>
          </div>
        </div>
        </div>

        {/* Swipeable carousel (mobile + desktop) */}
        <div className="mt-12 -mx-8 px-8">
          <MobileCarousel ariaLabel="Grant program details" dotsClassName="lg:hidden">
            {infoCards.map((card) => (
              <div
                key={card.title}
                data-carousel-item="true"
                className="snap-start shrink-0 w-[92%] sm:w-[70%] lg:w-[32%] rounded-2xl border border-border bg-surface/80 overflow-hidden"
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 32vw"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {card.title}
                  </div>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                    {card.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </MobileCarousel>
        </div>

        <div
          id="apply"
          className="mt-12 rounded-2xl border border-border bg-surface p-6 scroll-mt-28"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-start">
            <div className="md:col-span-8">
              <h2 className="text-xl font-semibold tracking-tight">How to apply</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Submit our online form (preferred) or download the PDF and email it to{' '}
                <a
                  href="mailto:grants@bitcoinforthearts.org"
                  className="font-semibold underline underline-offset-4"
                >
                  grants@bitcoinforthearts.org
                </a>
                . Applications are simple—no lengthy proposals required.
              </p>
              <div className="mt-4 text-sm leading-relaxed text-muted">
                <span className="font-semibold text-foreground">Review cadence:</span>{' '}
                applications are reviewed quarterly.
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={applyForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 border border-accent/60"
                >
                  Open the application form
                </a>
                <a
                  href="/resources/grants/grant-application.pdf"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
                >
                  Download the PDF
                </a>
              </div>
            </div>
            <div className="md:col-span-4">
              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Terms & agreement
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  For more details, review our grant terms and agreement before applying.
                </p>
                <a
                  href="/resources/grants/grant-terms.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:opacity-90"
                >
                  View terms & agreement
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-background p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Grants FAQ</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Quick answers about eligibility, funding, and Bitcoin payouts.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/grants/faq"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:opacity-90"
              >
                Read the FAQ
              </Link>
              <Link
                href="/artists/why-bitcoin"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 border border-accent/60"
              >
                Why Bitcoin?
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <h2 className="text-xl font-semibold tracking-tight">
                Transparent By Default
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Our goal is radical clarity: how funds are allocated, how grants are
                paid, and how reserves are maintained over time.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <a
                href="https://github.com/Bitcoin-For-The-Arts/bitcoinforthearts-treasury"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:bg-surface"
              >
                View treasury
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

