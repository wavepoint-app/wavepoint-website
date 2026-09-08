import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { HomeLogoLink } from '@/components/HashScroll';
import { SiteNav } from '@/components/SiteNav';

const EXPLORE_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
  { href: '/support', label: 'Support' },
] as const;

const LEGAL_LINKS = [
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
] as const;

const CONTACT_LINKS = [
  { href: 'mailto:support@wavepoint.app', label: 'Email' },
  { href: 'https://www.instagram.com/wavepointnavigation', label: 'Instagram' },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 h-20 bg-canvas">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-3 px-4 md:px-8">
        <HomeLogoLink className="flex min-w-0 shrink items-center">
          <Image
            src="/logos/wavepointTop.png"
            alt="Wavepoint"
            width={220}
            height={56}
            className="h-10 w-auto md:h-14"
            quality={100}
            priority
          />
        </HomeLogoLink>
        <SiteNav />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white px-5 py-8 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-medium text-ink-subtle">
            Wavepoint · Indoor navigation for campus buildings
          </p>
          <p className="mt-1 text-xs font-medium text-ink-dim">
            Not affiliated with, endorsed by, or sponsored by The University of Texas at Austin.
          </p>
        </div>
        <div className="flex flex-wrap gap-8">
          <FooterCluster title="Explore" links={EXPLORE_LINKS} />
          <FooterCluster title="Legal" links={LEGAL_LINKS} />
          <FooterCluster title="Contact" links={CONTACT_LINKS} />
        </div>
      </div>
    </footer>
  );
}

function FooterCluster({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <nav aria-label={title}>
      <p className="text-xs font-bold uppercase tracking-[1.2px] text-ink-dim">{title}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {links.map((link) => {
          const className =
            'hover-underline text-sm font-semibold text-ink-subtle hover:text-primary';
          const external = link.href.startsWith('http') || link.href.startsWith('mailto:');

          return (
            <li key={link.href}>
              {external ? (
                <a
                  href={link.href}
                  className={className}
                  {...(link.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} className={className}>
                  {link.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
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
  updated?: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-20 pt-6 md:px-8 md:pt-10">
      <p className="text-xs font-bold uppercase tracking-[1.2px] text-ink-muted">{eyebrow}</p>
      <h1 className="mt-2 text-[32px] font-extrabold tracking-[-1px] text-ink-strong md:text-[40px]">
        {title}
      </h1>
      {updated ? (
        <p className="mt-2 text-[13.5px] font-medium text-ink-dim">Last updated {updated}</p>
      ) : null}
      <div className="legal-copy mt-10 space-y-8 text-[15px] font-medium leading-6 text-ink-muted">{children}</div>
    </main>
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
