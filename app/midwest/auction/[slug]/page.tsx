import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAuctionLot,
  midwestAuctionLots,
  formatUsd,
  formatSats,
} from '@/lib/midwest-auction-lots';

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
      title: `${lot.title} — ${lot.artistName}`,
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

          <div className="border border-black bg-white p-5">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#FF4F14]">
              How to Bid
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              <li>
                Opening bid:{' '}
                <strong>
                  {formatSats(lot.startingBidSats)}
                  {lot.startingBidUsd
                    ? ` / ${formatUsd(lot.startingBidUsd)}`
                    : ''}
                </strong>
              </li>
              <li>
                Minimum increase between bids:{' '}
                <strong>{formatSats(lot.incrementSats)}</strong>
              </li>
              <li>
                Sign the paper bid sheet next to the work with your name, email
                or phone, and bid amount in sats.
              </li>
              <li>
                Bids are counted in sats. Settlement after win may be paid in
                Bitcoin/Lightning or USD at the posted rate of the day.
              </li>
              <li>
                Auction closes:{' '}
                <strong>{lot.closesDisplay}</strong>
              </li>
              <li>
                Highest valid bid at close wins. Winner must complete payment
                before the work is released.
              </li>
            </ul>
          </div>

          <div className="border border-black/15 bg-white p-5">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#FF4F14]">
              Proceeds
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              Of the hammer price (winning bid):{' '}
              <strong>{lot.bftaShare} Bitcoin for the Arts</strong> (501(c)(3)) ·{' '}
              <strong>{lot.artistShare} {lot.artistName}</strong>.
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
            {(lot.artistEmail || lot.artistStrike || lot.artistWebsite) && (
              <p className="mt-4 text-sm leading-relaxed text-black/75">
                Artist contact
                {lot.artistEmail ? (
                  <>
                    <br />
                    Email:{' '}
                    <a
                      href={`mailto:${lot.artistEmail}`}
                      className="text-[#FF4F14] no-underline"
                    >
                      {lot.artistEmail}
                    </a>
                  </>
                ) : null}
                {lot.artistStrike ? (
                  <>
                    <br />
                    Strike: {lot.artistStrike}
                  </>
                ) : null}
                {lot.artistWebsite ? (
                  <>
                    <br />
                    <a
                      href={lot.artistWebsite}
                      className="text-[#FF4F14] no-underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {lot.artistWebsite.replace(/^https?:\/\//, '')}
                    </a>
                  </>
                ) : null}
              </p>
            )}
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
            QR for this lot points to:{' '}
            <span className="break-all text-black/70">{qrTarget}</span>
          </p>
        </div>
      </section>
    </main>
  );
}
