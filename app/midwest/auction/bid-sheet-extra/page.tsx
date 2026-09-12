import type { Metadata } from 'next';
import Link from 'next/link';
import { midwestAuctionLots } from '@/lib/midwest-auction-lots';

export const metadata: Metadata = {
  title: 'Bid Sheet Extra Pages | Bitcoin for the Arts',
  robots: { index: false, follow: false },
};

export default function BidSheetExtraPage() {
  return (
    <main className="min-h-screen bg-[#FFFAF0] text-black">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#FF4F14]">
          Clipboard print
        </p>
        <h1 className="mt-3 text-3xl font-light uppercase tracking-tight">
          Extra bid pages
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-black/75">
          Shared blank continuation PDF for any lot. Write the lot code, title,
          and artist at the top, then clip under that lot’s sheet when rows run
          out. Full-page tall handwriting rows.
        </p>

        <a
          href="/midwest/bid-sheets/extra-bid-pages.pdf"
          className="mt-6 inline-block bg-black px-5 py-3 text-[12px] font-medium uppercase tracking-[0.14em] text-[#B3FF48]"
        >
          Download extra bid pages PDF →
        </a>

        <p className="mt-8 text-sm text-black/65">Lot sheets:</p>
        <ul className="mt-2 space-y-1 text-sm">
          {midwestAuctionLots.map((lot) => (
            <li key={lot.slug}>
              <Link
                href={`/midwest/auction/${lot.slug}/bid-sheet`}
                className="underline underline-offset-2"
              >
                {lot.lotCode} · {lot.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
