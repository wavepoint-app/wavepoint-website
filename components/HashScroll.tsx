'use client';

import { usePathname } from 'next/navigation';
import { useEffect, type MouseEvent, type ReactNode } from 'react';

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

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const frame = window.requestAnimationFrame(scrollToHash);
    window.addEventListener('hashchange', scrollToHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', scrollToHash);
    };
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
