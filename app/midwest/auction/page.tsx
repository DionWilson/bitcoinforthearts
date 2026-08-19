import type { Metadata } from 'next';
import Link from 'next/link';
import {
  midwestAuctionLots,
  formatUsd,
  formatSats,
} from '@/lib/midwest-auction-lots';

export const metadata: Metadata = {
  title: 'Silent Auction | Bitcoin Arts Park · Midwest Bitcoin Summit',
  description:
    'Peer-to-peer silent auction lots at Bitcoin Arts Park during the Midwest Bitcoin Summit. Bid in person; one-third of proceeds support Bitcoin for the Arts.',
};

export default function MidwestAuctionIndexPage() {
  return (
    <main className="min-h-screen bg-[#FFFAF0] text-black">
      <section className="border-b border-black/10 bg-black px-6 py-10 text-[#FFFAF0] sm:px-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B3FF48]">
          Bitcoin Arts Park · Midwest Bitcoin Summit
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-light uppercase tracking-tight sm:text-5xl">
          Peer-to-Peer Silent Auction
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#FFFAF0]/90">
          Donated works. In-person bidding on the Expo floor. One-third of each
          hammer price supports Bitcoin for the Arts. Scan the QR next to any
          lot for full details.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12 sm:px-10">
        <ul className="grid gap-8 sm:grid-cols-2">
          {midwestAuctionLots.map((lot) => (
            <li key={lot.slug} className="border border-black/15 bg-white">
              {lot.imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={lot.imageSrc}
                  alt={lot.imageAlt ?? lot.title}
                  className="aspect-[3/4] w-full object-cover"
                />
              ) : null}
              <div className="space-y-3 p-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#FF4F14]">
                  {lot.lotCode} · {lot.status}
                </p>
                <h2 className="text-2xl font-light uppercase tracking-tight">
                  {lot.title}
                </h2>
                {lot.subtitle ? (
                  <p className="text-sm text-black/70">{lot.subtitle}</p>
                ) : null}
                <p className="text-sm">
                  <span className="font-medium">{lot.artistName}</span>
                  <span className="text-black/50"> · {lot.year}</span>
                </p>
                <p className="text-sm text-black/80">
                  Opening bid {formatSats(lot.startingBidSats)}
                  {lot.startingBidUsd
                    ? ` / ${formatUsd(lot.startingBidUsd)}`
                    : ''}{' '}
                  · increments {formatSats(lot.incrementSats)}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href={`/midwest/auction/${lot.slug}`}
                    className="inline-block bg-black px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#B3FF48]"
                  >
                    Lot details →
                  </Link>
                  <Link
                    href={`/midwest/auction/${lot.slug}/bid-sheet`}
                    className="inline-block border border-black px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em]"
                  >
                    Bid sheet →
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-black/60">
          To add another donated lot, add an entry in{' '}
          <code className="text-black">lib/midwest-auction-lots.ts</code> — each
          lot automatically gets a detail page and printable bid sheet.
        </p>
      </section>
    </main>
  );
}
