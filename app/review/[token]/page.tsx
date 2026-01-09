import { getMongoDb } from '@/lib/mongodb';
import { hashReviewToken } from '@/lib/reviewLinks';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

type Upload = {
  fileId: unknown;
  fieldName: string;
  filename: string;
  size?: number;
};

type ApplicationDoc = {
  _id: unknown;
  createdAt?: Date;
  applicant?: {
    legalName?: string;
    email?: string;
    links?: string;
    applicantType?: string;
    ein?: string | null;
    disciplines?: string[];
    btcAddress?: string;
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
  };
  links?: {
    fiscalSponsorAgreement?: string | null;
    artSamples?: string | null;
  };
  uploads?: Upload[];
  reviewShares?: Array<{
    tokenHash: string;
    expiresAt: Date;
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

function textBlock(label: string, value?: string | null) {
  if (!value || !value.trim()) return null;
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</div>
      <pre className="mt-2 whitespace-pre-wrap rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-foreground/90">
        {value}
      </pre>
    </div>
  );
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  if (!token || token.length < 10) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-14">
        <div className="rounded-2xl border border-border bg-background p-6">
          <div className="text-sm text-muted">Invalid review link.</div>
        </div>
      </main>
    );
  }

  const tokenHash = hashReviewToken(token);
  const db = await getMongoDb();

  const doc = (await db.collection('applications').findOne({
    reviewShares: { $elemMatch: { tokenHash, expiresAt: { $gt: new Date() } } },
  })) as ApplicationDoc | null;

  if (!doc) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-14">
        <div className="rounded-2xl border border-border bg-background p-6">
          <div className="text-sm text-muted">This review link is invalid or has expired.</div>
        </div>
      </main>
    );
  }

  const files = doc.uploads ?? [];

  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <div className="rounded-3xl border border-border bg-background p-6 sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">
          BFTA • Application review (read-only)
        </div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          {doc.applicant?.legalName ?? 'Grant application'}
        </h1>
        <div className="mt-2 text-sm text-muted">
          {doc.project?.title ?? ''}
          {doc.createdAt ? (
            <span>
              {' '}
              • <span className="font-semibold text-foreground">Submitted:</span> {fmtDate(doc.createdAt)}
            </span>
          ) : null}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6">
          <section className="rounded-2xl border border-border bg-surface/40 p-5">
            <div className="text-sm font-semibold">Applicant</div>
            <div className="mt-4 grid grid-cols-1 gap-4">
              {textBlock('Email', doc.applicant?.email ?? '')}
              {textBlock('Links', doc.applicant?.links ?? '')}
              {textBlock('Applicant type', doc.applicant?.applicantType ?? '')}
              {textBlock('EIN', doc.applicant?.ein ?? '')}
              {doc.applicant?.disciplines?.length ? (
                <div className="text-sm">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Disciplines
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {doc.applicant.disciplines.map((d) => (
                      <span
                        key={d}
                        className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold"
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

          <section className="rounded-2xl border border-border bg-surface/40 p-5">
            <div className="text-sm font-semibold">Project</div>
            <div className="mt-4 grid grid-cols-1 gap-4">
              {textBlock('Title', doc.project?.title ?? '')}
              {textBlock('Summary', doc.project?.summary ?? '')}
              {textBlock('Description', doc.project?.description ?? '')}
              {textBlock('Timeline', doc.project?.timeline ?? '')}
              {textBlock('Venue/platform', doc.project?.venuePlatform ?? '')}
              {textBlock('Impact', doc.project?.impact ?? '')}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-surface/40 p-5">
            <div className="text-sm font-semibold">Funding</div>
            <div className="mt-4 grid grid-cols-1 gap-4">
              {doc.funding?.requestedAmount !== undefined ? (
                <div className="text-sm">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Requested amount
                  </div>
                  <div className="mt-2 rounded-xl border border-border bg-background p-4 text-lg font-semibold">
                    {doc.funding.requestedAmount}
                  </div>
                </div>
              ) : null}
              {textBlock('Budget breakdown', doc.funding?.budgetBreakdown ?? '')}
              {textBlock('Fund use', doc.funding?.fundUse ?? '')}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-surface/40 p-5">
            <div className="text-sm font-semibold">Background</div>
            <div className="mt-4 grid grid-cols-1 gap-4">
              {textBlock('Bio', doc.background?.bio ?? '')}
              {textBlock('Accomplishments', doc.background?.accomplishments ?? '')}
              {textBlock('Equity & inclusion', doc.background?.equityInclusion ?? '')}
              {textBlock('Evaluation plan', doc.background?.evaluationPlan ?? '')}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-surface/40 p-5">
            <div className="text-sm font-semibold">Oversight</div>
            <div className="mt-4 grid grid-cols-1 gap-4">
              {textBlock('Reporting plan', doc.oversight?.reportingPlan ?? '')}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-surface/40 p-5">
            <div className="text-sm font-semibold">Attachments</div>
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
                  <pre className="mt-2 whitespace-pre-wrap rounded-xl border border-border bg-background p-4 text-sm leading-relaxed text-foreground/90">
                    {doc.links.artSamples}
                  </pre>
                </div>
              ) : null}

              {files.length ? (
                <div className="text-sm">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Uploaded PDFs
                  </div>
                  <ul className="mt-2 space-y-2">
                    {files.map((f, idx) => (
                      <li key={`${String(doc._id)}-${idx}`}>
                        <a
                          className="font-semibold underline underline-offset-4"
                          href={`/api/review/files/${encodeURIComponent(token)}/${String(
                            f.fileId,
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {f.fieldName}: {f.filename}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </section>
        </div>

        <p className="mt-8 text-xs text-muted">
          This is a read-only reviewer view. If you need to contact BFTA, email{' '}
          <a className="font-semibold underline underline-offset-4" href="mailto:grants@bitcoinforthearts.org">
            grants@bitcoinforthearts.org
          </a>
          .
        </p>

        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex font-semibold underline underline-offset-4"
          >
            Back to bitcoinforthearts.org
          </Link>
        </div>
      </div>
    </main>
  );
}

