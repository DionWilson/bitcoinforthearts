'use client';

import { useState } from 'react';

type State =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success' }
  | { status: 'error'; message: string };

export default function EducationWorkshopInterestForm() {
  const [state, setState] = useState<State>({ status: 'idle' });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    // Honeypot
    if (String(payload.company ?? '').trim()) {
      setState({ status: 'success' });
      form.reset();
      return;
    }

    setState({ status: 'submitting' });
    try {
      const res = await fetch('/api/education/workshop-interest', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string; emailed?: boolean; emailTo?: string | null; emailSkipped?: boolean }
        | null;
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || `Submission failed (HTTP ${res.status}).`);
      }
      if (data && data.emailed === false) {
        setState({
          status: 'error',
          message:
            `You’re on the list, but our notification email didn’t send.` +
            (data.emailTo ? ` (Configured inbox: ${data.emailTo})` : '') +
            ' Please email education@bitcoinforthearts.org if time-sensitive.',
        });
      } else {
        setState({ status: 'success' });
      }
      form.reset();
    } catch (err) {
      const msg = err && typeof err === 'object' && 'message' in err ? String((err as any).message) : '';
      setState({ status: 'error', message: msg || 'Something went wrong. Please try again.' });
    }
  };

  if (state.status === 'success') {
    return (
      <div className="rounded-xl border border-border bg-background p-4 text-sm">
        <div className="font-semibold">You’re on the list.</div>
        <div className="mt-1 text-xs text-muted">
          We’ll email you when workshops open and share early resources.
        </div>
        <button
          type="button"
          onClick={() => setState({ status: 'idle' })}
          className="mt-3 inline-flex min-h-10 items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-xs font-semibold transition-colors hover:opacity-90"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="block">
        <div className="text-sm font-semibold">
          Name <span className="text-accent">*</span>
        </div>
        <input
          name="name"
          required
          className="mt-2 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          placeholder="Your name"
        />
      </label>

      <label className="block">
        <div className="text-sm font-semibold">
          Email <span className="text-accent">*</span>
        </div>
        <input
          name="email"
          type="email"
          required
          className="mt-2 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          placeholder="you@example.com"
        />
      </label>

      <label className="block">
        <div className="text-sm font-semibold">Discipline (optional)</div>
        <input
          name="discipline"
          className="mt-2 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          placeholder="Visual arts, music, film, theater…"
        />
      </label>

      <label className="block">
        <div className="text-sm font-semibold">What do you want to learn? (optional)</div>
        <textarea
          name="interests"
          rows={4}
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          placeholder="Wallet basics, receiving BTC, Lightning, pricing work in sats, Ordinals…"
        />
      </label>

      {state.status === 'error' ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {state.message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={state.status === 'submitting'}
        className={[
          'inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:opacity-90 border border-accent/60',
          state.status === 'submitting' ? 'opacity-70 cursor-wait' : '',
        ].join(' ')}
      >
        {state.status === 'submitting' ? 'Submitting…' : 'Join the workshop waitlist'}
      </button>
    </form>
  );
}

