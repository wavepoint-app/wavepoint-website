import type { Metadata } from 'next';
import Link from 'next/link';
import { DemoWalkthrough } from '@/components/demo/DemoWalkthrough';

export const metadata: Metadata = {
  title: 'Try Wavepoint | Interactive demo',
  description:
    'Try a clickable demo of Wavepoint campus and indoor routing — search a room, start directions, and follow the path.',
};

export default function DemoPage() {
  return (
    <main className="px-5 pb-20 pt-6 md:px-8 md:pt-10">
      <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] md:gap-14">
        <div className="md:pt-4">
          <p className="text-xs font-bold uppercase tracking-[1.2px] text-ink-muted">Interactive demo</p>
          <h1 className="mt-2 text-[32px] font-extrabold tracking-[-1px] text-ink-strong md:text-[48px] md:tracking-[-1.4px]">
            Campus to corridor,
            <br />
            tap by tap.
          </h1>
          <p className="mt-4 max-w-lg text-[16px] font-medium leading-7 text-ink-muted">
            A lightweight preview of Wavepoint&apos;s map and indoor routing — styled like the app,
            not connected to live GPS. Start on campus, enter GDC, then route to a room.
          </p>
          <ol className="mt-8 space-y-4 text-[15px] font-medium text-ink-body">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[12px] font-bold text-primary">
                1
              </span>
              <span>On campus, tap <strong className="font-bold text-ink-strong">Enter building</strong> on GDC.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[12px] font-bold text-primary">
                2
              </span>
              <span>Filter rooms, then tap one on the floor plan.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[12px] font-bold text-primary">
                3
              </span>
              <span>
                Hit <strong className="font-bold text-ink-strong">Start directions</strong> to see the
                indoor path.
              </span>
            </li>
          </ol>
          <p className="mt-8 text-[14px] font-medium text-ink-subtle">
            Want launch updates?{' '}
            <Link href="/#waitlist" className="font-semibold text-primary">
              Join the waitlist
            </Link>
            .
          </p>
        </div>

        <DemoWalkthrough />
      </div>
    </main>
  );
}
