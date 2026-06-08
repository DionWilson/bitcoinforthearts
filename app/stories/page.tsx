import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Artist Stories | Bitcoin for the Arts",
  description:
    "Sovereign journeys in Bitcoin and creativity — episodes, articles, and artist spotlights from Bitcoin for the Arts.",
};

/* ------------------------------------------------------------------ */
/*  DATA — Add new episodes & articles here to grow the gallery.      */
/*  Each object renders automatically in the appropriate section.     */
/* ------------------------------------------------------------------ */

type Episode = {
  type: "episode";
  episodeNumber: number;
  title: string;
  summary: string;
  thumbnail: string;
  link: string;
};

type Article = {
  type: "article";
  title: string;
  teaser: string;
  byline: string;
  profileImage?: { src: string; alt: string };
  images: { src: string; alt: string; caption: string; objectPosition?: string }[];
  link: string;
};

type StoryItem = Episode | Article;

const storiesData: StoryItem[] = [
  {
    type: "episode",
    episodeNumber: 1,
    title:
      "Share Your Bitcoin Journey: Episode 1 \u2013 Andrea Arghinenti\u2019s Sovereign Renaissance",
    summary:
      "Pioneering 3D/VFX creator Andrea Arghinenti shares how Bitcoin transformed his creative path\u2014from escaping fiat gatekeepers to embracing financial sovereignty and low-time-preference artistry.",
    thumbnail: "/SYBJ-EP1-web-Andrea-Arghinenti.png",
    link: "https://youtube.com/watch?v=4oKXPZeXbYg",
  },
  {
    type: "episode",
    episodeNumber: 2,
    title:
      "Share Your Bitcoin Journey: Episode 2 \u2013 Ethan\u2019s Vegan Bitcoin Revolution",
    summary:
      "Writer and vegan advocate Ethan (@bitcoinisvegan) explores how sound money aligns with ethical living\u2014from his 2018 Bitcoin entry to arguing that BTC\u2019s neutrality promotes deflationary saving and low-time-preference decisions.",
    thumbnail: "/SYBJ-EP2-web-Ethan-Turer.png",
    link: "https://youtu.be/rTeq2sjk_CE?si=MAKBMUhyJ9G3m5Qv",
  },
  {
    type: "episode",
    episodeNumber: 3,
    title:
      "Share Your Bitcoin Journey: Episode 3 \u2013 Mr. Meadow\u2019s Bitcoin Art Odyssey",
    summary:
      "Indian filmmaker and visual storyteller Mr. Meadow shares his path from altcoin experiments to fully embracing BTC\u2014using AI to turn complex Bitcoin concepts into beautiful, tangible art.",
    thumbnail: "/SYBJ-EP3-web-Mr.Mdeaow.png",
    link: "https://youtu.be/BC-Lk4REV5I?si=6AmE28IzwDwS5Apm",
  },
  {
    type: "episode",
    episodeNumber: 4,
    title:
      "Share Your Bitcoin Journey: Episode 4 \u2013 Benjamin Ella\u2019s Sovereign Leap from The Royal Ballet to Bitcoin",
    summary:
      "After 17 seasons as a Soloist of The Royal Ballet, Benjamin Ella discovered Bitcoin while negotiating dancer contracts\u2014and found that sound money principles aligned with everything he believed about art, faith, and freedom.",
    thumbnail: "/SYBJ-EP4-web-Ben-Ella.png",
    link: "https://youtu.be/8FadoHhvxwY",
  },
  {
    type: "episode",
    episodeNumber: 5,
    title:
      "Share Your Bitcoin Journey: Episode 5 \u2013 Sara Jade\u2019s Value-for-Value Music Revolution",
    summary:
      "Cinematic pop-rock keytarist Sara Jade shares how she built a 30,000-plus following on Nostr, earned a million sats in a single TuneStr set, and left legacy platforms behind after Spotify removed her single for phantom streaming.",
    thumbnail: "/SYBJ-EP5-web-Sara-Jade.png",
    link: "https://youtu.be/U6cHaC-ZFWY",
  },
  {
    type: "episode",
    episodeNumber: 6,
    title:
      "Share Your Bitcoin Journey: Episode 6 \u2013 Joe Martin\u2019s 21st Century Troubadour Journey",
    summary:
      "UK singer-songwriter and self-described 21st century troubadour Joe Martin shares his journey from traditional touring to value-for-value music\u2014including how a $100 first-week earning on RSS exceeded years of Spotify streaming, and why he made his new album Alone in Valentine in Nashville with no shortcuts.",
    thumbnail: "/SYBJ-EP6-web-Joe-Martin.png",
    link: "https://youtu.be/MXUgrViBCaI?si=7CSkQGiV2BmLyrC2",
  },
  {
    type: "episode",
    episodeNumber: 7,
    title:
      "Share Your Bitcoin Journey: Episode 7 \u2013 Thomas Forsyth\u2019s General Handychap Path to Sound Money",
    summary:
      "London-based designer, maker, and engineer Thomas Forsyth\u2014whose work spans the Saatchi Gallery, Glastonbury Festival, the Wall Street Journal\u2019s Apple Car, and a Star Wars K-2SO build for Silicon Valley Comic Con\u2014shares why he calls himself a \u201Cgeneral handychap,\u201D how he discovered Bitcoin three times before it clicked, and the philosophical link between sound money and sound craft.",
    thumbnail: "/SYBJ-web-EP7-Thomas-.png",
    link: "https://youtu.be/ZepNitUDItg",
  },
  {
    type: "article",
    title:
      "Kenneth Burris \u2013 Sovereign Strokes in the Shadow of Cooling Towers",
    teaser:
      "In an era where digital ephemera floods our screens and AI churns out infinite images, Kenneth Burris stands as a defiant sentinel of permanence. This New York-based oil painter, with over three decades of studio mastery, doesn\u2019t merely create art; he forges it as a bulwark against the fleeting. His Post-Globalist Landscape series, where industrial behemoths like cooling towers loom amid misty wildernesses, provokes a visceral question: What endures when empires of code crumble?",
    byline: "Bitcoin For The Arts, Inc.",
    images: [
      {
        src: "/Alone_Oil on canvas_24x36inches.jpg",
        alt: "Alone by Kenneth Burris — oil on canvas",
        caption: "Alone, Oil on canvas, 24 \u00d7 36 inches",
      },
      {
        src: "/Moist Still Water_Oil on canvas_24x36inches.jpg",
        alt: "Moist Still Water by Kenneth Burris — oil on canvas",
        caption:
          "Moist Still Water (Landscape with Poles), Oil on canvas, 24 \u00d7 36 in, 2026",
      },
      {
        src: "/Coastal Sea Shore_OIl on canvas_11x14inches.jpg",
        alt: "Coastal Sea Shore by Kenneth Burris — oil on canvas",
        caption:
          "Coastal Sea Shore (Moss-covered), Oil on canvas, 11 \u00d7 14 in, 2025",
      },
    ],
    link: "/stories/kenneth-burris",
  },
  {
    type: "article",
    title:
      "Benjamin Ella \u2013 A Royal Ballet Soloist\u2019s Sovereign Leap to Bitcoin",
    teaser:
      "After 17 seasons as a Soloist of The Royal Ballet \u2014 with roles created for him by Wayne McGregor, Crystal Pite, and Hofesh Shechter \u2014 Benjamin Ella retired in December 2025 and discovered that the same sound money principles he\u2019d been learning through Bitcoin aligned with everything he believed about art, faith, and freedom. Two professional dancers from opposite sides of the world sit down for a conversation about the broken economics of arts funding and why Bitcoin is the path forward.",
    byline: "Bitcoin For The Arts, Inc.",
    profileImage: {
      src: "/Benjamin-Ella-BFTA-Profile.jpg",
      alt: "Benjamin Ella \u2014 former Royal Ballet Soloist, dancer, choreographer, and Bitcoin advocate",
    },
    images: [],
    link: "/stories/benjamin-ella",
  },
  {
    type: "article",
    title:
      "Man Like Kweks \u2013 Rhythms of Rebellion from Kilimanjaro to the Timechain",
    teaser:
      "In the pulsating heart of Tanzania\u2019s Bitcoin frontier, where Mount Kilimanjaro\u2019s snow-capped peaks pierce the sky like a defiant HODL against fiat\u2019s fleeting storms, Man Like Kweks crafts sonic manifestos that echo across continents. This visionary musician, community educator, and Christian fuses Afrobeat rhythms with Lightning-fast zaps, transforming sound waves into sovereign anthems.",
    byline: "Bitcoin For The Arts, Inc.",
    profileImage: {
      src: "/Man-Like-Kweks.webp",
      alt: "Man Like Kweks \u2014 musician, educator, Bitcoin advocate from Tanzania",
    },
    images: [
      {
        src: "/Man-like-kweks-cartoon-profile.jpg",
        alt: "Man Like Kweks \u2014 illustrated profile",
        caption: "Man Like Kweks",
      },
      {
        src: "/Man-Like-Album-Cover.jpg",
        alt: "Tokyo Citadel Remix \u2014 Man Like Kweks & reelrichard",
        caption: "Tokyo Citadel Remix (with reelrichard)",
      },
    ],
    link: "/stories/man-like-kweks",
  },
  {
    type: "article",
    title:
      "Beth Alta Fletcher \u2013 Frontier Visions in the Ledger of Freedom",
    teaser:
      "In the vast, untamed expanse of digital creation, where algorithms churn soulless facsimiles and AI threatens to commodify the human spark, Beth Alta Fletcher emerges as a defiant oracle from Alaska\u2019s wilds. This multifaceted artist\u2014athlete turned Rolfer, yogi turned Bitcoin visionary\u2014wields her MacBook Pro like a shaman\u2019s tool, conjuring hand-generated digital symphonies that defy convention and demand sovereignty.",
    byline: "Bitcoin For The Arts, Inc.",
    images: [
      {
        src: "/fletcher-along-the-watchtower.jpg",
        alt: "Along The Watchtower by Beth Alta Fletcher \u2014 digital composition",
        caption: "\u201CAlong The Watchtower\u201D",
      },
      {
        src: "/fletcher-le-patriot.jpg",
        alt: "Le Patriot by Beth Alta Fletcher \u2014 digital composition",
        caption: "\u201CLe Patriot\u201D",
      },
      {
        src: "/fletcher-lady-nakamoto.jpg",
        alt: "Lady Nakamoto by Beth Alta Fletcher \u2014 digital composition",
        caption: "\u201CLady Nakamoto\u201D",
      },
    ],
    link: "/stories/beth-alta-fletcher",
  },
  {
    type: "article",
    title:
      "Hitomi Matsui \u2013 The Quiet Observer in a Digital Storm",
    teaser:
      "In the ceaseless churn of New York\u2019s art scene, where provocation often trumps subtlety, Hitomi Matsui emerges as a rare voice of contemplative restraint. Born in Osaka, Japan, she channels her nomadic explorations and Bitcoin awakening into illustrated vignettes starring Nekosan\u2014a white cat observing the invisible architectures of money, algorithms, and sovereignty.",
    byline: "Bitcoin For The Arts, Inc.",
    images: [
      {
        src: "/matsui-just-right-price.jpg",
        alt: "Who Decided the Just Right Price \u2014 Nekosan on a NYC fire escape by Hitomi Matsui",
        caption: "\u201CWho Decides the \u2018Just Right Price\u2019?\u201D",
      },
      {
        src: "/matsui-just-right-ad.jpg",
        alt: "Why is this Just Right Ad Showing Up \u2014 NYC triptych by Hitomi Matsui",
        caption: "\u201CWhy Is the \u2018Just Right Ad\u2019 Showing Up?\u201D",
      },
      {
        src: "/matsui-nekosan-detective.jpg",
        alt: "Nekosan detective investigating targeted ads by Hitomi Matsui",
        caption: "\u201CWhy Is the \u2018Just Right Ad\u2019 Showing Up?\u201D",
      },
    ],
    link: "/stories/hitomi-matsui",
  },
  {
    type: "article",
    title:
      "Matt Finlay \u2013 Dissident Beats from the World\u2019s Longest Lockdown",
    teaser:
      "In the shadow of Melbourne\u2019s brutal 2020\u20132021 lockdowns \u2014 the longest and most severe in the world \u2014 Matt Finlay picked up his instruments and refused to stay silent. A musician, independent artist, and fierce defender of free expression, Finlay is now a featured voice in Bitcoin For The Arts. His work stands as a sonic manifesto for artistic sovereignty in an age when platforms censor, governments control, and fiat systems punish dissent.",
    byline: "Bitcoin For The Arts, Inc.",
    profileImage: {
      src: "/Matt-Finlay-BFTA-Artist.jpg",
      alt: "Matt Finlay \u2014 musician, dissident artist, Bitcoin advocate from Melbourne",
    },
    images: [],
    link: "/stories/matt-finlay",
  },
  {
    type: "article",
    title:
      "Aksana Zasinets (5Ksana) \u2013 Stitching Sovereignty Through the Needle\u2019s Eye",
    teaser:
      "In an era where digital currencies challenge the very fabric of economic and cultural systems, Aksana Zasinets\u2014known by her stage name 5Ksana\u2014redefines sovereignty through hand-embroidered masterpieces that blend 22 years of traditional tailoring with the revolutionary ethos of Bitcoin. Her intricate beadwork and thread paintings aren\u2019t merely decorative; they\u2019re manifestos of independence.",
    byline: "Bitcoin For The Arts, Inc.",
    images: [
      {
        src: "/zasinets-bullcoin.jpg",
        alt: "Bullcoin by Aksana Zasinets \u2014 hand-embroidered beaded bull with Bitcoin coins",
        caption: "\u201CBullcoin\u201D",
      },
      {
        src: "/zasinets-girl-bitcoin-eye.jpg",
        alt: "The Girl with the Bitcoin Eye by Aksana Zasinets \u2014 embroidered diptych portraits",
        caption: "\u201CThe Girl with the Bitcoin Eye\u201D",
      },
      {
        src: "/zasinets-world-of-bitcoin.jpg",
        alt: "World of Bitcoin by Aksana Zasinets \u2014 embroidered cosmic eye with Bitcoin symbol",
        caption: "\u201CWorld of Bitcoin\u201D",
      },
    ],
    link: "/stories/aksana-zasinets",
  },
  {
    type: "article",
    title:
      "Zap Animations \u2013 Reviving the Spark in Bitcoin\u2019s Eternal Frame",
    teaser:
      "In the flickering glow of artistic resurrection, A13MW emerges as a cyberpunk alchemist, breathing life into forgotten frames of artistic sovereignty. This visionary animator and Bitcoin artist\u2014a former UX Designer and eternal student of Living Systems\u2014wields her tools like a digital wand, conjuring hand-drawn symphonies that dance across devices around the world.",
    byline: "Bitcoin For The Arts, Inc.",
    images: [
      {
        src: "/a13mw-crying-baby-dancing-bee.jpg",
        alt: "Crying Baby, Dancing Bee \u2014 animated short poster by A13MW",
        caption: "\u201CCrying Baby, Dancing Bee\u201D",
      },
      {
        src: "/a13mw-gone-with-the-wind.jpg",
        alt: "Gone with the Wind \u2014 digital animation art by A13MW",
        caption: "\u201CGone with the Wind\u201D",
      },
      {
        src: "/a13mw-towards-the-light.jpg",
        alt: "Towards the Light \u2014 digital animation art by A13MW",
        caption: "\u201CTowards the Light\u201D",
        objectPosition: "bottom",
      },
    ],
    link: "/stories/a13mw-zap-animations",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function QuoteCard({
  quote,
  attribution,
  wide = false,
}: {
  quote: string;
  attribution: string;
  wide?: boolean;
}) {
  return (
    <figure
      className={[
        "relative overflow-hidden rounded-2xl border border-accent/25 bg-surface/70 p-6 shadow-sm transition-all",
        "hover:shadow-md hover:border-accent/40",
        wide ? "md:col-span-2" : "",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(247,147,26,0.14),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(126,87,194,0.12),transparent_55%)]" />
      <div className="relative">
        <blockquote className="text-base leading-relaxed text-foreground/90 italic font-[var(--font-display)]">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <figcaption className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
          <span
            className="h-1.5 w-1.5 rounded-full bg-accent/80"
            aria-hidden="true"
          />
          {attribution}
        </figcaption>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function StoriesPage() {
  const episodes = storiesData
    .filter((s): s is Episode => s.type === "episode")
    .sort((a, b) => b.episodeNumber - a.episodeNumber);
  const articles = storiesData.filter(
    (s): s is Article => s.type === "article",
  );

  return (
    <main className="min-h-screen bg-background">
      {/* ============================================================ */}
      {/*  1. HERO — 21-artist image, headline, dual CTAs              */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden">
        <Image
          src="/21-artist.jpg"
          alt="Artists creating with sovereignty"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center sm:py-32 lg:py-40">
          <div className="mx-auto inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm">
            Bitcoin for the Arts
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Real Artists. Real Bitcoin Journeys.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80 sm:text-xl font-[var(--font-display)] italic">
            How sound money is giving creators time, freedom, and sovereignty.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/stories/share-your-story"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#f7931a] px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#e8850f] hover:shadow-xl"
            >
              Share Your Story
            </Link>
            <a
              href="#episodes"
              className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-white/40 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Explore the Stories
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. FEATURED EPISODES — moved up, trimmed summaries           */}
      {/* ============================================================ */}
      <section id="episodes" className="bg-gradient-to-b from-surface/60 via-background to-surface/40 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-muted">
            Featured Episodes
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Share Your Bitcoin Journey
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {episodes.map((ep) => (
              <a
                key={ep.link}
                href={ep.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-2xl border-2 border-[#d4af37] bg-background shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0_12px_40px_rgba(212,175,55,0.2)]"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={ep.thumbnail}
                    alt={ep.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f7931a] shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <svg
                        className="ml-1 h-6 w-6 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Episode {ep.episodeNumber}
                  </div>
                  <h3 className="mt-3 text-base font-bold leading-snug tracking-tight sm:text-lg">
                    {ep.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                    {ep.summary}
                  </p>
                  <div className="mt-auto pt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Watch on YouTube
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. MID-PAGE CTA BANNER                                      */}
      {/* ============================================================ */}
      <section className="border-y border-[#d4af37]/30 bg-gradient-to-r from-[#7e57c2]/[0.06] via-background to-[#f7931a]/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-12 text-center sm:py-14">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Every artist has a Bitcoin story worth telling.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted sm:text-lg">
            Help us teach artists about Bitcoin through real lived experience.
            Share your journey so other creators can learn, grow, and build
            sovereignty with confidence.
          </p>
          <div className="mt-6">
            <Link
              href="/stories/share-your-story"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#f7931a] px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#e8850f] hover:shadow-lg"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. MICRO-GRANT QUOTE CARDS — moved down                     */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-4xl">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Spotlight &bull; What micro-grants unlock
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            &ldquo;What would a $500&ndash;$2,000 Bitcoin-native micro-grant
            unlock in 30&nbsp;days?&rdquo;
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            We asked artists on Nostr. These responses are practical, specific,
            and exactly why small grants matter: time, materials, travel, studio
            sessions, and the ability to say &ldquo;yes&rdquo; to
            opportunities.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <QuoteCard
              quote="3/5s of a new sound bag, craft services and wardrobe for an indie film, or 1/3 of a camera."
              attribution="FuzzyNibs \u2022 Nostr"
            />
            <QuoteCard
              quote="$500 would unlock a week to focus on recording and producing music instead of the casual work I need to cover bills\u2026"
              attribution="Matt Finlay \u2022 Nostr"
            />
            <QuoteCard
              quote="Right now, I\u2019m applying for juried art fair booths \u2014 $500 to $1,500 depending on the city/venue. I do 15\u201320 a year and pay 4\u20136 months in advance. The grant would help alleviate financial stress. Paying for shows and travel is my biggest expense."
              attribution="unit \u2022 Nostr"
            />
            <QuoteCard
              quote="I would adopt an alpaca at the farm down the street\u2026 they shear in May and you get the wool. I\u2019d use the felt to make insulation for my mittens \u2014 plus fabric, materials, a heat press, and dies to make more sizes."
              attribution="sunavaunt \u2022 Nostr"
            />
            <QuoteCard
              quote="For any of our artists, that would unlock a good chunk of studio time to record a handful of tracks. If the opportunity arose and the stars aligned for a show or tour, that would cover most of travel/lodging."
              attribution="Hash Power Music \u2022 Nostr"
              wide
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/donate"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
            >
              Fund micro-grants
            </Link>
            <Link
              href="/grants"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
            >
              Learn about grants
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. ARTIST GALLERY — tightened cards, single featured image   */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-b from-surface/40 to-background py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-muted">
            Artist Gallery
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Featured Artists &amp; Articles
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.link}
                href={article.link}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/50 shadow-sm transition-all hover:shadow-md hover:border-accent/30"
              >
                {/* Card image — profile photo or first gallery artwork */}
                {article.profileImage ? (
                  <div className="flex items-center justify-center bg-gradient-to-b from-[#7e57c2]/10 to-surface/30 py-8">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-[#d4af37] shadow-md">
                      <Image
                        src={article.profileImage.src}
                        alt={article.profileImage.alt}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                  </div>
                ) : article.images.length > 0 ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={article.images[0].src}
                      alt={article.images[0].alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={article.images[0].objectPosition ? { objectPosition: article.images[0].objectPosition } : undefined}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                ) : null}

                {/* Text content */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-bold leading-snug tracking-tight transition-colors group-hover:text-accent sm:text-lg">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">
                    {article.byline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                    {article.teaser}
                  </p>
                  <div className="mt-auto pt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Read full article
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  7. GALLERY WINGS — STORY INVITATION + NEWSLETTER             */}
      {/* ============================================================ */}
      <section className="border-t border-[#d4af37]/30 bg-gradient-to-b from-[#7e57c2]/[0.04] to-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Left wing — Story invitation */}
            <div className="rounded-2xl border border-[#d4af37]/40 bg-surface/80 p-6 shadow-sm sm:p-8">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
                Share Your Story
              </div>
              <h3 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
                Help Artists Learn Through Real Experience
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Help us teach artists about Bitcoin through real lived
                experience. Share your Bitcoin journey and artistic evolution so
                other creators can learn, grow, and build sovereignty with
                confidence.
              </p>
              <div className="mt-6">
                <Link
                  href="/stories/share-your-story"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border-2 border-[#d4af37] bg-transparent px-5 py-2 text-sm font-semibold text-[#d4af37] transition-colors hover:bg-[#d4af37]/10"
                >
                  Share your story and help artists
                </Link>
              </div>
            </div>

            {/* Right wing — Newsletter Signup */}
            <div className="rounded-2xl border border-[#d4af37]/40 bg-surface/80 p-6 shadow-sm sm:p-8">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
                Newsletter Signup
              </div>
              <h3 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
                News, Grants &amp; Events
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Subscribe to the Bitcoin for the Arts newsletter for updates on
                grants, programming, events, and artist stories.
              </p>
              <div className="mt-6">
                <Link
                  href="/connect"
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
                >
                  Subscribe to the Newsletter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
