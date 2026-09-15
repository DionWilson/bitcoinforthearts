import type { Metadata } from 'next';
import Link from 'next/link';
import DonateThankYouMessageForm from '@/components/DonateThankYouMessageForm';

export const metadata: Metadata = {
  title: 'Thank You | Donate',
  description:
    'Thank you for supporting Bitcoin for the Arts. Your gift funds artist micro-grants, education, and cultural programming.',
  robots: { index: false, follow: false },
};

export default function DonateThankYouPage({
  searchParams,
}: {
  searchParams?: { thanks?: string; orderId?: string };
}) {
  const orderId = searchParams?.orderId?.trim() || undefined;
  const heroImage = process.env.NEXT_PUBLIC_HERO_DONATE_IMAGE ?? '/bitcoin band.JPG';

  return (
    <main className="min-h-screen bg-[#FFFAF0] text-black">
      <section className="relative overflow-hidden border-b border-black/10">
        {/* Atmosphere: full-bleed image + warm overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImage}')` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[#FFFAF0]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #FF4F14 0%, transparent 45%), radial-gradient(circle at 80% 10%, #B3FF48 0%, transparent 35%)',
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-3xl px-6 pb-16 pt-20 text-center sm:pb-20 sm:pt-28">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#B3FF48]">
            Bitcoin for the Arts
          </p>
          <h1 className="mt-4 text-4xl font-light uppercase tracking-tight text-[#FFFAF0] sm:text-5xl md:text-6xl">
            Thank you.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#FFFAF0]/90 sm:text-lg">
            Your gift supports artists through Bitcoin micro-grants, education, and
            cultural programming. A receipt should arrive by email from checkout.
          </p>
          {orderId ? (
            <p className="mt-4 text-xs tracking-wide text-[#FFFAF0]/65">
              Reference{' '}
              <span className="font-mono text-[#FFFAF0]/90">{orderId}</span>
            </p>
          ) : null}
        </div>
      </section>

      <section className="relative mx-auto max-w-3xl px-6 pb-20 pt-10 sm:pt-14">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.35)] sm:p-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#FF4F14]">
            Optional
          </p>
          <h2 className="mt-2 text-2xl font-light uppercase tracking-tight sm:text-3xl">
            Leave us a message
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-black/65">
            Tell us why you gave, dedicate the gift, or just say hello. We read every note.
          </p>
          <div className="mt-6">
            <DonateThankYouMessageForm orderId={orderId} />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/midwest"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#B3FF48]"
          >
            Bitcoin Arts Park →
          </Link>
          <Link
            href="/stories"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-black/20 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide"
          >
            Artist stories →
          </Link>
          <Link
            href="/donate"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-black/20 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide"
          >
            Back to donate →
          </Link>
        </div>

        <p className="mt-10 text-center text-xs leading-relaxed text-black/50">
          Bitcoin for the Arts, Inc. · 501(c)(3) · EIN 41-2642260
        </p>
      </section>
    </main>
  );
}
