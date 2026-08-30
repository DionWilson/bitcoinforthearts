'use client';

import { useMemo, useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type Props = {
  slug: string;
  lotCode: string;
  title: string;
  openingBidSats: number;
  incrementSats: number;
  /** Shorter copy when the page already shows opening/pickup context above */
  compact?: boolean;
};

function formatSats(amount: number): string {
  return `${amount.toLocaleString('en-US')} sats`;
}

function isEmail(value: string) {
  const v = value.trim();
  if (!v) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function parseBidSats(value: string): number | null {
  const cleaned = value.replace(/[,\s_]/g, '').replace(/sats?/i, '').trim();
  if (!cleaned) return null;
  const n = Number(cleaned);
  if (!Number.isFinite(n)) return null;
  return Math.floor(n);
}

function getErrorMessage(err: unknown) {
  if (err instanceof Error && err.message) return err.message;
  if (err && typeof err === 'object' && 'message' in err) {
    const msg = (err as { message?: unknown }).message;
    if (typeof msg === 'string' && msg.trim()) return msg.trim();
  }
  return 'Something went wrong. Please try again.';
}

export default function AdvanceBidForm({
  slug,
  lotCode,
  title,
  openingBidSats,
  incrementSats,
  compact = false,
}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bidSats, setBidSats] = useState(String(openingBidSats));
  const [willAttend, setWillAttend] = useState(false);
  const [notes, setNotes] = useState('');
  const [hp, setHp] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const canSubmit = useMemo(() => {
    if (status === 'submitting' || status === 'success') return false;
    const bid = parseBidSats(bidSats);
    return (
      name.trim().length > 0 &&
      isEmail(email) &&
      bid != null &&
      bid >= openingBidSats &&
      willAttend
    );
  }, [name, email, bidSats, openingBidSats, willAttend, status]);

  function resetIfNeeded() {
    if (status !== 'idle') setStatus('idle');
    setMessage('');
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const bid = parseBidSats(bidSats);

    if (!trimmedName) {
      setStatus('error');
      setMessage('Please enter your full name.');
      return;
    }
    if (!isEmail(trimmedEmail)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    if (bid == null || bid <= 0) {
      setStatus('error');
      setMessage('Please enter your bid in sats as a whole number.');
      return;
    }
    if (bid < openingBidSats) {
      setStatus('error');
      setMessage(`Bid must be at least ${formatSats(openingBidSats)}.`);
      return;
    }
    if ((bid - openingBidSats) % incrementSats !== 0) {
      setStatus('error');
      setMessage(
        `Bid must be the opening bid or increase in steps of ${formatSats(incrementSats)}.`,
      );
      return;
    }
    if (!willAttend) {
      setStatus('error');
      setMessage(
        'Confirm you will pick up in person at Bitcoin Arts Park in Columbus if you win.',
      );
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      const res = await fetch('/api/midwest-advance-bid', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          phone: phone.trim() || undefined,
          slug,
          bidSats: bid,
          willAttend: true,
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
          data && 'error' in data && typeof data.error === 'string' ? data.error : '';
        throw new Error(msg || `Request failed (HTTP ${res.status}).`);
      }

      setStatus('success');
      setMessage(
        `Advance bid recorded for ${lotCode}. Highest advance bid seeds the paper sheet on site. You must pick up in Columbus if you win.`,
      );
    } catch (err) {
      setStatus('error');
      setMessage(getErrorMessage(err));
    }
  }

  const inputClass =
    'min-h-11 w-full border border-black/20 bg-[#FFFAF0] px-3 py-2 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#FF4F14]/35';
  const labelClass = 'mb-1.5 block text-sm font-medium';

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <input
        tabIndex={-1}
        autoComplete="off"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        className="hidden"
        aria-hidden="true"
        name="website"
      />

      {compact ? (
        <p className="text-sm leading-relaxed text-black/75">
          High advance bid seeds the Expo floor sheet. Anyone on site can still
          outbid you.
        </p>
      ) : (
        <p className="text-sm leading-relaxed text-black/75">
          Place a binding advance bid on <strong>{title}</strong> ({lotCode}).
          Staff will write the high advance bid onto the Expo floor sheet before
          doors open. Anyone in the room can still outbid you. Winner must pick
          up in person at Bitcoin Arts Park (Greater Columbus Convention Center,
          Sept 23-24). No shipping.
        </p>
      )}

      <div>
        <label htmlFor={`bid-name-${slug}`} className={labelClass}>
          Full name <span className="text-[#FF4F14]">*</span>
        </label>
        <input
          id={`bid-name-${slug}`}
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            resetIfNeeded();
          }}
          placeholder="Your name as it should appear on the sheet"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`bid-email-${slug}`} className={labelClass}>
            Email <span className="text-[#FF4F14]">*</span>
          </label>
          <input
            id={`bid-email-${slug}`}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              resetIfNeeded();
            }}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`bid-phone-${slug}`} className={labelClass}>
            Phone <span className="font-normal text-black/50">(optional)</span>
          </label>
          <input
            id={`bid-phone-${slug}`}
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              resetIfNeeded();
            }}
            placeholder="+1 555 555 5555"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`bid-sats-${slug}`} className={labelClass}>
          Bid in sats <span className="text-[#FF4F14]">*</span>
        </label>
        <input
          id={`bid-sats-${slug}`}
          type="text"
          inputMode="numeric"
          value={bidSats}
          onChange={(e) => {
            setBidSats(e.target.value);
            resetIfNeeded();
          }}
          placeholder={String(openingBidSats)}
          className={inputClass}
        />
        <p className="mt-1.5 text-xs text-black/55">
          Opening {formatSats(openingBidSats)}. Increase in steps of{' '}
          {formatSats(incrementSats)}.
        </p>
      </div>

      <label className="flex cursor-pointer items-start gap-3 border border-black/15 bg-[#FFFAF0] px-3 py-3 text-sm">
        <input
          type="checkbox"
          checked={willAttend}
          onChange={(e) => {
            setWillAttend(e.target.checked);
            resetIfNeeded();
          }}
          className="mt-1 shrink-0 accent-[#FF4F14]"
        />
        <span className="leading-snug">
          I will be at Bitcoin Arts Park in Columbus to pick up this lot if I
          win. No shipping. <span className="text-[#FF4F14]">*</span>
        </span>
      </label>

      <div>
        <label htmlFor={`bid-notes-${slug}`} className={labelClass}>
          Notes <span className="font-normal text-black/50">(optional)</span>
        </label>
        <textarea
          id={`bid-notes-${slug}`}
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            resetIfNeeded();
          }}
          rows={3}
          placeholder="Pass confirmation, preferred contact, or anything staff should know."
          className="w-full resize-y border border-black/20 bg-[#FFFAF0] px-3 py-2 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#FF4F14]/35"
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className={[
          'inline-flex min-h-12 w-full items-center justify-center bg-[#FF4F14] px-6 py-3 text-[12px] font-medium uppercase tracking-[0.14em] text-[#FFFAF0] transition-opacity',
          !canSubmit ? 'cursor-not-allowed opacity-60' : 'hover:opacity-90',
        ].join(' ')}
      >
        {status === 'submitting'
          ? 'Submitting…'
          : status === 'success'
            ? 'Bid recorded'
            : 'Submit advance bid →'}
      </button>

      {message ? (
        <div
          className={[
            'border p-4 text-sm',
            status === 'error'
              ? 'border-red-300 bg-red-50 text-red-900'
              : 'border-black bg-black text-[#FFFAF0]',
          ].join(' ')}
        >
          {message}
        </div>
      ) : null}
    </form>
  );
}
