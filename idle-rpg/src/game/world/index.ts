import type { Location } from "../models";

export const worldBiomes: Location[] = [
  {
    id: "grasslands",
    biome: "Grasslands",
    difficulty: "Normal",
    unlockReqs: [],
    dropTables: [],
    stages: [
      {
        id: "grasslands-1",
        name: "Whispering Plains",
        enemies: [
          {
            id: "slime",
            name: "Azure Slime",
            level: 1,
            baseStats: { hp: 120, atk: 15, def: 5 },
            tags: ["slime", "basic"]
          }
        ],
        dropTable: [],
        recommendedPower: 100,
        isFarmable: true
      },
      {
        id: "grasslands-boss",
        name: "Guardian Oak",
        enemies: [
          {
            id: "oak-sentinel",
            name: "Oak Sentinel",
            level: 5,
            baseStats: { hp: 900, atk: 45, def: 20 },
            tags: ["boss", "plant"]
          }
        ],
        dropTable: [],
        recommendedPower: 480,
        isBoss: true
      }
    ]
  }
];
