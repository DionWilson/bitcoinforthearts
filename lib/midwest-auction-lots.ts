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
  /** Optional second image (artist promo card, install shot, etc.) */
  imageSecondarySrc?: string;
  imageSecondaryAlt?: string;
  description: string;
  /** Approx. USD guide for orientation next to the sats opening bid. Not a retail price and not a live FX quote. Null = no USD guide shown. */
  startingBidUsd: number | null;
  /** Opening bid in sats (public auction currency). Null = TBD. */
  startingBidSats: number | null;
  /**
   * How the artist prefers to think about price (ops note).
   * Public auction display is sats-first with an optional “about $X” guide.
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

const LADY_REDHORNS = {
  artistName: 'Lady RedHorns',
  artistBio:
    'Lady RedHorns is a contemporary artist exploring Bitcoin through expressive, gestural painting. Her Angels of Freedom and related series treat orange light, angels, and awakening as visual language for sound money. Red Horns Gallery.',
  artistWebsite: 'https://redhornsbtc.store',
  artistSocial: '@LRedhorns',
  artistLightning: 'ladyredhorns@coinos.io',
  artistLinks: [
    { label: 'Red Horns Gallery (Bitcoin)', href: 'https://redhornsbtc.store' },
    { label: 'Contemporary collection', href: 'http://redhornsart.store' },
    { label: 'Linktree', href: 'https://linktr.ee/ladyredhorns' },
    { label: 'X @LRedhorns', href: 'https://x.com/LRedhorns' },
  ] as AuctionLotLink[],
  year: 'n/d',
  medium: 'Acrylic on canvas (acrylic paints, glossy acrylic varnish)',
  dimensions: '16 × 16 in (about 40 × 40 cm)',
  noSaleTerms:
    'No-sale outcome (donate in full to BFTA, or reclaim) is chosen by the Artist on the signed consignment agreement. Sale format for each work (silent auction or fixed price) is confirmed with the Artist on that agreement.',
};

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
      {
        label: 'Satoshi White Paper Series #52',
        href: 'https://www.cadanner.com/view/5400977/1/6617154',
      },
    ],
    year: '2022-2023',
    medium: 'Mixed media on linen canvas',
    dimensions: '22 × 28 in',
    imageSrc: '/auction/satoshi-white-paper-52.jpg',
    imageAlt:
      'CA Danner, Satoshi White Paper Series #52, Block Height 770067 - mixed media on linen with Bitcoin white paper text under warm pink, orange, and yellow color washes',
    description:
      'From CA Danner’s Satoshi White Paper Series: the Bitcoin white paper rendered as mixed media on linen canvas, tied to block height 770067. Peer-to-peer cash, made physical - silent auction at Bitcoin Arts Park during the Midwest Bitcoin Summit.',
    startingBidUsd: 125,
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
    ...LADY_REDHORNS,
    imageSrc: '/auction/transfer-of-light.jpg',
    imageAlt:
      'Lady RedHorns, The Transfer of Light - acrylic on canvas, orange Bitcoin light passing through a gaze',
    imageSecondarySrc: '/auction/transfer-of-light-card.jpg',
    imageSecondaryAlt:
      'Lady RedHorns promo card for The Transfer of Light with artist detail crops and statement',
    description:
      'A moment of connection and transformation, as the orange Bitcoin light passes through a gaze and begins to awaken within another soul. Acrylic on canvas. Angels of Freedom series. Peer-to-peer silent auction at Bitcoin Arts Park: opening bid 1,000,000 sats (about $850). Proceeds split finalize when the signed consignment returns.',
    startingBidUsd: 850,
    startingBidSats: 1000000,
    priceUnit: 'usd',
    incrementSats: EVENT.incrementSats,
    bftaShare: 'TBD (consignment)',
    artistShare: 'TBD (consignment)',
    closesDisplay: EVENT.closesDisplay,
    eventName: EVENT.eventName,
    eventLocation: EVENT.eventLocation,
    eventDates: EVENT.eventDates,
    status: 'open',
  },
  {
    slug: 'bitcoin-keeper',
    lotCode: 'LOT-05',
    title: 'The Bitcoin Keeper',
    subtitle: 'Angels of Freedom series',
    ...LADY_REDHORNS,
    imageSrc: '/auction/bitcoin-keeper.jpg',
    imageAlt:
      'Lady RedHorns, The Bitcoin Keeper - acrylic on canvas, angel holding a Bitcoin orb',
    imageSecondarySrc: '/auction/bitcoin-keeper-card.jpg',
    imageSecondaryAlt:
      'Lady RedHorns promo card for The Bitcoin Keeper with artist detail crops and statement',
    description:
      'This artwork explores Bitcoin not as a technology, but as a symbol of hope, inner freedom, and unwavering conviction. The angel becomes a guardian of values that transcend material measure. Acrylic on canvas. Angels of Freedom series. Sale format (silent auction or fixed price) and opening bid / list price confirming with the artist.',
    startingBidUsd: null,
    startingBidSats: null,
    priceUnit: 'usd',
    incrementSats: EVENT.incrementSats,
    bftaShare: 'TBD (consignment)',
    artistShare: 'TBD (consignment)',
    closesDisplay: EVENT.closesDisplay,
    eventName: EVENT.eventName,
    eventLocation: EVENT.eventLocation,
    eventDates: EVENT.eventDates,
    status: 'open',
  },
  {
    slug: 'temptation-of-bitcoin-angel',
    lotCode: 'LOT-06',
    title: 'The Temptation of Bitcoin Angel',
    subtitle: 'Angels of Freedom series',
    ...LADY_REDHORNS,
    imageSrc: '/auction/temptation-of-bitcoin-angel.jpg',
    imageAlt:
      'Lady RedHorns, The Temptation of Bitcoin Angel - acrylic on canvas, Fiat Demon and Bitcoin Angel',
    imageSecondarySrc: '/auction/temptation-of-bitcoin-angel-card.jpg',
    imageSecondaryAlt:
      'Lady RedHorns promo card for The Temptation of Bitcoin Angel with artist detail crops and statement',
    description:
      'The Fiat Demon offers a tempting bargain to the Bitcoin Angel, but the Angel turns away, drawn to the Bitcoin symbol on its wing. Acrylic on canvas. Angels of Freedom series. Sale format (silent auction or fixed price) and opening bid / list price confirming with the artist.',
    startingBidUsd: null,
    startingBidSats: null,
    priceUnit: 'usd',
    incrementSats: EVENT.incrementSats,
    bftaShare: 'TBD (consignment)',
    artistShare: 'TBD (consignment)',
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
      'Bitsby holds onto the Bitcoin balloon. Peer-to-peer silent auction priced in sats: 100% of net hammer price supports Bitcoin for the Arts. Opening bid 2,100,000 sats (about $1,700).',
    startingBidUsd: 1700,
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
    title: 'Timechain Art Magazine - Gold Foil Genesis Edition',
    subtitle:
      'Genesis Edition Limited 1720 · with Silk Mandala Archival Serigraph · donated by Timechain / Asanoha',
    artistName: 'Timechain Art Magazine',
    artistBio:
      'Timechain Art Magazine (formerly Bitcoin Art Magazine) is the world’s first Bitcoin art magazine - featuring artists across the Bitcoin creative stack. Founded by Asanoha (@asanoha_gold). Sponsor of Bitcoin Arts Park; this Genesis package is fully donated to BFTA’s silent auction.',
    artistWebsite: 'https://timechainartmagazine.com',
    artistSocial: '@TimechainArtMag · Asanoha @asanoha_gold',
    artistLinks: [
      { label: 'timechainartmagazine.com', href: 'https://timechainartmagazine.com' },
      {
        label: 'Newsletter signup',
        href: 'http://timechainartmagazine.com/signup',
      },
      { label: 'Asanoha on X @asanoha_gold', href: 'https://x.com/asanoha_gold' },
      { label: 'X @TimechainArtMag', href: 'https://x.com/TimechainArtMag' },
      {
        label: 'Inside the Genesis Edition (video)',
        href: 'https://x.com/TimechainArtMag/status/2091065528488259646',
      },
      {
        label: 'artistsovereignremnant.com',
        href: 'https://artistsovereignremnant.com',
      },
    ],
    year: 'Genesis edition',
    medium:
      'Gold Foil Genesis Edition /210 hand-signed and numbered by Asanoha; Genesis Edition Limited 1720; Silk Mandala Archival Serigraph Print /210 hand-signed and numbered by Asanoha',
    dimensions: 'Donated Genesis package (magazine + serigraph)',
    imageSrc: '/auction/timechain-magazine-genesis.jpg',
    imageAlt: 'Timechain Art Magazine Genesis Edition cover (formerly Bitcoin Art Magazine)',
    description:
      'Donated Timechain Art Magazine Genesis package for the Bitcoin Arts Park silent auction table: Gold Foil Genesis Edition /210 hand-signed and numbered by Asanoha; Genesis Edition Limited 1720; and Silk Mandala Archival Serigraph Print /210 hand-signed and numbered by Asanoha. Retail $269. Bidding opens at 0 sats; minimum bid 21,000 sats; then increases in steps of 21,000 sats. 100% of net proceeds support Bitcoin for the Arts. Watch a walkthrough of what’s inside via @TimechainArtMag on X.',
    startingBidUsd: null,
    startingBidSats: 0,
    priceUnit: 'sats',
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

/** First acceptable bid. When opening is 0, first bid must be one increment. */
export function getMinimumBidSats(lot: AuctionLot): number | null {
  if (lot.startingBidSats == null) return null;
  if (lot.startingBidSats === 0) return lot.incrementSats;
  return lot.startingBidSats;
}

export function formatOpeningBid(lot: AuctionLot): string {
  if (lot.startingBidSats === 0) {
    return `Opens at 0 sats · minimum bid ${formatSats(lot.incrementSats)}`;
  }
  if (lot.startingBidSats != null && lot.startingBidUsd != null) {
    return `${formatSats(lot.startingBidSats)} (about ${formatUsd(lot.startingBidUsd)})`;
  }
  if (lot.startingBidSats != null) return formatSats(lot.startingBidSats);
  if (lot.startingBidUsd != null) return formatUsd(lot.startingBidUsd);
  return 'Opening bid TBD';
}

export function formatOpeningBidLine(lot: AuctionLot): string {
  const bid = formatOpeningBid(lot);
  if (bid === 'Opening bid TBD') return bid;
  return `${bid} · increments ${formatSats(lot.incrementSats)}`;
}
