import { existsSync } from 'fs';
import path from 'path';
import Image from 'next/image';
import { FOUNDERS, type TeamMember } from '@/lib/team';

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function photoSrc(filename?: string) {
  if (!filename) return null;
  const filePath = path.join(process.cwd(), 'public', 'team', filename);
  return existsSync(filePath) ? `/team/${filename}` : null;
}

function MemberCard({ member }: { member: TeamMember }) {
  const src = photoSrc(member.photo);

  return (
    <article className="group flex flex-col items-center rounded-card border border-line bg-white px-4 py-6 text-center shadow-[0_1px_6px_rgba(15,23,42,0.04)] transition duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-[0_12px_28px_rgba(11,97,126,0.14)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {src ? (
        <Image
          src={src}
          alt={member.name}
          width={160}
          height={160}
          unoptimized
          priority
          className="h-[104px] w-[104px] rounded-full object-cover transition duration-300 ease-out group-hover:scale-105 group-hover:ring-4 group-hover:ring-primary/15 md:h-[120px] md:w-[120px] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      ) : (
        <div
          aria-hidden
          className="flex h-[104px] w-[104px] items-center justify-center rounded-full bg-primary-soft text-[22px] font-bold tracking-[-0.4px] text-primary transition duration-300 ease-out group-hover:scale-105 group-hover:ring-4 group-hover:ring-primary/15 md:h-[120px] md:w-[120px] md:text-[24px] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        >
          {initials(member.name)}
        </div>
      )}
      <h2 className="mt-4 text-[16px] font-bold tracking-[-0.2px] text-ink-strong transition-colors duration-300 group-hover:text-primary">
        {member.name}
      </h2>
      {member.role ? (
        <p className="mt-1 text-[13.5px] font-medium text-ink-muted">{member.role}</p>
      ) : null}
    </article>
  );
}

export function TeamSection() {
  return (
    <section className="bg-surface-muted px-5 pb-20 pt-6 md:px-8 md:pb-24 md:pt-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[1.2px] text-ink-muted">Team</p>
        <h1 className="mt-2 text-[32px] font-extrabold tracking-[-1px] text-ink-strong md:text-[48px] md:tracking-[-1.4px]">
          Meet the team
        </h1>
        <p className="mt-3 max-w-xl text-[15px] font-medium leading-6 text-ink-muted md:text-[16px] md:leading-7">
          The founders building Wavepoint at Texas Convergent.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FOUNDERS.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
