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
  signalId?: string;
  isAdult?: boolean;
  roles?: string[];
  availability?: string[];
  shiftLength?: string;
  transportation?: string;
  tshirtSize?: string;
  skills?: string;
  website?: string;
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

// Field names below MUST match the column headers of the "MBS Vol" table
// in Airtable EXACTLY. Airtable rejects the whole record write with 422 if
// any field name is unknown, so keep this list in sync with the table.
type AirtableFields = {
  'Full Name': string;
  Email: string;
  Phone?: string;
  'Signal ID'?: string;
  '18 or older'?: boolean;
  'Roles of interest'?: string[];
  'Days available'?: string[];
  'Preferred shift length'?: string;
  Transportation?: string;
  'T-shirt size'?: string;
  'About and experience'?: string;
};

async function writeToAirtable(fields: AirtableFields) {
  const pat = getEnv('AIRTABLE_PAT');
  const baseId = getEnv('AIRTABLE_BASE_ID');
  if (!pat || !baseId) {
    return { ok: false as const, skipped: true, reason: 'missing_airtable_config' };
  }

  const tableName = getEnv('AIRTABLE_VOLUNTEERS_TABLE') ?? 'MBS Vol';
  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

  const cleanFields: Record<string, unknown> = {
    'Full Name': fields['Full Name'],
    Email: fields.Email,
  };
  if (fields.Phone) cleanFields.Phone = fields.Phone;
  if (fields['Signal ID']) cleanFields['Signal ID'] = fields['Signal ID'];
  if (typeof fields['18 or older'] === 'boolean') {
    cleanFields['18 or older'] = fields['18 or older'];
  }
  if (fields['Roles of interest']?.length) {
    cleanFields['Roles of interest'] = fields['Roles of interest'];
  }
  if (fields['Days available']?.length) {
    cleanFields['Days available'] = fields['Days available'];
  }
  if (fields['Preferred shift length']) {
    cleanFields['Preferred shift length'] = fields['Preferred shift length'];
  }
  if (fields.Transportation) cleanFields.Transportation = fields.Transportation;
  if (fields['T-shirt size']) cleanFields['T-shirt size'] = fields['T-shirt size'];
  if (fields['About and experience']) {
    cleanFields['About and experience'] = fields['About and experience'];
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${pat}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      records: [{ fields: cleanFields }],
      typecast: true,
    }),
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
  const signalId = String(body.signalId ?? '').trim();
  const isAdult = body.isAdult === true;
  const roles = Array.isArray(body.roles)
    ? body.roles.map((s) => String(s).trim()).filter(Boolean)
    : [];
  const availability = Array.isArray(body.availability)
    ? body.availability.map((s) => String(s).trim()).filter(Boolean)
    : [];
  const shiftLength = String(body.shiftLength ?? '').trim();
  const transportation = String(body.transportation ?? '').trim();
  const tshirtSize = String(body.tshirtSize ?? '').trim();
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
  if (!isAdult) {
    return NextResponse.json(
      { ok: false, error: 'Volunteers must be 18 or older.' },
      { status: 400 },
    );
  }
  if (roles.length === 0) {
    return NextResponse.json(
      { ok: false, error: 'Please choose at least one role you are interested in.' },
      { status: 400 },
    );
  }
  if (availability.length === 0) {
    return NextResponse.json(
      { ok: false, error: 'Please choose at least one day you can help.' },
      { status: 400 },
    );
  }

  const name = `${firstName} ${lastName}`;
  const now = new Date();
  const ua = req.headers.get('user-agent') ?? '';

  // 1. Airtable (primary system of record)
  try {
    const airtable = await writeToAirtable({
      'Full Name': name,
      Email: email,
      Phone: phone || undefined,
      'Signal ID': signalId || undefined,
      '18 or older': isAdult,
      'Roles of interest': roles,
      'Days available': availability,
      'Preferred shift length': shiftLength || undefined,
      Transportation: transportation || undefined,
      'T-shirt size': tshirtSize || undefined,
      'About and experience': skills || undefined,
    });
    if (!airtable.ok && !airtable.skipped) {
      console.error('[midwest-volunteer] airtable write failed', airtable);
    }
  } catch (err) {
    console.error('[midwest-volunteer] airtable write threw', err);
  }

  // 2. MongoDB (backup so submissions are never lost if Airtable is down)
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
            signalId: signalId || undefined,
            isAdult,
            roles,
            availability,
            shiftLength: shiftLength || undefined,
            transportation: transportation || undefined,
            tshirtSize: tshirtSize || undefined,
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

  // 3. Email notification to the volunteer coordinator inbox
  const toEmail =
    getEnv('VOLUNTEER_TO_EMAIL') ??
    getEnv('NEWSLETTER_TO_EMAIL') ??
    'volunteer@bitcoinforthearts.org';
  const subject = `New Midwest volunteer: ${name}`.slice(0, 200);
  const text = [
    'New Midwest Bitcoin Summit volunteer signup (bitcoinforthearts.org/midwest/volunteer)',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    signalId ? `Signal ID: ${signalId}` : null,
    `18 or older: ${isAdult ? 'Yes' : 'No'}`,
    roles.length ? `Roles of interest: ${roles.join(', ')}` : null,
    availability.length ? `Availability: ${availability.join(', ')}` : null,
    shiftLength ? `Preferred shift length: ${shiftLength}` : null,
    transportation ? `Transportation: ${transportation}` : null,
    tshirtSize ? `T-shirt size: ${tshirtSize}` : null,
    skills ? `Notes: ${skills}` : null,
    `Time: ${now.toISOString()}`,
    `IP: ${ip}`,
    ua ? `User-Agent: ${ua}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const rows = [
    ['Name', name],
    ['Email', email],
    ...(phone ? [['Phone', phone]] : []),
    ...(signalId ? [['Signal ID', signalId]] : []),
    ['18 or older', isAdult ? 'Yes' : 'No'],
    ...(roles.length ? [['Roles of interest', roles.join(', ')]] : []),
    ...(availability.length ? [['Availability', availability.join(', ')]] : []),
    ...(shiftLength ? [['Preferred shift length', shiftLength]] : []),
    ...(transportation ? [['Transportation', transportation]] : []),
    ...(tshirtSize ? [['T-shirt size', tshirtSize]] : []),
    ...(skills ? [['Notes', skills]] : []),
    ['Time', now.toISOString()],
    ['IP', ip],
    ...(ua ? [['User-Agent', ua]] : []),
  ];

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5;">
      <h2 style="margin: 0 0 12px;">New Midwest volunteer signup</h2>
      ${rows
        .map(
          ([k, v]) =>
            `<p style="margin: 0 0 8px;"><strong>${escapeHtml(k)}:</strong> ${escapeHtml(v)}</p>`,
        )
        .join('')}
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
