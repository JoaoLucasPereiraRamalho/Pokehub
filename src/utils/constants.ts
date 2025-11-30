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

export const TYPE_COLORS: { [key: string]: string } = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  steel: "#B8B8D0",
  dark: "#705848",
  fairy: "#EE99AC",
};

export const getTypeColor = (type?: string): string => {
  if (!type) return "#777777";
  return TYPE_COLORS[type.toLowerCase()] || "#777777";
};

export const POPULAR_ITEMS = [
  { id: 1, name: "master-ball", cost: 0, category: "standard-balls" },
  { id: 2, name: "ultra-ball", cost: 800, category: "standard-balls" },
  { id: 3, name: "great-ball", cost: 600, category: "standard-balls" },
  { id: 4, name: "poke-ball", cost: 200, category: "standard-balls" },
  { id: 26, name: "fresh-water", cost: 200, category: "healing" },
  { id: 28, name: "lemonade", cost: 350, category: "healing" },
  { id: 29, name: "moomoo-milk", cost: 500, category: "healing" },
  { id: 80, name: "sun-stone", cost: 2100, category: "evolution" },
  { id: 82, name: "fire-stone", cost: 2100, category: "evolution" },
];

export const getItemImageUrl = (name: string) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${name}.png`;
