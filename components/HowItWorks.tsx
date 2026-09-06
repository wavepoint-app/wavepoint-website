'use client';

import { useId, useState, type KeyboardEvent } from 'react';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/cn';

const STEPS = [
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
    body: 'Live guidance stays with you until you arrive, and flags crowds or closures along the way.',
  },
] as const;

export function HowItWorks() {
  const [index, setIndex] = useState(0);
  const baseId = useId();
  const step = STEPS[index];

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = STEPS.length - 1;
    let next = index;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = index === last ? 0 : index + 1;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = index === 0 ? last : index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    else return;

    event.preventDefault();
    setIndex(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  }

  return (
    <section id="how" className="scroll-mt-24 bg-surface-muted px-5 py-16 md:min-h-[70vh] md:px-8 md:py-24">
      <Reveal className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[1.2px] text-ink-muted">How it works</p>
        <h2 className="mt-3 text-[32px] font-extrabold tracking-[-1px] text-ink-strong md:text-[52px] md:tracking-[-1.6px]">
          Search. Walk. Arrive.
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,240px)_1fr] md:items-start md:gap-12">
          <div
            role="tablist"
            aria-label="How Wavepoint works"
            className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible"
          >
            {STEPS.map((item, i) => {
              const selected = i === index;
              return (
                <button
                  key={item.n}
                  id={`${baseId}-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setIndex(i)}
                  onKeyDown={onTabKeyDown}
                  className={cn(
                    'hover-soft shrink-0 rounded-xl px-4 py-3 text-left',
                    selected
                      ? 'bg-white text-primary shadow-[0_1px_6px_rgba(15,23,42,0.06)]'
                      : 'text-ink-subtle hover:bg-white/70 hover:text-ink-strong'
                  )}
                >
                  <span className="block text-[12px] font-bold tracking-[0.08em] text-secondary">{item.n}</span>
                  <span className="mt-1 block text-[16px] font-bold tracking-[-0.2px]">{item.title}</span>
                </button>
              );
            })}
          </div>

          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${index}`}
            className="rounded-sheet border border-line bg-white p-8 md:min-h-[240px] md:p-10"
          >
            <p className="text-[13px] font-bold tracking-[0.08em] text-secondary">{step.n}</p>
            <h3 className="mt-3 text-[28px] font-extrabold tracking-[-0.8px] text-ink-strong md:text-[36px]">
              {step.title}
            </h3>
            <p className="mt-4 max-w-xl text-[16px] font-medium leading-7 text-ink-muted">{step.body}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
