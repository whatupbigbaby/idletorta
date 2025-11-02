export interface XPCurve {
  level: number;
  xpRequired: number;
}

export interface UnlockRule {
  id: string;
  description: string;
  condition: (context: { accountLevel: number; stagesCleared: number }) => boolean;
}

export const heroXPCurve: XPCurve[] = Array.from({ length: 100 }, (_, index) => ({
  level: index + 1,
  xpRequired: Math.floor(50 * Math.pow(index + 1, 1.8))
}));

export const accountXPCurve: XPCurve[] = Array.from({ length: 60 }, (_, index) => ({
  level: index + 1,
  xpRequired: Math.floor(200 * Math.pow(index + 1, 2))
}));

export const unlockRules: UnlockRule[] = [
  {
    id: "unlock-desert",
    description: "Unlock the Desert biome at account level 10.",
    condition: ({ accountLevel }) => accountLevel >= 10
  },
  {
    id: "unlock-talents",
    description: "Unlock talent trees after clearing stage 1-5.",
    condition: ({ stagesCleared }) => stagesCleared >= 5
  }
];

export const calculateStageReward = (stagePower: number, bonusMultiplier = 1): number => {
  const base = 100 + stagePower * 2;
  return Math.floor(base * bonusMultiplier);
};
