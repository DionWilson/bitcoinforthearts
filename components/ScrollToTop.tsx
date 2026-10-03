'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const HEADER_GAP_PX = 16;

/** Scroll so `id` sits just below the sticky site header. */
export function scrollToIdBelowHeader(id: string) {
  const el = document.getElementById(id);
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
  // Client nav can mount the target a beat late — retry briefly.
  requestAnimationFrame(() => {
    if (run()) return;
    window.setTimeout(run, 50);
    window.setTimeout(run, 150);
    window.setTimeout(run, 300);
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
