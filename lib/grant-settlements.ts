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
      'Settled over Lightning to the artist’s Lightning address (no on-chain transaction ID).',
  },
  {
    id: 'aksana-zasinets-embroidery-2026',
    artistName: 'Aksana Zasinets (5Ksana)',
    projectTitle: 'Embroidery for Freedom',
    amountUsd: 400,
    awardedOn: '2026-10',
    rail: 'onchain',
    // Paste txid when ready to publish
    txid: '',
    statusNote: 'On-chain settlement — transaction ID will appear here when published.',
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
