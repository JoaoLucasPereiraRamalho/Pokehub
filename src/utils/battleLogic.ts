import type { BattlePokemon, Move } from "../types/battle";

export const calculateDamage = (
  attacker: BattlePokemon,
  defender: BattlePokemon,
  move: Move
): number => {
  if (move.power <= 0) return 0;

  const attackStat = Math.max(attacker.attack, attacker.specialAttack);
  const defenseStat = Math.max(defender.defense, defender.specialDefense);

  const randomFactor = (Math.floor(Math.random() * 16) + 85) / 100;

  const damage =
    ((attackStat / defenseStat) * move.power * 0.5 + 2) * randomFactor;

  return Math.max(1, Math.floor(damage));
};

export const isFainted = (pokemon: BattlePokemon): boolean => {
  return pokemon.currentHp <= 0;
};

export const checkHit = (move: Move): boolean => {
  if (move.accuracy === 100) return true;

  const chance = Math.random() * 100;
  return chance <= move.accuracy;
};
