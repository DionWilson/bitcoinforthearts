import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import logoImage from '../asset/BITCOIN-ARTS-LOGO-gold.jpg';
import watermarklogo from '../asset/FreedomLab Logo.jpeg';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Bitcoin for the Arts: mission, vision, and how we support artists with Bitcoin.',
};

export default function AboutPage() {
  return (
    <main className="bg-background relative overflow-hidden">
      {/* Subtle background image */}
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

      {/* Watermark */}
      <div className="fixed bottom-4 right-4 z-10 opacity-20 transition-opacity duration-300 hover:opacity-40">
        <a
          href="https://btcnyc.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Image
            src={watermarklogo}
            alt="Bitcoin for the Arts Watermark"
            width={80}
            height={80}
            className="rounded-full"
          />
        </a>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-border bg-surface/80 p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <Image
                  src={logoImage}
                  alt="Bitcoin for the Arts Logo"
                  width={96}
                  height={96}
                  className="rounded-full border border-border bg-background"
                  priority
                />
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    About
                  </div>
                  <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
                    The NEA of the Bitcoin Era.
                  </h1>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    A nonprofit arts organization building Bitcoin-native patronage.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Paid in Bitcoin
                  </div>
                  <div className="mt-2 text-sm text-foreground/85">
                    Micro-grants and patronage that move fast.
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Programs
                  </div>
                  <div className="mt-2 text-sm text-foreground/85">
                    Workshops, residencies, and productions.
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Endowment
                  </div>
                  <div className="mt-2 text-sm text-foreground/85">
                    A HODL Vault reserve for the long run.
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                >
                  Donate
                </Link>
                <Link
                  href="/artists/why-bitcoin"
                  className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
                >
                  Why Bitcoin?
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Bitcoin For The Arts, Inc. funds sovereign creators across visual arts,
              theater, dance, music, writing, storytelling, and film — artists with
              low time preference who craft timeless work, challenge censorship, and
              explore Bitcoin-aligned innovation.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6">
              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
                  Our north star
                </div>
                <p className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                  Ignite the next renaissance in the arts — on sound money.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  A new patronage model for sovereign creators: direct funding, radical
                  transparency, and a long-term Bitcoin endowment.
                </p>
              </div>

              <section className="rounded-2xl border border-border bg-primary text-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs font-bold uppercase tracking-wide text-white">
                    Mission
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-white/80">
                    Uncensorable money • Uncensorable minds
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-start">
                  <div className="md:col-span-4">
                    <div className="rounded-xl border border-white/15 bg-black/15 p-5">
                      <div className="text-xs font-semibold uppercase tracking-wide text-white/80">
                        Our edge
                      </div>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/85">
                        <li>
                          <span className="font-semibold text-white">
                            First:
                          </span>{' '}
                          paying artists exclusively in BTC.
                        </li>
                        <li>
                          <span className="font-semibold text-white">
                            Transparent:
                          </span>{' '}
                          open-source treasury culture.
                        </li>
                        <li>
                          <span className="font-semibold text-white">
                            Long-term:
                          </span>{' '}
                          an endowment mindset (HODL Vault).
                        </li>
                        <li>
                          <span className="font-semibold text-white">Artist-first:</span>{' '}
                          grants, workshops, residencies, productions.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <blockquote className="relative overflow-hidden rounded-xl border border-white/15 bg-black/15 p-6">
                      <div
                        className="pointer-events-none absolute -top-6 -left-3 text-[72px] font-semibold text-accent/35"
                        aria-hidden="true"
                      >
                        “
                      </div>
                      <p className="relative text-base leading-relaxed text-white/95 sm:text-lg italic">
                        “In the sovereign spirit of Bitcoin—uncensorable money for
                        uncensorable minds—we ignite a self-sustaining global
                        renaissance in arts. Through Bitcoin micro-grants, performance
                        workshops, and visionary live and digital productions, we
                        empower visual artists, playwrights, dancers, and musicians
                        to break free from fiat decay. Every donation fuels direct
                        support to creators, powers world-class exhibitions and
                        residencies, and plants a seed in a permanent Bitcoin
                        reserve—building an eternal endowment for human creativity
                        that no institution or inflation can ever touch.”
                      </p>
                    </blockquote>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-background p-6">
                <div className="text-xs font-bold uppercase tracking-wide text-foreground">
                  Vision
                </div>
                <p className="mt-3 text-lg leading-relaxed text-foreground/90 sm:text-xl">
                  Be the NEA of the Bitcoin Era — the universal funder of
                  interdisciplinary artists, powered by the hardest money ever known.
                </p>
              </section>
            </div>

            <section className="mt-10 rounded-2xl border border-border bg-surface/80 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold tracking-tight">
                What we&apos;re building
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-background p-5">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
                    <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                    Grants that move
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Every donation in Bitcoin becomes a direct, instant grant that
                    empowers an artist to create without gatekeepers.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-background p-5">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
                    <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                    Patronage that lasts
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    We replace dying fiat patronage with unbreakable, global, sound
                    money — turning supporters into modern Medicis.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-background p-5">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
                    <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                    Freedom for creators
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Protect earnings from inflation and censorship, so artists can
                    build a sovereign creative life.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-background p-5">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
                    <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                    A creative edge
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    We don&apos;t just teach Bitcoin — we pay you to live it: stack sats,
                    slow down, and create art that outlives empires.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/grants"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 border border-accent/60"
                >
                  Explore grants
                </Link>
                <Link
                  href="/programming"
                  className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
                >
                  Explore programming
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}