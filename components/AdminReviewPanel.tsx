'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type ReviewScores = {
  overall: number;
  impact: number;
  feasibility: number;
  bitcoinAlignment: number;
  transparency: number;
};

export type AdminReview = {
  reviewer?: string | null;
  createdAt?: string | null; // ISO
  scores?: Partial<ReviewScores> | null;
  notes?: string | null;
};

function clampScore(v: number) {
  if (!Number.isFinite(v)) return 1;
  return Math.min(5, Math.max(1, Math.round(v)));
}

function avg(nums: number[]) {
  if (!nums.length) return null;
  const total = nums.reduce((a, b) => a + b, 0);
  return Math.round((total / nums.length) * 10) / 10;
}

export default function AdminReviewPanel({
  applicationId,
  reviews,
}: {
  applicationId: string;
  reviews: AdminReview[];
}) {
  const router = useRouter();
  const [reviewer, setReviewer] = useState('Admin');
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
    | { status: 'saved' }
    | { status: 'error'; message: string }
  >({ status: 'idle' });

  const summary = useMemo(() => {
    const all = reviews
      .map((r) => r.scores)
      .filter(Boolean)
      .map((s) => ({
        overall: typeof s?.overall === 'number' ? s.overall : null,
        impact: typeof s?.impact === 'number' ? s.impact : null,
        feasibility: typeof s?.feasibility === 'number' ? s.feasibility : null,
        bitcoinAlignment: typeof s?.bitcoinAlignment === 'number' ? s.bitcoinAlignment : null,
        transparency: typeof s?.transparency === 'number' ? s.transparency : null,
      }));

    const pull = (k: keyof ReviewScores) =>
      all.map((s) => s[k]).filter((v): v is number => typeof v === 'number');

    return {
      count: reviews.length,
      avgOverall: avg(pull('overall')),
      avgImpact: avg(pull('impact')),
      avgFeasibility: avg(pull('feasibility')),
      avgBitcoinAlignment: avg(pull('bitcoinAlignment')),
      avgTransparency: avg(pull('transparency')),
    };
  }, [reviews]);

  const save = async () => {
    setState({ status: 'saving' });
    try {
      const payload = {
        addReview: {
          reviewer: reviewer.trim() ? reviewer.trim() : 'Admin',
          notes: notes.trim(),
          scores: {
            overall: clampScore(scores.overall),
            impact: clampScore(scores.impact),
            feasibility: clampScore(scores.feasibility),
            bitcoinAlignment: clampScore(scores.bitcoinAlignment),
            transparency: clampScore(scores.transparency),
          },
        },
      };

      const res = await fetch(`/api/admin/applications/${applicationId}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `Save failed (HTTP ${res.status}).`);
      }

      setState({ status: 'saved' });
      setNotes('');
      router.refresh();
    } catch (err) {
      const msg = err && typeof err === 'object' && 'message' in err ? String((err as any).message) : '';
      setState({ status: 'error', message: msg || 'Save failed.' });
    }
  };

  return (
    <section className="rounded-2xl border border-border bg-background p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold tracking-tight">Internal review</h2>
        <p className="text-sm text-muted">
          Add a score + notes. This is stored in MongoDB and visible only in admin.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-4 text-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Summary
          </div>
          <div className="mt-2 text-sm text-muted">
            Reviews: <span className="font-semibold text-foreground">{summary.count}</span>
          </div>
          <div className="mt-2 grid grid-cols-1 gap-1 text-sm text-muted">
            <div>
              Avg overall:{' '}
              <span className="font-semibold text-foreground">
                {summary.avgOverall ?? '—'}
              </span>
            </div>
            <div>
              Avg impact:{' '}
              <span className="font-semibold text-foreground">
                {summary.avgImpact ?? '—'}
              </span>
            </div>
            <div>
              Avg feasibility:{' '}
              <span className="font-semibold text-foreground">
                {summary.avgFeasibility ?? '—'}
              </span>
            </div>
            <div>
              Avg Bitcoin alignment:{' '}
              <span className="font-semibold text-foreground">
                {summary.avgBitcoinAlignment ?? '—'}
              </span>
            </div>
            <div>
              Avg transparency:{' '}
              <span className="font-semibold text-foreground">
                {summary.avgTransparency ?? '—'}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Add review
          </div>

          <label className="mt-3 block">
            <div className="text-sm font-semibold">Reviewer</div>
            <input
              value={reviewer}
              onChange={(e) => setReviewer(e.target.value)}
              className="mt-2 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              placeholder="Reviewer name"
            />
          </label>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {(
              [
                ['overall', 'Overall'],
                ['impact', 'Impact'],
                ['feasibility', 'Feasibility'],
                ['bitcoinAlignment', 'Bitcoin alignment'],
                ['transparency', 'Transparency'],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="block">
                <div className="text-sm font-semibold">{label} (1–5)</div>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={scores[key]}
                  onChange={(e) =>
                    setScores((s) => ({
                      ...s,
                      [key]: clampScore(Number(e.target.value)),
                    }))
                  }
                  className="mt-2 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                />
              </label>
            ))}
          </div>

          <label className="mt-3 block">
            <div className="text-sm font-semibold">Notes</div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              placeholder="Key strengths, concerns, follow-ups, conflicts, etc."
            />
          </label>

          {state.status === 'error' ? (
            <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {state.message}
            </div>
          ) : null}

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={save}
              disabled={state.status === 'saving'}
              className={[
                'inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors',
                state.status === 'saving' ? 'opacity-70 cursor-wait' : 'hover:opacity-90',
              ].join(' ')}
            >
              {state.status === 'saving' ? 'Saving…' : 'Save review'}
            </button>
            {state.status === 'saved' ? (
              <div className="flex min-h-11 items-center text-sm font-semibold text-muted">
                Saved.
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {reviews.length ? (
        <div className="mt-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Previous reviews
          </div>
          <div className="mt-3 space-y-3">
            {reviews.map((r, idx) => (
              <div key={`${idx}`} className="rounded-xl border border-border bg-surface p-4">
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                  <div className="font-semibold">
                    {r.reviewer?.trim() ? r.reviewer : 'Reviewer'}
                  </div>
                  <div className="text-xs text-muted">
                    {r.createdAt ? new Date(r.createdAt).toLocaleString() : ''}
                  </div>
                </div>
                {r.scores ? (
                  <div className="mt-2 text-xs text-muted">
                    overall {r.scores.overall ?? '—'} • impact {r.scores.impact ?? '—'} • feasibility{' '}
                    {r.scores.feasibility ?? '—'} • bitcoin {r.scores.bitcoinAlignment ?? '—'} • transparency{' '}
                    {r.scores.transparency ?? '—'}
                  </div>
                ) : null}
                {r.notes?.trim() ? (
                  <pre className="mt-3 whitespace-pre-wrap rounded-md border border-border bg-background p-3 text-sm text-foreground/90">
                    {r.notes}
                  </pre>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

