import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Donor-Advised Funds (DAFs)',
  description:
    'Recommend a grant from your Donor-Advised Fund (DAF) to support Bitcoin For The Arts — a flexible way to fund sovereign art.',
};

export default function DafGuidePage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <Link href="/donate" className="hover:underline">
              Donate
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">DAF</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Giving Through Donor-Advised Funds (DAFs)
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                If you&apos;re seeking a flexible way to support sovereign art,
                recommending a grant from your Donor-Advised Fund (DAF) is an
                excellent option. This guide explains how DAFs work, the benefits,
                and easy steps to get started.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                As the first 501(c)(3) nonprofit paying artists exclusively in
                Bitcoin, we can convert your grant to BTC (per our volatility
                policy), helping fund creators through grants, workshops, and our
                HODL Vault endowment — without impacting your current finances.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:donate@bitcoinforthearts.org?subject=DAF%20grant%20recommendation"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                >
                  Get help with your DAF (email us)
                </a>
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:opacity-90"
                >
                  Back to Donate
                </Link>
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-surface p-5 text-sm text-muted">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  EIN
                </div>
                <p className="mt-2 leading-relaxed">
                  Your DAF portal may ask for our EIN/tax ID. Email{' '}
                  <a
                    href="mailto:donate@bitcoinforthearts.org?subject=EIN%20request%20for%20DAF"
                    className="font-semibold underline underline-offset-4"
                  >
                    donate@bitcoinforthearts.org
                  </a>{' '}
                  and we&apos;ll send it.
                </p>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/donor2.jpg"
                    alt="Donors at an arts event, representing giving through donor-advised funds."
                    fill
                    className="object-cover object-center"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Flexible giving
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    DAFs let you plan grants over time — one-time or recurring —
                    while your charitable balance can grow.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Tax-efficient
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                An immediate deduction when you contribute to the DAF; growth inside
                the DAF is generally tax-free.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Flexible
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Recommend grants anytime — lump sum or recurring — without new
                paperwork every time.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Simple admin
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Your sponsoring organization handles administration and investment
                options.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Bitcoin endowment
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Grants arrive as fiat; we can convert to BTC per policy for long-term
                impact.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <section className="lg:col-span-7 rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                What is a donor-advised fund?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                A DAF is like a charitable savings account. You donate to a
                sponsoring organization (for example: Fidelity Charitable, Schwab
                Charitable, Vanguard Charitable, or a community foundation), receive
                an immediate tax deduction, and then recommend grants to charities
                like us over time. Grants are typically irrevocable.
              </p>
              <div className="mt-5 rounded-xl border border-border bg-background p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Bitcoin tie-in
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Your grant arrives as fiat; we can convert to Bitcoin for low time
                  preference growth, funding artists for the long run.
                </p>
              </div>
            </section>

            <section className="lg:col-span-5 rounded-2xl border border-border bg-background p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                Eligibility &amp; requirements
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>
                  <span className="font-semibold text-foreground">Donors:</span> Anyone
                  with a DAF (common sponsors: Fidelity, Schwab, Vanguard, community
                  foundations).
                </li>
                <li>
                  <span className="font-semibold text-foreground">Minimums:</span> Vary
                  by sponsor; we do not set a minimum.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Nationwide:</span>{' '}
                  DAF grants can be made across the U.S. without special recipient
                  registration requirements in most cases.
                </li>
              </ul>
            </section>
          </div>

          <section className="mt-12 rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-xl font-semibold tracking-tight">How it works</h2>
            <ol className="mt-4 space-y-3 text-sm leading-relaxed text-muted list-decimal pl-5">
              <li>
                <span className="font-semibold text-foreground">Open or use your DAF:</span>{' '}
                If you don&apos;t have one, you can start with a sponsoring
                organization (minimums vary).
              </li>
              <li>
                <span className="font-semibold text-foreground">Recommend a grant:</span>{' '}
                Log in to your DAF portal, search for “Bitcoin For The Arts, Inc.”,
                enter the amount (one-time or recurring), and submit.
              </li>
              <li>
                <span className="font-semibold text-foreground">Provide details:</span>{' '}
                Include your name (or anonymous) and any designation (example: “For
                Emerging Sovereign Grant”).
              </li>
              <li>
                <span className="font-semibold text-foreground">Our role:</span> We
                receive the grant (check/wire), send a thank-you, and convert to BTC
                per policy for impact.
              </li>
              <li>
                <span className="font-semibold text-foreground">Timeline:</span> Many
                DAF grants arrive ~2–4 weeks after recommendation.
              </li>
            </ol>
          </section>

          <section className="mt-12 rounded-2xl border border-border bg-background p-6">
            <h2 className="text-xl font-semibold tracking-tight">Tips for success</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              <li>
                <span className="font-semibold text-foreground">Best for:</span> Donors
                who want flexibility and multi-year support.
              </li>
              <li>
                <span className="font-semibold text-foreground">Tax advice:</span> Consult
                your advisor — DAF rules and limits vary.
              </li>
              <li>
                <span className="font-semibold text-foreground">Bitcoin conversion:</span>{' '}
                You can add a note like “Support HODL Vault” to align with long-term
                endowment growth.
              </li>
              <li>
                <span className="font-semibold text-foreground">Corporate DAFs:</span> Many
                employers offer DAF programs — check whether matching is available.
              </li>
            </ul>
          </section>

          <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <h2 className="text-xl font-semibold tracking-tight">
                  Ready to make a sovereign impact?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Recommend a grant today — and email us if you want help finding us
                  in your DAF portal.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <a
                  href="mailto:donate@bitcoinforthearts.org?subject=DAF%20grant%20recommendation"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                >
                  Contact donate@
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
            >
              Back to Donate
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

