import type { Metadata } from 'next';
import Link from 'next/link';
import { midwestAuctionLots } from '@/lib/midwest-auction-lots';

export const metadata: Metadata = {
  title: 'Bid Sheet Extra Pages | Bitcoin for the Arts',
  robots: { index: false, follow: false },
};

const EXTRA_ROWS = 18;

/**
 * Shared blank continuation pages for every lot clipboard.
 * Print several copies; write lot code/title at the top when you attach them.
 */
export default function BidSheetExtraPage() {
  return (
    <main className="min-h-screen bg-white text-black print:bg-white">
      <div className="mx-auto max-w-[8.5in] px-6 pt-6 print:hidden">
        <p className="text-sm text-black/65">
          Print multiple copies of this page. Clip under any lot sheet when rows
          run out. Lot-specific sheets:{' '}
          {midwestAuctionLots.map((lot, i) => (
            <span key={lot.slug}>
              {i > 0 ? ' · ' : null}
              <Link
                href={`/midwest/auction/${lot.slug}/bid-sheet`}
                className="underline underline-offset-2"
              >
                {lot.lotCode}
              </Link>
            </span>
          ))}
        </p>
      </div>

      {/* Two identical blank templates so one print job yields two extras */}
      {[1, 2].map((page) => (
        <div
          key={page}
          className={`mx-auto max-w-[8.5in] px-6 py-6 print:px-4 print:py-3 ${
            page > 1 ? 'break-before-page' : ''
          }`}
        >
          <p className="text-center text-[10px] font-medium uppercase tracking-[0.22em] text-black/55">
            Bitcoin for the Arts · 501(c)(3) · Midwest Bitcoin Summit
          </p>
          <h1 className="mt-2 text-center text-xl font-semibold uppercase tracking-tight">
            Silent Auction · Extra Bid Page
          </h1>
          <p className="mt-1 text-center text-xs text-black/55">
            Universal continuation · attach to any lot clipboard
          </p>

          <div className="mt-5 grid gap-3 border border-black p-4 text-sm sm:grid-cols-2">
            <p>
              <span className="text-[10px] font-medium uppercase tracking-[0.12em]">
                Lot code
              </span>
              <span className="mt-2 block min-h-[1.5rem] border-b border-black/40" />
            </p>
            <p>
              <span className="text-[10px] font-medium uppercase tracking-[0.12em]">
                Artwork title
              </span>
              <span className="mt-2 block min-h-[1.5rem] border-b border-black/40" />
            </p>
            <p className="sm:col-span-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.12em]">
                Artist
              </span>
              <span className="mt-2 block min-h-[1.5rem] border-b border-black/40" />
            </p>
          </div>

          <p className="mt-3 text-[11px] leading-relaxed text-black/65">
            Continues the lot above. Closes Thursday, Sept 24 · 3:00 PM ET.
            Winner claims by 4:00 PM ET or the lot is offered to the next
            highest bidder. Sign with name, email and/or phone, and bid in sats.
          </p>

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
              {Array.from({ length: EXTRA_ROWS }, (_, i) => (
                <tr key={i} className="border-b border-black/30">
                  <td className="py-2.5 pr-1 align-bottom text-black/40">
                    {/* blank # so staff can continue numbering */}
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

          <p className="mt-5 text-center text-[10px] text-black/45">
            Extra page {page} of 2 on this print · Do not write full credit card
            numbers on paper
          </p>
        </div>
      ))}
    </main>
  );
}
