import { getMongoDb } from '@/lib/mongodb';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

type ApplicationDoc = {
  _id: unknown;
  createdAt?: Date;
  status?: string;
  applicant?: {
    legalName?: string;
    email?: string;
  };
  project?: {
    title?: string;
  };
  funding?: {
    requestedAmount?: number;
  };
  uploads?: Array<{
    fileId: unknown;
    fieldName: string;
    filename: string;
  }>;
};

function fmtDate(d?: Date) {
  if (!d) return '';
  try {
    return new Date(d).toLocaleString();
  } catch {
    return '';
  }
}

export default async function AdminApplicationsPage() {
  const db = await getMongoDb();
  const docs = (await db
    .collection<ApplicationDoc>('applications')
    .find({})
    .sort({ createdAt: -1 })
    .limit(200)
    .toArray()) as ApplicationDoc[];

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Admin
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Grant applications
          </h1>
          <p className="mt-2 text-sm text-muted">
            Latest 200 submissions.
          </p>
        </div>
        <Link
          href="/grants/apply"
          className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
        >
          Open application form
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-background">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead className="bg-surface">
            <tr className="border-b border-border">
              <th className="p-3">Submitted</th>
              <th className="p-3">Applicant</th>
              <th className="p-3">Email</th>
              <th className="p-3">Project</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Files</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((d) => {
              const id = String(d._id ?? '');
              const files = d.uploads ?? [];
              return (
                <tr key={id} className="border-b border-border last:border-b-0">
                  <td className="p-3 whitespace-nowrap text-muted">
                    {fmtDate(d.createdAt)}
                  </td>
                  <td className="p-3 font-semibold">
                    {d.applicant?.legalName ?? ''}
                  </td>
                  <td className="p-3">
                    {d.applicant?.email ? (
                      <a
                        href={`mailto:${d.applicant.email}`}
                        className="underline underline-offset-4"
                      >
                        {d.applicant.email}
                      </a>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="p-3">{d.project?.title ?? ''}</td>
                  <td className="p-3">
                    {typeof d.funding?.requestedAmount === 'number'
                      ? d.funding.requestedAmount
                      : ''}
                  </td>
                  <td className="p-3">
                    <span className="rounded-full border border-border bg-surface px-2 py-1 text-xs font-semibold">
                      {d.status ?? 'unknown'}
                    </span>
                  </td>
                  <td className="p-3">
                    {files.length ? (
                      <ul className="space-y-1">
                        {files.map((f, idx) => (
                          <li key={`${id}-${idx}`}>
                            <a
                              className="font-semibold underline underline-offset-4"
                              href={`/api/grants/files/${String(f.fileId)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {f.fieldName}: {f.filename}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}

