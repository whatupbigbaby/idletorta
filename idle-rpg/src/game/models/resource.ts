export type ResourceType = "gold" | "gems" | "essence" | "raidKeys" | "craftingMats";

export interface Resource {
  type: ResourceType;
  label: string;
  amount: number;
  capacity?: number;
  icon?: string;
}
