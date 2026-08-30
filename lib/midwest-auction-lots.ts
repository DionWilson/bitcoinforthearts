/**
 * Midwest Bitcoin Arts Park - Silent Auction Lots
 *
 * Add a new lot object to `midwestAuctionLots` for each donated work.
 * Each lot gets:
 *   - /midwest/auction/[slug]         → public detail page (QR target on vinyl cards)
 *   - /midwest/auction/[slug]/bid-sheet → printable peer-to-peer bid sheet
 *
 * QR pages should include artist website, social, email, and any Bitcoin /
 * Lightning / Strike payout handles the artist provides.
 */

export type AuctionLotLink = {
  label: string;
  href: string;
};

export type AuctionLot = {
  /** URL slug - unique, lowercase, hyphenated */
  slug: string;
  /** Short lot code printed on sheets, e.g. LOT-01 */
  lotCode: string;
  title: string;
  subtitle?: string;
  artistName: string;
  /** Short wall / lot-page bio */
  artistBio?: string;
  artistWebsite?: string;
  artistEmail?: string;
  artistSocial?: string;
  /** Strike username / LN address / lightning: URI the artist provided */
  artistStrike?: string;
  artistLightning?: string;
  /** On-chain BTC address if provided */
  artistBitcoin?: string;
  /** Extra public links (stores, Linktree, etc.) shown on the QR lot page */
  artistLinks?: AuctionLotLink[];
  year: string;
  medium: string;
  dimensions: string;
  /** Optional public image path under /public */
  imageSrc?: string;
  imageAlt?: string;
  description: string;
  /** Opening bid in USD (informational or primary if priceUnit is usd). Null = TBD. */
  startingBidUsd: number | null;
  /** Opening bid in sats (primary if priceUnit is sats). Null = TBD. */
  startingBidSats: number | null;
  /**
   * How to display price on lot / vinyl / newsletter.
   * sats = lead with sats (CA, Sean); usd = lead with dollars (Lady RedHorns site).
   */
  priceUnit?: 'sats' | 'usd';
  /** Fixed sats increment between bids */
  incrementSats: number;
  /** BFTA share of hammer price, e.g. 1/3 or 100% */
  bftaShare: string;
  /** Artist share of hammer price, e.g. 2/3 or 0% */
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

const EVENT = {
  eventName: 'Bitcoin Arts Park · Midwest Bitcoin Summit',
  eventLocation: 'Greater Columbus Convention Center, Columbus, OH',
  eventDates: 'September 23-24, 2026',
  closesDisplay: 'Thursday, September 24, 2026 · 3:00 PM ET',
  incrementSats: 21000,
} as const;

export const midwestAuctionLots: AuctionLot[] = [
  {
    slug: 'satoshi-white-paper-52',
    lotCode: 'LOT-01',
    title: 'Satoshi White Paper Series #52',
    subtitle: 'Block Height 770067',
    artistName: 'CA Danner',
    artistBio:
      'Since 2017, CA Danner’s work has been devoted to Bitcoin, Lightning, and Satoshi Nakamoto’s white paper. Mixed media on linen canvas: paper glued and scraped, string for network effects, layers of acrylic. Each piece is tied to a block height. MFA.',
    artistWebsite: 'https://www.cadanner.com',
    artistEmail: 'cadanner@protonmail.com',
    artistSocial: '@cityalley21',
    artistStrike: 'cityalley@strike.me',
    artistLinks: [
      { label: 'cadanner.com', href: 'https://www.cadanner.com' },
      { label: 'Artist statement', href: 'https://www.cadanner.com/artist-statement' },
      { label: 'X @cityalley21', href: 'https://x.com/cityalley21' },
    ],
    year: '2022-2023',
    medium: 'Mixed media on linen canvas',
    dimensions: '22 × 28 in',
    imageSrc: '/auction/satoshi-white-paper-52.jpg',
    imageAlt:
      'CA Danner, Satoshi White Paper Series #52, Block Height 770067 - mixed media on linen canvas with Satoshi Nakamoto white paper text under color washes',
    description:
      'From CA Danner’s Satoshi White Paper Series: the Bitcoin white paper rendered as mixed media on linen canvas, tied to block height 770067. Peer-to-peer cash, made physical - silent auction at Bitcoin Arts Park during the Midwest Bitcoin Summit.',
    startingBidUsd: 98,
    startingBidSats: 150000,
    priceUnit: 'sats',
    incrementSats: EVENT.incrementSats,
    bftaShare: '1/3',
    artistShare: '2/3',
    noSaleTerms:
      'If the lot does not sell by close of auction, the Artist donates the Work to Bitcoin for the Arts in full.',
    closesDisplay: EVENT.closesDisplay,
    eventName: EVENT.eventName,
    eventLocation: EVENT.eventLocation,
    eventDates: EVENT.eventDates,
    status: 'open',
  },
  {
    slug: 'transfer-of-light',
    lotCode: 'LOT-02',
    title: 'The Transfer of Light',
    subtitle: 'Angels of Freedom series',
    artistName: 'Lady RedHorns',
    artistBio:
      'Lady RedHorns is a contemporary artist exploring Bitcoin through expressive, gestural painting. Her Angels of Freedom and related series treat orange light, angels, and awakening as visual language for sound money. Red Horns Gallery.',
    artistWebsite: 'https://redhornsbtc.store',
    artistSocial: '@LRedhorns',
    artistLinks: [
      { label: 'Red Horns Gallery (Bitcoin)', href: 'https://redhornsbtc.store' },
      { label: 'Contemporary collection', href: 'http://redhornsart.store' },
      { label: 'Linktree', href: 'https://linktr.ee/ladyredhorns' },
      { label: 'X @LRedhorns', href: 'https://x.com/LRedhorns' },
    ],
    year: 'n/d',
    medium: 'Acrylic on canvas (acrylic paints, glossy acrylic varnish)',
    dimensions: '15.7 × 15.7 in (40 × 40 cm)',
    imageSrc: '/auction/transfer-of-light.jpg',
    imageAlt:
      'Lady RedHorns, The Transfer of Light - acrylic on canvas, orange Bitcoin light passing through a gaze',
    description:
      'A moment of connection and transformation, as the orange Bitcoin light passes through a gaze and begins to awaken within another soul. Framed for exhibition at Bitcoin Arts Park. Opening bid 1,000,000 sats (informational $850, matching Red Horns Gallery list). Proceeds split finalize when the signed consignment returns.',
    startingBidUsd: 850,
    startingBidSats: 1000000,
    priceUnit: 'usd',
    incrementSats: EVENT.incrementSats,
    bftaShare: 'TBD (consignment)',
    artistShare: 'TBD (consignment)',
    noSaleTerms:
      'No-sale outcome (donate in full to BFTA, or reclaim) is chosen by the Artist on the signed consignment agreement.',
    closesDisplay: EVENT.closesDisplay,
    eventName: EVENT.eventName,
    eventLocation: EVENT.eventLocation,
    eventDates: EVENT.eventDates,
    status: 'open',
  },
  {
    slug: 'hodl-on',
    lotCode: 'LOT-03',
    title: 'HODL On',
    subtitle: 'Bitsby holding onto the Bitcoin balloon',
    artistName: 'Shipwreck Sean',
    artistBio:
      'Shipwreck Sean is an artist, tattooer, and creator of Bitsby, with over 16 years dedicated to his craft. Physical and digital work influenced by Bitcoin, blending traditional artistry with the culture, ideas, and evolving story of sound money. Maryland.',
    artistWebsite: 'https://shipwrecksean.com',
    artistSocial: '@artbyshipwreck',
    artistLightning: 'shipwrecksean@walletofsatoshi.com',
    artistBitcoin:
      'bc1pc306rnzwz9xxfugewu4jqsqru88v023qpx070kdapf3q2zkrknxq97v65q',
    artistLinks: [
      { label: 'shipwrecksean.com', href: 'https://shipwrecksean.com' },
      { label: 'bitsby.co', href: 'https://www.bitsby.co' },
      { label: 'X @artbyshipwreck', href: 'https://x.com/artbyshipwreck' },
    ],
    year: '2026',
    medium: 'Original painting',
    dimensions: '40 × 16 in (H × W)',
    imageSrc: '/auction/hodl-on.jpg',
    imageAlt: 'Shipwreck Sean, HODL On - Bitsby holding a Bitcoin balloon',
    description:
      'Bitsby holds onto the Bitcoin balloon. Peer-to-peer silent auction priced in sats: 100% of net hammer price supports Bitcoin for the Arts. Opening bid 2,100,000 sats (informational $2,100).',
    startingBidUsd: 2100,
    startingBidSats: 2100000,
    priceUnit: 'sats',
    incrementSats: EVENT.incrementSats,
    bftaShare: '100%',
    artistShare: '0%',
    noSaleTerms:
      'If the lot does not sell, Artist chooses donate-in-full to BFTA or reclaim on the signed multi-work agreement.',
    closesDisplay: EVENT.closesDisplay,
    eventName: EVENT.eventName,
    eventLocation: EVENT.eventLocation,
    eventDates: EVENT.eventDates,
    status: 'open',
  },
  {
    slug: 'timechain-magazine-genesis',
    lotCode: 'LOT-04',
    title: 'Timechain Art Magazine - Genesis Edition',
    subtitle: 'Formerly Bitcoin Art Magazine · donated by Timechain / Asanoha',
    artistName: 'Timechain Art Magazine',
    artistBio:
      'Timechain Art Magazine (formerly Bitcoin Art Magazine) is the world’s first Bitcoin art magazine - featuring artists across the Bitcoin creative stack. Run by Asanoha. Sponsor of Bitcoin Arts Park; this Genesis Edition copy is fully donated to BFTA’s silent auction.',
    artistWebsite: 'https://timechainartmagazine.com',
    artistSocial: '@TimechainArtMag',
    artistLinks: [
      { label: 'timechainartmagazine.com', href: 'https://timechainartmagazine.com' },
      {
        label: 'Newsletter signup',
        href: 'http://timechainartmagazine.com/signup',
      },
      { label: 'X @TimechainArtMag', href: 'https://x.com/TimechainArtMag' },
      {
        label: 'Inside the Genesis Edition (video)',
        href: 'https://x.com/TimechainArtMag/status/2091065528488259646',
      },
    ],
    year: 'Genesis edition',
    medium: 'Print magazine (Genesis Edition)',
    dimensions: 'Single donated copy',
    imageSrc: '/auction/timechain-magazine-genesis.jpg',
    imageAlt: 'Timechain Art Magazine Genesis Edition cover (formerly Bitcoin Art Magazine)',
    description:
      'A donated Genesis Edition of Timechain Art Magazine (the world’s first Bitcoin art magazine; formerly Bitcoin Art Magazine) for the Bitcoin Arts Park silent auction table. Retail $269; opening bid 300,000 sats (informational $300). 100% of net proceeds support Bitcoin for the Arts. Watch a walkthrough of what’s inside via @TimechainArtMag on X.',
    startingBidUsd: 300,
    startingBidSats: 300000,
    priceUnit: 'usd',
    incrementSats: EVENT.incrementSats,
    bftaShare: '100%',
    artistShare: '0%',
    noSaleTerms:
      'If the lot does not sell, the copy remains with Bitcoin for the Arts as a donated archive / future fundraising asset unless otherwise agreed in writing.',
    closesDisplay: EVENT.closesDisplay,
    eventName: EVENT.eventName,
    eventLocation: EVENT.eventLocation,
    eventDates: EVENT.eventDates,
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

export function formatOpeningBid(lot: AuctionLot): string {
  if (lot.startingBidSats == null || lot.startingBidUsd == null) {
    if (lot.startingBidSats != null) return formatSats(lot.startingBidSats);
    if (lot.startingBidUsd != null) return formatUsd(lot.startingBidUsd);
    return 'Opening bid TBD';
  }
  // Uniform auction display for every lot.
  return `${formatSats(lot.startingBidSats)} (informational ${formatUsd(lot.startingBidUsd)})`;
}

export function formatOpeningBidLine(lot: AuctionLot): string {
  const bid = formatOpeningBid(lot);
  if (bid === 'Opening bid TBD') return bid;
  return `${bid} · increments ${formatSats(lot.incrementSats)}`;
}
