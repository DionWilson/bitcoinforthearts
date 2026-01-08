import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import busboy from 'busboy';
import { Readable } from 'node:stream';
import { ObjectId, GridFSBucket } from 'mongodb';
import nodemailer from 'nodemailer';
import { getMongoDb } from '@/lib/mongodb';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BTC_ADDRESS_REGEX = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/;

function getEnv(name: string) {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

function getClientIp(req: NextRequest) {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]?.trim() || 'unknown';
  return req.headers.get('x-real-ip') ?? 'unknown';
}

// Best-effort in-memory rate limit (resets per server instance).
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
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

async function sendEmailNotification(args: {
  to: string;
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

  const contentType = req.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('multipart/form-data')) {
    return NextResponse.json(
      { ok: false, error: 'Invalid request: expected multipart form data.' },
      { status: 400 },
    );
  }

  const db = await getMongoDb();
  const bucket = new GridFSBucket(db, { bucketName: 'grantUploads' });

  const fields: Record<string, string> = {};
  const disciplines: string[] = [];
  const uploads: UploadedFile[] = [];
  const errors: string[] = [];

  const limits = {
    // Keep this conservative for serverless.
    fileSize: 25 * 1024 * 1024, // 25MB (portfolio PDFs can be big; samples have their own checks)
    files: 25,
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
    const isDocx =
      mimeType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    const isDoc = mimeType === 'application/msword';
    const isImage = mimeType.startsWith('image/');
    const isVideo = mimeType.startsWith('video/');

    if (fieldName === 'portfolioResume' || fieldName === 'fiscalSponsorAgreement') {
      if (!isPdf) {
        errors.push(`${fieldName}: must be a PDF.`);
        file.resume();
        return;
      }
    }

    if (fieldName === 'supportMaterials') {
      if (!(isPdf || isDocx || isDoc)) {
        errors.push('supportMaterials: must be PDF or DOC/DOCX.');
        file.resume();
        return;
      }
    }

    if (fieldName === 'artSamples') {
      if (!(isImage || isVideo)) {
        errors.push('artSamples: must be image or video.');
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
      // Enforce 5MB per artistic sample.
      if (fieldName === 'artSamples' && size > 5 * 1024 * 1024) {
        errors.push(`artSamples: ${filename} exceeds 5MB limit.`);
        file.unpipe(uploadStream);
        uploadStream.destroy(new Error('File too large'));
        file.resume();
      }
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

  if (errors.length) {
    return NextResponse.json(
      { ok: false, error: errors.slice(0, 3).join(' ') },
      { status: 400 },
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
    if (!BTC_ADDRESS_REGEX.test(btcAddress)) {
      throw new Error('Bitcoin wallet address format looks invalid.');
    }

    if (disciplines.length < 1) {
      throw new Error('Please select at least one artistic discipline.');
    }

    if (isOrg) {
      requireString(fields, 'nonprofitOrSponsor', 'Nonprofit Status or Fiscal Sponsor');
      const hasSponsorPdf = uploads.some((u) => u.fieldName === 'fiscalSponsorAgreement');
      if (!hasSponsorPdf) throw new Error('Fiscal Sponsor Agreement (PDF) is required for organizations.');
    }

    requireCheckbox(fields, 'missionAligned', 'Mission alignment');
    requireCheckbox(fields, 'agreeOversight', 'Oversight agreement');
    requireCheckbox(fields, 'agreeTerms', 'Terms agreement');

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

    const hasPortfolio = uploads.some((u) => u.fieldName === 'portfolioResume');
    if (!hasPortfolio) throw new Error('Portfolio/Resume (PDF) is required.');

    const applicationId = new ObjectId();
    const now = new Date();

    await db.collection('applications').insertOne({
      _id: applicationId,
      createdAt: now,
      updatedAt: now,
      status: 'submitted',
      applicant: {
        legalName,
        email,
        phone: (fields.phone ?? '').trim() || null,
        mailingAddress,
        links,
        applicantType,
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
      },
      uploads: uploads.map((u) => ({
        fileId: u.fileId,
        fieldName: u.fieldName,
        filename: u.filename,
        mimeType: u.mimeType,
        size: u.size,
      })),
      meta: {
        ip,
        userAgent: req.headers.get('user-agent') ?? null,
        vercelEnv: process.env.VERCEL_ENV ?? null,
      },
    });

    // Email summary (safe: no file contents, but include download URLs by id).
    const to = getEnv('GRANTS_TO_EMAIL') ?? 'grants@bitcoinforthearts.org';
    const baseUrl = (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ?? 'https://bitcoinforthearts.org';
    const downloadLinks = uploads
      .map((u) => `${u.fieldName}: ${baseUrl}/api/grants/files/${u.fileId.toString()} (${u.filename})`)
      .join('\n');

    const subject = `New grant application: ${legalName}`.slice(0, 200);
    const text = [
      'New grant application submitted via bitcoinforthearts.org',
      '',
      `Application ID: ${applicationId.toString()}`,
      `Name/DBA: ${legalName}`,
      `Applicant type: ${applicantType}`,
      `Email: ${email}`,
      `Disciplines: ${disciplines.join(', ')}`,
      `Project title: ${projectTitle}`,
      `Requested amount: ${requestedAmount}`,
      '',
      'Uploads:',
      downloadLinks || '(none)',
      '',
      `IP: ${ip}`,
    ].join('\n');

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5;">
        <h2 style="margin: 0 0 12px;">New grant application</h2>
        <p style="margin: 0 0 6px;"><strong>Application ID:</strong> ${escapeHtml(applicationId.toString())}</p>
        <p style="margin: 0 0 6px;"><strong>Name/DBA:</strong> ${escapeHtml(legalName)}</p>
        <p style="margin: 0 0 6px;"><strong>Applicant type:</strong> ${escapeHtml(applicantType)}</p>
        <p style="margin: 0 0 6px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p style="margin: 0 0 6px;"><strong>Disciplines:</strong> ${escapeHtml(disciplines.join(', '))}</p>
        <p style="margin: 0 0 6px;"><strong>Project title:</strong> ${escapeHtml(projectTitle)}</p>
        <p style="margin: 0 0 6px;"><strong>Requested amount:</strong> ${escapeHtml(String(requestedAmount))}</p>
        <h3 style="margin: 16px 0 8px;">Uploads</h3>
        <pre style="white-space: pre-wrap; background: #f6f6f6; padding: 12px; border-radius: 8px;">${escapeHtml(
          downloadLinks || '(none)',
        )}</pre>
        <p style="margin: 16px 0 0; color: #666; font-size: 12px;">IP: ${escapeHtml(ip)}</p>
      </div>
    `.trim();

    await sendEmailNotification({ to, subject, text, html, replyTo: email });

    return NextResponse.json(
      { ok: true, applicationId: applicationId.toString() },
      { status: 200 },
    );
  } catch (err) {
    console.error('[grants] validation/storage failed', err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Invalid submission.' },
      { status: 400 },
    );
  }
}

