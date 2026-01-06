import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    showDonatePopup: process.env.NEXT_PUBLIC_SHOW_DONATE_POPUP !== '0',
    showHomeIntro: process.env.NEXT_PUBLIC_SHOW_HOME_INTRO !== '0',
    donatePopupImage:
      process.env.NEXT_PUBLIC_DONATE_POPUP_IMAGE ||
      process.env.NEXT_PUBLIC_HERO_DONATE_IMAGE ||
      null,
  });
}

