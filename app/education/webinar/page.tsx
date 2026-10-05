import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import EducationWorkshopInterestForm from '@/components/EducationWorkshopInterestForm';

export const metadata: Metadata = {
  title: 'Webinars — Bitcoin for the Arts',
  description:
    'Creator-focused webinars on why Bitcoin matters for artists: practical custody, getting paid globally, and building long-term sovereignty.',
};

/* ── External URLs ───────────────────────────────────────────────── */
const gammaUrl = 'https://copy-of-bitcoin-for-arti-1sbvsbl.gamma.site/';
const bitcoinInPracticeUrl =
  'https://docs.google.com/presentation/d/1jzhAQxY4QgojFcjtT_A9BPY8yh3yu6tvawsUDg29dzk/edit?usp=sharing';
const whatIsMoneyUrl =
  'https://docs.google.com/presentation/d/1kA_4H_h1C-MiTo0-lansl7D2W1fUCs7ekAiiTjE5JQU/edit?usp=sharing';
const protectingBtcUrl =
  'https://docs.google.com/presentation/d/1Z64VaEpCIAHsXjPfn2zArpnqPwNj-zZTaQkivRefw8Y/edit?usp=sharing';
const soundMoneyUrl =
  'https://docs.google.com/presentation/d/1Cf8CB9jFZ18Z3ZI4vniH41pujZz30EXX_7XKV01g7wA/edit?usp=sharing';
const creatorEconIntroUrl =
  'https://docs.google.com/presentation/d/1I5qSrucPfLKvBT16BL6hP1PiuMJh-hmGtLfO-amJxbs/edit?usp=drive_link';
const creatorEconAudienceUrl =
  'https://docs.google.com/presentation/d/1Lc9BxVjTaWaQK9YJGKKliOt7qUnflYlgOfXNliwHaHc/edit?usp=drive_link';
const creatorEconToolsUrl =
  'https://docs.google.com/presentation/d/1M9ib06XexhmruW1JotHNMzWcdua4xl-Cx-kmSJZVBmk/edit?usp=drive_link';

/* ── Webinar type ─────────────────────────────────────────────────── */
interface Webinar {
  title: string;
  href: string;
  image: string;
  alt: string;
  badge: string;
  description: string;
  cta: string;
}

/* ── Level 1: Foundations ─────────────────────────────────────────── */
const foundations: Webinar[] = [
  {
    title: 'What Is Money?',
    href: whatIsMoneyUrl,
    image: '/1_What-Is-Money.png',
    alt: 'What Is Money? — webinar cover',
    badge: 'Step 1',
    description:
      'A beginner-friendly journey through the origins of money\u00a0\u2014 how barter gave way to sound money, why human action depends on the ability to economize, what makes free markets and circular economies thrive, and how Bitcoin carries the story forward.',
    cta: 'View presentation',
  },
  {
    title: 'Bitcoin for Artists: Unlocking New Creative Freedom',
    href: gammaUrl,
    image: '/1_Bitcoin-for-Artists-Unlocking-New-Creative-Freedom.jpg',
    alt: 'Bitcoin for Artists: Unlocking New Creative Freedom — webinar cover',
    badge: 'Step 2',
    description:
      'An interactive overview of why Bitcoin matters for creators, how to take custody of your sats, and the path toward financial sovereignty as an artist.',
    cta: 'View presentation',
  },
  {
    title: 'Bitcoin in Practice for Artists',
    href: bitcoinInPracticeUrl,
    image: '/1_Bitcoin-in-Practice-for-Artists.jpg',
    alt: 'Bitcoin in Practice for Artists — webinar cover',
    badge: 'Step 3',
    description:
      'A hands-on guide for artists ready to put Bitcoin to work\u00a0\u2014 covering real-world custody setups, accepting payments, pricing strategies, and the practical steps between \u201cI\u2019ve heard of Bitcoin\u201d and \u201cI\u2019m using it every day.\u201d',
    cta: 'View presentation',
  },
  {
    title: 'Protecting Your Bitcoin: Security & Self-Custody Deep Dive',
    href: protectingBtcUrl,
    image: '/1_Protecting-Your-Bitcoin-Security-and-Self-Custody-Deep-Dive.jpg',
    alt: 'Protecting Your Bitcoin: Security and Self-Custody Deep Dive — webinar cover',
    badge: 'Step 4',
    description:
      'A deep dive into protecting your Bitcoin\u00a0\u2014 covering wallet architecture, self-custody best practices, multi-sig setups, seed-phrase security, and the practical steps every artist needs to safeguard their stack for the long term.',
    cta: 'View presentation',
  },
];

/* ── Level 2: Philosophy & Principles ────────────────────────────── */
const philosophy: Webinar[] = [
  {
    title: 'Sound Money, Better Art',
    href: soundMoneyUrl,
    image: '/1_Sound-Money-Better-Art.jpg',
    alt: 'Sound Money, Better Art — webinar cover',
    badge: 'Deep Dive',
    description:
      'Exploring how sound money principles fuel better creative work, why low time-preference thinking transforms artistic practice, and how Bitcoin-native patronage builds a sustainable future for the arts.',
    cta: 'View presentation',
  },
];

/* ── Level 3: Bitcoin & the Creator Economy (3-part series) ──────── */
const creatorEconomy: Webinar[] = [
  {
    title: 'Bitcoin and the Creator Economy',
    href: creatorEconIntroUrl,
    image: '/1_Bitcoin-and-the-Creator-Economy.jpg',
    alt: 'Bitcoin and the Creator Economy — webinar cover',
    badge: 'Part 1',
    description:
      'An introduction to the creator economy through a Bitcoin lens\u00a0\u2014 why traditional platforms extract value from artists, how Bitcoin changes the incentive structure, and the opportunity for creators who adopt sound money early.',
    cta: 'View presentation',
  },
  {
    title: 'Bitcoin & the Creator Economy: Building Your Audience',
    href: creatorEconAudienceUrl,
    image: '/1_Bitcoin-the-Creator-Economy-Building-Your-Audience.jpg',
    alt: 'Bitcoin & the Creator Economy: Building Your Audience — webinar cover',
    badge: 'Part 2',
    description:
      'How to build and grow an audience as a Bitcoin-aligned creator\u00a0\u2014 leveraging value-for-value models, community-first strategies, and permissionless platforms to connect directly with supporters.',
    cta: 'View presentation',
  },
  {
    title: 'Bitcoin & the Creator Economy: Tools, Platforms, and Payments',
    href: creatorEconToolsUrl,
    image: '/1_Bitcoin-and-the-Creator-Economy-Tools-Platforms-and-Payments.jpg',
    alt: 'Bitcoin & the Creator Economy: Tools, Platforms, and Payments — webinar cover',
    badge: 'Part 3',
    description:
      'The practical toolkit for creators\u00a0\u2014 Bitcoin-native platforms, Lightning payments, invoicing workflows, and the tools that let artists get paid directly without intermediaries.',
    cta: 'View presentation',
  },
];

/* ── Shared card component ───────────────────────────────────────── */
function WebinarCard({
  webinar,
  priority = false,
  size = 'default',
}: {
  webinar: Webinar;
  priority?: boolean;
  size?: 'featured' | 'default';
}) {
  const isFeatured = size === 'featured';

  return (
    <a
      href={webinar.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full overflow-hidden rounded-3xl border border-border bg-surface/80 shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={webinar.image}
          alt={webinar.alt}
          fill
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes={
            isFeatured
              ? '(max-width: 768px) 100vw, 1152px'
              : '(max-width: 640px) 100vw, 50vw'
          }
        />
      </div>
      <div className={isFeatured ? 'p-6 sm:p-8' : 'p-5 sm:p-6'}>
        <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
          {webinar.badge}
        </div>
        <h2
          className={
            isFeatured
              ? 'mt-3 text-2xl font-semibold tracking-tight sm:text-3xl'
              : 'mt-3 text-xl font-semibold tracking-tight sm:text-2xl'
          }
        >
          {webinar.title}
        </h2>
        <p
          className={
            isFeatured
              ? 'mt-3 text-sm leading-relaxed text-muted sm:text-base'
              : 'mt-2 text-sm leading-relaxed text-muted line-clamp-3'
          }
        >
          {webinar.description}
        </p>
        <div
          className={`${
            isFeatured ? 'mt-5' : 'mt-4'
          } inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-6 py-2 text-sm font-semibold text-accent-fg transition-colors group-hover:opacity-90`}
        >
          {webinar.cta} &rarr;
        </div>
      </div>
    </a>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function EducationWebinarPage() {
  return (
    <main className="bg-background relative overflow-hidden min-h-screen">
      {/* ── Background image at 50 % opacity ─────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/bitcoin-class.JPG"
          alt=""
          fill
          priority={false}
          className="object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-14">
        {/* ── Page header ─────────────────────────────────────────── */}
        <div className="max-w-4xl">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Education &bull; Webinars
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Bitcoin Webinars for Artists.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            A structured learning path from first principles to deep philosophy.
            Start with the foundations, then dive deeper. All materials are
            published under our open license (CC&nbsp;BY&nbsp;4.0).
          </p>
        </div>

        <section id="signup" className="mt-10 max-w-xl scroll-mt-28 rounded-3xl border border-border bg-surface/90 p-6 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-wide text-accent">
            Live sessions
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Sign up for the webinars.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            These lessons are the class. Sign up and we will email you when the next live session is set. The presentations below stay open while you wait.
          </p>
          <div className="mt-5">
            <EducationWorkshopInterestForm variant="webinar" />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            LEVEL 1 — FOUNDATIONS
        ═══════════════════════════════════════════════════════════ */}
        <section className="mt-14">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-fg">
              1
            </span>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Foundations
            </h2>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            The essentials every artist needs to get started with Bitcoin.
            Understand what money is, why Bitcoin matters for creators, how to
            use it day-to-day, and how to keep it safe. Complete these four and
            you&rsquo;re ready for anything.
          </p>

          <div className="mt-8">
            <WebinarCard webinar={foundations[0]} priority size="featured" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {foundations.slice(1).map((w) => (
              <WebinarCard key={w.title} webinar={w} />
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            LEVEL 2 — DEEP DIVES
        ═══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              2
            </span>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Deep Dives
            </h2>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            Go beyond the basics. These webinars explore the philosophy behind
            sound money, how Bitcoin&rsquo;s principles reshape creative
            practice, and the practical path to building a sustainable career
            in the creator economy&mdash;all without gatekeepers.
          </p>

          {/* ── Sound Money, Better Art (featured) ────────────────── */}
          <div className="mt-8">
            <WebinarCard webinar={philosophy[0]} size="featured" />
          </div>

          {/* ── Bitcoin & the Creator Economy — 3-Part Series ─────── */}
          <div className="mt-10">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Bitcoin &amp; the Creator Economy
              </h3>
              <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                New — 3-Part Series
              </span>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
              A three-part series on building a sustainable creative career with
              Bitcoin. From understanding the creator economy to growing your
              audience and mastering the tools that let you get paid
              directly&mdash;without intermediaries.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {creatorEconomy.map((w) => (
                <WebinarCard key={w.title} webinar={w} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Open-education CTA ──────────────────────────────────── */}
        <div className="mt-14 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/education/open"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-background px-5 py-2 text-sm font-semibold transition-colors hover:bg-surface"
          >
            Open education materials (CC BY 4.0)
          </Link>
        </div>

        {/* ── License notice ──────────────────────────────────────── */}
        <div className="mt-8 rounded-2xl border border-border bg-surface/60 p-5 text-sm text-muted">
          <div className="font-semibold text-foreground">License</div>
          <div className="mt-2">
            All webinars are published under{' '}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Creative Commons Attribution 4.0 International (CC BY 4.0)
            </a>
            . You may share and adapt the material with attribution:{' '}
            <span className="font-medium text-foreground">
              &ldquo;Bitcoin for the Arts (bitcoinforthearts.org) — CC BY 4.0&rdquo;
            </span>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/education"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
          >
            &larr; Back to Education
          </Link>
        </div>
      </div>
    </main>
  );
}
