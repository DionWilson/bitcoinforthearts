import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getAuctionLot, formatSats } from '@/lib/midwest-auction-lots';
import { getMongoDb } from '@/lib/mongodb';
import { formatFrom, sendResendEmail } from '@/lib/resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  slug?: string;
  bidSats?: number | string;
  willAttend?: boolean;
  notes?: string;
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

function parseBidSats(value: number | string | undefined): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.floor(value);
  }
  if (typeof value === 'string') {
    const cleaned = value.replace(/[,\s_]/g, '').replace(/sats?/i, '').trim();
    if (!cleaned) return null;
    const n = Number(cleaned);
    if (!Number.isFinite(n)) return null;
    return Math.floor(n);
  }
  return null;
}

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
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

/* ------------------------------------------------------------------ */
/*  Airtable                                                          */
/* ------------------------------------------------------------------ */

// Field names MUST match the "MBS Advance Bids" table column headers
// exactly. Create the table once in the existing BFTA base; Airtable
// rejects the whole write with 422 if any field name is unknown.
// Use typecast so Status single-select options can be created on write.
type AirtableFields = {
  'Full Name': string;
  Email: string;
  Phone?: string;
  'Lot Code': string;
  'Lot Title': string;
  Artist: string;
  'Bid Sats': number;
  'Opening Bid Sats'?: number;
  'Will Attend Midwest': boolean;
  Notes?: string;
  Source: string;
  Status: string;
};

async function writeToAirtable(fields: AirtableFields) {
  const pat = getEnv('AIRTABLE_PAT');
  const baseId = getEnv('AIRTABLE_BASE_ID');
  if (!pat || !baseId) {
    return { ok: false as const, skipped: true, reason: 'missing_airtable_config' };
  }

  const tableName = getEnv('AIRTABLE_ADVANCE_BIDS_TABLE') ?? 'MBS Advance Bids';
  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

  const cleanFields: Record<string, unknown> = {
    'Full Name': fields['Full Name'],
    Email: fields.Email,
    'Lot Code': fields['Lot Code'],
    'Lot Title': fields['Lot Title'],
    Artist: fields.Artist,
    'Bid Sats': fields['Bid Sats'],
    'Will Attend Midwest': fields['Will Attend Midwest'],
    Source: fields.Source,
    Status: fields.Status,
  };
  if (fields.Phone) cleanFields.Phone = fields.Phone;
  if (typeof fields['Opening Bid Sats'] === 'number') {
    cleanFields['Opening Bid Sats'] = fields['Opening Bid Sats'];
  }
  if (fields.Notes) cleanFields.Notes = fields.Notes;

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
    console.error('[midwest-advance-bid] resend failed', resend);
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

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
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

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim().toLowerCase();
  const phone = String(body.phone ?? '').trim();
  const slug = String(body.slug ?? '').trim();
  const notes = String(body.notes ?? '').trim();
  const willAttend = Boolean(body.willAttend);
  const bidSats = parseBidSats(body.bidSats);

  if (!name) {
    return NextResponse.json(
      { ok: false, error: 'Please enter your full name.' },
      { status: 400 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: 'Please enter a valid email address.' },
      { status: 400 },
    );
  }

  const lot = getAuctionLot(slug);
  if (!lot) {
    return NextResponse.json({ ok: false, error: 'Unknown auction lot.' }, { status: 400 });
  }
  if (lot.status !== 'open') {
    return NextResponse.json(
      { ok: false, error: 'This lot is no longer open for advance bids.' },
      { status: 400 },
    );
  }
  if (lot.startingBidSats == null) {
    return NextResponse.json(
      { ok: false, error: 'Opening bid is not set for this lot yet.' },
      { status: 400 },
    );
  }
  if (bidSats == null || bidSats <= 0) {
    return NextResponse.json(
      { ok: false, error: 'Please enter your bid in sats as a whole number.' },
      { status: 400 },
    );
  }
  if (bidSats < lot.startingBidSats) {
    return NextResponse.json(
      {
        ok: false,
        error: `Bid must be at least the opening bid (${formatSats(lot.startingBidSats)}).`,
      },
      { status: 400 },
    );
  }
  if ((bidSats - lot.startingBidSats) % lot.incrementSats !== 0) {
    return NextResponse.json(
      {
        ok: false,
        error: `Bid must be the opening bid or increase in steps of ${formatSats(lot.incrementSats)}.`,
      },
      { status: 400 },
    );
  }
  if (!willAttend) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Advance bids require you to pick up in person at Bitcoin Arts Park in Columbus. Please confirm you will attend.',
      },
      { status: 400 },
    );
  }

  const now = new Date();
  const ua = req.headers.get('user-agent') ?? '';

  // 1. Airtable (primary system of record) — same AIRTABLE_PAT + AIRTABLE_BASE_ID
  try {
    const airtable = await writeToAirtable({
      'Full Name': name,
      Email: email,
      Phone: phone || undefined,
      'Lot Code': lot.lotCode,
      'Lot Title': lot.title,
      Artist: lot.artistName,
      'Bid Sats': bidSats,
      'Opening Bid Sats': lot.startingBidSats,
      'Will Attend Midwest': true,
      Notes: notes || undefined,
      Source: 'midwest-auction-web',
      Status: 'Pending',
    });
    if (!airtable.ok && !airtable.skipped) {
      console.error('[midwest-advance-bid] airtable write failed', airtable);
    }
  } catch (err) {
    console.error('[midwest-advance-bid] airtable write threw', err);
  }

  // 2. MongoDB backup
  try {
    if (getEnv('MONGODB_URI')) {
      const db = await getMongoDb();
      await db.collection('midwestAdvanceBids').insertOne({
        name,
        email,
        phone: phone || undefined,
        lotCode: lot.lotCode,
        lotSlug: lot.slug,
        lotTitle: lot.title,
        artistName: lot.artistName,
        bidSats,
        openingBidSats: lot.startingBidSats,
        willAttend: true,
        notes: notes || undefined,
        createdAt: now,
        ip,
        userAgent: ua,
        source: 'midwest-auction-web',
        status: 'pending',
      });
    }
  } catch (err) {
    console.error('[midwest-advance-bid] db write failed', err);
  }

  // 3. Email notification
  const toEmail =
    getEnv('AUCTION_TO_EMAIL') ??
    getEnv('CONTACT_TO_EMAIL') ??
    'hello@bitcoinforthearts.org';
  const subject = `Advance bid: ${lot.lotCode} ${formatSats(bidSats)} from ${name}`.slice(
    0,
    200,
  );
  const text = [
    'New Midwest silent-auction advance bid',
    '',
    `Lot: ${lot.lotCode} · ${lot.title}`,
    `Artist: ${lot.artistName}`,
    `Bid: ${formatSats(bidSats)}`,
    `Opening: ${formatSats(lot.startingBidSats)}`,
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    'Will attend Midwest for pickup: yes',
    notes ? `Notes: ${notes}` : null,
    `Lot URL: https://www.bitcoinforthearts.org/midwest/auction/${lot.slug}`,
    `Time: ${now.toISOString()}`,
    `IP: ${ip}`,
  ]
    .filter(Boolean)
    .join('\n');

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5;">
      <h2 style="margin: 0 0 12px;">Midwest advance bid</h2>
      <p style="margin: 0 0 8px;"><strong>Lot:</strong> ${escapeHtml(lot.lotCode)} · ${escapeHtml(lot.title)}</p>
      <p style="margin: 0 0 8px;"><strong>Artist:</strong> ${escapeHtml(lot.artistName)}</p>
      <p style="margin: 0 0 8px;"><strong>Bid:</strong> ${escapeHtml(formatSats(bidSats))}</p>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p style="margin: 0 0 8px;"><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
      <p style="margin: 0 0 8px;"><strong>On-site pickup:</strong> confirmed</p>
      ${notes ? `<p style="margin: 0 0 8px;"><strong>Notes:</strong> ${escapeHtml(notes)}</p>` : ''}
      <p style="margin: 0 0 0;"><strong>Time:</strong> ${escapeHtml(now.toISOString())}</p>
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
      console.error('[midwest-advance-bid] email send not ok', send);
    }
  } catch (err) {
    console.error('[midwest-advance-bid] email send failed', err);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
