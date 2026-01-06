import { NextResponse } from 'next/server';

function has(name: string) {
  const v = process.env[name];
  return Boolean(v && v.trim());
}

export async function GET() {
  // Safe diagnostic endpoint: only indicates presence, not values.
  return NextResponse.json({
    ok: true,
    vercelEnv: process.env.VERCEL_ENV ?? null,
    configured: {
      x: has('NEXT_PUBLIC_SOCIAL_X'),
      tiktok: has('NEXT_PUBLIC_SOCIAL_TIKTOK'),
      facebook: has('NEXT_PUBLIC_SOCIAL_FACEBOOK'),
      nostr: has('NEXT_PUBLIC_SOCIAL_NOSTR'),
      linkedin: has('NEXT_PUBLIC_SOCIAL_LINKEDIN'),
      instagram: has('NEXT_PUBLIC_SOCIAL_INSTAGRAM'),
    },
  });
}

