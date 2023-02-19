<template>
  <main>
    <div class="stat-block wide">
      <hr class="orange-border" />
      <div class="section-left">
        <div class="creature-heading">
          <h1>{{ statBlock.name }}</h1>
          <h2>
            <span style="text-transform: capitalize">{{ statBlock.size }}</span>
            {{ statBlock.species }}, {{ statBlock.alignment }}
          </h2>
        </div>
        <!-- creature heading -->
        <svg height="5" width="100%" class="tapered-rule">
          <polyline points="0,0 400,2.5 0,5"></polyline>
        </svg>
        <div class="top-stats">
          <div class="property-line first">
            <h4>Armor Class</h4>
            <p>{{ statBlock.baseArmorClass }}</p>
          </div>
          <!-- property line -->
          <div class="property-line">
            <h4>Hit Points</h4>
            <p>{{ statBlock.baseHitPoints }}</p>
          </div>
          <!-- property line -->
          <div class="property-line last">
            <h4>Speed</h4>
            <p>{{ statBlock.speed }}ft.</p>
          </div>
          <!-- property line -->
          <svg height="5" width="100%" class="tapered-rule">
            <polyline points="0,0 400,2.5 0,5"></polyline>
          </svg>
          <div class="abilities">
            <div
              v-for="ability in statBlock.abilityScores"
              :key="ability.score"
            >
              <h4>{{ AbilityScore[ability.score] }}</h4>
              <p>{{ ability.value }} ({{ scoreToModString(ability.value) }})</p>
            </div>
          </div>
          <!-- abilities -->
          <svg height="5" width="100%" class="tapered-rule">
            <polyline points="0,0 400,2.5 0,5"></polyline>
          </svg>
          <div class="property-line">
            <h4>Languages</h4>
            <p>
              <span v-for="language in statBlock.languages" :key="language">{{
                language
              }}</span>
            </p>
          </div>
          <svg height="5" width="100%" class="tapered-rule">
            <polyline points="0,0 400,2.5 0,5"></polyline>
          </svg>
          <div class="property-line">
            <h4>Proficiency</h4>
            <p>+{{ statBlock.proficiencyBonus }}</p>
          </div>
          <svg height="5" width="100%" class="tapered-rule">
            <polyline points="0,0 400,2.5 0,5"></polyline>
          </svg>
          <div class="property-line">
            <h4>Skills</h4>
            <div v-for="skill in skills" :key="skill.name">
              <component :is="proficiencyIconBySkill(skill)"></component>
              <span
                style="
                  font-size: 10px;
                  font-weight: bold;
                  color: darkgray;
                  margin-left: 5px;
                "
              >
                {{ AbilityScore[skill.abilityScore] }}
              </span>
              {{ skill.name }}
              ({{ skillValString(skill, statBlock) }})
            </div>
          </div>
          <!-- property line -->
        </div>
        <div class="actions">
          <h3>Actions</h3>
          <div
            class="property-block"
            v-for="action in statBlock.actions"
            :key="action.name"
          >
            <h4>{{ action.name }}.</h4>
            <p>
              <i v-if="action.subName">{{ action.subName }}: </i>
              {{ action.description }}
            </p>
          </div>
          <!-- property block -->
        </div>
        <div class="actions">
          <h3>Bonus Actions</h3>
          <div
            class="property-block"
            v-for="bonusAction in statBlock.bonusActions"
            :key="bonusAction.name"
          >
            <h4>{{ bonusAction.name }}.</h4>
            <p>
              <i v-if="bonusAction.subName">{{ bonusAction.subName }}: </i>
              {{ bonusAction.description }}
            </p>
          </div>
          <!-- property block -->
        </div>
        <!-- actions -->
      </div>
      <!-- section left -->
      <div class="section-right">
        <div class="actions">
          <h3>Abilities</h3>
          <div
            v-for="ability in statBlock.abilities"
            class="property-block"
            :key="ability.name"
          >
            <h4>{{ ability.name }}</h4>
            <p>
              <i>{{ ability.subName }}</i>
              {{ ability.description }}
            </p>
          </div>
        </div>
        
      </div>
      <!-- section right -->
      <hr class="orange-border bottom" />
    </div>
    <!-- stat block -->
  </main>
</template>
<script setup lang="ts">
import DefaultIcon from "@/components/proficiency/DefaultIcon.vue";
import ExpertiseIcon from "@/components/proficiency/ExpertiseIcon.vue";
import ProficientIcon from "@/components/proficiency/ProficientIcon.vue";
import { AbilityScore } from "@/data/abilityScore";
import type { Skill } from "@/data/skill";
import type { StatBlock } from "@/data/statblock";

const statBlock: StatBlock = {
  name: "Maeryn Amrena",
  size: "medium",
  species: "human",
  alignment: "Chaotic Light",
  baseArmorClass: 14,
  baseHitPoints: 20,
  proficiencyBonus: 2,
  proficiencies: [
    { name: "Sleight of Hand", level: 1 },
    { name: "Deception", level: 2 },
    { name: "Persuasion", level: 2 },
    { name: "Investigation", level: 2 },
    { name: "Insight", level: 1 },
  ],
  speed: 30,
  abilityScores: [
    { score: AbilityScore.STR, value: 8 },
    { score: AbilityScore.DEX, value: 10 },
    { score: AbilityScore.CON, value: 13 },
    { score: AbilityScore.INT, value: 17 },
    { score: AbilityScore.WIS, value: 17 },
    { score: AbilityScore.CHA, value: 18 },
  ],
  languages: [
    "Galactic Basic, Bothese, Durese, Sullustese, Shyriiwook (elementary)",
  ],
  abilities: [
    {
      name: "Professional Standing",
      description:
        "Words are a diplomat's greatest weapon. You gain a level of proficiency to the following skill checks: Sleight of Hand, Deception, Persuasion, and Investigation.",
    },
    {
      name: "Street's Secrets",
      description:
        "The Diplomat has a good ear for more...clandestine conversations. You gain a +3 to Perception (Hearing) checks. In addition, you can make a Perception check in a crowded street, bar, or other similar situation to pick out helpful information.",
    },
    {
      name: "Born a Weakling",
      description:
        "You didn't sign up to do the heavy lifting. You have people for that. You have a -1 to STR.",
    },
    {
      name: "Tricks",
      description:
        "Starting at level 2, you gain 1 'Trick'. You will use these tricks to power various Diplomat abilities. You gain an additional trick every other level. You can spend 1 action to replenish 1 trick. You can spend a Bonus Action to regain half of a trick. You can spend your movement to regain half of a trick. All tricks are restored on a short or long rest.",
    },
    {
      name: "Add Pressure",
      description:
        "Whenever you use a trick on a creature, you gain +2 to Insight checks against that creature for 1 hour.",
    },
    {
      name: "Talked Out of It",
      description:
        "The Diplomat may spend a trick to stop a creature from attacking, casting a spell, or using an ability during their next turn.",
    },
    {
      name: "Getting Your Hands Dirty",
      description:
        "You may spend a trick to automatically succeed on an attack roll.",
    },
    {
      name: "Sway the Crowds",
      description:
        "You have a powerful effect on people. Once per day, one person who you have interacted with will wish to protect you for the day.",
    },
    {
      name: "I Know You, I Swear",
      description:
        "You have quite an extensive network of friends. Once per combat, you can make a Knowledge check. If you succeed, one humanoid enemy becomes friendly with you (though not necessarily the party).",
    },
    {
      name: "It's All Coming Together",
      description:
        "If at any point you have successfully targeted 3 beings with Diplomat's Intuition, you've understood the enemies' plan of attack and constructed a counterplan. All allies within earshot (including yourself) can either move or take a single free attack, which they make at advantage.",
    },
  ],
  actions: [
    {
      name: "Lance's Lucky Holdout Blaster",
      subName: "Ranged Attack",
      description:
        "+6 to hit, range 30/120, one target. Hit: 1d6 + 4 (avg 7.5) energy damage.",
    },
    {
      name: "Personal Defense Repulsor",
      description:
        "When activated, this handheld canister releases a small seismic wave. All beings within 10 feet must make a DC 16 Dexterity Saving Throw or be thrown back 15 feet. The canister recharges in 1 hour.",
    }
  ],
  bonusActions: [
    {
      name: "Diplomat's Inutition",
      description:
        "Make a contested Inight check against the target's Deception check. On a success, you gain advantage on all attack rolls against the target for 1 minute. On a failure, you incur disadvantage on all attack rolls against this target for 1 minute, or until you make a successful Diplomat's Intuition check against them.",
    },
    {
      name: "Cunning Action",
      description: "You can Dash, Hide, or Disengage as a bonus action",
    },
  ],
};

const skills: Skill[] = [
  { name: "Athletics", abilityScore: AbilityScore.STR },
  { name: "Acrobatics", abilityScore: AbilityScore.DEX },
  { name: "Sleight of Hand", abilityScore: AbilityScore.DEX },
  { name: "Stealth", abilityScore: AbilityScore.DEX },
  { name: "Investigation", abilityScore: AbilityScore.INT },
  { name: "Lore", abilityScore: AbilityScore.INT },
  { name: "Nature", abilityScore: AbilityScore.INT },
  { name: "Piloting", abilityScore: AbilityScore.INT },
  { name: "Technology", abilityScore: AbilityScore.INT },
  { name: "Animal Handling", abilityScore: AbilityScore.WIS },
  { name: "Insight", abilityScore: AbilityScore.WIS },
  { name: "Medicine", abilityScore: AbilityScore.WIS },
  { name: "Perception", abilityScore: AbilityScore.WIS },
  { name: "Survival", abilityScore: AbilityScore.WIS },
  { name: "Deception", abilityScore: AbilityScore.CHA },
  { name: "Intimidation", abilityScore: AbilityScore.CHA },
  { name: "Performance", abilityScore: AbilityScore.CHA },
  { name: "Persuasion", abilityScore: AbilityScore.CHA },
];
const scoreToMod = (x: number): number => Math.floor((x - 10) / 2);
const scoreToModString = (x: number): string => {
  const mod = scoreToMod(x);
  return (mod < 0 ? "" : "+") + mod;
};
const skillVal = (x: Skill, statBlock: StatBlock): number => {
  const baseMod = scoreToMod(
    statBlock.abilityScores.find((a) => x.abilityScore == a.score)?.value ?? 10
  );
  const proficiencyLevel = proficiencyLevelBySkill(x);
  return baseMod + statBlock.proficiencyBonus * proficiencyLevel;
};
const proficiencyLevelBySkill = (x: Skill) => {
  return statBlock.proficiencies.find((p) => p.name == x.name)?.level ?? 0;
};
const proficiencyIconBySkill = (x: Skill) => {
  const level = proficiencyLevelBySkill(x);
  if (level == 1) return ProficientIcon;
  if (level == 2) return ExpertiseIcon;
  return DefaultIcon;
};
const skillValString = (x: Skill, statBlock: StatBlock): string => {
  const value = skillVal(x, statBlock);
  return (value > 0 ? "+" : "") + value;
};
</script>
<style src="@/assets/stat-block.css"></style>
<style>
h4 {
  padding-right: 2px;
}
</style>
