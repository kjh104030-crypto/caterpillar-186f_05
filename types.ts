
export interface Character {
  id: string;
  name: string;
  race: string;
  role?: string;
  height?: string;
  description: string;
  orlando?: string;
  quote?: string;
  tags?: string[];
  imageUrl?: string;
  background?: string;
  combatAnalysis?: string;
}

export interface LoreSection {
  title: string;
  content: string;
}

export interface Faction {
  id: string;
  name: string;
  description: string;
  type: 'Institution' | 'Group' | 'Duo' | 'Band';
  location: string;
  loreSections?: LoreSection[];
  characters: Character[];
}

export interface WorldIntel {
  title: string;
  content: string;
  category: 'PLANET' | 'PHENOMENON' | 'DEMI_HUMAN' | 'INDIGENOUS_LIFE' | 'MATERIAL' | 'ITEM' | 'OTHER';
}

export interface NovelChapter {
  id: string;
  title: string;
  content: string;
}

export type ViewState = 'DASHBOARD' | 'ARCHIVE' | 'FACTIONS' | 'PERSONNEL' | 'NOVEL';
