import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import MobileCarousel from '@/components/MobileCarousel';

export const metadata: Metadata = {
  title: 'Programming',
  description:
    'Cultural events, workshops, and residencies connecting artists and the Bitcoin community — culture on a sound-money standard.',
};

const midwestGallery = [
  {
    src: '/newsletter/issue-27/hero-booth.jpg',
    alt: 'Bitcoin Arts Park booth at the Midwest Bitcoin Summit',
    caption: 'Bitcoin Arts Park · Expo floor',
  },
  {
    src: '/bfta-board-advisors-mbs.jpg',
    alt: 'Bitcoin for the Arts board and advisors at the Midwest Bitcoin Summit',
    caption: 'Board & advisors on site',
  },
  {
    src: '/board-trustee-director-bfta-mbs.jpg',
    alt: 'Bitcoin for the Arts board members at Midwest Bitcoin Summit',
    caption: 'Board on site',
  },
  {
    src: '/nadia-ainsley-artpark.jpg',
    alt: 'Ainsley Costello and Nadia Vaeh sitting in the Bitcoin Arts Park booth',
    caption: 'Ainsley & Nadia · booth',
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
      title: 'Cultural events',
      description:
        'Bring culture to Bitcoin trade shows — stage, cinema, gallery, and peer-to-peer patronage in one room — on the way to our own sound money art expo. Midwest Bitcoin Summit 2026 was the first public footprint.',
      imageSrc: '/bitcoin-art-park-photo.jpg',
      imageAlt: 'Bitcoin Arts Park booth at the Midwest Bitcoin Summit',
      imageClassName: 'object-cover object-center',
      href: '#cultural-events',
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
            Cultural events · workshops · residencies
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Programming that puts artists and Bitcoin in the same room.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            We build cultural events, workshops, and showcases so Bitcoiners
            experience art on a peer-to-peer standard — and so artists who have
            not found Bitcoin yet can see how sound money protects creative time,
            ownership, and durable value. We start on trade-show floors. We are
            building toward a sound money art expo of our own.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#cultural-events"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 border border-accent/60"
            >
              Cultural events
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

        {/* Cultural events */}
        <section
          id="cultural-events"
          className="mt-20 scroll-mt-28 border-t border-border pt-14"
          aria-labelledby="cultural-events-heading"
        >
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-wide text-accent">
              Cultural events
            </div>
            <h2
              id="cultural-events-heading"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Culture on a Bitcoin standard — in public.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              We bring culture onto Bitcoin trade-show floors — stage, cinema,
              gallery, and peer-to-peer patronage in rooms where Bitcoiners already
              gather — and invite artists who have not found Bitcoin yet to see
              sound money in practice. Midwest is the proof of concept. The
              destination is our own sound money art expo.
            </p>
          </div>

          <article
            id="midwest-2026"
            className="mt-14 scroll-mt-28 border-t border-border/70 pt-12"
          >
            <div className="max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Fulfilled · September 23–24, 2026 · Columbus, OH
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Midwest Bitcoin Summit
              </h3>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                At the Midwest Bitcoin Summit we programmed a full cultural
                footprint on the Expo floor. We showcased{' '}
                <strong className="text-foreground">Ainsley Costello</strong>,{' '}
                <strong className="text-foreground">Rock &apos;n&apos; Roll Andy Breakheart</strong>,{' '}
                <strong className="text-foreground">Short North Stage</strong>,{' '}
                <strong className="text-foreground">Shipwreck Sean</strong>,{' '}
                <strong className="text-foreground">Lady RedHorns</strong>,{' '}
                <strong className="text-foreground">CA Danner</strong>,{' '}
                <strong className="text-foreground">Asanoha</strong> / Timechain Art Magazine,{' '}
                <strong className="text-foreground">Nadia Vaeh</strong>,{' '}
                <strong className="text-foreground">Jason R. Johnston</strong>,{' '}
                <strong className="text-foreground">Alana Mediavilla</strong>,{' '}
                <strong className="text-foreground">Avi Burra</strong>,{' '}
                <strong className="text-foreground">Susan Koch</strong> (A13MW),{' '}
                <strong className="text-foreground">Paul Keating</strong>,{' '}
                <strong className="text-foreground">Kyle Huber</strong> and{' '}
                <strong className="text-foreground">My First Bitcoin</strong>,{' '}
                <strong className="text-foreground">Liberty International</strong>, and{' '}
                <strong className="text-foreground">Lindey Magee</strong> — stage,
                gallery, cinema, books, and peer-to-peer energy in one room. Midwest
                donated the space; after they saw what we were building, they
                donated more. That partnership model is what we want to grow.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-5 text-sm leading-relaxed text-muted sm:text-base">
                <p>
                  <strong className="text-foreground">What we programmed:</strong>{' '}
                  Expo Stage performance, curated cinema, Lightning silent auction
                  and gallery wall, Living Room wallet activation, artist pitches,
                  the culture panel <em>Does Bitcoin Need Art to Last?</em>, and
                  our first public micro-grant presentation.
                </p>
                <p>
                  <strong className="text-foreground">For the Bitcoin community:</strong>{' '}
                  a room people remember — artists paid in Bitcoin, work you can
                  see and hear, and proof that peer-to-peer patronage belongs on
                  the conference floor.
                </p>
                <p>
                  <strong className="text-foreground">For artists not yet on Bitcoin:</strong>{' '}
                  a living example that sound money can fund craft, performance,
                  and time preference without waiting for a broken institutional
                  stack to notice you.
                </p>
                <p>
                  <strong className="text-foreground">Where this is going:</strong>{' '}
                  keep planting culture at Bitcoin trade shows — then build our own
                  sound money art expo, where artists and Bitcoiners meet on a
                  peer-to-peer standard from the first booth to the last set.
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
                    href="mailto:programs@bitcoinforthearts.org?subject=Partner%20on%20a%20cultural%20event"
                    className="inline-flex items-center justify-center rounded-md border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-surface"
                  >
                    Partner on a cultural event
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

            {/* Full booth walkthrough */}
            <div className="mt-14 max-w-4xl">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Bitcoin Arts Park · full booth
              </div>
              <h4 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                Walk the Expo footprint
              </h4>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
                A walkthrough of the full Bitcoin Arts Park booth at Midwest —
                the cultural room we build inside Bitcoin trade shows, and the
                model we intend to grow into a sound money art expo of our own.
              </p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface/80">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src="https://www.youtube.com/embed/JRxt9FS7zAg"
                    title="Bitcoin Arts Park full booth walkthrough at Midwest Bitcoin Summit"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            </div>

            {/* Thank you */}
            <div className="mt-16 max-w-3xl border-t border-border pt-12">
              <div className="text-xs font-semibold uppercase tracking-wide text-accent">
                Thank you
              </div>
              <h4 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                Every artist. Every partner.
              </h4>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                This cultural event only worked because these people showed up with
                craft and conviction. We thank them by name.
              </p>

              <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted sm:text-base">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-foreground">
                    Stage + performance
                  </div>
                  <p className="mt-2 text-foreground">
                    Ainsley Costello · Rock &apos;n&apos; Roll Andy Breakheart · Short
                    North Stage (<em>Sweeney Todd</em> and the youth internship
                    performers)
                  </p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-foreground">
                    Gallery + live art
                  </div>
                  <p className="mt-2 text-foreground">
                    Shipwreck Sean · Lady RedHorns · CA Danner · Asanoha / Timechain
                    Art Magazine
                  </p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-foreground">
                    Film + cinema
                  </div>
                  <p className="mt-2 text-foreground">
                    Nadia Vaeh · Jason R. Johnston (Fifty Oars / <em>Till My Last Breath</em>) ·
                    Alana Mediavilla (<em>Dirty Coin</em>) · Avi Burra (<em>Finding Home</em>) ·
                    Susan Koch (A13MW) · Paul Keating (Hummingbird /{' '}
                    <em>The Bitcoin Jungle Story</em>) · Kyle Huber and My First Bitcoin (
                    <em>Bigger Than Bitcoin</em>) · Liberty International (
                    <em>Solution to Poverty</em>) · Bitcoin Film Fest
                  </p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-foreground">
                    Books + education on the floor
                  </div>
                  <p className="mt-2 text-foreground">
                    Lindey Magee (<em>Bitcoin: A Treasure to HODL</em>)
                  </p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-foreground">
                    Partners + companies
                  </div>
                  <p className="mt-2 text-foreground">
                    Midwest Bitcoin Summit · IndeeHub · Proof of Paint · Proof of Ink ·
                    Bitcoin Film Fest · Liberty International · Lady Block Jane · and
                    every filmmaker and crew whose work screened on our cinema loop
                  </p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-foreground">
                    Art panel (Expo Stage)
                  </div>
                  <p className="mt-2 text-foreground">
                    <em>Does Bitcoin Need Art to Last?</em> — Moderator Dr. Michael J.
                    Kelly. Panelists Dion Wilson, Kenneth Burris (KB Studio NYC), Kyle
                    Knight, and Ainsley Costello.
                  </p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-foreground">
                    Board + advisors
                  </div>
                  <p className="mt-2 text-foreground">
                    Special thanks to <strong>Julie Costello</strong> (board advisor),
                    whose due diligence and partnership made the stage possible, and{' '}
                    <strong>Ahmed Klink</strong> (board trustee), who designed and built
                    the Bitcoin Arts Park booth.
                  </p>
                </div>
              </div>
            </div>
          </article>
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
                love to collaborate on workshops, screenings, salons, or a cultural
                event footprint.
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
