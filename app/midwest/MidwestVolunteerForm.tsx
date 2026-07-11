'use client';

import { useMemo, useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const AVAILABILITY_OPTIONS = [
  { id: 'install', label: 'Tuesday Sept 22, 2026 (load-in and setup)' },
  { id: 'day1', label: 'Wednesday Sept 23, 2026 (show day 1)' },
  { id: 'day2', label: 'Thursday Sept 24, 2026 (show day 2, load-out same evening)' },
  { id: 'remote', label: 'Pre-event remote help (any time before Sept 22)' },
] as const;

const ROLE_OPTIONS = [
  { id: 'booth', label: 'Booth Support' },
  { id: 'stage', label: 'Stage and Audio Support' },
  { id: 'video', label: 'Videography and Documentation' },
  { id: 'wherever', label: 'Wherever Needed' },
] as const;

const SHIFT_OPTIONS = [
  { id: '2h', label: '2 hours' },
  { id: '4h', label: '4 hours' },
  { id: 'half', label: 'Half day' },
  { id: 'full', label: 'Full day' },
] as const;

const TRANSPORT_OPTIONS = [
  { id: 'own', label: 'I have my own transportation' },
  { id: 'local', label: 'I am local to Columbus' },
  { id: 'ride', label: 'I need a short ride within 15 miles of the venue' },
] as const;

const TSHIRT_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', '2XL'] as const;

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
  const [signalId, setSignalId] = useState('');
  const [isAdult, setIsAdult] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [shiftLength, setShiftLength] = useState('');
  const [transportation, setTransportation] = useState('');
  const [tshirtSize, setTshirtSize] = useState('');
  const [skills, setSkills] = useState('');
  const [hp, setHp] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const canSubmit = useMemo(() => {
    if (status === 'submitting' || status === 'success') return false;
    return (
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      isEmail(email) &&
      isAdult &&
      roles.length > 0 &&
      availability.length > 0
    );
  }, [firstName, lastName, email, isAdult, roles, availability, status]);

  function resetIfNeeded() {
    if (status !== 'idle') setStatus('idle');
    setMessage('');
  }

  function toggle(list: string[], label: string, setter: (v: string[]) => void) {
    resetIfNeeded();
    setter(list.includes(label) ? list.filter((s) => s !== label) : [...list, label]);
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
    if (!isAdult) {
      setStatus('error');
      setMessage('Volunteers must be 18 or older.');
      return;
    }
    if (roles.length === 0) {
      setStatus('error');
      setMessage('Please choose at least one role you are interested in.');
      return;
    }
    if (availability.length === 0) {
      setStatus('error');
      setMessage('Please choose at least one day you can help.');
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
          signalId: signalId.trim() || undefined,
          isAdult,
          roles,
          availability,
          shiftLength: shiftLength || undefined,
          transportation: transportation || undefined,
          tshirtSize: tshirtSize || undefined,
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
          data && 'error' in data && typeof data.error === 'string' ? data.error : '';
        throw new Error(msg || `Request failed (HTTP ${res.status}).`);
      }

      setStatus('success');
      setMessage(
        'Thank you for volunteering. We will be in touch as the September event gets closer.',
      );
    } catch (err) {
      setStatus('error');
      setMessage(getErrorMessage(err));
    }
  }

  const inputClass =
    'min-h-11 w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40';
  const labelClass = 'block text-sm font-semibold mb-1.5';
  const optionalClass = 'font-normal text-muted';

  return (
    <form onSubmit={onSubmit} className="space-y-6">
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
          <label htmlFor="vol-first-name" className={labelClass}>
            First name <span className="text-red-600">*</span>
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
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="vol-last-name" className={labelClass}>
            Last name <span className="text-red-600">*</span>
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
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="vol-email" className={labelClass}>
            Email <span className="text-red-600">*</span>
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
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="vol-phone" className={labelClass}>
            Phone <span className={optionalClass}>(optional)</span>
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
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="vol-signal" className={labelClass}>
          Signal ID <span className={optionalClass}>(optional, for day-of coordination)</span>
        </label>
        <input
          id="vol-signal"
          type="text"
          value={signalId}
          onChange={(e) => {
            setSignalId(e.target.value);
            resetIfNeeded();
          }}
          placeholder="@you.42"
          className={inputClass}
        />
      </div>

      <div>
        <label className="flex items-start gap-3 rounded-md border border-border bg-white px-3 py-3 text-sm cursor-pointer transition-colors hover:bg-surface">
          <input
            type="checkbox"
            checked={isAdult}
            onChange={(e) => {
              setIsAdult(e.target.checked);
              resetIfNeeded();
            }}
            className="mt-1 shrink-0 accent-accent"
          />
          <span className="leading-snug text-foreground">
            I confirm I am 18 or older. <span className="text-red-600">*</span>
          </span>
        </label>
      </div>

      <div>
        <div className="block text-sm font-semibold mb-2">
          Roles you are interested in <span className="text-red-600">*</span>{' '}
          <span className={optionalClass}>(check any that apply)</span>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {ROLE_OPTIONS.map((opt) => {
            const checked = roles.includes(opt.label);
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
                  onChange={() => toggle(roles, opt.label, setRoles)}
                  className="mt-0.5 shrink-0 accent-accent"
                />
                <span className="leading-snug text-foreground">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <div className="block text-sm font-semibold mb-2">
          Days you can help <span className="text-red-600">*</span>{' '}
          <span className={optionalClass}>(check any that apply)</span>
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
                  onChange={() => toggle(availability, opt.label, setAvailability)}
                  className="mt-0.5 shrink-0 accent-accent"
                />
                <span className="leading-snug text-foreground">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="vol-shift" className={labelClass}>
            Preferred shift length <span className={optionalClass}>(optional)</span>
          </label>
          <select
            id="vol-shift"
            value={shiftLength}
            onChange={(e) => {
              setShiftLength(e.target.value);
              resetIfNeeded();
            }}
            className={inputClass}
          >
            <option value="">Select...</option>
            {SHIFT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.label}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="vol-tshirt" className={labelClass}>
            T-shirt size <span className={optionalClass}>(for gear)</span>
          </label>
          <select
            id="vol-tshirt"
            value={tshirtSize}
            onChange={(e) => {
              setTshirtSize(e.target.value);
              resetIfNeeded();
            }}
            className={inputClass}
          >
            <option value="">Select...</option>
            {TSHIRT_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <div className="block text-sm font-semibold mb-2">
          Getting to the venue <span className={optionalClass}>(pick one)</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {TRANSPORT_OPTIONS.map((opt) => {
            const checked = transportation === opt.label;
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
                  type="radio"
                  name="transportation"
                  checked={checked}
                  onChange={() => {
                    setTransportation(opt.label);
                    resetIfNeeded();
                  }}
                  className="mt-0.5 shrink-0 accent-accent"
                />
                <span className="leading-snug text-foreground">{opt.label}</span>
              </label>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-muted">
          BFTA can cover a rideshare or short train trip within roughly a 15-mile radius of the venue. Beyond that we cannot cover travel or lodging.
        </p>
      </div>

      <div>
        <label htmlFor="vol-skills" className={labelClass}>
          Anything else we should know{' '}
          <span className={optionalClass}>(optional)</span>
        </label>
        <textarea
          id="vol-skills"
          value={skills}
          onChange={(e) => {
            setSkills(e.target.value);
            resetIfNeeded();
          }}
          placeholder="Relevant experience, accessibility needs, dietary preferences for meals, or a specific reason a role fits you."
          rows={4}
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
          ? 'Submitting...'
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
