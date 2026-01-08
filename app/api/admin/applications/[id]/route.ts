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
};

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
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

  const db = await getMongoDb();
  const appId = new ObjectId(id);

  const res = await db.collection('applications').findOneAndUpdate(
    { _id: appId },
    { $set: update },
    { returnDocument: 'after' },
  );

  if (!res) {
    return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

