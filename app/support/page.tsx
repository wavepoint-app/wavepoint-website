import type { Metadata } from 'next';
import { LegalPage, LegalSection } from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'Support | Wavepoint',
  description: 'Contact Wavepoint support and request account deletion.',
};

export default function SupportPage() {
  return (
    <LegalPage eyebrow="Help" title="Support" updated="August 30, 2026">
      <LegalSection title="Reach us">
        <p>
          Email{' '}
          <a className="font-semibold text-primary" href="mailto:support@wavepoint.app">
            support@wavepoint.app
          </a>
          . We read every message and aim to reply as soon as possible.
        </p>
      </LegalSection>

      <LegalSection title="Delete your account">
        <p>
          If you can open the app: go to Settings and tap Delete account. That permanently removes
          your login, profile, friends, groups you solely administered, calendar events, and photos
          stored for your account.
        </p>
        <p>
          If you cannot sign in, email us from the address on the account and ask us to delete it:
        </p>
        <p>
          <a
            className="hover-lift inline-flex rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_4px_8px_rgba(11,97,126,0.25)]"
            href="mailto:support@wavepoint.app?subject=Please%20delete%20my%20Wavepoint%20account"
          >
            Request deletion by email
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Report a problem">
        <p>
          In the app, use Report on a profile, group, or campus alert. For something that is not
          in the app, email the same support address and include as much detail as you can.
        </p>
      </LegalSection>

      <LegalSection title="Policies">
        <p>
          <a className="font-semibold text-primary" href="/privacy">
            Privacy Policy
          </a>
          {' · '}
          <a className="font-semibold text-primary" href="/terms">
            Terms of Use
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
