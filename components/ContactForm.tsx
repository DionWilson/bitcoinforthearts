'use client';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    // Honeypot (hidden)
    company: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  );
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let data: { ok?: boolean; error?: string } | null = null;
      try {
        data = (await res.json()) as { ok?: boolean; error?: string };
      } catch {
        data = null;
      }

      if (!res.ok || !data?.ok) {
        setStatus('error');
        const fallback = `Request failed (HTTP ${res.status}). Please try again.`;
        setErrorMessage(data?.error || fallback);
        return;
      }

      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        company: '',
      });
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Honeypot field (bots tend to fill it). Hidden from humans. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label
          htmlFor="firstName"
          className="block text-sm text-muted mb-2 uppercase tracking-wide"
        >
          First name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className="w-full border-b border-border bg-transparent pb-2 focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label
          htmlFor="lastName"
          className="block text-sm text-muted mb-2 uppercase tracking-wide"
        >
          Last name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className="w-full border-b border-border bg-transparent pb-2 focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm text-muted mb-2 uppercase tracking-wide"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={status === 'submitting'}
          className="w-full border-b border-border bg-transparent pb-2 focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm text-muted mb-2 uppercase tracking-wide"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          required
          disabled={status === 'submitting'}
          className="w-full rounded-md border border-border bg-transparent p-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {status === 'success' ? (
        <div className="rounded-md border border-border bg-surface p-4 text-sm">
          Thanks — your message was sent.
        </div>
      ) : null}

      {status === 'error' ? (
        <div className="rounded-md border border-border bg-surface p-4 text-sm text-foreground">
          {errorMessage}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 border border-accent/60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}

