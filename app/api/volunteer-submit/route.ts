import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getMongoDb } from '@/lib/mongodb';

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

// Best-effort in-memory rate limit (resets per server instance).
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 20;
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

function requireString(obj: Record<string, unknown>, key: string, label: string) {
  const v = String(obj[key] ?? '').trim();
  if (!v) throw new Error(`Missing required field: ${label}.`);
  return v;
}

async function sendVolunteerEmail(args: { subject: string; text: string; replyTo?: string }) {
  const smtpUser =
    getEnv('VOLUNTEER_SMTP_USER') ??
    getEnv('GRANTS_SMTP_USER') ??
    getEnv('CONTACT_SMTP_USER');
  const smtpPass =
    getEnv('VOLUNTEER_SMTP_PASS') ??
    getEnv('GRANTS_SMTP_PASS') ??
    getEnv('CONTACT_SMTP_PASS');
  const smtpHost =
    getEnv('VOLUNTEER_SMTP_HOST') ??
    getEnv('GRANTS_SMTP_HOST') ??
    getEnv('CONTACT_SMTP_HOST') ??
    'smtp.zoho.com';
  const smtpPort = Number(
    getEnv('VOLUNTEER_SMTP_PORT') ??
      getEnv('GRANTS_SMTP_PORT') ??
      getEnv('CONTACT_SMTP_PORT') ??
      '465',
  );
  const smtpSecure =
    (getEnv('VOLUNTEER_SMTP_SECURE') ??
      getEnv('GRANTS_SMTP_SECURE') ??
      getEnv('CONTACT_SMTP_SECURE') ??
      'true').toLowerCase() !== 'false';

  const fromEmail =
    getEnv('VOLUNTEER_FROM_EMAIL') ??
    getEnv('GRANTS_FROM_EMAIL') ??
    getEnv('CONTACT_FROM_EMAIL');

  if (!smtpUser || !smtpPass || !fromEmail) {
    console.warn('[volunteer] email not configured; skipping notification');
    return;
  }

  const to = getEnv('VOLUNTEER_TO_EMAIL') ?? 'volunteers@bitcoinforthearts.org';

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: smtpUser, pass: smtpPass },
  });

  await transporter.sendMail({
    from: fromEmail,
    to,
    subject: args.subject,
    text: args.text,
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
    return NextResponse.json({ ok: false, error: 'Invalid origin.' }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON.' }, { status: 400 });
  }

  if (String(body.company ?? '').trim()) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  try {
    const name = requireString(body, 'name', 'Name').slice(0, 200);
    const email = requireString(body, 'email', 'Email').slice(0, 300);
    const roleRaw = String(body.role ?? 'individual');
    const role =
      roleRaw === 'corporation' || roleRaw === 'nonprofit_org' ? roleRaw : 'individual';
    const message = String(body.message ?? '').trim().slice(0, 5000);

    const now = new Date();
    const db = await getMongoDb();
    await db.collection('volunteers').insertOne({
      createdAt: now,
      name,
      email,
      role,
      message: message || null,
      meta: {
        ip,
        userAgent: req.headers.get('user-agent') ?? null,
      },
    });

    const subject = `New volunteer interest: ${name}`.slice(0, 200);
    const text = [
      'New volunteer interest submitted via bitcoinforthearts.org',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Role: ${role}`,
      message ? `Message:\n${message}` : 'Message: (none)',
      '',
      `IP: ${ip}`,
    ].join('\n');

    // Non-blocking email
    sendVolunteerEmail({ subject, text, replyTo: email }).catch((err) => {
      console.error('[volunteer] email send failed', err);
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Invalid submission.' },
      { status: 400 },
    );
  }
}

