import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Readable } from 'node:stream';
import { GridFSBucket, ObjectId } from 'mongodb';
import { getMongoDb } from '@/lib/mongodb';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function safeFilename(name: string) {
  return name.replaceAll('"', '');
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ ok: false, error: 'Invalid file id.' }, { status: 400 });
  }

  const db = await getMongoDb();
  const bucket = new GridFSBucket(db, { bucketName: 'grantUploads' });
  const fileId = new ObjectId(id);

  const files = await bucket.find({ _id: fileId }).limit(1).toArray();
  const file = files[0];
  if (!file) {
    return NextResponse.json({ ok: false, error: 'File not found.' }, { status: 404 });
  }

  const nodeStream = bucket.openDownloadStream(fileId);
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

  return new Response(webStream, {
    headers,
  });
}

