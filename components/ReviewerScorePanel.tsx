'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { maskEmail, normalizeEmail } from '@/lib/emails';

type ReviewScores = {
  overall: number;
  impact: number;
  feasibility: number;
  bitcoinAlignment: number;
  transparency: number;
};

function clampScore(v: number) {
  if (!Number.isFinite(v)) return 1;
  return Math.min(5, Math.max(1, Math.round(v)));
}

function getErrorMessage(err: unknown) {
  if (err instanceof Error) return err.message;
  return '';
}

export default function ReviewerScorePanel({
  token,
  authorizedEmails = [],
}: {
  token: string;
  /** Exact emails this review link was issued for (empty = any email OK). */
  authorizedEmails?: string[];
}) {
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get('email')?.trim() ?? '';

  const [reviewerName, setReviewerName] = useState('');
  const [reviewerEmail, setReviewerEmail] = useState(emailFromQuery);
  const [notes, setNotes] = useState('');
  const [scores, setScores] = useState<ReviewScores>({
    overall: 3,
    impact: 3,
    feasibility: 3,
    bitcoinAlignment: 3,
    transparency: 3,
  });
  const [state, setState] = useState<
    | { status: 'idle' }
    | { status: 'saving' }
    | { status: 'saved'; updated: boolean }
    | { status: 'error'; message: string }
  >({ status: 'idle' });

  const authorizedNormalized = useMemo(
    () => authorizedEmails.map((e) => normalizeEmail(e)).filter(Boolean),
    [authorizedEmails],
  );
  const emailRestricted = authorizedNormalized.length > 0;
  const maskedAuthorized = useMemo(
    () => authorizedNormalized.map((e) => maskEmail(e)),
    [authorizedNormalized],
  );

  useEffect(() => {
    if (emailFromQuery && !reviewerEmail) setReviewerEmail(emailFromQuery);
    // Only seed from the URL once on mount / query change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailFromQuery]);

  useEffect(() => {
    const email = reviewerEmail.trim();
    if (!email || !email.includes('@')) return;
    const t = window.setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/review/${encodeURIComponent(token)}/score?email=${encodeURIComponent(email)}`,
        );
        const data = (await res.json().catch(() => null)) as
          | {
              ok: true;
              review: {
                reviewer?: string;
                scores?: Partial<ReviewScores> | null;
                notes?: string;
              } | null;
            }
          | null;
        if (!res.ok || !data?.ok || !data.review) return;
        if (data.review.reviewer) setReviewerName(data.review.reviewer);
        if (data.review.notes) setNotes(data.review.notes);
        if (data.review.scores) {
          setScores((s) => ({
            overall: clampScore(Number(data.review?.scores?.overall ?? s.overall)),
            impact: clampScore(Number(data.review?.scores?.impact ?? s.impact)),
            feasibility: clampScore(Number(data.review?.scores?.feasibility ?? s.feasibility)),
            bitcoinAlignment: clampScore(
              Number(data.review?.scores?.bitcoinAlignment ?? s.bitcoinAlignment),
            ),
            transparency: clampScore(Number(data.review?.scores?.transparency ?? s.transparency)),
          }));
        }
      } catch {
        // ignore preload failures
      }
    }, 400);
    return () => window.clearTimeout(t);
  }, [reviewerEmail, token]);

  const save = async () => {
    setState({ status: 'saving' });
    try {
      const typed = normalizeEmail(reviewerEmail);
      if (emailRestricted && typed && !authorizedNormalized.includes(typed)) {
        throw new Error(
          `This review link only accepts these emails: ${maskedAuthorized.join(', ')}. Use the exact address the link was issued for (check spelling), or ask BFTA to resend the link to your email.`,
        );
      }

      const res = await fetch(`/api/review/${encodeURIComponent(token)}/score`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          reviewerName: reviewerName.trim(),
          reviewerEmail: reviewerEmail.trim(),
          notes: notes.trim(),
          scores: {
            overall: clampScore(scores.overall),
            impact: clampScore(scores.impact),
            feasibility: clampScore(scores.feasibility),
            bitcoinAlignment: clampScore(scores.bitcoinAlignment),
            transparency: clampScore(scores.transparency),
          },
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | {
            ok: true;
            updated?: boolean;
          }
        | {
            ok: false;
            error?: string;
            authorizedEmailsMasked?: string[];
          }
        | null;
      if (!res.ok || !data || data.ok !== true) {
        const allowed =
          data && 'authorizedEmailsMasked' in data && Array.isArray(data.authorizedEmailsMasked)
            ? data.authorizedEmailsMasked
            : maskedAuthorized;
        const base =
          (data && 'error' in data && data.error) || `Save failed (HTTP ${res.status}).`;
        if (res.status === 403 && allowed.length) {
          throw new Error(
            `${base} Allowed emails for this link: ${allowed.join(', ')}.`,
          );
        }
        throw new Error(base);
      }
      setState({ status: 'saved', updated: Boolean(data.updated) });
    } catch (err) {
      setState({ status: 'error', message: getErrorMessage(err) || 'Save failed.' });
    }
  };

  return (
    <section className="rounded-2xl border border-accent/40 bg-background p-6 shadow-sm">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold tracking-tight">Your review score</h2>
        <p className="text-sm text-muted">
          Score this application (1–5), add optional notes, then save. You can update later with the
          same email.
        </p>
      </div>

      {emailRestricted ? (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          <div className="font-semibold">Use your invited email</div>
          <p className="mt-1">
            This link only saves scores for these addresses:{' '}
            <span className="font-semibold">{maskedAuthorized.join(', ')}</span>.
            Type the exact email the invitation used (same spelling). If yours is missing, ask Dion
            to recreate the link with your address included.
          </p>
          {authorizedNormalized.length <= 8 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {authorizedEmails.map((email) => (
                <button
                  key={email}
                  type="button"
                  onClick={() => setReviewerEmail(email)}
                  className="rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-semibold text-amber-950 hover:bg-amber-100"
                >
                  Use {maskEmail(email)}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-border bg-surface p-3 text-sm text-muted">
          Enter the email you use for BFTA board work. Your score is private to BFTA admin.
        </div>
      )}

      <details className="mt-4 rounded-xl border border-border bg-surface p-4">
        <summary className="cursor-pointer text-sm font-semibold">Scoring guidance</summary>
        <div className="mt-3 text-sm text-muted">
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <span className="font-semibold text-foreground">Impact</span>: audience reach, cultural
              value, community benefit, clarity of outcomes.
            </li>
            <li>
              <span className="font-semibold text-foreground">Feasibility</span>: realistic timeline,
              credible budget, capable team.
            </li>
            <li>
              <span className="font-semibold text-foreground">Bitcoin alignment</span>: Bitcoin-native
              execution and values fit (payment rails, not inscriptions/NFTs).
            </li>
            <li>
              <span className="font-semibold text-foreground">Transparency</span>: willingness to
              report and document outcomes.
            </li>
            <li>
              <span className="font-semibold text-foreground">Overall</span>: holistic judgement.
            </li>
          </ul>
          <div className="mt-3 text-xs text-muted">
            Scale: 1 = not competitive, 3 = competitive, 5 = exceptional.
          </div>
        </div>
      </details>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <div className="text-sm font-semibold">Your name</div>
          <input
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            className="mt-2 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            placeholder="Full name"
            autoComplete="name"
          />
        </label>
        <label className="block">
          <div className="text-sm font-semibold">Your email</div>
          <input
            type="email"
            value={reviewerEmail}
            onChange={(e) => setReviewerEmail(e.target.value)}
            className="mt-2 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            placeholder="email@example.com"
            autoComplete="email"
          />
        </label>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {(
          [
            ['overall', 'Overall'],
            ['impact', 'Impact'],
            ['feasibility', 'Feasibility'],
            ['bitcoinAlignment', 'Bitcoin'],
            ['transparency', 'Transparency'],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="block">
            <div className="text-sm font-semibold">{label}</div>
            <select
              value={scores[key]}
              onChange={(e) =>
                setScores((s) => ({
                  ...s,
                  [key]: clampScore(Number(e.target.value)),
                }))
              }
              className="mt-2 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              aria-label={`${label} score 1 to 5`}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <label className="mt-3 block">
        <div className="text-sm font-semibold">Notes (optional)</div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          placeholder="Strengths, concerns, questions for the board."
        />
      </label>

      {state.status === 'error' ? (
        <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {state.message}
        </div>
      ) : null}

      {state.status === 'saved' ? (
        <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-900">
          {state.updated ? 'Your review was updated.' : 'Your review was saved.'} Thank you.
        </div>
      ) : null}

      <div className="mt-3">
        <button
          type="button"
          onClick={save}
          disabled={state.status === 'saving'}
          className={[
            'inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2 text-sm font-semibold text-accent-fg transition-colors',
            state.status === 'saving' ? 'cursor-wait opacity-70' : 'hover:opacity-90',
          ].join(' ')}
        >
          {state.status === 'saving' ? 'Saving…' : 'Save my score'}
        </button>
      </div>
    </section>
  );
}
