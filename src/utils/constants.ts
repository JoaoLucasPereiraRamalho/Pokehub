export const POKEMON_GENERATIONS = [
  { name: "Kanto", startId: 1, endId: 151 },
  { name: "Johto", startId: 152, endId: 251 },
  { name: "Hoenn", startId: 252, endId: 386 },
  { name: "Sinnoh", startId: 387, endId: 493 },
  { name: "Unova", startId: 494, endId: 649 },
  { name: "Kalos", startId: 650, endId: 721 },
  { name: "Alola", startId: 722, endId: 809 },
  { name: "Galar", startId: 810, endId: 898 },
  { name: "Paldea", startId: 899, endId: 1025 },
];

export const ALL_POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "steel",
  "fairy",
];

export const getGenerationName = (id: number): string => {
  const generation = POKEMON_GENERATIONS.find(
    (gen) => id >= gen.startId && id <= gen.endId
  );
  return generation ? generation.name : "Desconhecida";
};

export const STAT_DISPLAY_NAMES: { [key: string]: string } = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  specialAttack: "SpA",
  specialDefense: "SpD",
  speed: "SPD",
};

export const STAT_KEYS = [
  "hp",
  "attack",
  "defense",
  "specialAttack",
  "specialDefense",
  "speed",
];
