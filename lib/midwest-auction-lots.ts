/**
 * Midwest Bitcoin Arts Park — Silent Auction Lots
 *
 * Add a new lot object to `midwestAuctionLots` for each donated work.
 * Each lot gets:
 *   - /midwest/auction/[slug]         → public detail page (QR target)
 *   - /midwest/auction/[slug]/bid-sheet → printable peer-to-peer bid sheet
 */

export type AuctionLot = {
  /** URL slug — unique, lowercase, hyphenated */
  slug: string;
  /** Short lot code printed on sheets, e.g. LOT-01 */
  lotCode: string;
  title: string;
  subtitle?: string;
  artistName: string;
  artistWebsite?: string;
  artistEmail?: string;
  artistStrike?: string;
  year: string;
  medium: string;
  dimensions: string;
  /** Optional public image path under /public */
  imageSrc?: string;
  imageAlt?: string;
  description: string;
  /** Opening bid in USD */
  startingBidUsd: number;
  /** Opening bid in sats (informational; settle at posted rate) */
  startingBidSats: number;
  /** Fixed USD increment between bids */
  incrementUsd: number;
  /** BFTA share of hammer price, e.g. 1/3 */
  bftaShare: string;
  /** Artist share of hammer price, e.g. 2/3 */
  artistShare: string;
  /** What happens if the lot does not sell */
  noSaleTerms: string;
  /** When bidding closes (display string) */
  closesDisplay: string;
  /** Event context */
  eventName: string;
  eventLocation: string;
  eventDates: string;
  status: 'open' | 'closed' | 'sold';
};

export const midwestAuctionLots: AuctionLot[] = [
  {
    slug: 'satoshi-white-paper-52',
    lotCode: 'LOT-01',
    title: 'Satoshi White Paper Series #52',
    subtitle: 'Block Height 770067',
    artistName: 'CA Danner',
    artistWebsite: 'https://www.cadanner.com',
    artistEmail: 'cadanner@protonmail.com',
    artistStrike: 'cityalley@strike.me',
    year: '2022–2023',
    medium: 'Mixed media on linen canvas',
    dimensions: '22 × 28 in',
    imageSrc: '/auction/satoshi-white-paper-52.jpg',
    imageAlt:
      'CA Danner, Satoshi White Paper Series #52, Block Height 770067 — mixed media on linen canvas with Satoshi Nakamoto white paper text under color washes',
    description:
      'From CA Danner’s Satoshi White Paper Series: the Bitcoin white paper rendered as mixed media on linen canvas, tied to block height 770067. Peer-to-peer cash, made physical — donated for silent auction at Bitcoin Arts Park during the Midwest Bitcoin Summit.',
    startingBidUsd: 322,
    startingBidSats: 500000,
    incrementUsd: 21,
    bftaShare: '1/3',
    artistShare: '2/3',
    noSaleTerms:
      'If the lot does not sell by close of auction, the Artist donates the Work to Bitcoin for the Arts in full.',
    closesDisplay: 'Thursday, September 24, 2026 · 3:00 PM ET',
    eventName: 'Bitcoin Arts Park · Midwest Bitcoin Summit',
    eventLocation: 'Greater Columbus Convention Center, Columbus, OH',
    eventDates: 'September 23–24, 2026',
    status: 'open',
  },
];

export function getAuctionLot(slug: string): AuctionLot | undefined {
  return midwestAuctionLots.find((lot) => lot.slug === slug);
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatSats(amount: number): string {
  return `${amount.toLocaleString('en-US')} sats`;
}
