'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  getZapriteDonationLink,
  getZapriteFixedDonationOptions,
} from '@/lib/zaprite-donation';
// BFTA 2026 brand bug — same cream-orange "alt" mark used in nav, footer,
// and the home/about hero columns, so the popup reads as part of the same
// brand system instead of dropping the old gold badge in.
const POPUP_LOGO_SRC = '/brand-kit/square-bugs/square-cream-orange-alt.png';

const STORAGE_KEY = 'bfta_donate_popup_dismissed_session';
const HOME_SCROLL_KEY = 'bfta_donate_popup_home_scrolled_session';
const WEBINAR_PROMO_KEY = 'bfta_home_webinar_promo_dismissed_session';

function isSuppressedPath(pathname: string) {
  // Don’t interrupt the donation flow or internal routes.
  if (pathname.startsWith('/donate')) return true;
  if (pathname.startsWith('/api')) return true;
  return false;
}

export default function AutoDonatePopup() {
  const pathname = usePathname() ?? '/';
  const enabled = process.env.NEXT_PUBLIC_SHOW_DONATE_POPUP !== '0';
  const homeHasIntro = process.env.NEXT_PUBLIC_SHOW_HOME_INTRO !== '0';
  const suppressForWebinar = process.env.NEXT_PUBLIC_SUPPRESS_DONATE_POPUP_FOR_WEBINAR === '1';
  const webinarPromoEnabled = process.env.NEXT_PUBLIC_SHOW_WEBINAR_PROMO === '1';
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const amountOptions = useMemo(() => getZapriteFixedDonationOptions(), []);
  const customAmountUrl = useMemo(() => getZapriteDonationLink(), []);
  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
  }, []);

  const popupImageSrc = useMemo(() => {
    const src =
      process.env.NEXT_PUBLIC_DONATE_POPUP_IMAGE ||
      process.env.NEXT_PUBLIC_HERO_DONATE_IMAGE ||
      '/bitcoin band.JPG';
    return src;
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined') return;
    if (isSuppressedPath(pathname)) return;

    // If a webinar promo is running, avoid competing with it (especially on homepage).
    // This is session-scoped: once the user dismisses the promo, the donation popup can appear on next visit.
    if (suppressForWebinar && webinarPromoEnabled && pathname === '/') {
      try {
        if (window.sessionStorage.getItem(WEBINAR_PROMO_KEY) !== '1') return;
      } catch {
        return;
      }
    }

    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === '1') return;
    } catch {
      // ignore
    }

    // If the homepage intro video is enabled, only start the timer after the user
    // begins to scroll (so we don’t pop over the video).
    const shouldWaitForScroll = pathname === '/' && homeHasIntro;

    const startTimer = () => {
      const t = window.setTimeout(() => setOpen(true), 30_000);
      return () => window.clearTimeout(t);
    };

    if (!shouldWaitForScroll) {
      return startTimer();
    }

    // If they already scrolled this session, behave normally.
    try {
      if (window.sessionStorage.getItem(HOME_SCROLL_KEY) === '1') {
        return startTimer();
      }
    } catch {
      // ignore
    }

    let cleanupTimer: (() => void) | null = null;
    const onFirstScroll: EventListener = () => {
      try {
        window.sessionStorage.setItem(HOME_SCROLL_KEY, '1');
      } catch {
        // ignore
      }
      window.removeEventListener('scroll', onFirstScroll);
      window.removeEventListener('wheel', onFirstScroll);
      window.removeEventListener('touchmove', onFirstScroll);
      cleanupTimer = startTimer();
    };

    window.addEventListener('scroll', onFirstScroll, { passive: true });
    window.addEventListener('wheel', onFirstScroll, { passive: true });
    window.addEventListener('touchmove', onFirstScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onFirstScroll);
      window.removeEventListener('wheel', onFirstScroll);
      window.removeEventListener('touchmove', onFirstScroll);
      cleanupTimer?.();
    };
  }, [enabled, pathname, homeHasIntro, suppressForWebinar, webinarPromoEnabled]);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        dismiss();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dismiss, open]);

  if (!enabled) return null;
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close donation popup"
        className="absolute inset-0 bg-black/50"
        onClick={dismiss}
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Support Bitcoin For The Arts"
        className="absolute inset-0 flex items-end justify-center p-4 sm:items-center"
      >
        <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
          {/* Subtle brand wash — orange + lime, matching SiteBackground. */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(255,79,20,0.16),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(179,255,72,0.18),transparent_50%)]" />

          <div className="relative h-36 w-full">
            <Image
              src={popupImageSrc}
              alt="Artists and community supported by Bitcoin For The Arts"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 512px"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
          </div>

          <div className="relative p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <Image
                    src={POPUP_LOGO_SRC}
                    alt="Bitcoin For The Arts logo"
                    width={36}
                    height={36}
                    className="rounded-md border border-border"
                  />
                  <div className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
                    Bitcoin For The Arts
                  </div>
                </div>
                <div className="mt-3 text-xl font-semibold tracking-tight">
                  Help fund the next renaissance in the arts.
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Your gift helps us pay artists in Bitcoin through micro-grants, workshops, and
                  our HODL Vault endowment—so creative work can thrive for generations.
                </p>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={dismiss}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-sm font-semibold transition-colors hover:bg-surface"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">
              Suggested amounts (USD)
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {amountOptions.map((option) => (
                <a
                  key={option.amount}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
                  onClick={dismiss}
                >
                  {option.label}
                </a>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={customAmountUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-background px-4 py-3 text-sm font-semibold transition-colors hover:bg-surface"
                onClick={dismiss}
              >
                Custom amount
              </a>
              <button
                type="button"
                onClick={dismiss}
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-surface px-4 py-3 text-sm font-semibold transition-colors hover:opacity-90"
              >
                Not now
              </button>
            </div>

            <div className="mt-4 text-xs leading-relaxed text-muted">
              You can always donate later via the Donate page.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

