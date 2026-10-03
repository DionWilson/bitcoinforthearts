import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Midwest volunteer signup closed after the Sept 23–24, 2026 event. */
export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error:
        'Midwest volunteer signup is closed. The Midwest Bitcoin Summit has concluded.',
    },
    { status: 410 },
  );
}
