'use client';

import { useState } from 'react';

export default function ShareForReview({ applicationId }: { applicationId: string }) {
  const [emails, setEmails] = useState('');
  const [message, setMessage] = useState('');
  const [expiresDays, setExpiresDays] = useState(14);
  const [status, setStatus] = useState<
    | { state: 'idle' }
    | { state: 'sending' }
    | { state: 'sent'; url: string; expiresAt: string }
    | { state: 'error'; message: string }
  >({ state: 'idle' });

  const onSend = async () => {
    setStatus({ state: 'sending' });
    try {
      const res = await fetch(`/api/admin/applications/${applicationId}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails, message, expiresDays }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: true; reviewUrl: string; expiresAt: string }
        | { ok: false; error?: string }
        | null;
      if (!res.ok || !data || !('ok' in data) || data.ok !== true) {
        throw new Error((data && 'error' in data && data.error) || `Failed (HTTP ${res.status}).`);
      }
      setStatus({ state: 'sent', url: data.reviewUrl, expiresAt: data.expiresAt });
    } catch (e) {
      setStatus({ state: 'error', message: e instanceof Error ? e.message : 'Failed to send.' });
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted">
        Share for review
      </div>
      <p className="mt-2 text-sm text-muted">
        Send reviewers a read-only link (no admin login required). Links expire automatically.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Reviewer emails</span>
          <input
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            placeholder="name@example.com, other@example.com"
            className="min-h-12 rounded-md border border-border bg-background px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Message (optional)</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="rounded-md border border-border bg-background px-3 py-2"
          />
        </label>

        <label className="flex items-center gap-3 text-sm">
          <span className="font-semibold">Expires in (days)</span>
          <input
            type="number"
            min={1}
            max={30}
            value={expiresDays}
            onChange={(e) => setExpiresDays(Number(e.target.value))}
            className="w-24 min-h-10 rounded-md border border-border bg-background px-2 py-1"
          />
        </label>

        <button
          type="button"
          onClick={onSend}
          disabled={status.state === 'sending'}
          className={[
            'inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors border border-accent/60',
            status.state === 'sending' ? 'opacity-70 cursor-wait' : 'hover:opacity-90',
          ].join(' ')}
        >
          {status.state === 'sending' ? 'Sending…' : 'Email reviewers'}
        </button>

        {status.state === 'sent' ? (
          <div className="rounded-xl border border-border bg-surface p-4 text-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">
              Review link created
            </div>
            <a
              className="mt-2 block font-semibold underline underline-offset-4 break-all"
              href={status.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {status.url}
            </a>
            <div className="mt-2 text-xs text-muted">Expires: {status.expiresAt}</div>
          </div>
        ) : null}

        {status.state === 'error' ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {status.message}
          </div>
        ) : null}
      </div>
    </div>
  );
}

