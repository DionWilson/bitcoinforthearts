import { socialLinks } from '@/lib/socials';

type Variant = 'footer' | 'contact';

function Icon({
  name,
  className = 'h-5 w-5',
}: {
  name: string;
  className?: string;
}) {
  // Simple inline SVG icons (or monograms where needed).
  switch (name) {
    case 'x':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="currentColor"
            d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.6L6 22H2.9l7.3-8.4L1 2h6.3l4.4 6.1L18.9 2Zm-1.1 18h1.7L6.1 3.9H4.3L17.8 20Z"
          />
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="currentColor"
            d="M16.7 3c.4 2.2 1.7 3.9 3.7 4.9V11c-1.9.1-3.6-.5-5.1-1.6v6.8c0 3.7-3 6.8-6.8 6.8S1.7 19.9 1.7 16.2c0-3.7 3-6.8 6.8-6.8.4 0 .8 0 1.2.1v3.4c-.4-.1-.8-.2-1.2-.2-1.8 0-3.2 1.5-3.2 3.2 0 1.8 1.5 3.2 3.2 3.2 1.9 0 3.3-1.6 3.3-3.6V3h3.7Z"
          />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="currentColor"
            d="M13.5 22v-8h2.7l.5-3h-3.2V9.1c0-.9.3-1.6 1.7-1.6h1.6V4.9c-.8-.1-1.8-.2-3-.2-2.9 0-4.8 1.8-4.8 5v1.3H6v3h2.4v8h5.1Z"
          />
        </svg>
      );
    case 'nostr':
      // Nostr icon (uploaded ostrich), rendered as a mask so it inherits currentColor.
      return (
        <span
          className={`inline-block ${className}`}
          aria-hidden="true"
          style={{
            WebkitMaskImage: "url('/nostr.PNG')",
            maskImage: "url('/nostr.PNG')",
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            backgroundColor: 'currentColor',
          }}
        />
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="currentColor"
            d="M6.5 7.3A1.8 1.8 0 1 1 6.5 3.7a1.8 1.8 0 0 1 0 3.6ZM4.8 20.3h3.4V9H4.8v11.3ZM9.9 9h3.3v1.6h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 5.9v5.7h-3.4v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7v5.1H9.9V9Z"
          />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="currentColor"
            d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5ZM18 6.8a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function SocialIconLinks({ variant }: { variant: Variant }) {
  const baseClass =
    variant === 'footer'
      ? 'text-white/90 hover:text-white sm:text-foreground sm:hover:text-foreground'
      : 'text-foreground hover:text-foreground';

  const buttonClass =
    variant === 'footer'
      ? 'inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 bg-white/10 hover:bg-white/15 sm:border-border sm:bg-background sm:hover:bg-surface'
      : 'inline-flex min-h-12 min-w-12 items-center justify-center rounded-md border border-border bg-background hover:bg-surface';

  return (
    <div className="flex flex-wrap gap-2">
      {socialLinks.map((s) => (
        <a
          key={s.key}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClass} ${baseClass}`}
          aria-label={s.label}
          title={s.label}
        >
          <Icon name={s.key} />
        </a>
      ))}
    </div>
  );
}

