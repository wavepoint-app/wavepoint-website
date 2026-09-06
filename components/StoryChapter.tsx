import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/cn';

type Point = {
  title: string;
  body: string;
};

export function StoryChapter({
  eyebrow,
  title,
  titleLine2,
  points,
  inverted = false,
  muted = false,
}: {
  eyebrow: string;
  title: string;
  titleLine2?: string;
  points: readonly Point[];
  inverted?: boolean;
  muted?: boolean;
}) {
  return (
    <section
      className={cn(
        'px-5 py-16 md:flex md:min-h-[70vh] md:items-center md:px-8 md:py-24',
        inverted ? 'bg-primary text-white' : muted ? 'bg-surface-muted text-ink-strong' : 'bg-canvas text-ink-strong'
      )}
    >
      <Reveal className="mx-auto w-full max-w-6xl">
        <p
          className={cn(
            'text-xs font-bold uppercase tracking-[1.2px]',
            inverted ? 'text-white/70' : 'text-ink-muted'
          )}
        >
          {eyebrow}
        </p>
        <h2 className="mt-3 max-w-3xl text-[32px] font-extrabold leading-[1.1] tracking-[-1px] md:text-[52px] md:tracking-[-1.6px]">
          {title}
          {titleLine2 ? (
            <>
              <br />
              {titleLine2}
            </>
          ) : null}
        </h2>
        <ul className="mt-10 grid gap-8 md:grid-cols-2">
          {points.map((point) => (
            <li key={point.title} className="max-w-lg">
              <h3 className="text-[20px] font-bold tracking-[-0.4px]">{point.title}</h3>
              <p
                className={cn(
                  'mt-2 text-[15px] font-medium leading-6',
                  inverted ? 'text-white/80' : 'text-ink-muted'
                )}
              >
                {point.body}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
