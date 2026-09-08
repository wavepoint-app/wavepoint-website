'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { scrollToProduct, useWaitlistJump } from '@/components/HashScroll';
import { cn } from '@/lib/cn';

const NAV_LINKS = [
  { href: '/#product', label: 'Product' },
  { href: '/about', label: 'About' },
] as const;

function isActive(pathname: string, href: string) {
  if (href === '/' || href.startsWith('/#')) return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

const ctaClass =
  'hover-lift inline-flex shrink-0 items-center justify-center rounded-xl bg-primary px-3 py-2 text-[13px] font-bold text-white shadow-[0_4px_8px_rgba(11,97,126,0.25)] md:px-3.5 md:text-sm';

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onWaitlistJump = useWaitlistJump();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="flex items-center gap-2 md:gap-7">
      <nav className="hidden items-center gap-7 text-sm font-semibold text-ink-body md:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'hover-underline hover:text-primary',
              isActive(pathname, link.href) && 'text-primary'
            )}
            aria-current={isActive(pathname, link.href) ? 'page' : undefined}
            onClick={(event) => {
              if (link.href !== '/#product' || pathname !== '/') return;
              event.preventDefault();
              scrollToProduct();
              window.history.replaceState(null, '', '/#product');
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/#waitlist"
        className={ctaClass}
        onClick={(event) => {
          setOpen(false);
          onWaitlistJump(event);
        }}
      >
        Join waitlist
      </Link>

      <button
        type="button"
        className="hover-soft inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink-body hover:bg-white md:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-20 z-40 bg-canvas px-5 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-1 text-lg font-semibold text-ink-body">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  setOpen(false);
                  if (link.href !== '/#product' || pathname !== '/') return;
                  event.preventDefault();
                  scrollToProduct();
                  window.history.replaceState(null, '', '/#product');
                }}
                className={cn(
                  'hover-soft rounded-xl px-3 py-3 hover:bg-white hover:text-primary',
                  isActive(pathname, link.href) && 'bg-white text-primary'
                )}
                aria-current={isActive(pathname, link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
