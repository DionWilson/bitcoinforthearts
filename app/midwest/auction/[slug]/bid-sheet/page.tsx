import type { Metadata } from 'next';
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

/** Number of blank bid rows printed on the sheet */
const BID_ROWS = 18;

export default async function AuctionBidSheetPage({ params }: Props) {
  const { slug } = await params;
  const lot = getAuctionLot(slug);
  if (!lot) notFound();

  const detailUrl = `https://www.bitcoinforthearts.org/midwest/auction/${lot.slug}`;

  return (
    <main className="min-h-screen bg-white text-black print:bg-white">
      <div className="mx-auto max-w-[8.5in] px-6 py-8 print:px-4 print:py-4">
        <p className="text-center text-[10px] font-medium uppercase tracking-[0.22em] text-black/55">
          Bitcoin for the Arts · 501(c)(3) · {lot.eventName}
        </p>
        <h1 className="mt-2 text-center text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
          Peer-to-Peer Silent Auction Bid Sheet
        </h1>
        <p className="mt-1 text-center text-sm font-medium uppercase tracking-[0.08em]">
          {lot.lotCode}
        </p>

        <div className="mt-6 border border-black p-4">
          <h2 className="text-xl font-light uppercase tracking-tight">
            {lot.title}
          </h2>
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
          <p className="mt-3 text-xs leading-relaxed text-black/65">
            Staff: write the high Airtable advance bid on row 1 before doors
            open. Then sign below with a bid at least{' '}
            {formatSats(lot.incrementSats)} above the previous bid. Highest
            valid bid at close wins. “About $” figures are orientation only;
            bidding is in sats. Winner pays before release
            (Bitcoin/Lightning or USD) and picks up in person. Full terms:{' '}
            <span className="break-all">{detailUrl}</span>
          </p>
          {(lot.artistStrike || lot.artistEmail) && (
            <p className="mt-2 text-xs text-black/55">
              Artist payout contact
              {lot.artistStrike ? ` · Strike ${lot.artistStrike}` : ''}
              {lot.artistEmail ? ` · ${lot.artistEmail}` : ''}
            </p>
          )}
        </div>

        <table className="mt-6 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-black text-left text-[11px] uppercase tracking-[0.12em]">
              <th className="w-8 py-2 pr-2">#</th>
              <th className="py-2 pr-2">Name</th>
              <th className="py-2 pr-2">Email / Phone</th>
              <th className="w-[28%] py-2">Bid in sats</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: BID_ROWS }, (_, i) => (
              <tr key={i} className="border-b border-black/30">
                <td className="py-3 pr-2 align-bottom text-black/40">
                  {i + 1}
                </td>
                <td className="py-3 pr-2 align-bottom">
                  <span className="block min-h-[1.25rem] border-b border-dotted border-black/40" />
                </td>
                <td className="py-3 pr-2 align-bottom">
                  <span className="block min-h-[1.25rem] border-b border-dotted border-black/40" />
                </td>
                <td className="py-3 align-bottom">
                  <span className="block min-h-[1.25rem] border-b border-dotted border-black/40" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 grid gap-4 border border-black p-4 text-xs sm:grid-cols-3">
          <p>
            <span className="font-medium uppercase tracking-[0.1em]">
              Winning bid
            </span>
            <span className="mt-2 block min-h-[1.5rem] border-b border-black/40" />
          </p>
          <p>
            <span className="font-medium uppercase tracking-[0.1em]">
              Winner name
            </span>
            <span className="mt-2 block min-h-[1.5rem] border-b border-black/40" />
          </p>
          <p>
            <span className="font-medium uppercase tracking-[0.1em]">
              Staff initials / time
            </span>
            <span className="mt-2 block min-h-[1.5rem] border-b border-black/40" />
          </p>
        </div>

        <p className="mt-4 text-center text-[10px] text-black/45 print:hidden">
          Print this page · Use one sheet per lot · Add lots via{' '}
          <code>lib/midwest-auction-lots.ts</code>
        </p>
      </div>
    </main>
  );
}
