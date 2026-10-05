export type RoomCategory = 'classroom' | 'lab' | 'restroom' | 'office';

export type DemoRoom = {
  id: string;
  number: string;
  name: string;
  category: RoomCategory;
  floor: 1 | 2;
  x: number;
  y: number;
  w: number;
  h: number;
  etaMin: number;
  wing: string;
  path: string;
  steps: string[];
};

export const CATEGORY_PILLS: { id: RoomCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'classroom', label: 'Classrooms' },
  { id: 'lab', label: 'Labs' },
  { id: 'restroom', label: 'Restrooms' },
];

export const DEMO_ROOMS: DemoRoom[] = [
  {
    id: '1.406',
    number: '1.406',
    name: 'Lecture Hall B',
    category: 'classroom',
    floor: 1,
    x: 208,
    y: 48,
    w: 128,
    h: 108,
    etaMin: 3,
    wing: 'North wing · via walkway and Hallway 1.400',
    path: '52,228 52,188 148,188 148,128 208,128 240,100',
    steps: ['Lobby 1.800', 'Walkway', 'Hallway 1.400', 'Lecture Hall B'],
  },
  {
    id: '1.210',
    number: '1.210',
    name: 'Seminar 210',
    category: 'classroom',
    floor: 1,
    x: 36,
    y: 48,
    w: 78,
    h: 58,
    etaMin: 2,
    wing: 'West wing · via Hallway 1.200',
    path: '52,228 52,110 75,77',
    steps: ['Lobby 1.800', 'Hallway 1.200', 'Seminar 210'],
  },
  {
    id: '1.212',
    number: '1.212',
    name: 'Office',
    category: 'office',
    floor: 1,
    x: 36,
    y: 112,
    w: 48,
    h: 42,
    etaMin: 2,
    wing: 'West wing',
    path: '52,228 52,133 60,133',
    steps: ['Lobby 1.800', 'Hallway 1.200', 'Office 1.212'],
  },
  {
    id: '1.318',
    number: '1.318',
    name: 'Systems Lab',
    category: 'lab',
    floor: 1,
    x: 92,
    y: 112,
    w: 48,
    h: 42,
    etaMin: 4,
    wing: 'West wing · via Hallway 1.300',
    path: '52,228 52,160 116,133',
    steps: ['Lobby 1.800', 'Hallway 1.300', 'Systems Lab'],
  },
  {
    id: '1.050',
    number: '1.050',
    name: 'Restroom',
    category: 'restroom',
    floor: 1,
    x: 168,
    y: 208,
    w: 44,
    h: 36,
    etaMin: 1,
    wing: 'Central corridor',
    path: '52,228 120,228 190,226',
    steps: ['Lobby 1.800', 'Central corridor', 'Restroom'],
  },
  {
    id: '1.520',
    number: '1.520',
    name: 'Staff',
    category: 'office',
    floor: 1,
    x: 280,
    y: 168,
    w: 56,
    h: 40,
    etaMin: 4,
    wing: 'East wing · staff only',
    path: '52,228 52,188 300,188',
    steps: ['Lobby 1.800', 'East corridor', 'Staff 1.520'],
  },
  {
    id: '2.210',
    number: '2.210',
    name: 'Classroom 210',
    category: 'classroom',
    floor: 2,
    x: 40,
    y: 48,
    w: 90,
    h: 72,
    etaMin: 5,
    wing: 'West wing · via elevator',
    path: '52,228 52,188 160,188 160,100 85,84',
    steps: ['Lobby', 'Elevator to L2', 'Hallway 2.200', 'Classroom 210'],
  },
  {
    id: '2.822',
    number: '2.822',
    name: 'Research Lab',
    category: 'lab',
    floor: 2,
    x: 210,
    y: 48,
    w: 110,
    h: 88,
    etaMin: 6,
    wing: 'East wing · via elevator',
    path: '52,228 52,188 265,188 265,92',
    steps: ['Lobby', 'Elevator to L2', 'East corridor', 'Research Lab'],
  },
  {
    id: '2.100',
    number: '2.100',
    name: 'Restroom',
    category: 'restroom',
    floor: 2,
    x: 168,
    y: 208,
    w: 44,
    h: 36,
    etaMin: 4,
    wing: 'Central · via stairs',
    path: '52,228 120,228 120,188 190,188 190,226',
    steps: ['Lobby', 'Stairs to L2', 'Central corridor', 'Restroom'],
  },
];

export const DEMO_BUILDING = {
  id: 'gdc',
  name: 'Gates Dell Complex (GDC)',
  shortName: 'GDC',
};

export const LEGEND = [
  { label: 'Hallway', color: '#F5E6B8' },
  { label: 'Class', color: '#C8DFF0' },
  { label: 'Lab', color: '#E8C9A8' },
  { label: 'Office', color: '#D9D4C8' },
  { label: 'Restroom', color: '#B8D4D0' },
] as const;

export function roomFill(category: RoomCategory, selected: boolean): string {
  if (selected) return '#0B617E';
  switch (category) {
    case 'classroom':
      return '#C8DFF0';
    case 'lab':
      return '#E8C9A8';
    case 'restroom':
      return '#B8D4D0';
    case 'office':
      return '#D9D4C8';
  }
}
