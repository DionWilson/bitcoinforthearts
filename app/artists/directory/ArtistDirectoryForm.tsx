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

export default function ArtistDirectoryForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [socialProfiles, setSocialProfiles] = useState('');
  const [contactSharingConsent, setContactSharingConsent] = useState(false);
  const [hp, setHp] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const canSubmit = useMemo(() => {
    if (status === 'submitting' || status === 'success') return false;
    return (
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      discipline.trim().length > 0 &&
      isEmail(email)
    );
  }, [firstName, lastName, discipline, email, status]);

  function resetIfNeeded() {
    if (status !== 'idle') setStatus('idle');
    setMessage('');
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedDiscipline = discipline.trim();
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
    if (!trimmedDiscipline) {
      setStatus('error');
      setMessage('Please tell us your art discipline.');
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      const res = await fetch('/api/artist-directory', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstName: trimmedFirst,
          lastName: trimmedLast,
          email: trimmedEmail,
          discipline: trimmedDiscipline,
          phone: phone.trim() || undefined,
          website: website.trim() || undefined,
          socialProfiles: socialProfiles.trim() || undefined,
          contactSharingConsent,
          website_hp: hp,
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
        'You\u2019re in. Welcome to the BFTA Artist Directory \u2014 we\u2019ll be in touch.',
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
        name="website_hp"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ad-first-name" className="block text-sm font-semibold mb-1.5">
            First Name <span className="text-red-600">*</span>
          </label>
          <input
            id="ad-first-name"
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
          <label htmlFor="ad-last-name" className="block text-sm font-semibold mb-1.5">
            Last Name <span className="text-red-600">*</span>
          </label>
          <input
            id="ad-last-name"
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
        <label htmlFor="ad-discipline" className="block text-sm font-semibold mb-1.5">
          Art Discipline <span className="text-red-600">*</span>
        </label>
        <input
          id="ad-discipline"
          type="text"
          value={discipline}
          onChange={(e) => {
            setDiscipline(e.target.value);
            resetIfNeeded();
          }}
          placeholder="e.g., Painter · Singer-songwriter · Maker · Filmmaker · Sculptor · Dancer · Designer"
          className="min-h-11 w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40"
        />
      </div>

      <div>
        <label htmlFor="ad-email" className="block text-sm font-semibold mb-1.5">
          Email Address <span className="text-red-600">*</span>
        </label>
        <input
          id="ad-email"
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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ad-phone" className="block text-sm font-semibold mb-1.5">
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="ad-phone"
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
        <div>
          <label htmlFor="ad-website" className="block text-sm font-semibold mb-1.5">
            Website <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="ad-website"
            type="text"
            autoComplete="url"
            value={website}
            onChange={(e) => {
              setWebsite(e.target.value);
              resetIfNeeded();
            }}
            placeholder="yoursite.com  ·  www.yoursite.com  ·  https://yoursite.com"
            className="min-h-11 w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
      </div>

      <div>
        <label htmlFor="ad-social" className="block text-sm font-semibold mb-1.5">
          Social Profiles <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id="ad-social"
          value={socialProfiles}
          onChange={(e) => {
            setSocialProfiles(e.target.value);
            resetIfNeeded();
          }}
          placeholder="Nostr npub, X handle, Instagram, YouTube, Wavlake, Fountain, Beacons, etc."
          rows={3}
          className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 resize-y"
        />
      </div>

      <label className="flex items-start gap-2 text-sm leading-relaxed">
        <input
          type="checkbox"
          checked={contactSharingConsent}
          onChange={(e) => {
            setContactSharingConsent(e.target.checked);
            resetIfNeeded();
          }}
          className="mt-1 shrink-0 accent-accent"
        />
        <span>
          I consent to BFTA sharing my contact information with other verified
          directory members who request a specific introduction. Each request is
          reviewed by BFTA before any introduction is made.
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
          ? 'Joining the directory\u2026'
          : status === 'success'
            ? 'You\u2019re in!'
            : 'Join the Artist Directory'}
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
