'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { inertiaPinTop, inertiaScrollToId, inertiaScrollToTop } from '@/components/InertiaScroll';

/**
 * Set right before navigating cross-page to a hash target. Lets the next
 * pathname-change effect apply the hash itself (after the page is already
 * pinned to the top), instead of relying on the browser/Next's own
 * hash-scroll, which lands at the raw element offset and causes a visible
 * jump-then-correct flash.
 */
let pendingHash: string | null = null;

export function scrollToWaitlist() {
  inertiaScrollToTop();
}

export function scrollToProduct() {
  inertiaScrollToId('product');
}

export function scrollToTop() {
  inertiaScrollToTop();
}

function scrollToHash() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  if (id === 'waitlist') {
    inertiaScrollToTop();
    return;
  }
  inertiaScrollToId(id);
}

function pinTop() {
  inertiaPinTop();
}

export function HashScroll() {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    pinTop();
    const frame = window.requestAnimationFrame(pinTop);
    const late = window.setTimeout(pinTop, 0);
    const later = window.setTimeout(pinTop, 50);
    window.addEventListener('pageshow', pinTop);
    window.addEventListener('load', pinTop);
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(late);
      window.clearTimeout(later);
      window.removeEventListener('pageshow', pinTop);
      window.removeEventListener('load', pinTop);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    if (pendingHash) {
      // Cross-page navigation we drove ourselves: land pinned at the top
      // first, then attach the hash with no scroll side effects, so there
      // is never a wrong-position frame to correct away from.
      const hash = pendingHash;
      pendingHash = null;
      pinTop();
      window.history.replaceState(null, '', `${pathname}#${hash}`);
      return;
    }

    if (!window.location.hash) pinTop();
    else scrollToHash();
  }, [pathname]);

  return null;
}

export function HomeLogoLink({ children, className }: { children: ReactNode; className?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    if (pathname !== '/') {
      router.push('/');
      return;
    }
    scrollToTop();
    window.history.replaceState(null, '', '/');
  }

  return (
    <Link href="/" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

/**
 * Shared click handler for any "Join waitlist" entry point. Same-page: animate
 * smoothly to the top. Cross-page: navigate first and let the pathname-change
 * effect above apply the hash once we're already pinned to the top, so there
 * is never a wrong-position frame to flash and correct away from.
 */
export function useWaitlistJump() {
  const pathname = usePathname();
  const router = useRouter();

  return function onWaitlistJump(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    if (pathname !== '/') {
      pendingHash = 'waitlist';
      router.push('/');
      return;
    }
    scrollToWaitlist();
    window.history.replaceState(null, '', '/#waitlist');
  };
}

export function WaitlistJump({ children, className }: { children: ReactNode; className?: string }) {
  const onClick = useWaitlistJump();

  return (
    <Link href="/#waitlist" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
