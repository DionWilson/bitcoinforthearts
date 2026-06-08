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
  discipline?: string;
  phone?: string;
  website?: string;
  socialProfiles?: string;
  contactSharingConsent?: boolean;
  website_hp?: string; // honeypot
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
  Discipline: string;
  Phone?: string;
  Website?: string;
  'Social Profiles'?: string;
  'Contact Sharing Consent'?: string;
}) {
  const pat = getEnv('AIRTABLE_PAT');
  const baseId = getEnv('AIRTABLE_BASE_ID');
  if (!pat || !baseId) {
    return { ok: false as const, skipped: true, reason: 'missing_airtable_config' };
  }

  const tableName = getEnv('AIRTABLE_ARTIST_DIRECTORY_TABLE') ?? 'Artist Directory';
  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

  const cleanFields: Record<string, string> = {
    Name: fields.Name,
    Email: fields.Email,
    Discipline: fields.Discipline,
  };
  if (fields.Phone) cleanFields.Phone = fields.Phone;
  if (fields.Website) cleanFields.Website = fields.Website;
  if (fields['Social Profiles']) cleanFields['Social Profiles'] = fields['Social Profiles'];
  if (fields['Contact Sharing Consent'])
    cleanFields['Contact Sharing Consent'] = fields['Contact Sharing Consent'];

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
    console.error('[artist-directory] resend failed', resend);
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

  if (body.website_hp && String(body.website_hp).trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const firstName = String(body.firstName ?? '').trim();
  const lastName = String(body.lastName ?? '').trim();
  const email = String(body.email ?? '').trim().toLowerCase();
  const discipline = String(body.discipline ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const website = String(body.website ?? '').trim();
  const socialProfiles = String(body.socialProfiles ?? '').trim();
  const contactSharingConsent = body.contactSharingConsent === true;

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
  if (!discipline) {
    return NextResponse.json(
      { ok: false, error: 'Please tell us your art discipline.' },
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
      Discipline: discipline,
      Phone: phone || undefined,
      Website: website || undefined,
      'Social Profiles': socialProfiles || undefined,
      'Contact Sharing Consent': contactSharingConsent ? 'Yes' : 'No',
    });
    if (!airtable.ok && !airtable.skipped) {
      console.error('[artist-directory] airtable write failed', airtable);
    }
  } catch (err) {
    console.error('[artist-directory] airtable write threw', err);
  }

  // 2. MongoDB (backup)
  try {
    if (getEnv('MONGODB_URI')) {
      const db = await getMongoDb();
      await db.collection('artistDirectory').updateOne(
        { email },
        {
          $setOnInsert: { email, createdAt: now },
          $set: {
            name,
            firstName,
            lastName,
            discipline,
            phone: phone || undefined,
            website: website || undefined,
            socialProfiles: socialProfiles || undefined,
            contactSharingConsent,
            lastSeenAt: now,
            lastIp: ip,
            lastUserAgent: ua,
            source: 'artist-directory',
          },
        },
        { upsert: true },
      );
    }
  } catch (err) {
    console.error('[artist-directory] db write failed', err);
  }

  // 3. Email notification
  const toEmail =
    getEnv('ARTIST_DIRECTORY_TO_EMAIL') ??
    getEnv('NEWSLETTER_TO_EMAIL') ??
    'artists@bitcoinforthearts.org';
  const subject = `New artist directory signup: ${name}`.slice(0, 200);
  const text = [
    'New Artist Directory signup (bitcoinforthearts.org/artists/directory)',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Discipline: ${discipline}`,
    phone ? `Phone: ${phone}` : null,
    website ? `Website: ${website}` : null,
    socialProfiles ? `Social Profiles: ${socialProfiles}` : null,
    `Contact Sharing Consent: ${contactSharingConsent ? 'Yes' : 'No'}`,
    `Time: ${now.toISOString()}`,
    `IP: ${ip}`,
    ua ? `User-Agent: ${ua}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5;">
      <h2 style="margin: 0 0 12px;">New Artist Directory signup</h2>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin: 0 0 8px;"><strong>Discipline:</strong> ${escapeHtml(discipline)}</p>
      ${phone ? `<p style="margin: 0 0 8px;"><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
      ${website ? `<p style="margin: 0 0 8px;"><strong>Website:</strong> ${escapeHtml(website)}</p>` : ''}
      ${socialProfiles ? `<p style="margin: 0 0 8px;"><strong>Social Profiles:</strong> ${escapeHtml(socialProfiles)}</p>` : ''}
      <p style="margin: 0 0 8px;"><strong>Contact Sharing Consent:</strong> ${contactSharingConsent ? 'Yes' : 'No'}</p>
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
      console.error('[artist-directory] email send not ok', send);
    }
  } catch (err) {
    console.error('[artist-directory] email send failed', err);
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
