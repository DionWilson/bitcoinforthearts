import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import MobileCarousel from '@/components/MobileCarousel';

export const metadata: Metadata = {
  title: 'Programming',
  description:
    'Workshops, residencies, and productions connecting artists and the Bitcoin community.',
};

export default function ProgrammingPage() {
  const programCards = [
    {
      title: 'Bitcoin For Artists Workshops',
      description:
        'Practical sessions on self-custody, receiving Bitcoin, and long-term financial sovereignty for creators.',
      imageSrc: '/bitcoin gallery.jpg',
      imageAlt: 'A gallery space featuring Bitcoin-themed art, representing workshops and learning.',
      imageClassName: 'object-cover object-center',
    },
    {
      title: 'Residencies',
      description:
        'Time and space to create — with light-touch support and community connection.',
      imageSrc: '/amphitheater .jpg',
      imageAlt: 'Artists gathered in an outdoor amphitheater, representing residencies and collaborative creation.',
      imageClassName: 'object-cover object-[50%_30%]',
    },
    {
      title: 'Co-Productions & Showcases',
      description:
        'Live and digital productions that elevate artist work and bring patrons along for the process.',
      imageSrc: '/scene design.jpg',
      imageAlt: 'Artists collaborating on a stage design, representing co-productions and showcases.',
      imageClassName: 'object-cover object-center',
    },
  ] as const satisfies ReadonlyArray<{
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    imageClassName: string;
  }>;

  return (
    <main className="bg-background relative overflow-hidden min-h-screen">
      {/* Background image (same treatment as before) */}
      <div className="pointer-events-none absolute inset-0">
        {/* Full-bleed fill (cropped) */}
        <Image
          src="/program-background.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover object-center opacity-35 blur-md scale-110"
        />
        {/* Full-photo layer (minimal cropping) */}
        <Image
          src="/program-background.jpg"
          alt=""
          fill
          priority={false}
          className="object-contain object-center opacity-45"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <div className="relative mx-auto max-w-6xl px-8 py-14 sm:px-6">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Workshops • residencies • productions
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Programming that brings Artists and Bitcoiners together.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Beyond grants, we build spaces for artists to learn, collaborate, and
            present work — from intimate workshops to public performances.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 border border-accent/60"
            >
              Upcoming events
            </Link>
            <a
              href="mailto:hello@bitcoinforthearts.org?subject=Programming%20proposal"
              className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
            >
              Propose a program
            </a>
          </div>
        </div>

        {/* Swipeable carousel (mobile + desktop) */}
        <div className="mt-12 -mx-8 px-8">
          <MobileCarousel ariaLabel="Programming highlights" dotsClassName="lg:hidden">
            {programCards.map((card) => (
              <div
                key={card.title}
                data-carousel-item="true"
                className="snap-start shrink-0 w-[92%] sm:w-[70%] lg:w-[32%] overflow-hidden rounded-2xl border border-border bg-surface/80"
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    className={card.imageClassName}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 32vw"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                </div>
                <div className="p-6">
                  <div className="text-sm font-semibold tracking-tight">{card.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{card.description}</p>
                </div>
              </div>
            ))}
          </MobileCarousel>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <h2 className="text-xl font-semibold tracking-tight">
                Want To Host Something In Your City?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                If you’re an artist, venue, or community organizer, we’d love to
                collaborate on workshops, screenings, salons, or performances.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <a
                href="mailto:hello@bitcoinforthearts.org?subject=Host%20a%20Bitcoin%20for%20the%20Arts%20event"
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:bg-surface"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

