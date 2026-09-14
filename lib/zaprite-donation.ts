/**
 * Public one-time donation checkout (Zaprite).
 * Stripe = card · Strike = Bitcoin / Lightning.
 * BTCPay remains parked until Liquid/Boltz recovery.
 */
export const ZAPRITE_DONATION_LINK_DEFAULT =
  'https://pay.zaprite.com/pl_BFbJ9QnTfB';

export function getZapriteDonationLink(): string {
  const fromEnv = process.env.NEXT_PUBLIC_ZAPRITE_DONATION_LINK?.trim();
  if (fromEnv && /^https:\/\//i.test(fromEnv)) return fromEnv;
  return ZAPRITE_DONATION_LINK_DEFAULT;
}
