import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import MobileCarousel from '@/components/MobileCarousel';

export const metadata: Metadata = {
  title: 'Programming',
  description:
    'Bitcoin Arts Park, workshops, residencies, and productions connecting artists and the Bitcoin community — culture on a sound-money standard.',
};

const midwestGallery = [
  {
    src: '/newsletter/issue-27/hero-booth.jpg',
    alt: 'Bitcoin Arts Park booth at the Midwest Bitcoin Summit',
    caption: 'Bitcoin Arts Park · Expo floor',
  },
  {
    src: '/ainsley-band-mbs.jpg',
    alt: 'Ainsley Costello performing with her band',
    caption: 'Ainsley Costello · Expo Stage',
  },
  {
    src: '/rock-n-roll-andy-breakheart-mbs.jpg',
    alt: 'Rock n Roll Andy Breakheart on stage',
    caption: 'Rock n Roll Andy Breakheart',
  },
  {
    src: '/short-north-mbs.jpg',
    alt: 'Short North Stage performers at Midwest',
    caption: 'Short North Stage',
  },
  {
    src: '/sean-live-painting-mbs.jpg',
    alt: 'Shipwreck Sean live painting at Bitcoin Arts Park',
    caption: 'Shipwreck Sean · live painting',
  },
  {
    src: '/dion-nadia-ainsley-mbs.JPG',
    alt: 'Dion Wilson, Nadia Vaeh, and Ainsley Costello at Bitcoin Arts Park',
    caption: 'Artists in the Park',
  },
] as const;

export default function ProgrammingPage() {
  const programCards = [
    {
      title: 'Bitcoin Arts Park (fulfilled)',
      description:
        'Our first public cultural footprint on a Bitcoin conference Expo floor — Midwest Bitcoin Summit, Columbus, September 2026. Stage, cinema, gallery, and peer-to-peer energy in one room.',
      imageSrc: '/bitcoin-art-park-photo.jpg',
      imageAlt: 'Bitcoin Arts Park booth at the Midwest Bitcoin Summit',
      imageClassName: 'object-cover object-center',
      href: '#bitcoin-arts-park',
    },
    {
      title: 'Bitcoin For Artists Workshops',
      description:
        'Practical sessions on self-custody, receiving Bitcoin, and long-term financial sovereignty for creators.',
      imageSrc: '/bitcoin gallery.jpg',
      imageAlt: 'A gallery space featuring Bitcoin-themed art, representing workshops and learning.',
      imageClassName: 'object-cover object-center',
      href: '/education',
    },
    {
      title: 'Residencies (Proposed)',
      description:
        'A funding-dependent residency model currently shared as a transparency proposal.',
      imageSrc: '/amphitheater .jpg',
      imageAlt: 'Artists gathered in an outdoor amphitheater, representing residencies and collaborative creation.',
      imageClassName: 'object-cover object-[50%_30%]',
      href: '/transparency/sovereign-artist-residency-proposal',
    },
  ] as const satisfies ReadonlyArray<{
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    imageClassName: string;
    href: string;
  }>;

  return (
    <main className="bg-background relative overflow-hidden min-h-screen">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/program-background.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover object-center opacity-35 blur-md scale-110"
        />
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
            Culture · sound money · fulfilled programs
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Programming that puts artists and Bitcoin in the same room.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            We build cultural footprints, workshops, and showcases so Bitcoiners
            experience art on a peer-to-peer standard — and so artists who have
            not found Bitcoin yet can see how sound money protects creative time,
            ownership, and durable value.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#bitcoin-arts-park"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 border border-accent/60"
            >
              Midwest · Bitcoin Arts Park
            </Link>
            <Link
              href="/grants/awards"
              className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
            >
              Grant awards
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:bg-background"
            >
              Fund this work
            </Link>
          </div>
        </div>

        <div className="mt-12 -mx-8 px-8">
          <MobileCarousel ariaLabel="Programming highlights" dotsClassName="lg:hidden">
            {programCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                data-carousel-item="true"
                className="snap-start shrink-0 w-[92%] sm:w-[70%] lg:w-[32%] overflow-hidden rounded-2xl border border-border bg-surface/80 transition-colors hover:border-accent/50"
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
              </Link>
            ))}
          </MobileCarousel>
        </div>

        {/* Fulfilled program: Midwest */}
        <section
          id="bitcoin-arts-park"
          className="mt-20 scroll-mt-28 border-t border-border pt-14"
          aria-labelledby="bap-heading"
        >
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-wide text-accent">
              Fulfilled · September 23–24, 2026 · Columbus, OH
            </div>
            <h2
              id="bap-heading"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Bitcoin Arts Park at the Midwest Bitcoin Summit
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Our first public appearance as a dedicated cultural footprint on a
              Bitcoin conference Expo floor. Midwest donated the space; after they
              saw what we were building, they donated more. That is the partnership
              model we want to scale — culture treated as central, not peripheral.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-5 text-sm leading-relaxed text-muted sm:text-base">
              <p>
                <strong className="text-foreground">What we programmed:</strong>{' '}
                live performance on the Expo Stage (Ainsley Costello, Rock n Roll
                Andy Breakheart, Short North Stage), a curated cinema, peer-to-peer
                Lightning silent auction and gallery wall, Living Room wallet
                activation, artist pitches, a culture panel —{' '}
                <em>Does Bitcoin Need Art to Last?</em> — and the first BFTA
                micro-grant presentation in public.
              </p>
              <p>
                <strong className="text-foreground">For the Bitcoin community:</strong>{' '}
                a room people remember. Not only talks about money — artists paid
                in Bitcoin, work you can see and hear, and a proof that peer-to-peer
                patronage belongs on the conference floor.
              </p>
              <p>
                <strong className="text-foreground">For artists not yet on Bitcoin:</strong>{' '}
                a living example that sound money can fund craft, performance, and
                time preference — without waiting for a broken institutional stack
                to notice you.
              </p>
              <p>
                This is the type of programming we want to bring to more Bitcoin
                events and to cities still waiting for culture on a Bitcoin
                standard. Foundations and grant partners who fund arts, education,
                or financial inclusion can help us take Bitcoin Arts Park further.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <div className="rounded-2xl border border-border bg-surface/80 p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Program threads
                </div>
                <ul className="mt-3 space-y-2 text-sm text-foreground">
                  <li>Expo Stage · live music &amp; youth theater</li>
                  <li>Film cinema · Bitcoin-aligned independent work</li>
                  <li>Gallery · Lightning silent auction</li>
                  <li>Living Room · wallet activation</li>
                  <li>Culture panel · artists &amp; sound money</li>
                  <li>Micro-grant presentation · Ainsley Costello</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="/grants/awards"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
                >
                  See grant awards from this work
                </Link>
                <Link
                  href="/midwest/schedule"
                  className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:bg-surface"
                >
                  Full Midwest schedule archive
                </Link>
                <a
                  href="mailto:programs@bitcoinforthearts.org?subject=Partner%20on%20Bitcoin%20Arts%20Park"
                  className="inline-flex items-center justify-center rounded-md border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-surface"
                >
                  Partner on the next footprint
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {midwestGallery.map((shot) => (
              <figure key={shot.src} className="overflow-hidden">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <figcaption className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <div className="mt-16 rounded-2xl border border-border bg-background p-5 text-sm text-muted">
          Looking for residency details? The Sovereign Artist Residency is currently
          a funding-dependent proposal in Transparency. Read the draft{' '}
          <Link
            href="/transparency/sovereign-artist-residency-proposal"
            className="font-semibold underline underline-offset-4"
          >
            here
          </Link>
          .
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <h2 className="text-xl font-semibold tracking-tight">
                Want To Host Something In Your City?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                If you’re an artist, venue, foundation, or community organizer, we’d
                love to collaborate on workshops, screenings, salons, or a Bitcoin
                Arts Park–style footprint.
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
