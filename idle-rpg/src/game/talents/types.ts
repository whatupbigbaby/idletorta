import type { HeroClass } from "../models";

export interface TalentNodeEffect {
  type: "flat" | "percent" | "unlockSkill" | "modifySkill" | "passive";
  stat?: string;
  value?: number;
  skillId?: string;
  description?: string;
}

export interface TalentNode {
  id: string;
  name: string;
  icon: string;
  description: string;
  maxRank: number;
  cost: number;
  requires?: string[];
  branch?: string;
  exclusiveWith?: string[];
  effects: TalentNodeEffect[];
}

export interface TalentTree {
  id: HeroClass;
  name: string;
  nodes: TalentNode[];
  respecCost: {
    resource: "gold" | "gems";
    amount: number;
  };
}
