import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAuctionLot,
  midwestAuctionLots,
  formatSats,
  formatOpeningBid,
} from '@/lib/midwest-auction-lots';
import AdvanceBidForm from '../AdvanceBidForm';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return midwestAuctionLots.map((lot) => ({ slug: lot.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lot = getAuctionLot(slug);
  if (!lot) return { title: 'Auction Lot' };
  return {
    title: `${lot.title} · Silent Auction | Bitcoin for the Arts`,
    description: lot.description,
    openGraph: {
      title: `${lot.title} - ${lot.artistName}`,
      description: lot.description,
      images: lot.imageSrc ? [lot.imageSrc] : undefined,
    },
  };
}

export default async function AuctionLotPage({ params }: Props) {
  const { slug } = await params;
  const lot = getAuctionLot(slug);
  if (!lot) notFound();

  const qrTarget = `https://www.bitcoinforthearts.org/midwest/auction/${lot.slug}`;
  const hasArtistContact =
    Boolean(lot.artistEmail) ||
    Boolean(lot.artistStrike) ||
    Boolean(lot.artistLightning) ||
    Boolean(lot.artistBitcoin) ||
    Boolean(lot.artistWebsite) ||
    Boolean(lot.artistSocial) ||
    Boolean(lot.artistLinks?.length) ||
    Boolean(lot.artistBio);

  return (
    <main className="min-h-screen bg-[#FFFAF0] text-black">
      <section className="border-b border-black/10 bg-black px-6 py-8 text-[#FFFAF0] sm:px-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B3FF48]">
          {lot.lotCode} · Peer-to-Peer Silent Auction
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-light uppercase tracking-tight sm:text-5xl">
          {lot.title}
        </h1>
        {lot.subtitle ? (
          <p className="mt-2 text-lg text-[#FFFAF0]/85">{lot.subtitle}</p>
        ) : null}
        <p className="mt-4 text-sm uppercase tracking-[0.12em] text-[#FF4F14]">
          {lot.artistName} · {lot.year}
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-12 lg:grid-cols-2 sm:px-10">
        <div>
          {lot.imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={lot.imageSrc}
              alt={lot.imageAlt ?? lot.title}
              className="w-full border border-black/10 bg-white object-contain"
            />
          ) : null}
          <p className="mt-3 text-xs text-black/50">
            Artwork © {lot.artistName}. Used with permission for Bitcoin Arts
            Park silent auction.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#FF4F14]">
              The Work
            </h2>
            <dl className="mt-3 space-y-2 text-sm leading-relaxed">
              <div className="flex gap-3 border-b border-black/10 pb-2">
                <dt className="w-28 shrink-0 text-black/50">Medium</dt>
                <dd>{lot.medium}</dd>
              </div>
              <div className="flex gap-3 border-b border-black/10 pb-2">
                <dt className="w-28 shrink-0 text-black/50">Dimensions</dt>
                <dd>{lot.dimensions}</dd>
              </div>
              <div className="flex gap-3 border-b border-black/10 pb-2">
                <dt className="w-28 shrink-0 text-black/50">Year</dt>
                <dd>{lot.year}</dd>
              </div>
              <div className="flex gap-3 border-b border-black/10 pb-2">
                <dt className="w-28 shrink-0 text-black/50">Artist</dt>
                <dd>
                  {lot.artistWebsite ? (
                    <a
                      href={lot.artistWebsite}
                      className="font-medium text-[#FF4F14] no-underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {lot.artistName}
                    </a>
                  ) : (
                    lot.artistName
                  )}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-base leading-relaxed text-black/85">
              {lot.description}
            </p>
          </div>

          {hasArtistContact ? (
            <div className="border border-black bg-white p-5">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#FF4F14]">
                Artist
              </h2>
              {lot.artistBio ? (
                <p className="mt-3 text-sm leading-relaxed text-black/85">
                  {lot.artistBio}
                </p>
              ) : null}
              <dl className="mt-4 space-y-2 text-sm leading-relaxed">
                {lot.artistWebsite ? (
                  <div className="flex gap-3 border-b border-black/10 pb-2">
                    <dt className="w-28 shrink-0 text-black/50">Website</dt>
                    <dd>
                      <a
                        href={lot.artistWebsite}
                        className="text-[#FF4F14] no-underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {lot.artistWebsite.replace(/^https?:\/\//, '')}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {lot.artistSocial ? (
                  <div className="flex gap-3 border-b border-black/10 pb-2">
                    <dt className="w-28 shrink-0 text-black/50">Social</dt>
                    <dd>{lot.artistSocial}</dd>
                  </div>
                ) : null}
                {lot.artistEmail ? (
                  <div className="flex gap-3 border-b border-black/10 pb-2">
                    <dt className="w-28 shrink-0 text-black/50">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${lot.artistEmail}`}
                        className="text-[#FF4F14] no-underline"
                      >
                        {lot.artistEmail}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {lot.artistStrike ? (
                  <div className="flex gap-3 border-b border-black/10 pb-2">
                    <dt className="w-28 shrink-0 text-black/50">Strike</dt>
                    <dd className="break-all font-mono text-xs sm:text-sm">
                      {lot.artistStrike}
                    </dd>
                  </div>
                ) : null}
                {lot.artistLightning ? (
                  <div className="flex gap-3 border-b border-black/10 pb-2">
                    <dt className="w-28 shrink-0 text-black/50">Lightning</dt>
                    <dd className="break-all font-mono text-xs sm:text-sm">
                      {lot.artistLightning}
                    </dd>
                  </div>
                ) : null}
                {lot.artistBitcoin ? (
                  <div className="flex gap-3 border-b border-black/10 pb-2">
                    <dt className="w-28 shrink-0 text-black/50">Bitcoin</dt>
                    <dd className="break-all font-mono text-xs sm:text-sm">
                      {lot.artistBitcoin}
                    </dd>
                  </div>
                ) : null}
              </dl>
              {lot.artistLinks?.length ? (
                <ul className="mt-4 space-y-1 text-sm">
                  {lot.artistLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-[#FF4F14] no-underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.label} →
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
              {!lot.artistEmail && !lot.artistLightning && !lot.artistBitcoin && !lot.artistStrike ? (
                <p className="mt-3 text-xs text-black/50">
                  Bitcoin / Lightning payout handles appear here when the artist
                  provides them on the consignment agreement.
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="border border-black bg-white p-5">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#FF4F14]">
              How to Bid
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              <li>
                Opening bid: <strong>{formatOpeningBid(lot)}</strong>
              </li>
              <li>
                Minimum increase between bids:{' '}
                <strong>{formatSats(lot.incrementSats)}</strong>
              </li>
              <li>
                Advance bids are open now online. The high advance bid seeds the
                paper sheet on the Expo floor.
              </li>
              <li>
                On site: sign the paper bid sheet next to the work with your
                name, email or phone, and bid amount in sats.
              </li>
              <li>
                Bids are counted in sats. Settlement after win may be paid in
                Bitcoin/Lightning or USD at the posted rate of the day.
              </li>
              <li>
                Auction closes: <strong>{lot.closesDisplay}</strong>
              </li>
              <li>
                Highest valid bid at close wins. Winner must complete payment
                and pick up in person at Bitcoin Arts Park in Columbus. No
                shipping.
              </li>
            </ul>
          </div>

          {lot.status === 'open' && lot.startingBidSats != null ? (
            <div className="border border-black bg-white p-5">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#FF4F14]">
                Advance bid
              </h2>
              <div className="mt-4">
                <AdvanceBidForm
                  slug={lot.slug}
                  lotCode={lot.lotCode}
                  title={lot.title}
                  openingBidSats={lot.startingBidSats}
                  incrementSats={lot.incrementSats}
                />
              </div>
            </div>
          ) : null}

          <div className="border border-black/15 bg-white p-5">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#FF4F14]">
              Proceeds
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              Of the hammer price (winning bid):{' '}
              <strong>{lot.bftaShare} Bitcoin for the Arts</strong> (501(c)(3))
              {lot.artistShare && lot.artistShare !== '0%' ? (
                <>
                  {' '}
                  · <strong>
                    {lot.artistShare} {lot.artistName}
                  </strong>
                  .
                </>
              ) : (
                '.'
              )}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-black/75">
              {lot.noSaleTerms}
            </p>
          </div>

          <div className="border border-black/15 bg-white p-5">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#FF4F14]">
              Event
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              {lot.eventName}
              <br />
              {lot.eventLocation}
              <br />
              {lot.eventDates}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/midwest/auction/${lot.slug}/bid-sheet`}
              className="inline-block bg-[#FF4F14] px-5 py-3 text-[12px] font-medium uppercase tracking-[0.14em] text-[#FFFAF0]"
            >
              Print bid sheet →
            </Link>
            <Link
              href="/midwest/auction"
              className="inline-block border border-black px-5 py-3 text-[12px] font-medium uppercase tracking-[0.14em]"
            >
              All lots →
            </Link>
            <Link
              href="/midwest"
              className="inline-block border border-black px-5 py-3 text-[12px] font-medium uppercase tracking-[0.14em]"
            >
              Midwest hub →
            </Link>
          </div>

          <p className="text-xs text-black/45">
            Vinyl QR for this lot points to:{' '}
            <span className="break-all text-black/70">{qrTarget}</span>
          </p>
        </div>
      </section>
    </main>
  );
}
