import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Readable } from 'node:stream';
import { GridFSBucket, ObjectId } from 'mongodb';
import { getMongoDb } from '@/lib/mongodb';
import { hashReviewToken } from '@/lib/reviewLinks';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function safeFilename(name: string) {
  return name.replaceAll('"', '');
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string; fileId: string }> },
) {
  const { token, fileId } = await params;
  if (!token || token.length < 10) {
    return NextResponse.json({ ok: false, error: 'Invalid token.' }, { status: 400 });
  }
  if (!fileId || !ObjectId.isValid(fileId)) {
    return NextResponse.json({ ok: false, error: 'Invalid file id.' }, { status: 400 });
  }

  const tokenHash = hashReviewToken(token);
  const db = await getMongoDb();

  const application = (await db.collection('applications').findOne({
    reviewShares: { $elemMatch: { tokenHash, expiresAt: { $gt: new Date() } } },
    uploads: { $elemMatch: { fileId: new ObjectId(fileId) } },
  })) as { _id: unknown } | null;

  if (!application) {
    return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
  }

  const bucket = new GridFSBucket(db, { bucketName: 'grantUploads' });
  const id = new ObjectId(fileId);
  const files = await bucket.find({ _id: id }).limit(1).toArray();
  const file = files[0];
  if (!file) {
    return NextResponse.json({ ok: false, error: 'File not found.' }, { status: 404 });
  }

  const nodeStream = bucket.openDownloadStream(id);
  const webStream = Readable.toWeb(nodeStream) as unknown as ReadableStream;

  const metadataMime =
    file && typeof file === 'object' && 'metadata' in file
      ? (file as { metadata?: { mimeType?: string } }).metadata?.mimeType
      : undefined;

  const headers: Record<string, string> = {
    'Content-Type': metadataMime ?? 'application/octet-stream',
    'Content-Disposition': `attachment; filename="${safeFilename(file.filename ?? 'download')}"`,
    'Cache-Control': 'no-store',
  };
  if (typeof file.length === 'number' && Number.isFinite(file.length)) {
    headers['Content-Length'] = String(file.length);
  }

  return new Response(webStream, { headers });
}

