'use client';

import { useId, useState } from 'react';

export default function InfoTip({ text }: { text: string }) {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        aria-label="More info"
        aria-describedby={open ? id : undefined}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-xs font-bold text-muted hover:bg-surface"
      >
        i
      </button>
      {open ? (
        <span
          id={id}
          role="tooltip"
          className="absolute right-0 top-8 z-50 w-72 max-w-[80vw] rounded-xl border border-border bg-background p-3 text-xs leading-relaxed text-muted shadow-lg"
        >
          {text}
        </span>
      ) : null}
    </span>
  );
}

