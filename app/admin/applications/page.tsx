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

function firstParam(v?: string | string[]) {
  return Array.isArray(v) ? v[0] : v;
}

function escapeRegExp(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseLinks(value: string) {
  const lines = value
    .split(/\r?\n/g)
    .map((l) => l.trim())
    .filter(Boolean);
  const urls = lines.filter((l) => /^https?:\/\/\S+$/i.test(l));
  const other = lines.filter((l) => !/^https?:\/\/\S+$/i.test(l));
  return { urls, other };
}

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    q?: string | string[];
    status?: string | string[];
    applicantType?: string | string[];
    discipline?: string | string[];
    due?: string | string[];
    report?: string | string[];
  }>;
}) {
  const sp = (await searchParams) ?? {};
  const q = (firstParam(sp.q) ?? '').trim();
  const status = (firstParam(sp.status) ?? '').trim();
  const applicantType = (firstParam(sp.applicantType) ?? '').trim();
  const discipline = (firstParam(sp.discipline) ?? '').trim();
  const due = (firstParam(sp.due) ?? '').trim(); // "7" | "14" | "30"
  const report = (firstParam(sp.report) ?? '').trim(); // "missing" | "received"

  const query: Record<string, unknown> = {};
  if (status) query.status = status;
  if (applicantType) query['applicant.applicantType'] = applicantType;
  if (discipline) query['applicant.disciplines'] = discipline;

  if (q) {
    const safe = escapeRegExp(q);
    query.$or = [
      { 'applicant.legalName': { $regex: safe, $options: 'i' } },
      { 'applicant.email': { $regex: safe, $options: 'i' } },
      { 'project.title': { $regex: safe, $options: 'i' } },
    ];
  }

  if (report === 'received') {
    query['oversight.reportReceivedAt'] = { $ne: null };
  } else if (report === 'missing') {
    query['oversight.reportReceivedAt'] = null;
  }

  if (due) {
    const days = Number(due);
    if (Number.isFinite(days) && days > 0) {
      const now = new Date();
      const until = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
      query['oversight.reportDueAt'] = { $lte: until, $gte: new Date(0) };
      // If we’re filtering by due date, default to missing report (unless explicitly set).
      if (!report) query['oversight.reportReceivedAt'] = null;
    }
  }

  const exportParams = new URLSearchParams();
  if (q) exportParams.set('q', q);
  if (status) exportParams.set('status', status);
  if (applicantType) exportParams.set('applicantType', applicantType);
  if (discipline) exportParams.set('discipline', discipline);
  if (due) exportParams.set('due', due);
  if (report) exportParams.set('report', report);
  const exportHref = `/api/admin/applications/export${
    exportParams.toString() ? `?${exportParams.toString()}` : ''
  }`;

  const db = await getMongoDb();
  const docs = (await db
    .collection<ApplicationDoc>('applications')
    .find(query)
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
            Showing up to 200 submissions.
          </p>
        </div>
        <Link
          href="/grants/apply"
          className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
        >
          Open application form
        </Link>
      </div>

      <form
        action="/admin/applications"
        method="get"
        className="mt-6 rounded-2xl border border-border bg-background p-5"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <label className="md:col-span-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">
              Search
            </div>
            <input
              name="q"
              defaultValue={q}
              placeholder="Name, email, or project title"
              className="mt-2 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </label>

          <label className="md:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">
              Status
            </div>
            <select
              name="status"
              defaultValue={status}
              className="mt-2 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="">All</option>
              <option value="submitted">submitted</option>
              <option value="under_review">under_review</option>
              <option value="needs_info">needs_info</option>
              <option value="awarded">awarded</option>
              <option value="declined">declined</option>
              <option value="withdrawn">withdrawn</option>
            </select>
          </label>

          <label className="md:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">
              Applicant type
            </div>
            <select
              name="applicantType"
              defaultValue={applicantType}
              className="mt-2 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="">All</option>
              <option value="individual">individual</option>
              <option value="organization">organization</option>
            </select>
          </label>

          <label className="md:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">
              Discipline
            </div>
            <select
              name="discipline"
              defaultValue={discipline}
              className="mt-2 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="">All</option>
              <option value="Visual Arts">Visual Arts</option>
              <option value="Theater">Theater</option>
              <option value="Dance">Dance</option>
              <option value="Music">Music</option>
              <option value="Writing/Storytelling">Writing/Storytelling</option>
              <option value="Film">Film</option>
              <option value="Digital">Digital</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label className="md:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">
              Report due
            </div>
            <select
              name="due"
              defaultValue={due}
              className="mt-2 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="">Any</option>
              <option value="7">Next 7 days</option>
              <option value="14">Next 14 days</option>
              <option value="30">Next 30 days</option>
            </select>
          </label>

          <label className="md:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">
              Report status
            </div>
            <select
              name="report"
              defaultValue={report}
              className="mt-2 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="">Any</option>
              <option value="missing">Missing</option>
              <option value="received">Received</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-muted">
            Tip: use “Report due” to find awarded grants that need follow-up.
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={exportHref}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-background px-5 py-2 text-sm font-semibold transition-colors hover:bg-surface"
            >
              Export CSV
            </a>
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:opacity-90"
            >
              Apply filters
            </button>
            <Link
              href="/admin/applications"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-background px-5 py-2 text-sm font-semibold transition-colors hover:bg-surface"
            >
              Reset
            </Link>
          </div>
        </div>
      </form>

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
                        {(() => {
                          const { urls, other } = parseLinks(d.links.artSamples);
                          if (!urls.length) {
                            return (
                              <pre className="mt-1 whitespace-pre-wrap rounded-md border border-border bg-surface p-3 text-xs text-muted">
                                {d.links.artSamples}
                              </pre>
                            );
                          }
                          return (
                            <div className="mt-2 rounded-md border border-border bg-surface p-3">
                              <ul className="space-y-1 text-sm">
                                {urls.map((u) => (
                                  <li key={u} className="break-words">
                                    <a
                                      href={u}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="font-semibold underline underline-offset-4"
                                    >
                                      {u}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                              {other.length ? (
                                <pre className="mt-2 whitespace-pre-wrap rounded-md border border-border bg-background p-3 text-xs text-muted">
                                  {other.join('\n')}
                                </pre>
                              ) : null}
                            </div>
                          );
                        })()}
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

