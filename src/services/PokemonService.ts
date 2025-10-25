import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

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
};

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

const getGenerationName = (id: number): string => {
  const generation = POKEMON_GENERATIONS.find(
    (gen) => id >= gen.startId && id <= gen.endId
  );
  return generation ? generation.name : "Desconhecida";
};

export const getPokemons = async (limite: number): Promise<Pokemon[]> => {
  const response = await api.get(`pokemon?limit=${limite}`);
  return response.data.results;
};

export const getPokemonInfoCards = async (
  limit: number
): Promise<PokemonInfoCard[]> => {
  const pokemonList = await getPokemons(limit);

  const detailPromises = pokemonList.map((pokemon) => {
    return api.get(pokemon.url).then((response) => response.data);
  });

  const allDetails = await Promise.all(detailPromises);

  const infoCards: PokemonInfoCard[] = allDetails.map((d: any) => ({
    name: String(d.name),
    id: Number(d.id),
    type1: String(d.types[0].type.name),
    type2: String(d.types[1] ? String(d.types[1].type.name) : undefined),
    img: String(d.sprites.other["showdown"].front_default),
    generation: getGenerationName(Number(d.id)),
  }));

  return infoCards;
};

export const getDescricaoPokemonPorNome = async (
  name: string
): Promise<DescricaoPokemon> => {
  const response = await api.get(`pokemon-species/${name}`);
  const d = response.data;

  const descricao: DescricaoPokemon = {
    flavor_text: String(d.flavor_text_entries[0].flavor_text),
  };

  return descricao;
};

export const getPokemonPorNome = async (
  name: string
): Promise<PokemonDetail> => {
  const response = await api.get(`pokemon/${name}`);
  const d = response.data;

  const detail: PokemonDetail = {
    hp: Number(d.stats[0].base_stat),
    attack: Number(d.stats[1].base_stat),
    defense: Number(d.stats[2].base_stat),
    specialAttack: Number(d.stats[3].base_stat),
    specialDefense: Number(d.stats[4].base_stat),
    speed: Number(d.stats[5].base_stat),

    type1: String(d.types[0].type.name),
    type2: d.types[1] ? String(d.types[1].type.name) : undefined,

    abilitie1: String(d.abilities[0].ability.name),
    abilitie2: d.abilities[1] ? String(d.abilities[1].ability.name) : undefined,

    name: String(d.name),
    id: Number(d.id),
    height: Number(d.height),
    weight: Number(d.weight),
    is_default: Boolean(d.is_default),

    img: String(d.sprites.other["official-artwork"].front_default),
    imgAnimada: String(d.sprites.other["showdown"].front_default),
  };

  return detail;
};

export const filterPokemonsByName = (
  allPokemons: PokemonInfoCard[],
  searchTerm: string
): PokemonInfoCard[] => {
  const lowerCaseSearch = searchTerm.trim().toLowerCase();

  // mudar para não retornar tudo
  if (!lowerCaseSearch) {
    return allPokemons;
  }

  return allPokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(lowerCaseSearch);
  });
};
