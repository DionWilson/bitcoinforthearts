import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import GrantApplicationForm from '@/components/GrantApplicationForm';

export const metadata: Metadata = {
  title: 'Apply for a Grant',
  description:
    'Apply for a Bitcoin-native micro-grant from Bitcoin For The Arts. No third-party forms.',
};

export default function GrantsApplyPage() {
  return (
    <main className="bg-background relative overflow-hidden min-h-screen">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/grants-background.jpg"
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
            <Link href="/grants" className="hover:underline">
              Grants
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">Apply</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
            <section className="lg:col-span-4 rounded-3xl border border-border bg-surface/80 p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Our mission
              </div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                Fund sovereign art with Bitcoin-native grants.
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Bitcoin For The Arts (BFTA) exists to fund artists with low time preference:
                censorship-resistant innovation, no gatekeepers, and radical transparency.
              </p>
              <div className="mt-4 rounded-2xl border border-border bg-background p-4 text-sm">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Reserve model
                </div>
                <ul className="mt-2 space-y-1 text-sm text-muted">
                  <li>
                    <span className="font-semibold text-foreground">55%</span> grants
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">30%</span> programs
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">10%</span> ops
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">5%</span> HODL vault
                  </li>
                </ul>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted">
                Note: applications are reviewed quarterly. Processing begins{' '}
                <span className="font-semibold text-foreground">Q3 2026</span>.
              </p>
            </section>

            <section className="lg:col-span-8">
              <GrantApplicationForm />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

