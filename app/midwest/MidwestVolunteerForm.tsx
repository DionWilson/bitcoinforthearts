'use client';

import { useMemo, useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const AVAILABILITY_OPTIONS = [
  { id: 'install', label: 'Tuesday Sept 22 — install / setup' },
  { id: 'day1', label: 'Wednesday Sept 23 — show day 1' },
  { id: 'day2', label: 'Thursday Sept 24 — show day 2' },
  { id: 'strike', label: 'Friday Sept 25 — strike / teardown' },
  { id: 'remote', label: 'Pre-event remote help (any time)' },
] as const;

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

export default function MidwestVolunteerForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [availability, setAvailability] = useState<string[]>([]);
  const [skills, setSkills] = useState('');
  const [hp, setHp] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const canSubmit = useMemo(() => {
    if (status === 'submitting' || status === 'success') return false;
    return (
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      isEmail(email)
    );
  }, [firstName, lastName, email, status]);

  function resetIfNeeded() {
    if (status !== 'idle') setStatus('idle');
    setMessage('');
  }

  function toggleAvailability(label: string) {
    resetIfNeeded();
    setAvailability((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label],
    );
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
      const res = await fetch('/api/midwest-volunteer', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstName: trimmedFirst,
          lastName: trimmedLast,
          email: trimmedEmail,
          phone: phone.trim() || undefined,
          availability,
          skills: skills.trim() || undefined,
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
        'Thank you for volunteering! We\u2019ll be in touch as the September event gets closer.',
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
          <label htmlFor="vol-first-name" className="block text-sm font-semibold mb-1.5">
            First Name <span className="text-red-600">*</span>
          </label>
          <input
            id="vol-first-name"
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
          <label htmlFor="vol-last-name" className="block text-sm font-semibold mb-1.5">
            Last Name <span className="text-red-600">*</span>
          </label>
          <input
            id="vol-last-name"
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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="vol-email" className="block text-sm font-semibold mb-1.5">
            Email Address <span className="text-red-600">*</span>
          </label>
          <input
            id="vol-email"
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
          <label htmlFor="vol-phone" className="block text-sm font-semibold mb-1.5">
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="vol-phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              resetIfNeeded();
            }}
            placeholder="+1 555 555 5555"
            className="min-h-11 w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
      </div>

      <div>
        <div className="block text-sm font-semibold mb-2">
          Availability <span className="font-normal text-muted">(check any that apply)</span>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {AVAILABILITY_OPTIONS.map((opt) => {
            const checked = availability.includes(opt.label);
            return (
              <label
                key={opt.id}
                className={`flex items-start gap-2 rounded-md border px-3 py-2 text-sm cursor-pointer transition-colors ${
                  checked
                    ? 'border-accent bg-accent/5'
                    : 'border-border bg-white hover:bg-surface'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleAvailability(opt.label)}
                  className="mt-0.5 shrink-0 accent-accent"
                />
                <span className="leading-snug text-foreground">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="vol-skills" className="block text-sm font-semibold mb-1.5">
          Skills, interests, or anything we should know{' '}
          <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id="vol-skills"
          value={skills}
          onChange={(e) => {
            setSkills(e.target.value);
            resetIfNeeded();
          }}
          placeholder="A/V, photography, runner, hospitality, social media, artist liaison, Lightning onboarding, etc."
          rows={3}
          className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 resize-y"
        />
      </div>

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
          ? 'Submitting\u2026'
          : status === 'success'
            ? 'Signed up!'
            : 'Volunteer for Midwest'}
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
    </form>
  );
}
