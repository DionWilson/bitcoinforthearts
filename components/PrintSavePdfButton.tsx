'use client';

export default function PrintSavePdfButton({
  className = '',
  label = 'Print / Save as PDF',
}: {
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={[
        'inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-background px-5 py-2 text-sm font-semibold transition-colors hover:bg-surface',
        className,
      ].join(' ')}
    >
      {label}
    </button>
  );
}

