'use client';

import { Children, useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
  showDots?: boolean;
  dotsClassName?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function MobileCarousel({
  ariaLabel,
  children,
  className = '',
  showDots = true,
  dotsClassName = '',
}: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const itemCount = useMemo(() => Children.count(children), [children]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepPx, setStepPx] = useState<number | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const measure = () => {
      const items = el.querySelectorAll<HTMLElement>('[data-carousel-item="true"]');
      if (!items.length) return;
      if (items.length >= 2) {
        const step = Math.max(1, items[1].offsetLeft - items[0].offsetLeft);
        setStepPx(step);
      } else {
        setStepPx(items[0].getBoundingClientRect().width);
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el || !stepPx) return;
    const idx = clamp(Math.round(el.scrollLeft / stepPx), 0, Math.max(0, itemCount - 1));
    setActiveIndex(idx);
  };

  const scrollToIndex = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const target = el.querySelectorAll<HTMLElement>('[data-carousel-item="true"]')[idx];
    if (!target) return;
    el.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
  };

  if (itemCount <= 0) return null;

  return (
    <div className="relative">
      {/* Edge fades for “peek” + polish */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent" />

      <div
        ref={scrollerRef}
        aria-label={ariaLabel}
        onScroll={onScroll}
        className={[
          'snap-carousel flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth',
          className,
        ].join(' ')}
      >
        {children}
      </div>

      {showDots && itemCount > 1 ? (
        <div
          className={['mt-3 flex items-center justify-center gap-2', dotsClassName].join(' ')}
        >
          {Array.from({ length: itemCount }).map((_, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                className={[
                  'min-h-12 min-w-12 rounded-full border border-border bg-background transition-colors',
                  'flex items-center justify-center',
                ].join(' ')}
                aria-label={`Go to slide ${i + 1}`}
              >
                <span
                  className={[
                    'h-2.5 w-2.5 rounded-full',
                    isActive
                      ? 'bg-[linear-gradient(90deg,rgba(126,87,194,0.95),rgba(247,147,26,0.9))]'
                      : 'bg-border',
                  ].join(' ')}
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

