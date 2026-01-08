'use client';

import { useMemo, useState } from 'react';

const STATUSES = [
  'submitted',
  'under_review',
  'needs_info',
  'awarded',
  'declined',
  'withdrawn',
] as const;

export type AdminRowData = {
  id: string;
  status: string;
  reportReceivedAt?: string | null;
  reportDueAt?: string | null;
  adminNotes?: string | null;
};

export default function AdminApplicationRow({
  data,
}: {
  data: AdminRowData;
}) {
  const [status, setStatus] = useState(data.status || 'submitted');
  const [notes, setNotes] = useState(data.adminNotes ?? '');
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reportReceived, setReportReceived] = useState(Boolean(data.reportReceivedAt));

  const dueLabel = useMemo(() => {
    if (!data.reportDueAt) return '';
    try {
      return new Date(data.reportDueAt).toLocaleDateString();
    } catch {
      return '';
    }
  }, [data.reportDueAt]);

  const receivedLabel = useMemo(() => {
    if (!data.reportReceivedAt) return '';
    try {
      return new Date(data.reportReceivedAt).toLocaleDateString();
    } catch {
      return '';
    }
  }, [data.reportReceivedAt]);

  const onSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/applications/${data.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: status,
          adminNotes: notes,
          reportReceived,
        }),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || `Failed to save (HTTP ${res.status}).`);
      }
      setSavedAt(new Date().toLocaleTimeString());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="min-h-10 rounded-md border border-border bg-background px-2 py-1 text-sm font-semibold text-foreground"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Report received
          <input
            type="checkbox"
            checked={reportReceived}
            onChange={(e) => setReportReceived(e.target.checked)}
            className="h-4 w-4"
          />
        </label>

        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className={[
            'inline-flex min-h-10 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors',
            saving ? 'opacity-70 cursor-wait' : 'hover:opacity-90',
          ].join(' ')}
        >
          {saving ? 'Saving…' : 'Save'}
        </button>

        {savedAt ? <span className="text-xs text-muted">Saved {savedAt}</span> : null}
      </div>

      {(dueLabel || receivedLabel) && (
        <div className="text-xs text-muted">
          {dueLabel ? (
            <span>
              <span className="font-semibold text-foreground">Due:</span> {dueLabel}
            </span>
          ) : null}
          {dueLabel && receivedLabel ? <span className="mx-2">•</span> : null}
          {receivedLabel ? (
            <span>
              <span className="font-semibold text-foreground">Received:</span> {receivedLabel}
            </span>
          ) : null}
        </div>
      )}

      <label className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">Notes</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          placeholder="Internal notes (not visible to applicants)"
        />
      </label>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-800">
          {error}
        </div>
      ) : null}
    </div>
  );
}

