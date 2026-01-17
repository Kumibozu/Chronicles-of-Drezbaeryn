export type Era = {
  id: string;
  name: string;
  yearRange: string;
  description: string;
  details: string;
};

export type Region = {
  id: string;
  name: string;
  description: string;
  politicalSystem: string;
  conflicts: string[];
  color: string;
  coordinates: string; // SVG path d
};

export type Faction = {
  id: string;
  name: string;
  type: string;
  slogan: string;
  description: string;
  ideology: string;
  leader: string;
  color: string;
  logo: string; // Lucide icon name
};

export type Artifact = {
  id: string;
  name: string;
  type: string;
  origin: string;
  description: string;
  imageUrl?: string;
};

export type Character = {
  id: string;
  name: string;
  title: string;
  faction: string;
  description: string;
  traits: string[];
};

export type View = 'timeline' | 'atlas' | 'codex' | 'archive' | 'profiles' | 'dashboard' | 'encyclopedia';