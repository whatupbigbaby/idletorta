import type { DropTableEntry, GearSlot, Item, ItemRarity } from "../models";

export const itemSlots: GearSlot[] = [
  "weapon",
  "helm",
  "chest",
  "legs",
  "boots",
  "ring",
  "amulet",
  "trinket"
];

export const rarityTiers: ItemRarity[] = [
  "Common",
  "Uncommon",
  "Rare",
  "Epic",
  "Legendary",
  "Mythic"
];

export interface RarityStatRange {
  min: number;
  max: number;
}

export const baseStatRolls: Record<ItemRarity, RarityStatRange> = {
  Common: { min: 2, max: 4 },
  Uncommon: { min: 4, max: 8 },
  Rare: { min: 8, max: 14 },
  Epic: { min: 14, max: 24 },
  Legendary: { min: 24, max: 34 },
  Mythic: { min: 34, max: 48 }
};

export interface DropTable {
  locationId: string;
  entries: DropTableEntry[];
}

export const defaultDropTables: DropTable[] = [];

export const generateLoot = (table: DropTable): Item[] => {
  // Placeholder: return deterministic set for now
  return table.entries.map((entry) => ({
    id: `${entry.itemId}-loot`,
    name: `Looted ${entry.itemId}`,
    slot: "weapon",
    rarity: "Rare",
    statRolls: { atk: 12 },
    upgradeLevel: 0
  }));
};
