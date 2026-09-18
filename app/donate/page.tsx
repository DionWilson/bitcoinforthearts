import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import WaysToGive from '@/components/WaysToGive';
import Link from 'next/link';
import FullBleedHero from '@/components/FullBleedHero';
import {
  getZapriteDonationLink,
  getZapriteFixedDonationOptions,
} from '@/lib/zaprite-donation';

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Donate with Bitcoin, Lightning, or card to support artists through micro-grants and programming.',
};

export default function DonatePage({
  searchParams,
}: {
  searchParams?: { amount?: string; thanks?: string; orderId?: string };
}) {
  const orderId = searchParams?.orderId?.trim();
  if (searchParams?.thanks === '1' || orderId) {
    const params = new URLSearchParams();
    if (orderId) params.set('orderId', orderId);
    const qs = params.toString();
    redirect(qs ? `/donate/thank-you?${qs}` : '/donate/thank-you');
  }

  const heroImage = process.env.NEXT_PUBLIC_HERO_DONATE_IMAGE ?? '/bitcoin band.JPG';
  const ein = process.env.NEXT_PUBLIC_BFTA_EIN?.trim();
  const zapriteUrl = getZapriteDonationLink();
  const fixedAmounts = getZapriteFixedDonationOptions();

  return (
    <main className="bg-background">
      <FullBleedHero
        imageSrc={heroImage}
        imageAlt="Support artists with Bitcoin."
        label="Donate"
        title="Fund artists. Strengthen sovereign creativity."
        description="Give in Bitcoin, Lightning, card, stocks, or planned gifts — and help build a long-term reserve for creators."
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

        {/* One-time give — Zaprite (Strike Bitcoin/Lightning + Stripe card) */}
        <section id="donate-now" className="mt-10 scroll-mt-28">
          <div className="relative overflow-hidden rounded-2xl border-2 border-accent/50 bg-background">
            <div className="h-1.5 w-full bg-[linear-gradient(90deg,#f7931a,#ff6f00,#f7931a)]" />
            <div className="p-6 sm:p-8">
              <div className="text-xs font-semibold uppercase tracking-wide text-accent">
                One-time gift
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Donate with Bitcoin, Lightning, or card.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                Pick a suggested amount, or give any amount you choose. Bitcoin, Lightning, or card.
                Receipts are emailed after payment.
              </p>

              <div className="mt-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Suggested amounts
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {fixedAmounts.map((option) => {
                    const isFeatured = option.amount === 21;
                    return (
                      <a
                        key={option.amount}
                        href={option.href}
                        id={option.amount === 21 ? 'bitcoin' : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={[
                          'relative inline-flex min-h-16 flex-col items-center justify-center rounded-xl px-4 py-3 text-sm font-bold transition-all',
                          isFeatured
                            ? 'bg-accent text-accent-fg shadow-lg ring-2 ring-accent ring-offset-2 ring-offset-background hover:brightness-110 sm:scale-[1.03]'
                            : 'border border-border bg-background text-foreground hover:bg-surface',
                        ].join(' ')}
                      >
                        {isFeatured ? (
                          <span className="mb-1 text-[10px] font-bold uppercase tracking-wide text-accent-fg/90">
                            Most chosen · 21
                          </span>
                        ) : null}
                        <span className={isFeatured ? 'text-lg' : 'text-base'}>{option.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Or choose your own
                </div>
                <a
                  href={zapriteUrl}
                  id="card"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-16 w-full items-center justify-center rounded-xl border-2 border-accent bg-accent/10 px-8 py-4 text-base font-bold text-foreground transition-colors hover:bg-accent/20 sm:w-auto sm:min-w-[20rem]"
                >
                  Give any amount →
                </a>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted">
                Secure checkout hosted by Zaprite. Bitcoin/Lightning settles to Strike.
                Card settles to Stripe. Our BTCPay Server path is temporarily offline while
                we recover from upstream Liquid/Boltz outages.
              </p>
            </div>
          </div>
        </section>

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
