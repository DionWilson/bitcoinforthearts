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
  const showAdvanceBid = lot.status === 'open' && lot.startingBidSats != null;

  return (
    <main className="min-h-screen bg-[#FFFAF0] text-black">
      <section className="border-b border-black/10 bg-black px-6 py-7 text-[#FFFAF0] sm:px-10 sm:py-8">
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

      {/*
        Layout intent:
        - Mobile: image → bid snapshot + short description → advance bid → deeper details
        - Desktop: left = artwork + sticky advance bid; right = full details
      */}
      <section className="mx-auto grid max-w-5xl gap-8 px-6 py-10 lg:grid-cols-2 lg:items-start lg:gap-10 sm:px-10 sm:py-12">
        <div className="space-y-6">
          {lot.imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={lot.imageSrc}
              alt={lot.imageAlt ?? lot.title}
              className="w-full border border-black/10 bg-white object-contain"
            />
          ) : null}
          {lot.imageSecondarySrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={lot.imageSecondarySrc}
              alt={lot.imageSecondaryAlt ?? `${lot.title} detail card`}
              className="w-full border border-black/10 bg-white object-contain"
            />
          ) : null}
          <p className="text-xs text-black/50">
            Artwork © {lot.artistName}. Used with permission for Bitcoin Arts
            Park silent auction.
          </p>

          <div className="space-y-6 lg:sticky lg:top-6">
            {/* Mobile: short context before the form. Desktop: form sits under image. */}
            <div className="border border-black bg-white p-5 lg:hidden">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#FF4F14]">
                At a glance
              </p>
              <p className="mt-3 text-xl font-light uppercase tracking-tight">
                {formatOpeningBid(lot)}
              </p>
              <p className="mt-2 text-sm text-black/70">
                Increments {formatSats(lot.incrementSats)} · Closes{' '}
                {lot.closesDisplay}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-black/85">
                {lot.description}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-black/55">
                Winner picks up in person at Bitcoin Arts Park, Columbus (Sept
                23-24). No shipping.
              </p>
              {showAdvanceBid ? (
                <a
                  href="#advance-bid"
                  className="mt-4 inline-block text-[12px] font-medium uppercase tracking-[0.14em] text-[#FF4F14] no-underline"
                >
                  Place advance bid ↓
                </a>
              ) : null}
            </div>

            {showAdvanceBid ? (
              <div
                id="advance-bid"
                className="scroll-mt-6 border border-black bg-white p-5"
              >
                <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#FF4F14]">
                  Advance bid
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-black/75">
                  Opening {formatOpeningBid(lot)}. Binding if you win. Pickup in
                  Columbus only.
                </p>
                <div className="mt-4">
                  <AdvanceBidForm
                    slug={lot.slug}
                    lotCode={lot.lotCode}
                    title={lot.title}
                    openingBidSats={lot.startingBidSats!}
                    incrementSats={lot.incrementSats}
                    compact
                  />
                </div>
              </div>
            ) : null}
          </div>
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
              <div className="flex gap-3 border-b border-black/10 pb-2">
                <dt className="w-28 shrink-0 text-black/50">Opening</dt>
                <dd>{formatOpeningBid(lot)}</dd>
              </div>
              <div className="flex gap-3 border-b border-black/10 pb-2">
                <dt className="w-28 shrink-0 text-black/50">Increment</dt>
                <dd>{formatSats(lot.incrementSats)}</dd>
              </div>
              <div className="flex gap-3 border-b border-black/10 pb-2">
                <dt className="w-28 shrink-0 text-black/50">Closes</dt>
                <dd>{lot.closesDisplay}</dd>
              </div>
            </dl>
            {/* Full description on desktop; mobile already saw it in At a glance */}
            <p className="mt-4 hidden text-base leading-relaxed text-black/85 lg:block">
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
              {!lot.artistEmail &&
              !lot.artistLightning &&
              !lot.artistBitcoin &&
              !lot.artistStrike ? (
                <p className="mt-3 text-xs text-black/50">
                  Bitcoin / Lightning payout handles appear here when the artist
                  provides them on the consignment agreement.
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="border border-black/15 bg-white p-5">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#FF4F14]">
              How bidding works
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              <li>
                Advance bids online seed the paper sheet on the Expo floor.
              </li>
              <li>
                On site: sign the sheet with name, email or phone, and bid in
                sats.
              </li>
              <li>
                Dollar figures shown as “about $…” are orientation only. They
                are not a live exchange rate and not a retail price. Bidding is
                in sats.
              </li>
              <li>
                Settlement after win may be Bitcoin/Lightning or USD at the
                posted rate of the day.
              </li>
              <li>
                Highest valid bid at close wins. Payment and in-person pickup in
                Columbus required. No shipping.
              </li>
            </ul>
          </div>

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
            {showAdvanceBid ? (
              <a
                href="#advance-bid"
                className="inline-block bg-[#FF4F14] px-5 py-3 text-[12px] font-medium uppercase tracking-[0.14em] text-[#FFFAF0] no-underline lg:hidden"
              >
                Advance bid ↑
              </a>
            ) : null}
            <Link
              href={`/midwest/auction/${lot.slug}/bid-sheet`}
              className="inline-block border border-black px-5 py-3 text-[12px] font-medium uppercase tracking-[0.14em]"
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
