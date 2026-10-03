import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Midwest advance bidding closed after the Sept 23–24, 2026 event. */
export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error:
        'Midwest advance bidding is closed. The silent auction archive remains available for reference.',
    },
    { status: 410 },
  );
}
