import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAuctionLot,
  midwestAuctionLots,
  formatSats,
  formatOpeningBid,
  type AuctionLot,
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

/**
 * Keep page 1 short enough for one US Letter print page
 * (header + rules + rows + winner box). Page 2 is continuation only.
 */
const PRIMARY_ROWS = 8;
const CONTINUATION_ROWS = 18;

function BidRows({
  count,
  startAt,
}: {
  count: number;
  startAt: number;
}) {
  return (
    <table className="mt-2 w-full border-collapse text-[11px] print:mt-1.5 print:text-[10px]">
      <thead>
        <tr className="border-b-2 border-black text-left text-[9px] uppercase tracking-[0.1em]">
          <th className="w-6 py-1 pr-1">#</th>
          <th className="w-[22%] py-1 pr-1.5">Name</th>
          <th className="w-[28%] py-1 pr-1.5">Email</th>
          <th className="w-[18%] py-1 pr-1.5">Phone</th>
          <th className="py-1">Bid in sats</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: count }, (_, i) => (
          <tr key={i} className="border-b border-black/30">
            <td className="py-1.5 pr-1 align-bottom text-black/40 print:py-1">
              {startAt + i}
            </td>
            <td className="py-1.5 pr-1.5 align-bottom print:py-1">
              <span className="block min-h-[0.95rem] border-b border-dotted border-black/40 print:min-h-[0.85rem]" />
            </td>
            <td className="py-1.5 pr-1.5 align-bottom print:py-1">
              <span className="block min-h-[0.95rem] border-b border-dotted border-black/40 print:min-h-[0.85rem]" />
            </td>
            <td className="py-1.5 pr-1.5 align-bottom print:py-1">
              <span className="block min-h-[0.95rem] border-b border-dotted border-black/40 print:min-h-[0.85rem]" />
            </td>
            <td className="py-1.5 align-bottom print:py-1">
              <span className="block min-h-[0.95rem] border-b border-dotted border-black/40 print:min-h-[0.85rem]" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function LotHeader({ lot, compact = false }: { lot: AuctionLot; compact?: boolean }) {
  if (compact) {
    return (
      <div className="border border-black px-3 py-2">
        <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-black/55">
          Continuation · {lot.lotCode} · same clipboard as page 1
        </p>
        <h2 className="mt-0.5 text-base font-light uppercase tracking-tight">
          {lot.title}
        </h2>
        <p className="mt-0.5 text-[11px]">
          <strong>{lot.artistName}</strong> · Opening {formatOpeningBid(lot)} · +
          {formatSats(lot.incrementSats)}
        </p>
      </div>
    );
  }

  return (
    <div className="border border-black p-3 print:p-2.5">
      <h2 className="text-lg font-light uppercase tracking-tight print:text-base">
        {lot.title}
      </h2>
      {lot.subtitle ? (
        <p className="mt-0.5 text-xs text-black/70">{lot.subtitle}</p>
      ) : null}
      <p className="mt-1 text-xs">
        <strong>{lot.artistName}</strong> · {lot.year} · {lot.medium} ·{' '}
        {lot.dimensions}
      </p>
      <div className="mt-1.5 grid gap-0.5 text-xs sm:grid-cols-2">
        <p>
          <span className="underline">Opening:</span>{' '}
          <strong>{formatOpeningBid(lot)}</strong>
        </p>
        <p>
          <span className="underline">Min increase:</span>{' '}
          <strong>{formatSats(lot.incrementSats)}</strong>
        </p>
        <p>
          <span className="underline">Proceeds:</span> {lot.bftaShare} BFTA ·{' '}
          {lot.artistShare} artist
        </p>
        <p>
          <span className="underline">Closes:</span> {lot.closesDisplay}
        </p>
      </div>
      <div className="mt-2 border border-black/20 bg-black/[0.03] px-2.5 py-1.5 text-[10px] leading-snug print:text-[9px]">
        <p className="font-semibold uppercase tracking-[0.06em]">Rules</p>
        <p className="mt-0.5">
          Sign name, email and/or phone, bid in sats (≥{' '}
          {formatSats(lot.incrementSats)} above prior). Closes{' '}
          <strong>Thu Sept 24 · 3:00 PM ET</strong>. Winner claims by{' '}
          <strong>4:00 PM ET</strong> or lot goes to the{' '}
          <strong>next highest bidder</strong>. Columbus pickup only. Staff:
          seed row 1 from Airtable advance bids before doors open.
        </p>
      </div>
    </div>
  );
}

function WinnerBox() {
  return (
    <div className="mt-2 break-inside-avoid border border-black p-2.5 text-[10px] print:mt-1.5 print:p-2">
      <p className="font-semibold uppercase tracking-[0.08em]">
        Winner claim · staff use
      </p>
      <div className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-1.5">
        <p>
          <span className="uppercase tracking-[0.06em]">Winning bid (sats)</span>
          <span className="mt-1 block min-h-[1.1rem] border-b border-black/40" />
        </p>
        <p>
          <span className="uppercase tracking-[0.06em]">Winner name</span>
          <span className="mt-1 block min-h-[1.1rem] border-b border-black/40" />
        </p>
        <p>
          <span className="uppercase tracking-[0.06em]">Winner email</span>
          <span className="mt-1 block min-h-[1.1rem] border-b border-black/40" />
        </p>
        <p>
          <span className="uppercase tracking-[0.06em]">Winner phone</span>
          <span className="mt-1 block min-h-[1.1rem] border-b border-black/40" />
        </p>
        <p className="col-span-2">
          <span className="uppercase tracking-[0.06em]">
            Claimed by 4:00 PM ET?
          </span>{' '}
          □ Yes · paid/arranged &nbsp; □ No · next bidder &nbsp; Staff:
          __________
        </p>
        <p className="col-span-2">
          <span className="uppercase tracking-[0.06em]">Payment</span> □ Card
          (Stripe) &nbsp; □ Bitcoin/BTCPay &nbsp; □ Lightning &nbsp; □ Other
          _______
        </p>
      </div>
    </div>
  );
}

export default async function AuctionBidSheetPage({ params }: Props) {
  const { slug } = await params;
  const lot = getAuctionLot(slug);
  if (!lot) notFound();

  return (
    <main className="bid-sheet-print min-h-screen bg-white text-black print:bg-white">
      <style>{`
        @media print {
          @page {
            size: letter portrait;
            margin: 0.4in;
          }
          .bid-sheet-print {
            min-height: 0 !important;
          }
          .bid-sheet-page-1 {
            break-after: page;
            page-break-after: always;
          }
          .bid-sheet-page-2 {
            break-before: page;
            page-break-before: always;
          }
        }
      `}</style>

      <div className="mx-auto max-w-[8.5in] px-6 pt-6 print:hidden">
        <p className="text-sm text-black/65">
          Print dialog should show <strong>exactly 2 pages</strong>. Use
          “Default” / letter, and turn off headers/footers if your browser adds
          them. Extra rows:{' '}
          <Link
            href="/midwest/auction/bid-sheet-extra"
            className="font-medium underline underline-offset-2"
          >
            /midwest/auction/bid-sheet-extra
          </Link>
        </p>
      </div>

      {/* PAGE 1 — must fit one letter sheet */}
      <div className="bid-sheet-page bid-sheet-page-1 mx-auto max-w-[8.5in] px-6 py-4 print:max-w-none print:px-0 print:py-0">
        <p className="text-center text-[9px] font-medium uppercase tracking-[0.18em] text-black/55">
          Bitcoin for the Arts · 501(c)(3) · {lot.eventName}
        </p>
        <h1 className="mt-1 text-center text-xl font-semibold uppercase tracking-tight print:text-lg">
          Peer-to-Peer Silent Auction Bid Sheet
        </h1>
        <p className="mt-0.5 text-center text-xs font-medium uppercase tracking-[0.08em]">
          {lot.lotCode} · Page 1 of 2
        </p>

        <div className="mt-3 print:mt-2">
          <LotHeader lot={lot} />
        </div>

        <BidRows count={PRIMARY_ROWS} startAt={1} />
        <WinnerBox />

        <p className="mt-1.5 text-center text-[9px] text-black/45">
          More names on page 2 · Extra blanks: /midwest/auction/bid-sheet-extra
        </p>
      </div>

      {/* PAGE 2 — continuation only */}
      <div className="bid-sheet-page bid-sheet-page-2 mx-auto max-w-[8.5in] px-6 py-4 print:max-w-none print:px-0 print:py-0">
        <p className="text-center text-[9px] font-medium uppercase tracking-[0.18em] text-black/55">
          Bitcoin for the Arts · Silent auction continuation
        </p>
        <p className="mt-0.5 text-center text-xs font-medium uppercase tracking-[0.08em]">
          {lot.lotCode} · Page 2 of 2 · rows {PRIMARY_ROWS + 1}–
          {PRIMARY_ROWS + CONTINUATION_ROWS}
        </p>

        <div className="mt-3 print:mt-2">
          <LotHeader lot={lot} compact />
        </div>

        <BidRows count={CONTINUATION_ROWS} startAt={PRIMARY_ROWS + 1} />

        <p className="mt-3 text-[10px] leading-snug text-black/60">
          Same rules as page 1: closes Thu Sept 24 · 3:00 PM ET. Winner claims
          by 4:00 PM ET or next highest bidder. Clip under page 1.
        </p>
      </div>
    </main>
  );
}
