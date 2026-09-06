import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SiteFooter, SiteHeader } from '@/components/SiteChrome';
import { HashScroll } from '@/components/HashScroll';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wavepoint: Indoor navigation, made a breeze',
  description:
    'Search for a room, get step-by-step directions, and walk it live. Wavepoint is indoor navigation for campus buildings. Join the waitlist for launch.',
  applicationName: 'Wavepoint',
  appleWebApp: {
    title: 'Wavepoint',
    statusBarStyle: 'default',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
          <body className="min-h-screen bg-canvas font-sans antialiased" suppressHydrationWarning>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <HashScroll />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
