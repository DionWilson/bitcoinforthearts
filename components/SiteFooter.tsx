import Link from 'next/link';
import Image from 'next/image';
import { socialLinks } from '@/lib/socials';
import logoImage from '../app/asset/BITCOIN-ARTS-LOGO-Gold.png';
import SocialIconLinks from '@/components/SocialIconLinks';

export default function SiteFooter() {
  const hasSocials = socialLinks.length > 0;

  return (
    <footer className="border-t border-white/15 bg-primary text-white sm:border-border sm:bg-background sm:text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <Image
                src={logoImage}
                alt=""
                width={28}
                height={28}
                className="rounded-full border border-white/20 sm:border-border"
              />
              <div className="text-sm font-semibold uppercase tracking-wide">
                Bitcoin for the Arts
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-muted">
              A nonprofit supporting artists with Bitcoin micro-grants, workshops,
              residencies, and productions — with radical transparency.
            </p>
          </div>

          <div className={`grid grid-cols-2 gap-8 ${hasSocials ? 'sm:grid-cols-4' : 'sm:grid-cols-3'}`}>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-white/80 sm:text-muted">
                Organization
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:underline text-white/90 sm:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/grants" className="hover:underline text-white/90 sm:text-foreground">
                    Grants
                  </Link>
                </li>
                <li>
                  <Link href="/programming" className="hover:underline text-white/90 sm:text-foreground">
                    Programming
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-white/80 sm:text-muted">
                Community
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/events" className="hover:underline text-white/90 sm:text-foreground">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/stories" className="hover:underline text-white/90 sm:text-foreground">
                    Stories
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline text-white/90 sm:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-white/80 sm:text-muted">
                Legal
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/privacy-policy" className="hover:underline text-white/90 sm:text-foreground">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href="/donate" className="hover:underline text-white/90 sm:text-foreground">
                    Donate
                  </Link>
                </li>
              </ul>
            </div>

            {hasSocials ? (
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-white/80 sm:text-muted">
                  Follow
                </div>
                <div className="mt-3">
                  <SocialIconLinks variant="footer" />
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-white/80 sm:border-border sm:text-muted sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} Bitcoin for the Arts. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a
              href="mailto:hello@bitcoinforthearts.org"
              className="hover:underline text-white/90 sm:text-inherit"
            >
              hello@bitcoinforthearts.org
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

