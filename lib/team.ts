export type TeamGroup = 'founder' | 'lead';

export type TeamMember = {
  name: string;
  role: string;
  group: TeamGroup;
  /** Filename inside `public/team/`, e.g. `jenna-lee.jpg`. */
  photo?: string;
};

/**
 * One entry per person. Drop the matching headshot in `public/team/`
 * using the `photo` filename — do not add a separate card in the page.
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

export const FOUNDERS = TEAM.filter((member) => member.group === 'founder');
export const LEADS = TEAM.filter((member) => member.group === 'lead');
