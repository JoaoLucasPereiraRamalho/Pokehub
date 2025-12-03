import type { PokemonDetail } from ".";

export type Move = {
  name: string;
  power: number;
  type: string;
  accuracy: number;
};

export type BattlePokemon = PokemonDetail & {
  currentHp: number;
  moves: Move[];
  maxHp: number;
};

export type Turn = "player" | "enemy";

export type BattleLog = {
  message: string;
  turn: Turn;
};
