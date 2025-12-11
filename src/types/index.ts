export type PokemonName = {
  name: string;
  url: string;
};

export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonInfoCard = {
  name: string;
  id: number;
  type1: string;
  type2?: string;
  img: string;
  generation: string;
};

export type DescricaoPokemon = {
  flavor_text: string;
};

export type PokemonDetail = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  type1: string;
  type2?: string;
  abilitie1: string;
  abilitie2?: string;
  name: string;
  id: number;
  height: number;
  weight: number;
  is_default: boolean;
  img: string;
  imgAnimada: string;
  backImg?: string;
};

export type ItemData = {
  name: string;
  url: string;
};

export type ItemCardInfo = {
  name: string;
  id: number;
  cost: number;
  category: string;
  img: string;
};

export type ItemDetail = {
  name: string;
  id: number;
  cost: number;
  category: string;
  effect: string;
  sprite: string;
};
