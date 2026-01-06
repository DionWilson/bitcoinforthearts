export type LeadershipPerson = {
  slug: string;
  name: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  shortBio: string;
  fullBio: string[];
};

export const leadership: LeadershipPerson[] = [
  {
    slug: 'dion-wilson',
    name: 'Dion Wilson',
    title: 'Founder & Executive Director, Interim Board Chair',
    imageSrc: '/leadership/dion-wilson.jpg',
    imageAlt: 'Portrait of Dion Wilson',
    shortBio:
      'Visionary performing artist and Bitcoin advocate pioneering Bitcoin For The Arts—the first 501(c)(3) funding uncensorable creativity through Bitcoin.',
    fullBio: [
      'Dion Wilson is a visionary leader whose illustrious career as a performing artist and advocate has positioned him to pioneer Bitcoin For The Arts—the world’s first 501(c)(3) nonprofit dedicated to funding uncensorable creativity through Bitcoin.',
      'As Founder and Executive Director, Wilson oversees an organization that empowers artists with micro-grants, workshops, and productions paid directly in Bitcoin, building the HODL Vault endowment to ensure donations grow on sound money and ignite a sovereign renaissance in the arts.',
      'With 16 years as a principal dancer, Wilson graced stages with the Alvin Ailey American Dance Theater, Dance Theatre of Harlem, and Philadelphia Dance Company, performing lead roles in masterpieces like Alvin Ailey’s Revelations, Blues Suite, and The River.',
      'He contributed to the creation of Bill T. Jones’ Fela! The Musical and toured nationally with Disney’s The Lion King, reaching audiences in over 20 countries and 45 U.S. states.',
      'Wilson’s leadership shines through his advocacy: as union representative for The Lion King tour, he championed performers’ rights, and he helped negotiate the Alvin Ailey Dancers’ AGMA contract, reforming the pay scale for the first time since unionization.',
      'A recipient of the Princess Grace Fellowship and Maryland Arts Council Award, Wilson has mentored over 10,000 students across the U.S. and abroad, teaching ballet, modern, jazz, and musical theater at institutions including the American Ballet Theatre Summer Program, Towson State University, Oklahoma State University, Boston Arts Academy, Detroit School of Arts, Alaska Dance Theatre, Baltimore School for the Arts, Long Island University, San Diego School of Creative and Performing Arts, and the Alvin Ailey Dance Center.',
      'He has delivered lectures on dance careers at Booker T. Washington Performing and Visual Arts High School and Duke Ellington School of the Arts.',
      'As a choreographer, Wilson’s works have been performed at the Debbie Allen Dance Academy, the International Dance Festival in Spoleto (Italy), Perri Dance, the Ailey Dancers Resource Fund Project, Towson State University, Detroit School of Arts, and Aaron Davis Hall (commissioned). He choreographed Kill Kill or Die, a musical featuring Lion King cast members.',
      'A dedicated philanthropist, Wilson has performed, directed, and choreographed for numerous benefits, raising funds for Broadway Cares/Equity Fights AIDS to combat AIDS, breast cancer, and natural disasters.',
      'A passionate Bitcoin advocate, Wilson organizes the Bitcoin Walk NYC and Bitcoin w/Coffee Meetup in New York City, fostering community around sound money. He founded the New York City Group Chat on the Club Orange app—a Bitcoin social platform he’s a strong supporter of.',
    ],
  },
];

