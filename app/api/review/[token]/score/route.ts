import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ObjectId, type Document } from 'mongodb';
import { getMongoDb } from '@/lib/mongodb';
import { hashReviewToken } from '@/lib/reviewLinks';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ScoreBody = {
  reviewerName?: string;
  reviewerEmail?: string;
  notes?: string;
  scores?: {
    overall?: number;
    impact?: number;
    feasibility?: number;
    bitcoinAlignment?: number;
    transparency?: number;
  };
};

function clampScore(v: unknown) {
  const n = typeof v === 'number' ? v : Number(v);
  if (!Number.isFinite(n)) return undefined;
  return Math.min(5, Math.max(1, Math.round(n)));
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  if (!token || token.length < 10) {
    return NextResponse.json({ ok: false, error: 'Invalid review link.' }, { status: 400 });
  }

  let body: ScoreBody;
  try {
    body = (await req.json()) as ScoreBody;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON.' }, { status: 400 });
  }

  const reviewerName =
    typeof body.reviewerName === 'string' ? body.reviewerName.trim().slice(0, 120) : '';
  const reviewerEmailRaw =
    typeof body.reviewerEmail === 'string' ? body.reviewerEmail.trim().slice(0, 200) : '';
  const notes = typeof body.notes === 'string' ? body.notes.trim().slice(0, 20000) : '';

  if (!reviewerName) {
    return NextResponse.json({ ok: false, error: 'Reviewer name is required.' }, { status: 400 });
  }
  if (!reviewerEmailRaw || !isEmail(reviewerEmailRaw)) {
    return NextResponse.json({ ok: false, error: 'A valid reviewer email is required.' }, { status: 400 });
  }

  const reviewerEmail = normalizeEmail(reviewerEmailRaw);
  const s = body.scores ?? {};
  const scores = {
    overall: clampScore(s.overall),
    impact: clampScore(s.impact),
    feasibility: clampScore(s.feasibility),
    bitcoinAlignment: clampScore(s.bitcoinAlignment),
    transparency: clampScore(s.transparency),
  };

  if (
    scores.overall === undefined ||
    scores.impact === undefined ||
    scores.feasibility === undefined ||
    scores.bitcoinAlignment === undefined ||
    scores.transparency === undefined
  ) {
    return NextResponse.json(
      { ok: false, error: 'All five scores (1-5) are required.' },
      { status: 400 },
    );
  }

  const tokenHash = hashReviewToken(token);
  const db = await getMongoDb();

  const doc = (await db.collection('applications').findOne({
    reviewShares: { $elemMatch: { tokenHash, expiresAt: { $gt: new Date() } } },
  })) as {
    _id: ObjectId;
    reviewShares?: Array<{ tokenHash: string; expiresAt: Date; sentTo?: string[] }>;
    reviews?: Array<{ reviewerEmail?: string | null }>;
  } | null;

  if (!doc) {
    return NextResponse.json(
      { ok: false, error: 'This review link is invalid or has expired.' },
      { status: 404 },
    );
  }

  const share = (doc.reviewShares ?? []).find(
    (r) => r.tokenHash === tokenHash && new Date(r.expiresAt).getTime() > Date.now(),
  );
  const sentTo = (share?.sentTo ?? []).map((e) => normalizeEmail(String(e)));
  if (sentTo.length > 0 && !sentTo.includes(reviewerEmail)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Use the email address this review link was sent to. If you need access, ask BFTA to resend the link to your email.',
      },
      { status: 403 },
    );
  }

  const review = {
    reviewer: reviewerName,
    reviewerEmail,
    createdAt: new Date(),
    updatedAt: new Date(),
    source: 'review_link' as const,
    tokenHash,
    scores,
    notes,
  };

  const existingIdx = (doc.reviews ?? []).findIndex(
    (r) => typeof r.reviewerEmail === 'string' && normalizeEmail(r.reviewerEmail) === reviewerEmail,
  );

  if (existingIdx >= 0) {
    await db.collection('applications').updateOne(
      { _id: doc._id },
      {
        $set: {
          updatedAt: new Date(),
          [`reviews.${existingIdx}`]: review,
        },
      },
    );
  } else {
    await db.collection('applications').updateOne(
      { _id: doc._id },
      {
        $set: { updatedAt: new Date() },
        // Collection schema is application-specific; loosen push typing.
        $push: { reviews: review } as unknown as Document,
      },
    );
  }

  // Move application into under_review when first external score lands.
  await db.collection('applications').updateOne(
    { _id: doc._id, status: 'submitted' },
    { $set: { status: 'under_review', updatedAt: new Date() } },
  );

  return NextResponse.json(
    {
      ok: true,
      updated: existingIdx >= 0,
      review: {
        reviewer: review.reviewer,
        reviewerEmail: review.reviewerEmail,
        scores: review.scores,
        notes: review.notes,
        updatedAt: review.updatedAt.toISOString(),
      },
    },
    { status: 200 },
  );
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  if (!token || token.length < 10) {
    return NextResponse.json({ ok: false, error: 'Invalid review link.' }, { status: 400 });
  }

  const emailParam = _req.nextUrl.searchParams.get('email');
  if (!emailParam || !isEmail(emailParam)) {
    return NextResponse.json({ ok: false, error: 'email query param required.' }, { status: 400 });
  }

  const tokenHash = hashReviewToken(token);
  const db = await getMongoDb();
  const doc = (await db.collection('applications').findOne({
    reviewShares: { $elemMatch: { tokenHash, expiresAt: { $gt: new Date() } } },
  })) as {
    reviews?: Array<{
      reviewer?: string;
      reviewerEmail?: string;
      scores?: Record<string, number | undefined>;
      notes?: string;
      updatedAt?: Date;
      createdAt?: Date;
    }>;
  } | null;

  if (!doc) {
    return NextResponse.json(
      { ok: false, error: 'This review link is invalid or has expired.' },
      { status: 404 },
    );
  }

  const email = normalizeEmail(emailParam);
  const mine = (doc.reviews ?? []).find(
    (r) => typeof r.reviewerEmail === 'string' && normalizeEmail(r.reviewerEmail) === email,
  );

  return NextResponse.json({
    ok: true,
    review: mine
      ? {
          reviewer: mine.reviewer ?? '',
          reviewerEmail: mine.reviewerEmail ?? email,
          scores: mine.scores ?? null,
          notes: mine.notes ?? '',
          updatedAt: (mine.updatedAt ?? mine.createdAt)?.toISOString?.() ?? null,
        }
      : null,
  });
}
