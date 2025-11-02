import type { Formation } from "../models";
import type { LocationStage } from "../models/location";

export interface CombatEvent {
  timestamp: number;
  actorId: string;
  action: string;
  value?: number;
  targetId?: string;
  critical?: boolean;
}

export interface CombatLoopConfig {
  tickIntervalMs: number;
  formation: Formation;
  stage: LocationStage;
  onEvent?: (event: CombatEvent) => void;
  onWaveCleared?: (waveIndex: number) => void;
  onComplete?: (result: { victory: boolean; rewards: Record<string, number> }) => void;
}

export class CombatLoop {
  private readonly config: CombatLoopConfig;
  private accumulator = 0;
  private waveIndex = 0;
  private running = false;

  constructor(config: CombatLoopConfig) {
    this.config = config;
  }

  start() {
    this.running = true;
    this.accumulator = 0;
  }

  stop() {
    this.running = false;
  }

  update(deltaMs: number) {
    if (!this.running) return;
    this.accumulator += deltaMs;

    while (this.accumulator >= this.config.tickIntervalMs) {
      this.processTick();
      this.accumulator -= this.config.tickIntervalMs;
    }
  }

  private processTick() {
    const { stage, onEvent, onWaveCleared, onComplete } = this.config;
    const currentWave = stage.enemies[this.waveIndex];

    if (!currentWave) {
      this.running = false;
      onComplete?.({ victory: true, rewards: { gold: 120, essence: 6 } });
      return;
    }

    const simulatedEvent: CombatEvent = {
      timestamp: Date.now(),
      actorId: "formation",
      action: `Formation strikes ${currentWave.name}`,
      value: Math.floor(Math.random() * 150) + 50,
      targetId: currentWave.id,
      critical: Math.random() > 0.85
    };

    onEvent?.(simulatedEvent);

    if (Math.random() > 0.7) {
      this.waveIndex += 1;
      onWaveCleared?.(this.waveIndex);
    }
  }
}
