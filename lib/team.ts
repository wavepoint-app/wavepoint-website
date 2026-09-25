export type TeamGroup = 'founder' | 'lead';

export type TeamMember = {
  name: string;
  role: string;
  group: TeamGroup;
  /** Filename inside the `website-assets` bucket's `team/` folder, e.g. `jenna-lee.jpg`. */
  photo?: string;
};

/**
 * One entry per person. Upload the matching headshot to Supabase Storage at
 * `website-assets/team/<photo>` — do not add a separate card in the page.
 */
export const TEAM: TeamMember[] = [
  { name: 'Amlan Abhidarshi', role: 'Technical', group: 'founder', photo: 'amlan_headshot.jpeg' },
  { name: 'Anushka Gupta', role: 'Technical', group: 'founder', photo: 'anushka_headshot.jpeg' },
  { name: 'Dedeepya Pallapu', role: 'Technical', group: 'founder', photo: 'dedee_headshot.png' },
  { name: 'Jenna Lee', role: 'Technical', group: 'founder', photo: 'jenna_headshot.jpg' },
  { name: 'Keshav Sai Partha', role: 'Technical', group: 'founder', photo: 'keshav_headshot.png' },
  { name: 'Srikrishna Balaji', role: 'Technical', group: 'founder', photo: 'srikrishna_headshot.jpg' },
  { name: 'Danica Sorge', role: 'Product', group: 'founder', photo: 'danica_headshot.jpeg' },
  { name: 'Kavya Eswaramoorthy', role: 'Product', group: 'founder', photo: 'kavya_headshot.png' },
];

/**
 * Headshots live in the Wavepoint dev Supabase project. Kept separate from
 * `SUPABASE_URL` because the waitlist still points at the old project.
 */
const TEAM_PHOTO_BASE =
  'https://dsomqfwodtyrbloajjwr.supabase.co/storage/v1/object/public/website-assets/team';

export function teamPhotoUrl(filename?: string): string | null {
  if (!filename) return null;
  return `${TEAM_PHOTO_BASE}/${encodeURIComponent(filename)}`;
}

export const FOUNDERS = TEAM.filter((member) => member.group === 'founder');
export const LEADS = TEAM.filter((member) => member.group === 'lead');
