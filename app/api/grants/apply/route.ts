import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import busboy from 'busboy';
import { Readable } from 'node:stream';
import { ObjectId, GridFSBucket } from 'mongodb';
import nodemailer from 'nodemailer';
import { getMongoDb } from '@/lib/mongodb';
import { isValidBitcoinOnchainAddress } from '@/lib/bitcoinAddress';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const LEGAL_ASSURANCES_VERSION = 2;

// Vercel/Next deployments commonly enforce a small max request body size.
// Keep uploads conservative to avoid HTTP 413 (Payload Too Large).
const MAX_REQUEST_FILE_BYTES = 3 * 1024 * 1024; // 3MB per file (safe default)

function getEnv(name: string) {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

function getClientIp(req: NextRequest) {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]?.trim() || 'unknown';
  return req.headers.get('x-real-ip') ?? 'unknown';
}

function getBaseUrl(req: NextRequest) {
  const proto = req.headers.get('x-forwarded-proto') ?? 'https';
  const host = req.headers.get('host');
  if (host) return `${proto}://${host}`;
  return 'https://bitcoinforthearts.org';
}

function isAllowedOrigin(req: NextRequest) {
  const origin = req.headers.get('origin') ?? '';
  const referer = req.headers.get('referer') ?? '';
  const host = req.headers.get('host') ?? '';

  // Allow local dev.
  const allowLocal =
    origin.startsWith('http://localhost') ||
    origin.startsWith('http://127.0.0.1') ||
    referer.startsWith('http://localhost') ||
    referer.startsWith('http://127.0.0.1');
  if (allowLocal) return true;

  const primary = 'https://bitcoinforthearts.org';
  const primaryWww = 'https://www.bitcoinforthearts.org';
  const vercel =
    process.env.VERCEL_URL && process.env.VERCEL_URL.trim()
      ? `https://${process.env.VERCEL_URL.trim()}`
      : null;

  const fromHost = host ? `https://${host}` : null;
  const allowed = [primary, primaryWww, vercel, fromHost].filter(Boolean) as string[];
  if (!origin && !referer) return true; // Some clients omit these; don't hard-fail.

  // Also allow Vercel preview domains for this project (when host is *.vercel.app).
  const allowVercelPreview =
    (host.endsWith('.vercel.app') && (origin.startsWith(`https://${host}`) || referer.startsWith(`https://${host}`))) ||
    origin.endsWith('.vercel.app') ||
    referer.includes('.vercel.app');

  if (allowVercelPreview) return true;

  return allowed.some((a) => origin.startsWith(a) || referer.startsWith(a));
}

// Best-effort in-memory rate limit (resets per server instance).
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 12;
const rateLimit = new Map<string, number[]>();
function rateLimitOk(ip: string) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = rateLimit.get(ip) ?? [];
  const recent = timestamps.filter((t) => t > windowStart);
  if (recent.length >= RATE_LIMIT_MAX) return false;
  recent.push(now);
  rateLimit.set(ip, recent);
  return true;
}

type UploadedFile = {
  fileId: ObjectId;
  fieldName: string;
  filename: string;
  mimeType: string;
  size: number;
};

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function requireString(fields: Record<string, string>, key: string, label: string) {
  const val = (fields[key] ?? '').trim();
  if (!val) throw new Error(`Missing required field: ${label}.`);
  return val;
}

function requireCheckbox(fields: Record<string, string>, key: string, label: string) {
  const val = (fields[key] ?? '').trim();
  if (!val) throw new Error(`Missing required checkbox: ${label}.`);
  return true;
}

function parseNumberOrThrow(value: string, label: string) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) throw new Error(`Invalid number for ${label}.`);
  return n;
}

function normalizeEin(input: string) {
  const digits = input.replace(/\D/g, '');
  if (digits.length !== 9) return null;
  return `${digits.slice(0, 2)}-${digits.slice(2)}`;
}

async function verifyTurnstile(args: {
  secret: string;
  token: string;
  ip: string;
}) {
  try {
    const body = new URLSearchParams();
    body.set('secret', args.secret);
    body.set('response', args.token);
    if (args.ip && args.ip !== 'unknown') body.set('remoteip', args.ip);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    });
    const data = (await res.json().catch(() => null)) as
      | {
          success: boolean;
          'error-codes'?: string[];
          challenge_ts?: string;
          hostname?: string;
          action?: string;
          cdata?: string;
        }
      | null;
    if (!res.ok || !data) {
      return {
        ok: false as const,
        errorCodes: ['turnstile_fetch_failed'],
        hostname: null,
        action: null,
        cdata: null,
        challengeTs: null,
      };
    }
    return {
      ok: Boolean(data.success),
      errorCodes: Array.isArray(data['error-codes']) ? data['error-codes'].slice(0, 10) : [],
      hostname: typeof data.hostname === 'string' ? data.hostname : null,
      action: typeof data.action === 'string' ? data.action : null,
      cdata: typeof data.cdata === 'string' ? data.cdata : null,
      challengeTs: typeof data.challenge_ts === 'string' ? data.challenge_ts : null,
    };
  } catch (err) {
    console.error('[grants] turnstile verify error', err);
    return {
      ok: false as const,
      errorCodes: ['turnstile_exception'],
      hostname: null,
      action: null,
      cdata: null,
      challengeTs: null,
    };
  }
}

async function sendEmailNotification(args: {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  const smtpUser = getEnv('GRANTS_SMTP_USER') ?? getEnv('CONTACT_SMTP_USER');
  const smtpPass = getEnv('GRANTS_SMTP_PASS') ?? getEnv('CONTACT_SMTP_PASS');
  const smtpHost = getEnv('GRANTS_SMTP_HOST') ?? getEnv('CONTACT_SMTP_HOST') ?? 'smtp.zoho.com';
  const smtpPort = Number(getEnv('GRANTS_SMTP_PORT') ?? getEnv('CONTACT_SMTP_PORT') ?? '465');
  const smtpSecure =
    (getEnv('GRANTS_SMTP_SECURE') ?? getEnv('CONTACT_SMTP_SECURE') ?? 'true').toLowerCase() !==
    'false';

  const fromEmail =
    getEnv('GRANTS_FROM_EMAIL') ?? getEnv('CONTACT_FROM_EMAIL') ?? getEnv('RESEND_FROM_EMAIL');
  if (!smtpUser || !smtpPass || !fromEmail) {
    // If SMTP isn't configured, don't hard-fail the application submission.
    console.warn('[grants] email not configured; skipping notification');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: smtpUser, pass: smtpPass },
  });

  await transporter.sendMail({
    from: fromEmail,
    to: args.to,
    subject: args.subject,
    text: args.text,
    html: args.html,
    replyTo: args.replyTo,
  });
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!rateLimitOk(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  if (!isAllowedOrigin(req)) {
    return NextResponse.json(
      { ok: false, error: 'Invalid origin.' },
      { status: 403 },
    );
  }

  const turnstileSecret = getEnv('TURNSTILE_SECRET_KEY');
  const turnstileSiteKey = getEnv('NEXT_PUBLIC_TURNSTILE_SITE_KEY');

  const contentType = req.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('multipart/form-data')) {
    return NextResponse.json(
      { ok: false, error: 'Invalid request: expected multipart form data.' },
      { status: 400 },
    );
  }

  let db: Awaited<ReturnType<typeof getMongoDb>>;
  let bucket: GridFSBucket;
  try {
    db = await getMongoDb();
    bucket = new GridFSBucket(db, { bucketName: 'grantUploads' });
  } catch (err) {
    console.error('[grants] database connection failed', err);
    return NextResponse.json(
      {
        ok: false,
        error:
          'Grant applications are temporarily unavailable (database not configured or unreachable). Please try again later or email grants@bitcoinforthearts.org.',
      },
      { status: 503 },
    );
  }

  const fields: Record<string, string> = {};
  const disciplines: string[] = [];
  const uploads: UploadedFile[] = [];
  const errors: string[] = [];
  let hitLimit = false;

  const limits = {
    // Keep this conservative for serverless.
    fileSize: MAX_REQUEST_FILE_BYTES,
    files: 10,
    fields: 200,
  };

  const bb = busboy({ headers: Object.fromEntries(req.headers.entries()), limits });

  const fileWrites: Promise<void>[] = [];

  bb.on('field', (name, value) => {
    if (name === 'discipline[]') {
      const v = String(value ?? '').trim();
      if (v) disciplines.push(v);
      return;
    }
    fields[name] = String(value ?? '');
  });

  bb.on('file', (fieldName, file, info) => {
    const filename = info.filename || 'upload';
    const mimeType = info.mimeType || 'application/octet-stream';

    // Basic allowlist per field.
    const isPdf = mimeType === 'application/pdf';
    const allowedField =
      fieldName === 'portfolioResume' || fieldName === 'fiscalSponsorAgreement';

    if (!allowedField) {
      errors.push('Only PDF uploads are accepted. Please use links for large samples.');
      file.resume();
      return;
    }

    if (fieldName === 'portfolioResume' || fieldName === 'fiscalSponsorAgreement') {
      if (!isPdf) {
        errors.push(`${fieldName}: must be a PDF.`);
        file.resume();
        return;
      }
    }

    const id = new ObjectId();
    const uploadStream = bucket.openUploadStreamWithId(id, filename, {
      metadata: {
        fieldName,
        mimeType,
        uploadedAt: new Date(),
      },
    });

    let size = 0;
    file.on('data', (chunk: Buffer) => {
      size += chunk.length;
    });
    file.on('limit', () => {
      hitLimit = true;
      errors.push(
        `Upload too large. Please keep each file under ${Math.floor(
          MAX_REQUEST_FILE_BYTES / (1024 * 1024),
        )}MB.`,
      );
      file.unpipe(uploadStream);
      uploadStream.destroy(new Error('File too large'));
      file.resume();
    });

    const p = new Promise<void>((resolve) => {
      uploadStream.on('finish', () => {
        uploads.push({ fileId: id, fieldName, filename, mimeType, size });
        resolve();
      });
      uploadStream.on('error', () => resolve());
      file.on('error', () => resolve());
    });

    file.pipe(uploadStream);
    fileWrites.push(p);
  });

  const done = new Promise<void>((resolve, reject) => {
    bb.on('finish', () => resolve());
    bb.on('error', (err) => reject(err));
  });

  // Pipe request body to busboy (Node runtime).
  if (!req.body) {
    return NextResponse.json(
      { ok: false, error: 'Empty request body.' },
      { status: 400 },
    );
  }

  // Next's Request body is a web ReadableStream; coerce for Node stream piping.
  const bodyStream = Readable.fromWeb(
    req.body as unknown as import('node:stream/web').ReadableStream<Uint8Array>,
  );
  bodyStream.pipe(bb);

  try {
    await done;
    await Promise.all(fileWrites);
  } catch (err) {
    console.error('[grants] multipart parse failed', err);
    return NextResponse.json(
      { ok: false, error: 'Invalid upload. Please try again.' },
      { status: 400 },
    );
  }

  // Honeypot
  if ((fields.company ?? '').trim()) {
    return NextResponse.json({ ok: true, applicationId: 'suppressed' }, { status: 200 });
  }

  let turnstileMeta:
    | {
        ok: boolean;
        hostname: string | null;
        action: string | null;
        challengeTs: string | null;
        errorCodes: string[];
      }
    | null = null;

  if (turnstileSecret && turnstileSiteKey) {
    const token = (fields['cf-turnstile-response'] ?? '').trim();
    if (!token) {
      await Promise.allSettled(uploads.map((u) => bucket.delete(u.fileId)));
      return NextResponse.json(
        { ok: false, error: 'Please complete the anti-spam verification and try again.' },
        { status: 400 },
      );
    }

    const result = await verifyTurnstile({ secret: turnstileSecret, token, ip });
    turnstileMeta = {
      ok: result.ok,
      hostname: result.hostname,
      action: result.action,
      challengeTs: result.challengeTs,
      errorCodes: result.errorCodes,
    };

    if (!result.ok) {
      await Promise.allSettled(uploads.map((u) => bucket.delete(u.fileId)));
      return NextResponse.json(
        {
          ok: false,
          error: 'Anti-spam verification failed. Please reload the page and try again.',
        },
        { status: 403 },
      );
    }
  } else if (turnstileSecret || turnstileSiteKey) {
    console.warn('[grants] turnstile partially configured; skipping enforcement');
  }

  if (errors.length) {
    // Cleanup orphaned uploads
    await Promise.allSettled(uploads.map((u) => bucket.delete(u.fileId)));
    return NextResponse.json(
      { ok: false, error: errors.slice(0, 3).join(' ') },
      { status: hitLimit ? 413 : 400 },
    );
  }

  try {
    const applicantType = requireString(fields, 'applicantType', 'Applicant Type');
    const isOrg = applicantType === 'organization';

    // Required fields
    const legalName = requireString(fields, 'legalName', 'Legal Name or DBA');
    const email = requireString(fields, 'email', 'Email');
    const mailingAddress = requireString(fields, 'mailingAddress', 'Mailing Address');
    const links = requireString(fields, 'links', 'Links');
    const btcAddress = requireString(fields, 'btcAddress', 'Bitcoin Address');
    if (!isValidBitcoinOnchainAddress(btcAddress)) {
      throw new Error(
        'Bitcoin wallet address format looks invalid. Please use an on-chain address (legacy 1/3, segwit bc1q…, or taproot bc1p…).',
      );
    }

    if (disciplines.length < 1) {
      throw new Error('Please select at least one artistic discipline.');
    }

    if (isOrg) {
      requireString(fields, 'nonprofitOrSponsor', 'Nonprofit Status or Fiscal Sponsor');
      const einRaw = requireString(fields, 'ein', 'EIN');
      const ein = normalizeEin(einRaw);
      if (!ein) throw new Error('EIN must be 9 digits (format 12-3456789).');

      const hasSponsorPdf = uploads.some((u) => u.fieldName === 'fiscalSponsorAgreement');
      const sponsorLink = (fields.fiscalSponsorAgreementLink ?? '').trim();
      if (!hasSponsorPdf && !sponsorLink) {
        throw new Error(
          'Fiscal Sponsor Agreement is required for organizations (upload a PDF under 3MB, or provide a link).',
        );
      }
    }

    requireCheckbox(fields, 'missionAligned', 'Mission alignment');
    requireCheckbox(fields, 'usProjectOnly', 'US-based activities');
    requireCheckbox(fields, 'agreeOversight', 'Oversight agreement');
    requireCheckbox(fields, 'agreeTerms', 'Terms agreement');
    requireCheckbox(fields, 'agreeLegal', 'Legal assurances');
    const legalSignatureName = requireString(fields, 'legalSignatureName', 'Legal signature');
    const legalAssurancesVersionRaw = (fields.legalAssurancesVersion ?? '').trim();
    const legalAssurancesVersion =
      legalAssurancesVersionRaw && Number.isFinite(Number(legalAssurancesVersionRaw))
        ? Number(legalAssurancesVersionRaw)
        : LEGAL_ASSURANCES_VERSION;

    const projectTitle = requireString(fields, 'projectTitle', 'Project Title');
    const projectSummary = requireString(fields, 'projectSummary', 'Project Summary');
    if (projectSummary.length > 500) throw new Error('Project Summary exceeds 500 characters.');

    const projectDescription = requireString(fields, 'projectDescription', 'Detailed Description');
    if (projectDescription.length > 2000) throw new Error('Detailed Description exceeds 2000 characters.');

    const timeline = requireString(fields, 'timeline', 'Timeline');
    const venuePlatform = requireString(fields, 'venuePlatform', 'Venue/Platform');

    const impact = requireString(fields, 'impact', 'Impact');
    if (impact.length > 1500) throw new Error('Impact exceeds 1500 characters.');

    const requestedAmount = parseNumberOrThrow(
      requireString(fields, 'requestedAmount', 'Requested Grant Amount'),
      'Requested Grant Amount',
    );

    const budgetBreakdown = requireString(fields, 'budgetBreakdown', 'Budget Breakdown');
    const fundUse = requireString(fields, 'fundUse', 'How BFTA Funds Will Be Used');
    if (fundUse.length > 1500) throw new Error('How BFTA Funds Will Be Used exceeds 1500 characters.');

    const bio = requireString(fields, 'bio', 'Mission Statement or Bio');
    if (bio.length > 1500) throw new Error('Bio exceeds 1500 characters.');
    const accomplishments = requireString(fields, 'accomplishments', 'History and Key Accomplishments');
    if (accomplishments.length > 2000) throw new Error('Accomplishments exceeds 2000 characters.');
    const equityInclusion = requireString(fields, 'equityInclusion', 'Equity and Inclusion Statement');
    if (equityInclusion.length > 1500) throw new Error('Equity and Inclusion exceeds 1500 characters.');
    const evaluationPlan = requireString(fields, 'evaluationPlan', 'Evaluation Plan');
    if (evaluationPlan.length > 1500) throw new Error('Evaluation Plan exceeds 1500 characters.');

    const reportingPlan = requireString(fields, 'reportingPlan', 'Post-Grant Reporting Plan');
    if (reportingPlan.length > 1500) throw new Error('Reporting Plan exceeds 1500 characters.');

    const artSamplesLinks = (fields.artSamplesLinks ?? '').trim();

    const applicationId = new ObjectId();
    const now = new Date();

    await db.collection('applications').insertOne({
      _id: applicationId,
      createdAt: now,
      updatedAt: now,
      status: 'submitted',
      eligibility: {
        usProjectOnly: true,
      },
      applicant: {
        legalName,
        email,
        phone: (fields.phone ?? '').trim() || null,
        mailingAddress,
        links,
        applicantType,
        ein: isOrg ? normalizeEin(fields.ein ?? '') : null,
        nonprofitOrSponsor: isOrg ? (fields.nonprofitOrSponsor ?? '').trim() : null,
        disciplines,
        btcAddress,
        missionAligned: true,
      },
      project: {
        title: projectTitle,
        summary: projectSummary,
        description: projectDescription,
        timeline,
        venuePlatform,
        impact,
      },
      funding: {
        requestedAmount,
        budgetBreakdown,
        fundUse,
      },
      background: {
        bio,
        accomplishments,
        equityInclusion,
        evaluationPlan,
      },
      oversight: {
        reportingPlan,
        agreeOversight: true,
      },
      certification: {
        agreeTerms: true,
        legal: {
          agreed: true,
          version: legalAssurancesVersion,
          signatureName: legalSignatureName.slice(0, 200),
          signedAt: now,
          clientDate: (fields.legalSignatureDate ?? '').trim() || null,
        },
      },
      uploads: uploads.map((u) => ({
        fileId: u.fileId,
        fieldName: u.fieldName,
        filename: u.filename,
        mimeType: u.mimeType,
        size: u.size,
      })),
      links: {
        fiscalSponsorAgreement: isOrg
          ? (fields.fiscalSponsorAgreementLink ?? '').trim() || null
          : null,
        artSamples: artSamplesLinks || null,
      },
      meta: {
        ip,
        userAgent: req.headers.get('user-agent') ?? null,
        vercelEnv: process.env.VERCEL_ENV ?? null,
        turnstile: turnstileMeta,
      },
    });

    // Email summary (safe: no file contents, but include download URLs by id).
    const to = getEnv('GRANTS_TO_EMAIL') ?? 'grants@bitcoinforthearts.org';
    const baseUrl = getBaseUrl(req);
    const downloadLinks = uploads
      .map(
        (u) =>
          `${u.fieldName}: ${baseUrl}/api/grants/files/${u.fileId.toString()} (${u.filename})`,
      )
      .join('\n');

    const linkBlock = [
      isOrg && (fields.fiscalSponsorAgreementLink ?? '').trim()
        ? `fiscalSponsorAgreementLink: ${(fields.fiscalSponsorAgreementLink ?? '').trim()}`
        : null,
      artSamplesLinks ? `artSamplesLinks:\n${artSamplesLinks}` : null,
    ]
      .filter(Boolean)
      .join('\n\n');

    const subject = `New grant application: ${legalName}`.slice(0, 200);
    const text = [
      'New grant application submitted via bitcoinforthearts.org',
      '',
      `Application ID: ${applicationId.toString()}`,
      `Name/DBA: ${legalName}`,
      `Applicant type: ${applicantType}`,
      `US-based activities: yes`,
      isOrg ? `EIN: ${normalizeEin(fields.ein ?? '') ?? ''}` : null,
      `Email: ${email}`,
      `Disciplines: ${disciplines.join(', ')}`,
      `Project title: ${projectTitle}`,
      `Requested amount: ${requestedAmount}`,
      '',
      'Uploads:',
      downloadLinks || '(none)',
      '',
      'Links:',
      linkBlock || '(none)',
      '',
      `IP: ${ip}`,
    ]
      .filter((x) => x !== null)
      .join('\n');

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5;">
        <h2 style="margin: 0 0 12px;">New grant application</h2>
        <p style="margin: 0 0 6px;"><strong>Application ID:</strong> ${escapeHtml(applicationId.toString())}</p>
        <p style="margin: 0 0 6px;"><strong>Name/DBA:</strong> ${escapeHtml(legalName)}</p>
        <p style="margin: 0 0 6px;"><strong>Applicant type:</strong> ${escapeHtml(applicantType)}</p>
        <p style="margin: 0 0 6px;"><strong>US-based activities:</strong> yes</p>
        <p style="margin: 0 0 6px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p style="margin: 0 0 6px;"><strong>Disciplines:</strong> ${escapeHtml(disciplines.join(', '))}</p>
        <p style="margin: 0 0 6px;"><strong>Project title:</strong> ${escapeHtml(projectTitle)}</p>
        <p style="margin: 0 0 6px;"><strong>Requested amount:</strong> ${escapeHtml(String(requestedAmount))}</p>
        <h3 style="margin: 16px 0 8px;">Uploads</h3>
        <pre style="white-space: pre-wrap; background: #f6f6f6; padding: 12px; border-radius: 8px;">${escapeHtml(
          downloadLinks || '(none)',
        )}</pre>
        <h3 style="margin: 16px 0 8px;">Links</h3>
        <pre style="white-space: pre-wrap; background: #f6f6f6; padding: 12px; border-radius: 8px;">${escapeHtml(
          linkBlock || '(none)',
        )}</pre>
        <p style="margin: 16px 0 0; color: #666; font-size: 12px;">IP: ${escapeHtml(ip)}</p>
      </div>
    `.trim();

    try {
      await sendEmailNotification({ to, subject, text, html, replyTo: email });
    } catch (emailErr) {
      // Don't block submissions if SMTP is misconfigured.
      console.error('[grants] email notification failed', emailErr);
      await db.collection('applications').updateOne(
        { _id: applicationId },
        {
          $set: {
            emailNotification: {
              ok: false,
              failedAt: new Date(),
              error:
                emailErr instanceof Error ? emailErr.message : 'Unknown email error',
            },
          },
        },
      );
    }

    // Applicant confirmation email (non-blocking).
    const applicantSubject = 'BFTA grant application received';
    const applicantText = [
      'Bitcoin For The Arts — application received',
      '',
      `Confirmation ID: ${applicationId.toString()}`,
      '',
      'Thanks for applying to Bitcoin For The Arts (BFTA). We fund Bitcoin-aligned arts projects and disburse grants in BTC.',
      '',
      'What happens next:',
      '- Applications are reviewed quarterly.',
      '- Processing begins in Q3 2026.',
      '- If selected, you’ll be asked for simple post-grant reporting (6 months + project end) for transparency.',
      '',
      'If you need to update your application, reply to this email and include your confirmation ID.',
      '',
      'Bitcoin For The Arts',
      'https://bitcoinforthearts.org',
    ].join('\n');

    const applicantHtml = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5;">
        <h2 style="margin: 0 0 12px;">Application received</h2>
        <p style="margin: 0 0 8px;">Thanks for applying to <strong>Bitcoin For The Arts (BFTA)</strong>.</p>
        <p style="margin: 0 0 8px;"><strong>Confirmation ID:</strong> ${escapeHtml(
          applicationId.toString(),
        )}</p>
        <p style="margin: 16px 0 8px;"><strong>What happens next</strong></p>
        <ul style="margin: 0 0 0 18px; padding: 0;">
          <li>Applications are reviewed quarterly.</li>
          <li>Processing begins in <strong>Q3 2026</strong>.</li>
          <li>If selected, you’ll submit a simple post-grant report (6 months + project end) to support radical transparency.</li>
        </ul>
        <p style="margin: 16px 0 0;">If you need to update your application, reply to this email and include your confirmation ID.</p>
        <p style="margin: 14px 0 0; color: #666; font-size: 12px;">
          Sent from <a href="https://bitcoinforthearts.org">bitcoinforthearts.org</a>
        </p>
      </div>
    `.trim();

    try {
      await sendEmailNotification({
        to: email,
        subject: applicantSubject,
        text: applicantText,
        html: applicantHtml,
        replyTo: to,
      });
      await db.collection('applications').updateOne(
        { _id: applicationId },
        { $set: { applicantConfirmation: { ok: true, sentAt: new Date() } } },
      );
    } catch (emailErr) {
      console.error('[grants] applicant confirmation email failed', emailErr);
      await db.collection('applications').updateOne(
        { _id: applicationId },
        {
          $set: {
            applicantConfirmation: {
              ok: false,
              failedAt: new Date(),
              error: emailErr instanceof Error ? emailErr.message : 'Unknown email error',
            },
          },
        },
      );
    }

    return NextResponse.json(
      { ok: true, applicationId: applicationId.toString() },
      { status: 200 },
    );
  } catch (err) {
    console.error('[grants] validation/storage failed', err);
    // Cleanup orphaned uploads if we failed after upload
    await Promise.allSettled(uploads.map((u) => bucket.delete(u.fileId)));
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Invalid submission.' },
      { status: 400 },
    );
  }
}

// Safe config status endpoint (no secrets).
export async function GET() {
  const smtpUser = getEnv('GRANTS_SMTP_USER') ?? getEnv('CONTACT_SMTP_USER');
  const smtpPass = getEnv('GRANTS_SMTP_PASS') ?? getEnv('CONTACT_SMTP_PASS');
  const fromEmail =
    getEnv('GRANTS_FROM_EMAIL') ?? getEnv('CONTACT_FROM_EMAIL') ?? getEnv('RESEND_FROM_EMAIL');
  const turnstileSecret = getEnv('TURNSTILE_SECRET_KEY');
  const turnstileSiteKey = getEnv('NEXT_PUBLIC_TURNSTILE_SITE_KEY');

  let mongoOk = false;
  try {
    await getMongoDb();
    mongoOk = true;
  } catch {
    mongoOk = false;
  }

  return NextResponse.json(
    {
      ok: true,
      configured: {
        mongo: mongoOk,
        email: Boolean(smtpUser) && Boolean(smtpPass) && Boolean(fromEmail),
        turnstile: Boolean(turnstileSecret) && Boolean(turnstileSiteKey),
      },
      vercel: {
        env: process.env.VERCEL_ENV ?? null,
        url: process.env.VERCEL_URL ?? null,
      },
    },
    { status: 200 },
  );
}

