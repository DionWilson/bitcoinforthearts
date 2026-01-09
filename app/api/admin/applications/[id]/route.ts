import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getMongoDb } from '@/lib/mongodb';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_STATUSES = [
  'submitted',
  'under_review',
  'needs_info',
  'awarded',
  'declined',
  'withdrawn',
] as const;

type Status = (typeof ALLOWED_STATUSES)[number];

type PatchBody = {
  status?: Status;
  adminNotes?: string;
  reportReceived?: boolean;
  awardedAt?: string; // ISO
  addReview?: {
    reviewer?: string;
    notes?: string;
    scores?: {
      overall?: number;
      impact?: number;
      feasibility?: number;
      bitcoinAlignment?: number;
      transparency?: number;
    };
  };
};

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function clampScore(v: unknown) {
  const n = typeof v === 'number' ? v : Number(v);
  if (!Number.isFinite(n)) return undefined;
  const rounded = Math.round(n);
  return Math.min(5, Math.max(1, rounded));
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ ok: false, error: 'Invalid application id.' }, { status: 400 });
  }

  let body: PatchBody;
  try {
    body = (await req.json()) as PatchBody;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON.' }, { status: 400 });
  }

  const update: Record<string, unknown> = { updatedAt: new Date() };
  const push: Record<string, unknown> = {};

  if (typeof body.status === 'string') {
    if (!ALLOWED_STATUSES.includes(body.status)) {
      return NextResponse.json({ ok: false, error: 'Invalid status.' }, { status: 400 });
    }
    update.status = body.status;
    if (body.status === 'awarded') {
      const awardedAt = body.awardedAt ? new Date(body.awardedAt) : new Date();
      update.awardedAt = awardedAt;
      update['oversight.reportDueAt'] = addMonths(awardedAt, 6);
      update['oversight.reportReceivedAt'] = null;
    }
  }

  if (typeof body.adminNotes === 'string') {
    update.adminNotes = body.adminNotes.slice(0, 5000);
  }

  if (typeof body.reportReceived === 'boolean') {
    update['oversight.reportReceivedAt'] = body.reportReceived ? new Date() : null;
  }

  if (body.addReview && typeof body.addReview === 'object') {
    const reviewer =
      typeof body.addReview.reviewer === 'string' && body.addReview.reviewer.trim()
        ? body.addReview.reviewer.trim().slice(0, 120)
        : 'Admin';
    const notes =
      typeof body.addReview.notes === 'string' ? body.addReview.notes.slice(0, 20000) : '';

    const s = body.addReview.scores ?? {};
    const review = {
      reviewer,
      createdAt: new Date(),
      scores: {
        overall: clampScore(s.overall),
        impact: clampScore(s.impact),
        feasibility: clampScore(s.feasibility),
        bitcoinAlignment: clampScore(s.bitcoinAlignment),
        transparency: clampScore(s.transparency),
      },
      notes,
    };

    push.reviews = review;
  }

  const db = await getMongoDb();
  const appId = new ObjectId(id);

  const updateDoc: Record<string, unknown> = { $set: update };
  if (Object.keys(push).length) updateDoc.$push = push;

  const res = await db.collection('applications').findOneAndUpdate({ _id: appId }, updateDoc, {
    returnDocument: 'after',
  });

  if (!res) {
    return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

