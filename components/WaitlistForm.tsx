'use client';

import { useState, type FormEvent } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  className?: string;
};

type Status = 'idle' | 'loading' | 'ok' | 'already' | 'error';

export function WaitlistForm({ className }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = data.get('email');
    const company = data.get('company');

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company }),
      });
      const payload = (await res.json()) as { error?: string; alreadyJoined?: boolean };

      if (!res.ok) {
        setStatus('error');
        setMessage(payload.error ?? 'Could not join right now. Try again.');
        return;
      }

      if (payload.alreadyJoined) {
        setStatus('already');
        setMessage("You're already on the list.");
        return;
      }

      setStatus('ok');
      setMessage("You're on the list.");
      form.reset();
    } catch {
      setStatus('error');
      setMessage('Could not join right now. Try again.');
    }
  }

  const busy = status === 'loading';

  return (
    <form onSubmit={onSubmit} className={cn('relative w-full max-w-[420px]', className)}>
      <label htmlFor="waitlist-email" className="sr-only">
        Email
      </label>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute left-[-10000px] h-px w-px overflow-hidden opacity-0"
      />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-2.5">
        <div className="email-outline relative min-h-[52px] flex-1">
          <input
            id="waitlist-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            disabled={busy}
            className="relative z-10 min-h-[52px] w-full rounded-[16px] border-[1.5px] border-[#E9E5DC] bg-white px-4 text-[15px] font-medium tracking-[-0.07px] text-ink-strong outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-ink-faint focus:border-transparent disabled:opacity-70"
          />
          <svg
            className="email-outline-stroke pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            aria-hidden
          >
            <rect
              x="1"
              y="1"
              rx="16"
              ry="16"
              fill="none"
              stroke="#0B617E"
              strokeWidth="2"
              pathLength="1"
              vectorEffect="non-scaling-stroke"
              className="h-[calc(100%-2px)] w-[calc(100%-2px)]"
            />
          </svg>
        </div>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[16px] bg-primary px-[18px] text-[15px] font-bold tracking-[-0.15px] text-white shadow-[0_4px_8px_rgba(11,97,126,0.25)] transition active:opacity-85 disabled:opacity-70 hover-lift"
        >
          {busy ? 'Joining…' : 'Join the waitlist'}
          {!busy && (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
      {message ? (
        <p
          role="status"
          aria-live="polite"
          className={cn(
            'mt-2.5 text-left text-[13.5px] font-medium',
            status === 'error' ? 'text-red-600' : 'text-ink-muted'
          )}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
