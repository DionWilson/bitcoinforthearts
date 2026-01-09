import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Grants FAQ',
  description:
    'Frequently asked questions about Bitcoin For The Arts Bitcoin Micro-Grants.',
};

const faqs = [
  {
    q: 'What is Bitcoin For The Arts?',
    a: 'Bitcoin For The Arts is a nonprofit dedicated to supporting artists through grants paid in Bitcoin. We believe in empowering creators with sound money that appreciates over time, providing financial sovereignty and long-term value.',
  },
  {
    q: 'Who can apply for a grant?',
    a: 'Applicants are open worldwide (individuals, collectives, and organizations). The key requirement is that the project activities funded by the grant must be performed in the United States. We fund a wide range of disciplines, including visual arts, performing arts, music, writing/storytelling, film/media, and interdisciplinary projects.',
  },
  {
    q: 'How much funding can I request?',
    a: 'Grant sizes vary based on program capacity and reserves. Grants are disbursed in BTC to the wallet address you provide. We prioritize clear budgets, realistic timelines, and strong Bitcoin alignment.',
  },
  {
    q: 'What types of projects do you fund?',
    a: 'We support creative projects in visual arts, performing arts (dance, theater), music, literature/writing, film/media, crafts/traditional arts, and multidisciplinary/other innovative arts. Projects should focus on artistic creation and impact.',
  },
  {
    q: 'How do I apply?',
    a: 'Submit our online application form. Applications are simple—no lengthy proposals required. If you have questions, email grants@bitcoinforthearts.org.',
  },
  {
    q: 'When are applications reviewed?',
    a: 'We review applications quarterly. We are collecting applications now, but processing begins in Q3 2026.',
  },
  {
    q: 'What if I’m selected?',
    a: 'If selected, grants are paid in BTC to your provided wallet address. You’ll also commit to post-grant reporting (6 months + project end) to support radical transparency.',
  },
  {
    q: 'Do I need to report on how I use the grant?',
    a: 'Yes. Awardees commit to post-grant reporting for radical transparency. This includes a simple report at 6 months and at project completion, and maintaining records for audit/verification upon request.',
  },
  {
    q: 'Why pay grants in Bitcoin?',
    a: 'Bitcoin is sound money that can’t be inflated or censored. It appreciates over time (historically outperforming traditional currencies), giving artists long-term financial security. Plus, it’s borderless and low-fee for global inspiration.',
  },
  {
    q: 'I’m new to Bitcoin—how do I get started?',
    a: 'Download a non-custodial wallet like Wallet of Satoshi, Zeus Wallet, BlueWallet, or Phoenix. Consider a “Bitcoin-only” hardware wallet like Coldcard, Foundation Passport, Blockstream Jade, Bitkey, or Trezor. Create a BTC address and share it in your application. For tutorials, visit bitcoin.org.',
  },
  {
    q: 'Can I apply more than once?',
    a: 'Yes, but only one active application per quarter. If not selected, feel free to reapply with updates.',
  },
  {
    q: 'How is the program funded?',
    a: 'Through donations in Bitcoin. Our treasury is transparent.',
  },
] as const;

export default function GrantsFaqPage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <Link href="/grants" className="hover:underline">
              Grants
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">FAQ</span>
          </div>

          <div className="mt-6 rounded-3xl border border-border bg-surface/80 p-8 shadow-sm">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Grants FAQ
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
              Below are frequently asked questions about our Bitcoin Micro-Grants
              program. If your question isn’t answered here, contact{' '}
              <a
                href="mailto:grants@bitcoinforthearts.org"
                className="font-semibold underline underline-offset-4"
              >
                grants@bitcoinforthearts.org
              </a>
              .
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <section className="lg:col-span-8 rounded-2xl border border-border bg-background p-6">
              <div className="space-y-3">
                {faqs.map((f) => (
                  <details
                    key={f.q}
                    className="rounded-2xl border border-accent/30 bg-surface/70 p-4"
                  >
                    <summary className="cursor-pointer list-none">
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-sm font-semibold tracking-tight">
                          {f.q}
                        </div>
                        <div className="shrink-0 rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold">
                          Open
                        </div>
                      </div>
                    </summary>
                    <div className="mt-4 text-sm leading-relaxed text-muted">
                      {f.q === 'How is the program funded?' ? (
                        <>
                          {f.a}{' '}
                          <a
                            href="https://github.com/Bitcoin-For-The-Arts/bitcoinforthearts-treasury"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold underline underline-offset-4"
                          >
                            View it here
                          </a>
                          .
                        </>
                      ) : (
                        f.a
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            <aside className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Apply
                </div>
                <Link
                  href="/grants/apply"
                  className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 border border-accent/60"
                >
                  Apply online
                </Link>
                <div className="mt-4 text-xs leading-relaxed text-muted">
                  Questions? Email{' '}
                  <a
                    href="mailto:grants@bitcoinforthearts.org"
                    className="font-semibold underline underline-offset-4"
                  >
                    grants@bitcoinforthearts.org
                  </a>
                  .
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Guidelines
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Want the full eligibility details, do’s & don’ts, and evaluation rubric?
                </p>
                <Link
                  href="/grants/guidelines"
                  className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:opacity-90"
                >
                  Read grant guidelines
                </Link>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Terms
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  For more details, review our grant terms and agreement.
                </p>
                <a
                  href="/resources/grants/grant-terms.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:opacity-90"
                >
                  View terms & agreement
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

