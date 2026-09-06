import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About | Wavepoint',
  description:
    'Wavepoint is indoor navigation for campus buildings. An independent student project, not affiliated with UT Austin.',
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-20 pt-6 md:px-8 md:pt-10">
      <p className="text-xs font-bold uppercase tracking-[1.2px] text-ink-muted">About</p>
      <h1 className="mt-2 text-[32px] font-extrabold tracking-[-1px] text-ink-strong md:text-[48px] md:tracking-[-1.4px]">
        Indoor navigation for campus buildings
      </h1>
      <div className="legal-copy mt-8 space-y-5 text-[16px] font-medium leading-7 text-ink-muted">
        <p>
          Wavepoint helps you find a room on the real floor plan, walk the path live, and see what
          is in the way. It is built for getting across campus without guessing in a hallway.
        </p>
        <p>
          We are an independent student project. Wavepoint is not affiliated with, endorsed by, or
          sponsored by The University of Texas at Austin.
        </p>
        <p>
          See the{' '}
          <Link href="/#product" className="font-semibold text-primary">
            product story
          </Link>{' '}
          for how routing, live walking, and alerts work, or{' '}
          <Link href="/#waitlist" className="font-semibold text-primary">
            join the waitlist
          </Link>{' '}
          for launch.
        </p>
      </div>
    </main>
  );
}
