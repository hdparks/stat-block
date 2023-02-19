import type { Ability } from "./ability";
import type { AbilityScore } from "./abilityScore";

export interface StatBlock {
  name: string;
  size: string;
  species: string;
  alignment: string;
  baseArmorClass: number;
  baseHitPoints: number;
  proficiencyBonus: number;
  proficiencies: { name: string; level: number }[];
  speed: number;
  abilityScores: { score: AbilityScore; value: number }[];
  languages: string[];
  abilities: Ability[];
  actions: Ability[];
  bonusActions: Ability[];
}
