import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ClassSignupSection from '@/components/ClassSignupSection';

export const metadata: Metadata = {
  title: 'Education',
  description:
    'Bitcoin education for artists: workshops, resources, and practical tools for financial sovereignty.',
};

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</div>
      <div className="mt-3 text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}

export default function EducationPage() {
  return (
    <main className="bg-background relative overflow-hidden min-h-screen">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/bitcoin gallery.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-5xl">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Education
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Bitcoin Education for Artists.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            We’re building an education program that helps artists adopt Bitcoin with confidence: self-custody,
            receiving BTC, pricing in sats, and building long-term sovereignty. We’re not fully operational yet —
            this page is the plan and the starting toolkit.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/donate"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
            >
              Fund education
            </Link>
            <Link
              href="/get-involved/volunteer"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
            >
              Volunteer to teach / support
            </Link>
            <Link
              href="/transparency/bitcoin-education-initiative-proposal"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:bg-background"
            >
              Education proposal (draft)
            </Link>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-background p-5 text-sm text-muted">
            Looking for the full funding proposal? Read the draft in Transparency{' '}
            <Link
              href="/transparency/bitcoin-education-initiative-proposal"
              className="font-semibold underline underline-offset-4"
            >
              here
            </Link>
            .
          </div>

          <div className="mt-10">
            <ClassSignupSection source="Education Page" layout="card" />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <section className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl border border-border bg-surface/80 p-8 shadow-sm">
                <h2 className="text-2xl font-semibold tracking-tight">
                  More workshops after the fall classes
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  After the four fall classes, these hands-on workshops come next. Sign up for the classes above and
                  tell us what you want to learn; we’ll use your answers to schedule them.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card title="Bitcoin 101 for Artists">
                    Wallet basics, receiving BTC, security habits, and “getting paid in sats.”
                    <div className="mt-2 text-xs text-muted">Format: virtual / in-person • 60–120 min</div>
                  </Card>
                  <Card title="Accepting Bitcoin (BTCPay + invoices)">
                    How to accept BTC without third parties, and how to present payment options to patrons.
                    <div className="mt-2 text-xs text-muted">Format: hands-on • 60–120 min</div>
                  </Card>
                  <Card title="Pricing art in sats">
                    Practical pricing, volatility basics, and simple accounting habits for creators.
                    <div className="mt-2 text-xs text-muted">Format: workshop • 60–90 min</div>
                  </Card>
                  <Card title="Bitcoin themes in creative work">
                    Story prompts, research sources, and ways to integrate sovereignty and sound money without cringe.
                    <div className="mt-2 text-xs text-muted">Format: salon • 60–90 min</div>
                  </Card>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Resources (self-hosted)
                </div>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">
                  Start learning now.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  We’ll expand this library over time. These are hosted on our site (no third-party required).
                </p>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Link
                    href="/education/open"
                    className="rounded-xl border border-border bg-surface p-4 text-sm font-semibold transition-colors hover:opacity-90"
                  >
                    Open education materials (CC BY 4.0)
                    <div className="mt-1 text-xs font-normal text-muted">
                      Free, reusable learning resources for anyone.
                    </div>
                  </Link>
                  <a
                    href="/resources/btcpay-setup-guide.md"
                    className="rounded-xl border border-border bg-surface p-4 text-sm font-semibold transition-colors hover:opacity-90"
                  >
                    BTCPay setup guide
                    <div className="mt-1 text-xs font-normal text-muted">
                      Accept BTC without third parties.
                    </div>
                  </a>
                  <a
                    href="/resources/donor-receipt-template.md"
                    className="rounded-xl border border-border bg-surface p-4 text-sm font-semibold transition-colors hover:opacity-90"
                  >
                    Donor receipt template
                    <div className="mt-1 text-xs font-normal text-muted">
                      Simple record-keeping.
                    </div>
                  </a>
                  <a
                    href="/resources/sample-grant-agreement.md"
                    className="rounded-xl border border-border bg-surface p-4 text-sm font-semibold transition-colors hover:opacity-90"
                  >
                    Sample grant agreement
                    <div className="mt-1 text-xs font-normal text-muted">
                      Transparency-friendly structure.
                    </div>
                  </a>
                  <Link
                    href="/grants/guidelines"
                    className="rounded-xl border border-border bg-surface p-4 text-sm font-semibold transition-colors hover:opacity-90"
                  >
                    Grant guidelines
                    <div className="mt-1 text-xs font-normal text-muted">
                      Eligibility, rubric, and expectations.
                    </div>
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Webinars
                </div>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">
                  Bitcoin Webinars for Artists
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Practical, creator-focused presentations on Bitcoin adoption — from
                  introductory concepts to hands-on custody and payments. All webinar
                  materials are published under CC BY 4.0.
                </p>
                <div className="mt-4">
                  <Link
                    href="/education/webinar"
                    className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
                  >
                    View webinars
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Video (later)
                </div>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">
                  YouTube integration: when we’re ready.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  At some point we’ll embed YouTube tutorials for reach and discovery. For now we’re keeping this section
                  third-party free.
                </p>
              </div>
            </section>

            <aside className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Fall 2026 classes
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Four one-hour classes on sound money, starting Monday, November 9. Online, plus one session in
                  person in New York.
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <a
                    href="#class-signup"
                    className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
                  >
                    Reserve your seat
                  </a>
                  <a
                    href="/proposals/bfta-2027-education-proposal.html"
                    className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-background px-5 py-2 text-sm font-semibold transition-colors hover:opacity-90"
                  >
                    Read the 2027 education proposal
                  </a>
                </div>
                <div className="mt-4 text-xs text-muted">
                  Prefer email?{' '}
                  <a
                    href="mailto:education@bitcoinforthearts.org?subject=Education%20interest"
                    className="font-semibold underline underline-offset-4"
                  >
                    education@bitcoinforthearts.org
                  </a>
                  .
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Related
                </div>
                <div className="mt-3 flex flex-col gap-3">
                  <Link
                    href="/programming"
                    className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-surface px-5 py-2 text-sm font-semibold transition-colors hover:opacity-90"
                  >
                    Programming
                  </Link>
                  <Link
                    href="/events"
                    className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-surface px-5 py-2 text-sm font-semibold transition-colors hover:opacity-90"
                  >
                    Events
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

