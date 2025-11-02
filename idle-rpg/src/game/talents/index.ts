import type { TalentTree } from "./types";

export const talentTrees: TalentTree[] = [
  {
    id: "Warrior",
    name: "Warrior",
    respecCost: { resource: "gold", amount: 5000 },
    nodes: [
      {
        id: "warrior-1",
        name: "Shield Mastery",
        icon: "shield",
        description: "Increase armor and block chance.",
        maxRank: 5,
        cost: 1,
        requires: [],
        branch: "defense",
        effects: [{ type: "percent", stat: "def", value: 5 }]
      },
      {
        id: "warrior-ultimate",
        name: "War Cry",
        icon: "war-cry",
        description: "Unlock the War Cry ultimate ability.",
        maxRank: 1,
        cost: 2,
        requires: ["warrior-1"],
        branch: "offense",
        effects: [{ type: "unlockSkill", skillId: "war-cry" }]
      }
    ]
  },
  {
    id: "Mage",
    name: "Mage",
    respecCost: { resource: "gems", amount: 15 },
    nodes: [
      {
        id: "mage-1",
        name: "Arcane Attunement",
        icon: "arcane",
        description: "Increase elemental damage by 6% per rank.",
        maxRank: 5,
        cost: 1,
        effects: [{ type: "percent", stat: "elemental", value: 6 }]
      },
      {
        id: "mage-ultimate",
        name: "Starfall",
        icon: "star",
        description: "Unlock the Starfall ultimate ability.",
        maxRank: 1,
        cost: 3,
        requires: ["mage-1"],
        effects: [{ type: "unlockSkill", skillId: "starfall" }]
      }
    ]
  }
];
