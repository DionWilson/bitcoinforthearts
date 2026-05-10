export type ResearchTocSection = {
  id: string;
  label: string;
};

export default function ResearchToc({
  sections,
}: {
  sections: ResearchTocSection[];
}) {
  if (!sections.length) return null;

  return (
    <nav
      aria-label="Report sections"
      className="print-hidden rounded-2xl border border-border bg-surface p-5 text-sm"
    >
      <div className="text-xs font-semibold uppercase tracking-wide text-muted">
        In this report
      </div>
      <ol className="mt-4 space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="block rounded-md px-2 py-1.5 text-muted transition-colors hover:bg-background hover:text-foreground"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
