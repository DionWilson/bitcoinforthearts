import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'IRA Qualified Charitable Distributions (QCDs)',
  description:
    'If you are 70½ or older, a Qualified Charitable Distribution (QCD) from your IRA can be a tax-smart way to support Bitcoin For The Arts.',
};

export default function IraQcdGuidePage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <Link href="/donate" className="hover:underline">
              Donate
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">IRA QCD</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Giving Through IRA Qualified Charitable Distributions (QCDs)
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                If you&apos;re 70½ or older and looking for a tax-smart way to support
                sovereign art, a Qualified Charitable Distribution (QCD) from your
                IRA can be an excellent option.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                As the first 501(c)(3) nonprofit paying artists exclusively in
                Bitcoin, we can convert your QCD to BTC (per our volatility policy),
                helping fund creators through grants, workshops, and our HODL Vault
                endowment.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                No impact on your current income: your gift can help build
                uncensorable art&apos;s future.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:donate@bitcoinforthearts.org?subject=IRA%20QCD%20gift"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                >
                  Start a QCD (email us)
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
                    src="/elders.jpg"
                    alt="A group of smiling elders together, representing legacy giving."
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
                    A tax-smart gift today can fund sovereign art for years to come.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Lower AGI
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                QCDs can be excluded from adjusted gross income (AGI) for eligible
                donors (consult your advisor).
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Satisfy RMD
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                If you&apos;re subject to RMDs, a QCD can count toward that requirement
                without adding taxable income.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Simple
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                No need to itemize deductions for many donors — your custodian sends
                funds directly to the charity.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Bitcoin endowment
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                QCDs arrive as fiat; we can convert to BTC per policy for long-term
                impact.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <section className="lg:col-span-7 rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-xl font-semibold tracking-tight">What is a QCD?</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                A QCD is a direct transfer from your IRA (traditional, rollover, or
                SEP/SIMPLE in non-active years) to a qualified charity like Bitcoin
                For The Arts. It can count toward your Required Minimum Distribution
                (RMD) if applicable, and is limited annually under IRS rules.
              </p>
              <div className="mt-5 rounded-xl border border-border bg-background p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Important
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Funds must go straight from your IRA custodian to us — not via a
                  personal check.
                </p>
              </div>
            </section>

            <section className="lg:col-span-5 rounded-2xl border border-border bg-background p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                Benefits for donors
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>
                  <span className="font-semibold text-foreground">Tax savings:</span>{' '}
                  May reduce taxable income and help avoid certain phase-outs (consult
                  your advisor).
                </li>
                <li>
                  <span className="font-semibold text-foreground">RMD satisfaction:</span>{' '}
                  Can count toward RMDs without increasing taxable income.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Legacy impact:</span>{' '}
                  Support low time preference projects that last generations.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Simplicity:</span>{' '}
                  Straightforward for many non-itemizers.
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
                  href="mailto:donate@bitcoinforthearts.org?subject=IRA%20QCD%20gift"
                  className="font-semibold underline underline-offset-4"
                >
                  donate@bitcoinforthearts.org
                </a>{' '}
                and we’ll provide our EIN/tax ID and confirm details.
              </li>
              <li>
                <span className="font-semibold text-foreground">Instruct your custodian:</span>{' '}
                Ask your IRA provider (Fidelity, Vanguard, etc.) to send a check or
                wire directly to Bitcoin For The Arts (custodian-to-charity).
              </li>
              <li>
                <span className="font-semibold text-foreground">Specify amount:</span>{' '}
                Annual limits apply and the gift must come from eligible IRA funds
                (Roth IRAs generally don’t benefit in the same way).
              </li>
              <li>
                <span className="font-semibold text-foreground">Confirmation:</span>{' '}
                We’ll send a receipt (amount/date). Keep your records for tax time.
              </li>
            </ol>
          </section>

          <section className="mt-12 rounded-2xl border border-border bg-background p-6">
            <h2 className="text-xl font-semibold tracking-tight">Tips for success</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              <li>
                <span className="font-semibold text-foreground">Age rules:</span> QCD
                eligibility starts at age 70½ (RMD age may differ).
              </li>
              <li>
                <span className="font-semibold text-foreground">Traditional IRAs:</span>{' '}
                Often provide the clearest benefit compared to Roth withdrawals.
              </li>
              <li>
                <span className="font-semibold text-foreground">Tax advice:</span> QCD
                rules vary — consult your advisor for guidance.
              </li>
              <li>
                <span className="font-semibold text-foreground">Bitcoin conversion:</span>{' '}
                In your note, you can indicate your intent to support our endowment.
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
                  Email us and we’ll help you initiate a QCD with your IRA custodian.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <a
                  href="mailto:donate@bitcoinforthearts.org?subject=IRA%20QCD%20gift"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                >
                  Start a QCD
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

