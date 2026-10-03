/**
 * Long-term projects Bitcoin for the Arts makes visible.
 *
 * These are artists, communities, institutions, and cultural projects aligned
 * with sound money. BFTA may fund them, may only introduce them, or both.
 * Patrons can support the project directly or give through BFTA and designate
 * the program.
 *
 * Add a dossier by appending to FEATURED_PROJECTS.
 * Do not publish a Bitcoin or Lightning address until the project confirms it.
 */

export type FeaturedKind =
  | 'artist'
  | 'community'
  | 'institution'
  | 'cultural-project';

export type FeaturedRelationship = 'awarded' | 'approved' | 'highlighted';

export type DirectSupportLink = {
  label: string;
  href: string;
};

export type FeaturedProject = {
  slug: string;
  kind: FeaturedKind;
  name: string;
  alsoKnownAs?: string;
  projectTitle: string;
  location?: string;
  cardSummary: string;
  imageSrc: string;
  imageAlt: string;
  relationship: FeaturedRelationship;
  relationshipLabel: string;
  /** Why this belongs on a sound-money standard. */
  alignment: string;
  /** The long-term work itself. */
  theWork: string;
  /** Why patrons are being asked now. */
  whySupport: string;
  whatFundingUnlocks: string[];
  directSupport: DirectSupportLink[];
  /** Shown when a peer-to-peer payment address is not published yet. */
  directPaymentNote?: string;
};

export const FEATURED_KIND_LABEL: Record<FeaturedKind, string> = {
  artist: 'Artist',
  community: 'Community',
  institution: 'Institution',
  'cultural-project': 'Cultural project',
};

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    slug: 'ainsley-costello',
    kind: 'artist',
    name: 'Ainsley Costello',
    projectTitle: 'A career on a sound money standard',
    location: 'Nashville',
    cardSummary:
      'A working pop-rock artist building a public career on Bitcoin — stage, band, and peer-to-peer payment — past a single show.',
    imageSrc: '/ainsley-band-mbs.jpg',
    imageAlt: 'Ainsley Costello performing with her band',
    relationship: 'awarded',
    relationshipLabel: 'BFTA micro-grant awarded',
    alignment:
      'Ainsley is one of the clearest younger voices putting Bitcoin inside a mainstream music career. She does not treat sound money as a theme bolted onto a set. She gets paid in it, talks about it in public, and uses the stage to show artists who have not found Bitcoin yet what a peer-to-peer career can look like.',
    theWork:
      'The long project is the career: writing, a band, touring, and a public practice of getting paid without waiting on a broken institutional stack. Bitcoin for the Arts awarded a micro-grant around Bitcoin Arts Park at the Midwest Bitcoin Summit — Expo Stage, culture panel, and a grant presentation. That weekend was one chapter. The work that still needs patrons is everything after it: the next room, the next record, the cost of showing up as a working band.',
    whySupport:
      'One grant proves the model. A career needs a longer clock — rehearsal, travel, lodging, and the unglamorous costs of keeping a band in front of people. Patrons can back Ainsley directly as those rails are published, or fund the next chapter through Bitcoin for the Arts.',
    whatFundingUnlocks: [
      'Band, travel, and the real cost of live performance',
      'Time to write and record without a fiat grant cycle',
      'More public rooms where artists meet Bitcoiners',
    ],
    directSupport: [
      { label: 'Ainsley on X', href: 'https://x.com/ainsleymusic07' },
      { label: 'Share Your Bitcoin Journey', href: '/stories' },
    ],
    directPaymentNote:
      'A confirmed Bitcoin or Lightning address will be published here when Ainsley clears it for this page. Until then, use her public channels or give through Bitcoin for the Arts and designate this project.',
  },
  {
    slug: 'aksana-zasinets',
    kind: 'artist',
    name: 'Aksana Zasinets',
    alsoKnownAs: '5Ksana',
    projectTitle: 'Embroidery for Freedom',
    location: 'Warsaw',
    cardSummary:
      'Hand embroidery practiced since 2017 — slow textile work that treats sovereignty as something you can hold.',
    imageSrc: '/zasinets-bullcoin.jpg',
    imageAlt: 'Bullcoin embroidery by Aksana Zasinets',
    relationship: 'awarded',
    relationshipLabel: 'BFTA micro-grant awarded',
    alignment:
      'Aksana has practiced Bitcoin physical art since 2017. The needle is the argument: sovereignty, independence, and long time preference, made by hand. That is the same standard Bitcoin for the Arts exists to fund — culture that cannot be rushed, rented, or faked.',
    theWork:
      'Embroidery for Freedom is a long craft practice, not a one-off object. She is building the workspace detailed textile work requires, stitching a dedicated piece for Bitcoin for the Arts, and sharing process with audiences who will never stand in a conference hall. A BFTA micro-grant supports that chapter. The practice itself — years of tailoring discipline turned toward Bitcoin — is what still needs patrons.',
    whySupport:
      'Slow work is expensive in time. Materials, a proper workspace, and the hours inside a single piece do not fit a weekend budget. Supporting Aksana keeps a physical Bitcoin art practice alive and in public.',
    whatFundingUnlocks: [
      'Workspace and materials for long-form embroidery',
      'Finished work that can travel and be shown',
      'A public record of process for artists outside the conference circuit',
    ],
    directSupport: [
      { label: 'Artist story', href: '/stories/aksana-zasinets' },
      { label: 'BuyBitArt', href: 'https://buybitart.com' },
    ],
    directPaymentNote:
      'A confirmed Bitcoin or Lightning address will be published here when Aksana clears it for this page. Until then, use BuyBitArt or give through Bitcoin for the Arts and designate Embroidery for Freedom.',
  },
  {
    slug: 'the-bitcoin-executor',
    kind: 'cultural-project',
    name: 'Christopher Arcella',
    projectTitle: 'The Bitcoin Executor',
    location: 'Miami',
    cardSummary:
      'A Bitcoin-native narrative feature in late post-production — culture that can leave the conference hall and play in a theater.',
    imageSrc: '/bitcoin gallery.jpg',
    imageAlt: 'A gallery space, standing in for Bitcoin-aligned cinema until a film still is published',
    relationship: 'approved',
    relationshipLabel: 'BFTA grant approved · paperwork in progress',
    alignment:
      'The Bitcoin Executor is a narrative feature made outside Hollywood, funded by Bitcoiners, aimed at people who will never sit through a technical talk. Bitcoin for the Arts treats film as adoption infrastructure: a story someone can sit with, not a pitch deck.',
    theWork:
      'The film is in late post-production, a work-in-progress of about 110 minutes. What remains is the part audiences actually meet: a theatrical plan, marketing, posters, and ticketing that can settle on Bitcoin. BFTA’s approved micro-grant is one stake in that finish. The project still needs patrons who want the film in rooms — New York, Los Angeles, Austin, Nashville, and beyond.',
    whySupport:
      'A finished cut is not a released film. Screening, print, and a real campaign are how this story reaches people who do not already live in Bitcoin. That is the funding gap.',
    whatFundingUnlocks: [
      'Theatrical tour planning and screenings',
      'Marketing, including print and public posts',
      'Bitcoin-capable ticketing for the rooms that will show it',
    ],
    directSupport: [
      { label: 'The Bitcoin Executor', href: 'https://thebitcoinexecutor.com' },
    ],
    directPaymentNote:
      'A confirmed Bitcoin or Lightning address will be published here when the project clears it for this page. Until then, use the film site or give through Bitcoin for the Arts and designate The Bitcoin Executor.',
  },
];

export function getFeaturedProject(slug: string): FeaturedProject | undefined {
  return FEATURED_PROJECTS.find((project) => project.slug === slug);
}

export function designationDonateHref(slug: string): string {
  return `/donate?designation=${encodeURIComponent(slug)}`;
}
