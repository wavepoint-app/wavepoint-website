import { AnimatedWaves } from '@/components/AnimatedWaves';
import { WaitlistJump } from '@/components/HashScroll';
import { HowItWorks } from '@/components/HowItWorks';
import { StoryChapter } from '@/components/StoryChapter';
import { WaitlistForm } from '@/components/WaitlistForm';
import { WavingLogo } from '@/components/WavingLogo';

export default function HomePage() {
  return (
    <main>
      <section id="waitlist" className="hero-screen scroll-mt-[80px]">
        <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col items-center justify-center px-5 py-3 text-center md:px-8">
          <div className="relative mb-2 h-[132px] w-[218px] shrink-0 md:mb-3 md:h-[238px] md:w-[364px]">
            <div className="absolute left-0 top-0 origin-top-left scale-[0.6] md:scale-100">
              <WavingLogo />
            </div>
          </div>
          <h1 className="max-w-[320px] text-[26px] font-bold leading-[1.12] tracking-[-0.8px] text-[#16140F] md:max-w-none md:text-[44px] md:tracking-[-1.4px] lg:text-[35px]">
            Making navigation
            <br />
            <span className="italic text-primary">a breeze.</span>
          </h1>
          <p className="mt-2 max-w-[420px] text-[14px] font-medium leading-5 text-ink-muted md:mt-3 md:text-[16px] md:leading-6">
            Indoor navigation for campus buildings. Find friends, drop pins, and get where you are
            going without breaking your stride.
          </p>
          <WaitlistForm className="mx-auto mt-3 w-full md:mt-5" />
          <a
            href="#how"
            className="hover-underline hover-arrow relative z-10 mt-3 mb-1 text-sm font-semibold text-primary md:mt-3"
          >
            See how it works
            <span className="hover-arrow-icon" aria-hidden>
              →
            </span>
          </a>
        </div>
        <AnimatedWaves />
      </section>

      <StoryChapter
        id="product"
        eyebrow="Inside the building"
        title="Routes you can see,"
        titleLine2="not just a dot."
        points={[
          {
            title: 'Indoor pathfinding',
            body: 'Search a room and get an optimized route while being able to see the actual building map.',
          },
          {
            title: 'Campus, then indoors',
            body: 'Outdoor walking directions take you to the building entrance, then Wavepoint hands you the indoor path.',
          },
        ]}
      />

      <StoryChapter
        inverted
        eyebrow="Walk it live"
        title="Stay on the path"
        titleLine2="floor to floor."
        points={[
          {
            title: 'Multi-floor routes',
            body: 'Paths cross floors via elevators and stairs, with step-by-step directions and floor switching.',
          },
          {
            title: 'Walk it live',
            body: 'A live marker moves with you as you walk. Simulation mode is there for demos when you are not on site.',
          },
        ]}
      />

      <StoryChapter
        eyebrow="People and the path"
        title="Friends, classes,"
        titleLine2="and what is in the way."
        points={[
          {
            title: 'Crowd-sourced alerts',
            body: 'Drop pins for crowds, construction, or closures. Nearby alerts surface when they fall on your route.',
          },
          {
            title: 'Friends and calendar',
            body: 'Share location with a group, or tap a class and navigate toward the room without leaving the app.',
          },
        ]}
      />

      <HowItWorks />

      <section className="bg-canvas px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl text-center md:text-left">
          <p className="text-xs font-bold uppercase tracking-[1.2px] text-ink-muted">Coming soon</p>
          <h2 className="mt-3 text-[32px] font-extrabold tracking-[-1px] text-ink-strong md:text-[52px] md:tracking-[-1.6px]">
            Be first in line at launch.
          </h2>
          <p className="mt-4 max-w-xl text-[16px] font-medium leading-7 text-ink-muted">
            Join the waitlist and we will tell you when Wavepoint lands on the App Store and Google
            Play.
          </p>
          <WaitlistJump
            className="hover-lift mt-8 inline-flex min-h-[52px] items-center justify-center rounded-[16px] bg-primary px-5 text-[15px] font-bold text-white shadow-[0_4px_8px_rgba(11,97,126,0.25)]"
          >
            Join the waitlist
          </WaitlistJump>
        </div>
      </section>
    </main>
  );
}
