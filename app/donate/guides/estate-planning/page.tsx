import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bequests & Estate Planning',
  description:
    'Include Bitcoin For The Arts in your will or estate plan to create a lasting legacy for sovereign art.',
};

export default function EstatePlanningGuidePage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-8 py-14 sm:px-6">
        <div className="max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <Link href="/donate" className="hover:underline">
              Donate
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">Estate Planning</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Giving Through Bequests &amp; Estate Planning
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                If you&apos;re planning for the future and want to leave a lasting
                impact on sovereign art, including Bitcoin For The Arts in your will
                or estate plan is a powerful way to do so.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                As the first 501(c)(3) nonprofit paying artists exclusively in
                Bitcoin, we can convert your gift to BTC (per our volatility policy),
                helping fund creators through grants, workshops, and our HODL Vault
                endowment. Your legacy supports uncensorable creativity for
                generations.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:donate@bitcoinforthearts.org?subject=Bequest%20and%20estate%20planning"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                >
                  Get sample language (email us)
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
                  Your attorney or will platform may ask for our EIN/tax ID. Email{' '}
                  <a
                    href="mailto:donate@bitcoinforthearts.org?subject=EIN%20request%20for%20estate%20gift"
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
                    src="/bench couple.jpg"
                    alt="A couple planning together, representing thoughtful estate planning."
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
                    A bequest can help ignite the next renaissance in the arts — for
                    generations.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                No impact today
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Keep full control of your assets during life; the gift activates
                later.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Estate tax benefit
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Charitable bequests may reduce your taxable estate (consult your
                advisor).
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Flexible
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Choose a fixed amount, a percentage, a specific asset, or the
                residuary.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Bitcoin endowment
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Gifts can be converted to BTC per policy to support low time
                preference art.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <section className="lg:col-span-7 rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                What is a bequest or estate gift?
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>
                  <span className="font-semibold text-foreground">Bequest:</span> A
                  gift specified in your will or trust (fixed amount, percentage, or
                  specific asset) that takes effect upon your passing.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Estate planning:</span>{' '}
                  Incorporating charitable gifts into your overall plan via wills,
                  trusts, or beneficiary designations (for example on IRAs or life
                  insurance).
                </li>
                <li>
                  <span className="font-semibold text-foreground">Bitcoin tie-in:</span>{' '}
                  Gifts arrive as assets; we can convert to Bitcoin for long-term,
                  sound-money growth per policy.
                </li>
              </ul>
            </section>

            <section className="lg:col-span-5 rounded-2xl border border-border bg-background p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                Benefits for donors
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>
                  <span className="font-semibold text-foreground">Tax savings:</span>{' '}
                  Charitable bequests may qualify for an estate tax deduction (no
                  current income tax impact).
                </li>
                <li>
                  <span className="font-semibold text-foreground">Legacy control:</span>{' '}
                  Align family needs while creating impact later.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Flexibility:</span>{' '}
                  Easy to update via codicil or trust revision.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Impact:</span> A
                  bequest can fund artists and programs for decades.
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
                  href="mailto:donate@bitcoinforthearts.org?subject=Bequest%20and%20estate%20planning"
                  className="font-semibold underline underline-offset-4"
                >
                  donate@bitcoinforthearts.org
                </a>{' '}
                for sample language and our EIN/tax ID.
              </li>
              <li>
                <span className="font-semibold text-foreground">Work with your advisor:</span>{' '}
                Consult your estate attorney or use tools like FreeWill to draft or
                update your will/trust.
              </li>
              <li>
                <span className="font-semibold text-foreground">Include us:</span>{' '}
                Sample language:{' '}
                <span className="font-semibold text-foreground">
                  “I give [amount/percentage/asset] to Bitcoin For The Arts, Inc., a
                  New York nonprofit (EIN [insert EIN]), for its general purposes.”
                </span>{' '}
                You can add: “Convert to BTC for HODL Vault” if desired.
              </li>
              <li>
                <span className="font-semibold text-foreground">Notify us (optional):</span>{' '}
                Share details for recognition and planning so we can honor your
                intent.
              </li>
              <li>
                <span className="font-semibold text-foreground">Confirmation:</span>{' '}
                When received, we’ll thank the estate/executor; deductions are
                generally handled at the estate level.
              </li>
            </ol>
          </section>

          <section className="mt-12 rounded-2xl border border-border bg-background p-6">
            <h2 className="text-xl font-semibold tracking-tight">Tips for success</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              <li>
                <span className="font-semibold text-foreground">Types:</span> Specific
                (fixed amount), percentage (scales with estate), residuary (remainder),
                or contingent (if primary beneficiaries predecease).
              </li>
              <li>
                <span className="font-semibold text-foreground">Tax advice:</span> Consult
                your advisor — rules vary by state and by year.
              </li>
              <li>
                <span className="font-semibold text-foreground">Bitcoin conversion:</span>{' '}
                Add a note like “Proceeds to endowment, converted to Bitcoin” to align
                with sound-money growth.
              </li>
              <li>
                <span className="font-semibold text-foreground">State rules:</span> Bequests
                are available nationwide; online tools can help you update quickly.
              </li>
            </ul>
          </section>

          <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <h2 className="text-xl font-semibold tracking-tight">
                  Ready to build art&apos;s sovereign future?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Contact us today — your bequest could ignite the next renaissance.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <a
                  href="mailto:donate@bitcoinforthearts.org?subject=Bequest%20and%20estate%20planning"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                >
                  Email donate@
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

