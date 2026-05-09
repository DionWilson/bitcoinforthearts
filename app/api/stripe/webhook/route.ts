import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getMongoDb } from '@/lib/mongodb';
import { sendResendEmail } from '@/lib/resend';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type StripeWebhookEventDoc = {
  _id: string; // Stripe event id
  type: string;
  livemode: boolean;
  created: Date;
  receivedAt: Date;
};

type DonationDoc = {
  createdAt: Date;
  stripeEventId: string;
  stripeCheckoutSessionId: string;
  stripePaymentIntentId: string | null;
  mode: string | null;
  paymentStatus: string | null;
  amountTotal: number | null;
  currency: string;
  customerEmail: string | null;
  customerName: string | null;
  metadata: Record<string, string>;
  livemode: boolean;
  thankYouEmail?: {
    ok: boolean;
    provider?: 'resend' | 'smtp';
    skipped?: boolean;
    reason?: string;
    error?: string;
    sentAt?: Date;
    subject?: string;
  };
};

function getEnv(name: string) {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

function formatFrom(value: string) {
  const trimmed = value.trim();
  if (trimmed.includes('<') && trimmed.includes('>')) return trimmed;
  return `Bitcoin for the Arts <${trimmed}>`;
}

function asNumber(value: unknown) {
  const n = typeof value === 'string' ? Number(value) : (value as number);
  return Number.isFinite(n) ? n : null;
}

function formatMoney(amountMinor: number, currency: string) {
  const upper = currency.toUpperCase();
  const dollars = (amountMinor / 100).toFixed(2);
  return `${upper} ${dollars}`;
}

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function sendDonationEmail(args: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  const replyTo = getEnv('DONATIONS_REPLY_TO') ?? 'donate@bitcoinforthearts.org';

  // Prefer Resend when configured.
  const resendAttempt = await sendResendEmail({
    to: args.to,
    subject: args.subject,
    text: args.text,
    html: args.html,
    replyTo,
    fromEmail:
      getEnv('DONATIONS_FROM_EMAIL') ??
      getEnv('RESEND_FROM_EMAIL') ??
      getEnv('CONTACT_FROM_EMAIL'),
  });
  if (resendAttempt.ok) return { ok: true as const, provider: 'resend' as const };

  // Fallback: SMTP (Zoho, etc.)
  const smtpUser = getEnv('DONATIONS_SMTP_USER') ?? getEnv('CONTACT_SMTP_USER');
  const smtpPass = getEnv('DONATIONS_SMTP_PASS') ?? getEnv('CONTACT_SMTP_PASS');
  const smtpHost = getEnv('DONATIONS_SMTP_HOST') ?? getEnv('CONTACT_SMTP_HOST') ?? 'smtp.zoho.com';
  const smtpPort = Number(getEnv('DONATIONS_SMTP_PORT') ?? getEnv('CONTACT_SMTP_PORT') ?? '465');
  const smtpSecure =
    (getEnv('DONATIONS_SMTP_SECURE') ?? getEnv('CONTACT_SMTP_SECURE') ?? 'true').toLowerCase() !==
    'false';

  const fromEmail =
    getEnv('DONATIONS_FROM_EMAIL') ??
    getEnv('CONTACT_FROM_EMAIL') ??
    getEnv('RESEND_FROM_EMAIL');
  if (!smtpUser || !smtpPass || !fromEmail) {
    // If Resend failed (not skipped), preserve the failure details so we can diagnose
    // (e.g., unverified sender domain, invalid API key, etc.).
    if (!resendAttempt.skipped) {
      const resendError =
        'error' in resendAttempt && typeof resendAttempt.error === 'string'
          ? resendAttempt.error
          : null;
      return {
        ok: false as const,
        skipped: false as const,
        reason: 'resend_failed' as const,
        error:
          [resendAttempt.reason, resendError].filter(Boolean).join(' — ') ||
          'resend_failed',
      };
    }
    return {
      ok: false as const,
      skipped: true as const,
      reason: 'email_not_configured' as const,
    };
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
    html: args.html,
    replyTo,
  });

  return { ok: true as const, provider: 'smtp' as const };
}

// Safe config status endpoint (no secrets).
export async function GET() {
  const stripeSecretKey = Boolean(getEnv('STRIPE_SECRET_KEY'));
  const webhookSecret = Boolean(getEnv('STRIPE_WEBHOOK_SECRET'));
  const threshold = asNumber(getEnv('DONATION_THANKYOU_THRESHOLD_USD') ?? '1') ?? 1;

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
        stripeSecretKey,
        stripeWebhookSecret: webhookSecret,
        mongo: mongoOk,
        resend: Boolean(getEnv('RESEND_API_KEY')) && Boolean(getEnv('RESEND_FROM_EMAIL')),
        thankYouThresholdUsd: threshold,
      },
      vercel: {
        env: process.env.VERCEL_ENV ?? null,
        url: process.env.VERCEL_URL ?? null,
      },
    },
    { status: 200, headers: { 'Cache-Control': 'no-store' } },
  );
}

export async function POST(req: Request) {
  const webhookSecret = getEnv('STRIPE_WEBHOOK_SECRET');
  if (!webhookSecret) {
    return NextResponse.json(
      { ok: false, error: 'Missing STRIPE_WEBHOOK_SECRET.' },
      { status: 500 },
    );
  }
  // Common misconfiguration: putting the Stripe API secret key (sk_...) into STRIPE_WEBHOOK_SECRET.
  // Webhook signing secrets always start with whsec_...
  if (webhookSecret.startsWith('sk_')) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'STRIPE_WEBHOOK_SECRET looks misconfigured. It should be the webhook signing secret (starts with "whsec_"), not your Stripe secret key (starts with "sk_").',
      },
      { status: 500 },
    );
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json(
      { ok: false, error: 'Missing stripe-signature header.' },
      { status: 400 },
    );
  }

  // The Stripe SDK expects an API key string, but webhook signature verification does not require
  // making API calls. We still prefer STRIPE_SECRET_KEY to be set correctly for future expansion.
  const stripe = new Stripe(getEnv('STRIPE_SECRET_KEY') ?? 'sk_missing');

  let event: Stripe.Event;
  try {
    const raw = await req.arrayBuffer();
    const body = Buffer.from(raw);
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Invalid signature.';
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }

  // Idempotency: Stripe may retry events. Track processed event IDs.
  const inMemorySeen = (globalThis as unknown as { __bftaStripeSeen?: Map<string, number> })
    .__bftaStripeSeen;
  const seen =
    inMemorySeen ??
    ((globalThis as unknown as { __bftaStripeSeen?: Map<string, number> }).__bftaStripeSeen =
      new Map<string, number>());
  if (seen.has(event.id)) {
    return NextResponse.json({ ok: true, skipped: true }, { status: 200 });
  }
  // TTL-ish cleanup (best-effort).
  seen.set(event.id, Date.now());
  if (seen.size > 2000) {
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    for (const [k, ts] of seen) {
      if (ts < cutoff) seen.delete(k);
      if (seen.size <= 1500) break;
    }
  }

  let db: Awaited<ReturnType<typeof getMongoDb>> | null = null;
  let eventAlreadyRecorded = false;
  try {
    db = await getMongoDb();
    await db.collection<StripeWebhookEventDoc>('stripeWebhookEvents').insertOne({
      _id: event.id,
      type: event.type,
      livemode: event.livemode,
      created: new Date(event.created * 1000),
      receivedAt: new Date(),
    });
  } catch (err) {
    // Duplicate key means we already processed this event.
    if (
      err &&
      typeof err === "object" &&
      'code' in err &&
      (err as { code?: unknown }).code === 11000
    ) {
      // NOTE:
      // We *do not* return early here. Stripe "Resend" is commonly used to recover from
      // earlier misconfiguration (e.g. webhooks failing, email not configured, etc.).
      // We treat the event log as idempotent, but still allow downstream handlers to run.
      eventAlreadyRecorded = true;
      db = await getMongoDb();
      // continue
    }
    // If Mongo isn't configured, we still acknowledge the webhook to avoid retries.
    console.error('[stripe-webhook] mongo insert failed', err);
    db = null;
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const paymentStatus = session.payment_status;
      if (paymentStatus !== 'paid') {
        return NextResponse.json({ ok: true, ignored: true }, { status: 200 });
      }

      const amountTotal = session.amount_total ?? null;
      const currency = (session.currency ?? 'usd').toLowerCase();
      const customerEmail =
        (session.customer_details?.email ?? session.customer_email ?? null) || null;
      const customerName = session.customer_details?.name ?? null;
      const sessionId = session.id;

      // Store donation details (best-effort).
      if (db) {
        await db.collection<DonationDoc>('donations').updateOne(
          { stripeCheckoutSessionId: sessionId },
          {
            $setOnInsert: {
              createdAt: new Date(),
              stripeEventId: event.id,
              stripeCheckoutSessionId: sessionId,
              stripePaymentIntentId:
                typeof session.payment_intent === 'string'
                  ? session.payment_intent
                  : session.payment_intent?.id ?? null,
              mode: session.mode ?? null,
              paymentStatus,
              amountTotal,
              currency,
              customerEmail,
              customerName,
              // Helpful metadata for later leaderboard work.
              metadata: session.metadata ?? {},
              livemode: event.livemode,
            },
          },
          { upsert: true },
        );
      }

      const isSubscription = session.mode === 'subscription';

      // Thank-you email:
      // - Always send for new subscription signups (any amount), to confirm monthly giving.
      // - For one-time donations, send for larger donations (>= threshold USD).
      const thresholdUsd =
        asNumber(getEnv('DONATION_THANKYOU_THRESHOLD_USD') ?? '1') ?? 1;
      const qualifiesOneTime =
        !isSubscription &&
        currency === 'usd' &&
        typeof amountTotal === 'number' &&
        amountTotal >= thresholdUsd * 100;

      // Email idempotency:
      // - If we have already recorded a successful thank-you email for this session, do not resend.
      // - If the event is being resent and prior execution did not record email outcome, allow recovery.
      let thankYouOutcome: DonationDoc['thankYouEmail'] | undefined;
      let alreadyThanked = false;
      if (db) {
        try {
          const existing = await db
            .collection<DonationDoc>('donations')
            .findOne({ stripeCheckoutSessionId: sessionId }, { projection: { thankYouEmail: 1 } });
          alreadyThanked = Boolean(existing?.thankYouEmail?.ok);
        } catch (err) {
          console.error('[stripe-webhook] failed to check existing thank-you state', err);
          alreadyThanked = false;
        }
      }

      if ((isSubscription || qualifiesOneTime) && !customerEmail) {
        // Stripe should normally provide an email (especially for subscriptions),
        // but record if it's missing so we can diagnose.
        thankYouOutcome = {
          ok: false,
          skipped: true,
          reason: 'missing_customer_email',
          sentAt: new Date(),
        };
      }

      if (!alreadyThanked && (isSubscription || qualifiesOneTime) && customerEmail) {
        const amountText =
          typeof amountTotal === 'number' ? formatMoney(amountTotal, currency) : 'your donation';
        const subject = isSubscription
          ? 'Welcome to the Sovereign Circle — Bitcoin for the Arts'
          : `Thank you for your donation to Bitcoin for the Arts (${amountText})`;

        const qualifiesDisciplineChoice =
          isSubscription &&
          currency === 'usd' &&
          typeof amountTotal === 'number' &&
          amountTotal >= 2100;

        const text = isSubscription
          ? [
              'Welcome to the Sovereign Circle.',
              '',
              'Your monthly support sustains the artists, grants, and programs that make Bitcoin for the Arts possible. Thank you.',
              '',
              ...(qualifiesDisciplineChoice
                ? [
                    'At your tier, you can direct your support toward a specific art discipline — visual arts, music, theater, dance, writing, or film. Just reply to this email or write to donate@bitcoinforthearts.org with your preference.',
                    '',
                  ]
                : []),
              'For full details on what each Circle tier includes, see https://www.bitcoinforthearts.org/donate/monthly',
              '',
              'This email is your receipt — please save it for your records. Bitcoin for the Arts, Inc. is a 501(c)(3) tax-exempt nonprofit, EIN 41-2642260.',
              '',
              'With gratitude,',
              'Bitcoin for the Arts',
              'https://bitcoinforthearts.org',
            ].join('\n')
          : [
              'Thank you for supporting Bitcoin for the Arts.',
              '',
              `Donation: ${amountText}`,
              '',
              'This email is your receipt — please save it for your records. Bitcoin for the Arts, Inc. is a 501(c)(3) tax-exempt nonprofit, EIN 41-2642260.',
              '',
              'Want to stay in the loop? Subscribe to our newsletter at https://www.bitcoinforthearts.org/get-involved for occasional updates on grants, programs, and the artists we support.',
              '',
              'With gratitude,',
              'Bitcoin for the Arts',
              'https://bitcoinforthearts.org',
            ].join('\n');

        const html = `
          <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5; color: #111111;">
            ${
              isSubscription
                ? `
                <h2 style="margin: 0 0 12px;">Welcome to the Sovereign Circle.</h2>
                <p style="margin: 0 0 12px;">
                  Your monthly support sustains the artists, grants, and programs that make Bitcoin for the Arts possible. Thank you.
                </p>
                ${qualifiesDisciplineChoice ? `
                <p style="margin: 12px 0; padding: 10px 14px; background: #FFF7F1; border-left: 3px solid #FF4F14; border-radius: 4px; font-size: 13px;">
                  At your tier, you can direct your support toward a specific art discipline — visual arts, music, theater, dance, writing, or film. Just reply to this email or write to
                  <a href="mailto:donate@bitcoinforthearts.org" style="color: #FF4F14;">donate@bitcoinforthearts.org</a> with your preference.
                </p>` : ''}
                <p style="margin: 16px 0 8px;">
                  For full details on what each Circle tier includes, see
                  <a href="https://www.bitcoinforthearts.org/donate/monthly" style="color: #FF4F14;">bitcoinforthearts.org/donate/monthly</a>.
                </p>
              `
                : `
                <h2 style="margin: 0 0 12px;">Thank you.</h2>
                <p style="margin: 0 0 8px;">
                  We appreciate your support for sovereign creators and Bitcoin-native arts.
                </p>
                <p style="margin: 0 0 12px;"><strong>Donation:</strong> ${escapeHtml(amountText)}</p>
                <p style="margin: 12px 0; padding: 10px 14px; background: #FFF7F1; border-left: 3px solid #FF4F14; border-radius: 4px; font-size: 13px;">
                  Want to stay in the loop? Subscribe to our newsletter at
                  <a href="https://www.bitcoinforthearts.org/get-involved" style="color: #FF4F14;">bitcoinforthearts.org/get-involved</a>
                  for occasional updates on grants, programs, and the artists we support.
                </p>
              `
            }
            <p style="margin: 20px 0 8px; padding-top: 12px; border-top: 1px solid #E5E1D6; color: #555555; font-size: 12px;">
              This email is your receipt — please save it for your records. Bitcoin for the Arts, Inc. is a 501(c)(3) tax-exempt nonprofit, EIN 41-2642260. No goods or services were provided in exchange for your contribution.
            </p>
            <p style="margin: 8px 0 0; color: #999; font-size: 12px;">
              Sent from <a href="https://bitcoinforthearts.org" style="color: #999;">bitcoinforthearts.org</a>
            </p>
          </div>
        `.trim();

        try {
          const res = await sendDonationEmail({ to: customerEmail, subject, text, html });
          if (res.ok) {
            thankYouOutcome = { ok: true, provider: res.provider, sentAt: new Date(), subject };
          } else if ('skipped' in res && res.skipped) {
            thankYouOutcome = {
              ok: false,
              skipped: true,
              reason: res.reason,
              sentAt: new Date(),
              subject,
            };
            console.warn('[stripe-webhook] email not configured; could not send thank-you');
          } else {
            thankYouOutcome = { ok: false, error: 'email_send_failed', sentAt: new Date(), subject };
            console.error('[stripe-webhook] thank-you email failed', res);
          }
        } catch (emailErr) {
          thankYouOutcome = {
            ok: false,
            error: emailErr instanceof Error ? emailErr.message : 'Unknown email error',
            sentAt: new Date(),
            subject,
          };
          console.error('[stripe-webhook] thank-you email exception', emailErr);
        }
      }

      // Store email outcome for debugging/audit (best-effort).
      if (db && thankYouOutcome) {
        try {
          await db.collection<DonationDoc>('donations').updateOne(
            { stripeCheckoutSessionId: sessionId },
            { $set: { thankYouEmail: thankYouOutcome } },
          );
        } catch (err) {
          console.error('[stripe-webhook] failed to store thank-you email outcome', err);
        }
      }
    }
  } catch (err) {
    console.error('[stripe-webhook] handler error', err);
    // Acknowledge to avoid retry loops; errors are logged and events are stored.
  }

  return NextResponse.json(
    { ok: true, eventAlreadyRecorded },
    { status: 200 },
  );
}

