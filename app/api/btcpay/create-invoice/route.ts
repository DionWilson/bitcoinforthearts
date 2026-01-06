import { NextResponse } from 'next/server';

type CreateInvoiceRequest = {
  amount: number;
  currency: string;
  redirectUrl?: string;
  metadata?: {
    orderId?: string;
    buyerEmail?: string;
    buyerName?: string;
    message?: string;
  };
};

export async function POST(request: Request) {
  const BTCPAY_URL = process.env.BTCPAY_URL;
  const BTCPAY_API_KEY = process.env.BTCPAY_API_KEY;
  const BTCPAY_STORE_ID = process.env.BTCPAY_STORE_ID;

  if (!BTCPAY_URL || !BTCPAY_API_KEY || !BTCPAY_STORE_ID) {
    return NextResponse.json(
      {
        error:
          'BTCPay is not configured. Set BTCPAY_URL, BTCPAY_API_KEY, BTCPAY_STORE_ID in your deployment environment.',
      },
      { status: 500 },
    );
  }

  // Vercel cannot reach Tor (.onion) or LAN-only (.local) endpoints.
  if (BTCPAY_URL.includes('.onion')) {
    return NextResponse.json(
      {
        error:
          'BTCPAY_URL is a .onion address. Vercel-hosted sites cannot reach Tor endpoints. Configure a public HTTPS BTCPay URL (e.g. https://pay.bitcoinforthearts.org).',
      },
      { status: 500 },
    );
  }

  if (BTCPAY_URL.includes('.local')) {
    return NextResponse.json(
      {
        error:
          'BTCPAY_URL is a .local address (LAN-only). Your public website cannot reach it. Configure a public HTTPS BTCPay URL (e.g. https://pay.bitcoinforthearts.org).',
      },
      { status: 500 },
    );
  }

  let body: CreateInvoiceRequest;
  try {
    body = (await request.json()) as CreateInvoiceRequest;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const amount = Number(body.amount);
  const currency = String(body.currency || 'USD').toUpperCase();

  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json(
      { error: 'Amount must be a positive number.' },
      { status: 400 },
    );
  }

  const btcpayEndpoint = new URL(
    `/api/v1/stores/${BTCPAY_STORE_ID}/invoices`,
    BTCPAY_URL.endsWith('/') ? BTCPAY_URL : `${BTCPAY_URL}/`,
  );

  const res = await fetch(btcpayEndpoint.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${BTCPAY_API_KEY}`,
    },
    body: JSON.stringify({
      amount,
      currency,
      checkout: {
        redirectURL: body.redirectUrl,
      },
      metadata: body.metadata ?? {},
    }),
    // Avoid caching for invoice creation.
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    return NextResponse.json(
      {
        error: `BTCPay error (${res.status}).`,
        details: text.slice(0, 2000),
      },
      { status: 502 },
    );
  }

  const data = (await res.json()) as {
    id: string;
    checkoutLink: string;
  };

  return NextResponse.json({
    id: data.id,
    checkoutLink: data.checkoutLink,
  });
}

