import { getMongoDb } from '@/lib/mongodb';
import Link from 'next/link';
import { ObjectId } from 'mongodb';
import AdminApplicationRow from '@/components/AdminApplicationRow';
import ShareForReview from '@/components/ShareForReview';

export const dynamic = 'force-dynamic';

type Upload = {
  fileId: unknown;
  fieldName: string;
  filename: string;
  mimeType?: string;
  size?: number;
};

type ApplicationDoc = {
  _id: unknown;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
  adminNotes?: string | null;
  awardedAt?: Date | null;
  applicant?: {
    legalName?: string;
    email?: string;
    phone?: string | null;
    mailingAddress?: string;
    links?: string;
    applicantType?: string;
    ein?: string | null;
    nonprofitOrSponsor?: string | null;
    disciplines?: string[];
    btcAddress?: string;
    missionAligned?: boolean;
  };
  project?: {
    title?: string;
    summary?: string;
    description?: string;
    timeline?: string;
    venuePlatform?: string;
    impact?: string;
  };
  funding?: {
    requestedAmount?: number;
    budgetBreakdown?: string;
    fundUse?: string;
  };
  background?: {
    bio?: string;
    accomplishments?: string;
    equityInclusion?: string;
    evaluationPlan?: string;
  };
  oversight?: {
    reportingPlan?: string;
    agreeOversight?: boolean;
    reportDueAt?: Date | null;
    reportReceivedAt?: Date | null;
  };
  certification?: {
    agreeTerms?: boolean;
  };
  links?: {
    fiscalSponsorAgreement?: string | null;
    artSamples?: string | null;
  };
  uploads?: Upload[];
  emailNotification?: {
    ok?: boolean;
    failedAt?: Date;
    error?: string;
  };
};

function fmtDate(d?: Date | null) {
  if (!d) return '';
  try {
    return new Date(d).toLocaleString();
  } catch {
    return '';
  }
}

function sectionTitle(title: string, subtitle?: string) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {subtitle ? <p className="text-sm text-muted">{subtitle}</p> : null}
    </div>
  );
}

function textBlock(label: string, value?: string | null) {
  if (!value || !value.trim()) return null;
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </div>
      <pre className="mt-2 whitespace-pre-wrap rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-foreground/90">
        {value}
      </pre>
    </div>
  );
}

export default async function AdminApplicationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id || !ObjectId.isValid(id)) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-14">
        <div className="rounded-2xl border border-border bg-background p-6">
          <div className="text-sm text-muted">Invalid application id.</div>
          <Link
            href="/admin/applications"
            className="mt-4 inline-flex font-semibold underline underline-offset-4"
          >
            Back to applications
          </Link>
        </div>
      </main>
    );
  }

  const db = await getMongoDb();
  const doc = (await db
    .collection('applications')
    .findOne({ _id: new ObjectId(id) })) as ApplicationDoc | null;

  if (!doc) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-14">
        <div className="rounded-2xl border border-border bg-background p-6">
          <div className="text-sm text-muted">Application not found.</div>
          <Link
            href="/admin/applications"
            className="mt-4 inline-flex font-semibold underline underline-offset-4"
          >
            Back to applications
          </Link>
        </div>
      </main>
    );
  }

  const files = doc.uploads ?? [];

  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Admin • Application details
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            {doc.applicant?.legalName ?? 'Grant application'}
          </h1>
          <div className="mt-2 text-sm text-muted">
            <span className="font-semibold text-foreground">ID:</span> {String(doc._id)}
            {doc.createdAt ? (
              <span>
                {' '}
                • <span className="font-semibold text-foreground">Submitted:</span>{' '}
                {fmtDate(doc.createdAt)}
              </span>
            ) : null}
          </div>
        </div>
        <Link
          href="/admin/applications"
          className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:bg-surface"
        >
          Back to list
        </Link>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-background p-5">
        <AdminApplicationRow
          data={{
            id: String(doc._id),
            status: doc.status ?? 'submitted',
            reportDueAt: doc.oversight?.reportDueAt
              ? new Date(doc.oversight.reportDueAt).toISOString()
              : null,
            reportReceivedAt: doc.oversight?.reportReceivedAt
              ? new Date(doc.oversight.reportReceivedAt).toISOString()
              : null,
            adminNotes: doc.adminNotes ?? '',
          }}
        />
        {doc.emailNotification?.ok === false ? (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <div className="font-semibold">Email notification failed</div>
            <div className="mt-1 text-xs text-amber-900/80">
              {doc.emailNotification.failedAt ? fmtDate(doc.emailNotification.failedAt) : ''}
            </div>
            <div className="mt-2">{doc.emailNotification.error ?? 'Unknown error'}</div>
          </div>
        ) : null}
      </div>

      <div className="mt-4">
        <ShareForReview applicationId={String(doc._id)} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4">
        <section className="rounded-2xl border border-border bg-background p-6">
          {sectionTitle('Applicant information')}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {textBlock('Email', doc.applicant?.email ?? '')}
            {textBlock('Phone', doc.applicant?.phone ?? '')}
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4">
            {textBlock('Mailing address', doc.applicant?.mailingAddress ?? '')}
            {textBlock('Links', doc.applicant?.links ?? '')}
            {textBlock('Applicant type', doc.applicant?.applicantType ?? '')}
            {textBlock('EIN', doc.applicant?.ein ?? '')}
            {textBlock('Nonprofit or sponsor', doc.applicant?.nonprofitOrSponsor ?? '')}
            {doc.applicant?.disciplines?.length ? (
              <div className="text-sm">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Disciplines
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {doc.applicant.disciplines.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {textBlock('Bitcoin address', doc.applicant?.btcAddress ?? '')}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-background p-6">
          {sectionTitle('Project')}
          <div className="mt-4 grid grid-cols-1 gap-4">
            {textBlock('Project title', doc.project?.title ?? '')}
            {textBlock('Project summary', doc.project?.summary ?? '')}
            {textBlock('Detailed description', doc.project?.description ?? '')}
            {textBlock('Timeline', doc.project?.timeline ?? '')}
            {textBlock('Venue / platform', doc.project?.venuePlatform ?? '')}
            {textBlock('Audience & impact', doc.project?.impact ?? '')}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-background p-6">
          {sectionTitle('Funding & budget')}
          <div className="mt-4 grid grid-cols-1 gap-4">
            {doc.funding?.requestedAmount !== undefined ? (
              <div className="text-sm">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Requested amount
                </div>
                <div className="mt-2 rounded-xl border border-border bg-surface p-4 text-lg font-semibold">
                  {doc.funding.requestedAmount}
                </div>
              </div>
            ) : null}
            {textBlock('Budget breakdown', doc.funding?.budgetBreakdown ?? '')}
            {textBlock('How BFTA funds will be used', doc.funding?.fundUse ?? '')}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-background p-6">
          {sectionTitle('Background & evaluation')}
          <div className="mt-4 grid grid-cols-1 gap-4">
            {textBlock('Bio / mission', doc.background?.bio ?? '')}
            {textBlock('Accomplishments', doc.background?.accomplishments ?? '')}
            {textBlock('Equity & inclusion', doc.background?.equityInclusion ?? '')}
            {textBlock('Evaluation plan', doc.background?.evaluationPlan ?? '')}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-background p-6">
          {sectionTitle('Oversight & reporting')}
          <div className="mt-4 grid grid-cols-1 gap-4">
            {textBlock('Reporting plan', doc.oversight?.reportingPlan ?? '')}
            <div className="text-sm text-muted">
              {doc.awardedAt ? (
                <div>
                  <span className="font-semibold text-foreground">Awarded:</span>{' '}
                  {fmtDate(doc.awardedAt)}
                </div>
              ) : null}
              {doc.oversight?.reportDueAt ? (
                <div>
                  <span className="font-semibold text-foreground">Report due:</span>{' '}
                  {fmtDate(doc.oversight.reportDueAt)}
                </div>
              ) : null}
              {doc.oversight?.reportReceivedAt ? (
                <div>
                  <span className="font-semibold text-foreground">Report received:</span>{' '}
                  {fmtDate(doc.oversight.reportReceivedAt)}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-background p-6">
          {sectionTitle('Attachments')}
          <div className="mt-4 grid grid-cols-1 gap-4">
            {doc.links?.fiscalSponsorAgreement ? (
              <div className="text-sm">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Sponsor agreement link
                </div>
                <a
                  className="mt-2 inline-flex font-semibold underline underline-offset-4"
                  href={doc.links.fiscalSponsorAgreement}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {doc.links.fiscalSponsorAgreement}
                </a>
              </div>
            ) : null}
            {doc.links?.artSamples ? (
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Samples (links)
                </div>
                <pre className="mt-2 whitespace-pre-wrap rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-foreground/90">
                  {doc.links.artSamples}
                </pre>
              </div>
            ) : null}

            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Uploaded files
              </div>
              {files.length ? (
                <ul className="mt-2 space-y-2 text-sm">
                  {files.map((f, idx) => (
                    <li key={`${String(doc._id)}-${idx}`}>
                      <a
                        className="font-semibold underline underline-offset-4"
                        href={`/api/grants/files/${String(f.fileId)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {f.fieldName}: {f.filename}
                      </a>
                      {typeof f.size === 'number' ? (
                        <span className="text-xs text-muted">
                          {' '}
                          ({Math.round(f.size / 1024)} KB)
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-2 text-sm text-muted">—</div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

