import BitcoinQr from '@/components/BitcoinQr';
import CopyButton from '@/components/CopyButton';

export default function BitcoinDonationCard({ address }: { address: string }) {
  const isPlaceholder = address.startsWith('bc1qarts');

  return (
    <div className="rounded-2xl border border-border bg-background p-6">
      <div className="text-sm font-semibold tracking-tight">Donate Bitcoin</div>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Send BTC to the address below. Use the QR code for mobile wallets.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-12 sm:items-start">
        <div className="sm:col-span-7">
          <div className="rounded-lg border border-border bg-surface p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">
              Address
            </div>
            <div className="mt-2 break-all font-mono text-sm">{address}</div>
            {isPlaceholder ? (
              <div className="mt-3 text-xs text-muted">
                Set <span className="font-mono">NEXT_PUBLIC_BTC_DONATION_ADDRESS</span>{' '}
                to your real donation address.
              </div>
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <CopyButton text={address} />
            <a
              href={`bitcoin:${address}`}
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-surface"
            >
              Open in wallet
            </a>
          </div>

          <div className="mt-6 text-xs leading-relaxed text-muted">
            Tip: always verify the address before sending. Bitcoin transactions are
            irreversible.
          </div>
        </div>

        <div className="sm:col-span-5 sm:flex sm:justify-end">
          <BitcoinQr text={address} size={208} />
        </div>
      </div>
    </div>
  );
}

