import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import MobileCarousel from '@/components/MobileCarousel';
 
export const metadata: Metadata = {
  title: 'DIY Fundraising Guide',
  description:
    'Host your own fundraiser to support sovereign art. Templates, promo resources, and step-by-step guidance included.',
};
 
const downloads = [
  {
    name: 'DIY Fundraising Guide (Markdown)',
    href: '/resources/diy-fundraising-guide.md',
  },
  {
    name: 'BTCPay Setup Guide (Markdown)',
    href: '/resources/btcpay-setup-guide.md',
  },
  {
    name: 'Sample Grant Agreement (Markdown)',
    href: '/resources/sample-grant-agreement.md',
  },
  {
    name: 'Donor Receipt Template (Markdown)',
    href: '/resources/donor-receipt-template.md',
  },
  {
    name: 'Logo kit (SVG)',
    href: '/resources/logos/bitcoin-for-the-arts-logo.svg',
  },
  {
    name: 'Logo kit (PNG, gold)',
    href: '/resources/logos/bitcoin-for-the-arts-logo-gold.png',
  },
  {
    name: 'Logo kit (PNG, white)',
    href: '/resources/logos/bitcoin-for-the-arts-logo-white.png',
  },
];
 
export default function DiyFundraisingGuidePage() {
  const ideaCards = [
    {
      title: 'Bitcoin Art Night',
      description:
        'Host a virtual or in-person showcase. Sell tickets, run a live auction, or take tips throughout the night.',
      imageSrc: '/native fest.JPG',
      imageAlt: 'A vibrant community arts festival.',
    },
    {
      title: 'Satoshi Streamathon',
      description:
        'Livestream your creative process. Supporters donate during the stream and help you hit a public goal.',
      imageSrc: '/Artist help.JPG',
      imageAlt: 'Artists collaborating around a table in a studio.',
    },
    {
      title: 'Gallery Zap Party',
      description:
        'Partner with a local space. Put QR codes around the venue and celebrate donors live.',
      imageSrc: '/support artist.JPG',
      imageAlt: 'A small fundraiser table with a QR code to support an artist.',
    },
    {
      title: 'Peer-to-Peer Campaign',
      description:
        'Ask your friends to join you: “Fund 5 artists with me.” Keep it simple, personal, and share progress.',
      imageSrc: '/event-background.jpg',
      imageAlt: 'A crowd at an event representing community fundraising.',
    },
    {
      title: 'Corporate Match Day',
      description:
        'Ask your employer to match donations. A match turns a small campaign into a meaningful pool of support.',
      imageSrc: '/audition.jpg',
      imageAlt:
        'A behind-the-scenes performance moment representing opportunity and support.',
    },
  ] as const;
 
  return (
    <main className="bg-background relative overflow-hidden min-h-screen">
      {/* Background image (match Get Involved styling) */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/Get%20Involved%20-background.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-background/65" />
      </div>
 
      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <Link href="/get-involved" className="hover:underline">
              Get Involved
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">DIY Fundraising Guide</span>
          </div>
 
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
            <section className="lg:col-span-7 rounded-3xl border border-border bg-surface/80 p-8 shadow-sm">
              <div className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
                Community toolkit
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                DIY Fundraising Guide
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                Host your own event or campaign to fund sovereign art. No experience
                needed—pick a format, use our templates, and we’ll help you make it
                look good.
              </p>
 
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#start"
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                >
                  Get started
                </a>
                <a
                  href="#downloads"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
                >
                  Grab templates
                </a>
              </div>
            </section>
 
            <aside className="lg:col-span-5 rounded-3xl border border-border bg-background overflow-hidden">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/bitcoin fundraiser.JPG"
                  alt="A vibrant community event supporting artists."
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-black/25" />
              </div>
              <div className="p-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Quick start
                </div>
                <ol className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                  <li>
                    <span className="font-semibold text-foreground">1.</span> Pick an
                    idea that fits your community.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">2.</span> Register
                    it with us so we can support promotion.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">3.</span> Share
                    the link + tell an artist story.
                  </li>
                </ol>
                <div className="mt-5 flex flex-col gap-3">
                  <a
                    href="mailto:events@bitcoinforthearts.org?subject=DIY%20fundraiser%20registration&body=Name%3A%0AEvent%20name%3A%0ADate%2Ftime%3A%0ALocation%20(virtual%2Fin-person)%3A%0AGoal%20(optional)%3A%0AHow%20I%20plan%20to%20accept%20donations%20(on-chain%2FLightning%2Ffiat)%3A%0APromo%20link(s)%3A%0A"
                    className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 border border-accent/60"
                  >
                    Register your fundraiser
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:opacity-90"
                  >
                    Ask for support
                  </Link>
                </div>
              </div>
            </aside>
          </div>
 
          <div id="start" className="scroll-mt-28" />
 
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <section className="lg:col-span-5 rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                Why DIY fundraising?
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                <li>
                  <strong>Empower creators:</strong> Your event can fund an artist’s
                  next masterpiece or workshop.
                </li>
                <li>
                  <strong>Easy &amp; flexible:</strong> From livestreams to gallery
                  nights—do what fits your style.
                </li>
                <li>
                  <strong>Better together:</strong> We can share your campaign and
                  provide logos/templates (opt-in recognition).
                </li>
              </ul>
            </section>
 
            <section className="lg:col-span-7 rounded-2xl border border-border bg-background p-6 overflow-hidden">
              <h2 className="text-xl font-semibold tracking-tight">
                Fundraising ideas (pick one and run it)
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Swipe through proven formats. Keep it simple, set a goal, and invite
                people into the story.
              </p>
 
              <div className="mt-6 -mx-6 px-6">
                <MobileCarousel ariaLabel="DIY fundraising ideas" dotsClassName="lg:hidden">
                  {ideaCards.map((card) => (
                    <div
                      key={card.title}
                      data-carousel-item="true"
                      className="snap-start shrink-0 w-[92%] sm:w-[70%] lg:w-[48%] rounded-2xl border border-border bg-surface/80 overflow-hidden"
                    >
                      <div className="relative aspect-[16/9] w-full">
                        <Image
                          src={card.imageSrc}
                          alt={card.imageAlt}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 48vw"
                        />
                        <div className="absolute inset-0 bg-black/15" />
                      </div>
                      <div className="p-5">
                        <div className="text-sm font-semibold tracking-tight">
                          {card.title}
                        </div>
                        <div className="mt-2 text-sm leading-relaxed text-muted">
                          {card.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </MobileCarousel>
              </div>
            </section>
          </div>
 
          <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-xl font-semibold tracking-tight">
              Step-by-step: how to run your fundraiser
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                {
                  step: '1',
                  title: 'Pick your idea + set a goal',
                  body: 'Choose a format above and set a clear target. Keep it achievable and time-boxed.',
                },
                {
                  step: '2',
                  title: 'Register + get the kit',
                  body: 'Email us your event basics. We’ll share templates, logos, and promotion guidance.',
                },
                {
                  step: '3',
                  title: 'Promote, host, and wrap up',
                  body: 'Tell the story, share progress, and send the final total so we can amplify your impact.',
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="rounded-2xl border border-border bg-background p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-semibold">
                      {s.step}
                    </div>
                    <div className="text-sm font-semibold tracking-tight">
                      {s.title}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              ))}
            </div>
          </section>
 
          <section
            id="downloads"
            className="mt-10 rounded-2xl border border-border bg-background p-6 scroll-mt-28"
          >
            <h2 className="text-xl font-semibold tracking-tight">
              Resources &amp; templates
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Download what you need. If you want a custom promo graphic, email{' '}
              <a
                href="mailto:events@bitcoinforthearts.org"
                className="font-semibold underline underline-offset-4"
              >
                events@bitcoinforthearts.org
              </a>
              .
            </p>
 
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {downloads.map((d) => (
                <a
                  key={d.href}
                  href={d.href}
                  className="rounded-xl border border-border bg-surface/70 p-4 transition-colors hover:bg-surface"
                >
                  <div className="text-sm font-semibold">{d.name}</div>
                  <div className="mt-1 text-xs text-muted">{d.href}</div>
                </a>
              ))}
            </div>
          </section>
 
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:events@bitcoinforthearts.org?subject=DIY%20fundraiser%20registration&body=Name%3A%0AEvent%20name%3A%0ADate%2Ftime%3A%0ALocation%20(virtual%2Fin-person)%3A%0AGoal%20(optional)%3A%0AHow%20I%20plan%20to%20accept%20donations%20(on-chain%2FLightning%2Ffiat)%3A%0APromo%20link(s)%3A%0A"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
            >
              Register your fundraiser
            </a>
            <Link
              href="/donate"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:opacity-90"
            >
              Donate
            </Link>
          </div>
 
          <p className="mt-6 text-xs leading-relaxed text-muted">
            Tax note: Deductibility depends on your jurisdiction and the organization’s
            status. Consult your advisor.
          </p>
        </div>
      </div>
    </main>
  );
}
