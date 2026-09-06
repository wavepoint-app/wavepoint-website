import type { Metadata } from 'next';
import { LegalPage, LegalSection } from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'Careers | Wavepoint',
  description: 'Open roles at Wavepoint. We are not hiring right now.',
};

export default function CareersPage() {
  return (
    <LegalPage eyebrow="Team" title="Careers">
      <LegalSection title="Open roles">
        <p>
          We do not currently have any open roles. Check back later for openings.
        </p>
      </LegalSection>

      <LegalSection title="Say hello">
        <p>
          Feel free to email{' '}
          <a className="font-semibold text-primary" href="mailto:support@wavepoint.app">
            support@wavepoint.app
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
