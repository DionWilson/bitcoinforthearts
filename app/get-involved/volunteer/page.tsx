import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import VolunteerSignupForm from '@/components/VolunteerSignupForm';

export const metadata: Metadata = {
  title: 'Volunteer',
  description:
    'Join the BFTA volunteer community: flexible roles, high impact, and Bitcoin-native arts support.',
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
      <div className="text-xs font-semibold uppercase tracking-wide text-muted">
        {title}
      </div>
      <div className="mt-3 text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}

export default function VolunteerPage() {
  return (
    <main className="bg-background relative overflow-hidden min-h-screen">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/support artist.JPG"
          alt=""
          fill
          priority={false}
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-background/65" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <Link href="/get-involved" className="hover:underline">
              Get involved
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">Volunteer</span>
          </div>

          <div className="mt-6 rounded-3xl border border-border bg-surface/80 p-8 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">
              Volunteer
            </div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Join the BFTA Volunteer Community.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
              Help fund sovereign artists with Bitcoin-native support—without gatekeepers.
              Roles are flexible (often 1–5 hrs/month), remote-friendly, and aligned with
              radical transparency and low time preference.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card title="Why volunteer?">
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <span className="font-semibold text-foreground">Direct impact:</span> support grants,
                    workshops, residencies, and productions.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Build skills:</span> learn Bitcoin-native
                    tools and connect with the ecosystem.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Flexible:</span> contribute on your schedule,
                    with clear tasks and expectations.
                  </li>
                </ul>
              </Card>

              <Card title="Volunteer spotlight (example)">
                <p className="italic">
                  “I helped review applications and discovered a musician building a Bitcoin
                  soundscape project. Seeing artists get funded without red tape is the best part.”
                </p>
                <div className="mt-3 text-xs text-muted">— Volunteer, community member</div>
              </Card>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <section className="lg:col-span-7 rounded-2xl border border-border bg-background p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                How you can help
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                We’re building a sustainable, Bitcoin-native arts ecosystem. Volunteers help us
                stay lean, fair, and transparent.
              </p>

              <div className="mt-5 space-y-3">
                <details className="rounded-2xl border border-border bg-surface p-4">
                  <summary className="cursor-pointer text-sm font-semibold">
                    Individuals
                  </summary>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
                    <li>Grant review support (training provided)</li>
                    <li>Workshop facilitation (wallet basics, self-custody)</li>
                    <li>Artist scouting / outreach</li>
                    <li>Promotion on X / Nostr / community channels</li>
                  </ul>
                </details>

                <details className="rounded-2xl border border-border bg-surface p-4">
                  <summary className="cursor-pointer text-sm font-semibold">
                    Nonprofits & arts organizations
                  </summary>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
                    <li>Co-host events and workshops</li>
                    <li>Share grant calls with your network</li>
                    <li>Collaborate on productions/residencies</li>
                  </ul>
                </details>

                <details className="rounded-2xl border border-border bg-surface p-4">
                  <summary className="cursor-pointer text-sm font-semibold">
                    Corporations
                  </summary>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
                    <li>Pro bono support (tech, design, marketing, legal)</li>
                    <li>Match employee donations</li>
                    <li>Sponsor a program or grant series</li>
                  </ul>
                </details>
              </div>
            </section>

            <aside className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Ready to volunteer?
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Fill this out and we’ll follow up. No resume required.
                </p>
                <div className="mt-4">
                  <VolunteerSignupForm />
                </div>
                <div className="mt-4 text-xs text-muted">
                  Prefer email?{' '}
                  <a
                    href="mailto:volunteers@bitcoinforthearts.org?subject=Volunteer%20interest"
                    className="font-semibold underline underline-offset-4"
                  >
                    volunteers@bitcoinforthearts.org
                  </a>
                  .
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Other ways to help
                </div>
                <div className="mt-3 flex flex-col gap-3">
                  <Link
                    href="/donate"
                    className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:opacity-90"
                  >
                    Donate
                  </Link>
                  <Link
                    href="/get-involved/diy-fundraising-guide"
                    className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-surface px-5 py-2 text-sm font-semibold transition-colors hover:opacity-90"
                  >
                    DIY fundraising guide
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

