'use client';

import { type FormEvent } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  variant?: 'hero' | 'band';
  className?: string;
};

export function WaitlistForm({ variant = 'hero', className }: Props) {
  const onBand = variant === 'band';

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmit} className={cn('w-full max-w-[420px]', className)}>
      <label htmlFor={`waitlist-email-${variant}`} className="sr-only">
        Email
      </label>
      <div
        className={cn(
          'flex flex-col gap-2 sm:flex-row sm:items-stretch',
          onBand ? 'sm:gap-2' : 'sm:gap-2.5'
        )}
      >
        <input
          id={`waitlist-email-${variant}`}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@email.com"
          className={cn(
            'min-h-[52px] flex-1 rounded-[16px] border-[1.5px] px-4 text-[15px] font-medium tracking-[-0.07px] outline-none transition',
            'placeholder:text-ink-faint focus:border-primary',
            onBand
              ? 'border-white/25 bg-white text-ink-strong'
              : 'border-[#E9E5DC] bg-white text-ink-strong'
          )}
        />
        <button
          type="submit"
          className={cn(
            'inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[16px] px-[18px] text-[15px] font-bold tracking-[-0.15px] transition active:opacity-85',
            onBand
              ? 'bg-white text-primary shadow-[0_6px_20px_rgba(0,0,0,0.18)]'
              : 'bg-primary text-white shadow-[0_4px_8px_rgba(11,97,126,0.25)]'
          )}
        >
          Join the waitlist
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
