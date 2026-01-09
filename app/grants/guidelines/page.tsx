import type { Metadata } from 'next';
import Link from 'next/link';
import PrintSavePdfButton from '@/components/PrintSavePdfButton';
import MobileCarousel from '@/components/MobileCarousel';

export const metadata: Metadata = {
  title: 'Grant Guidelines',
  description:
    'Detailed guidelines for applying to Bitcoin For The Arts (BFTA) grants: eligibility, what to submit, do’s and don’ts, and review rubric.',
};

const VERSION = '1.1';
const EFFECTIVE_DATE = 'January 09, 2026';
const TOC_ITEMS = [
  { href: '#program', label: '1. Program' },
  { href: '#eligibility', label: '2. Eligibility' },
  { href: '#requirements', label: '3. What to submit' },
  { href: '#tips', label: '4. Do’s & don’ts' },
  { href: '#rubric', label: '5. Review rubric' },
  { href: '#award', label: '6. Award info' },
  { href: '#reporting', label: '7. Reporting' },
  { href: '#legal', label: '8. Legal assurances' },
  { href: '#faqs', label: '9. FAQs' },
] as const;

function TocLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="rounded-md border border-border bg-background px-3 py-2 text-sm font-semibold transition-colors hover:bg-surface"
    >
      {label}
    </a>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 rounded-2xl border border-border bg-background p-6">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function Callout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-accent/40 bg-surface p-5">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}

export default function GrantGuidelinesPage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
            <Link href="/grants" className="hover:underline">
              Grants
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">Guidelines</span>
          </div>

          <div className="mt-6 rounded-3xl border border-border bg-surface/80 p-8 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  BFTA Grant Guidelines
                </h1>
                <div className="mt-4 text-sm text-muted">
                  <span className="font-semibold text-foreground">Version:</span> {VERSION}{' '}
                  <span className="text-muted">•</span>{' '}
                  <span className="font-semibold text-foreground">Effective:</span> {EFFECTIVE_DATE}
                </div>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
                  These guidelines explain eligibility, what to submit, do’s and don’ts, and how we evaluate
                  applications. To apply, use the online form at{' '}
                  <Link href="/grants/apply" className="font-semibold underline underline-offset-4">
                    /grants/apply
                  </Link>
                  .
                </p>
              </div>

              <div className="flex flex-col gap-2 print:hidden">
                <Link
                  href="/grants/apply"
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:opacity-90 border border-accent/60"
                >
                  Apply online
                </Link>
                <PrintSavePdfButton />
                <div className="text-xs text-muted">
                  Prefer a PDF? Use print → “Save as PDF”. We keep the website version as the source of truth.
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-12">
              <div className="md:col-span-7 space-y-3">
                <Callout title="Key points (read this first)">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="font-semibold text-foreground">Applicants:</span> open worldwide.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Projects:</span> funded activities must be{' '}
                      <span className="font-semibold text-foreground">US-based</span> (performed in the United States).
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Paid in Bitcoin:</span> grants are disbursed in BTC.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Reviewed quarterly:</span> processing begins{' '}
                      <span className="font-semibold text-foreground">Q3 2026</span>.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Transparency:</span> post-award reporting is required.
                    </li>
                  </ul>
                </Callout>
              </div>
              <div className="md:col-span-5 space-y-3">
                <Callout title="Questions">
                  Email{' '}
                  <a
                    href="mailto:grants@bitcoinforthearts.org"
                    className="font-semibold underline underline-offset-4"
                  >
                    grants@bitcoinforthearts.org
                  </a>{' '}
                  or use our{' '}
                  <Link href="/contact" className="font-semibold underline underline-offset-4">
                    contact form
                  </Link>
                  .
                </Callout>
                <Callout title="Grant terms">
                  The guidelines explain how to apply; the legal agreement lives in the Grant Terms & Conditions.
                  <div className="mt-3">
                    <a
                      href="/resources/grants/grant-terms.pdf?v=20260109"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-background px-5 py-2 text-sm font-semibold transition-colors hover:bg-surface"
                    >
                      View Grant Terms & Conditions (PDF)
                    </a>
                  </div>
                </Callout>
              </div>
            </div>

            <div className="mt-6 print:hidden">
              {/* Mobile: carousel for clean uniform layout */}
              <div className="md:hidden -mx-6 px-6">
                <MobileCarousel ariaLabel="Grant guidelines table of contents" className="">
                  {TOC_ITEMS.map((it) => (
                    <div
                      key={it.href}
                      data-carousel-item="true"
                      className="snap-start shrink-0 w-[86%] pr-4"
                    >
                      <TocLink href={it.href} label={it.label} />
                    </div>
                  ))}
                </MobileCarousel>
              </div>

              {/* Desktop/tablet: tidy wrap */}
              <div className="hidden md:flex flex-wrap gap-2">
                {TOC_ITEMS.map((it) => (
                  <TocLink key={it.href} href={it.href} label={it.label} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6">
            <Section id="program" title="1. Program Description">
              <p>
                Bitcoin For The Arts (BFTA) funds sovereign art with Bitcoin-native grants. We support projects that
                embody low time preference, censorship-resistant innovation, and radical transparency.
              </p>
              <p>
                Projects can span disciplines including visual arts, theater, dance, music, writing/storytelling, film,
                digital/media art, and interdisciplinary work.
              </p>
              <Callout title="Reserve model">
                Our sustainable model targets: <span className="font-semibold text-foreground">55% grants</span>,{' '}
                <span className="font-semibold text-foreground">30% programs</span>,{' '}
                <span className="font-semibold text-foreground">10% ops</span>,{' '}
                <span className="font-semibold text-foreground">5% HODL vault</span>.
              </Callout>
            </Section>

            <Section id="eligibility" title="2. Eligibility Criteria">
              <Callout title="Geographic policy (important)">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-semibold text-foreground">Artists/applicants:</span> open worldwide.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Projects:</span> the activities funded by this grant must be{' '}
                    <span className="font-semibold text-foreground">performed in the United States</span>. You must confirm this in the application.
                  </li>
                </ul>
              </Callout>

              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Individuals, collectives, and organizations may apply (organizations may need a fiscal sponsor agreement PDF under 3MB or a link).
                </li>
                <li>
                  You must provide a valid Bitcoin address for disbursement (Lightning is welcome, but not required).
                </li>
                <li>
                  You must commit to post-grant reporting for radical transparency.
                </li>
                <li>
                  You must demonstrate artistic legitimacy via prior work/portfolio links.
                </li>
              </ul>
            </Section>

            <Section id="requirements" title="3. Application Requirements (what to submit)">
              <p>
                Applications are submitted via our online multi-step form (6 steps). Drafts save locally in your browser.
              </p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Callout title="Step 1 — Applicant information">
                  Name/DBA, email, mailing address, portfolio/social links, applicant type, Bitcoin address, disciplines
                  (select at least one), and required checkboxes (US-based activities + mission alignment).
                </Callout>
                <Callout title="Step 2 — Project description">
                  Title, short summary (500 character limit), detailed description (2000 character limit), timeline,
                  venue/platform, and audience/impact (1500 character limit).
                </Callout>
                <Callout title="Step 3 — Funding & budget">
                  Requested amount, budget breakdown, and how BFTA funds will be used (1500 character limit).
                </Callout>
                <Callout title="Step 4 — Background & evaluation">
                  Bio/mission (1500 chars), accomplishments (2000 chars), equity & inclusion (1500 chars), and evaluation plan (1500 chars).
                </Callout>
                <Callout title="Step 5 — Oversight & reporting">
                  Reporting plan (1500 chars) and agreement to oversight/reporting commitments.
                </Callout>
                <Callout title="Step 6 — Attachments">
                  Optional portfolio/resume PDF (under 3MB) and sample links. For organizations, provide either a fiscal sponsor agreement PDF (under 3MB) or a link.
                </Callout>
              </div>
            </Section>

            <Section id="tips" title="4. Do’s and Don’ts (tips for successful applications)">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Callout title="Do">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Make the Bitcoin connection explicit (not implied).</li>
                    <li>Be concrete about deliverables + timeline.</li>
                    <li>Use a clear budget with line items.</li>
                    <li>Plan for transparency: what you’ll publish, when, and where.</li>
                  </ul>
                </Callout>
                <Callout title="Don’t">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Submit vague project descriptions.</li>
                    <li>Request funds for unrelated personal expenses.</li>
                    <li>Ignore required eligibility checkboxes (US-based activities, etc.).</li>
                    <li>Assume reviewers will “connect the dots” on Bitcoin alignment.</li>
                  </ul>
                </Callout>
              </div>
            </Section>

            <Section id="rubric" title="5. Review Criteria and Evaluation Rubric">
              <p>
                Applications are reviewed quarterly. We score 1–5 (1 = not competitive, 3 = competitive, 5 = exceptional)
                across these categories:
              </p>
              <div className="overflow-auto rounded-2xl border border-border bg-surface p-4">
                <table className="min-w-[700px] w-full text-left text-sm">
                  <thead className="text-xs font-semibold uppercase tracking-wide text-muted">
                    <tr>
                      <th className="py-2 pr-4">Category</th>
                      <th className="py-2 pr-4">What we look for</th>
                      <th className="py-2 pr-4">5 vs 3 vs 1</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-muted">
                    <tr className="border-t border-border">
                      <td className="py-3 pr-4 font-semibold text-foreground">Bitcoin alignment</td>
                      <td className="py-3 pr-4">Bitcoin-native execution and mission fit.</td>
                      <td className="py-3 pr-4">5 deep integration • 3 moderate • 1 unclear/none</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="py-3 pr-4 font-semibold text-foreground">Impact</td>
                      <td className="py-3 pr-4">Cultural/community benefit and clarity of outcomes.</td>
                      <td className="py-3 pr-4">5 measurable/high • 3 plausible • 1 minimal</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="py-3 pr-4 font-semibold text-foreground">Feasibility</td>
                      <td className="py-3 pr-4">Realistic plan, budget credibility, and execution capacity.</td>
                      <td className="py-3 pr-4">5 tight plan • 3 basic • 1 unrealistic</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="py-3 pr-4 font-semibold text-foreground">Transparency</td>
                      <td className="py-3 pr-4">Quality of reporting plan and audit-readiness.</td>
                      <td className="py-3 pr-4">5 public + specific • 3 basic • 1 missing</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="py-3 pr-4 font-semibold text-foreground">Overall</td>
                      <td className="py-3 pr-4">Holistic judgement (including artistic excellence).</td>
                      <td className="py-3 pr-4">5 standout • 3 solid • 1 weak</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted">
                Note: reviewers may flag eligibility/compliance concerns (e.g., projects not US-based).
              </p>
            </Section>

            <Section id="award" title="6. Award Information">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold text-foreground">Disbursement:</span> paid in BTC to the provided address.
                </li>
                <li>
                  <span className="font-semibold text-foreground">BTC volatility:</span> recipients assume volatility and custody risks.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Processing start:</span> Q3 2026.
                </li>
              </ul>
            </Section>

            <Section id="reporting" title="7. Post-Award Reporting Requirements">
              <p>
                If awarded, recipients commit to reporting for radical transparency, including a 6‑month report and a project-end report.
                Recipients should retain records for at least 3 years and provide them upon request for verification/audit.
              </p>
            </Section>

            <Section id="legal" title="8. Legal Assurances">
              <p>
                The application includes a required “Legal assurances” certification (with digital signature) covering:
                lawful use of funds, nondiscrimination, tax responsibility, IP/originality, record-keeping, and consequences of non-compliance.
              </p>
              <p>
                See the full text in the application form (Step 6 → Certification).
              </p>
            </Section>

            <Section id="faqs" title="9. FAQs">
              <p>
                Visit the Grants FAQ for quick answers:
              </p>
              <div className="print:hidden">
                <Link
                  href="/grants/faq"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-surface px-5 py-2 text-sm font-semibold transition-colors hover:opacity-90"
                >
                  Go to Grants FAQ
                </Link>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}

