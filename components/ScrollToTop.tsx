'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView();
  return true;
}

function scrollForLocation() {
  const hash = window.location.hash;
  if (!hash) {
    window.scrollTo(0, 0);
    return;
  }

  const run = () => scrollToHash(hash);
  // Wait a frame so the destination page DOM is mounted.
  requestAnimationFrame(() => {
    if (!run()) {
      window.setTimeout(run, 50);
    }
  });
}

export default function ScrollToTop() {
  const pathname = usePathname();
  const prev = useRef(pathname);

  useEffect(() => {
    if (prev.current !== pathname) {
      prev.current = pathname;
      scrollForLocation();
    }
  }, [pathname]);

  // Same-page hash changes (e.g. Cultural Events while already on /programming).
  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash) {
        scrollToHash(window.location.hash);
      }
    };
    window.addEventListener('hashchange', onHashChange);

    // Initial load with a hash (direct link / refresh).
    if (window.location.hash) {
      scrollForLocation();
    }

    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return null;
}
