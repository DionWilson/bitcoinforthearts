'use client';

import { useState } from 'react';
import {
  ALL_SESSIONS_OPTION,
  BACKGROUND_OPTIONS,
  FALL_2026_CLASSES,
  FORMAT_OPTIONS,
  type ClassSignupSource,
} from '@/lib/education-classes';

type State =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success' }
  | { status: 'error'; message: string };

function getErrorMessage(err: unknown) {
  if (err instanceof Error) return err.message;
  if (err && typeof err === 'object' && 'message' in err) {
    const maybe = (err as { message?: unknown }).message;
    if (typeof maybe === 'string') return maybe;
  }
  return '';
}

const inputClass =
  'mt-2 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm';

export default function EducationWorkshopInterestForm({
  source,
}: {
  source: ClassSignupSource;
}) {
  const [state, setState] = useState<State>({ status: 'idle' });
  const [sessions, setSessions] = useState<string[]>([ALL_SESSIONS_OPTION]);

  const toggleSession = (option: string) => {
    setSessions((prev) => {
      if (option === ALL_SESSIONS_OPTION) {
        return prev.includes(option) ? [] : [option];
      }
      const withoutAll = prev.filter((s) => s !== ALL_SESSIONS_OPTION);
      return withoutAll.includes(option)
        ? withoutAll.filter((s) => s !== option)
        : [...withoutAll, option];
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: Record<string, unknown> = Object.fromEntries(fd.entries());

    if (String(payload.company ?? '').trim()) {
      setState({ status: 'success' });
      form.reset();
      return;
    }

    if (sessions.length === 0) {
      setState({ status: 'error', message: 'Choose at least one class.' });
      return;
    }
    payload.sessions = sessions;

    setState({ status: 'submitting' });
    try {
      const res = await fetch('/api/education/workshop-interest', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || `Submission failed (HTTP ${res.status}).`);
      }
      setState({ status: 'success' });
      form.reset();
      setSessions([ALL_SESSIONS_OPTION]);
    } catch (err) {
      const msg = getErrorMessage(err);
      setState({
        status: 'error',
        message:
          (msg || 'Something went wrong.') +
          ' Please try again, or email education@bitcoinforthearts.org.',
      });
    }
  };

  if (state.status === 'success') {
    return (
      <div className="rounded-xl border border-border bg-background p-4 text-sm">
        <div className="font-semibold">You’re signed up.</div>
        <div className="mt-1 text-xs text-muted">
          We’ll email you the webinar link before each class. If you chose New York, we’ll
          send the address as soon as the room is set.
        </div>
        <button
          type="button"
          onClick={() => setState({ status: 'idle' })}
          className="mt-3 inline-flex min-h-10 items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-xs font-semibold transition-colors hover:opacity-90"
        >
          Sign up someone else
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="hidden" name="source" value={source} />
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <div className="text-sm font-semibold">
            Name <span className="text-accent">*</span>
          </div>
          <input name="name" required autoComplete="name" className={inputClass} placeholder="Your name" />
        </label>
        <label className="block">
          <div className="text-sm font-semibold">
            Email <span className="text-accent">*</span>
          </div>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="you@example.com"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <div className="text-sm font-semibold">
            How will you attend? <span className="text-accent">*</span>
          </div>
          <select name="format" required defaultValue={FORMAT_OPTIONS[0]} className={inputClass}>
            {FORMAT_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <div className="text-sm font-semibold">
            Which best describes you? <span className="text-accent">*</span>
          </div>
          <select name="background" required defaultValue={BACKGROUND_OPTIONS[0]} className={inputClass}>
            {BACKGROUND_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold">
          Which classes? <span className="text-accent">*</span>
        </legend>
        <div className="mt-2 space-y-2">
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              className="mt-1"
              checked={sessions.includes(ALL_SESSIONS_OPTION)}
              onChange={() => toggleSession(ALL_SESSIONS_OPTION)}
            />
            <span className="font-semibold">All four classes</span>
          </label>
          {FALL_2026_CLASSES.map((c) => (
            <label key={c.option} className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="mt-1"
                checked={sessions.includes(c.option)}
                onChange={() => toggleSession(c.option)}
              />
              <span>
                {c.number}. {c.title}{' '}
                <span className="text-muted">({c.date})</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <div className="text-sm font-semibold">Discipline or role (optional)</div>
        <input
          name="discipline"
          className={inputClass}
          placeholder="Painter, musician, collector, teacher, curious…"
        />
      </label>

      <label className="block">
        <div className="text-sm font-semibold">Questions or topics (optional)</div>
        <textarea
          name="interests"
          rows={3}
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          placeholder="Anything you want us to cover in class"
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
        {state.status === 'submitting' ? 'Submitting…' : 'Reserve my seat'}
      </button>
    </form>
  );
}
