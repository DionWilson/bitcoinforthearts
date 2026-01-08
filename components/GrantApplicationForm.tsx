'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import InfoTip from '@/components/InfoTip';

const BTC_ADDRESS_REGEX = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/;
const MAX_FILE_MB = 3;
const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;

type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; applicationId: string }
  | { status: 'error'; message: string };

function getFirstErrorMessage(err: unknown) {
  if (err && typeof err === 'object' && 'message' in err) {
    const msg = (err as { message?: unknown }).message;
    if (typeof msg === 'string' && msg.trim()) return msg.trim();
  }
  return 'Something went wrong. Please try again.';
}

export default function GrantApplicationForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(1);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });
  const [applicantType, setApplicantType] = useState<'individual' | 'organization'>(
    'individual',
  );

  const steps = useMemo(
    () => [
      { id: 1, title: 'Applicant information' },
      { id: 2, title: 'Project description' },
      { id: 3, title: 'Funding & budget' },
      { id: 4, title: 'Background & evaluation' },
      { id: 5, title: 'Oversight & reporting' },
      { id: 6, title: 'Attachments' },
    ],
    [],
  );

  const progressPct = Math.round((step / steps.length) * 100);

  useEffect(() => {
    // When advancing steps, bring the current section into view.
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  const validateStep = (targetStep: number) => {
    const form = formRef.current;
    if (!form) return false;
    // Only validate currently-enabled inputs (we disable non-active sections).
    if (!form.checkValidity()) {
      form.reportValidity();
      return false;
    }

    if (targetStep === 1) {
      const selected = form.querySelectorAll<HTMLInputElement>(
        'input[name="discipline[]"]:checked',
      );
      if (selected.length < 1) {
        // Provide a clear message near the discipline block.
        setSubmitState({
          status: 'error',
          message: 'Please select at least one artistic discipline.',
        });
        return false;
      }
      if (submitState.status === 'error') setSubmitState({ status: 'idle' });
    }

    // Extra validation: BTC address pattern (native pattern errors can be hard to read).
    if (targetStep >= 2) {
      const btc = form.elements.namedItem('btcAddress') as HTMLInputElement | null;
      if (btc && btc.value && !BTC_ADDRESS_REGEX.test(btc.value.trim())) {
        btc.setCustomValidity('Please enter a valid Bitcoin address (bc1..., 1..., or 3...).');
        btc.reportValidity();
        btc.setCustomValidity('');
        return false;
      }
    }

    return true;
  };

  const validateFiles = () => {
    const form = formRef.current;
    if (!form) return true;

    const fileInputs = [
      form.elements.namedItem('portfolioResume') as HTMLInputElement | null,
      form.elements.namedItem('fiscalSponsorAgreement') as HTMLInputElement | null,
    ].filter(Boolean) as HTMLInputElement[];

    for (const input of fileInputs) {
      const files = Array.from(input.files ?? []);
      for (const f of files) {
        if (f.size > MAX_FILE_BYTES) {
          setSubmitState({
            status: 'error',
            message: `“${f.name}” is too large. Please keep each file under ${MAX_FILE_MB}MB to avoid upload errors.`,
          });
          return false;
        }
      }
    }

    return true;
  };

  const validateLinkOrFileRequirements = () => {
    const form = formRef.current;
    if (!form) return false;

    // Portfolio links are already required in Section 1 via the "links" field.
    // We only enforce the file size if they choose to upload a PDF.

    if (isOrg) {
      const sponsorFile = form.elements.namedItem(
        'fiscalSponsorAgreement',
      ) as HTMLInputElement | null;
      const sponsorLink = form.elements.namedItem(
        'fiscalSponsorAgreementLink',
      ) as HTMLTextAreaElement | null;
      const sponsorHasFile = Boolean(sponsorFile?.files?.length);
      const sponsorHasLink = Boolean(sponsorLink?.value?.trim());

      if (!sponsorHasFile && !sponsorHasLink) {
        setSubmitState({
          status: 'error',
          message:
            'For organizations/collectives, please provide either the Fiscal Sponsor Agreement PDF (under 3MB) or a link to the agreement.',
        });
        return false;
      }
    }

    return true;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    if (step === steps.length && !validateFiles()) return;
    setStep((s) => Math.min(steps.length, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;
    if (!validateFiles()) return;
    if (!validateLinkOrFileRequirements()) return;
    if (step !== steps.length) {
      setStep(steps.length);
      return;
    }

    const form = formRef.current;
    if (!form) return;

    setSubmitState({ status: 'submitting' });
    try {
      const body = new FormData(form);
      const res = await fetch('/api/grants/apply', {
        method: 'POST',
        body,
      });

      const data = (await res.json().catch(() => null)) as
        | { ok: true; applicationId: string }
        | { ok: false; error?: string }
        | null;

      if (!res.ok || !data || !('ok' in data) || data.ok !== true) {
        const msg = data && 'error' in data && typeof data.error === 'string' ? data.error : '';
        throw new Error(msg || `Submission failed (HTTP ${res.status}).`);
      }

      setSubmitState({ status: 'success', applicationId: data.applicationId });
      form.reset();
      setApplicantType('individual');
      setStep(1);
    } catch (err) {
      setSubmitState({ status: 'error', message: getFirstErrorMessage(err) });
    }
  };

  const isOrg = applicantType === 'organization';
  const isSubmitting = submitState.status === 'submitting';

  const sectionDisabled = (section: number) => step !== section;

  if (submitState.status === 'success') {
    return (
      <div className="rounded-2xl border border-border bg-background p-6">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">
          Application received
        </div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          Thanks — your grant application has been submitted.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          We review applications quarterly. Processing begins in <span className="font-semibold text-foreground">Q3 2026</span>.
        </p>
        <div className="mt-4 rounded-xl border border-border bg-surface p-4 text-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Confirmation ID
          </div>
          <div className="mt-1 font-semibold">{submitState.applicationId}</div>
        </div>
        <button
          type="button"
          onClick={() => setSubmitState({ status: 'idle' })}
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="rounded-3xl border border-border bg-background p-6 pb-28 sm:p-8 sm:pb-28"
    >
      <div ref={topRef} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            BFTA Grant Application
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Apply for a Bitcoin-native micro-grant
          </h2>
        </div>
        <div className="text-sm text-muted">
          Step <span className="font-semibold text-foreground">{step}</span> of{' '}
          <span className="font-semibold text-foreground">{steps.length}</span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">
        BFTA funds Bitcoin-aligned arts projects. Grants are disbursed in BTC. Reviewed quarterly;
        processing starts <span className="font-semibold text-foreground">Q3 2026</span>. Applicants must commit to
        post-grant reporting for radical transparency.
      </p>

      {/* Progress */}
      <div className="mt-5">
        <div className="h-2 w-full rounded-full bg-surface">
          <div
            className="h-2 rounded-full bg-accent transition-all"
            style={{ width: `${progressPct}%` }}
            aria-hidden="true"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted">
          {steps.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                if (s.id === step) return;
                if (s.id < step || validateStep(step)) setStep(s.id);
              }}
              className={[
                'rounded-full border border-border px-3 py-1 transition-colors',
                s.id === step ? 'bg-surface text-foreground' : 'bg-background hover:bg-surface',
              ].join(' ')}
              aria-current={s.id === step ? 'step' : undefined}
            >
              {s.id}. {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Section 1 */}
      <fieldset
        disabled={sectionDisabled(1) || isSubmitting}
        hidden={sectionDisabled(1)}
        className="mt-8"
      >
        <legend className="text-lg font-semibold tracking-tight">Section 1: Applicant Information</legend>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">
              Legal Name or DBA <span className="text-accent">*</span>
            </span>
            <input
              name="legalName"
              required
              className="min-h-12 rounded-md border border-border bg-background px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">
              Email <span className="text-accent">*</span>
            </span>
            <input
              name="email"
              type="email"
              required
              className="min-h-12 rounded-md border border-border bg-background px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Phone</span>
            <input
              name="phone"
              type="tel"
              className="min-h-12 rounded-md border border-border bg-background px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className="flex items-center justify-between gap-3 text-sm font-semibold">
              <span>
                Mailing Address <span className="text-accent">*</span>
              </span>
              <InfoTip text="Include street/city/region/postal code (or the best stable mailing address you can receive correspondence at)." />
            </span>
            <textarea
              name="mailingAddress"
              required
              rows={3}
              className="rounded-md border border-border bg-background px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className="flex items-center justify-between gap-3 text-sm font-semibold">
              <span>
                Website/Portfolio/Social Media Links <span className="text-accent">*</span>
              </span>
              <InfoTip text="Paste links that help us verify your work: website/portfolio, X/Instagram/Nostr, videos, press, etc. Include usernames/handles if helpful." />
            </span>
            <textarea
              name="links"
              required
              rows={3}
              placeholder="Example: https://yourportfolio.com, https://x.com/yourhandle"
              className="rounded-md border border-border bg-background px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">
              Applicant Type <span className="text-accent">*</span>
            </span>
            <select
              name="applicantType"
              required
              value={applicantType}
              onChange={(e) =>
                setApplicantType(
                  e.target.value === 'organization' ? 'organization' : 'individual',
                )
              }
              className="min-h-12 rounded-md border border-border bg-background px-3 py-2"
            >
              <option value="individual">Individual Artist</option>
              <option value="organization">Organization/Collective</option>
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">
              Bitcoin Wallet Address for Disbursement <span className="text-accent">*</span>
            </span>
            <input
              name="btcAddress"
              required
              pattern={BTC_ADDRESS_REGEX.source}
              className="min-h-12 rounded-md border border-border bg-background px-3 py-2"
              placeholder="bc1..., 1..., or 3..."
            />
          </label>
        </div>

        {/* Org-only */}
        <div className={['mt-4', isOrg ? '' : 'hidden'].join(' ')}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="text-sm font-semibold">
                Nonprofit Status or Fiscal Sponsor <span className="text-accent">*</span>
              </span>
              <input
                name="nonprofitOrSponsor"
                required={isOrg}
                disabled={!isOrg || sectionDisabled(1) || isSubmitting}
                className="min-h-12 rounded-md border border-border bg-background px-3 py-2"
                placeholder="Example: 501(c)(3) status, or sponsor name + relationship"
              />
            </label>

            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="flex items-center justify-between gap-3 text-sm font-semibold">
                <span>
                  Upload Fiscal Sponsor Agreement (PDF) <span className="text-accent">*</span>
                </span>
                <InfoTip text="If you’re an org/collective using a fiscal sponsor, upload the agreement if it’s small. If it’s large, paste a link in the next field." />
              </span>
              <input
                name="fiscalSponsorAgreement"
                type="file"
                accept="application/pdf"
                required={false}
                disabled={!isOrg || sectionDisabled(1) || isSubmitting}
                className="rounded-md border border-border bg-background px-3 py-3"
              />
              <span className="text-xs text-muted">
                If the PDF is larger than {MAX_FILE_MB}MB, paste a link below instead.
              </span>
            </label>

            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="flex items-center justify-between gap-3 text-sm font-semibold">
                <span>
                  Fiscal Sponsor Agreement Link (if not uploading)
                  {isOrg ? <span className="text-accent"> *</span> : null}
                </span>
                <InfoTip text="Use a share link that can be opened by the grants team (Drive/Dropbox/website). Avoid expiring links." />
              </span>
              <textarea
                name="fiscalSponsorAgreementLink"
                rows={2}
                disabled={!isOrg || sectionDisabled(1) || isSubmitting}
                className="rounded-md border border-border bg-background px-3 py-2"
                placeholder="Link to the agreement (Drive, website, etc.)"
              />
            </label>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-surface p-4">
          <div className="text-sm font-semibold">
            Primary Artistic Discipline <span className="text-accent">*</span>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              'Visual Arts',
              'Theater',
              'Dance',
              'Music',
              'Writing/Storytelling',
              'Film',
              'Digital/Ordinals-based',
              'Other',
            ].map((d) => (
              <label key={d} className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  name="discipline[]"
                  value={d}
                  required={false}
                  className="h-4 w-4"
                />
                <span>{d}</span>
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">
            Select all that apply (required: choose at least one).
          </p>
          <input
            type="text"
            name="disciplineRequiredHack"
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
            // This is a small trick: we validate “at least one discipline” in JS on next.
          />
        </div>

        <label className="mt-4 flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 text-sm">
          <input name="missionAligned" type="checkbox" required className="mt-1 h-4 w-4" />
          <span>
            I confirm my project aligns with BFTA’s mission: radical transparency, low time preference,
            censorship-resistant innovation, no gatekeepers, and a sustainable reserve model (55% grants,
            30% programs, 10% ops, 5% HODL vault). <span className="text-accent">*</span>
          </span>
        </label>
      </fieldset>

      {/* Section 2 */}
      <fieldset
        disabled={sectionDisabled(2) || isSubmitting}
        hidden={sectionDisabled(2)}
        className="mt-10"
      >
        <legend className="text-lg font-semibold tracking-tight">Section 2: Project Description</legend>
        <div className="mt-4 grid grid-cols-1 gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">
              Project Title <span className="text-accent">*</span>
            </span>
            <input
              name="projectTitle"
              required
              className="min-h-12 rounded-md border border-border bg-background px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="flex items-center justify-between gap-3 text-sm font-semibold">
              <span>
                Project Summary (500 chars max) <span className="text-accent">*</span>
              </span>
              <InfoTip text="One tight paragraph: what you’re making, where/when it happens, and why it matters." />
            </span>
            <textarea
              name="projectSummary"
              required
              maxLength={500}
              rows={4}
              className="rounded-md border border-border bg-background px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="flex items-center justify-between gap-3 text-sm font-semibold">
              <span>
                Detailed Description (2000 chars max) <span className="text-accent">*</span>
              </span>
              <InfoTip text="Explain what you’ll do, how you’ll do it, and how Bitcoin/decentralization fits (payments, proof-of-support, on-chain artifacts, Lightning tips, censorship resistance, etc.)." />
            </span>
            <textarea
              name="projectDescription"
              required
              maxLength={2000}
              rows={6}
              className="rounded-md border border-border bg-background px-3 py-2"
              placeholder="What, why, how Bitcoin/decentralization integrates..."
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="flex items-center justify-between gap-3 text-sm font-semibold">
              <span>
                Timeline: Start/end dates, milestones <span className="text-accent">*</span>
              </span>
              <InfoTip text="List key milestones with dates (or ranges): prep, production, launch/exhibit, and wrap-up. Keep it realistic." />
            </span>
            <textarea
              name="timeline"
              required
              rows={4}
              className="rounded-md border border-border bg-background px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">
              Venue/Platform <span className="text-accent">*</span>
            </span>
            <input
              name="venuePlatform"
              required
              className="min-h-12 rounded-md border border-border bg-background px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="flex items-center justify-between gap-3 text-sm font-semibold">
              <span>
                Target Audience and Expected Impact (1500 chars max) <span className="text-accent">*</span>
              </span>
              <InfoTip text="Who is this for, how will you reach them, and what change/outcome do you expect? Include equity/inclusion considerations where relevant." />
            </span>
            <textarea
              name="impact"
              required
              maxLength={1500}
              rows={5}
              className="rounded-md border border-border bg-background px-3 py-2"
              placeholder="Include equity/inclusion considerations."
            />
          </label>
        </div>
      </fieldset>

      {/* Section 3 */}
      <fieldset
        disabled={sectionDisabled(3) || isSubmitting}
        hidden={sectionDisabled(3)}
        className="mt-10"
      >
        <legend className="text-lg font-semibold tracking-tight">Section 3: Funding and Budget</legend>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">
              Requested Grant Amount (USD or sats) <span className="text-accent">*</span>
            </span>
            <input
              name="requestedAmount"
              required
              type="number"
              min={0}
              step="any"
              className="min-h-12 rounded-md border border-border bg-background px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className="flex items-center justify-between gap-3 text-sm font-semibold">
              <span>
                Total Project Budget Breakdown <span className="text-accent">*</span>
              </span>
              <InfoTip text="List line items with estimated costs (materials, venue, travel, collaborators, etc.). Totals can be rough but should add up." />
            </span>
            <textarea
              name="budgetBreakdown"
              required
              rows={4}
              className="rounded-md border border-border bg-background px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className="flex items-center justify-between gap-3 text-sm font-semibold">
              <span>
                How Will BFTA Funds Be Used? (1500 chars max) <span className="text-accent">*</span>
              </span>
              <InfoTip text="Be specific about what BFTA’s portion pays for. Prefer concrete line items over general statements." />
            </span>
            <textarea
              name="fundUse"
              required
              maxLength={1500}
              rows={5}
              className="rounded-md border border-border bg-background px-3 py-2"
            />
          </label>
        </div>
      </fieldset>

      {/* Section 4 */}
      <fieldset
        disabled={sectionDisabled(4) || isSubmitting}
        hidden={sectionDisabled(4)}
        className="mt-10"
      >
        <legend className="text-lg font-semibold tracking-tight">
          Section 4: Artist/Organization Background and Evaluation
        </legend>
        <div className="mt-4 grid grid-cols-1 gap-4">
          <label className="flex flex-col gap-2">
            <span className="flex items-center justify-between gap-3 text-sm font-semibold">
              <span>
                Mission Statement or Bio (1500 chars max) <span className="text-accent">*</span>
              </span>
              <InfoTip text="Who are you/your organization? What do you make, and what’s your artistic focus? Include a sentence on how Bitcoin values show up in your work (if applicable)." />
            </span>
            <textarea
              name="bio"
              required
              maxLength={1500}
              rows={5}
              className="rounded-md border border-border bg-background px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="flex items-center justify-between gap-3 text-sm font-semibold">
              <span>
                History and Key Accomplishments (2000 chars max) <span className="text-accent">*</span>
              </span>
              <InfoTip text="List notable exhibitions/performances, releases, awards, collaborations, press, and anything that demonstrates follow-through." />
            </span>
            <textarea
              name="accomplishments"
              required
              maxLength={2000}
              rows={6}
              className="rounded-md border border-border bg-background px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="flex items-center justify-between gap-3 text-sm font-semibold">
              <span>
                Equity and Inclusion Statement (1500 chars max) <span className="text-accent">*</span>
              </span>
              <InfoTip text="Describe how your project considers access, representation, and inclusion (e.g., pricing, venue accessibility, language, community partnerships)." />
            </span>
            <textarea
              name="equityInclusion"
              required
              maxLength={1500}
              rows={5}
              className="rounded-md border border-border bg-background px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="flex items-center justify-between gap-3 text-sm font-semibold">
              <span>
                Evaluation Plan (1500 chars max) <span className="text-accent">*</span>
              </span>
              <InfoTip text="How will you measure success? Examples: attendance, workshop outcomes, feedback, on-chain proofs, distribution metrics, deliverables shipped." />
            </span>
            <textarea
              name="evaluationPlan"
              required
              maxLength={1500}
              rows={5}
              className="rounded-md border border-border bg-background px-3 py-2"
              placeholder="How will you measure success (attendance, feedback, on-chain metrics, etc.)?"
            />
          </label>
        </div>
      </fieldset>

      {/* Section 5 */}
      <fieldset
        disabled={sectionDisabled(5) || isSubmitting}
        hidden={sectionDisabled(5)}
        className="mt-10"
      >
        <legend className="text-lg font-semibold tracking-tight">
          Section 5: Oversight and Reporting Commitments
        </legend>
        <div className="mt-4 grid grid-cols-1 gap-4">
          <label className="flex flex-col gap-2">
            <span className="flex items-center justify-between gap-3 text-sm font-semibold">
              <span>
                Post-Grant Reporting Plan (1500 chars max) <span className="text-accent">*</span>
              </span>
              <InfoTip text="Explain what you’ll provide at 6 months and at project end: brief narrative update + budget reconciliation, plus receipts/proofs if requested." />
            </span>
            <textarea
              name="reportingPlan"
              required
              maxLength={1500}
              rows={6}
              className="rounded-md border border-border bg-background px-3 py-2"
              placeholder="How will you track and report fund usage at 6 months and project end?"
            />
          </label>

          <label className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 text-sm">
            <input
              name="agreeOversight"
              type="checkbox"
              required
              className="mt-1 h-4 w-4"
            />
            <span>
              I agree to oversight: I will submit a simple report within 6 months of grant receipt and at project end,
              and allow BFTA to request evidence that funds were used as described.{' '}
              <span className="text-accent">*</span>
            </span>
          </label>
        </div>
      </fieldset>

      {/* Section 6 */}
      <fieldset
        disabled={sectionDisabled(6) || isSubmitting}
        hidden={sectionDisabled(6)}
        className="mt-10"
      >
        <legend className="text-lg font-semibold tracking-tight">Section 6: Attachments</legend>
        <p className="mt-2 text-xs text-muted">
          Upload limit: keep each file under <span className="font-semibold text-foreground">{MAX_FILE_MB}MB</span>.
          (Large files can be rejected by the hosting platform.)
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">
              Upload Portfolio/Resume (PDF) (optional, under {MAX_FILE_MB}MB)
            </span>
            <input
              name="portfolioResume"
              type="file"
              required={false}
              accept="application/pdf"
              onChange={() => {
                if (submitState.status === 'error') setSubmitState({ status: 'idle' });
                validateFiles();
              }}
              className="rounded-md border border-border bg-background px-3 py-3"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Artistic Samples (links)</span>
            <textarea
              name="artSamplesLinks"
              rows={4}
              className="rounded-md border border-border bg-background px-3 py-2"
              placeholder="Paste links to images/videos (YouTube, Vimeo, website, Drive, etc.). One per line is great."
            />
          </label>

          <div className="rounded-2xl border border-border bg-surface p-4 text-sm">
            <div className="font-semibold">
              Certification <span className="text-accent">*</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              By submitting, you agree to the grant terms (including the oversight and reporting requirements described
              in this application).
            </p>
            <label className="mt-3 flex items-start gap-3">
              <input name="agreeTerms" type="checkbox" required className="mt-1 h-4 w-4" />
              <span>
                I agree to the{' '}
                <a
                  href="/resources/grants/grant-terms.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-4"
                >
                  grant terms
                </a>
                . <span className="text-accent">*</span>
              </span>
            </label>
          </div>
        </div>
      </fieldset>

      {submitState.status === 'error' ? (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {submitState.message}
        </div>
      ) : null}

      {/* Navigation (fixed so you can always advance without scrolling) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 1 || isSubmitting}
          className={[
            'inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors',
            step === 1 || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface',
          ].join(' ')}
        >
          Back
        </button>

        {step < steps.length ? (
          <button
            type="button"
            onClick={goNext}
            disabled={isSubmitting}
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 border border-accent/60"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className={[
              'inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors',
              isSubmitting ? 'opacity-70 cursor-wait' : 'hover:opacity-90',
            ].join(' ')}
          >
            {isSubmitting ? 'Submitting…' : 'Submit application'}
          </button>
        )}
        </div>
        </div>
      </div>
    </form>
  );
}

