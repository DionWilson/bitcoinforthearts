import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { sendResendEmail } from '@/lib/resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getEnv(name: string) {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

function getClientIp(req: NextRequest) {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]?.trim() || 'unknown';
  return req.headers.get('x-real-ip') ?? 'unknown';
}

function isAllowedOrigin(req: NextRequest) {
  const origin = req.headers.get('origin') ?? '';
  const referer = req.headers.get('referer') ?? '';
  const host = req.headers.get('host') ?? '';

  const allowLocal =
    origin.startsWith('http://localhost') ||
    origin.startsWith('http://127.0.0.1') ||
    referer.startsWith('http://localhost') ||
    referer.startsWith('http://127.0.0.1');
  if (allowLocal) return true;

  const primary = 'https://bitcoinforthearts.org';
  const primaryWww = 'https://www.bitcoinforthearts.org';
  const fromHost = host ? `https://${host}` : null;
  const allowed = [primary, primaryWww, fromHost].filter(Boolean) as string[];
  if (!origin && !referer) return true;
  return allowed.some((a) => origin.startsWith(a) || referer.startsWith(a));
}

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 8;
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

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function sendThankYouMessageEmail(args: {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  const fromEmail =
    getEnv('DONATE_FROM_EMAIL') ??
    getEnv('CONTACT_FROM_EMAIL') ??
    getEnv('RESEND_FROM_EMAIL') ??
    getEnv('FEEDBACK_FROM_EMAIL');

  const resendAttempt = await sendResendEmail({
    to: args.to,
    subject: args.subject,
    text: args.text,
    html: args.html,
    replyTo: args.replyTo,
    fromEmail,
  });
  if (resendAttempt.ok) return { ok: true as const, provider: 'resend' as const };

  const smtpUser =
    getEnv('DONATE_SMTP_USER') ?? getEnv('CONTACT_SMTP_USER') ?? getEnv('FEEDBACK_SMTP_USER');
  const smtpPass =
    getEnv('DONATE_SMTP_PASS') ?? getEnv('CONTACT_SMTP_PASS') ?? getEnv('FEEDBACK_SMTP_PASS');
  const smtpHost =
    getEnv('DONATE_SMTP_HOST') ??
    getEnv('CONTACT_SMTP_HOST') ??
    getEnv('FEEDBACK_SMTP_HOST') ??
    'smtp.zoho.com';
  const smtpPort = Number(
    getEnv('DONATE_SMTP_PORT') ?? getEnv('CONTACT_SMTP_PORT') ?? getEnv('FEEDBACK_SMTP_PORT') ?? '465',
  );
  const smtpSecure =
    (
      getEnv('DONATE_SMTP_SECURE') ??
      getEnv('CONTACT_SMTP_SECURE') ??
      getEnv('FEEDBACK_SMTP_SECURE') ??
      'true'
    ).toLowerCase() !== 'false';

  if (!smtpUser || !smtpPass || !fromEmail) {
    return { ok: false as const, skipped: true as const, error: 'Email not configured.' };
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

  return { ok: true as const, provider: 'smtp' as const };
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
    return NextResponse.json({ ok: false, error: 'Invalid origin.' }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON.' }, { status: 400 });
  }

  // Honeypot
  if (String(body.company ?? '').trim()) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = String(body.name ?? '').trim().slice(0, 120);
  const email = String(body.email ?? '').trim().slice(0, 300);
  const message = String(body.message ?? '').trim().slice(0, 5000);
  const orderId = String(body.orderId ?? '').trim().slice(0, 120) || null;

  if (!message) {
    return NextResponse.json({ ok: false, error: 'Please enter a message.' }, { status: 400 });
  }
  if (email && !isEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Email looks invalid.' }, { status: 400 });
  }

  const to =
    getEnv('DONATE_THANK_YOU_TO_EMAIL') ??
    getEnv('DONATE_TO_EMAIL') ??
    'hello@bitcoinforthearts.org';

  const subject = `Donation thank-you message${orderId ? ` (${orderId})` : ''}`.slice(0, 200);
  const text = [
    'New message from a donor on the thank-you page',
    '',
    orderId ? `Zaprite order ID: ${orderId}` : 'Zaprite order ID: (not provided)',
    name ? `Name: ${name}` : 'Name: (not provided)',
    email ? `Email: ${email}` : 'Email: (not provided)',
    '',
    'Message:',
    message,
    '',
    `IP: ${ip}`,
  ].join('\n');

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5;">
      <h2 style="margin: 0 0 12px;">Donor thank-you message</h2>
      <p style="margin: 0 0 6px;"><strong>Order ID:</strong> ${escapeHtml(orderId ?? '(not provided)')}</p>
      <p style="margin: 0 0 6px;"><strong>Name:</strong> ${escapeHtml(name || '(not provided)')}</p>
      <p style="margin: 0 0 12px;"><strong>Email:</strong> ${escapeHtml(email || '(not provided)')}</p>
      <h3 style="margin: 16px 0 8px;">Message</h3>
      <pre style="white-space: pre-wrap; background: #f6f6f6; padding: 12px; border-radius: 8px;">${escapeHtml(message)}</pre>
      <p style="margin: 16px 0 0; color: #666; font-size: 12px;">IP: ${escapeHtml(ip)}</p>
    </div>
  `.trim();

  try {
    const sent = await sendThankYouMessageEmail({
      to,
      subject,
      text,
      html,
      replyTo: email || undefined,
    });
    if (!sent.ok) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'We could not send your message right now. Please email hello@bitcoinforthearts.org directly.',
        },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('[donate/thank-you-message]', err);
    return NextResponse.json(
      {
        ok: false,
        error:
          'We could not send your message right now. Please email hello@bitcoinforthearts.org directly.',
      },
      { status: 502 },
    );
  }
}
