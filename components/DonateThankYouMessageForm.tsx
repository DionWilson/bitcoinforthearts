'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

type Props = {
  orderId?: string;
};

export default function DonateThankYouMessageForm({ orderId }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/donate/thank-you-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          company,
          orderId: orderId || undefined,
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setStatus('error');
        setErrorMessage(
          data?.error || `Request failed (HTTP ${res.status}). Please try again.`,
        );
        return;
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/10 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          Message sent
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight">
          Thank you for writing.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Your note is on its way to our team. We read every message.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-foreground">Name</span>
          <span className="text-muted"> (optional)</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none ring-accent/40 focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-foreground">Email</span>
          <span className="text-muted"> (optional)</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none ring-accent/40 focus:ring-2"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="font-medium text-foreground">Message</span>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          maxLength={5000}
          placeholder="A note for the Bitcoin for the Arts team…"
          className="mt-1.5 w-full resize-y rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none ring-accent/40 focus:ring-2"
        />
      </label>

      {/* Honeypot */}
      <input
        type="text"
        name="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {status === 'error' ? (
        <p className="text-sm text-red-700" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-fg transition-all hover:brightness-110 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
      <p className="text-xs leading-relaxed text-muted">
        Messages go to hello@bitcoinforthearts.org. Include your email if you want a reply.
      </p>
    </form>
  );
}
