'use client';

import { useMemo, useState } from 'react';

const FEATURED_AMOUNT = 21;

export default function BtcPayDonateWidget() {
  const [amountInput, setAmountInput] = useState<string>(String(FEATURED_AMOUNT));
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOptional, setShowOptional] = useState(false);

  const suggested = useMemo(() => [11, FEATURED_AMOUNT, 51, 101], []);

  const createInvoice = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const parsedAmount = Number(amountInput);
      if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
        throw new Error('Enter a valid amount to donate.');
      }
      const emailValue = email.trim();
      if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        throw new Error('Enter a valid email (or leave it blank).');
      }
      const currency = 'USD';
      const res = await fetch('/api/btcpay/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parsedAmount,
          currency,
          redirectUrl: `${window.location.origin}/donate`,
          metadata: {
            ...(message ? { message } : null),
            ...(emailValue ? { buyerEmail: emailValue } : null),
            ...(name.trim() ? { buyerName: name.trim() } : null),
          },
        }),
      });

      const data = (await res.json()) as
        | { checkoutLink: string }
        | { error: string; details?: string };

      if (!res.ok) {
        const details =
          'details' in data && data.details ? `\n\n${data.details}` : '';
        throw new Error(('error' in data ? data.error : 'Error') + details);
      }

      if (!('checkoutLink' in data) || !data.checkoutLink) {
        throw new Error('BTCPay did not return a checkout link.');
      }

      window.location.href = data.checkoutLink;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to start checkout.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-accent/50 bg-background">
      {/* Gradient accent bar */}
      <div className="h-1.5 w-full bg-[linear-gradient(90deg,#f7931a,#ff6f00,#f7931a)]" />

      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          {/* Left: headline + amounts */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1">
              <span className="text-base" aria-hidden="true">&#x20bf;</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                Bitcoin &amp; Lightning
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              Stack sats for the arts.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              Pay directly in Bitcoin — on-chain or Lightning. No middlemen,
              no censorship, pure peer-to-peer support for artists.
            </p>

            {/* Amount grid — $21 starts selected */}
            <div className="mt-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Choose an amount (USD)
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {suggested.map((v) => {
                  const isSelected = amountInput === String(v);
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => {
                        setAmountInput(String(v));
                        setError(null);
                      }}
                      className={[
                        'relative min-h-14 rounded-xl border-2 px-4 py-3 text-center font-semibold transition-all',
                        isSelected
                          ? 'border-accent bg-accent text-accent-fg shadow-lg shadow-accent/25'
                          : 'border-border bg-background text-foreground hover:border-accent/40 hover:bg-surface',
                      ].join(' ')}
                    >
                      <span className="text-lg">${v}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3">
                <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
                  Or enter custom amount
                </label>
                <div className="relative mt-2">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted">
                    $
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={amountInput}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (raw === '') {
                        setAmountInput('');
                        setError(null);
                        return;
                      }
                      const digitsOnly = raw.replace(/[^\d]/g, '');
                      const normalized = digitsOnly.replace(/^0+(?=\d)/, '');
                      setAmountInput(normalized);
                      setError(null);
                    }}
                    onFocus={(e) => e.target.select()}
                    placeholder="Any amount"
                    className="min-h-12 w-full rounded-lg border border-border bg-background pl-7 pr-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
                  />
                </div>
              </div>

              <p className="mt-2 text-xs text-muted">
                We convert USD to BTC/Lightning at checkout via BTCPay Server.
              </p>
            </div>
          </div>

          {/* Right: form + CTA */}
          <div className="w-full lg:max-w-xs">
            <div className="rounded-xl border border-border bg-surface/60 p-5">
              {!showOptional ? (
                <button
                  type="button"
                  onClick={() => setShowOptional(true)}
                  className="w-full text-left text-xs font-semibold text-accent hover:underline"
                >
                  + Add name, email, or message (optional)
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                      placeholder="For receipt / thank-you"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
                      Name (optional)
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-muted">
                      Message (optional)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={2}
                      className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                      placeholder="Optional note"
                    />
                  </div>
                </div>
              )}
            </div>

            {error ? (
              <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 whitespace-pre-wrap">
                {error}
              </div>
            ) : null}

            <button
              type="button"
              disabled={isLoading}
              onClick={createInvoice}
              className="mt-4 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#f7931a,#ff6f00)] px-6 py-3 text-base font-bold text-white shadow-lg shadow-accent/20 transition-all hover:shadow-xl hover:shadow-accent/30 hover:brightness-110 disabled:opacity-60"
            >
              <span className="text-lg" aria-hidden="true">&#x26a1;</span>
              {isLoading ? 'Starting checkout…' : 'Donate with Bitcoin'}
            </button>

            <p className="mt-3 text-center text-xs text-muted">
              Secure checkout via BTCPay Server.
              <br />
              On-chain + Lightning accepted.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
