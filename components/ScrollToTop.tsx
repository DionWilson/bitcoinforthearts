'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const HEADER_GAP_PX = 20;

/**
 * Scroll so the *visible* cultural-events block clears the sticky header.
 * Prefer the section heading if present; otherwise the hash target.
 */
export function scrollToIdBelowHeader(id: string) {
  const heading =
    id === 'cultural-events'
      ? document.getElementById('cultural-events-heading')
      : null;
  const el = heading ?? document.getElementById(id);
  if (!el) return false;

  const header = document.querySelector('header');
  const headerH =
    header instanceof HTMLElement ? header.getBoundingClientRect().height : 80;
  // For the cultural-events heading, also clear the small eyebrow above it.
  const extra = heading ? 36 : 0;
  const top =
    el.getBoundingClientRect().top +
    window.scrollY -
    headerH -
    HEADER_GAP_PX -
    extra;
  window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
  return true;
}

function scrollForHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return;

  const run = () => scrollToIdBelowHeader(id);
  // Client nav + browser hash scroll can fight us; keep correcting briefly.
  requestAnimationFrame(() => {
    run();
    window.setTimeout(run, 50);
    window.setTimeout(run, 150);
    window.setTimeout(run, 300);
    window.setTimeout(run, 500);
    window.setTimeout(run, 800);
  });
}

export default function ScrollToTop() {
  const pathname = usePathname();
  const prev = useRef(pathname);

  useEffect(() => {
    const pathChanged = prev.current !== pathname;
    prev.current = pathname;

    const hash = window.location.hash;
    if (hash) {
      scrollForHash(hash);
      return;
    }

    if (pathChanged) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash) {
        scrollForHash(window.location.hash);
      }
    };
    window.addEventListener('hashchange', onHashChange);

    if (window.location.hash) {
      scrollForHash(window.location.hash);
    }

    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return null;
}
