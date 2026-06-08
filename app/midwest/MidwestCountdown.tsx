'use client';

import { useEffect, useState } from 'react';

/**
 * Event start: Wednesday September 23, 2026, 10:00 AM EDT (UTC-4)
 *            = 2026-09-23 14:00:00 UTC
 *
 * Event end:  Thursday September 24, 2026, 5:00 PM EDT (UTC-4)
 *            = 2026-09-24 21:00:00 UTC
 *
 * Source: midwestbtc.com (event hours 10:00 AM – 5:00 PM, Sept 23–24).
 */
const EVENT_START_UTC = Date.UTC(2026, 8, 23, 14, 0, 0); // Sept 23, 2026, 14:00 UTC
const EVENT_END_UTC = Date.UTC(2026, 8, 24, 21, 0, 0); // Sept 24, 2026, 21:00 UTC

type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type State = TimeRemaining | 'live' | 'past' | null;

function compute(): Exclude<State, null> {
  const now = Date.now();
  const diff = EVENT_START_UTC - now;
  if (now >= EVENT_END_UTC) return 'past';
  if (diff <= 0) return 'live';
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function pad(value: number): string {
  return String(Math.max(0, value)).padStart(2, '0');
}

export default function MidwestCountdown() {
  const [state, setState] = useState<State>(null);

  useEffect(() => {
    setState(compute());
    const interval = setInterval(() => setState(compute()), 1000);
    return () => clearInterval(interval);
  }, []);

  // SSR / first paint placeholder — keeps hydration stable.
  if (state === null) {
    return (
      <div
        aria-label="Countdown to the Midwest Bitcoin Summit, loading"
        className="grid grid-cols-4 gap-3 sm:gap-4"
      >
        {['Days', 'Hours', 'Minutes', 'Seconds'].map((label) => (
          <div
            key={label}
            className="rounded-2xl bg-background/10 p-3 text-center sm:p-4"
          >
            <div className="font-mono text-3xl font-bold tabular-nums sm:text-5xl">
              --
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest opacity-70 sm:text-xs">
              {label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (state === 'live') {
    return (
      <p className="text-center text-2xl font-semibold sm:text-3xl">
        It&rsquo;s happening — live now in Columbus.
      </p>
    );
  }

  if (state === 'past') {
    return (
      <p className="text-center text-2xl font-semibold sm:text-3xl">
        Generations 2026 has wrapped. Thank you to everyone who showed up.
      </p>
    );
  }

  const cells = [
    { value: state.days, label: 'Days' },
    { value: state.hours, label: 'Hours' },
    { value: state.minutes, label: 'Minutes' },
    { value: state.seconds, label: 'Seconds' },
  ];

  return (
    <div
      aria-label={`Countdown: ${state.days} days, ${state.hours} hours, ${state.minutes} minutes, ${state.seconds} seconds until the Midwest Bitcoin Summit begins.`}
      role="timer"
      className="grid grid-cols-4 gap-3 sm:gap-4"
    >
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="rounded-2xl bg-background/10 p-3 text-center sm:p-4"
        >
          <div className="font-mono text-3xl font-bold tabular-nums sm:text-5xl">
            {pad(cell.value)}
          </div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest opacity-70 sm:text-xs">
            {cell.label}
          </div>
        </div>
      ))}
    </div>
  );
}
