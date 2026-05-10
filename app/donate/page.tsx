import type { Metadata } from 'next';
import BtcPayDonateWidget from '@/components/BtcPayDonateWidget';
import WaysToGive from '@/components/WaysToGive';
import Link from 'next/link';
import FullBleedHero from '@/components/FullBleedHero';
import StripeCustomDonateForm from '@/components/StripeCustomDonateForm';

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Donate Bitcoin to support artists through micro-grants and programming.',
};

export default function DonatePage({
}: {
  searchParams?: { amount?: string };
}) {
  const heroImage = process.env.NEXT_PUBLIC_HERO_DONATE_IMAGE ?? '/bitcoin band.JPG';
  const ein = process.env.NEXT_PUBLIC_BFTA_EIN?.trim();
  const normalizeStripeUrl = (value?: string) => {
    const trimmed = value?.trim();
    if (!trimmed) return undefined;
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }
    if (trimmed.startsWith('buy.stripe.com')) {
      return `https://${trimmed}`;
    }
    return undefined;
  };

  const stripeOneTimeUrl = normalizeStripeUrl(
    process.env.NEXT_PUBLIC_STRIPE_DONATION_LINK,
  );
  const hasStripeOneTime = Boolean(stripeOneTimeUrl);

  return (
    <main className="bg-background">
      <FullBleedHero
        imageSrc={heroImage}
        imageAlt="Support artists with Bitcoin."
        label="Donate"
        title="Fund artists. Strengthen sovereign creativity."
        description="Give in Bitcoin, fiat, stocks, or planned gifts — and help build a long-term reserve for creators."
        priority
      />

      <div className="mx-auto max-w-6xl px-6 py-14">
        {/* Intro */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Support artists with Bitcoin
          </div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Donate to Bitcoin for the Arts.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Your donation helps fund artist micro-grants, workshops, residencies, and
            productions — and supports a long-term Bitcoin reserve.
          </p>
          <div className="mt-5 rounded-2xl border border-border bg-surface/80 p-4 text-sm text-muted">
            Bitcoin For The Arts, Inc. is a 501(c)(3) tax-exempt nonprofit. Donations
            may be tax-deductible as allowed by law.
            {ein ? (
              <>
                <br />
                <span className="font-semibold text-foreground">EIN:</span> {ein}
              </>
            ) : null}
          </div>
        </div>

        {/* Sovereign Circle banner */}
        <div className="mt-10 rounded-2xl border-2 border-primary/30 bg-[linear-gradient(135deg,rgba(126,87,194,0.08),rgba(247,147,26,0.06))] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <div className="text-xs font-semibold uppercase tracking-wide text-primary">
                Monthly giving
              </div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                Join the Sovereign Circle
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Become a monthly or annual member to provide stable, predictable funding for artist grants.
                Members unlock community access, art drops, grant votes, and tenure milestones.
              </p>
            </div>
            <Link
              href="/donate/monthly"
              className="inline-flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:brightness-110"
            >
              Explore membership
            </Link>
          </div>
        </div>

        {/* BTC donation — primary, featured */}
        <section id="bitcoin" className="mt-10 scroll-mt-28">
          <BtcPayDonateWidget />
        </section>

        {/* Card / Stripe donation */}
        <div id="card" className="mt-10 rounded-2xl border border-border bg-background p-6">
          <h2 className="text-xl font-semibold tracking-tight">Donate with Card</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Give securely with a one-time card payment via Stripe Checkout.
          </p>

          <StripeCustomDonateForm />

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            {!hasStripeOneTime ? (
              <a
                href="mailto:donate@bitcoinforthearts.org?subject=Credit%20card%20donation"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
              >
                Email to donate
              </a>
            ) : null}

            <Link
              href="/donate/monthly"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
            >
              Join the Sovereign Circle
            </Link>
          </div>
          {!hasStripeOneTime ? (
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Add a Stripe payment link to enable instant card donations.
            </p>
          ) : null}
        </div>

        {/* Ways to Give */}
        <WaysToGive />

        {/* Where the money goes */}
        <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold tracking-tight">
            Where The Money Goes
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            We follow a clear allocation model: 55% grants, 30% programs, 10%
            operations, 5% long-term reserve.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg border border-border bg-background p-4 text-center">
              <div className="text-xl font-semibold">55%</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-muted">
                Grants
              </div>
            </div>
            <div className="rounded-lg border border-border bg-background p-4 text-center">
              <div className="text-xl font-semibold">30%</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-muted">
                Programs
              </div>
            </div>
            <div className="rounded-lg border border-border bg-background p-4 text-center">
              <div className="text-xl font-semibold">10%</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-muted">
                Ops
              </div>
            </div>
            <div className="rounded-lg border border-border bg-background p-4 text-center">
              <div className="text-xl font-semibold">5%</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-muted">
                Reserve
              </div>
            </div>
          </div>
        </div>

        {/* Quick nav links */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/grants"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
          >
            Learn about grants
          </Link>
          <Link
            href="/about/governance"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
          >
            Governance &amp; reporting
          </Link>
        </div>
      </div>
    </main>
  );
}
