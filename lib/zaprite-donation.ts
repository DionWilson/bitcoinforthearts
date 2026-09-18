/**
 * Public one-time donation checkout (Zaprite).
 * Stripe = card · Strike = Bitcoin / Lightning.
 * BTCPay remains parked until Liquid/Boltz recovery.
 *
 * Fixed-amount links open a priced Zaprite checkout.
 * The open link lets the donor choose any amount.
 */

export const ZAPRITE_DONATION_LINK_DEFAULT =
  'https://pay.zaprite.com/pl_BFbJ9QnTfB';

/** Suggested one-time gift amounts (USD) used on /donate and the site popup. */
export const ZAPRITE_FIXED_DONATION_AMOUNTS = [11, 21, 51, 101] as const;

export type ZapriteFixedDonationAmount = (typeof ZAPRITE_FIXED_DONATION_AMOUNTS)[number];

const ZAPRITE_FIXED_DONATION_LINK_DEFAULTS: Record<ZapriteFixedDonationAmount, string> = {
  11: 'https://pay.zaprite.com/pl_dczvXAD1fW',
  21: 'https://pay.zaprite.com/pl_QsaWvGK9AU',
  51: 'https://pay.zaprite.com/pl_gWxjauIFhA',
  101: 'https://pay.zaprite.com/pl_qgkfL8Gx0g',
};

const FIXED_ENV_KEYS: Record<ZapriteFixedDonationAmount, string> = {
  11: 'NEXT_PUBLIC_ZAPRITE_DONATION_LINK_11',
  21: 'NEXT_PUBLIC_ZAPRITE_DONATION_LINK_21',
  51: 'NEXT_PUBLIC_ZAPRITE_DONATION_LINK_51',
  101: 'NEXT_PUBLIC_ZAPRITE_DONATION_LINK_101',
};

function isHttpsUrl(value: string | undefined): value is string {
  return Boolean(value && /^https:\/\//i.test(value.trim()));
}

export function getZapriteDonationLink(): string {
  const fromEnv = process.env.NEXT_PUBLIC_ZAPRITE_DONATION_LINK?.trim();
  if (isHttpsUrl(fromEnv)) return fromEnv.trim();
  return ZAPRITE_DONATION_LINK_DEFAULT;
}

export function getZapriteFixedDonationLink(amount: ZapriteFixedDonationAmount): string {
  const envKey = FIXED_ENV_KEYS[amount];
  const fromEnv = process.env[envKey]?.trim();
  if (isHttpsUrl(fromEnv)) return fromEnv.trim();
  return ZAPRITE_FIXED_DONATION_LINK_DEFAULTS[amount];
}

export function getZapriteFixedDonationOptions(): Array<{
  amount: ZapriteFixedDonationAmount;
  href: string;
  label: string;
}> {
  return ZAPRITE_FIXED_DONATION_AMOUNTS.map((amount) => ({
    amount,
    href: getZapriteFixedDonationLink(amount),
    label: `$${amount}`,
  }));
}
