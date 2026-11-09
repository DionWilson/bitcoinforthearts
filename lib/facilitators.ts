export type FacilitatorLink = {
  label: string;
  href: string;
};

export type Facilitator = {
  slug: string;
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  location: string;
  shortBio: string;
  bio: string[];
  links: FacilitatorLink[];
};

/**
 * Sound money facilitators. Add a person here and they appear on
 * /education/facilitators. Keep bios in the facilitator's own words.
 */
export const facilitators: Facilitator[] = [
  {
    slug: 'monika-bravo',
    name: 'Monika Bravo',
    role: 'Lead facilitator',
    imageSrc: '/monika-bravo.png',
    imageAlt: 'Monika Bravo, in a red hat, smiling in front of a colorful glass artwork',
    location: 'Miami Beach',
    shortBio:
      'Multidisciplinary artist and polymath. She recorded What Is Money? in her own voice, and that recording is the model for every facilitator who teaches with us.',
    bio: [
      'Monika Bravo (b. 1964, Bogotá, Colombia) is a multidisciplinary artist and polymath. She lived in New York for 27 years, where she built her spiritual and artistic language, before settling in Miami Beach in 2020. There she began to embody her own perspective and no longer seek "truth"; her vision is a synthesis of all disciplines. Working across float glass, mosaic, moving image, and architectural integration, her work since 2017 is devoted to the public art realm.',
      'She is currently creating Equilibrium is a Process for the Framingham Regional Justice Center in Massachusetts. Recent public art commissions include Arcana, at the Interdisciplinary Engineering Building, University of Washington; Ouranos, Above Us Only Sky, at Grand Central Madison, New York; Unus Mundus, at the East Boston Police Headquarters; LIMINAL, at the Minneapolis-St. Paul International Airport; An Interval of Time, for Landmarks at the University of Texas at Austin; and Duration, at the Prospect Avenue Subway Station in Brooklyn, among many more.',
      'She was awarded the Civitella Ranieri Visual Arts Fellowship (2021) and represented the Vatican City-State at the Pavilion of the Holy See, 56th Venice Biennale (2015). Her work has been exhibited at the Rubin Museum of Art, the New Museum, and the 9/11 Memorial Museum in New York.',
      'In 2024, she self-published The Nature of My Reality, an illustrated book exploring the relationship between perception, economic systems, and human behavior. She is currently writing her second illustrated book, The Art of Synthesis and the Architecture of My Value, a body of 33 vertebrae moving through time across disciplines in fictional dialogues with the figures who most shaped her thinking, among them Dante, Borges, Aristotle, Mises, Jung, and Satoshi.',
      'She was born into a lineage of women pioneers in innovative education in Colombia: her grandmother founded the first preschool in Colombia in the late 1930s, and her mother named her school after John Dewey. From this lineage, she inherited her love for education. In the last 10 years, she has held study groups online on Human Design, evolutionary astrology, Bitcoin, and Austrian economics, and has spoken at Bitcoin conferences on Bitcoin as a state of consciousness. She has appeared on more than 20 podcasts on Bitcoin and polymathy. She offers creative mentorships, and in both her mentorships and her public art she applies the same talent: listening to the needs of the people. She is deeply committed to her own inquiry.',
      'She has studied Austrian economics and Bitcoin with Saifedean Ammous, and trauma work with Gabor Maté and Peter Levine. She is a devoted evolutionary astrologer and Human Design reader and has done a deep dive into Carl Jung\'s shadow work. Her philosophy integrates Eastern Taoist and Buddhist, ancestral, and cosmological traditions with psychological inquiries, praxeology, and Austrian economics, emphasizing liberty, value, resources, and self-worth. She writes a weekly Substack, I AM OPtimist.',
    ],
    links: [
      { label: 'Studio of Endless Ideas', href: 'https://studioofendlessideas.com' },
      { label: 'I AM OPtimist', href: 'https://www.monikabravo.blog' },
      { label: 'Substack', href: 'https://substack.com/profile/7388133-monika-bravo' },
    ],
  },
];
