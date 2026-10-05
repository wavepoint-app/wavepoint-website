import type { Metadata } from 'next';
import { TeamSection } from '@/components/TeamSection';

export const metadata: Metadata = {
  title: 'Meet the team | Wavepoint',
  description:
    'Meet the founders building Wavepoint — indoor navigation for campus buildings — at Texas Convergent.',
};

export default function TeamPage() {
  return (
    <main>
      <TeamSection />
    </main>
  );
}
