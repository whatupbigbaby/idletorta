import { createInitialPlayerState } from "../state/playerState";
import type { PlayerState } from "../state/playerState";

const STORAGE_KEY = "idle-rpg-save";
const SAVE_VERSION = 1;

export interface SaveGame {
  version: number;
  timestamp: number;
  playerState: PlayerState;
}

export const saveGame = (playerState: PlayerState) => {
  const snapshot: SaveGame = {
    version: SAVE_VERSION,
    timestamp: Date.now(),
    playerState
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch (error) {
    console.error("Failed to save game", error);
  }
};

export const loadGame = (): PlayerState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialPlayerState();

    const parsed = JSON.parse(raw) as SaveGame;
    if (parsed.version !== SAVE_VERSION) {
      return migrateSave(parsed).playerState;
    }

    return parsed.playerState;
  } catch (error) {
    console.warn("Invalid save data, resetting", error);
    return createInitialPlayerState();
  }
};

export const exportSave = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ?? "";
};

export const importSave = (payload: string): PlayerState => {
  try {
    localStorage.setItem(STORAGE_KEY, payload);
    return loadGame();
  } catch (error) {
    console.error("Failed to import save", error);
    return createInitialPlayerState();
  }
};

const migrateSave = (save: SaveGame): SaveGame => {
  // Placeholder migration pipeline
  return {
    ...save,
    version: SAVE_VERSION
  };
};
