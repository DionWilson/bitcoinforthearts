import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { Document, UpdateFilter } from 'mongodb';
import { ObjectId } from 'mongodb';
import nodemailer from 'nodemailer';
import { getMongoDb } from '@/lib/mongodb';
import { createReviewToken, hashReviewToken } from '@/lib/reviewLinks';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getEnv(name: string) {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

function maskEmail(value?: string) {
  if (!value) return null;
  const at = value.indexOf('@');
  if (at <= 1) return '***';
  return `${value.slice(0, 2)}***${value.slice(at)}`;
}

function parseEmails(value: string) {
  return value
    .split(/[,\s]+/g)
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((s, idx, arr) => arr.indexOf(s) === idx);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function sendMail(args: { to: string[]; subject: string; text: string; html: string }) {
  const smtpUser = getEnv('GRANTS_SMTP_USER') ?? getEnv('CONTACT_SMTP_USER');
  const smtpPass = getEnv('GRANTS_SMTP_PASS') ?? getEnv('CONTACT_SMTP_PASS');
  const smtpHost =
    getEnv('GRANTS_SMTP_HOST') ?? getEnv('CONTACT_SMTP_HOST') ?? 'smtppro.zoho.com';
  const smtpPort = Number(getEnv('GRANTS_SMTP_PORT') ?? getEnv('CONTACT_SMTP_PORT') ?? '465');
  const smtpSecure =
    (getEnv('GRANTS_SMTP_SECURE') ?? getEnv('CONTACT_SMTP_SECURE') ?? 'true').toLowerCase() !==
    'false';

  const fromEmail =
    getEnv('GRANTS_FROM_EMAIL') ?? getEnv('CONTACT_FROM_EMAIL') ?? getEnv('RESEND_FROM_EMAIL');

  if (!smtpUser || !smtpPass || !fromEmail) {
    throw new Error('Email is not configured (missing SMTP env vars).');
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
  });
}

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// Safe config status endpoint (no secrets).
export async function GET() {
  const smtpUser = getEnv('GRANTS_SMTP_USER') ?? getEnv('CONTACT_SMTP_USER');
  const smtpPass = getEnv('GRANTS_SMTP_PASS') ?? getEnv('CONTACT_SMTP_PASS');
  const smtpHost =
    getEnv('GRANTS_SMTP_HOST') ?? getEnv('CONTACT_SMTP_HOST') ?? 'smtppro.zoho.com';
  const smtpPort = Number(getEnv('GRANTS_SMTP_PORT') ?? getEnv('CONTACT_SMTP_PORT') ?? '465');
  const smtpSecure =
    (getEnv('GRANTS_SMTP_SECURE') ?? getEnv('CONTACT_SMTP_SECURE') ?? 'true').toLowerCase() !==
    'false';
  const fromEmail =
    getEnv('GRANTS_FROM_EMAIL') ?? getEnv('CONTACT_FROM_EMAIL') ?? getEnv('RESEND_FROM_EMAIL');

  return NextResponse.json(
    {
      ok: true,
      configured: {
        email: Boolean(smtpUser) && Boolean(smtpPass) && Boolean(fromEmail),
      },
      smtp: {
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        user: maskEmail(smtpUser),
        from: maskEmail(fromEmail),
        hasPass: Boolean(smtpPass),
      },
      vercel: {
        env: process.env.VERCEL_ENV ?? null,
        url: process.env.VERCEL_URL ?? null,
      },
    },
    { status: 200 },
  );
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid application id.' },
        { status: 400 },
      );
    }

    let body: { emails?: string; message?: string; expiresDays?: number };
    try {
      body = (await req.json()) as { emails?: string; message?: string; expiresDays?: number };
    } catch {
      return NextResponse.json({ ok: false, error: 'Invalid JSON.' }, { status: 400 });
    }

    const emails = parseEmails(String(body.emails ?? ''));
    if (!emails.length) {
      return NextResponse.json(
        { ok: false, error: 'Please provide at least one email.' },
        { status: 400 },
      );
    }
    const bad = emails.filter((e) => !isEmail(e));
    if (bad.length) {
      return NextResponse.json(
        { ok: false, error: `Invalid emails: ${bad.join(', ')}` },
        { status: 400 },
      );
    }

    const expiresDays = Math.max(1, Math.min(30, Number(body.expiresDays ?? 14)));
    const token = createReviewToken();
    const tokenHash = hashReviewToken(token);
    const expiresAt = new Date(Date.now() + expiresDays * 24 * 60 * 60 * 1000);

    const db = await getMongoDb();
    const appId = new ObjectId(id);

    const doc = (await db.collection('applications').findOne({ _id: appId })) as {
      applicant?: { legalName?: string };
      project?: { title?: string };
    } | null;
    if (!doc) {
      return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
    }

    const baseUrl =
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
      'https://bitcoinforthearts.org';
    const reviewUrl = `${baseUrl}/review/${token}`;

    const update: UpdateFilter<Document> = {
      $set: { updatedAt: new Date() },
      // Typed loosely since the collection schema is application-specific.
      $push: {
        reviewShares: {
          tokenHash,
          createdAt: new Date(),
          expiresAt,
          sentTo: emails,
          message: (body.message ?? '').toString().slice(0, 2000) || null,
        },
      } as unknown as Document,
    };

    await db.collection('applications').updateOne({ _id: appId }, update);

    const subject = `BFTA grant application for review: ${doc?.applicant?.legalName ?? doc?.project?.title ?? id}`.slice(
      0,
      200,
    );

    const msg = (body.message ?? '').toString().trim();
    const text = [
      'Bitcoin For The Arts — grant application review request',
      '',
      `Applicant: ${doc?.applicant?.legalName ?? ''}`,
      `Project: ${doc?.project?.title ?? ''}`,
      '',
      msg ? `Message:\n${msg}\n` : '',
      `Review link (expires in ${expiresDays} days):`,
      reviewUrl,
      '',
      'Note: this link provides read-only access to the application.',
    ]
      .filter(Boolean)
      .join('\n');

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5;">
        <h2 style="margin: 0 0 12px;">BFTA grant application — review request</h2>
        <p style="margin: 0 0 6px;"><strong>Applicant:</strong> ${escapeHtml(doc?.applicant?.legalName ?? '')}</p>
        <p style="margin: 0 0 6px;"><strong>Project:</strong> ${escapeHtml(doc?.project?.title ?? '')}</p>
        ${
          msg
            ? `<p style="margin: 12px 0 6px;"><strong>Message:</strong></p><pre style="white-space: pre-wrap; background: #f6f6f6; padding: 12px; border-radius: 8px;">${escapeHtml(
                msg,
              )}</pre>`
            : ''
        }
        <p style="margin: 14px 0 6px;"><strong>Review link (expires in ${escapeHtml(
          String(expiresDays),
        )} days):</strong></p>
        <p style="margin: 0;"><a href="${escapeHtml(reviewUrl)}">${escapeHtml(reviewUrl)}</a></p>
        <p style="margin: 14px 0 0; color: #666; font-size: 12px;">Read-only link for reviewers.</p>
      </div>
    `.trim();

    await sendMail({ to: emails, subject, text, html });

    return NextResponse.json(
      { ok: true, reviewUrl, expiresAt: expiresAt.toISOString() },
      { status: 200 },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Server error.';
    console.error('[review-share] failed', err);
    const status =
      msg.includes('Missing REVIEW_LINK_SECRET') || msg.includes('Email is not configured')
        ? 503
        : 500;
    return NextResponse.json({ ok: false, error: msg }, { status });
  }
}

