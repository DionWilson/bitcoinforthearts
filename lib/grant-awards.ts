export type GrantAwardStatus = 'paid' | 'approved_pending_paperwork';

export type GrantAward = {
  id: string;
  artistName: string;
  artistAlsoKnownAs?: string;
  projectTitle: string;
  discipline: string;
  amountUsd: number;
  /** Optional sats / BTC string for display when known, e.g. "0.03 BTC" */
  amountBtcLabel?: string;
  status: GrantAwardStatus;
  awardedOn: string; // ISO date or display month
  location?: string;
  why: string;
  whatTheyAreDoing: string;
  impactForDonors: string;
  links: { label: string; href: string }[];
  imageSrc: string;
  imageAlt: string;
  /** On-chain settlement — leave empty until confirmed */
  txid?: string;
  paymentNote?: string;
};

export const GRANT_AWARDS: GrantAward[] = [
  {
    id: 'ainsley-costello-midwest-2026',
    artistName: 'Ainsley Costello',
    projectTitle: 'Midwest Bitcoin Summit · Bitcoin Arts Park',
    discipline: 'Music',
    amountUsd: 2500,
    amountBtcLabel: '0.03 BTC',
    status: 'paid',
    awardedOn: '2026-09',
    location: 'Columbus, OH',
    why:
      'Ainsley is a Nashville pop-rock artist and one of the clearest Gen Z voices bringing Bitcoin into mainstream culture. She opened Bitcoin Arts Park on stage at the Midwest Bitcoin Summit, sat on the culture panel, and models peer-to-peer payment in public — exactly the use case BFTA exists to fund.',
    whatTheyAreDoing:
      'The micro-grant went back into her business to cover band costs, food, lodging, and the real expenses of showing up as a working artist. She performed a full Expo Stage set, told stories in the Park, and helped prove that artists can be paid in Bitcoin for culture that moves a conference floor.',
    impactForDonors:
      'Your support put a Gen Z musician on a Bitcoin conference stage with a band, a grant presentation, and a clear story: artists get paid, culture belongs on sound money, and the peer-to-peer protocol is the point.',
    links: [
      { label: 'Share Your Bitcoin Journey · Ep 15', href: '/stories' },
      { label: 'Donate to fund the next grant', href: '/donate' },
    ],
    imageSrc: '/ainsley-band-mbs.jpg',
    imageAlt: 'Ainsley Costello performing with her band at Bitcoin Arts Park, Midwest Bitcoin Summit',
    // Paste settlement txid when ready for public transparency
    txid: '',
    paymentNote: 'Paid in Bitcoin for Midwest Bitcoin Arts Park performance and artist support.',
  },
  {
    id: 'aksana-zasinets-embroidery-2026',
    artistName: 'Aksana Zasinets',
    artistAlsoKnownAs: '5Ksana',
    projectTitle: 'Embroidery for Freedom',
    discipline: 'Textile / Craft',
    amountUsd: 400,
    status: 'paid',
    awardedOn: '2026-10',
    location: 'Warsaw, Poland · U.S. public benefit',
    why:
      'Aksana has practiced Bitcoin physical art since 2017 — hand embroidery that treats sovereignty, independence, and slow craft as lived values. Embroidery for Freedom centers a dedicated piece for Bitcoin for the Arts and connects a U.S. audience to maker culture on a Bitcoin standard.',
    whatTheyAreDoing:
      'She is creating detailed handmade textile work inspired by freedom and Bitcoin values, building the workspace needed for long-form craft, and sending a finished embroidered artwork to BFTA. Process and result will be shared online with U.S. audiences and independent artists.',
    impactForDonors:
      'This grant funds slow creation and a tangible gift to the organization — proof that micro-grants can move across borders while delivering public benefit and culture that cannot be faked by an algorithm.',
    links: [
      { label: 'Artist story', href: '/stories/aksana-zasinets' },
      { label: 'BuyBitArt', href: 'https://buybitart.com' },
      { label: 'Donate', href: '/donate' },
    ],
    imageSrc: '/zasinets-bullcoin.jpg',
    imageAlt: 'Bullcoin embroidery by Aksana Zasinets (5Ksana)',
    txid: '',
    paymentNote: 'Paid in Bitcoin for Embroidery for Freedom.',
  },
  {
    id: 'christopher-arcella-bitcoin-executor-2026',
    artistName: 'Christopher Arcella',
    projectTitle: 'The Bitcoin Executor',
    discipline: 'Film',
    amountUsd: 1000,
    status: 'approved_pending_paperwork',
    awardedOn: '2026-10',
    location: 'Miami, FL',
    why:
      'The Bitcoin Executor is a serious Bitcoin-native narrative feature made outside Hollywood and Indiewood systems — funded by Bitcoiners, aimed at both the community and people who will never sit through a technical talk. Supporting completion, marketing, and theatrical screening plans advances culture as adoption infrastructure.',
    whatTheyAreDoing:
      'The film is in late post-production (work-in-progress ~110 minutes). Funds support theatrical tour planning, marketing (including Nostr/X and printed posters), and Bitcoin-capable ticketing. BFTA will receive clear credit in the end titles reflecting the level of support.',
    impactForDonors:
      'Film is how Bitcoin culture reaches people who do not already live in the conference hall. This award backs a feature that treats the story — and the peer-to-peer ethos — as art worth screening in NYC, LA, Austin, Nashville, and beyond.',
    links: [
      { label: 'The Bitcoin Executor', href: 'https://thebitcoinexecutor.com' },
      { label: 'Donate', href: '/donate' },
    ],
    imageSrc: '/bitcoin gallery.jpg',
    imageAlt: 'Bitcoin-aligned cinema and cultural programming',
    paymentNote:
      'Approved at $1,000. Awaiting signed agreement, tax form, and payout confirmation before settlement.',
  },
];

export function mempoolUrl(txid: string): string {
  return `https://mempool.space/tx/${txid}`;
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
