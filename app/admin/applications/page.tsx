import { getMongoDb } from '@/lib/mongodb';
import Link from 'next/link';
import AdminApplicationRow from '@/components/AdminApplicationRow';

export const dynamic = 'force-dynamic';

type ApplicationDoc = {
  _id: unknown;
  createdAt?: Date;
  status?: string;
  adminNotes?: string | null;
  links?: {
    fiscalSponsorAgreement?: string | null;
    artSamples?: string | null;
  };
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
  oversight?: {
    reportDueAt?: Date | null;
    reportReceivedAt?: Date | null;
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

      <div className="mt-8 space-y-4">
        {docs.map((d) => {
          const id = String(d._id ?? '');
          const files = d.uploads ?? [];
          return (
            <div
              key={id}
              className="rounded-2xl border border-border bg-background p-5"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Submitted {fmtDate(d.createdAt)}
                  </div>
                  <div className="mt-1 text-lg font-semibold tracking-tight">
                    <Link
                      href={`/admin/applications/${id}`}
                      className="underline underline-offset-4"
                    >
                      {d.applicant?.legalName ?? id}
                    </Link>
                  </div>
                  <div className="mt-1 text-sm text-muted">
                    {d.project?.title ? (
                      <Link
                        href={`/admin/applications/${id}`}
                        className="hover:underline"
                      >
                        {d.project.title}
                      </Link>
                    ) : (
                      ''
                    )}
                    {typeof d.funding?.requestedAmount === 'number' ? (
                      <span>
                        {' '}
                        • <span className="font-semibold text-foreground">Amount:</span>{' '}
                        {d.funding.requestedAmount}
                      </span>
                    ) : null}
                  </div>
                  {d.applicant?.email ? (
                    <div className="mt-2 text-sm">
                      <a
                        href={`mailto:${d.applicant.email}`}
                        className="font-semibold underline underline-offset-4"
                      >
                        {d.applicant.email}
                      </a>
                    </div>
                  ) : null}
                </div>

                <div className="w-full md:max-w-md">
                  <AdminApplicationRow
                    data={{
                      id,
                      status: d.status ?? 'submitted',
                      reportDueAt: d.oversight?.reportDueAt
                        ? new Date(d.oversight.reportDueAt).toISOString()
                        : null,
                      reportReceivedAt: d.oversight?.reportReceivedAt
                        ? new Date(d.oversight.reportReceivedAt).toISOString()
                        : null,
                      adminNotes: d.adminNotes ?? '',
                    }}
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Files
                </div>
                {files.length ? (
                  <ul className="mt-2 space-y-1 text-sm">
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
                  <div className="mt-2 text-sm text-muted">—</div>
                )}
              </div>

              {(d.links?.fiscalSponsorAgreement || d.links?.artSamples) && (
                <div className="mt-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Links
                  </div>
                  <div className="mt-2 space-y-2 text-sm">
                    {d.links?.fiscalSponsorAgreement ? (
                      <div>
                        <span className="font-semibold">Sponsor agreement:</span>{' '}
                        <a
                          className="underline underline-offset-4"
                          href={d.links.fiscalSponsorAgreement}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {d.links.fiscalSponsorAgreement}
                        </a>
                      </div>
                    ) : null}
                    {d.links?.artSamples ? (
                      <div>
                        <span className="font-semibold">Samples:</span>
                        <pre className="mt-1 whitespace-pre-wrap rounded-md border border-border bg-surface p-3 text-xs text-muted">
                          {d.links.artSamples}
                        </pre>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}

