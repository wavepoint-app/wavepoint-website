import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function PhoneFrame({
  children,
  className,
  compact = false,
}: {
  children: ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full overflow-hidden rounded-[40px] border-[9px] border-[#111] bg-[#111] shadow-[0_24px_60px_rgba(15,23,42,0.22)]',
        compact ? 'max-w-[280px]' : 'max-w-[320px]',
        className
      )}
    >
      <div className="pointer-events-none absolute left-1/2 top-2.5 z-20 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-[#111]" />
      <div
        className={cn(
          'relative overflow-hidden rounded-[31px] bg-[#F3F1EC]',
          compact ? 'aspect-[9/16] max-h-[520px]' : 'aspect-[9/17] max-h-[640px]'
        )}
      >
        {children}
      </div>
    </div>
  );
}
