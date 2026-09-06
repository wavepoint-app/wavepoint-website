import type { Metadata } from 'next';
import { LegalPage, LegalSection } from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'Privacy Policy | Wavepoint',
  description: 'How Wavepoint collects, uses, and deletes your data.',
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="August 30, 2026">
      <LegalSection title="Who we are">
        <p>
          Wavepoint is a campus navigation and social app. This policy describes the data the
          Wavepoint mobile app and this website collect, why we collect it, and how you can delete
          it. We do not sell your data and we do not use advertising or analytics SDKs. Wavepoint
          is an independent student project and is not affiliated with, endorsed by, or sponsored
          by The University of Texas at Austin.
        </p>
      </LegalSection>

      <LegalSection title="Account information">
        <p>
          When you create an account we store the email address and password you provide through
          Supabase Auth. We also store the display name and optional profile photo you choose.
          Passwords are hashed by the authentication provider; we never see them in plaintext.
        </p>
      </LegalSection>

      <LegalSection title="Location">
        <p>
          While you use the map, the app reads precise GPS in the foreground so we can show where
          you are and route you indoors. That live GPS reading is not stored on our servers.
        </p>
        <p>
          If you choose to share a location pin with friends, we store only the building (and
          optional room) you drop, and we show it only to the friends you selected. Turning off
          “Share my location” in Settings clears your pin.
        </p>
      </LegalSection>

      <LegalSection title="Motion and pedometer">
        <p>
          Indoor walking uses on-device motion and step data so the live marker can move with you.
          That sensor data stays on your device and is not uploaded.
        </p>
      </LegalSection>

      <LegalSection title="Friends, groups, calendar, and alerts">
        <p>To run the social features you opt into, we store:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Your friend connections and friend requests</li>
          <li>Groups you create or join, including names, descriptions, and optional group photos</li>
          <li>Calendar events you add</li>
          <li>Campus alerts you submit (crowds, closures, construction)</li>
        </ul>
        <p>
          Campus alerts are shown to other people nearby. If you delete your account, the alert text
          can remain as an anonymous report: the submitter field is cleared so it is no longer tied
          to you.
        </p>
      </LegalSection>

      <LegalSection title="What we do not collect">
        <p>
          We do not include third-party analytics, advertising, or crash-reporting SDKs. We do not
          track you across other apps or websites. We do not collect contacts, photos (except the
          profile or group image you explicitly pick), or background location.
        </p>
      </LegalSection>

      <LegalSection title="How we use this data">
        <p>
          We use it only to operate Wavepoint: sign you in, show friends and groups, route you
          around campus, and surface alerts. We may use reports you send about other users to
          enforce our community standards.
        </p>
      </LegalSection>

      <LegalSection title="Deleting your account">
        <p>
          In the app, open Settings and tap Delete account. That permanently deletes your
          authentication record, profile, friends, groups you solely administered, calendar events,
          and photos stored under your account in group image storage.
        </p>
        <p>
          Campus alerts you submitted stay visible as anonymous reports; your user id is removed
          from them. If you cannot open the app, email{' '}
          <a className="font-semibold text-primary" href="mailto:support@wavepoint.app">
            support@wavepoint.app
          </a>{' '}
          from the address on your account and we will delete it for you.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about this policy:{' '}
          <a className="font-semibold text-primary" href="mailto:support@wavepoint.app">
            support@wavepoint.app
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
