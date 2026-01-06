import type { Metadata } from 'next';
import BtcPayDonateWidget from '@/components/BtcPayDonateWidget';
import BitcoinDonationCard from '@/components/BitcoinDonationCard';
import WaysToGive from '@/components/WaysToGive';
import Link from 'next/link';
import FullBleedHero from '@/components/FullBleedHero';

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Donate Bitcoin to support artists through micro-grants and programming.',
};

export default function DonatePage({
  searchParams,
}: {
  searchParams?: { amount?: string };
}) {
  const address =
    process.env.NEXT_PUBLIC_BTC_DONATION_ADDRESS ?? 'bc1qarts...';
  const heroImage = process.env.NEXT_PUBLIC_HERO_DONATE_IMAGE ?? '/bitcoin band.JPG';
  const prefillAmountRaw = searchParams?.amount;
  const prefillAmount = prefillAmountRaw ? Number(prefillAmountRaw) : undefined;
  const defaultAmount =
    Number.isFinite(prefillAmount) && (prefillAmount as number) > 0
      ? (prefillAmount as number)
      : undefined;

  return (
    <main className="bg-background">
      <FullBleedHero
        imageSrc={heroImage}
        imageAlt="Support artists with Bitcoin."
        label="Donate"
        title="Fund artists. Strengthen sovereign creativity."
        description="Give in Bitcoin, fiat, stocks, or planned gifts — and help build a long-term reserve for creators."
      />

      <div className="mx-auto max-w-6xl px-8 py-14 sm:px-6">
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

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/grants"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
            >
              Learn about grants
            </Link>
            <a
              href="https://github.com/Bitcoin-For-The-Arts/bitcoinforthearts-treasury"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
            >
              View treasury
            </a>
          </div>
        </div>

        <WaysToGive />

        <div id="bitcoin" className="mt-12 space-y-6 scroll-mt-28">
          <BtcPayDonateWidget defaultAmount={defaultAmount} />
          <BitcoinDonationCard address={address} />
        </div>

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
      </div>
    </main>
  );
}

