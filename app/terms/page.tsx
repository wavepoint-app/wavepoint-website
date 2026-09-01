import type { Metadata } from 'next';
import { LegalPage, LegalSection } from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'Terms of Use — Wavepoint',
  description: 'Community standards and acceptable use for Wavepoint.',
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Use" updated="August 30, 2026">
      <LegalSection title="Using Wavepoint">
        <p>
          Wavepoint is a campus navigation app with optional social features. It is not
          affiliated with, endorsed by, or sponsored by The University of Texas at Austin.
          By creating an account you agree to these terms and to our{' '}
          <a className="font-semibold text-primary" href="/privacy">
            Privacy Policy
          </a>
          . If you do not agree, do not use the app.
        </p>
      </LegalSection>

      <LegalSection title="Your account">
        <p>
          You must provide a working email address and keep your password to yourself. You are
          responsible for activity on your account. You can delete the account at any time from
          Settings, or by emailing support if you cannot sign in.
        </p>
      </LegalSection>

      <LegalSection title="Community standards">
        <p>You may not use Wavepoint to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Harass, threaten, impersonate, or bully anyone</li>
          <li>Post spam, advertising, or sexually explicit or illegal content</li>
          <li>Share someone else’s location or personal information without their consent</li>
          <li>Submit false campus alerts meant to disrupt or mislead</li>
          <li>Attempt to break, scrape, or overload the service</li>
        </ul>
        <p>
          Display names, group names and descriptions, and alert text are filtered for blocked
          language. We may reject or remove content that violates these rules.
        </p>
      </LegalSection>

      <LegalSection title="Reporting and blocking">
        <p>
          You can report a profile, group, or alert, and you can block another person so they
          cannot find you or send you friend requests. We review open reports. We may dismiss a
          report, hide the content, flag a profile, or deny a campus organization.
        </p>
      </LegalSection>

      <LegalSection title="Location and safety">
        <p>
          Live GPS is used only while the app is open, for navigation. Shared pins show a building
          (and optional room) to friends you choose — not a live trail. Wavepoint is not an
          emergency service. Call local emergency numbers if you need help.
        </p>
      </LegalSection>

      <LegalSection title="Ending access">
        <p>
          We may suspend or delete accounts that violate these terms. You may stop using Wavepoint
          and delete your account at any time. Features may change as we improve the app.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions:{' '}
          <a className="font-semibold text-primary" href="mailto:support@wavepoint.app">
            support@wavepoint.app
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
