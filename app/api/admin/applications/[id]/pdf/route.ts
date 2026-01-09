import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import PDFDocument from 'pdfkit';
import { PassThrough, Readable } from 'node:stream';
import { getMongoDb } from '@/lib/mongodb';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function fmtIso(d?: unknown) {
  try {
    if (!d) return '';
    const dt = d instanceof Date ? d : new Date(String(d));
    if (Number.isNaN(dt.getTime())) return '';
    return dt.toISOString();
  } catch {
    return '';
  }
}

function writeSection(doc: PDFKit.PDFDocument, title: string) {
  doc.moveDown(0.8);
  doc.fontSize(13).fillColor('#111111').text(title, { underline: true });
  doc.moveDown(0.4);
}

function writeField(doc: PDFKit.PDFDocument, label: string, value: unknown) {
  const v = value === null || value === undefined ? '' : String(value);
  doc.fontSize(10).fillColor('#444444').text(`${label}:`, { continued: true });
  doc.fillColor('#111111').text(` ${v || '—'}`);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ ok: false, error: 'Invalid application id.' }, { status: 400 });
  }

  const db = await getMongoDb();
  const doc = await db.collection('applications').findOne({ _id: new ObjectId(id) });
  if (!doc) {
    return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
  }

  const pdf = new PDFDocument({
    size: 'LETTER',
    margin: 48,
    info: {
      Title: `BFTA Grant Application ${id}`,
      Author: 'Bitcoin For The Arts',
    },
  });

  const stream = new PassThrough();
  pdf.pipe(stream);

  // Header
  pdf.fontSize(18).fillColor('#111111').text('Bitcoin For The Arts — Grant Application');
  pdf.moveDown(0.5);
  pdf.fontSize(10).fillColor('#444444').text('Admin Record Only', { continued: true });
  pdf.fillColor('#999999').text(' • Confidential');
  pdf.moveDown(0.4);
  writeField(pdf, 'Application ID', id);
  writeField(pdf, 'Submitted', fmtIso((doc as any).createdAt));
  writeField(pdf, 'Status', (doc as any).status ?? '');

  // Watermark (light)
  try {
    pdf.save();
    pdf.rotate(35, { origin: [250, 350] });
    pdf.fontSize(48).fillColor('#f0f0f0').text('BFTA', 130, 300, { opacity: 0.25 });
    pdf.restore();
  } catch {
    // ignore
  }

  // Applicant
  writeSection(pdf, 'Applicant information');
  writeField(pdf, 'Name/DBA', (doc as any).applicant?.legalName ?? '');
  writeField(pdf, 'Email', (doc as any).applicant?.email ?? '');
  writeField(pdf, 'Phone', (doc as any).applicant?.phone ?? '');
  writeField(pdf, 'Applicant type', (doc as any).applicant?.applicantType ?? '');
  writeField(pdf, 'EIN', (doc as any).applicant?.ein ?? '');
  writeField(pdf, 'Nonprofit/Sponsor', (doc as any).applicant?.nonprofitOrSponsor ?? '');
  writeField(
    pdf,
    'Disciplines',
    Array.isArray((doc as any).applicant?.disciplines)
      ? (doc as any).applicant.disciplines.join(', ')
      : '',
  );
  writeField(pdf, 'BTC address', (doc as any).applicant?.btcAddress ?? '');
  pdf.moveDown(0.2);
  pdf.fontSize(10).fillColor('#444444').text('Mailing address:');
  pdf.fillColor('#111111').fontSize(10).text((doc as any).applicant?.mailingAddress ?? '—');
  pdf.moveDown(0.2);
  pdf.fontSize(10).fillColor('#444444').text('Links:');
  pdf.fillColor('#111111').fontSize(10).text((doc as any).applicant?.links ?? '—');

  // Project
  writeSection(pdf, 'Project description');
  writeField(pdf, 'Project title', (doc as any).project?.title ?? '');
  pdf.moveDown(0.2);
  pdf.fontSize(10).fillColor('#444444').text('Project summary:');
  pdf.fillColor('#111111').text((doc as any).project?.summary ?? '—');
  pdf.moveDown(0.2);
  pdf.fontSize(10).fillColor('#444444').text('Detailed description:');
  pdf.fillColor('#111111').text((doc as any).project?.description ?? '—');
  pdf.moveDown(0.2);
  writeField(pdf, 'Timeline', (doc as any).project?.timeline ?? '');
  writeField(pdf, 'Venue/platform', (doc as any).project?.venuePlatform ?? '');
  pdf.moveDown(0.2);
  pdf.fontSize(10).fillColor('#444444').text('Audience & impact:');
  pdf.fillColor('#111111').text((doc as any).project?.impact ?? '—');

  // Funding
  writeSection(pdf, 'Funding & budget');
  writeField(pdf, 'Requested amount', (doc as any).funding?.requestedAmount ?? '');
  pdf.moveDown(0.2);
  pdf.fontSize(10).fillColor('#444444').text('Budget breakdown:');
  pdf.fillColor('#111111').text((doc as any).funding?.budgetBreakdown ?? '—');
  pdf.moveDown(0.2);
  pdf.fontSize(10).fillColor('#444444').text('How BFTA funds will be used:');
  pdf.fillColor('#111111').text((doc as any).funding?.fundUse ?? '—');

  // Background
  writeSection(pdf, 'Background & evaluation');
  pdf.fontSize(10).fillColor('#444444').text('Bio / mission:');
  pdf.fillColor('#111111').text((doc as any).background?.bio ?? '—');
  pdf.moveDown(0.2);
  pdf.fontSize(10).fillColor('#444444').text('Accomplishments:');
  pdf.fillColor('#111111').text((doc as any).background?.accomplishments ?? '—');
  pdf.moveDown(0.2);
  pdf.fontSize(10).fillColor('#444444').text('Equity & inclusion:');
  pdf.fillColor('#111111').text((doc as any).background?.equityInclusion ?? '—');
  pdf.moveDown(0.2);
  pdf.fontSize(10).fillColor('#444444').text('Evaluation plan:');
  pdf.fillColor('#111111').text((doc as any).background?.evaluationPlan ?? '—');

  // Oversight
  writeSection(pdf, 'Oversight & reporting');
  pdf.fontSize(10).fillColor('#444444').text('Reporting plan:');
  pdf.fillColor('#111111').text((doc as any).oversight?.reportingPlan ?? '—');
  writeField(pdf, 'Awarded at', fmtIso((doc as any).awardedAt));
  writeField(pdf, 'Report due', fmtIso((doc as any).oversight?.reportDueAt));
  writeField(pdf, 'Report received', fmtIso((doc as any).oversight?.reportReceivedAt));

  // Attachments
  writeSection(pdf, 'Attachments');
  writeField(pdf, 'Sponsor agreement link', (doc as any).links?.fiscalSponsorAgreement ?? '');
  pdf.moveDown(0.2);
  pdf.fontSize(10).fillColor('#444444').text('Samples (links):');
  pdf.fillColor('#111111').text((doc as any).links?.artSamples ?? '—');
  pdf.moveDown(0.2);
  const uploads = Array.isArray((doc as any).uploads) ? ((doc as any).uploads as any[]) : [];
  pdf.fontSize(10).fillColor('#444444').text('Uploaded files:');
  if (uploads.length) {
    uploads.forEach((u) => {
      pdf
        .fillColor('#111111')
        .fontSize(10)
        .text(`- ${u.fieldName ?? 'file'}: ${u.filename ?? ''} (${u.fileId ?? ''})`);
    });
  } else {
    pdf.fillColor('#111111').fontSize(10).text('—');
  }

  // Certification
  writeSection(pdf, 'Certification');
  writeField(pdf, 'Agreed to grant terms', Boolean((doc as any).certification?.agreeTerms));
  writeField(pdf, 'Agreed to legal assurances', Boolean((doc as any).certification?.legal?.agreed));
  writeField(pdf, 'Legal signature name', (doc as any).certification?.legal?.signatureName ?? '');
  writeField(pdf, 'Legal signed at', fmtIso((doc as any).certification?.legal?.signedAt));
  writeField(pdf, 'Legal version', (doc as any).certification?.legal?.version ?? '');

  // Footer
  pdf.moveDown(1.2);
  pdf
    .fontSize(9)
    .fillColor('#777777')
    .text(`Generated: ${new Date().toISOString()} • ${req.headers.get('host') ?? 'bitcoinforthearts.org'}`);

  pdf.end();

  const webStream = Readable.toWeb(stream) as unknown as ReadableStream;
  return new NextResponse(webStream, {
    status: 200,
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': `attachment; filename="bfta-grant-application-${id}.pdf"`,
      'cache-control': 'no-store',
    },
  });
}

