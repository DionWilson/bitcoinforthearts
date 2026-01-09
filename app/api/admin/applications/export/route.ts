import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getMongoDb } from '@/lib/mongodb';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function escapeRegExp(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function csvCell(raw: unknown) {
  const s = raw === null || raw === undefined ? '' : String(raw);
  // Mitigate CSV injection in Excel/Sheets.
  const safe =
    s.startsWith('=') || s.startsWith('+') || s.startsWith('-') || s.startsWith('@') ? `'${s}` : s;
  const escaped = safe.replace(/"/g, '""');
  return `"${escaped}"`;
}

function avg(nums: number[]) {
  if (!nums.length) return '';
  const total = nums.reduce((a, b) => a + b, 0);
  return String(Math.round((total / nums.length) * 10) / 10);
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const q = (sp.get('q') ?? '').trim();
  const status = (sp.get('status') ?? '').trim();
  const applicantType = (sp.get('applicantType') ?? '').trim();
  const discipline = (sp.get('discipline') ?? '').trim();
  const due = (sp.get('due') ?? '').trim();
  const report = (sp.get('report') ?? '').trim();

  const query: Record<string, unknown> = {};
  if (status) query.status = status;
  if (applicantType) query['applicant.applicantType'] = applicantType;
  if (discipline) query['applicant.disciplines'] = discipline;

  if (q) {
    const safe = escapeRegExp(q);
    query.$or = [
      { 'applicant.legalName': { $regex: safe, $options: 'i' } },
      { 'applicant.email': { $regex: safe, $options: 'i' } },
      { 'project.title': { $regex: safe, $options: 'i' } },
    ];
  }

  if (report === 'received') {
    query['oversight.reportReceivedAt'] = { $ne: null };
  } else if (report === 'missing') {
    query['oversight.reportReceivedAt'] = null;
  }

  if (due) {
    const days = Number(due);
    if (Number.isFinite(days) && days > 0) {
      const now = new Date();
      const until = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
      query['oversight.reportDueAt'] = { $lte: until, $gte: new Date(0) };
      if (!report) query['oversight.reportReceivedAt'] = null;
    }
  }

  const db = await getMongoDb();
  const docs = await db
    .collection('applications')
    .find(query)
    .sort({ createdAt: -1 })
    .limit(5000)
    .toArray();

  const header = [
    'id',
    'submittedAt',
    'status',
    'applicantName',
    'applicantEmail',
    'applicantType',
    'disciplines',
    'projectTitle',
    'requestedAmount',
    'awardedAt',
    'reportDueAt',
    'reportReceivedAt',
    'avgOverallScore',
    'adminNotes',
  ];

  const lines: string[] = [];
  lines.push(header.map(csvCell).join(','));

  for (const d of docs) {
    const reviews = Array.isArray((d as any).reviews) ? ((d as any).reviews as any[]) : [];
    const overallScores = reviews
      .map((r) => r?.scores?.overall)
      .filter((v): v is number => typeof v === 'number');

    const row = [
      String((d as any)._id ?? ''),
      (d as any).createdAt ? new Date((d as any).createdAt).toISOString() : '',
      String((d as any).status ?? ''),
      String((d as any).applicant?.legalName ?? ''),
      String((d as any).applicant?.email ?? ''),
      String((d as any).applicant?.applicantType ?? ''),
      Array.isArray((d as any).applicant?.disciplines)
        ? ((d as any).applicant.disciplines as string[]).join('; ')
        : '',
      String((d as any).project?.title ?? ''),
      typeof (d as any).funding?.requestedAmount === 'number'
        ? String((d as any).funding.requestedAmount)
        : '',
      (d as any).awardedAt ? new Date((d as any).awardedAt).toISOString() : '',
      (d as any).oversight?.reportDueAt
        ? new Date((d as any).oversight.reportDueAt).toISOString()
        : '',
      (d as any).oversight?.reportReceivedAt
        ? new Date((d as any).oversight.reportReceivedAt).toISOString()
        : '',
      avg(overallScores),
      String((d as any).adminNotes ?? ''),
    ];
    lines.push(row.map(csvCell).join(','));
  }

  const csv = lines.join('\n');
  return new NextResponse(csv, {
    status: 200,
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'attachment; filename="bfta-grant-applications.csv"',
      'cache-control': 'no-store',
    },
  });
}

