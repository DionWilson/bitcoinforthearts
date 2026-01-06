export type SocialLink = {
  key: 'x' | 'tiktok' | 'facebook' | 'nostr' | 'linkedin' | 'instagram';
  label: string;
  href: string;
};

export const socialLinks: SocialLink[] = [
  {
    key: 'x',
    label: 'X',
    href: 'https://x.com/Bitcoinfta',
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    href: 'https://www.tiktok.com/@bitcoinfta',
  },
  {
    key: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61585838829727',
  },
  {
    key: 'nostr',
    label: 'Nostr',
    href: 'https://primal.net/p/npub15rnn220qfdyhpgv9apjt38nadc0dzj8a7zpcrd2q4spq5apvvt2suswnaw',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/bitcoin-for-the-arts/',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/bitcoin_for_the_arts/',
  },
];

