import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getMongoDb } from '@/lib/mongodb';
import { sendResendEmail } from '@/lib/resend';
import {
  ALL_SESSIONS_OPTION,
  BACKGROUND_OPTIONS,
  FORMAT_OPTIONS,
  SESSION_OPTIONS,
  SOURCE_OPTIONS,
} from '@/lib/education-classes';

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
const RATE_LIMIT_MAX = 30;
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

async function sendEducationEmail(args: { subject: string; text: string; replyTo?: string }) {
  const smtpUser =
    getEnv('EDU_SMTP_USER') ?? getEnv('GRANTS_SMTP_USER') ?? getEnv('CONTACT_SMTP_USER');
  const smtpPass =
    getEnv('EDU_SMTP_PASS') ?? getEnv('GRANTS_SMTP_PASS') ?? getEnv('CONTACT_SMTP_PASS');
  const smtpHost =
    getEnv('EDU_SMTP_HOST') ??
    getEnv('GRANTS_SMTP_HOST') ??
    getEnv('CONTACT_SMTP_HOST') ??
    'smtp.zoho.com';
  const smtpPort = Number(
    getEnv('EDU_SMTP_PORT') ??
      getEnv('GRANTS_SMTP_PORT') ??
      getEnv('CONTACT_SMTP_PORT') ??
      '465',
  );
  const smtpSecure =
    (getEnv('EDU_SMTP_SECURE') ??
      getEnv('GRANTS_SMTP_SECURE') ??
      getEnv('CONTACT_SMTP_SECURE') ??
      'true').toLowerCase() !== 'false';

  const fromEmail =
    getEnv('EDU_FROM_EMAIL') ??
    getEnv('RESEND_FROM_EMAIL') ??
    getEnv('GRANTS_FROM_EMAIL') ??
    getEnv('CONTACT_FROM_EMAIL');

  if (!smtpUser || !smtpPass || !fromEmail) {
    console.warn('[education] email not configured; skipping notification');
    return { ok: false as const, skipped: true as const, to: getEnv('EDU_TO_EMAIL') ?? 'education@bitcoinforthearts.org' };
  }

  const to = getEnv('EDU_TO_EMAIL') ?? 'education@bitcoinforthearts.org';

  // Prefer Resend when configured.
  const resendAttempt = await sendResendEmail({
    to,
    subject: args.subject,
    text: args.text,
    replyTo: args.replyTo,
    fromEmail,
  });
  if (resendAttempt.ok) {
    return { ok: true as const, skipped: false as const, to };
  }

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

  return { ok: true as const, skipped: false as const, to };
}

function pickOption<T extends string>(value: unknown, options: readonly T[], fallback: T): T {
  const v = String(value ?? '').trim();
  return (options as readonly string[]).includes(v) ? (v as T) : fallback;
}

async function writeToAirtable(fields: Record<string, unknown>) {
  const pat = getEnv('AIRTABLE_PAT');
  const baseId = getEnv('AIRTABLE_BASE_ID');
  if (!pat || !baseId) {
    return { ok: false as const, skipped: true, error: 'missing_airtable_config' };
  }

  const tableName = getEnv('AIRTABLE_EDUCATION_SIGNUPS_TABLE') ?? 'Education Signups';
  const apiBase = getEnv('AIRTABLE_API_URL') ?? 'https://api.airtable.com';
  const url = `${apiBase}/v0/${baseId}/${encodeURIComponent(tableName)}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${pat}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ records: [{ fields }], typecast: true }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error('[education] airtable write failed', res.status, body.slice(0, 500));
      return { ok: false as const, skipped: false, error: `airtable_http_${res.status}: ${body.slice(0, 500)}` };
    }
    return { ok: true as const, skipped: false, error: null };
  } catch (err) {
    console.error('[education] airtable write failed', err);
    return {
      ok: false as const,
      skipped: false,
      error: err instanceof Error ? err.message : 'airtable_unknown_error',
    };
  }
}

function getFallbackEducationToEmail() {
  return (
    getEnv('EDU_FALLBACK_TO_EMAIL') ??
    getEnv('GRANTS_TO_EMAIL') ??
    getEnv('CONTACT_TO_EMAIL') ??
    null
  );
}

function looksLikeInvalidRecipient(err: unknown) {
  const msg = err instanceof Error ? err.message : String(err ?? '');
  return /550\s+5\.1\.(1|10)\b/i.test(msg) || /invalid email recipients/i.test(msg);
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Please enter a valid email address.');
    }
    const discipline = String(body.discipline ?? '').trim().slice(0, 200);
    const interests = String(body.interests ?? '').trim().slice(0, 2000);
    const format = pickOption(body.format, FORMAT_OPTIONS, FORMAT_OPTIONS[0]);
    const background = pickOption(body.background, BACKGROUND_OPTIONS, 'Other');
    const source = pickOption(body.source, SOURCE_OPTIONS, 'Webinar Page');
    const rawSessions = Array.isArray(body.sessions) ? body.sessions.map(String) : [];
    let sessions = rawSessions.filter((s) => SESSION_OPTIONS.includes(s));
    if (sessions.length === 0 || sessions.includes(ALL_SESSIONS_OPTION)) {
      sessions = [ALL_SESSIONS_OPTION];
    }
    const inPerson = format !== 'Online Webinar';

    const now = new Date();
    const record = {
      createdAt: now,
      name,
      email,
      program: 'class-fall-2026',
      format,
      background,
      sessions,
      source,
      discipline: discipline || null,
      interests: interests || null,
      meta: {
        ip,
        userAgent: req.headers.get('user-agent') ?? null,
      },
    };

    let db: Awaited<ReturnType<typeof getMongoDb>> | null = null;
    let insertedId: unknown = null;
    try {
      db = await getMongoDb();
      const insertRes = await db.collection('educationInterest').insertOne(record);
      insertedId = insertRes.insertedId;
    } catch (err) {
      console.error('[education] mongo insert failed', err);
    }

    const airtableResult = await writeToAirtable({
      Name: name,
      Email: email,
      'Format Preference': format,
      Background: background,
      'Discipline or Role': discipline || undefined,
      'Sessions Selected': sessions,
      'Questions or Topics': interests || undefined,
      'Source Page': source,
      Status: 'Registered',
    });

    if (!insertedId && !airtableResult.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: 'We could not save your signup right now.',
        },
        { status: 503 },
      );
    }

    const subject = `Class signup: ${name}${inPerson ? ' (In-Person NYC)' : ''}`.slice(0, 200);
    const text = [
      `New Fall 2026 class signup via the ${source} on bitcoinforthearts.org`,
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Format: ${format}`,
      `Background: ${background}`,
      `Classes: ${sessions.join('; ')}`,
      discipline ? `Discipline or role: ${discipline}` : 'Discipline or role: (blank)',
      interests ? `Questions or topics:\n${interests}` : 'Questions or topics: (blank)',
      '',
      `Saved to Airtable: ${airtableResult.ok ? 'yes' : `no (${airtableResult.error})`}`,
      `Saved to database: ${insertedId ? 'yes' : 'no'}`,
      `IP: ${ip}`,
    ].join('\n');

    // Attempt email; don't block signup on email failures, but record the result.
    let emailResult: {
      ok: boolean;
      skipped?: boolean;
      to?: string;
      error?: string;
      attemptedFallback?: boolean;
    } = {
      ok: false,
    };
    try {
      const r = await sendEducationEmail({ subject, text, replyTo: email });
      emailResult = { ok: r.ok, skipped: r.skipped, to: r.to };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown email error';
      console.error('[education] email send failed', err);
      const primaryTo = getEnv('EDU_TO_EMAIL') ?? 'education@bitcoinforthearts.org';
      const fallbackTo = getFallbackEducationToEmail();

      if (fallbackTo && fallbackTo !== primaryTo && looksLikeInvalidRecipient(err)) {
        try {
          const smtpUser =
            getEnv('EDU_SMTP_USER') ?? getEnv('GRANTS_SMTP_USER') ?? getEnv('CONTACT_SMTP_USER');
          const smtpPass =
            getEnv('EDU_SMTP_PASS') ?? getEnv('GRANTS_SMTP_PASS') ?? getEnv('CONTACT_SMTP_PASS');
          const smtpHost =
            getEnv('EDU_SMTP_HOST') ??
            getEnv('GRANTS_SMTP_HOST') ??
            getEnv('CONTACT_SMTP_HOST') ??
            'smtp.zoho.com';
          const smtpPort = Number(
            getEnv('EDU_SMTP_PORT') ??
              getEnv('GRANTS_SMTP_PORT') ??
              getEnv('CONTACT_SMTP_PORT') ??
              '465',
          );
          const smtpSecure =
            (getEnv('EDU_SMTP_SECURE') ??
              getEnv('GRANTS_SMTP_SECURE') ??
              getEnv('CONTACT_SMTP_SECURE') ??
              'true').toLowerCase() !== 'false';

          const fromEmail =
            getEnv('EDU_FROM_EMAIL') ?? getEnv('GRANTS_FROM_EMAIL') ?? getEnv('CONTACT_FROM_EMAIL');

          if (smtpUser && smtpPass && fromEmail) {
            const transporter = nodemailer.createTransport({
              host: smtpHost,
              port: smtpPort,
              secure: smtpSecure,
              auth: { user: smtpUser, pass: smtpPass },
            });

            await transporter.sendMail({
              from: fromEmail,
              to: fallbackTo,
              subject,
              text: `${text}\n\n[Note] Primary education inbox (${primaryTo}) rejected this email; delivered to fallback (${fallbackTo}).`,
              replyTo: email,
            });

            emailResult = { ok: true, skipped: false, to: fallbackTo, attemptedFallback: true };
          } else {
            emailResult = {
              ok: false,
              skipped: false,
              to: primaryTo,
              attemptedFallback: true,
              error: `${msg} (fallback skipped: email not configured)`,
            };
          }
        } catch (fallbackErr) {
          const fbMsg = fallbackErr instanceof Error ? fallbackErr.message : 'Unknown fallback email error';
          console.error('[education] fallback email send failed', fallbackErr);
          emailResult = {
            ok: false,
            skipped: false,
            to: primaryTo,
            attemptedFallback: true,
            error: `${msg} (fallback to ${fallbackTo} failed: ${fbMsg})`,
          };
        }
      } else {
        emailResult = {
          ok: false,
          skipped: false,
          to: primaryTo,
          error: msg,
        };
      }
    }

    try {
      if (!db || !insertedId) throw new Error('no_mongo_record');
      await db.collection('educationInterest').updateOne(
        { _id: insertedId },
        {
          $set: {
            airtable: { ok: airtableResult.ok, error: airtableResult.error ?? null },
            emailNotification: {
              ok: emailResult.ok,
              skipped: Boolean(emailResult.skipped),
              to: emailResult.to ?? null,
              error: emailResult.error ?? null,
              attemptedFallback: Boolean(emailResult.attemptedFallback),
              attemptedAt: new Date(),
            },
          },
        },
      );
    } catch {
      // ignore
    }

    return NextResponse.json(
      {
        ok: true,
        airtable: airtableResult.ok,
        emailed: emailResult.ok,
        emailTo: emailResult.to ?? null,
        emailSkipped: Boolean(emailResult.skipped),
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Invalid submission.' },
      { status: 400 },
    );
  }
}

// Safe config status endpoint (no secrets).
export async function GET() {
  const smtpUser =
    getEnv('EDU_SMTP_USER') ?? getEnv('GRANTS_SMTP_USER') ?? getEnv('CONTACT_SMTP_USER');
  const smtpPass =
    getEnv('EDU_SMTP_PASS') ?? getEnv('GRANTS_SMTP_PASS') ?? getEnv('CONTACT_SMTP_PASS');
  const fromEmail =
    getEnv('EDU_FROM_EMAIL') ??
    getEnv('RESEND_FROM_EMAIL') ??
    getEnv('GRANTS_FROM_EMAIL') ??
    getEnv('CONTACT_FROM_EMAIL');
  const to = getEnv('EDU_TO_EMAIL') ?? 'education@bitcoinforthearts.org';
  const fallbackTo = getFallbackEducationToEmail();
  const resendApiKey = getEnv('RESEND_API_KEY');

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
        airtable: Boolean(getEnv('AIRTABLE_PAT')) && Boolean(getEnv('AIRTABLE_BASE_ID')),
        email:
          (Boolean(resendApiKey) && Boolean(fromEmail)) ||
          (Boolean(smtpUser) && Boolean(smtpPass) && Boolean(fromEmail)),
        resend: Boolean(resendApiKey) && Boolean(fromEmail),
        smtp: Boolean(smtpUser) && Boolean(smtpPass) && Boolean(fromEmail),
      },
      email: {
        to,
        fallbackTo,
        from: fromEmail ?? null,
        host:
          getEnv('EDU_SMTP_HOST') ??
          getEnv('GRANTS_SMTP_HOST') ??
          getEnv('CONTACT_SMTP_HOST') ??
          'smtp.zoho.com',
      },
    },
    { status: 200, headers: { 'Cache-Control': 'no-store' } },
  );
}

