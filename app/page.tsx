import Image from 'next/image';
import { AnimatedWaves } from '@/components/AnimatedWaves';
import { WaitlistForm } from '@/components/WaitlistForm';
import { WavingLogo } from '@/components/WavingLogo';

const FEATURES = [
  {
    title: 'Indoor pathfinding',
    body: 'Search a room and get a corridor-centered route on the actual floor plan — not a blue dot guessing in a hallway.',
  },
  {
    title: 'Multi-floor routes',
    body: 'Paths cross floors via elevators and stairs, with step-by-step directions and automatic floor switching.',
  },
  {
    title: 'Walk it live',
    body: 'A live marker moves with you as you walk. Simulation mode is there for demos when you are not on site.',
  },
  {
    title: 'Campus, then indoors',
    body: 'Outdoor walking directions take you to the building entrance, then Wavepoint hands you the indoor path.',
  },
  {
    title: 'Crowd-sourced alerts',
    body: 'Drop pins for crowds, construction, or closures. Nearby alerts surface when they fall on your route.',
  },
  {
    title: 'Friends & calendar',
    body: 'Share location with a group, or tap a class and navigate toward the room without leaving the app.',
  },
] as const;

export default function HomePage() {
  return (
    <div className="min-h-screen bg-canvas">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <a href="#top" className="flex items-center gap-2">
          <Image src="/logos/wavepointTop.png" alt="Wavepoint" width={140} height={36} className="h-9 w-auto" />
        </a>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-ink-body md:flex">
          <a href="#features" className="hover:text-primary">
            Features
          </a>
          <a href="#how" className="hover:text-primary">
            How it works
          </a>
          <a
            href="#waitlist"
            className="rounded-xl bg-primary px-4 py-2.5 text-white shadow-[0_4px_8px_rgba(11,97,126,0.25)]"
          >
            Join waitlist
          </a>
        </nav>
        <a
          href="#waitlist"
          className="rounded-xl bg-primary px-3.5 py-2 text-sm font-bold text-white md:hidden"
        >
          Join
        </a>
      </header>

      <main id="top">
        <section className="mx-auto flex max-w-6xl flex-col items-center px-5 pb-6 pt-4 text-center md:px-8 md:pb-2 md:pt-8">
          <WavingLogo className="mb-3.5" />
          <p className="max-w-[340px] text-[14.5px] font-medium leading-[22px] tracking-[-0.07px] text-[#6B6660] md:max-w-[420px]">
            Find friends, drop pins, and get to where you&apos;re going — all without breaking your
            stride.
          </p>
          <h1 className="mt-3.5 max-w-[340px] text-[24px] font-bold leading-[29px] tracking-[-0.72px] text-[#16140F] md:max-w-none md:text-[40px] md:leading-[1.15] md:tracking-[-1px]">
            Making navigation
            <br />
            <span className="italic text-primary md:text-[42px]">a breeze.</span>
          </h1>
          <p className="mt-5 max-w-[420px] text-[15px] font-medium leading-6 text-ink-muted">
            Indoor navigation for campus buildings. Join the waitlist and we&apos;ll tell you when
            Wavepoint lands on the App Store and Google Play.
          </p>
          <WaitlistForm className="mt-6 hidden md:block" />
        </section>

        <AnimatedWaves />

        <section id="waitlist" className="bg-primary px-5 py-10 md:px-8 md:py-12">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-lg text-center md:text-left">
              <p className="text-xs font-bold uppercase tracking-[1.2px] text-white/70">Coming soon</p>
              <h2 className="mt-2 text-[28px] font-extrabold tracking-[-0.8px] text-white md:text-[36px]">
                Be first in line at launch
              </h2>
            </div>
            <WaitlistForm variant="band" className="md:max-w-[420px]" />
          </div>
        </section>

        <section id="features" className="bg-surface-muted px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-bold uppercase tracking-[1.2px] text-ink-muted">What you get</p>
            <h2 className="mt-2 text-[32px] font-extrabold tracking-[-1px] text-ink-strong md:text-[40px]">
              Built for getting across campus
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-card border border-line bg-white p-5 shadow-[0_1px_6px_rgba(15,23,42,0.04)]"
                >
                  <h3 className="text-[17px] font-bold tracking-[-0.2px] text-ink-strong">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] font-medium leading-[22px] text-ink-muted">
                    {feature.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="bg-canvas px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-bold uppercase tracking-[1.2px] text-ink-muted">How it works</p>
            <h2 className="mt-2 text-[32px] font-extrabold tracking-[-1px] text-ink-strong md:text-[40px]">
              Search. Walk. Arrive.
            </h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  n: '01',
                  title: 'Pick a room',
                  body: 'Search a classroom, office, or building. Wavepoint knows the floor plan, not just the street address.',
                },
                {
                  n: '02',
                  title: 'Follow the path',
                  body: 'Indoor routing draws a path down real corridors, including stairs and elevators when you change floors.',
                },
                {
                  n: '03',
                  title: 'Get there',
                  body: 'Live guidance stays with you until you arrive — and flags crowds or closures along the way.',
                },
              ].map((step) => (
                <li key={step.n} className="rounded-sheet border border-line bg-white p-6">
                  <span className="text-[13px] font-bold tracking-[0.08em] text-secondary">{step.n}</span>
                  <h3 className="mt-3 text-[20px] font-bold tracking-[-0.4px] text-ink-strong">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] font-medium leading-[22px] text-ink-muted">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-white px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm font-medium text-ink-subtle">
            Wavepoint · Indoor navigation for campus buildings
          </p>
          <p className="text-sm font-medium text-ink-dim">Built at Texas Convergent</p>
        </div>
      </footer>
    </div>
  );
}
