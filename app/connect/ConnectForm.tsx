'use client';

import { useMemo, useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

function isEmail(value: string) {
  const v = value.trim();
  if (!v) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function getErrorMessage(err: unknown) {
  if (err instanceof Error && err.message) return err.message;
  if (err && typeof err === 'object' && 'message' in err) {
    const msg = (err as { message?: unknown }).message;
    if (typeof msg === 'string' && msg.trim()) return msg.trim();
  }
  return 'Something went wrong. Please try again.';
}

export default function ConnectForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [hp, setHp] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const canSubmit = useMemo(() => {
    if (status === 'submitting' || status === 'success') return false;
    return firstName.trim().length > 0 && lastName.trim().length > 0 && isEmail(email) && agreed;
  }, [firstName, lastName, email, agreed, status]);

  function resetIfNeeded() {
    if (status !== 'idle') setStatus('idle');
    setMessage('');
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedFirst || !trimmedLast) {
      setStatus('error');
      setMessage('Please enter both your first and last name.');
      return;
    }
    if (!isEmail(trimmedEmail)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      const res = await fetch('/api/connect', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: `${trimmedFirst} ${trimmedLast}`,
          email: trimmedEmail,
          notes: notes.trim() || undefined,
          website: hp,
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error?: string }
        | null;

      if (!res.ok || !data || !('ok' in data) || data.ok !== true) {
        const msg =
          data && 'error' in data && typeof data.error === 'string'
            ? data.error
            : '';
        throw new Error(msg || `Request failed (HTTP ${res.status}).`);
      }

      setStatus('success');
      setMessage(
        'Thank you for signing up! We\u2019ll keep you posted on grants, events, and artist stories.',
      );
    } catch (err) {
      setStatus('error');
      setMessage(getErrorMessage(err));
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Honeypot */}
      <input
        tabIndex={-1}
        autoComplete="off"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        className="hidden"
        aria-hidden="true"
        name="website"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="connect-first-name"
            className="block text-sm font-semibold mb-1.5"
          >
            First Name <span className="text-red-600">*</span>
          </label>
          <input
            id="connect-first-name"
            type="text"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              resetIfNeeded();
            }}
            placeholder="First name"
            className="min-h-11 w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
        <div>
          <label
            htmlFor="connect-last-name"
            className="block text-sm font-semibold mb-1.5"
          >
            Last Name <span className="text-red-600">*</span>
          </label>
          <input
            id="connect-last-name"
            type="text"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              resetIfNeeded();
            }}
            placeholder="Last name"
            className="min-h-11 w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="connect-email"
          className="block text-sm font-semibold mb-1.5"
        >
          Email Address <span className="text-red-600">*</span>
        </label>
        <input
          id="connect-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            resetIfNeeded();
          }}
          placeholder="you@example.com"
          className="min-h-11 w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40"
        />
      </div>

      <div>
        <label
          htmlFor="connect-notes"
          className="block text-sm font-semibold mb-1.5"
        >
          Notes{' '}
          <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id="connect-notes"
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            resetIfNeeded();
          }}
          placeholder="Anything you'd like us to know — your art discipline, how you heard about us, etc."
          rows={3}
          className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 resize-y"
        />
      </div>

      <label className="flex items-start gap-2 text-xs leading-relaxed">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 shrink-0 accent-accent"
        />
        <span>
          I agree to receive email updates from Bitcoin for the Arts and
          acknowledge the{' '}
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2"
          >
            Privacy Policy
          </a>{' '}
          and{' '}
          <a
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2"
          >
            Terms of Use
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className={[
          'inline-flex min-h-12 w-full items-center justify-center rounded-md px-6 py-3 text-sm font-semibold transition-colors',
          'bg-accent text-accent-fg hover:opacity-90',
          !canSubmit ? 'opacity-60 cursor-not-allowed' : '',
        ].join(' ')}
      >
        {status === 'submitting'
          ? 'Signing up\u2026'
          : status === 'success'
            ? 'Signed up!'
            : 'Sign Up'}
      </button>

      {message ? (
        <div
          className={[
            'rounded-xl border p-4 text-sm',
            status === 'error'
              ? 'border-red-200 bg-red-50 text-red-800'
              : 'border-accent/20 bg-accent/5 text-foreground',
          ].join(' ')}
        >
          {message}
        </div>
      ) : null}

      <p className="text-xs text-muted">You can unsubscribe anytime.</p>
    </form>
  );
}
