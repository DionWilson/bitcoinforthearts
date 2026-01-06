import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Giving Through Life Insurance',
  description:
    'Create a lasting legacy for sovereign art by donating a policy or naming Bitcoin For The Arts as a beneficiary.',
};

export default function LifeInsuranceGuidePage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <Link href="/donate" className="hover:underline">
              Donate
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">Life Insurance</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Giving Through Life Insurance
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                If you&apos;re looking for a simple way to create a lasting legacy for
                sovereign art, donating a life insurance policy or naming Bitcoin For
                The Arts as a beneficiary is an excellent option. This guide explains
                how it works, the benefits, and easy steps to get started.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                Where applicable, proceeds can be converted to Bitcoin (per policy) to
                support artists long-term through our reserve.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:donate@bitcoinforthearts.org?subject=Life%20Insurance%20Gift"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                >
                  Contact donate@
                </a>
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:opacity-90"
                >
                  Back to Donate
                </Link>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="relative aspect-[4/5] w-full lg:aspect-[16/10]">
                  <Image
                    src="/art fair.jpg"
                    alt="Families and collectors walking through an art fair, representing legacy giving."
                    fill
                    className="object-cover object-[50%_35%]"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Legacy giving
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    A long-term gift can help fund the next generation of sovereign
                    creators.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Simple legacy
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Name us as beneficiary or donate an existing policy.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Flexible
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Works for many policy types; structure determines treatment.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Long-term impact
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Proceeds can fund grants and programs for years to come.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Bitcoin tie-in
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Where applicable, proceeds can be converted to BTC per policy.
              </p>
            </div>
          </div>

          <div className="mt-12 space-y-10">
            <section className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                What Is A Life Insurance Gift?
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                <li>
                  <strong>Policy donation:</strong> You transfer ownership of an
                  existing life insurance policy to us (typically irrevocable). We
                  become the beneficiary and owner.
                </li>
                <li>
                  <strong>Beneficiary designation:</strong> You keep ownership but
                  name us as a beneficiary (full or partial). We receive proceeds
                  upon your passing.
                </li>
                <li>
                  <strong>Why it fits:</strong> Life insurance gifts align with low
                  time preference—supporting future artists without impacting your
                  current finances.
                </li>
              </ul>
            </section>

            <section className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                Benefits For Donors
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                <li>
                  <strong>Tax savings:</strong> Depending on the structure, you may
                  be eligible for deductions or estate planning benefits. (Consult
                  your advisor.)
                </li>
                <li>
                  <strong>Easy legacy:</strong> No need for a large cash gift today—
                  you can use a policy you no longer need.
                </li>
                <li>
                  <strong>Flexibility:</strong> Works with many policy types. Premium
                  treatment varies by structure and jurisdiction.
                </li>
                <li>
                  <strong>Impact:</strong> Your gift can fund grants and programs for
                  artists for years to come.
                </li>
              </ul>
            </section>

            <section className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                How To Donate A Policy Or Add Us As Beneficiary
              </h2>
              <ol className="mt-4 space-y-2 text-sm leading-relaxed text-muted list-decimal pl-5">
                <li>
                  <strong>Contact us:</strong> Email{' '}
                  <a
                    href="mailto:donate@bitcoinforthearts.org"
                    className="font-semibold underline underline-offset-4"
                  >
                    donate@bitcoinforthearts.org
                  </a>
                  . We&apos;ll provide the organization details you need (EIN/tax ID,
                  legal name, mailing address).
                </li>
                <li>
                  <strong>Review your policy:</strong> Ask your insurer about cash
                  value and the transfer/beneficiary process (often a simple form).
                </li>
                <li>
                  <strong>Transfer ownership (policy donation):</strong> Sign your
                  insurer&apos;s form naming us as owner/beneficiary. Share the policy
                  documents with us and we&apos;ll coordinate next steps.
                </li>
                <li>
                  <strong>Designate beneficiary:</strong> Update your policy naming
                  “Bitcoin For The Arts, Inc.” as beneficiary (percentage or fixed
                  amount). No ownership change needed.
                </li>
                <li>
                  <strong>Confirmation:</strong> We&apos;ll send a thank-you letter and
                  any documentation we can provide based on your gift type.
                </li>
              </ol>
            </section>

            <section className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                Tips For Success
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                <li>
                  <strong>Best policies:</strong> Whole/universal policies may support
                  certain deduction structures; term policies are often simplest for
                  beneficiary gifts.
                </li>
                <li>
                  <strong>Tax advice:</strong> Consult your legal/tax advisor—rules
                  vary by policy type and jurisdiction.
                </li>
                <li>
                  <strong>Bitcoin tie-in:</strong> If desired, discuss with your
                  advisor how you&apos;d like proceeds allocated in line with our
                  long-term reserve policy.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

