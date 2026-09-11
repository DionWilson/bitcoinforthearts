import type { Metadata } from 'next';
import Link from 'next/link';
import { midwestAuctionLots } from '@/lib/midwest-auction-lots';

export const metadata: Metadata = {
  title: 'Bid Sheet Extra Pages | Bitcoin for the Arts',
  robots: { index: false, follow: false },
};

/** Sized to fit one US Letter page with header (print-safe). */
const EXTRA_ROWS = 16;

/**
 * Shared blank continuation pages for every lot clipboard.
 * Print several copies; write lot code/title at the top when you attach them.
 */
export default function BidSheetExtraPage() {
  return (
    <main className="bid-sheet-extra-print min-h-screen bg-white text-black print:bg-white">
      <style>{`
        @media print {
          @page {
            size: letter portrait;
            margin: 0.4in;
          }
          .bid-sheet-extra-print { min-height: 0 !important; }
          .bid-sheet-extra-page-1 {
            break-after: page;
            page-break-after: always;
          }
          .bid-sheet-extra-page-2 {
            break-before: page;
            page-break-before: always;
          }
        }
      `}</style>

      <div className="mx-auto max-w-[8.5in] px-6 pt-6 print:hidden">
        <p className="text-sm text-black/65">
          Print dialog should show <strong>exactly 2 pages</strong> (two blank
          extras). Clip under any lot sheet when rows run out. Lot sheets:{' '}
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

      {[1, 2].map((page) => (
        <div
          key={page}
          className={`mx-auto max-w-[8.5in] px-6 py-4 print:max-w-none print:px-0 print:py-0 ${
            page === 1 ? 'bid-sheet-extra-page-1' : 'bid-sheet-extra-page-2'
          }`}
        >
          <p className="text-center text-[9px] font-medium uppercase tracking-[0.18em] text-black/55">
            Bitcoin for the Arts · 501(c)(3) · Midwest Bitcoin Summit
          </p>
          <h1 className="mt-1 text-center text-lg font-semibold uppercase tracking-tight">
            Silent Auction · Extra Bid Page
          </h1>
          <p className="mt-0.5 text-center text-[10px] text-black/55">
            Universal continuation · write lot info below · page {page} of 2
          </p>

          <div className="mt-3 grid gap-2 border border-black p-2.5 text-xs sm:grid-cols-2">
            <p>
              <span className="text-[9px] font-medium uppercase tracking-[0.1em]">
                Lot code
              </span>
              <span className="mt-1 block min-h-[1.2rem] border-b border-black/40" />
            </p>
            <p>
              <span className="text-[9px] font-medium uppercase tracking-[0.1em]">
                Artwork title
              </span>
              <span className="mt-1 block min-h-[1.2rem] border-b border-black/40" />
            </p>
            <p className="sm:col-span-2">
              <span className="text-[9px] font-medium uppercase tracking-[0.1em]">
                Artist
              </span>
              <span className="mt-1 block min-h-[1.2rem] border-b border-black/40" />
            </p>
          </div>

          <p className="mt-2 text-[10px] leading-snug text-black/65">
            Continues the lot above. Closes Thu Sept 24 · 3:00 PM ET. Winner
            claims by 4:00 PM ET or next highest bidder. Name · email and/or
            phone · bid in sats.
          </p>

          <table className="mt-2 w-full border-collapse text-[11px] print:text-[10px]">
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
              {Array.from({ length: EXTRA_ROWS }, (_, i) => (
                <tr key={i} className="border-b border-black/30">
                  <td className="py-1.5 pr-1 align-bottom text-black/40 print:py-1" />
                  <td className="py-1.5 pr-1.5 align-bottom print:py-1">
                    <span className="block min-h-[0.9rem] border-b border-dotted border-black/40" />
                  </td>
                  <td className="py-1.5 pr-1.5 align-bottom print:py-1">
                    <span className="block min-h-[0.9rem] border-b border-dotted border-black/40" />
                  </td>
                  <td className="py-1.5 pr-1.5 align-bottom print:py-1">
                    <span className="block min-h-[0.9rem] border-b border-dotted border-black/40" />
                  </td>
                  <td className="py-1.5 align-bottom print:py-1">
                    <span className="block min-h-[0.9rem] border-b border-dotted border-black/40" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </main>
  );
}
