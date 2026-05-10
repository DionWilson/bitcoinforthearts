'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
// BFTA 2026 brand bug. The nav bar is the lime brand surface, but we render
// the cream-field bug as a small "branded sticker" — same pattern as the
// newsletter card and the social icon tiles in the footer, so the chrome
// reads as a system of cream cards floating on lime.
//
// The "alt" cream-orange square (black BTA + orange "Arts") matches the
// colorway of the main lockup used on the home and about pages, so the
// chrome reads with a single voice across the site.
//
// All brand assets live in public/brand-kit/. See
// public/brand-kit/README.md for the full directory.
const NAV_LOGO_SRC = '/brand-kit/square-bugs/square-cream-orange-alt.png';

type NavItem = {
  label: string;
  href: string;
  variant?: 'default' | 'cta';
  children?: NavItem[];
};

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);

  const navItems: NavItem[] = useMemo(
    () => [
      {
        label: 'About',
        href: '/about',
        children: [
          { label: 'Reason for Formation', href: '/about/reason-for-formation' },
          { label: 'Leadership', href: '/about/leadership' },
          { label: 'Governance', href: '/about/governance' },
        ],
      },
      {
        label: 'Artists',
        href: '/artists',
        children: [
          { label: 'Stories', href: '/stories' },
          { label: 'Artist Hub', href: '/artist-hub' },
          { label: 'Why Bitcoin', href: '/artists/why-bitcoin' },
          { label: 'Share Your Story', href: '/stories/share-your-story' },
        ],
      },
      { label: 'Research', href: '/research' },
      {
        label: 'Grants',
        href: '/grants',
        children: [
          { label: 'Guidelines', href: '/grants/guidelines' },
          { label: 'FAQ', href: '/grants/faq' },
        ],
      },
      {
        label: 'Get Involved',
        href: '/get-involved',
        children: [
          { label: 'Volunteer', href: '/get-involved/volunteer' },
          { label: 'DIY Fundraising Guide', href: '/get-involved/diy-fundraising-guide' },
          { label: 'Feedback', href: '/get-involved/feedback' },
        ],
      },
      {
        label: 'Programs',
        href: '/programming',
        children: [
          { label: 'Education', href: '/education' },
          { label: 'Events', href: '/events' },
        ],
      },
      { label: 'Stories', href: '/stories' },
      {
        label: 'Donate',
        href: '/donate',
        variant: 'cta',
        children: [{ label: 'Sovereign Circle', href: '/donate/monthly' }],
      },
    ],
    [],
  );

  return (
    <header className="sticky top-0 z-50 border-b border-black/15 bg-brand-surface text-brand-surface-fg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold tracking-tight min-w-0"
          aria-label="Bitcoin for the Arts — Home"
          onClick={() => {
            setIsOpen(false);
            setOpenMobileSection(null);
          }}
        >
          <Image
            src={NAV_LOGO_SRC}
            alt=""
            width={36}
            height={36}
            priority
            className="rounded-md border border-black/10"
          />
          <span className="text-base sm:text-lg uppercase whitespace-nowrap leading-none">
            Bitcoin for the Arts
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-black/25 px-3 py-2 text-sm font-medium sm:hidden hover:bg-black/5"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => {
            setIsOpen((v) => {
              const next = !v;
              if (!next) setOpenMobileSection(null);
              return next;
            });
          }}
        >
          <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
          {isOpen ? (
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6l-12 12" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          )}
        </button>

        <div className="hidden items-center gap-2 sm:flex">
          {navItems.map((item) => {
            const isActiveBase =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href;
            const isCta = item.variant === 'cta';
            const hasChildren = Boolean(item.children?.length);
            const isChildActive = Boolean(
              item.children?.some(
                (c) => pathname === c.href || pathname.startsWith(`${c.href}/`),
              ),
            );
            const isActive = hasChildren ? isActiveBase || isChildActive : isActiveBase;

            if (!hasChildren) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    'whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium tracking-wide transition-colors uppercase',
                    isCta
                      ? 'bg-accent text-accent-fg hover:opacity-90'
                      : isActive
                        ? 'bg-black/10'
                        : 'hover:bg-black/5',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              );
            }

            const isDropdownOpen = openDesktopDropdown === item.href;

            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenDesktopDropdown(item.href)}
                onMouseLeave={() => setOpenDesktopDropdown(null)}
                onBlurCapture={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                    setOpenDesktopDropdown(null);
                  }
                }}
              >
                <Link
                  href={item.href}
                  aria-haspopup="menu"
                  aria-expanded={isDropdownOpen}
                  onFocus={() => setOpenDesktopDropdown(item.href)}
                  onClick={() => setOpenDesktopDropdown(null)}
                  className={[
                    'whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium tracking-wide transition-colors uppercase inline-flex items-center gap-1',
                    isCta
                      ? 'bg-accent text-accent-fg hover:opacity-90'
                      : isActive
                        ? 'bg-black/10'
                        : 'hover:bg-black/5',
                  ].join(' ')}
                >
                  {item.label}
                  <span className="text-[10px] opacity-80" aria-hidden="true">
                    ▾
                  </span>
                </Link>

                {/* Dropdown */}
                <div
                  className={[
                    'transition-opacity absolute left-0 top-full pt-2 z-50',
                    isDropdownOpen ? 'visible opacity-100' : 'invisible opacity-0',
                  ].join(' ')}
                >
                  <div className="min-w-52 rounded-md border border-border bg-background text-foreground shadow-lg p-1">
                    {item.children?.map((child) => {
                      const isChildActive =
                        pathname === child.href ||
                        pathname.startsWith(`${child.href}/`);

                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpenDesktopDropdown(null)}
                          className={[
                            'block rounded-md px-3 py-2 text-sm font-semibold transition-colors',
                            isChildActive ? 'bg-surface' : 'hover:bg-surface',
                          ].join(' ')}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      {isOpen ? (
        <div className="border-t border-black/10 bg-brand-surface text-brand-surface-fg sm:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-3">
            {navItems.map((item) => {
              const isCta = item.variant === 'cta';
              const hasChildren = Boolean(item.children?.length);
              const isChildActive = Boolean(
                item.children?.some(
                  (c) => pathname === c.href || pathname.startsWith(`${c.href}/`),
                ),
              );
              const isActiveBase =
                item.href === '/'
                  ? pathname === '/'
                  : hasChildren
                    ? pathname === item.href
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
              const isActive = isActiveBase || isChildActive;
              const isExpanded = openMobileSection === item.href;

              return (
                <div key={item.href} className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Link
                      href={item.href}
                      onClick={() => {
                        setIsOpen(false);
                        setOpenMobileSection(null);
                      }}
                      className={[
                        'flex-1 rounded-md px-3 py-3 text-sm font-medium tracking-wide transition-colors',
                        isCta
                          ? 'bg-accent text-accent-fg hover:opacity-90'
                          : isActive
                            ? 'bg-black/10'
                            : 'hover:bg-black/5',
                      ].join(' ')}
                    >
                      {item.label}
                    </Link>

                    {hasChildren ? (
                      <button
                        type="button"
                        className="rounded-md border border-black/15 px-3 py-3 text-sm font-medium hover:bg-black/5"
                        aria-label={isExpanded ? `Collapse ${item.label}` : `Expand ${item.label}`}
                        aria-expanded={isExpanded}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setOpenMobileSection((prev) =>
                            prev === item.href ? null : item.href,
                          );
                        }}
                      >
                        {isExpanded ? '–' : '＋'}
                      </button>
                    ) : null}
                  </div>

                  {hasChildren && isExpanded ? (
                    <div className="mt-1 ml-3 flex flex-col gap-1 border-l border-black/15 pl-3">
                      {item.children!.map((child) => {
                        const isChildActive =
                          pathname === child.href || pathname.startsWith(`${child.href}/`);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => {
                              setIsOpen(false);
                              setOpenMobileSection(null);
                            }}
                            className={[
                              'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                              isChildActive
                                ? 'bg-black/10'
                                : 'hover:bg-black/5',
                            ].join(' ')}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}

