import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { createInitialPlayerState, type PlayerState } from "./playerState";
import type { Resource } from "../models";
import { worldBiomes } from "../world";

const buildDemoState = (): PlayerState => {
  const base = createInitialPlayerState();
  base.heroes = [
    {
      id: "hero-aurora",
      name: "Aurora",
      class: "Mage",
      role: "DPS",
      rarity: "Epic",
      level: 12,
      xp: 4800,
      baseStats: { hp: 680, atk: 220, def: 90, spd: 110, crit: 12, critDmg: 150, lifesteal: 4, armorPen: 8, elemental: 24 },
      growth: { hp: 6, atk: 4.4, def: 2, spd: 1.1, crit: 0.3, critDmg: 1.2, lifesteal: 0.1, armorPen: 0.2, elemental: 0.6 },
      skills: [
        { id: "arcane-bolt", name: "Arcane Bolt", description: "Fires a piercing bolt of energy.", cooldown: 4, tags: ["magic", "burst"] }
      ],
      talents: { treeId: "Mage", selectedNodes: {} },
      gearSlots: {
        weapon: null,
        helm: null,
        chest: null,
        legs: null,
        boots: null,
        ring: null,
        amulet: null,
        trinket: null
      },
      faction: "Lumina",
      element: "Arcane"
    },
    {
      id: "hero-bram",
      name: "Bram",
      class: "Warrior",
      role: "Tank",
      rarity: "Rare",
      level: 10,
      xp: 3200,
      baseStats: { hp: 1200, atk: 140, def: 180, spd: 90, crit: 8, critDmg: 140, lifesteal: 2, armorPen: 4, elemental: 6 },
      growth: { hp: 8, atk: 3, def: 5, spd: 0.8, crit: 0.2, critDmg: 0.8, lifesteal: 0.05, armorPen: 0.1, elemental: 0.2 },
      skills: [
        { id: "shield-bash", name: "Shield Bash", description: "Stuns an enemy briefly.", cooldown: 6, tags: ["physical", "stun"] }
      ],
      talents: { treeId: "Warrior", selectedNodes: { "warrior-1": 3 } },
      gearSlots: {
        weapon: null,
        helm: null,
        chest: null,
        legs: null,
        boots: null,
        ring: null,
        amulet: null,
        trinket: null
      },
      faction: "Iron Legion",
      element: "Earth"
    }
  ];

  base.inventory.currencies = [
    { type: "gold", label: "Gold", amount: 128400 },
    { type: "gems", label: "Gems", amount: 340 },
    { type: "essence", label: "Essence", amount: 6420 },
    { type: "raidKeys", label: "Raid Keys", amount: 3 },
    { type: "craftingMats", label: "Mats", amount: 124 }
  ];

  base.progression.unlockedLocations = worldBiomes.map((location) => location.id);
  base.activeLocation = worldBiomes[0];
  base.formation.slots[0].heroId = "hero-bram";
  base.formation.slots[1].heroId = "hero-aurora";

  return base;
};

export interface GameContextValue {
  state: PlayerState;
  updateResources: (resources: Resource[]) => void;
}

const GameStateContext = createContext<GameContextValue | undefined>(undefined);

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<PlayerState>(() => buildDemoState());

  const value = useMemo<GameContextValue>(() => ({
    state,
    updateResources: (resources) =>
      setState((current) => ({
        ...current,
        inventory: {
          ...current.inventory,
          currencies: resources
        }
      }))
  }), [state]);

  return <GameStateContext.Provider value={value}>{children}</GameStateContext.Provider>;
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("useGameState must be used within a GameStateProvider");
  }
  return context;
};
