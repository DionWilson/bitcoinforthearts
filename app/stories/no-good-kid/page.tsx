import FramedImage from "@/components/FramedImage";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "No Good Kid \u2013 Building Culture Around Bitcoin and Nostr | Bitcoin for the Arts",
  description:
    "No Good Kid is a designer, art director, and creative producer collaborating with authors, publishers, and independent artists to help complex ideas around Bitcoin, Nostr, and freedom tech reach a broader audience.",
};

export default function NoGoodKidPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#7e57c2] to-[#4a148c]">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: [
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.04) 2px,rgba(255,255,255,0.04) 4px)",
              "repeating-linear-gradient(90deg,transparent,transparent 2px,rgba(255,255,255,0.04) 2px,rgba(255,255,255,0.04) 4px)",
            ].join(","),
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 py-16 sm:py-24">
          <Link
            href="/stories"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 transition-colors hover:text-white"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to Stories
          </Link>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            No Good Kid &ndash; Building Culture Around Bitcoin and Nostr
          </h1>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            Bitcoin For The Arts, Inc.
          </p>
        </div>
      </section>

      {/* Article body */}
      <article className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
        <div className="prose-article">
          <p>
            In the age of the algorithm, where identity is currency and every
            artist is asked to sell a face, No Good Kid has chosen the
            opposite. A designer, art director, and creative producer with
            fifteen years in branding and marketing, he works behind a
            bandana and a pseudonym, collaborating with authors, publishers,
            and independent artists to help complex ideas reach a broader
            audience. He is not the name on the cover. He is one of the
            people in the room helping shape the project from the inside.
          </p>

          <p>
            His path began in the commercial arts, with fifteen years of
            building brand identities and marketing campaigns before Bitcoin
            ever entered the frame. That changed in 2020, when he encountered
            Bitcoin through the lens most newcomers arrive through: as a
            store of value, an escape hatch from the fiat treadmill. He
            attended meetups, then conferences, expecting to find a
            technology community. What he found was culture. &ldquo;I
            realized there was something beneath all the investing and
            technology talk,&rdquo; he writes, &ldquo;a culture I felt I&rsquo;d
            been looking for my whole life.&rdquo;
          </p>

          {/* Portrait */}
          <div className="my-12 mx-auto max-w-md">
            <FramedImage
              src="/nogoodkid-portrait.jpg"
              alt="No Good Kid, creative producer and art director, self-portrait in bandana and cap"
              caption="No Good Kid, self-portrait, 2026"
            />
          </div>

          <p>
            The distinction he draws about his own work is a rare kind of
            humility in a field that rewards ego.{" "}
            <em>
              &ldquo;If van Gogh created a hundred brand identities, they would
              probably look very similar. An artist is someone with one
              specific style of work. That&rsquo;s not me.&rdquo;
            </em>{" "}
            He describes his role as producer, closer to how a music producer
            works with a recording artist. The project sets the direction; he
            shapes it toward its fullest expression. He coordinates editors,
            manages physical production, contributes claims and campaign
            ideas, and lifts a book or a zine or a piece of packaging beyond
            its surface. The credit lives on the cover with someone
            else&rsquo;s name. That is by design.
          </p>

          <p>
            His work in the space has taken shape mostly in collaboration
            with authors and educators building outside the mainstream. For
            Du&scaron;an Matu&scaron;ka and the AmityAge team, whose Bitcoin
            Educators Academy has trained a generation of global Bitcoin
            educators, No Good Kid designed <em>Top 10 Bitcoin F*ck Ups</em>,
            written by Matu&scaron;ka, a guide for beginners to avoid the
            most common mistakes on their way down the Bitcoin rabbit hole.
          </p>

          {/* Top 10 Bitcoin F*ck Ups */}
          <div className="my-12 mx-auto max-w-md">
            <FramedImage
              src="/nogoodkid-amityage-top10.jpg"
              alt="Top 10 Bitcoin F*ck Ups book design by No Good Kid for AmityAge Education"
              caption="Top 10 Bitcoin F*ck Ups, book design for AmityAge Education"
            />
          </div>

          <p>
            Not every doorway into the Bitcoin space felt open to him. The
            famous cypherpunk line, &ldquo;cypherpunks write code,&rdquo;
            landed as an exclusion. He is not a coder, and does not pretend
            to be. What arrived next was the term <em>lunarpunk</em>,
            articulated to him by the Slovak cypherpunk author Juraj
            Bedn&aacute;r. Lunarpunk, in Bedn&aacute;r&rsquo;s framing, was
            less an implementation than a culture, a model for society built
            on peer-to-peer interactions, private communication tools,
            independent money, and the ability to transact without
            permission. For No Good Kid, the door opened. He designed the{" "}
            <em>Dark Forest</em> zine, a collaboration featuring an essay by
            Peter Horv&aacute;th and poetry and photography by the analog
            podcaster and artist bitpunk.fm, translating an emerging
            subculture&rsquo;s inner language into a visual object a broader
            audience could hold.
          </p>

          {/* Dark Forest zine */}
          <div className="my-12 mx-auto max-w-md">
            <FramedImage
              src="/nogoodkid-dark-forest.jpg"
              alt="Dark Forest zine cover, essay by Peter Horvath and poetry and photography by bitpunk.fm, designed by No Good Kid"
              caption="Dark Forest zine, designed by No Good Kid"
            />
          </div>

          <p>
            The fullest expression of that lunarpunk practice arrived in
            2026, when juraj &amp; lisa published <em>Tamers of Entropy</em>,
            described as a lunarpunk novel but conceived as a full
            conceptual project. The book became a universe. Premium editions
            arrived in evidence-bag packaging, sealed for authorized eyes
            only. Characters from the story
            continued to post in character on Nostr, their profiles live and
            responsive to readers who chose to engage. No Good Kid produced
            and art-directed the project across the entire ecosystem, from
            the typography of the printed page to the packaging that makes
            each premium edition feel like contraband smuggled from a nearby
            future.
          </p>

          {/* Tamers of Entropy */}
          <div className="my-12 mx-auto max-w-md">
            <FramedImage
              src="/nogoodkid-tamers-cover.jpg"
              alt="Tamers of Entropy, lunarpunk novel by juraj and lisa, produced and art directed by No Good Kid"
              caption="Tamers of Entropy, produced and art directed by No Good Kid"
            />
          </div>

          <p>
            Read across the body of work, a thesis emerges.{" "}
            <em>
              &ldquo;I got lucky when Juraj Bedn&aacute;r, my personal hero,
              invited me to handle the creative side of some of his
              projects,&rdquo;
            </em>{" "}
            No Good Kid writes.{" "}
            <em>
              &ldquo;They were written without much technical lingo, and he
              did a great job explaining deep cypherpunk ideas in a way a
              normal homie could understand. I then designed them in a way
              that would feel familiar to cypherpunks, while still being
              attractive to the homie. That&rsquo;s how I see myself
              contributing to lunarpunk culture. Breaking down the boundary
              between the techy way of presenting things and more or less
              normal people&rsquo;s taste, making it appealing to both
              sides.&rdquo;
            </em>
          </p>

          <blockquote>
            <p>
              &ldquo;Today I&rsquo;m most interested in building culture
              around Bitcoin and Nostr that puts people before
              technology.&rdquo;
            </p>
          </blockquote>

          <p>
            Bitcoin For The Arts is proud to feature the artists most
            essential to the movement&rsquo;s next decade, including the
            ones whose work the algorithm cannot easily surface. Musicians,
            painters, and choreographers get their names on the ticket, and
            that is right. Designers, producers, and art directors more
            often do not. In No Good Kid, BFTA finds a collaborator whose
            craft is in service of the story others are trying to tell, and
            whose thesis about people, culture, community, and the emerging
            world of Bitcoin and Nostr fits our own without needing
            translation.
          </p>
        </div>

        {/* Artist link */}
        <div className="mt-14 rounded-2xl border border-[#d4af37]/40 bg-surface/50 p-6 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
            Explore the Artist
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Discover more of No Good Kid&rsquo;s work with AmityAge,{" "}
            <em>Tamers of Entropy</em>, the <em>Dark Forest</em> zine, and
            his broader body of design and creative production.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="https://nogoodkid.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border-2 border-[#d4af37] px-5 py-2.5 text-sm font-semibold text-[#d4af37] transition-colors hover:bg-[#d4af37]/10"
            >
              nogoodkid.com
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5-6H21m0 0v7.5m0-7.5l-11.25 11.25"
                />
              </svg>
            </a>
            <a
              href="https://tamersofentropy.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border-2 border-[#d4af37] px-5 py-2.5 text-sm font-semibold text-[#d4af37] transition-colors hover:bg-[#d4af37]/10"
            >
              tamersofentropy.net
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5-6H21m0 0v7.5m0-7.5l-11.25 11.25"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Back to stories */}
        <div className="mt-8 border-t border-border pt-8">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:opacity-80"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to Artist Stories
          </Link>
        </div>
      </article>
    </main>
  );
}
