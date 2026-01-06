import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Donate Securities',
  description:
    'Donate stocks, bonds, or mutual funds to Bitcoin For The Arts — a tax-efficient way to support sovereign art.',
};

export default function DonateSecuritiesGuidePage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <Link href="/donate" className="hover:underline">
              Donate
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">Securities</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Donate Stocks, Bonds, or Mutual Funds
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                Thank you for considering a gift of securities to Bitcoin For The
                Arts. Donating appreciated stocks, bonds, or mutual funds is a
                smart, tax-efficient way to support sovereign art.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                As the first 501(c)(3) nonprofit paying artists exclusively in
                Bitcoin, we convert your gift to BTC (per our volatility policy),
                ensuring it can grow to fund creators through grants, workshops, and
                our HODL Vault endowment.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:donate@bitcoinforthearts.org?subject=Donate%20securities%20(stocks%2Fbonds%2Ffunds)"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                >
                  Donate securities (email us)
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:opacity-90"
                >
                  Contact page
                </Link>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/event-background.jpg"
                    alt="Diverse donors at a luxury arts event, symbolizing legacy giving through securities."
                    fill
                    className="object-cover object-center"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Legacy giving
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Donors gathering at an arts event — a simple reminder that
                    securities gifts can fund creators for the long term.
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
                Potentially avoid capital gains taxes while supporting the mission.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Bigger impact
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Full fair market value (FMV) deduction may apply for eligible gifts.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                We handle it
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Direct transfer → we coordinate sale/conversion so you don’t have to.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Bitcoin endowment
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Proceeds can be converted to BTC to support low time preference work.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <section className="lg:col-span-7 rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                Why donate securities?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Stocks, bonds, or mutual funds that have increased in value
                (appreciated) may let you avoid capital gains taxes while getting a
                full fair market value (FMV) deduction. This can maximize your
                impact — your gift can go further than cash.
              </p>

              <div className="mt-5 rounded-xl border border-border bg-background p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Example
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  If you bought stock for $5,000 and it’s now worth $10,000,
                  donating it may give you a $10,000 deduction, avoid capital gains,
                  and allow us to convert the full value to BTC for artists.
                </p>
              </div>
            </section>

            <section className="lg:col-span-5 rounded-2xl border border-border bg-background p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                Benefits for you
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>
                  <span className="font-semibold text-foreground">Tax savings:</span>{' '}
                  Deduct FMV on transfer date for eligible gifts; potentially avoid
                  capital gains tax (consult your advisor).
                </li>
                <li>
                  <span className="font-semibold text-foreground">Legacy impact:</span>{' '}
                  Your gift can be converted to BTC to fund grants and programming
                  long-term.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Simplicity:</span>{' '}
                  Direct transfer — we coordinate the sale and conversion.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Flexibility:</span>{' '}
                  Donate part or all of a holding (publicly traded securities).
                </li>
              </ul>
            </section>
          </div>

          <section className="mt-12 rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-xl font-semibold tracking-tight">How it works</h2>
            <ol className="mt-4 space-y-3 text-sm leading-relaxed text-muted list-decimal pl-5">
              <li>
                <span className="font-semibold text-foreground">Contact us:</span>{' '}
                Email{' '}
                <a
                  href="mailto:donate@bitcoinforthearts.org?subject=Donate%20securities%20(stocks%2Fbonds%2Ffunds)"
                  className="font-semibold underline underline-offset-4"
                >
                  donate@bitcoinforthearts.org
                </a>{' '}
                and we’ll provide our brokerage transfer details (DTC info, account
                number, etc.).
              </li>
              <li>
                <span className="font-semibold text-foreground">Transfer securities:</span>{' '}
                Instruct your broker to electronically transfer shares to our
                account (DTC-eligible only). For bonds, provide any required
                identifiers.
              </li>
              <li>
                <span className="font-semibold text-foreground">Receipt &amp; conversion:</span>{' '}
                We’ll issue an acknowledgment letter and, where applicable, sell and
                convert proceeds to BTC per policy (hold fiat if volatility exceeds
                our threshold).
              </li>
              <li>
                <span className="font-semibold text-foreground">Timeline:</span> Many
                transfers take ~3–5 business days; receipts are typically issued
                within one week.
              </li>
            </ol>
          </section>

          <section className="mt-12 rounded-2xl border border-border bg-background p-6">
            <h2 className="text-xl font-semibold tracking-tight">
              Important notes &amp; compliance
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              <li>
                <span className="font-semibold text-foreground">Eligibility:</span>{' '}
                Appreciated securities held &gt;1 year may qualify for full FMV
                deduction; shorter holding periods may be limited (consult your
                advisor).
              </li>
              <li>
                <span className="font-semibold text-foreground">IRS forms:</span>{' '}
                Form 8283 may be required for $5,000+ gifts; other rules may apply
                for non-public securities.
              </li>
              <li>
                <span className="font-semibold text-foreground">Minimum:</span> $1,000
                FMV recommended to help cover administrative fees.
              </li>
              <li>
                <span className="font-semibold text-foreground">No tax advice:</span>{' '}
                This page is informational only. Please consult your tax advisor for
                guidance on your situation.
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
                  Your gift could fund the next Bitcoin art prize. Email us and we’ll
                  send transfer instructions.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <a
                  href="mailto:donate@bitcoinforthearts.org?subject=Donate%20securities%20(stocks%2Fbonds%2Ffunds)"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                >
                  Donate securities
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

