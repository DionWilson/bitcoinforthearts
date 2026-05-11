import Link from 'next/link';
import type { ReactNode } from 'react';
import type { ResearchSource } from '@/lib/research';
import { SourcesBlock } from './Citations';
import ResearchToc, { type ResearchTocSection } from './ResearchToc';

type Props = {
  title: string;
  dek: string;
  kicker: string;
  status?: string;
  lastReviewed?: string;
  pdfHref?: string;
  sections: ResearchTocSection[];
  sources?: ResearchSource[];
  children: ReactNode;
};

export default function ResearchReportShell({
  title,
  dek,
  kicker,
  status = 'In production',
  lastReviewed,
  pdfHref,
  sections,
  sources = [],
  children,
}: Props) {
  return (
    <main className="research-report-page bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
          <Link href="/research" className="hover:underline">
            Research
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">{kicker}</span>
        </div>

        <section className="mt-8 border-b border-border pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            {kicker}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
            {dek}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide text-muted">
            <span>By Bitcoin for the Arts Research</span>
            <span aria-hidden="true">/</span>
            <span>{status}</span>
            {lastReviewed ? (
              <>
                <span aria-hidden="true">/</span>
                <span>Last reviewed {lastReviewed}</span>
              </>
            ) : null}
          </div>
          {pdfHref ? (
            <div className="print-hidden mt-8">
              <a
                href={pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
              >
                Download PDF
              </a>
            </div>
          ) : null}
        </section>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <article className="prose-article lg:col-span-8">{children}</article>
          <aside className="lg:sticky lg:top-28 lg:col-span-4">
            <ResearchToc sections={sections} />
          </aside>
        </div>

        <div className="max-w-4xl">
          <SourcesBlock sources={sources} />
        </div>
      </div>
    </main>
  );
}
