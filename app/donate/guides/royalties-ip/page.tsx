import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Royalties, IP, or Other Assets',
  description:
    'Donate royalties, intellectual property (IP), or other assets to support sovereign art through Bitcoin For The Arts.',
};

export default function RoyaltiesIpGuidePage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <Link href="/donate" className="hover:underline">
              Donate
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">Royalties / IP</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Giving Through Royalties, IP, or Other Assets
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                If you&apos;re an artist, inventor, or creator seeking to leave a lasting
                impact on sovereign art, donating royalties, intellectual property
                (IP), or other unique assets is a creative option. This guide
                explains how it works, the benefits, and easy steps to get started.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                As the first 501(c)(3) nonprofit paying artists exclusively in
                Bitcoin, we can convert your gift&apos;s value or income to BTC (per our
                volatility policy), helping fund creators through grants, workshops,
                and our HODL Vault endowment. Your intellectual legacy supports
                uncensorable creativity for generations.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:donate@bitcoinforthearts.org?subject=Royalties%2FIP%20or%20asset%20gift"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                >
                  Discuss an asset gift (email us)
                </a>
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:opacity-90"
                >
                  Back to Donate
                </Link>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="relative aspect-[4/5] w-full lg:aspect-[16/10]">
                  <Image
                    src="/paintbrush kids.jpg"
                    alt="Kids holding paintbrushes and smiling, representing creativity and future generations."
                    fill
                    className="object-cover object-center"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Creative giving
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    A royalty stream or asset gift can turn your work into ongoing
                    patronage for sovereign creators.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Ongoing support
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Royalties can provide recurring funding for grants and programs.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Flexible
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Donate partial rights (e.g., 50% royalties) or transfer full IP.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                We handle it
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                We coordinate sale/conversion where appropriate and provide
                documentation.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Bitcoin endowment
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Income/proceeds can be converted to BTC per policy for long-term
                impact.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <section className="lg:col-span-7 rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                What is a royalty/IP/asset gift?
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>
                  <span className="font-semibold text-foreground">Royalties / IP:</span>{' '}
                  Transfer rights to patents, copyrights, trademarks, or royalty
                  streams (books, music, inventions). We may receive future income or
                  sell the IP depending on structure.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Other assets:</span>{' '}
                  Donate tangible items like art collections, vehicles, real estate,
                  or in-kind goods. We coordinate liquidation to support the mission.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Bitcoin tie-in:</span>{' '}
                  Income or proceeds can be converted to Bitcoin for low time
                  preference growth, funding artists for the long run.
                </li>
              </ul>
            </section>

            <section className="lg:col-span-5 rounded-2xl border border-border bg-background p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                Benefits for donors
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li>
                  <span className="font-semibold text-foreground">Tax savings:</span>{' '}
                  Deduction rules vary for IP and assets; additional deductions may
                  apply for qualified IP income (consult your advisor).
                </li>
                <li>
                  <span className="font-semibold text-foreground">Legacy impact:</span>{' '}
                  Royalties can fund ongoing grants; converted to BTC, gifts can
                  support censorship-resistant art for years.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Flexibility:</span>{' '}
                  Donate partial rights or a full transfer depending on your goals.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Simplicity:</span>{' '}
                  We coordinate sale/conversion and issue acknowledgments.
                </li>
              </ul>
            </section>
          </div>

          <section className="mt-12 rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-xl font-semibold tracking-tight">How it works</h2>
            <ol className="mt-4 space-y-3 text-sm leading-relaxed text-muted list-decimal pl-5">
              <li>
                <span className="font-semibold text-foreground">Contact us:</span>{' '}
                Email{' '}
                <a
                  href="mailto:donate@bitcoinforthearts.org?subject=Royalties%2FIP%20or%20asset%20gift"
                  className="font-semibold underline underline-offset-4"
                >
                  donate@bitcoinforthearts.org
                </a>{' '}
                and we’ll discuss the asset and next steps.
              </li>
              <li>
                <span className="font-semibold text-foreground">Appraise &amp; transfer:</span>{' '}
                A qualified appraisal may be required for certain gifts (e.g., $5,000+
                threshold). Sign assignment/deed for IP/royalties; transfer title for
                other assets.
              </li>
              <li>
                <span className="font-semibold text-foreground">Income reporting:</span>{' '}
                For qualified IP with income, we can report net earnings so donors may
                claim additional deductions (consult your advisor).
              </li>
              <li>
                <span className="font-semibold text-foreground">Conversion:</span>{' '}
                Proceeds/income can be converted to BTC per policy for grants and the
                HODL Vault.
              </li>
              <li>
                <span className="font-semibold text-foreground">Confirmation:</span>{' '}
                We send an IRS-compliant acknowledgment based on the gift type.
              </li>
            </ol>
          </section>

          <section className="mt-12 rounded-2xl border border-border bg-background p-6">
            <h2 className="text-xl font-semibold tracking-tight">Tips for success</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              <li>
                <span className="font-semibold text-foreground">Best assets:</span> Patents
                and royalties can support ongoing funding; collections can create
                immediate impact.
              </li>
              <li>
                <span className="font-semibold text-foreground">Tax advice:</span> Consult
                your advisor — rules vary and appraisals may be required.
              </li>
              <li>
                <span className="font-semibold text-foreground">Bitcoin conversion:</span>{' '}
                You can specify “Convert to BTC for endowment” to align with sound money.
              </li>
              <li>
                <span className="font-semibold text-foreground">State rules:</span> Generally
                available nationwide; estate tools can help with IP bequests too.
              </li>
            </ul>
          </section>

          <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <h2 className="text-xl font-semibold tracking-tight">
                  Ready to immortalize your creativity?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Contact us today — your IP could ignite the next renaissance in
                  Bitcoin-backed art.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <a
                  href="mailto:donate@bitcoinforthearts.org?subject=Royalties%2FIP%20or%20asset%20gift"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                >
                  Email donate@
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
            >
              Back to Donate
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

