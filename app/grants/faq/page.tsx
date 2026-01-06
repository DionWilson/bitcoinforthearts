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
    a: 'Individual artists or small artist collectives who are legal US residents. We fund a wide range of disciplines, including visual arts, performing arts, music, literature, film/media, crafts, and multidisciplinary projects. Large organizations, commercial ventures, political activities, or non-artistic projects are not eligible.',
  },
  {
    q: 'How much funding can I request?',
    a: 'Grants range from $500 to $5,000 USD equivalent in Bitcoin (BTC). The amount is disbursed based on your project’s needs and our review.',
  },
  {
    q: 'What types of projects do you fund?',
    a: 'We support creative projects in visual arts, performing arts (dance, theater), music, literature/writing, film/media, crafts/traditional arts, and multidisciplinary/other innovative arts. Projects should focus on artistic creation and impact.',
  },
  {
    q: 'How do I apply?',
    a: 'Submit our online application form (preferred) or download the printable PDF form and email it to grants@bitcoinforthearts.org along with your personal details, Bitcoin wallet address (required), links to your work, project description, and budget breakdown. Applications are simple—no lengthy proposals required.',
  },
  {
    q: 'When are applications reviewed?',
    a: 'We review applications quarterly. Submit anytime; we’ll notify selected applicants via email after each review cycle.',
  },
  {
    q: 'What if I’m selected?',
    a: 'We’ll send the grant directly to your provided Bitcoin wallet address at the current market rate. No further action needed from you—enjoy creating!',
  },
  {
    q: 'Do I need to report on how I use the grant?',
    a: 'For current micro-grants ($500–$5,000), no reporting is required. However, if we introduce larger grants in the future, basic reporting on project outcomes may be needed—we’ll update applicants accordingly.',
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

const APPLY_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLScErzhYqHskUF90oZegSW-Zlw82_P-khCpxzlgPFL_n6Y6FKw/viewform?usp=header';

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
                <a
                  href={APPLY_FORM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 border border-accent/60"
                >
                  Apply via Google Form
                </a>
                <a
                  href="/resources/grants/grant-application.pdf"
                  className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
                >
                  Download PDF application
                </a>
                <div className="mt-4 text-xs leading-relaxed text-muted">
                  Prefer email? Send your completed PDF to{' '}
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

