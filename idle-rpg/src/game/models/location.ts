import type { DropTableEntry } from "./item";

export type Biome = "Grasslands" | "Desert" | "Frost" | "Swamp" | "Volcano" | "Void";

export interface EnemyTemplate {
  id: string;
  name: string;
  level: number;
  baseStats: Record<string, number>;
  tags: string[];
}

export interface LocationUnlockRequirement {
  type: "playerLevel" | "quest" | "boss";
  value: number | string;
}

export interface LocationStage {
  id: string;
  name: string;
  enemies: EnemyTemplate[];
  dropTable: DropTableEntry[];
  recommendedPower: number;
  isBoss?: boolean;
  isFarmable?: boolean;
}

export interface Location {
  id: string;
  biome: Biome;
  difficulty: "Normal" | "Hard" | "Nightmare" | "Endless";
  stages: LocationStage[];
  unlockReqs: LocationUnlockRequirement[];
  dropTables: DropTableEntry[];
}
