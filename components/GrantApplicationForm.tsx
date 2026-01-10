'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Script from 'next/script';
import InfoTip from '@/components/InfoTip';
import { BITCOIN_ADDRESS_PATTERN, isValidBitcoinOnchainAddress } from '@/lib/bitcoinAddress';

const MAX_FILE_MB = 3;
const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;
const DRAFT_STORAGE_KEY = 'bfta_grant_application_draft_v1';
const LEGAL_ASSURANCES_VERSION = 2;
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

const CHAR_LIMITS: Record<string, number> = {
  projectSummary: 500,
  projectDescription: 2000,
  impact: 1500,
  fundUse: 1500,
  bio: 1500,
  accomplishments: 2000,
  equityInclusion: 1500,
  evaluationPlan: 1500,
  reportingPlan: 1500,
};

type DraftPayloadV1 = {
  version: 1;
  savedAt: string;
  step: number;
  applicantType: 'individual' | 'organization';
  values: Record<string, unknown>;
};

type Receipt = {
  createdAtIso: string;
  eligibility: {
    usProjectOnly: boolean;
  };
  applicant: {
    legalName: string;
    email: string;
    phone?: string;
    mailingAddress: string;
    links: string;
    applicantType: string;
    ein?: string;
    nonprofitOrSponsor?: string;
    disciplines: string[];
    btcAddress: string;
  };
  project: {
    title: string;
    summary: string;
    description: string;
    timeline: string;
    venuePlatform: string;
    impact: string;
  };
  funding: {
    requestedAmount: string;
    budgetBreakdown: string;
    fundUse: string;
  };
  background: {
    bio: string;
    accomplishments: string;
    equityInclusion: string;
    evaluationPlan: string;
  };
  oversight: {
    reportingPlan: string;
  };
  attachments: {
    fiscalSponsorAgreementLink?: string;
    artSamplesLinks?: string;
    uploadedFileNames: string[];
  };
  certification: {
    agreeTerms: boolean;
    agreeLegal: boolean;
    legalSignatureName: string;
    legalSignatureDate: string;
    legalAssurancesVersion: number;
  };
};

type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; applicationId: string; receipt: Receipt }
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
  const [charCounts, setCharCounts] = useState<Record<string, number>>({});
  const [applicantType, setApplicantType] = useState<'individual' | 'organization'>(
    'individual',
  );
  const legalSignedOn = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const buildReceiptFromForm = useCallback((): Receipt | null => {
    const form = formRef.current;
    if (!form) return null;

    const getInputValue = (name: string) => {
      const el = form.elements.namedItem(name) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement
        | null;
      if (!el) return '';
      if (el instanceof HTMLInputElement && el.type === 'checkbox') return el.checked ? 'true' : '';
      return (el.value ?? '').toString();
    };

    const disciplines = Array.from(
      form.querySelectorAll<HTMLInputElement>('input[name="discipline[]"]:checked'),
    )
      .map((i) => i.value)
      .filter(Boolean);

    const uploadedFileNames: string[] = [];
    const portfolio = form.elements.namedItem('portfolioResume') as HTMLInputElement | null;
    const sponsor = form.elements.namedItem('fiscalSponsorAgreement') as HTMLInputElement | null;
    for (const input of [portfolio, sponsor].filter(Boolean) as HTMLInputElement[]) {
      for (const f of Array.from(input.files ?? [])) {
        uploadedFileNames.push(f.name);
      }
    }

    const legalAssurancesVersionRaw = getInputValue('legalAssurancesVersion');
    const legalAssurancesVersion = Number.isFinite(Number(legalAssurancesVersionRaw))
      ? Number(legalAssurancesVersionRaw)
      : LEGAL_ASSURANCES_VERSION;

    return {
      createdAtIso: new Date().toISOString(),
      eligibility: {
        usProjectOnly: Boolean(getInputValue('usProjectOnly')),
      },
      applicant: {
        legalName: getInputValue('legalName').trim(),
        email: getInputValue('email').trim(),
        phone: getInputValue('phone').trim() || undefined,
        mailingAddress: getInputValue('mailingAddress').trim(),
        links: getInputValue('links').trim(),
        applicantType: getInputValue('applicantType').trim(),
        ein: getInputValue('ein').trim() || undefined,
        nonprofitOrSponsor: getInputValue('nonprofitOrSponsor').trim() || undefined,
        disciplines,
        btcAddress: getInputValue('btcAddress').trim(),
      },
      project: {
        title: getInputValue('projectTitle').trim(),
        summary: getInputValue('projectSummary').trim(),
        description: getInputValue('projectDescription').trim(),
        timeline: getInputValue('timeline').trim(),
        venuePlatform: getInputValue('venuePlatform').trim(),
        impact: getInputValue('impact').trim(),
      },
      funding: {
        requestedAmount: getInputValue('requestedAmount').trim(),
        budgetBreakdown: getInputValue('budgetBreakdown').trim(),
        fundUse: getInputValue('fundUse').trim(),
      },
      background: {
        bio: getInputValue('bio').trim(),
        accomplishments: getInputValue('accomplishments').trim(),
        equityInclusion: getInputValue('equityInclusion').trim(),
        evaluationPlan: getInputValue('evaluationPlan').trim(),
      },
      oversight: {
        reportingPlan: getInputValue('reportingPlan').trim(),
      },
      attachments: {
        fiscalSponsorAgreementLink: getInputValue('fiscalSponsorAgreementLink').trim() || undefined,
        artSamplesLinks: getInputValue('artSamplesLinks').trim() || undefined,
        uploadedFileNames,
      },
      certification: {
        agreeTerms: Boolean(getInputValue('agreeTerms')),
        agreeLegal: Boolean(getInputValue('agreeLegal')),
        legalSignatureName: getInputValue('legalSignatureName').trim(),
        legalSignatureDate: getInputValue('legalSignatureDate').trim(),
        legalAssurancesVersion,
      },
    };
  }, []);

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

  const [draftNotice, setDraftNotice] = useState<null | { savedAt: string; loaded?: boolean }>(
    null,
  );
  const saveDraftTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // When advancing steps, bring the current section into view.
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  useEffect(() => {
    // When showing an error, ensure the message is visible.
    if (submitState.status === 'error') {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [submitState.status]);

  const refreshCharCounts = useCallback(() => {
    const form = formRef.current;
    if (!form) return;
    const next: Record<string, number> = {};
    for (const [name, max] of Object.entries(CHAR_LIMITS)) {
      const el = form.elements.namedItem(name) as HTMLTextAreaElement | HTMLInputElement | null;
      if (!el) continue;
      const v = typeof el.value === 'string' ? el.value : '';
      next[name] = Math.min(max, v.length);
    }
    setCharCounts(next);
  }, []);

  useEffect(() => {
    // Initialize counters once.
    refreshCharCounts();
  }, [refreshCharCounts]);

  const collectDraftValues = useCallback((form: HTMLFormElement) => {
    const controls = Array.from(form.elements).filter(
      (el): el is HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement =>
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        el instanceof HTMLSelectElement,
    );

    const values: Record<string, unknown> = {};
    const seen = new Set<string>();

    for (const el of controls) {
      const name = el.name;
      if (!name) continue;
      if (seen.has(name)) continue;

      // Skip known non-data fields.
      if (name === 'disciplineRequiredHack') {
        seen.add(name);
        continue;
      }

      // Skip file inputs (can’t be restored from localStorage).
      if (el instanceof HTMLInputElement && el.type === 'file') {
        seen.add(name);
        continue;
      }

      const item = (form.elements as unknown as { namedItem: (n: string) => unknown }).namedItem(
        name,
      );

      // Radio groups and checkbox groups are exposed as RadioNodeList by namedItem().
      if (typeof RadioNodeList !== 'undefined' && item instanceof RadioNodeList) {
        const nodes = Array.from(item).filter((n): n is HTMLInputElement => n instanceof HTMLInputElement);
        const hasCheckbox = nodes.some((n) => n.type === 'checkbox');
        const hasRadio = nodes.some((n) => n.type === 'radio');

        if (hasCheckbox) {
          values[name] = nodes.filter((n) => n.checked).map((n) => n.value);
        } else if (hasRadio) {
          const picked = nodes.find((n) => n.checked);
          values[name] = picked ? picked.value : '';
        } else {
          values[name] = item.value ?? '';
        }

        seen.add(name);
        continue;
      }

      if (el instanceof HTMLInputElement && el.type === 'checkbox') {
        values[name] = Boolean(el.checked);
        seen.add(name);
        continue;
      }

      if (el instanceof HTMLSelectElement && el.multiple) {
        values[name] = Array.from(el.selectedOptions).map((o) => o.value);
        seen.add(name);
        continue;
      }

      values[name] = el.value ?? '';
      seen.add(name);
    }

    return values;
  }, []);

  const saveDraftNow = useCallback(() => {
    const form = formRef.current;
    if (!form) return;
    try {
      const payload: DraftPayloadV1 = {
        version: 1,
        savedAt: new Date().toISOString(),
        step,
        applicantType,
        values: collectDraftValues(form),
      };
      window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(payload));
      setDraftNotice({ savedAt: payload.savedAt });
    } catch {
      // Ignore quota/serialization errors.
    }
  }, [applicantType, collectDraftValues, step]);

  const scheduleDraftSave = useCallback(() => {
    if (saveDraftTimerRef.current) window.clearTimeout(saveDraftTimerRef.current);
    saveDraftTimerRef.current = window.setTimeout(() => {
      saveDraftNow();
    }, 600);
  }, [saveDraftNow]);

  const clearDraft = useCallback(() => {
    try {
      window.localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // ignore
    }
    setDraftNotice(null);
  }, []);

  const restoreDraftIntoForm = useCallback(
    (payload: DraftPayloadV1) => {
      const form = formRef.current;
      if (!form) return;

      const values = payload.values ?? {};
      for (const [name, raw] of Object.entries(values)) {
        if (!name) continue;

        // Skip file fields (can’t be restored) + known hacks.
        if (name === 'portfolioResume' || name === 'fiscalSponsorAgreement') continue;
        if (name === 'disciplineRequiredHack') continue;

        const item = (form.elements as unknown as { namedItem: (n: string) => unknown }).namedItem(
          name,
        );
        if (!item) continue;

        if (typeof RadioNodeList !== 'undefined' && item instanceof RadioNodeList) {
          const nodes = Array.from(item).filter((n): n is HTMLInputElement => n instanceof HTMLInputElement);
          const hasCheckbox = nodes.some((n) => n.type === 'checkbox');
          const hasRadio = nodes.some((n) => n.type === 'radio');

          if (hasCheckbox) {
            const wanted = Array.isArray(raw) ? raw.map(String) : [];
            for (const n of nodes) n.checked = wanted.includes(n.value);
          } else if (hasRadio) {
            const wanted = typeof raw === 'string' ? raw : String(raw ?? '');
            for (const n of nodes) n.checked = n.value === wanted;
          } else if (typeof item.value === 'string') {
            item.value = typeof raw === 'string' ? raw : String(raw ?? '');
          }

          continue;
        }

        if (item instanceof HTMLInputElement) {
          if (item.type === 'checkbox') {
            item.checked = Boolean(raw);
            continue;
          }
          item.value = typeof raw === 'string' ? raw : String(raw ?? '');
          continue;
        }

        if (item instanceof HTMLTextAreaElement) {
          item.value = typeof raw === 'string' ? raw : String(raw ?? '');
          continue;
        }

        if (item instanceof HTMLSelectElement) {
          if (item.multiple && Array.isArray(raw)) {
            const wanted = raw.map(String);
            for (const opt of Array.from(item.options)) opt.selected = wanted.includes(opt.value);
          } else {
            item.value = typeof raw === 'string' ? raw : String(raw ?? '');
          }
        }
      }
    },
    [],
  );

  useEffect(() => {
    // Attempt to restore a saved draft (if present).
    const form = formRef.current;
    if (!form) return;
    try {
      const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as DraftPayloadV1;
      if (!parsed || parsed.version !== 1 || typeof parsed.values !== 'object') return;

      const nextType =
        parsed.applicantType === 'organization' ? 'organization' : ('individual' as const);
      setApplicantType(nextType);
      setStep(
        typeof parsed.step === 'number' && Number.isFinite(parsed.step)
          ? Math.min(steps.length, Math.max(1, Math.floor(parsed.step)))
          : 1,
      );

      // Wait a tick so conditional org-only fields exist/enabled as needed.
      window.setTimeout(() => {
        restoreDraftIntoForm(parsed);
        refreshCharCounts();
        setDraftNotice({ savedAt: parsed.savedAt, loaded: true });
      }, 0);
    } catch {
      // ignore parse errors
    }
  }, [refreshCharCounts, restoreDraftIntoForm, steps.length]);

  const validateCurrentStepOnly = (targetStep: number, opts?: { report?: boolean }) => {
    const form = formRef.current;
    if (!form) return false;

    const fieldset = form.querySelector<HTMLFieldSetElement>(
      `fieldset[data-step="${targetStep}"]`,
    );
    if (!fieldset) return true;

    const controls = Array.from(
      fieldset.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
        'input, textarea, select',
      ),
    );

    for (const el of controls) {
      if (el.disabled) continue;
      if (!el.checkValidity()) {
        if (opts?.report !== false) el.reportValidity();
        return false;
      }
    }

    return true;
  };

  const focusFirstInvalidInStep = (targetStep: number) => {
    const form = formRef.current;
    if (!form) return;
    const fieldset = form.querySelector<HTMLFieldSetElement>(`fieldset[data-step="${targetStep}"]`);
    if (!fieldset) return;

    // After switching steps, the invalid control becomes visible and can display its message.
    const firstInvalid = fieldset.querySelector<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >('input:invalid, textarea:invalid, select:invalid');
    if (!firstInvalid) return;

    try {
      firstInvalid.focus({ preventScroll: false });
    } catch {
      // ignore
    }
    try {
      firstInvalid.reportValidity();
    } catch {
      // ignore
    }
  };

  const validateAllSteps = () => {
    const form = formRef.current;
    if (!form) return false;

    for (let s = 1; s <= steps.length; s += 1) {
      if (!validateCurrentStepOnly(s, { report: false })) {
        setStep(s);
        setSubmitState({
          status: 'error',
          message: `Please complete all required fields in Section ${s}: ${steps[s - 1]?.title ?? ''}.`,
        });
        // Let React render the section, then focus/show the exact missing field.
        setTimeout(() => focusFirstInvalidInStep(s), 0);
        return false;
      }

      // Step-specific checks.
      if (s === 1) {
        const selected = form.querySelectorAll<HTMLInputElement>(
          'input[name="discipline[]"]:checked',
        );
        if (selected.length < 1) {
          setStep(1);
          setSubmitState({
            status: 'error',
            message: 'Please select at least one artistic discipline.',
          });
          return false;
        }

        const btc = form.elements.namedItem('btcAddress') as HTMLInputElement | null;
        if (btc && btc.value && !isValidBitcoinOnchainAddress(btc.value)) {
          setStep(1);
          btc.setCustomValidity(
            'Please enter a valid Bitcoin on-chain address (legacy 1/3, segwit bc1q…, or taproot bc1p…).',
          );
          btc.reportValidity();
          btc.setCustomValidity('');
          return false;
        }
      }
    }

    return true;
  };

  const validateStep = (targetStep: number) => {
    const form = formRef.current;
    if (!form) return false;
    if (!validateCurrentStepOnly(targetStep, { report: true })) return false;

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

      const btc = form.elements.namedItem('btcAddress') as HTMLInputElement | null;
      if (btc && btc.value && !isValidBitcoinOnchainAddress(btc.value)) {
        btc.setCustomValidity(
          'Please enter a valid Bitcoin on-chain address (legacy 1/3, segwit bc1q…, or taproot bc1p…).',
        );
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
    if (!validateAllSteps()) return;
    if (!validateFiles()) return;
    if (!validateLinkOrFileRequirements()) return;
    if (step !== steps.length) {
      setStep(steps.length);
      return;
    }

    const form = formRef.current;
    if (!form) return;

    const receipt = buildReceiptFromForm();
    if (!receipt) {
      setSubmitState({ status: 'error', message: 'Unable to prepare receipt. Please try again.' });
      return;
    }

    setSubmitState({ status: 'submitting' });
    try {
      const body = new FormData(form);
      if (TURNSTILE_SITE_KEY) {
        const token = String(body.get('cf-turnstile-response') ?? '').trim();
        if (!token) {
          setSubmitState({
            status: 'error',
            message: 'Please complete the anti-spam verification (Turnstile) and try again.',
          });
          return;
        }
      }
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
        if (msg) throw new Error(msg);
        throw new Error(
          res.status >= 500
            ? 'Server error while submitting. Please try again in a minute, or email grants@bitcoinforthearts.org.'
            : `Submission failed (HTTP ${res.status}).`,
        );
      }

      setSubmitState({ status: 'success', applicationId: data.applicationId, receipt });
      form.reset();
      setApplicantType('individual');
      setStep(1);
      clearDraft();
      refreshCharCounts();
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
        <div className="print:hidden">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Application received
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Thanks — your grant application has been submitted.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            We review applications quarterly. Processing begins in{' '}
            <span className="font-semibold text-foreground">Q3 2026</span>.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
            >
              Print / Save as PDF
            </button>
            <button
              type="button"
              onClick={() => setSubmitState({ status: 'idle' })}
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
            >
              Submit another application
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-surface p-4 text-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Confirmation ID
          </div>
          <div className="mt-1 font-semibold">{submitState.applicationId}</div>
          <div className="mt-2 text-xs text-muted">
            Receipt generated: {new Date(submitState.receipt.createdAtIso).toLocaleString()}
          </div>
        </div>

        {/* Printable receipt */}
        <div className="mt-6 print:mt-0">
          <div className="hidden print:block">
            <div className="text-sm font-semibold">Bitcoin For The Arts — Grant Application Receipt</div>
            <div className="mt-1 text-xs text-muted">
              Confirmation ID: {submitState.applicationId}
            </div>
            <div className="mt-1 text-xs text-muted">
              Receipt generated: {new Date(submitState.receipt.createdAtIso).toLocaleString()}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4">
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">Applicant</div>
              <div className="mt-2 text-sm">
                <div><span className="font-semibold">Name:</span> {submitState.receipt.applicant.legalName || '—'}</div>
                <div><span className="font-semibold">Email:</span> {submitState.receipt.applicant.email || '—'}</div>
                {submitState.receipt.applicant.phone ? (
                  <div><span className="font-semibold">Phone:</span> {submitState.receipt.applicant.phone}</div>
                ) : null}
                <div>
                  <span className="font-semibold">US-based activities:</span>{' '}
                  {submitState.receipt.eligibility.usProjectOnly ? 'Yes' : 'No'}
                </div>
                <div><span className="font-semibold">Applicant type:</span> {submitState.receipt.applicant.applicantType || '—'}</div>
                {submitState.receipt.applicant.ein ? (
                  <div><span className="font-semibold">EIN:</span> {submitState.receipt.applicant.ein}</div>
                ) : null}
                {submitState.receipt.applicant.nonprofitOrSponsor ? (
                  <div><span className="font-semibold">Nonprofit/Sponsor:</span> {submitState.receipt.applicant.nonprofitOrSponsor}</div>
                ) : null}
                <div><span className="font-semibold">Disciplines:</span> {submitState.receipt.applicant.disciplines.join(', ') || '—'}</div>
                <div><span className="font-semibold">BTC address:</span> {submitState.receipt.applicant.btcAddress || '—'}</div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-background p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">Project</div>
              <div className="mt-2 text-sm">
                <div><span className="font-semibold">Title:</span> {submitState.receipt.project.title || '—'}</div>
                <div className="mt-2"><span className="font-semibold">Summary:</span></div>
                <pre className="mt-1 whitespace-pre-wrap text-sm">{submitState.receipt.project.summary || '—'}</pre>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-background p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">Attachments (references)</div>
              <div className="mt-2 text-sm">
                {submitState.receipt.attachments.fiscalSponsorAgreementLink ? (
                  <div><span className="font-semibold">Sponsor agreement link:</span> {submitState.receipt.attachments.fiscalSponsorAgreementLink}</div>
                ) : null}
                {submitState.receipt.attachments.artSamplesLinks ? (
                  <div className="mt-2">
                    <div className="font-semibold">Samples links:</div>
                    <pre className="mt-1 whitespace-pre-wrap text-sm">{submitState.receipt.attachments.artSamplesLinks}</pre>
                  </div>
                ) : null}
                {submitState.receipt.attachments.uploadedFileNames.length ? (
                  <div className="mt-2">
                    <div className="font-semibold">Uploaded filenames:</div>
                    <ul className="mt-1 list-disc pl-5">
                      {submitState.receipt.attachments.uploadedFileNames.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="mt-2 text-muted">—</div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-background p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">Certification</div>
              <div className="mt-2 text-sm">
                <div><span className="font-semibold">Agreed to terms:</span> {submitState.receipt.certification.agreeTerms ? 'Yes' : 'No'}</div>
                <div><span className="font-semibold">Agreed to legal assurances:</span> {submitState.receipt.certification.agreeLegal ? 'Yes' : 'No'}</div>
                <div><span className="font-semibold">Signature:</span> {submitState.receipt.certification.legalSignatureName || '—'}</div>
                <div><span className="font-semibold">Date:</span> {submitState.receipt.certification.legalSignatureDate || '—'}</div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-xs text-muted print:mt-4">
            This receipt is for your records. If you need to update your application, email grants@bitcoinforthearts.org and include your confirmation ID.
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onInputCapture={() => {
        // Ensure paste/autofill clears any previous submission error.
        if (submitState.status === 'error') setSubmitState({ status: 'idle' });
      }}
      onPasteCapture={(e) => {
        if (submitState.status === 'error') setSubmitState({ status: 'idle' });
        const target = e.target;
        // Pasting fires before the value is committed; re-check validity right after.
        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement
        ) {
          setTimeout(() => target.checkValidity(), 0);
        }
      }}
      onInput={(e) => {
        // Clear the browser "invalid" highlight as soon as text is entered/pasted.
        const target = e.target;
        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement
        ) {
          target.setCustomValidity('');
          // Update validity state without forcing a popup.
          target.checkValidity();
        }
        // Auto-save draft on changes (debounced).
        scheduleDraftSave();
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
          const max = typeof target.maxLength === 'number' ? target.maxLength : -1;
          if (
            max > 0 &&
            target.name &&
            Object.prototype.hasOwnProperty.call(CHAR_LIMITS, target.name)
          ) {
            const maxAllowed = CHAR_LIMITS[target.name] ?? max;
            setCharCounts((prev) => ({
              ...prev,
              [target.name]: Math.min(maxAllowed, target.value.length),
            }));
          }
        }
      }}
      className="rounded-3xl border border-border bg-background p-6 pb-28 sm:p-8 sm:pb-28"
    >
      {TURNSTILE_SITE_KEY ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      ) : null}
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

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-muted">
          Drafts are saved locally in your browser (no uploads). You’ll need to reattach any PDFs before submitting.
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={saveDraftNow}
            disabled={isSubmitting}
            className={[
              'inline-flex min-h-10 items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-xs font-semibold transition-colors',
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface',
            ].join(' ')}
          >
            Save draft
          </button>
          <button
            type="button"
            onClick={clearDraft}
            disabled={isSubmitting}
            className={[
              'inline-flex min-h-10 items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-xs font-semibold transition-colors',
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface',
            ].join(' ')}
          >
            Clear draft
          </button>
        </div>
      </div>

      {draftNotice ? (
        <div className="mt-4 rounded-xl border border-border bg-surface p-4 text-xs text-muted">
          {draftNotice.loaded ? (
            <span>
              Draft restored from{' '}
              <span className="font-semibold text-foreground">
                {new Date(draftNotice.savedAt).toLocaleString()}
              </span>
              .
            </span>
          ) : (
            <span>
              Draft saved at{' '}
              <span className="font-semibold text-foreground">
                {new Date(draftNotice.savedAt).toLocaleString()}
              </span>
              .
            </span>
          )}
        </div>
      ) : null}

      {submitState.status === 'error' ? (
        <div
          role="alert"
          aria-live="polite"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          {submitState.message}
        </div>
      ) : null}

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
                // Allow viewing any section without completing prior sections.
                setStep(s.id);
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
        data-step="1"
        disabled={isSubmitting}
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
              pattern={BITCOIN_ADDRESS_PATTERN}
              className="min-h-12 rounded-md border border-border bg-background px-3 py-2"
              placeholder="bc1q…, bc1p…, 1…, or 3…"
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
                disabled={!isOrg || isSubmitting}
                className="min-h-12 rounded-md border border-border bg-background px-3 py-2"
                placeholder="Example: 501(c)(3) status, or sponsor name + relationship"
              />
            </label>

            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="flex items-center justify-between gap-3 text-sm font-semibold">
                <span>
                  EIN <span className="text-accent">*</span>
                </span>
                <InfoTip text="For organizations/collectives: provide your EIN (format 12-3456789). If you have a fiscal sponsor, use the sponsor EIN." />
              </span>
              <input
                name="ein"
                required={isOrg}
                disabled={!isOrg || isSubmitting}
                className="min-h-12 rounded-md border border-border bg-background px-3 py-2"
                placeholder="12-3456789"
                inputMode="numeric"
              />
            </label>

            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="flex items-center justify-between gap-3 text-sm font-semibold">
                <span>
                  Fiscal Sponsor Agreement (PDF or link) <span className="text-accent">*</span>
                </span>
                <InfoTip text="Provide either a PDF under 3MB OR a share link (Drive/Dropbox/website). One of the two is required for organizations/collectives." />
              </span>
              <input
                name="fiscalSponsorAgreement"
                type="file"
                multiple
                accept="application/pdf"
                required={false}
                disabled={!isOrg || isSubmitting}
                className="rounded-md border border-border bg-background px-3 py-3"
              />
              <span className="text-xs text-muted">
                You can select multiple PDFs. Keep each file under {MAX_FILE_MB}MB. Otherwise paste a link below.
              </span>
            </label>

            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="flex items-center justify-between gap-3 text-sm font-semibold">
                <span>
                  Fiscal Sponsor Agreement Link (if not uploading)
                </span>
                <InfoTip text="Use a share link that can be opened by the grants team (Drive/Dropbox/website). Avoid expiring links." />
              </span>
              <textarea
                name="fiscalSponsorAgreementLink"
                rows={2}
                disabled={!isOrg || isSubmitting}
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
              'Digital',
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
          <input name="usProjectOnly" type="checkbox" required className="mt-1 h-4 w-4" />
          <span>
            I confirm the activities funded by this BFTA grant will be performed in the{' '}
            <span className="font-semibold text-foreground">United States</span>. The artist/applicant does not need
            to be a U.S. resident. <span className="text-accent">*</span>
          </span>
        </label>

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
        data-step="2"
        disabled={isSubmitting}
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
            <div className="text-xs text-muted text-right">
              {(charCounts.projectSummary ?? 0)}/{CHAR_LIMITS.projectSummary}
            </div>
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
            <div className="text-xs text-muted text-right">
              {(charCounts.projectDescription ?? 0)}/{CHAR_LIMITS.projectDescription}
            </div>
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
            <div className="text-xs text-muted text-right">
              {(charCounts.impact ?? 0)}/{CHAR_LIMITS.impact}
            </div>
          </label>
        </div>
      </fieldset>

      {/* Section 3 */}
      <fieldset
        data-step="3"
        disabled={isSubmitting}
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
            <div className="text-xs text-muted text-right">
              {(charCounts.fundUse ?? 0)}/{CHAR_LIMITS.fundUse}
            </div>
          </label>
        </div>
      </fieldset>

      {/* Section 4 */}
      <fieldset
        data-step="4"
        disabled={isSubmitting}
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
            <div className="text-xs text-muted text-right">
              {(charCounts.bio ?? 0)}/{CHAR_LIMITS.bio}
            </div>
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
            <div className="text-xs text-muted text-right">
              {(charCounts.accomplishments ?? 0)}/{CHAR_LIMITS.accomplishments}
            </div>
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
            <div className="text-xs text-muted text-right">
              {(charCounts.equityInclusion ?? 0)}/{CHAR_LIMITS.equityInclusion}
            </div>
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
            <div className="text-xs text-muted text-right">
              {(charCounts.evaluationPlan ?? 0)}/{CHAR_LIMITS.evaluationPlan}
            </div>
          </label>
        </div>
      </fieldset>

      {/* Section 5 */}
      <fieldset
        data-step="5"
        disabled={isSubmitting}
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
            <div className="text-xs text-muted text-right">
              {(charCounts.reportingPlan ?? 0)}/{CHAR_LIMITS.reportingPlan}
            </div>
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
        data-step="6"
        disabled={isSubmitting}
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
              Upload resume and/or portfolio (PDFs) (optional, under {MAX_FILE_MB}MB each)
            </span>
            <input
              name="portfolioResume"
              type="file"
              multiple
              required={false}
              accept="application/pdf"
              onChange={() => {
                if (submitState.status === 'error') setSubmitState({ status: 'idle' });
                validateFiles();
              }}
              className="rounded-md border border-border bg-background px-3 py-3"
            />
            <span className="text-xs text-muted">
              You can select multiple PDFs. Keep each file under {MAX_FILE_MB}MB.
            </span>
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
              By submitting, you agree to the Grant Terms & Conditions (including the oversight and reporting requirements
              described in this application).
            </p>
            <label className="mt-3 flex items-start gap-3">
              <input name="agreeTerms" type="checkbox" required className="mt-1 h-4 w-4" />
              <span>
                I agree to the{' '}
                <a
                  href="/resources/grants/grant-terms.pdf?v=20260109"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-4"
                >
                  Grant Terms & Conditions
                </a>
                . <span className="text-accent">*</span>
              </span>
            </label>

            <div className="mt-5 border-t border-border pt-4">
              <div className="flex items-center justify-between gap-3">
                <div className="font-semibold">
                  Legal assurances <span className="text-accent">*</span>
                </div>
                <InfoTip text="This is NEA-style compliance language to protect applicants and BFTA. It does not require you to submit KYC; it confirms you will follow applicable laws and use funds as described." />
              </div>

              <div className="mt-3 max-h-64 overflow-auto rounded-xl border border-border bg-background p-4 text-xs leading-relaxed text-muted">
                <div className="font-semibold text-foreground">
                  Assurance of Compliance and Legal Certifications
                </div>
                <p className="mt-2">
                  By submitting this application, the applicant certifies and assures Bitcoin For The Arts (BFTA) that:
                </p>
                <ol className="mt-2 list-decimal space-y-2 pl-5">
                  <li>
                    <span className="font-semibold text-foreground">Compliance with applicable laws:</span> You will comply with
                    relevant laws and regulations, and funds will not be used for unlawful purposes.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">US-based project activities:</span> You certify the activities funded by
                    this grant will be performed in the United States, as required for eligibility.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Nondiscrimination & accessibility:</span> You will not discriminate
                    in project execution. Projects should be accessible where feasible (e.g., digital accessibility).
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Use of funds:</span> BTC grant funds will be used only for the described
                    arts project, not for lobbying/political activity or unrelated personal expenses. You acknowledge BTC volatility risks.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Tax & reporting obligations:</span> You are responsible for applicable tax
                    reporting related to receiving BTC grants.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">IP & originality:</span> You own or have rights to the work and will not
                    infringe third-party rights.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Record-keeping:</span> You will maintain records for at least three (3) years
                    and provide them to BFTA upon request for audit/verification.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Ethical standards:</span> You commit to ethical practices and avoiding conflicts
                    of interest.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Consequences:</span> For non-compliance, BFTA may withhold funds, terminate the
                    grant, request repayment, or take other actions.
                  </li>
                </ol>
                <p className="mt-3">
                  <span className="font-semibold text-foreground">Applicant certification:</span> I certify the above statements are true and agree
                  to these terms.
                </p>
              </div>

              <label className="mt-4 flex items-start gap-3">
                <input
                  name="agreeLegal"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4"
                />
                <span>
                  I agree to the above legal assurances. <span className="text-accent">*</span>
                </span>
              </label>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold">
                    Digital signature (type full name) <span className="text-accent">*</span>
                  </span>
                  <input
                    name="legalSignatureName"
                    required
                    className="min-h-12 rounded-md border border-border bg-background px-3 py-2"
                    placeholder="Your full legal name"
                    autoComplete="name"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold">Date</span>
                  <input
                    name="legalSignatureDate"
                    value={legalSignedOn}
                    readOnly
                    className="min-h-12 rounded-md border border-border bg-background px-3 py-2 text-muted"
                  />
                </label>
              </div>
              <input
                type="hidden"
                name="legalAssurancesVersion"
                value={String(LEGAL_ASSURANCES_VERSION)}
              />

              {TURNSTILE_SITE_KEY ? (
                <div className="mt-5 border-t border-border pt-4">
                  <div className="font-semibold">
                    Spam protection <span className="text-accent">*</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Please complete the anti-spam verification to submit your application.
                  </p>
                  <div className="mt-3 flex justify-center">
                    <div
                      className="cf-turnstile"
                      data-sitekey={TURNSTILE_SITE_KEY}
                      data-theme="auto"
                      data-size="flexible"
                      data-action="grants_apply"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </fieldset>

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

