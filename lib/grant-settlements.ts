export type SettlementRail = 'onchain' | 'lightning' | 'pending';

export type GrantSettlement = {
  id: string;
  artistName: string;
  projectTitle: string;
  amountUsd: number;
  amountBtcLabel?: string;
  awardedOn: string;
  rail: SettlementRail;
  /** On-chain txid when settled on-chain; omit for Lightning */
  txid?: string;
  /** Lightning destination note (never publish full secrets; high-level only) */
  lightningNote?: string;
  statusNote?: string;
};

export const GRANT_SETTLEMENTS: GrantSettlement[] = [
  {
    id: 'ainsley-costello-midwest-2026',
    artistName: 'Ainsley Costello',
    projectTitle: 'Midwest Bitcoin Summit · Bitcoin Arts Park',
    amountUsd: 2500,
    amountBtcLabel: '0.03 BTC',
    awardedOn: '2026-09',
    rail: 'lightning',
    lightningNote:
      'Settled September 30, 2026 over Lightning, 0.02970070 BTC, to the artist’s Lightning wallet. Strike reference 1b7a7fea-6eaf-4c16-8d0d-12a5cfdb0661. No on-chain transaction ID.',
  },
  {
    id: 'aksana-zasinets-embroidery-2026',
    artistName: 'Aksana Zasinets (5Ksana)',
    projectTitle: 'Embroidery for Freedom',
    amountUsd: 400,
    awardedOn: '2026-10',
    rail: 'onchain',
    txid: '94309cbe3ec8cb2076d8688bc75e21ab8be7f3f36ff0069790705a8d5aeac0aa',
  },
  {
    id: 'christopher-arcella-bitcoin-executor-2026',
    artistName: 'Christopher Arcella',
    projectTitle: 'The Bitcoin Executor',
    amountUsd: 1000,
    awardedOn: '2026-10',
    rail: 'pending',
    statusNote:
      'Approved. Awaiting signed agreement, tax form, and payout confirmation before settlement.',
  },
];

export function mempoolUrl(txid: string): string {
  return `https://mempool.space/tx/${txid}`;
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function railLabel(rail: SettlementRail): string {
  switch (rail) {
    case 'onchain':
      return 'On-chain Bitcoin';
    case 'lightning':
      return 'Lightning';
    case 'pending':
      return 'Pending settlement';
  }
}
