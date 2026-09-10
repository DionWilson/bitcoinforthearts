'use client';

import { useState } from 'react';

const BOARD_EMAIL_HINT =
  'Add every board reviewer email in one list so a single link works for everyone.';

export default function ShareForReview({ applicationId }: { applicationId: string }) {
  const [emails, setEmails] = useState('');
  const [message, setMessage] = useState('');
  const [expiresDays, setExpiresDays] = useState(14);
  const [restrictToEmails, setRestrictToEmails] = useState(true);
  const [status, setStatus] = useState<
    | { state: 'idle' }
    | { state: 'sending' }
    | {
        state: 'sent';
        url: string;
        expiresAt: string;
        emailSent: boolean;
        emailError?: string;
        sentTo: string[];
        restrictToEmails: boolean;
      }
    | { state: 'error'; message: string }
  >({ state: 'idle' });
  const [copied, setCopied] = useState(false);

  const onSend = async () => {
    setStatus({ state: 'sending' });
    setCopied(false);
    try {
      const res = await fetch(`/api/admin/applications/${applicationId}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails, message, expiresDays, restrictToEmails }),
      });
      const data = (await res.json().catch(() => null)) as
        | {
            ok: true;
            reviewUrl: string;
            expiresAt: string;
            emailSent?: boolean;
            emailError?: string;
            sentTo?: string[];
            restrictToEmails?: boolean;
          }
        | { ok: false; error?: string }
        | null;
      if (!res.ok || !data || !('ok' in data) || data.ok !== true) {
        throw new Error((data && 'error' in data && data.error) || `Failed (HTTP ${res.status}).`);
      }
      setStatus({
        state: 'sent',
        url: data.reviewUrl,
        expiresAt: data.expiresAt,
        emailSent: Boolean(data.emailSent),
        emailError: data.emailError,
        sentTo: data.sentTo ?? [],
        restrictToEmails: data.restrictToEmails !== false,
      });
    } catch (e) {
      setStatus({ state: 'error', message: e instanceof Error ? e.message : 'Failed to send.' });
    }
  };

  const copyLink = async () => {
    if (status.state !== 'sent') return;
    try {
      await navigator.clipboard.writeText(status.url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const copyBoardEmail = async () => {
    if (status.state !== 'sent') return;
    const lines = [
      'BFTA grant application — board review',
      '',
      'Please open this link, enter your name and the email this note was addressed to,',
      'score each criterion (1–5), and click Save my score.',
      '',
      status.url,
      '',
      status.restrictToEmails && status.sentTo.length
        ? `Authorized emails for this link: ${status.sentTo.join(', ')}`
        : 'Any board member with this link can score (enter your usual board email).',
      '',
      `Link expires: ${status.expiresAt}`,
    ];
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted">
        Share for board review
      </div>
      <p className="mt-2 text-sm text-muted">
        Create one review link for the whole board (no admin login). Put{' '}
        <span className="font-semibold text-foreground">every reviewer email</span> in the box
        below, then email or paste the same link to everyone. If you only list some emails, the
        others will get an error when they try to save a score.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Reviewer emails</span>
          <textarea
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            rows={3}
            placeholder="buttercup@…, avi@…, name@example.com"
            className="min-h-20 rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <span className="text-xs text-muted">{BOARD_EMAIL_HINT}</span>
        </label>

        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={restrictToEmails}
            onChange={(e) => setRestrictToEmails(e.target.checked)}
            className="mt-1"
          />
          <span>
            <span className="font-semibold">Only these emails can save a score</span>
            <span className="mt-1 block text-xs text-muted">
              Leave on for normal board review. Turn off only if you want an open link anyone with
              the URL can score (still requires name + email).
            </span>
          </span>
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
          {status.state === 'sending' ? 'Creating…' : 'Create review link'}
        </button>

        {status.state === 'sent' ? (
          <div className="rounded-xl border border-border bg-surface p-4 text-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">
              Review link ready
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
            {status.restrictToEmails && status.sentTo.length ? (
              <div className="mt-2 text-xs text-muted">
                Authorized emails: {status.sentTo.join(', ')}
              </div>
            ) : (
              <div className="mt-2 text-xs text-muted">Open link (any email can score).</div>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex min-h-10 items-center rounded-md border border-border bg-background px-3 text-xs font-semibold hover:bg-surface"
              >
                Copy link
              </button>
              <button
                type="button"
                onClick={copyBoardEmail}
                className="inline-flex min-h-10 items-center rounded-md border border-border bg-background px-3 text-xs font-semibold hover:bg-surface"
              >
                Copy board email text
              </button>
              {copied ? (
                <span className="flex min-h-10 items-center text-xs font-semibold text-muted">
                  Copied.
                </span>
              ) : null}
            </div>

            {status.emailSent ? (
              <div className="mt-2 text-xs text-muted">Email sent to reviewers.</div>
            ) : (
              <div className="mt-2 rounded-md border border-amber-200 bg-amber-50 p-2 text-xs text-amber-900">
                Automated email did not send (or was skipped). Use Copy board email text and paste
                into your own message to the board.
                {status.emailError ? <div className="mt-1">{status.emailError}</div> : null}
              </div>
            )}
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
