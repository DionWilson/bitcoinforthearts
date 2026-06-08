import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getMongoDb } from '@/lib/mongodb';
import { formatFrom, sendResendEmail } from '@/lib/resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Body = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  availability?: string[];
  skills?: string;
  website?: string; // honeypot
};

function getEnv(name: string) {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

function getClientIp(req: NextRequest) {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]?.trim() || 'unknown';
  return req.headers.get('x-real-ip') ?? 'unknown';
}

function isEmail(value: string) {
  const v = value.trim();
  if (!v) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 10;
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

/* ------------------------------------------------------------------ */
/*  Airtable                                                          */
/* ------------------------------------------------------------------ */

async function writeToAirtable(fields: {
  Name: string;
  Email: string;
  Phone?: string;
  Availability?: string;
  Skills?: string;
}) {
  const pat = getEnv('AIRTABLE_PAT');
  const baseId = getEnv('AIRTABLE_BASE_ID');
  if (!pat || !baseId) {
    return { ok: false as const, skipped: true, reason: 'missing_airtable_config' };
  }

  const tableName = getEnv('AIRTABLE_VOLUNTEERS_TABLE') ?? 'Volunteers';
  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

  const cleanFields: Record<string, string> = {
    Name: fields.Name,
    Email: fields.Email,
  };
  if (fields.Phone) cleanFields.Phone = fields.Phone;
  if (fields.Availability) cleanFields.Availability = fields.Availability;
  if (fields.Skills) cleanFields.Skills = fields.Skills;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${pat}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ records: [{ fields: cleanFields }] }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    return {
      ok: false as const,
      skipped: false,
      reason: `airtable_http_${res.status}`,
      error: body.slice(0, 2000),
    };
  }

  return { ok: true as const, skipped: false };
}

/* ------------------------------------------------------------------ */
/*  Email notification                                                */
/* ------------------------------------------------------------------ */

async function sendNotification(args: {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
}) {
  const resend = await sendResendEmail({
    to: args.to,
    subject: args.subject,
    text: args.text,
    html: args.html,
    replyTo: args.replyTo,
    fromEmail: getEnv('RESEND_FROM_EMAIL') ?? getEnv('CONTACT_FROM_EMAIL'),
  });
  if (resend.ok) return { ok: true as const, provider: 'resend' as const };
  if (!resend.skipped) {
    console.error('[midwest-volunteer] resend failed', resend);
  }

  const smtpUser = getEnv('CONTACT_SMTP_USER');
  const smtpPass = getEnv('CONTACT_SMTP_PASS');
  const smtpHost = getEnv('CONTACT_SMTP_HOST') ?? 'smtp.zoho.com';
  const smtpPort = Number(getEnv('CONTACT_SMTP_PORT') ?? '587');
  const smtpSecure = getEnv('CONTACT_SMTP_SECURE') === 'true' || smtpPort === 465;
  const fromEmail = getEnv('CONTACT_FROM_EMAIL') ?? getEnv('RESEND_FROM_EMAIL');

  if (!smtpUser || !smtpPass || !fromEmail) {
    return { ok: false as const, error: 'Email delivery is not configured yet.' };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: smtpUser, pass: smtpPass },
  });

  await transporter.sendMail({
    from: formatFrom(fromEmail),
    to: args.to,
    subject: args.subject,
    text: args.text,
    ...(args.html ? { html: args.html } : null),
    ...(args.replyTo ? { replyTo: args.replyTo } : null),
  });

  return { ok: true as const, provider: 'smtp' as const };
}

/* ------------------------------------------------------------------ */
/*  Handler                                                           */
/* ------------------------------------------------------------------ */

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!rateLimitOk(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  if (body.website && String(body.website).trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const firstName = String(body.firstName ?? '').trim();
  const lastName = String(body.lastName ?? '').trim();
  const email = String(body.email ?? '').trim().toLowerCase();
  const phone = String(body.phone ?? '').trim();
  const availability = Array.isArray(body.availability)
    ? body.availability
        .map((s) => String(s).trim())
        .filter(Boolean)
        .join(', ')
    : '';
  const skills = String(body.skills ?? '').trim();

  if (!firstName || !lastName) {
    return NextResponse.json(
      { ok: false, error: 'Please enter your first and last name.' },
      { status: 400 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: 'Please enter a valid email address.' },
      { status: 400 },
    );
  }

  const name = `${firstName} ${lastName}`;
  const now = new Date();
  const ua = req.headers.get('user-agent') ?? '';

  // 1. Airtable (primary)
  try {
    const airtable = await writeToAirtable({
      Name: name,
      Email: email,
      Phone: phone || undefined,
      Availability: availability || undefined,
      Skills: skills || undefined,
    });
    if (!airtable.ok && !airtable.skipped) {
      console.error('[midwest-volunteer] airtable write failed', airtable);
    }
  } catch (err) {
    console.error('[midwest-volunteer] airtable write threw', err);
  }

  // 2. MongoDB (backup)
  try {
    if (getEnv('MONGODB_URI')) {
      const db = await getMongoDb();
      await db.collection('midwestVolunteers').updateOne(
        { email },
        {
          $setOnInsert: { email, createdAt: now },
          $set: {
            name,
            firstName,
            lastName,
            phone: phone || undefined,
            availability: availability || undefined,
            skills: skills || undefined,
            lastSeenAt: now,
            lastIp: ip,
            lastUserAgent: ua,
            source: 'midwest',
          },
        },
        { upsert: true },
      );
    }
  } catch (err) {
    console.error('[midwest-volunteer] db write failed', err);
  }

  // 3. Email notification
  const toEmail =
    getEnv('VOLUNTEER_TO_EMAIL') ??
    getEnv('NEWSLETTER_TO_EMAIL') ??
    'volunteer@bitcoinforthearts.org';
  const subject = `New Midwest volunteer: ${name}`.slice(0, 200);
  const text = [
    'New Midwest Bitcoin Summit volunteer signup (bitcoinforthearts.org/midwest)',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    availability ? `Availability: ${availability}` : null,
    skills ? `Skills/Notes: ${skills}` : null,
    `Time: ${now.toISOString()}`,
    `IP: ${ip}`,
    ua ? `User-Agent: ${ua}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5;">
      <h2 style="margin: 0 0 12px;">New Midwest volunteer signup</h2>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p style="margin: 0 0 8px;"><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
      ${availability ? `<p style="margin: 0 0 8px;"><strong>Availability:</strong> ${escapeHtml(availability)}</p>` : ''}
      ${skills ? `<p style="margin: 0 0 8px;"><strong>Skills/Notes:</strong> ${escapeHtml(skills)}</p>` : ''}
      <p style="margin: 0 0 8px;"><strong>Time:</strong> ${escapeHtml(now.toISOString())}</p>
      <p style="margin: 0 0 8px;"><strong>IP:</strong> ${escapeHtml(ip)}</p>
      ${ua ? `<p style="margin: 0 0 0;"><strong>User-Agent:</strong> ${escapeHtml(ua)}</p>` : ''}
    </div>
  `.trim();

  try {
    const send = await sendNotification({
      to: toEmail,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (!send.ok) {
      console.error('[midwest-volunteer] email send not ok', send);
    }
  } catch (err) {
    console.error('[midwest-volunteer] email send failed', err);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
