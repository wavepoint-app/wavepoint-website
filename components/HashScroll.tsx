'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';

export function scrollToWaitlist() {
  document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function scrollToProduct() {
  document.getElementById('product')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function scrollToHash() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function pinTop() {
  window.scrollTo(0, 0);
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

    if (!window.location.hash) pinTop();
    else scrollToHash();
  }, [pathname]);

  return null;
}

export function WaitlistJump({ children, className }: { children: ReactNode; className?: string }) {
  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    scrollToWaitlist();
    window.history.replaceState(null, '', '/#waitlist');
  }

  return (
    <a href="/#waitlist" className={className} onClick={onClick}>
      {children}
    </a>
  );
}
