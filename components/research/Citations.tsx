import type { ResearchSource } from '@/lib/research';

export function Cite({ n }: { n: number }) {
  return (
    <sup className="ml-0.5 text-[0.68em] font-semibold text-accent">
      <a href={`#source-${n}`} aria-label={`Source ${n}`} className="hover:underline">
        {n}
      </a>
    </sup>
  );
}

export function SourcesBlock({ sources }: { sources: ResearchSource[] }) {
  if (!sources.length) return null;

  return (
    <section
      aria-labelledby="research-sources"
      className="mt-16 border-t border-border pt-8"
    >
      <h2 id="research-sources" className="text-2xl font-semibold tracking-tight">
        Sources
      </h2>
      <ol className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
        {sources.map((source, index) => (
          <li key={source.id} id={`source-${index + 1}`} className="scroll-mt-24">
            <span className="mr-2 font-semibold text-foreground">
              {index + 1}.
            </span>
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-4"
            >
              {source.label}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
