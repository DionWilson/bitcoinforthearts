'use client';

import Link from 'next/link';
import { useState } from 'react';

type Way = {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  // Mobile-only “fit” meter (lightweight, illustrative).
  meter?: {
    speed: number; // 0-100
    tax: number; // 0-100
    legacy: number; // 0-100
  };
};

const ways: Way[] = [
  {
    title: 'Cash & Monthly Gifts',
    description:
      'One-time or recurring via credit card/check (Stripe). Monthly patrons can opt into a public leaderboard spot.',
    ctaLabel: 'Donate (fiat)',
    href: 'mailto:donate@bitcoinforthearts.org?subject=Fiat%20donation%20(Stripe)%20setup',
    meter: { speed: 85, tax: 35, legacy: 45 },
  },
  {
    title: 'Bitcoin & Lightning',
    description:
      'Donate on-chain to our wallet or use BTCPay (BTC + Lightning). On-chain proof can be reflected in our public treasury.',
    ctaLabel: 'Donate BTC',
    href: '/donate#bitcoin',
    meter: { speed: 90, tax: 30, legacy: 70 },
  },
  {
    title: 'Stocks, Bonds, Mutual Funds',
    description:
      'Potentially avoid capital gains tax by donating appreciated securities. We can liquidate and convert to BTC.',
    ctaLabel: 'Learn more',
    href: '/donate/guides/securities',
    meter: { speed: 55, tax: 85, legacy: 75 },
  },
  {
    title: 'IRA Qualified Charitable Distributions (QCDs)',
    description:
      'For eligible donors: give directly from an IRA and count toward RMD. We can convert proceeds to BTC.',
    ctaLabel: 'Get the guide',
    href: '/donate/guides/ira-qcd',
    meter: { speed: 60, tax: 80, legacy: 65 },
  },
  {
    title: 'Donor-Advised Funds (DAFs)',
    description:
      'Recommend a grant from your DAF to support our mission. We can convert proceeds to BTC.',
    ctaLabel: 'How to donate',
    href: '/donate/guides/daf',
    meter: { speed: 55, tax: 70, legacy: 80 },
  },
  {
    title: 'Corporate Matching & Workplace Giving',
    description:
      'Some employers match donations. Ask if your company supports matching or workplace giving (Benevity/YourCause/etc.).',
    ctaLabel: 'Ask about matching',
    href: 'mailto:donate@bitcoinforthearts.org?subject=Employer%20matching%20donation',
    meter: { speed: 45, tax: 40, legacy: 50 },
  },
  {
    title: 'Bequests & Estate Planning',
    description:
      'Name us in your will or trust to create a future legacy for uncensorable art.',
    ctaLabel: 'Estate planning',
    href: '/donate/guides/estate-planning',
    meter: { speed: 25, tax: 65, legacy: 95 },
  },
  {
    title: 'Life Insurance Policies',
    description:
      'Make us a beneficiary or donate a policy to support the mission long-term.',
    ctaLabel: 'Guide',
    href: '/donate/guides/life-insurance',
    meter: { speed: 35, tax: 55, legacy: 90 },
  },
  {
    title: 'Real Estate, Vehicles, Or In-Kind Gifts',
    description:
      'Donate property, vehicles, or goods. We can coordinate liquidation and convert proceeds to BTC.',
    ctaLabel: 'Contact us',
    href: '/contact',
    meter: { speed: 40, tax: 55, legacy: 75 },
  },
  {
    title: 'Royalties/IP Or Other Assets',
    description:
      'Assign royalties or other asset income to support artists over time.',
    ctaLabel: 'Details',
    href: '/donate/guides/royalties-ip',
    meter: { speed: 35, tax: 60, legacy: 85 },
  },
];

function FitMeter({
  meter,
}: {
  meter: NonNullable<Way['meter']>;
}) {
  const items = [
    { label: 'Speed', value: meter.speed },
    { label: 'Tax', value: meter.tax },
    { label: 'Legacy', value: meter.legacy },
  ];

  return (
    <div className="mt-4">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">
        Typical fit
      </div>
      <div className="mt-2 space-y-2">
        {items.map((it) => (
          <div key={it.label}>
            <div className="flex items-center justify-between text-[11px] text-muted">
              <span>{it.label}</span>
              <span className="tabular-nums">{it.value}%</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full border border-border bg-background">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,rgba(126,87,194,0.95),rgba(247,147,26,0.9))]"
                style={{ width: `${it.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-[11px] leading-relaxed text-muted">
        Illustrative only. Tax treatment varies—consult your advisor.
      </div>
    </div>
  );
}

function HeartBadge() {
  return (
    <span className="text-lg leading-none" aria-hidden="true" title="Donate">
      🧡
    </span>
  );
}

export default function WaysToGive() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="mt-10 rounded-2xl border border-border bg-background p-6">
      <h2 className="text-xl font-semibold tracking-tight">Ways To Give</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Support uncensorable art—donate in Bitcoin, fiat, stocks, or planned gifts.
        Where possible, fiat contributions can be converted to BTC (volatility
        policy applies).
      </p>

      {/* Mobile: accordion list */}
      <div className="mt-6 flex flex-col gap-3 md:hidden">
        {ways.map((w, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={w.title}
              className="rounded-xl border border-accent/40 bg-surface/80 p-4"
            >
              <button
                type="button"
                className="w-full text-left"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <HeartBadge />
                      <div className="text-sm font-semibold tracking-tight">
                        {w.title}
                      </div>
                    </div>
                    <div className="mt-1 text-xs leading-relaxed text-muted">
                      {w.description}
                    </div>
                  </div>
                  <div className="shrink-0 rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold">
                    {isOpen ? 'Close' : 'Open'}
                  </div>
                </div>
              </button>

              {isOpen ? (
                <div className="mt-4">
                  {w.meter ? <FitMeter meter={w.meter} /> : null}

                  <div className="mt-4">
                    {w.href.startsWith('/') ? (
                      <Link
                        href={w.href}
                        className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                      >
                        {w.ctaLabel}
                      </Link>
                    ) : (
                      <a
                        href={w.href}
                        className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                      >
                        {w.ctaLabel}
                      </a>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Desktop: true tab panel (prevents “side opening” artifacts) */}
      <div className="mt-6 hidden md:grid md:grid-cols-12 md:gap-4">
        <div className="md:col-span-5">
          <div className="space-y-2">
            {ways.map((w, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={w.title}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={[
                    'w-full text-left rounded-xl border bg-surface/80 p-4 transition-colors',
                    isActive ? 'border-accent/60' : 'border-border hover:border-accent/35',
                  ].join(' ')}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center gap-2">
                    <HeartBadge />
                    <div className="text-sm font-semibold tracking-tight">{w.title}</div>
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-muted">
                    {w.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-7 rounded-2xl border border-accent/40 bg-surface/80 p-6">
          <div className="flex items-center gap-2">
            <HeartBadge />
            <div className="text-lg font-semibold tracking-tight">
              {ways[activeIndex]?.title}
            </div>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {ways[activeIndex]?.description}
          </p>

          {ways[activeIndex]?.meter ? <FitMeter meter={ways[activeIndex].meter} /> : null}

          <div className="mt-5">
            {ways[activeIndex]?.href?.startsWith('/') ? (
              <Link
                href={ways[activeIndex].href}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
              >
                {ways[activeIndex].ctaLabel}
              </Link>
            ) : (
              <a
                href={ways[activeIndex]?.href}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
              >
                {ways[activeIndex]?.ctaLabel}
              </a>
            )}
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-muted">
        Questions? Email{' '}
        <a
          href="mailto:donate@bitcoinforthearts.org"
          className="font-semibold underline underline-offset-4"
        >
          donate@bitcoinforthearts.org
        </a>
        . Tax treatment depends on your jurisdiction and the organization’s status;
        consult your advisor.
      </p>
    </section>
  );
}

