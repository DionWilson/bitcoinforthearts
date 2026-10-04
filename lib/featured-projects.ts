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
  /**
   * Time and energy inside the work. Bitcoin is the tool that keeps that
   * time on the maker's side.
   */
  time: string;
  /** Why patrons are being asked now. */
  whySupport: string;
  whatFundingUnlocks: string[];
  directSupport: DirectSupportLink[];
  /** Shown when a peer-to-peer payment address is not published yet. */
  directPaymentNote?: string;
  /** Square logos should sit inside the frame instead of being cropped. */
  imageFit?: 'cover' | 'contain';
  /** Planned or confirmed stations. Label unconfirmed trails in the copy. */
  stations?: { title: string; lesson: string }[];
  /** A proposed year of funding, with amounts a patron can read. */
  budget?: {
    title: string;
    intro: string;
    lines: { label: string; detail: string; amount: string }[];
    totalLabel: string;
    totalAmount: string;
    note: string;
  };
};

export const FEATURED_KIND_LABEL: Record<FeaturedKind, string> = {
  artist: 'Artist',
  community: 'Community',
  institution: 'Institution',
  'cultural-project': 'Cultural project',
};

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    slug: 'shipwreck-sean',
    kind: 'artist',
    name: 'Shipwreck Sean',
    projectTitle: 'One year of rooms',
    location: 'Maryland',
    cardSummary:
      'A one-year proposal: eight Bitcoin exhibitions, new work made in the room, and the salary, supplies, and shipping that make the year possible.',
    imageSrc: '/sean-live-painting-mbs.jpg',
    imageAlt:
      'Shipwreck Sean live painting at Bitcoin Arts Park during the Midwest Bitcoin Summit',
    relationship: 'highlighted',
    relationshipLabel: 'Proposal · one-year tour',
    alignment:
      'He is living proof of work. The phrase is the craft and the chain: hours you can see in the object, and a culture that respects the hours. Bitcoin for the Arts exists to put that kind of maker in public. At Bitcoin Arts Park he carried finished paintings into the room and then made another one while people watched. A year on the road is that proof, repeated in rooms that will hang it.',
    theWork:
      'Shipwreck Sean has spent more than sixteen years at the craft. He paints, he tattoos, and he made Bitsby, a character who carries Bitcoin the way a folk figure carries a story. The proposal is one year of the practice he showed in Columbus. Eight Bitcoin conferences and summits. He arrives with paintings, makes new work on site, and sells it peer to peer. Four of the rooms are in the United States. Four are abroad. The dates get chosen with him.',
    time:
      'A painting is a stack of decisions. He draws it, paints it, steps back, and stays with it until it is the picture he will sign. Doing that in a conference hall, with the clock of the event running, is the same standard as the studio. A year of rooms is that standard kept up between cities. Bitcoin is the tool that holds his pay and his materials steady while the next crate is still on a truck.',
    whySupport:
      'A weekend shows what he can do. A year is a salary, supplies, crates, and the cost of being in the room long enough to sell. The budget below is what Bitcoin for the Arts would fund.',
    whatFundingUnlocks: [
      'A salary for twelve months of making, traveling, and selling',
      'Materials for the studio and for work made live in the room',
      'Crates and freight for eight exhibitions',
      'Airfare, lodging, meals, and ground transport',
    ],
    budget: {
      title: 'One year, $100,000',
      intro:
        'Eight exhibitions in twelve months. Four in the United States, four abroad. Each trip is long enough to hang the work, paint in the room, and sell.',
      lines: [
        {
          label: 'Artist salary',
          detail: '$5,000 a month for twelve months. Pay for making the work, standing in the room, and selling it.',
          amount: '$60,000',
        },
        {
          label: 'Materials',
          detail: '$500 a month. Canvas, paint, panels, and what a live painting uses up.',
          amount: '$6,000',
        },
        {
          label: 'Shipping and logistics',
          detail: 'Four shipments in the United States at $1,000. Four international shipments at $2,500, crate and insurance included.',
          amount: '$14,000',
        },
        {
          label: 'Airfare',
          detail: 'Four domestic trips at $500. Four international trips at $1,300.',
          amount: '$7,200',
        },
        {
          label: 'Lodging',
          detail: 'Four nights at $200 on each United States trip. Five nights at $200 on each trip abroad.',
          amount: '$7,200',
        },
        {
          label: 'Meals',
          detail: '$500 set aside for food on each of the eight trips.',
          amount: '$4,000',
        },
        {
          label: 'Ground transport',
          detail: '$200 on each trip, to and from the room.',
          amount: '$1,600',
        },
      ],
      totalLabel: 'One year',
      totalAmount: '$100,000',
      note: 'Paintings he sells on the road remain his. This budget is the cost of the year that gets him and the work into the room.',
    },
    directSupport: [
      { label: 'shipwrecksean.com', href: 'https://shipwrecksean.com' },
      { label: 'bitsby.co', href: 'https://www.bitsby.co' },
      { label: 'X @artbyshipwreck', href: 'https://x.com/artbyshipwreck' },
    ],
    directPaymentNote:
      'A confirmed Bitcoin or Lightning address will be published here when Sean clears it for this page. Until then, use his site or give through Bitcoin for the Arts and designate this year.',
  },
  {
    slug: 'ainsley-costello',
    kind: 'artist',
    name: 'Ainsley Costello',
    projectTitle: 'The next record',
    location: 'Nashville',
    cardSummary:
      'Ten songs with her band in Nashville. A $40,000 record: her time, the players, a working room, and a mix she can release.',
    imageSrc: '/ainsley-band-mbs.jpg',
    imageAlt: 'Ainsley Costello performing with her band',
    relationship: 'awarded',
    relationshipLabel: 'BFTA micro-grant awarded',
    alignment:
      'Ainsley is one of the clearest younger voices putting Bitcoin inside a mainstream music career. She does not treat sound money as a theme bolted onto a set. She gets paid in it, talks about it in public, and uses the stage to show artists who have not found Bitcoin yet what a peer-to-peer career can look like.',
    theWork:
      'The record is ten songs with the band she already plays with. She writes them, rehearses them, and tracks them in a Nashville room with an engineer in the day rate. A producer stays on the songs. A mixer and a mastering engineer finish them. Bitcoin for the Arts already awarded a micro-grant around Bitcoin Arts Park at the Midwest Bitcoin Summit: Expo Stage, culture panel, and a grant presentation. That grant was one weekend. This budget is the next record.',
    time:
      'A song is not a take. She writes it, records it, hears it back, cuts it, and sings it again until it is right. That is one song. An album is that same endurance multiplied across a body of work, then rehearsed with a band until the room can hold it. The hours are the standard. Bitcoin is the tool that keeps those hours on her side: savings that hold while the next pass is still wrong, and payment that does not leak while the record is still being made.',
    whySupport:
      'A weekend shows the band. A record is four months of writing and the invoices Nashville actually charges. The budget below is what Bitcoin for the Arts would fund.',
    whatFundingUnlocks: [
      'Four months to write, rehearse, and sing the ten songs',
      'Pay for the three players in her band across ten sessions',
      'Twelve days in a mid-range Nashville room, engineer included',
      'A producer, a mix, a master, and a cover',
    ],
    budget: {
      title: 'One album, $40,000',
      intro:
        'Ten songs with her band. Twelve days in a working Nashville room. The studio lines use 2026 independent rates. The first line is her time.',
      lines: [
        {
          label: 'Writing and recording time',
          detail: '$3,000 a month for four months. Pay for writing the songs, rehearsing them, and staying in the room until the vocals are right.',
          amount: '$12,000',
        },
        {
          label: 'Band',
          detail: 'Three players at $200 a session, ten sessions. Her band, paid for the record.',
          amount: '$6,000',
        },
        {
          label: 'Studio and engineer',
          detail: 'Twelve days at $500. The engineer is in the day rate. Mid-range Nashville room.',
          amount: '$6,000',
        },
        {
          label: 'Producer',
          detail: '$800 a song for ten songs. A working Nashville producer.',
          amount: '$8,000',
        },
        {
          label: 'Mixing',
          detail: '$500 a song.',
          amount: '$5,000',
        },
        {
          label: 'Mastering',
          detail: '$150 a song.',
          amount: '$1,500',
        },
        {
          label: 'Cover and photographs',
          detail: 'One photo day and the cover.',
          amount: '$1,500',
        },
      ],
      totalLabel: 'One album',
      totalAmount: '$40,000',
      note: 'The songs stay hers. The $2,500 Midwest grant is already awarded and is not inside this number. This is the cost of the next record.',
    },
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
    time:
      'Embroidery is hours inside a single inch. A design has to be drawn, then stitched, then judged, then pulled out and stitched again. The creativity is real. So is the endurance. Detailed work cannot be rushed without becoming a cheaper object. Bitcoin is the tool that lets that time stay hers: value that holds while the needle is still moving, so the standard of the piece can stay high.',
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
    time:
      'A feature is a stack of passes. Picture, sound, color, the cut that is wrong, the cut that is closer. Late post-production is where the time hides, and then the film still has to be carried into a room and seen. Bitcoin is the tool for the months between almost and right: savings that do not expire while the work is still being finished.',
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
  {
    slug: 'visima-21',
    kind: 'community',
    name: 'Machakos Bitcoin Academy',
    alsoKnownAs: 'with Vincent',
    projectTitle: 'Visima 21',
    location: 'Machakos, Kenya',
    cardSummary:
      'A long-term trail of twenty-one painted stations on real wells and community walls, built with a Bitcoin academy that already teaches self-custody on the ground.',
    imageSrc: '/featured/machakos-academy-profile.jpg',
    imageAlt: 'Machakos Academy mark: an orange map of Kenya with a Bitcoin symbol',
    imageFit: 'contain',
    relationship: 'highlighted',
    relationshipLabel: 'BFTA long-term project · first stage opening',
    alignment:
      'Machakos Bitcoin Academy already teaches what Bitcoin is, why money inflates, how to hold your own keys, and how Lightning payments work. Their public line is Educate. Empower. Elevate. They onboard neighbors and merchants, including businesses such as Machaa Furniture Mart, and they raise peer to peer on their own Geyser campaign. Visima 21 — visima is the Swahili word for wells — puts that same lesson on the walls people already use. Drawing water is human action. A well is capital. The other stations carry scarce means, saved work, and trade that does not leak.',
    theWork:
      'Bitcoin for the Arts is building Visima 21 with Vincent, who leads the academy, as a monument that should still be readable in ten years. Twenty-one stations, each a real resource the community depends on, each painted by artists he chooses and signs larger than any logo. The loop stays walkable in a day, on foot or one boda. It is not stretched across the county. Survey first, permission second, drawings third, paint last. Funding moves in stages, when a station is finished, photographed, and accepted. Their Geyser campaign stays theirs. That rail keeps funding classes and merchant onboarding. A gift through Bitcoin for the Arts is the United States door: a designated gift to a 501(c)(3), receipted, restricted to this trail, with paint and painter paid in sats on Lightning to the painter.',
    time:
      'A wall that holds in the sun is not a weekend mural. Each station takes a survey, a permission, a drawing, then paint, then the judgment of whether it is good enough to seal onto a well people use every day. Twenty-one of those, done slowly, is the work. Years later the sun wins and the next crew repaints. Bitcoin is the tool for that clock: the painter is paid for the time the wall actually takes, and the savings hold until the next station is ready.',
    whySupport:
      'The US public benefit is the record. The walls stay in Machakos. The lesson travels: water, work, savings, and trade, documented so American donors, artists, and students can study a circular economy instead of only hearing about one. Bitcoiners who already travel between communities get a trail they can finish in a day. The neighbors watch their own record go up, with the artist’s name larger than the funder’s mark. That dignity is the point. Exposure follows it. The first stage opens when Vincent sends five painters he trusts, three sites he already has permission to paint, a local paint list with prices in shillings, and the name of the person who must approve a borehole or a market wall.',
    whatFundingUnlocks: [
      'Alkali-resistant primer, exterior masonry paint, and sealer that can survive sun and rain',
      'Payment in sats to the painter of each finished station',
      'A trailhead map, a 21-stamp passport, and a US-facing record of the work',
      'A repaint, years from now, by the next crew — part of the project, not a failure',
    ],
    directSupport: [
      {
        label: 'Their Geyser campaign',
        href: 'https://geyser.fund/project/machakosbitcoinacademy',
      },
      { label: 'Machakos Bitcoin Academy on X', href: 'https://x.com/BitcoinMachakos' },
      {
        label: 'Machakos Bitcoin Academy on Nostr',
        href: 'https://njump.me/npub1puzsezulssrkgmy3yl89w26x0hwvtug6ks95phr568shclg0x87qzc9pvt',
      },
      {
        label: 'Email the academy',
        href: 'mailto:machakosbitcoinacademy@gmail.com',
      },
    ],
    directPaymentNote:
      'Give to their Geyser campaign if you want to fund the academy’s classes and merchant work directly. Each painted station will carry that artist’s Lightning QR once the trail is underway. A single on-chain address is on their own flyer; we will publish a confirmed address here only after they clear the exact string for this page. A designated gift below is a gift to Bitcoin For The Arts, Inc. for Visima 21.',
    stations: [
      { title: 'Academy tank or trailhead well', lesson: 'Custody. The map lives here.' },
      { title: 'A concrete community well', lesson: 'Drawing water is the action.' },
      { title: 'A school borehole', lesson: 'Yield meant for people who are not here yet.' },
      { title: 'A market borehole', lesson: 'Trade stops without water.' },
      { title: 'A sand dam', lesson: 'Rain that would have run off, caught and kept.' },
      { title: 'An earth dam or pan', lesson: 'The reservoir.' },
      { title: 'A cattle trough', lesson: 'Livestock was the old savings account.' },
      { title: 'A posho mill', lesson: 'Grain becomes meal only after work.' },
      { title: 'A terraced shamba edge', lesson: 'Proof of work you can see in the soil.' },
      { title: 'A solar pump', lesson: 'Energy in, water out.' },
      { title: 'A fodder line by a dam', lesson: 'What the water made possible.' },
      { title: 'A mwethya site', lesson: 'Consensus before the concrete sets.' },
      { title: 'Mama mboga row', lesson: 'Peer to peer.' },
      { title: 'The cereal shop or grain store', lesson: 'Low time preference with a roof.' },
      { title: 'The livestock yard', lesson: 'Savings that used to walk.' },
      { title: 'The boda stage', lesson: 'A finished ride is a settled payment.' },
      { title: 'A fundi stall', lesson: 'Time stored in the object.' },
      { title: 'The school wall', lesson: 'Education is the foundation.' },
      { title: 'The dispensary tank', lesson: 'Water as health, not a luxury.' },
      { title: 'A sign already rescued', lesson: 'One sentence, large enough for a boda.' },
      { title: 'The completion wall at the academy', lesson: 'The passport closes here.' },
    ],
  },
];

export function getFeaturedProject(slug: string): FeaturedProject | undefined {
  return FEATURED_PROJECTS.find((project) => project.slug === slug);
}

export function designationDonateHref(slug: string): string {
  return `/donate?designation=${encodeURIComponent(slug)}`;
}
