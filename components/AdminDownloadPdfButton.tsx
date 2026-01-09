'use client';

import { useState } from 'react';

function getFilenameFromDisposition(disposition: string | null) {
  if (!disposition) return null;
  // content-disposition: attachment; filename="foo.pdf"
  const m = disposition.match(/filename\*?=(?:UTF-8''|")?([^\";]+)"?/i);
  if (!m) return null;
  try {
    return decodeURIComponent(m[1]);
  } catch {
    return m[1];
  }
}

export default function AdminDownloadPdfButton({
  applicationId,
  className = '',
}: {
  applicationId: string;
  className?: string;
}) {
  const [state, setState] = useState<
    | { status: 'idle' }
    | { status: 'downloading' }
    | { status: 'error'; message: string }
  >({ status: 'idle' });

  const download = async () => {
    setState({ status: 'downloading' });
    try {
      const url = `/api/admin/applications/${encodeURIComponent(applicationId)}/pdf`;
      const res = await fetch(url, { method: 'GET', credentials: 'same-origin' });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `Download failed (HTTP ${res.status}).`);
      }

      const blob = await res.blob();
      const filename =
        getFilenameFromDisposition(res.headers.get('content-disposition')) ??
        `bfta-grant-application-${applicationId}.pdf`;

      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(objectUrl);
      setState({ status: 'idle' });
    } catch (err) {
      const msg =
        err && typeof err === 'object' && 'message' in err ? String((err as any).message) : '';
      setState({
        status: 'error',
        message:
          msg ||
          'Download failed. If you are logged into /admin on a different domain (www vs non-www), try using the same host.',
      });
    }
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={download}
        disabled={state.status === 'downloading'}
        className={[
          'inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-background px-5 py-2 text-sm font-semibold transition-colors hover:bg-surface',
          state.status === 'downloading' ? 'opacity-70 cursor-wait' : '',
        ].join(' ')}
      >
        {state.status === 'downloading' ? 'Downloading…' : 'Download PDF (admin)'}
      </button>
      {state.status === 'error' ? (
        <div className="mt-2 text-xs text-red-700">
          {state.message}
        </div>
      ) : null}
    </div>
  );
}

