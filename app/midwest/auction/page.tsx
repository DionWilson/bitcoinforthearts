import type { Metadata } from 'next';
import Link from 'next/link';
import {
  midwestAuctionLots,
  formatOpeningBidLine,
} from '@/lib/midwest-auction-lots';

export const metadata: Metadata = {
  title: 'Silent Auction Archive | Bitcoin Arts Park · Midwest',
  description:
    'Read-only archive of peer-to-peer silent auction lots from Bitcoin Arts Park at the Midwest Bitcoin Summit. Advance bidding is closed.',
};

export default function MidwestAuctionIndexPage() {
  return (
    <main className="min-h-screen bg-[#FFFAF0] text-black">
      <section className="border-b border-black/10 bg-black px-6 py-10 text-[#FFFAF0] sm:px-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B3FF48]">
          Archive · Bitcoin Arts Park · Midwest Bitcoin Summit
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-light uppercase tracking-tight sm:text-5xl">
          Peer-to-Peer Silent Auction
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#FFFAF0]/90">
          This auction is closed. Lot pages remain online as a read-only record
          for artists, patrons, and settlement. For the public Midwest story, see
          Cultural Events.
        </p>
        <div className="mt-6">
          <Link
            href="/programming#midwest-2026"
            className="inline-block border border-[#FFFAF0]/40 px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#FFFAF0]"
          >
            Cultural Events record →
          </Link>
        </div>
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
                  {formatOpeningBidLine(lot)}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href={`/midwest/auction/${lot.slug}`}
                    className="inline-block bg-black px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#B3FF48]"
                  >
                    Lot details →
                  </Link>
                  {lot.status === 'open' && lot.startingBidSats != null ? (
                    <Link
                      href={`/midwest/auction/${lot.slug}#advance-bid`}
                      className="inline-block bg-[#FF4F14] px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#FFFAF0]"
                    >
                      Advance bid →
                    </Link>
                  ) : null}
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
          Print packs and bid sheets remain available for settlement reference.
          Ops notes live in{' '}
          <code className="text-black">docs/midwest-2026/auction/</code>. Board
          expense checklist:{' '}
          <code className="text-black">docs/midwest-2026/BOARD-EXPENSE-REVIEW.md</code>.
        </p>
      </section>
    </main>
  );
}
