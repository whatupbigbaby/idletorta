import type { Stats } from "./stats";
import type { GearSlot } from "./hero";

export type ItemRarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" | "Mythic";

export interface ItemAffix {
  id: string;
  name: string;
  description: string;
  stats: Partial<Stats>;
}

export interface Item {
  id: string;
  name: string;
  slot: GearSlot;
  rarity: ItemRarity;
  statRolls: Partial<Stats>;
  upgradeLevel: number;
  affixes?: ItemAffix[];
  locked?: boolean;
}

export interface DropTableEntry {
  itemId: string;
  weight: number;
  minQuantity: number;
  maxQuantity: number;
}
