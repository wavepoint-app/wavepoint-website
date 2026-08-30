import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

const FOOTER_LINKS = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/support', label: 'Support' },
] as const;

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logos/wavepointTop.png" alt="Wavepoint" width={140} height={36} className="h-9 w-auto" />
      </Link>
      <nav className="flex items-center gap-5 text-sm font-semibold text-ink-body">
        <Link href="/#features" className="hidden hover:text-primary md:inline">
          Features
        </Link>
        <Link href="/#waitlist" className="rounded-xl bg-primary px-4 py-2.5 text-white shadow-[0_4px_8px_rgba(11,97,126,0.25)]">
          Join waitlist
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white px-5 py-8 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm font-medium text-ink-subtle">
          Wavepoint · Indoor navigation for campus buildings
        </p>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-ink-subtle">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 pb-20 pt-6 md:px-8 md:pt-10">
        <p className="text-xs font-bold uppercase tracking-[1.2px] text-ink-muted">{eyebrow}</p>
        <h1 className="mt-2 text-[32px] font-extrabold tracking-[-1px] text-ink-strong md:text-[40px]">
          {title}
        </h1>
        <p className="mt-2 text-[13.5px] font-medium text-ink-dim">Last updated {updated}</p>
        <div className="mt-10 space-y-8 text-[15px] font-medium leading-6 text-ink-muted">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-[20px] font-bold tracking-[-0.4px] text-ink-strong">{title}</h2>
      <div className="mt-2 space-y-3">{children}</div>
    </section>
  );
}
