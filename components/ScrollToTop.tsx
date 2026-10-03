'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const HEADER_GAP_PX = 24;

/**
 * Scroll so the target section clears the sticky header — including its
 * top border / padding, not just the first line of text.
 */
export function scrollToIdBelowHeader(id: string) {
  const heading =
    id === 'cultural-events'
      ? document.getElementById('cultural-events-heading')
      : null;
  // Prefer the enclosing section so border-t + padding clear the nav too.
  const section = heading?.closest('section') ?? null;
  const el = section ?? heading ?? document.getElementById(id);
  if (!el) return false;

  const header = document.querySelector('header');
  const headerH =
    header instanceof HTMLElement ? header.getBoundingClientRect().height : 80;
  const top =
    el.getBoundingClientRect().top + window.scrollY - headerH - HEADER_GAP_PX;
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
