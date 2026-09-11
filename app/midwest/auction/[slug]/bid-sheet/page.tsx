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

/** Bid rows on the primary clipboard page */
const PRIMARY_ROWS = 12;
/** Extra rows on the attached continuation page */
const CONTINUATION_ROWS = 16;

function BidRows({
  count,
  startAt,
}: {
  count: number;
  startAt: number;
}) {
  return (
    <table className="mt-4 w-full border-collapse text-sm">
      <thead>
        <tr className="border-b-2 border-black text-left text-[10px] uppercase tracking-[0.12em]">
          <th className="w-7 py-2 pr-1">#</th>
          <th className="w-[22%] py-2 pr-2">Name</th>
          <th className="w-[28%] py-2 pr-2">Email</th>
          <th className="w-[18%] py-2 pr-2">Phone</th>
          <th className="py-2">Bid in sats</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: count }, (_, i) => (
          <tr key={i} className="border-b border-black/30">
            <td className="py-2.5 pr-1 align-bottom text-black/40">
              {startAt + i}
            </td>
            <td className="py-2.5 pr-2 align-bottom">
              <span className="block min-h-[1.15rem] border-b border-dotted border-black/40" />
            </td>
            <td className="py-2.5 pr-2 align-bottom">
              <span className="block min-h-[1.15rem] border-b border-dotted border-black/40" />
            </td>
            <td className="py-2.5 pr-2 align-bottom">
              <span className="block min-h-[1.15rem] border-b border-dotted border-black/40" />
            </td>
            <td className="py-2.5 align-bottom">
              <span className="block min-h-[1.15rem] border-b border-dotted border-black/40" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function LotHeader({ lot, compact = false }: { lot: AuctionLot; compact?: boolean }) {
  const detailUrl = `https://www.bitcoinforthearts.org/midwest/auction/${lot.slug}`;

  if (compact) {
    return (
      <div className="border border-black p-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-black/55">
          Continuation page · {lot.lotCode} · keep on same clipboard
        </p>
        <h2 className="mt-1 text-lg font-light uppercase tracking-tight">
          {lot.title}
        </h2>
        <p className="mt-1 text-xs">
          <strong>{lot.artistName}</strong> · Opening {formatOpeningBid(lot)} · +
          {formatSats(lot.incrementSats)} min increase
        </p>
      </div>
    );
  }

  return (
    <div className="border border-black p-4">
      <h2 className="text-xl font-light uppercase tracking-tight">{lot.title}</h2>
      {lot.subtitle ? (
        <p className="mt-1 text-sm text-black/70">{lot.subtitle}</p>
      ) : null}
      <p className="mt-2 text-sm">
        <strong>{lot.artistName}</strong> · {lot.year} · {lot.medium} ·{' '}
        {lot.dimensions}
      </p>
      <div className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
        <p>
          <span className="underline">Opening bid:</span>{' '}
          <strong>{formatOpeningBid(lot)}</strong>
        </p>
        <p>
          <span className="underline">Minimum increase:</span>{' '}
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
      <div className="mt-3 border border-black/25 bg-black/[0.03] p-3 text-[11px] leading-relaxed">
        <p className="font-semibold uppercase tracking-[0.08em]">
          Bidder rules (read before signing)
        </p>
        <ol className="mt-1 list-decimal space-y-0.5 pl-4">
          <li>
            Sign with name, email and/or phone, and bid in sats (at least{' '}
            {formatSats(lot.incrementSats)} above the previous bid).
          </li>
          <li>
            Bidding closes <strong>Thursday, Sept 24 · 3:00 PM ET</strong>. Highest
            valid bid wins.
          </li>
          <li>
            Winner must claim and arrange payment by{' '}
            <strong>4:00 PM ET</strong> the same day (in person at the booth, or
            as staff confirms by phone/email).
          </li>
          <li>
            If the winner does not claim by 4:00 PM ET, the lot is offered to the{' '}
            <strong>next highest bidder</strong>, then down the sheet as needed.
          </li>
          <li>
            Pickup in Columbus only. “About $” figures are orientation only;
            bidding is in sats.
          </li>
        </ol>
        <p className="mt-2 text-black/60">
          Staff: seed row 1 with the high Airtable advance bid before doors open.
          Lot page: <span className="break-all">{detailUrl}</span>
        </p>
      </div>
    </div>
  );
}

function WinnerBox() {
  return (
    <div className="mt-6 border border-black p-4 text-xs">
      <p className="font-semibold uppercase tracking-[0.1em]">
        Winner claim · staff use
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <p>
          <span className="font-medium uppercase tracking-[0.08em]">
            Winning bid (sats)
          </span>
          <span className="mt-2 block min-h-[1.4rem] border-b border-black/40" />
        </p>
        <p>
          <span className="font-medium uppercase tracking-[0.08em]">
            Winner name
          </span>
          <span className="mt-2 block min-h-[1.4rem] border-b border-black/40" />
        </p>
        <p>
          <span className="font-medium uppercase tracking-[0.08em]">
            Winner email
          </span>
          <span className="mt-2 block min-h-[1.4rem] border-b border-black/40" />
        </p>
        <p>
          <span className="font-medium uppercase tracking-[0.08em]">
            Winner phone
          </span>
          <span className="mt-2 block min-h-[1.4rem] border-b border-black/40" />
        </p>
        <p>
          <span className="font-medium uppercase tracking-[0.08em]">
            Claimed by 4:00 PM ET?
          </span>
          <span className="mt-2 block text-[11px]">
            □ Yes · paid / arranged &nbsp;&nbsp; □ No · offered to next bidder
          </span>
        </p>
        <p>
          <span className="font-medium uppercase tracking-[0.08em]">
            Staff initials / time
          </span>
          <span className="mt-2 block min-h-[1.4rem] border-b border-black/40" />
        </p>
        <p className="sm:col-span-2">
          <span className="font-medium uppercase tracking-[0.08em]">
            Payment method
          </span>
          <span className="mt-2 block text-[11px]">
            □ Card (Stripe / donate site) &nbsp; □ Bitcoin / BTCPay &nbsp; □
            Lightning &nbsp; □ Other: _______________
          </span>
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
    <main className="min-h-screen bg-white text-black print:bg-white">
      {/* Screen-only print help */}
      <div className="mx-auto max-w-[8.5in] px-6 pt-6 print:hidden">
        <p className="text-sm text-black/65">
          Print both pages for the clipboard. Need more rows? Use the shared
          continuation template:{' '}
          <Link
            href="/midwest/auction/bid-sheet-extra"
            className="font-medium underline underline-offset-2"
          >
            /midwest/auction/bid-sheet-extra
          </Link>
        </p>
      </div>

      {/* PAGE 1 — primary sheet */}
      <div className="mx-auto max-w-[8.5in] px-6 py-6 print:px-4 print:py-3">
        <p className="text-center text-[10px] font-medium uppercase tracking-[0.22em] text-black/55">
          Bitcoin for the Arts · 501(c)(3) · {lot.eventName}
        </p>
        <h1 className="mt-2 text-center text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
          Peer-to-Peer Silent Auction Bid Sheet
        </h1>
        <p className="mt-1 text-center text-sm font-medium uppercase tracking-[0.08em]">
          {lot.lotCode} · Page 1 of 2
        </p>

        <div className="mt-5">
          <LotHeader lot={lot} />
        </div>

        <BidRows count={PRIMARY_ROWS} startAt={1} />
        <WinnerBox />

        <p className="mt-4 text-center text-[10px] text-black/45">
          Continue on page 2 if this sheet fills · Extra blank pages:{' '}
          bitcoinforthearts.org/midwest/auction/bid-sheet-extra
        </p>
      </div>

      {/* PAGE 2 — lot-specific continuation */}
      <div className="mx-auto max-w-[8.5in] break-before-page px-6 py-6 print:px-4 print:py-3">
        <p className="text-center text-[10px] font-medium uppercase tracking-[0.22em] text-black/55">
          Bitcoin for the Arts · Silent auction continuation
        </p>
        <p className="mt-1 text-center text-sm font-medium uppercase tracking-[0.08em]">
          {lot.lotCode} · Page 2 · rows {PRIMARY_ROWS + 1}–
          {PRIMARY_ROWS + CONTINUATION_ROWS}
        </p>

        <div className="mt-4">
          <LotHeader lot={lot} compact />
        </div>

        <BidRows count={CONTINUATION_ROWS} startAt={PRIMARY_ROWS + 1} />

        <p className="mt-6 text-[11px] leading-relaxed text-black/60">
          Same rules as page 1: closes Thursday, Sept 24 · 3:00 PM ET. Winner
          claims by 4:00 PM ET or the lot is offered to the next highest bidder.
          Attach this page under page 1 on the clipboard.
        </p>
      </div>
    </main>
  );
}
