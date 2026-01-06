'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import logoImage from '../app/asset/BITCOIN-ARTS-LOGO-Gold.png';

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

  const navItems: NavItem[] = useMemo(
    () => [
      { label: 'Home', href: '/' },
      {
        label: 'About',
        href: '/about',
        children: [
          { label: 'Get Involved', href: '/get-involved' },
          { label: 'Leadership', href: '/about/leadership' },
        ],
      },
      {
        label: 'Grants',
        href: '/grants',
        children: [
          { label: 'Why Bitcoin', href: '/artists/why-bitcoin' },
          { label: 'Research', href: '/artists/research' },
          { label: 'FAQ', href: '/grants/faq' },
        ],
      },
      {
        label: 'Artists',
        href: '/artists',
        children: [
        ],
      },
      { label: 'Programming', href: '/programming' },
      { label: 'Events', href: '/events' },
      { label: 'Stories', href: '/stories' },
      { label: 'Contact', href: '/contact' },
      { label: 'Donate', href: '/donate', variant: 'cta' },
    ],
    [],
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-primary text-white">
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
          src={logoImage}
          alt=""
          width={36}
          height={36}
          priority
          className="rounded-full border border-white/20"
        />
          <span className="text-base sm:text-lg uppercase whitespace-nowrap leading-none">
            Bitcoin for the Arts
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-white/25 px-3 py-2 text-sm font-medium sm:hidden hover:bg-white/10"
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
          Menu
        </button>

        <div className="hidden items-center gap-2 sm:flex">
          {navItems.map((item) => {
            const isActiveBase =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
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
                      ? 'bg-accent text-white hover:opacity-90'
                      : isActive
                        ? 'bg-white/15 text-white'
                        : 'text-white/90 hover:bg-white/10 hover:text-white',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={[
                    'whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium tracking-wide transition-colors uppercase inline-flex items-center gap-1',
                    isActive ? 'bg-white/15 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white',
                  ].join(' ')}
                >
                  {item.label}
                  <span className="text-[10px] opacity-80" aria-hidden="true">
                    ▾
                  </span>
                </Link>

                {/* Dropdown */}
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity absolute left-0 top-full pt-2 z-50">
                  <div className="min-w-52 rounded-md border border-border bg-background text-foreground shadow-lg p-1">
                    {item.children?.map((child) => {
                      const isChildActive =
                        pathname === child.href ||
                        pathname.startsWith(`${child.href}/`);

                      return (
                        <Link
                          key={child.href}
                          href={child.href}
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
        <div className="border-t border-white/15 bg-primary sm:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-3">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              const isCta = item.variant === 'cta';
              const hasChildren = Boolean(item.children?.length);
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
                          ? 'bg-accent text-white hover:opacity-90'
                          : isActive
                            ? 'bg-white/15 text-white'
                            : 'text-white/90 hover:bg-white/10 hover:text-white',
                      ].join(' ')}
                    >
                      {item.label}
                    </Link>

                    {hasChildren ? (
                      <button
                        type="button"
                        className="rounded-md border border-white/20 px-3 py-3 text-sm font-medium text-white/90 hover:bg-white/10"
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
                    <div className="mt-1 ml-3 flex flex-col gap-1 border-l border-white/15 pl-3">
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
                                ? 'bg-white/15 text-white'
                                : 'text-white/85 hover:bg-white/10 hover:text-white',
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

