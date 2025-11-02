import { CombatLoop } from "./combatLoop";
import type { CombatLoopConfig } from "./combatLoop";

export interface IdleEngineConfig extends CombatLoopConfig {
  offlineCapHours: number;
  ticksPerSlice: number;
}

export class IdleEngine {
  private readonly loop: CombatLoop;
  private readonly config: IdleEngineConfig;
  private lastUpdate = performance.now();

  constructor(config: IdleEngineConfig) {
    this.config = config;
    this.loop = new CombatLoop(config);
  }

  start() {
    this.loop.start();
    this.lastUpdate = performance.now();
  }

  stop() {
    this.loop.stop();
  }

  runFrame() {
    const now = performance.now();
    const delta = now - this.lastUpdate;
    this.lastUpdate = now;
    this.loop.update(delta * this.config.ticksPerSlice);
  }

  simulateOffline(elapsedMs: number) {
    const cap = this.config.offlineCapHours * 60 * 60 * 1000;
    const clamped = Math.min(elapsedMs, cap);
    const slices = Math.floor(clamped / this.config.tickIntervalMs);
    for (let i = 0; i < slices; i += 1) {
      this.loop.update(this.config.tickIntervalMs * this.config.ticksPerSlice);
    }
    return { simulatedTicks: slices * this.config.ticksPerSlice };
  }
}
