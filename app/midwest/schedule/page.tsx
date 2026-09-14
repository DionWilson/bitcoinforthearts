import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MIDWEST_SCHEDULE_META,
  midwestScheduleDays,
  type ScheduleItem,
  type ScheduleKind,
} from '@/lib/midwest-arts-park-schedule';

export const metadata: Metadata = {
  title: 'Schedule | Bitcoin Arts Park · Midwest Bitcoin Summit',
  description:
    'Hour-by-hour Bitcoin Arts Park schedule for the Midwest Bitcoin Summit, September 23–24, 2026 in Columbus. Cinema, Expo Stage performances, film pitches, silent auction, and raffle.',
  openGraph: {
    title: 'Bitcoin Arts Park Schedule · Midwest Bitcoin Summit',
    description:
      'Two-day run-of-show for Bitcoin for the Arts at the Midwest Bitcoin Summit. Columbus, Sept 23–24, 2026.',
    type: 'website',
  },
};

function kindClass(kind: ScheduleKind): string {
  switch (kind) {
    case 'stage':
    case 'panel':
      return 'border-l-[#FF4F14]';
    case 'cinema':
      return 'border-l-[#B3FF48]';
    case 'pitch':
    case 'booth':
      return 'border-l-black';
    default:
      return 'border-l-black/25';
  }
}

function ScheduleRow({ item }: { item: ScheduleItem }) {
  return (
    <li
      className={`grid gap-1 border-l-4 bg-white px-4 py-3 sm:grid-cols-[7.5rem_5.5rem_1fr] sm:gap-4 ${kindClass(item.kind)}`}
    >
      <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-black/70">
        {item.time}
      </p>
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#FF4F14]">
        {item.place}
      </p>
      <div>
        <p className="text-sm font-medium leading-snug text-black sm:text-base">
          {item.title}
        </p>
        {item.detail ? (
          <p className="mt-1 text-sm leading-relaxed text-black/65">{item.detail}</p>
        ) : null}
      </div>
    </li>
  );
}

export default function MidwestSchedulePage() {
  return (
    <main className="min-h-screen bg-[#FFFAF0] text-black">
      <section className="border-b border-black/10 bg-black px-6 py-10 text-[#FFFAF0] sm:px-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B3FF48]">
          {MIDWEST_SCHEDULE_META.eventName} · {MIDWEST_SCHEDULE_META.summitName}
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-light uppercase tracking-tight sm:text-5xl">
          Two-day schedule
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#FFFAF0]/90">
          Greater Columbus Convention Center · September 23–24, 2026 ·{' '}
          {MIDWEST_SCHEDULE_META.hours}. Cinema, Expo Stage, film pitches, gallery,
          and the Living Room — programmed by Bitcoin for the Arts.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={MIDWEST_SCHEDULE_META.pdfPath}
            className="inline-block bg-[#FF4F14] px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#FFFAF0]"
          >
            Download printable PDF →
          </a>
          <Link
            href="/midwest"
            className="inline-block border border-[#FFFAF0]/40 px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#FFFAF0]"
          >
            Bitcoin Arts Park home →
          </Link>
          <Link
            href="/midwest/auction"
            className="inline-block border border-[#FFFAF0]/40 px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#FFFAF0]"
          >
            Silent auction →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10 sm:px-10">
        <div className="border border-black/15 bg-white p-5 sm:p-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#FF4F14]">
            Always on · both days · 10:00–5:00
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {MIDWEST_SCHEDULE_META.alwaysOn.map((line) => (
              <li key={line} className="text-sm leading-relaxed text-black/80">
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          {midwestScheduleDays.map((day) => (
            <section key={day.id}>
              <h2 className="text-2xl font-light uppercase tracking-tight">
                {day.label}
              </h2>
              <p className="mt-1 text-sm text-black/60">{day.dateLabel}</p>
              <ul className="mt-5 space-y-2">
                {day.items.map((item) => (
                  <ScheduleRow
                    key={`${day.id}-${item.time}-${item.title}`}
                    item={item}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-12 space-y-3 border-t border-black/10 pt-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#FF4F14]">
            Notes
          </p>
          <ul className="space-y-2">
            {MIDWEST_SCHEDULE_META.notes.map((note) => (
              <li key={note} className="text-sm leading-relaxed text-black/70">
                {note}
              </li>
            ))}
          </ul>
          <p className="pt-4 text-sm text-black/55">
            {MIDWEST_SCHEDULE_META.timezoneNote} Questions:{' '}
            <a
              href="mailto:dionwilson@bitcoinforthearts.org"
              className="font-medium text-black underline underline-offset-2"
            >
              dionwilson@bitcoinforthearts.org
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
