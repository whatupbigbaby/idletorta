import type { Stats, StatGrowth } from "./stats";
import type { Item } from "./item";

export type HeroClass = "Warrior" | "Ranger" | "Mage" | "Support" | "Assassin";
export type HeroRole = "Tank" | "DPS" | "Support" | "Controller";
export type HeroRarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" | "Mythic";

export interface HeroSkill {
  id: string;
  name: string;
  description: string;
  cooldown: number;
  tags: string[];
}

export interface HeroTalents {
  treeId: HeroClass;
  selectedNodes: Record<string, number>;
}

export interface Hero {
  id: string;
  name: string;
  class: HeroClass;
  role: HeroRole;
  rarity: HeroRarity;
  level: number;
  xp: number;
  baseStats: Stats;
  growth: StatGrowth;
  skills: HeroSkill[];
  talents: HeroTalents;
  gearSlots: Record<GearSlot, Item | null>;
  faction: string;
  element: string;
}

export type GearSlot =
  | "weapon"
  | "helm"
  | "chest"
  | "legs"
  | "boots"
  | "ring"
  | "amulet"
  | "trinket";

export interface FormationSlot {
  slotId: string;
  heroId: string | null;
  position: number;
  roleHint?: HeroRole;
}

export interface Formation {
  id: string;
  name: string;
  slots: FormationSlot[];
}

export interface HeroSynergy {
  id: string;
  name: string;
  description: string;
  requiredHeroes: string[];
  bonus: Partial<Stats>;
}
