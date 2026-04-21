import type { Metadata } from 'next';
import Link from 'next/link';
import FullBleedHero from '@/components/FullBleedHero';
import BtcPayMembershipButton from '@/components/BtcPayMembershipButton';
import TrackedMembershipLink from '@/components/TrackedMembershipLink';

export const metadata: Metadata = {
  title: 'Sovereign Circle Membership',
  description:
    'Join the Sovereign Circle — a membership community funding artist grants, workshops, and residencies with Bitcoin.',
};

type Level = {
  name: string;
  monthly: string;
  monthlyNum: number;
  annual: string;
  annualNum: number;
  btcAnnual: string;
  btcAnnualNum: number;
  relational: string;
  perks: string[];
  fmvNote: string;
  monthlyHref: string;
  annualHref: string;
  btcMonthlyPlan: string;
  btcAnnualPlan: string;
  impact: string[];
  meter: {
    grants: number;
    programs: number;
    reserve: number;
  };
};

const btcpayBase = (process.env.NEXT_PUBLIC_BTCPAY_URL ?? process.env.BTCPAY_URL ?? '').replace(/\/+$/, '');

const subscriptionsDisabled =
  (process.env.NEXT_PUBLIC_BTCPAY_SUBSCRIPTIONS_DISABLED ?? '').trim() === '1';

function btcSubUrl(value: string) {
  if (subscriptionsDisabled) return '';
  if (!value) return '';
  if (value.startsWith('http')) return value;
  if (!btcpayBase) return '';
  const trimmed = value.trim();
  if (!/^plancheckout_[A-Za-z0-9]+$/.test(trimmed)) return '';
  return `${btcpayBase}/plan-checkout/${trimmed}`;
}

const levels: Level[] = [
  {
    name: 'Friends of Satoshi Circle',
    monthly: '$5',
    monthlyNum: 5,
    annual: '$60',
    annualNum: 60,
    btcAnnual: '$55',
    btcAnnualNum: 55,
    relational:
      'Join a welcoming circle of supporters and begin building long-term relationships with sovereign creators.',
    perks: [
      'Monthly impact email with grant updates and on-chain reports',
      'Name on the Sovereign Circle members page (with your consent)',
      'Access to The Commons — our members-only community group',
    ],
    fmvNote: 'Estimated FMV: $0 (no tangible goods or services).',
    monthlyHref: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_5_LINK?.trim() || 'https://buy.stripe.com/4gMbJ21LU9RHgGo6rn83C05',
    annualHref: process.env.NEXT_PUBLIC_STRIPE_ANNUAL_60_LINK?.trim() || '',
    btcMonthlyPlan: process.env.NEXT_PUBLIC_BTCPAY_MONTHLY_5_PLAN?.trim() || '',
    btcAnnualPlan: process.env.NEXT_PUBLIC_BTCPAY_ANNUAL_55_PLAN?.trim() || '',
    impact: [
      'Supports foundational mission work and helps cover a portion of a micro-grant.',
      'Strengthens education and transparency reporting for the wider artist community.',
      'Contributes to long-term reserve health for future grants.',
    ],
    meter: { grants: 35, programs: 30, reserve: 25 },
  },
  {
    name: 'Orange Pilling Friends Circle',
    monthly: '$11',
    monthlyNum: 11,
    annual: '$132',
    annualNum: 132,
    btcAnnual: '$121',
    btcAnnualNum: 121,
    relational:
      'Build deeper ties to the mission through regular updates, recognition, and direct learning touchpoints.',
    perks: [
      'Shoutout at milestone moments in the newsletter',
      'Early access to all webinar recordings',
      'Behind-the-scenes updates from active grants',
      'Quarterly Q&A with the Director (virtual)',
    ],
    fmvNote: 'Estimated FMV: $0 (no tangible goods or services).',
    monthlyHref: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_11_LINK?.trim() || 'https://buy.stripe.com/6oU5kE8aibZP3TCbLH83C06',
    annualHref: process.env.NEXT_PUBLIC_STRIPE_ANNUAL_132_LINK?.trim() || '',
    btcMonthlyPlan: process.env.NEXT_PUBLIC_BTCPAY_MONTHLY_11_PLAN?.trim() || '',
    btcAnnualPlan: process.env.NEXT_PUBLIC_BTCPAY_ANNUAL_121_PLAN?.trim() || '',
    impact: [
      'Can enable roughly half to one micro-grant over a year.',
      'Covers materials for 2-4 workshop participants.',
      'Expands reserve capacity for future artist support.',
    ],
    meter: { grants: 50, programs: 45, reserve: 35 },
  },
  {
    name: 'Hard Cap Heroes',
    monthly: '$21',
    monthlyNum: 21,
    annual: '$252',
    annualNum: 252,
    btcAnnual: '$231',
    btcAnnualNum: 231,
    relational:
      'Strengthen bonds with artists and team through hangouts, voting, and discipline-level voice in mission priorities.',
    perks: [
      'Quarterly virtual hangout with artists and team',
      'BFTA welcome kit (sticker pack, US addresses, one-time)',
      'Vote on a quarterly community "Audience Choice" grant',
      'Option to direct your support toward a specific art discipline — just email us',
    ],
    fmvNote: 'Estimated FMV: ~$5 one-time (sticker pack, US only).',
    monthlyHref: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_21_LINK?.trim() || 'https://buy.stripe.com/cNi8wQ9em5Br75OeXT83C0a',
    annualHref: process.env.NEXT_PUBLIC_STRIPE_ANNUAL_252_LINK?.trim() || '',
    btcMonthlyPlan: process.env.NEXT_PUBLIC_BTCPAY_MONTHLY_21_PLAN?.trim() || '',
    btcAnnualPlan: process.env.NEXT_PUBLIC_BTCPAY_ANNUAL_231_PLAN?.trim() || '',
    impact: [
      'Powers one micro-grant over the course of a year.',
      'Funds up to five workshop spots or a residency boost.',
      'Grows the mission reserve for artist-first funding.',
    ],
    meter: { grants: 60, programs: 55, reserve: 45 },
  },
  {
    name: 'Sovereign Leaders Circle',
    monthly: '$51',
    monthlyNum: 51,
    annual: '$612',
    annualNum: 612,
    btcAnnual: '$561',
    btcAnnualNum: 561,
    relational:
      'Receive deeper acknowledgment and annual reflections that connect your support to real artist outcomes.',
    perks: [
      'Personalized video thank-you from a grant recipient (at signup)',
      'Featured card on the Sovereign Circle members page',
      'Annual year-in-review letter from the board',
    ],
    fmvNote: 'Estimated FMV: $0 (appreciation benefits are insubstantial).',
    monthlyHref: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_51_LINK?.trim() || 'https://buy.stripe.com/aFa3cw2PYd3TeygdTP83C08',
    annualHref: process.env.NEXT_PUBLIC_STRIPE_ANNUAL_612_LINK?.trim() || '',
    btcMonthlyPlan: process.env.NEXT_PUBLIC_BTCPAY_MONTHLY_51_PLAN?.trim() || '',
    btcAnnualPlan: process.env.NEXT_PUBLIC_BTCPAY_ANNUAL_561_PLAN?.trim() || '',
    impact: [
      'Delivers 1-3 micro-grants per year for working artists.',
      'Supports 6-12 workshop or residency seats annually.',
      'Keeps the reserve growing for long-horizon support.',
    ],
    meter: { grants: 75, programs: 70, reserve: 55 },
  },
  {
    name: 'Renaissance Guardian Circle',
    monthly: '$101',
    monthlyNum: 101,
    annual: '$1,212',
    annualNum: 1212,
    btcAnnual: '$1,111',
    btcAnnualNum: 1111,
    relational:
      'Engage at the highest level with mission strategy, recognition, and long-horizon support for sovereign creators.',
    perks: [
      'Name a grant cycle',
      'Member spotlight feature on site and newsletter',
      'Invitation to annual strategy call with the board',
      'Early review of grant applications before public announcement',
    ],
    fmvNote: 'Estimated FMV: $0 (recognition and strategy access are insubstantial).',
    monthlyHref: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_101_LINK?.trim() || 'https://buy.stripe.com/3cIaEY4Y6fc1cq8bLH83C09',
    annualHref: process.env.NEXT_PUBLIC_STRIPE_ANNUAL_1212_LINK?.trim() || '',
    btcMonthlyPlan: process.env.NEXT_PUBLIC_BTCPAY_MONTHLY_101_PLAN?.trim() || '',
    btcAnnualPlan: process.env.NEXT_PUBLIC_BTCPAY_ANNUAL_1111_PLAN?.trim() || '',
    impact: [
      'Fuels 4+ micro-grants annually for bold creators.',
      'Sponsors full workshops or co-production moments.',
      'Accelerates the reserve that sustains the mission.',
    ],
    meter: { grants: 90, programs: 85, reserve: 70 },
  },
];

const pillars = [
  {
    name: 'The Commons',
    description: 'A members-only community space where you connect with artists, fellow members, and the BFTA team. Behind-the-scenes updates, candid org discussions, and direct access.',
  },
  {
    name: 'The Gallery',
    description: 'Quarterly digital art drops from grant recipients, exclusive to active members. Plus an annual Sovereign Collection — a curated portfolio of all works your membership helped create.',
  },
  {
    name: 'The Voice',
    description: 'Vote on the quarterly Audience Choice grant. Choose which art discipline your support is weighted toward. Shape the mission through annual member surveys. Member input is advisory and does not override board fiduciary responsibility or final compliance decisions.',
  },
  {
    name: 'The Ledger',
    description: 'Public member recognition on the Sovereign Circle page (opt-in). On-chain impact tracking. Your name in the annual transparency report.',
  },
  {
    name: 'The Journey',
    description: 'Benefits unlock the longer you stay. Hit milestones at 3, 6, 12, and 24 months. Reach Legacy Member status and your recognition becomes permanent.',
  },
];

const milestones = [
  {
    month: 'Day 1',
    title: 'Welcome',
    description: 'Welcome kit, access to The Commons, listing on the Sovereign Circle members page.',
  },
  {
    month: '3 months',
    title: 'Steady Supporter',
    description: 'Badge upgrade on the members page. Access to quarterly grant impact reports.',
  },
  {
    month: '6 months',
    title: 'Art Connection',
    description: 'Your first quarterly art drop — an exclusive digital work from a grant recipient.',
  },
  {
    month: '12 months',
    title: 'Annual Member',
    description: 'Name in the yearly transparency report. Annual Sovereign Collection of funded works.',
  },
  {
    month: '24 months',
    title: 'Legacy Member',
    description: 'Permanent recognition on the Sovereign Circle page — even if you later pause your membership.',
  },
];

export default function MembershipPage() {
  const heroImage = '/donor-hype.JPG';
  const ein = process.env.NEXT_PUBLIC_BFTA_EIN?.trim();
  const meterItems = [
    { key: 'grants', label: 'Grants' },
    { key: 'programs', label: 'Programs' },
    { key: 'reserve', label: 'Reserve' },
  ] as const;

  return (
    <main className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[url('/coin-holders.JPG')] bg-cover bg-center opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-background/50" />
      <FullBleedHero
        imageSrc={heroImage}
        imageAlt="Join the Sovereign Circle membership."
        label="Sovereign Circle"
        title="Become a member. Fund the renaissance."
        description="Join a community of patrons powering artist grants, workshops, and residencies with sound money."
      />

      <div className="relative mx-auto max-w-6xl px-8 py-14 sm:px-6">
        {/* ── Intro ────────────────────────────────────────── */}
        <div className="max-w-4xl">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Sovereign Circle Membership
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            More than a donation. A membership.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            The Sovereign Circle isn&apos;t a subscription — it&apos;s a community
            of people who believe in funding artists with uncensorable money.
            Members don&apos;t just give; they belong, participate, and shape where
            the money goes. You&apos;ll connect with the artists you help fund,
            vote on grants, and unlock deeper access the longer you stay.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            With our transparent 55/30/10/5 allocation, you see exactly where
            your support goes: 55% to direct grants, 30% to programs, 10% to
            operations, and 5% to the HODL Vault — a permanent reserve for
            the mission.
          </p>
        </div>

        {/* ── Allocation ───────────────────────────────────── */}
        <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            { label: 'Grants', value: '55%' },
            { label: 'Programs', value: '30%' },
            { label: 'Operations', value: '10%' },
            { label: 'HODL Vault', value: '5%' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border bg-background/90 p-5 text-center shadow-sm"
            >
              <div className="text-2xl font-semibold text-primary">{item.value}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">
                {item.label}
              </div>
            </div>
          ))}
        </section>

        {/* ── Five Pillars ─────────────────────────────────── */}
        <section className="mt-10 rounded-2xl border border-border bg-surface/80 p-6">
          <h2 className="text-xl font-semibold tracking-tight">
            What membership gives you
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Five pillars that make the Sovereign Circle more than a donation.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.name}
                className="rounded-xl border border-border bg-background p-5"
              >
                <div className="text-sm font-semibold">{pillar.name}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── The Journey ──────────────────────────────────── */}
        <section className="mt-10 rounded-2xl border border-border bg-background/90 p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold tracking-tight">
              The Journey — your membership grows with you
            </h2>
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              Tenure milestones
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The longer you stay, the more you unlock. Every milestone is
            celebrated — and at 24 months, your Legacy Member status becomes
            permanent.
          </p>
          <div className="mt-5 space-y-3">
            {milestones.map((ms, i) => (
              <div
                key={ms.month}
                className="flex items-start gap-4 rounded-xl border border-border bg-surface/60 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {ms.month} — {ms.title}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {ms.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Video ────────────────────────────────────────── */}
        <section className="mt-10 rounded-2xl border border-border bg-background/90 p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold tracking-tight">
              See the impact
            </h2>
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              Member spotlight
            </span>
          </div>
          <div className="mt-4 mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-black">
            <video
              src="/BFTA-donor-vid.MP4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full"
            />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Your membership keeps the lights on for artists building uncensorable work.
          </p>
        </section>

        {/* ── Membership circles ───────────────────────────── */}
        <section id="levels" className="mt-10 scroll-mt-28">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tight">
              Membership circles
            </h2>
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              Choose your circle
            </span>
          </div>
          <div className="mt-4 rounded-xl border border-border bg-surface/60 p-4">
            <div className="flex items-start gap-3">
              <svg
                viewBox="0 0 24 24"
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z"
                />
              </svg>
              <div>
                <div className="text-sm font-semibold">Benefits stack up</div>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Every circle includes all benefits from circles below it. Higher
                  circles add deeper participation, recognition, and mission voice.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-3 rounded-xl border border-accent/40 bg-surface/80 p-4">
            <div className="text-sm font-semibold tracking-tight">
              Annual support helps us plan with confidence
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              If you&apos;re ready for long-term support, annual membership reduces
              renewal friction and helps us plan grants and programs more
              predictably. Bitcoin annual circles include a one-month discount
              (11 months for the price of 12).
            </p>
          </div>

          {/* ── Standard levels (2-col grid) ── */}
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {levels.slice(0, -1).map((level) => {
              const hasAnnualStripe = Boolean(level.annualHref);
              const btcMonthlyUrl = btcSubUrl(level.btcMonthlyPlan);
              const btcAnnualUrl = btcSubUrl(level.btcAnnualPlan);
              const hasBtcMonthly = Boolean(btcMonthlyUrl);
              const hasBtcAnnual = Boolean(btcAnnualUrl);
              return (
                <div
                  key={level.name}
                  className="rounded-2xl border border-border bg-background p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold">{level.name}</div>
                      <div className="mt-1 text-sm text-muted">
                        {level.monthly} / mo&ensp;·&ensp;{level.annual} / yr
                      </div>
                      {level.btcAnnual !== level.annual && (
                        <div className="mt-0.5 text-xs text-accent">
                          ₿ Annual: {level.btcAnnual} / yr
                        </div>
                      )}
                    </div>
                    <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
                      Membership
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="rounded-lg border border-border bg-surface/60 px-3 py-2 text-sm leading-relaxed text-muted">
                      {level.relational}
                    </div>
                    <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted">
                      Member benefits
                    </div>
                    <ul className="mt-2 space-y-2">
                      {level.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2 text-sm leading-relaxed">
                          <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true">
                            <path fill="currentColor" fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 text-xs leading-relaxed text-muted">
                      <span className="font-semibold text-foreground">Tax note:</span>{' '}
                      {level.fmvNote}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-border bg-surface/80 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted">Yearly impact</div>
                    <ul className="mt-3 space-y-2 text-sm text-muted">
                      {level.impact.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.16" />
                            <path d="M12 7.5v9M9.5 9.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 space-y-3">
                      {meterItems.map((metric) => {
                        const value = level.meter[metric.key];
                        return (
                          <div key={metric.key}>
                            <div className="flex items-center justify-between text-[11px] text-muted">
                              <span>{metric.label}</span>
                              <span className="tabular-nums">{value}%</span>
                            </div>
                            <div className="mt-1 h-2 w-full overflow-hidden rounded-full border border-border bg-background">
                              <div className="h-full rounded-full bg-[linear-gradient(90deg,rgba(126,87,194,0.95),rgba(247,147,26,0.9))]" style={{ width: `${value}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <div className="mb-2 inline-flex items-center rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
                        Monthly membership
                      </div>
                      <div className="space-y-2">
                        <TrackedMembershipLink
                          href={level.monthlyHref}
                          tier={level.name}
                          cadence="monthly"
                          paymentMethod="traditional"
                          className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                        >
                          Traditional payment — {level.monthly} / mo
                        </TrackedMembershipLink>
                        {hasBtcMonthly ? (
                          <TrackedMembershipLink
                            href={btcMonthlyUrl}
                            tier={level.name}
                            cadence="monthly"
                            paymentMethod="bitcoin"
                            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border-2 border-accent bg-background px-5 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent/5"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-bold leading-none text-white" aria-hidden="true">₿</span>
                            Subscribe with Bitcoin — {level.monthly} / mo
                          </TrackedMembershipLink>
                        ) : (
                          <BtcPayMembershipButton
                            amount={level.monthlyNum}
                            tierName={`${level.name} (monthly)`}
                            label={`Bitcoin one-time — ${level.monthly}`}
                            tracking={{ tier: level.name, cadence: 'monthly', checkoutType: 'one_time_invoice' }}
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 inline-flex items-center rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
                        Annual membership
                      </div>
                      <div className="space-y-2">
                        {hasAnnualStripe ? (
                          <TrackedMembershipLink
                            href={level.annualHref}
                            tier={level.name}
                            cadence="annual"
                            paymentMethod="traditional"
                            className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:bg-surface"
                          >
                            Traditional payment — {level.annual} / yr
                          </TrackedMembershipLink>
                        ) : (
                          <TrackedMembershipLink
                            href={`mailto:donate@bitcoinforthearts.org?subject=Annual%20membership%3A%20${encodeURIComponent(level.name)}&body=I%E2%80%99d%20like%20to%20join%20as%20an%20annual%20${encodeURIComponent(level.name)}%20member%20(${level.annual}%2Fyr).`}
                            tier={level.name}
                            cadence="annual"
                            paymentMethod="traditional"
                            checkoutType="manual_email"
                            className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:bg-surface"
                          >
                            Traditional payment — {level.annual} / yr
                          </TrackedMembershipLink>
                        )}
                        {hasBtcAnnual ? (
                          <TrackedMembershipLink
                            href={btcAnnualUrl}
                            tier={level.name}
                            cadence="annual"
                            paymentMethod="bitcoin"
                            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border-2 border-accent bg-background px-5 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent/5"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-bold leading-none text-white" aria-hidden="true">₿</span>
                            Subscribe with Bitcoin — {level.btcAnnual} / yr
                          </TrackedMembershipLink>
                        ) : (
                          <BtcPayMembershipButton
                            amount={level.btcAnnualNum}
                            tierName={`${level.name} (annual)`}
                            label={`Bitcoin one-time — ${level.btcAnnual}`}
                            tracking={{ tier: level.name, cadence: 'annual', checkoutType: 'one_time_invoice' }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Renaissance Guardian — full-width prestige card ── */}
          {(() => {
            const guardian = levels[levels.length - 1];
            const hasAnnualStripe = Boolean(guardian.annualHref);
            const guardianBtcMonthlyUrl = btcSubUrl(guardian.btcMonthlyPlan);
            const guardianBtcAnnualUrl = btcSubUrl(guardian.btcAnnualPlan);
            const hasBtcMonthly = Boolean(guardianBtcMonthlyUrl);
            const hasBtcAnnual = Boolean(guardianBtcAnnualUrl);
            return (
              <div className="mt-6 rounded-2xl bg-[linear-gradient(135deg,#4a148c_0%,#7e57c2_45%,#f7931a_100%)] p-[2px] shadow-lg">
                <div className="rounded-[14px] bg-[linear-gradient(135deg,rgba(74,20,140,0.97)_0%,rgba(126,87,194,0.95)_50%,rgba(247,147,26,0.92)_100%)] p-6 sm:p-8">
                  <div className="flex flex-col gap-6 md:flex-row md:gap-10">
                    {/* Left column — info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="inline-flex items-center rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                            Most impact
                          </span>
                          <div className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                            {guardian.name}
                          </div>
                          <div className="mt-1 text-sm text-white/75">
                            {guardian.monthly} / mo&ensp;·&ensp;{guardian.annual} / yr
                          </div>
                          {guardian.btcAnnual !== guardian.annual && (
                            <div className="mt-0.5 text-xs text-accent">
                              ₿ Annual: {guardian.btcAnnual} / yr
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm leading-relaxed text-white/85">
                          {guardian.relational}
                        </div>
                        <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-white/60">
                          Member benefits
                        </div>
                        <ul className="mt-2 space-y-2">
                          {guardian.perks.map((perk) => (
                            <li key={perk} className="flex items-start gap-2 text-sm leading-relaxed text-white/90">
                              <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden="true">
                                <path fill="currentColor" fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span>{perk}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 text-xs leading-relaxed text-white/75">
                          <span className="font-semibold text-white">Tax note:</span>{' '}
                          {guardian.fmvNote}
                        </div>
                      </div>

                      <div className="mt-5 rounded-xl border border-white/15 bg-white/10 p-4">
                        <div className="text-xs font-semibold uppercase tracking-wide text-white/60">Yearly impact</div>
                        <ul className="mt-3 space-y-2 text-sm text-white/80">
                          {guardian.impact.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-white/70" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
                                <path d="M12 7.5v9M9.5 9.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                              </svg>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 space-y-3">
                          {meterItems.map((metric) => {
                            const value = guardian.meter[metric.key];
                            return (
                              <div key={metric.key}>
                                <div className="flex items-center justify-between text-[11px] text-white/60">
                                  <span>{metric.label}</span>
                                  <span className="tabular-nums">{value}%</span>
                                </div>
                                <div className="mt-1 h-2 w-full overflow-hidden rounded-full border border-white/15 bg-white/10">
                                  <div className="h-full rounded-full bg-white/70" style={{ width: `${value}%` }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Right column — payment */}
                    <div className="flex-1 md:max-w-sm">
                      <div className="space-y-4">
                        <div>
                          <div className="mb-2 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white/80">
                            Monthly membership
                          </div>
                          <div className="space-y-2">
                            <TrackedMembershipLink
                              href={guardian.monthlyHref}
                              tier={guardian.name}
                              cadence="monthly"
                              paymentMethod="traditional"
                              className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#4a148c] transition-colors hover:opacity-90"
                            >
                              Traditional payment — {guardian.monthly} / mo
                            </TrackedMembershipLink>
                            {hasBtcMonthly ? (
                              <TrackedMembershipLink
                                href={guardianBtcMonthlyUrl}
                                tier={guardian.name}
                                cadence="monthly"
                                paymentMethod="bitcoin"
                                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-white/25 bg-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/25"
                              >
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-bold leading-none text-white" aria-hidden="true">₿</span>
                                Subscribe with Bitcoin — {guardian.monthly} / mo
                              </TrackedMembershipLink>
                            ) : (
                              <BtcPayMembershipButton
                                amount={guardian.monthlyNum}
                                tierName={`${guardian.name} (monthly)`}
                                label={`Bitcoin one-time — ${guardian.monthly}`}
                                tracking={{ tier: guardian.name, cadence: 'monthly', checkoutType: 'one_time_invoice' }}
                                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-white/25 bg-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/25 disabled:opacity-60"
                              />
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="mb-2 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white/80">
                            Annual membership
                          </div>
                          <div className="space-y-2">
                            {hasAnnualStripe ? (
                              <TrackedMembershipLink
                                href={guardian.annualHref}
                                tier={guardian.name}
                                cadence="annual"
                                paymentMethod="traditional"
                                className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-white/25 bg-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/25"
                              >
                                Traditional payment — {guardian.annual} / yr
                              </TrackedMembershipLink>
                            ) : (
                              <TrackedMembershipLink
                                href={`mailto:donate@bitcoinforthearts.org?subject=Annual%20membership%3A%20${encodeURIComponent(guardian.name)}&body=I%E2%80%99d%20like%20to%20join%20as%20an%20annual%20${encodeURIComponent(guardian.name)}%20member%20(${guardian.annual}%2Fyr).`}
                                tier={guardian.name}
                                cadence="annual"
                                paymentMethod="traditional"
                                checkoutType="manual_email"
                                className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-white/25 bg-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/25"
                              >
                                Traditional payment — {guardian.annual} / yr
                              </TrackedMembershipLink>
                            )}
                            {hasBtcAnnual ? (
                              <TrackedMembershipLink
                                href={guardianBtcAnnualUrl}
                                tier={guardian.name}
                                cadence="annual"
                                paymentMethod="bitcoin"
                                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-white/25 bg-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/25"
                              >
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-bold leading-none text-white" aria-hidden="true">₿</span>
                                Subscribe with Bitcoin — {guardian.btcAnnual} / yr
                              </TrackedMembershipLink>
                            ) : (
                              <BtcPayMembershipButton
                                amount={guardian.btcAnnualNum}
                                tierName={`${guardian.name} (annual)`}
                                label={`Bitcoin one-time — ${guardian.btcAnnual}`}
                                tracking={{ tier: guardian.name, cadence: 'annual', checkoutType: 'one_time_invoice' }}
                                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-white/25 bg-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/25 disabled:opacity-60"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        <div className="mt-6 space-y-2 text-xs leading-relaxed text-muted">
          <p>
            Impact metrics are illustrative estimates based on our allocation model and
            will evolve as data grows.
          </p>
          <p>
            <strong>Annual recommendation:</strong> Annual memberships reduce renewal
            friction and help us plan grants and programming with more confidence.
            Annual Bitcoin circles include a one-month discount (11 months for the
            price of 12).
          </p>
          <p>
            <strong>Annual memberships:</strong> Annual members immediately unlock the
            3-month &ldquo;Steady Supporter&rdquo; milestone since they&apos;ve
            committed for the year.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-surface/80 p-6">
          <h2 className="text-lg font-semibold tracking-tight">
            Membership terms
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
            <li>
              Member benefits are mission-participation benefits and may evolve as
              the program grows.
            </li>
            <li>
              Benefits have no cash value, are non-transferable, and are not
              investment or ownership rights.
            </li>
            <li>
              Community votes, surveys, and discipline preferences are advisory;
              the board retains final fiduciary and compliance authority.
            </li>
            <li>
              You can pause your membership at any time. Recognition milestones
              are based on active tenure.
            </li>
          </ul>
        </div>

        {/* ── Tax info ─────────────────────────────────────── */}
        <div className="mt-10 rounded-2xl border border-border bg-background p-6">
          <h2 className="text-lg font-semibold tracking-tight">Tax benefits</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Bitcoin For The Arts, Inc. is a 501(c)(3) tax-exempt nonprofit.
            Membership contributions may be tax-deductible to the extent allowed by
            law, reduced by the fair market value (FMV) of any goods or services
            received. Most circles have estimated FMV of $0; Hard Cap Heroes
            includes a one-time sticker pack with an estimated FMV of about $5. Our
            EIN is {ein ?? 'available upon request'}.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Receipts are provided automatically. This page is for informational
            purposes only and does not constitute tax advice. Please consult your
            tax advisor.
          </p>
        </div>

        {/* ── CTA banner ───────────────────────────────────── */}
        <section className="mt-6 rounded-2xl border border-border bg-primary text-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-white/80">
                Sovereign Circle
              </div>
              <div className="mt-2 text-xl font-semibold">
                Your membership keeps art free and artists paid in sound money.
              </div>
            </div>
            <Link
              href="#levels"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-primary transition-colors hover:opacity-90"
            >
              Choose a circle
            </Link>
          </div>
        </section>

        {/* ── Transparency ─────────────────────────────────── */}
        <div className="mt-6 rounded-2xl border border-border bg-surface/80 p-6">
          <h2 className="text-lg font-semibold tracking-tight">On-chain transparency</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Track the collective impact of the Sovereign Circle via our public
            wallet. Watch your support turn into artist sovereignty — no other
            arts nonprofit can show you this.
          </p>
        </div>

        {/* ── Contact / back link ──────────────────────────── */}
        <div className="mt-8 text-center text-sm text-muted">
          Questions about membership? Email{' '}
          <a
            href="mailto:donate@bitcoinforthearts.org"
            className="font-semibold underline underline-offset-4"
          >
            donate@bitcoinforthearts.org
          </a>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/donate"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
          >
            Back to donate page
          </Link>
        </div>
      </div>
    </main>
  );
}
