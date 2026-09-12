import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAuctionLot,
  midwestAuctionLots,
  formatSats,
  formatOpeningBid,
} from '@/lib/midwest-auction-lots';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return midwestAuctionLots.map((lot) => ({ slug: lot.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lot = getAuctionLot(slug);
  if (!lot) return { title: 'Bid Sheet' };
  return {
    title: `Bid Sheet · ${lot.title} | Bitcoin for the Arts`,
    robots: { index: false, follow: false },
  };
}

export default async function AuctionBidSheetPage({ params }: Props) {
  const { slug } = await params;
  const lot = getAuctionLot(slug);
  if (!lot) notFound();

  const pdfHref = `/midwest/bid-sheets/${lot.lotCode.toLowerCase()}-${lot.slug}-bid-sheet.pdf`;

  return (
    <main className="min-h-screen bg-[#FFFAF0] text-black">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#FF4F14]">
          {lot.lotCode} · clipboard print
        </p>
        <h1 className="mt-3 text-3xl font-light uppercase tracking-tight">
          {lot.title}
        </h1>
        <p className="mt-2 text-sm text-black/70">
          {lot.artistName} · {formatOpeningBid(lot)} · +
          {formatSats(lot.incrementSats)}
        </p>

        <div className="mt-8 border border-black bg-white p-6">
          <p className="text-sm leading-relaxed text-black/80">
            Use the <strong>letter-size PDF</strong> for the clipboard. It is
            built for handwriting: full-page height, tall rows, Name · Email ·
            Phone · Bid in sats. Two pages per lot (page 2 has the winner claim
            box at the bottom).
          </p>
          <a
            href={pdfHref}
            className="mt-5 inline-block bg-black px-5 py-3 text-[12px] font-medium uppercase tracking-[0.14em] text-[#B3FF48]"
          >
            Download {lot.lotCode} bid sheet PDF →
          </a>
          <p className="mt-4 text-xs text-black/55">
            Print at 100% scale, Letter, portrait. Do not “fit to page.”
          </p>
        </div>

        <ul className="mt-8 space-y-2 text-sm text-black/70">
          <li>
            <Link
              href="/midwest/bid-sheets/extra-bid-pages.pdf"
              className="font-medium text-black underline underline-offset-2"
            >
              Extra blank bid pages PDF
            </Link>{' '}
            (shared template for any lot)
          </li>
          <li>
            <Link
              href="/midwest/bid-sheets/all-midwest-bid-sheets.pdf"
              className="font-medium text-black underline underline-offset-2"
            >
              All lots + extras in one PDF
            </Link>
          </li>
          <li>
            <Link
              href="/midwest/auction"
              className="underline underline-offset-2"
            >
              ← All auction lots
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
