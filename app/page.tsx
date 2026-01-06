import Link from 'next/link';
import Image from 'next/image';
import logoImage from './asset/BITCOIN-ARTS-LOGO-gold.jpg';

export default function Home() {
  // Easy toggle for the fullscreen intro video.
  // Default is ON (so you see it without configuring anything).
  // To disable: set NEXT_PUBLIC_SHOW_HOME_INTRO=0 in Vercel.
  const showIntro = process.env.NEXT_PUBLIC_SHOW_HOME_INTRO !== '0';

  // Easy swap workflow (no code changes):
  // - Replace `public/BFTA-home-page.MOV` with your new .MOV
  // - On deploy, the build auto-converts it to `public/BFTA-home-page.mp4`
  //
  // Optional overrides:
  // - NEXT_PUBLIC_HOME_INTRO_VIDEO_MP4=/my-intro.mp4
  // - NEXT_PUBLIC_HOME_INTRO_VIDEO_MOV=/my-intro.mov
  const introMp4 =
    process.env.NEXT_PUBLIC_HOME_INTRO_VIDEO_MP4 ?? '/BFTA-home-page.mp4';
  const introMov = process.env.NEXT_PUBLIC_HOME_INTRO_VIDEO_MOV ?? '';

  return (
    <main className="bg-background">
      {showIntro ? (
        <>
          {/* Intro video section */}
          <section className="relative h-[100svh] w-full overflow-hidden">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={introMp4} type="video/mp4" />
              {introMov ? <source src={introMov} type="video/quicktime" /> : null}
              <source src="/BFTA-home-page.MOV" type="video/quicktime" />
            </video>
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6 py-16">
              <div className="max-w-2xl">
                <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white">
                  Bitcoin For The Arts
                </div>
                <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Stack Culture on Sound Money.
                </h1>
                <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
                  Support sovereign creators with Bitcoin-native patronage.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href="#main"
                    className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                  >
                    Enter
                  </a>
                  <a
                    href="/donate"
                    className="inline-flex items-center justify-center rounded-md border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    Donate
                  </a>
                </div>
              </div>
            </div>
          </section>

          <div id="main" className="scroll-mt-28" />
        </>
      ) : null}

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pb-20 sm:pt-18">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="mb-6">
              <Image
                src={logoImage}
                alt="Bitcoin for the Arts logo"
                width={96}
                height={96}
                priority
                className="rounded-full border border-border"
              />
            </div>
            <div className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium tracking-wide">
              Nonprofit • Bitcoin-native patronage
            </div>
            {showIntro ? (
              <h2 className="mt-5 whitespace-nowrap text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-tight leading-tight">
                Stack Culture on Sound Money.
              </h2>
            ) : (
              <h1 className="mt-5 whitespace-nowrap text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-tight leading-tight">
                Stack Culture on Sound Money.
              </h1>
            )}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Bitcoin for the Arts supports artists across disciplines with Bitcoin
              micro-grants, workshops, residencies, and productions — with radical
              transparency and a long-term reserve.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
              >
                Donate Bitcoin
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
              >
                Read our mission
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-background p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Grants
                </div>
                <div className="mt-2 text-sm text-foreground/85">
                  Fast, small BTC grants for working artists.
                </div>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Programs
                </div>
                <div className="mt-2 text-sm text-foreground/85">
                  Workshops, residencies, and co-productions.
                </div>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Transparency
                </div>
                <div className="mt-2 text-sm text-foreground/85">
                  Public reporting and a Bitcoin reserve mandate.
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="text-sm font-semibold tracking-tight">
                The 55/30/10/5 rule
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                A simple, explicit allocation model so donors and artists know
                exactly what support means.
              </p>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="font-medium">55%</span>
                  <span className="text-muted">Artist grants</span>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="font-medium">30%</span>
                  <span className="text-muted">Programs</span>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="font-medium">10%</span>
                  <span className="text-muted">Operations</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">5%</span>
                  <span className="text-muted">HODL vault reserve</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <Link
                  href="/grants"
                  className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-background"
                >
                  Explore grants
                </Link>
                <a
                  href="https://github.com/Bitcoin-For-The-Arts/bitcoinforthearts-treasury"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-background"
                >
                  View live treasury
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <h2 className="text-2xl font-semibold tracking-tight">
                Built for Artists. Built on Bitcoin.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                We fund sovereign creators across visual arts, theater, dance, music,
                writing, storytelling, and film — backing low time preference work
                that resists censorship and celebrates financial freedom through
                Bitcoin-aligned innovation.
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-background p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    No gatekeepers
                  </div>
                  <p className="mt-2 text-sm text-foreground/85">
                    Micro-grants designed to move quickly and help artists keep
                    creating.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    No inflation
                  </div>
                  <p className="mt-2 text-sm text-foreground/85">
                    A reserve policy so support compounds over time instead of
                    decaying.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Public accountability
                  </div>
                  <p className="mt-2 text-sm text-foreground/85">
                    Clear allocations, public reporting, and transparent
                    fundraising goals.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Community-first
                  </div>
                  <p className="mt-2 text-sm text-foreground/85">
                    Events and programming that connect artists and Bitcoiners in
                    real life.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-background"
                >
                  See events
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-background"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
