import type { Formation, Hero, HeroSynergy, Item, Location, Resource } from "../models";

export interface InventoryState {
  items: Item[];
  materials: Record<string, number>;
  currencies: Resource[];
}

export interface PlayerProgression {
  accountLevel: number;
  prestigeLevel: number;
  unlockedLocations: string[];
  unlockedFeatures: string[];
}

export interface PlayerState {
  heroes: Hero[];
  formation: Formation;
  inventory: InventoryState;
  activeLocation: Location | null;
  synergies: HeroSynergy[];
  progression: PlayerProgression;
}

export const createInitialPlayerState = (): PlayerState => ({
  heroes: [],
  formation: {
    id: "default",
    name: "Default",
    slots: Array.from({ length: 6 }, (_, index) => ({
      slotId: `slot-${index + 1}`,
      heroId: null,
      position: index + 1
    }))
  },
  inventory: {
    items: [],
    materials: {},
    currencies: []
  },
  activeLocation: null,
  synergies: [],
  progression: {
    accountLevel: 1,
    prestigeLevel: 0,
    unlockedLocations: [],
    unlockedFeatures: []
  }
});
