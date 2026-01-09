import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
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

function truthy(value: unknown) {
  return value === true || value === 'true' || value === 1;
}

function asText(value: unknown) {
  if (value === null || value === undefined) return '—';
  const s = String(value);
  return s.trim() ? s : '—';
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ ok: false, error: 'Invalid application id.' }, { status: 400 });
    }

    const db = await getMongoDb();
    const doc = await db.collection('applications').findOne({ _id: new ObjectId(id) });
    if (!doc) {
      return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
    }

    const pdfDoc = await PDFDocument.create();
    pdfDoc.setTitle(`BFTA Grant Application ${id}`);
    pdfDoc.setAuthor('Bitcoin For The Arts');

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // LETTER size in points
    const pageWidth = 612;
    const pageHeight = 792;
    const margin = 48;
    const maxWidth = pageWidth - margin * 2;
    const lineHeight = 14;

    let page = pdfDoc.addPage([pageWidth, pageHeight]);
    let y = pageHeight - margin;

    const drawText = (text: string, opts?: { bold?: boolean; size?: number; color?: { r: number; g: number; b: number } }) => {
      const size = opts?.size ?? 11;
      const useFont = opts?.bold ? fontBold : font;
      const c = opts?.color ?? { r: 0.07, g: 0.07, b: 0.07 };
      page.drawText(text, { x: margin, y, size, font: useFont, color: rgb(c.r, c.g, c.b) });
      y -= lineHeight;
    };

    const wrapLines = (text: string, size = 11) => {
      const words = text.replace(/\r/g, '').split(/\s+/g);
      const lines: string[] = [];
      let line = '';
      for (const w of words) {
        const next = line ? `${line} ${w}` : w;
        const width = font.widthOfTextAtSize(next, size);
        if (width <= maxWidth) {
          line = next;
        } else {
          if (line) lines.push(line);
          line = w;
        }
      }
      if (line) lines.push(line);
      return lines;
    };

    const ensureSpace = (neededLines = 1) => {
      if (y - neededLines * lineHeight < margin) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        y = pageHeight - margin;
      }
    };

    const section = (title: string) => {
      ensureSpace(2);
      y -= 6;
      drawText(title, { bold: true, size: 13 });
      y -= 2;
    };

    const field = (label: string, value: unknown) => {
      ensureSpace(1);
      drawText(`${label}: ${asText(value)}`, { size: 11, color: { r: 0.12, g: 0.12, b: 0.12 } });
    };

    // Header
    drawText('Bitcoin For The Arts — Grant Application', { bold: true, size: 16 });
    drawText('Admin Record Only • Confidential', { size: 10, color: { r: 0.35, g: 0.35, b: 0.35 } });
    y -= 4;
    field('Application ID', id);
    field('Submitted', fmtIso((doc as any).createdAt));
    field('Status', (doc as any).status ?? '');

    // Applicant
    section('Applicant information');
    field('Name/DBA', (doc as any).applicant?.legalName ?? '');
    field('Email', (doc as any).applicant?.email ?? '');
    field('Phone', (doc as any).applicant?.phone ?? '');
    field(
      'US-based activities (eligibility)',
      (doc as any).eligibility?.usProjectOnly === true
        ? 'Yes'
        : (doc as any).eligibility?.usProjectOnly === false
          ? 'No'
          : '—',
    );
    field('Applicant type', (doc as any).applicant?.applicantType ?? '');
    field('EIN', (doc as any).applicant?.ein ?? '');
    field('Nonprofit/Sponsor', (doc as any).applicant?.nonprofitOrSponsor ?? '');
    field(
      'Disciplines',
      Array.isArray((doc as any).applicant?.disciplines)
        ? (doc as any).applicant.disciplines.join(', ')
        : '',
    );
    field('BTC address', (doc as any).applicant?.btcAddress ?? '');

    // Multi-line blocks
    const block = (label: string, text: unknown) => {
      const t = asText(text);
      section(label);
      const lines = wrapLines(t, 11);
      for (const ln of lines) {
        ensureSpace(1);
        drawText(ln, { size: 11, color: { r: 0.12, g: 0.12, b: 0.12 } });
      }
    };

    block('Mailing address', (doc as any).applicant?.mailingAddress ?? '');
    block('Links', (doc as any).applicant?.links ?? '');

    // Project
    section('Project description');
    field('Project title', (doc as any).project?.title ?? '');
    block('Project summary', (doc as any).project?.summary ?? '');
    block('Detailed description', (doc as any).project?.description ?? '');
    field('Timeline', (doc as any).project?.timeline ?? '');
    field('Venue/platform', (doc as any).project?.venuePlatform ?? '');
    block('Audience & impact', (doc as any).project?.impact ?? '');

    // Funding
    section('Funding & budget');
    field('Requested amount', (doc as any).funding?.requestedAmount ?? '');
    block('Budget breakdown', (doc as any).funding?.budgetBreakdown ?? '');
    block('How BFTA funds will be used', (doc as any).funding?.fundUse ?? '');

    // Background
    section('Background & evaluation');
    block('Bio / mission', (doc as any).background?.bio ?? '');
    block('Accomplishments', (doc as any).background?.accomplishments ?? '');
    block('Equity & inclusion', (doc as any).background?.equityInclusion ?? '');
    block('Evaluation plan', (doc as any).background?.evaluationPlan ?? '');

    // Oversight
    section('Oversight & reporting');
    block('Reporting plan', (doc as any).oversight?.reportingPlan ?? '');
    field('Awarded at', fmtIso((doc as any).awardedAt));
    field('Report due', fmtIso((doc as any).oversight?.reportDueAt));
    field('Report received', fmtIso((doc as any).oversight?.reportReceivedAt));

    // Attachments
    section('Attachments');
    field('Sponsor agreement link', (doc as any).links?.fiscalSponsorAgreement ?? '');
    block('Samples (links)', (doc as any).links?.artSamples ?? '');
    const uploads = Array.isArray((doc as any).uploads) ? ((doc as any).uploads as any[]) : [];
    if (uploads.length) {
      const list = uploads
        .map((u) => `- ${u.fieldName ?? 'file'}: ${u.filename ?? ''} (${u.fileId ?? ''})`)
        .join('\n');
      block('Uploaded files', list);
    } else {
      field('Uploaded files', '—');
    }

    // Certification
    section('Certification');
    field('Agreed to Grant Terms & Conditions', truthy((doc as any).certification?.agreeTerms) ? 'Yes' : 'No');
    field('Agreed to legal assurances', truthy((doc as any).certification?.legal?.agreed) ? 'Yes' : 'No');
    field('Legal signature name', (doc as any).certification?.legal?.signatureName ?? '');
    field('Legal signed at', fmtIso((doc as any).certification?.legal?.signedAt));
    field('Legal version', (doc as any).certification?.legal?.version ?? '');

    // Footer
    ensureSpace(2);
    y -= 8;
    drawText(`Generated: ${new Date().toISOString()} • ${req.headers.get('host') ?? 'bitcoinforthearts.org'}`, {
      size: 9,
      color: { r: 0.45, g: 0.45, b: 0.45 },
    });

    const bytes = await pdfDoc.save();
    // Coerce to a plain Uint8Array so NextResponse typing accepts it.
    const body = new Uint8Array(bytes);
    return new NextResponse(body, {
      status: 200,
      headers: {
        'content-type': 'application/pdf',
        'content-disposition': `attachment; filename="bfta-grant-application-${id}.pdf"`,
        'cache-control': 'no-store',
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[admin-pdf] generation failed', err);
    return new NextResponse(`PDF generation failed: ${msg}`, { status: 500 });
  }
}

