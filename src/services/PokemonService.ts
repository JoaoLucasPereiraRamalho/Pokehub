import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

// =========================================================================
// 1. CONSTANTES E FUNÇÃO AUXILIAR PARA CALCULAR GERAÇÃO
// =========================================================================

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

/**
 * Determina a geração de um Pokémon pelo seu ID.
 * @param id O ID da Pokédex.
 * @returns O nome da Geração (ex: "Kanto") ou "Desconhecida".
 */
const getGenerationName = (id: number): string => {
  const generation = POKEMON_GENERATIONS.find(
    (gen) => id >= gen.startId && id <= gen.endId
  );
  return generation ? generation.name : "Desconhecida";
};

// Lista de todos os tipos de Pokémon (para popular selects)
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

// =========================================================================
// 2. DEFINIÇÃO DE TIPOS
// =========================================================================

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
  generation: string; // NOVO CAMPO: Geração
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

export type ItemDetail = {
  name: string;
  id: number;
  cost: number;
  category: string;
  effect: string;
  sprite: string;
};

// =========================================================================
// 3. FUNÇÕES DE BUSCA DA API
// =========================================================================

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
    type2: d.types[1] ? String(d.types[1].type.name) : undefined,
    img: String(d.sprites.other["showdown"].front_default),
    generation: getGenerationName(Number(d.id)), // USANDO O CÁLCULO DA GERAÇÃO
  }));

  return infoCards;
};

export const getDescricaoPokemonPorNome = async (
  name: string
): Promise<DescricaoPokemon> => {
  const response = await api.get(`pokemon-species/${name}`);
  const d = response.data;

  // Tenta pegar a primeira descrição em inglês ou a primeira disponível
  const englishEntry = d.flavor_text_entries.find(
    (entry: any) => entry.language.name === "en"
  );

  const flavorText = englishEntry
    ? String(englishEntry.flavor_text).replace(/\n/g, " ")
    : String(d.flavor_text_entries[0]?.flavor_text || "Sem descrição.");

  const descricao: DescricaoPokemon = {
    flavor_text: flavorText,
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

// =========================================================================
// 4. FUNÇÕES DE FILTRO LOCAL
// =========================================================================

/**
 * Filtra a lista de Pokémon com base no termo de busca (nome).
 */
export const filterPokemonsByName = (
  allPokemons: PokemonInfoCard[],
  searchTerm: string
): PokemonInfoCard[] => {
  const lowerCaseSearch = searchTerm.trim().toLowerCase();

  if (!lowerCaseSearch) {
    return allPokemons;
  }

  return allPokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(lowerCaseSearch);
  });
};

/**
 * Filtra a lista de Pokémon com base no termo de busca (nome), no tipo E na Geração selecionada.
 * @param allPokemons A lista completa de todos os PokemonInfoCard.
 * @param searchTerm O texto digitado pelo usuário.
 * @param selectedType O tipo selecionado.
 * @param selectedGeneration A Geração selecionada (NOVO).
 * @returns Um array de PokemonInfoCard que atende aos critérios.
 */
export const filterPokemonsCombined = (
  allPokemons: PokemonInfoCard[],
  searchTerm: string,
  selectedType: string | null,
  selectedGeneration: string | null // NOVO PARÂMETRO
): PokemonInfoCard[] => {
  const lowerCaseSearch = searchTerm.trim().toLowerCase();

  // 1. Filtra por Nome
  let currentFilter = lowerCaseSearch
    ? allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(lowerCaseSearch)
      )
    : allPokemons;

  // 2. Filtra por Tipo
  if (selectedType) {
    const lowerCaseType = selectedType.toLowerCase();
    currentFilter = currentFilter.filter((pokemon) => {
      const isType1 = pokemon.type1.toLowerCase() === lowerCaseType;
      const isType2 = pokemon.type2
        ? pokemon.type2.toLowerCase() === lowerCaseType
        : false;
      return isType1 || isType2;
    });
  }

  // 3. Filtra por Geração
  if (selectedGeneration) {
    // A Geração é case-sensitive conforme está definido no POKEMON_GENERATIONS (ex: "Kanto")
    currentFilter = currentFilter.filter(
      (pokemon) => pokemon.generation === selectedGeneration
    );
  }

  return currentFilter;
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

export const getItems = async (limite: number): Promise<ItemData[]> => {
  const response = await api.get(`item?limit=${limite}`);
  return response.data.results;
};

export const getItemInfoCards = async (
  itemList: ItemData[]
): Promise<ItemCardInfo[]> => {
  const detailPromises = itemList.map((item) => {
    return api.get(item.url).then((response) => response.data);
  });

  const allDetails = await Promise.all(detailPromises);

  const infoCards: ItemCardInfo[] = allDetails.map((d: any) => ({
    name: String(d.name),
    id: Number(d.id),
    cost: Number(d.cost),
    category: String(d.category.name),
    // A imagem do item é acessada diretamente via sprites.default
    img: String(d.sprites.default),
  }));

  return infoCards;
};

//Items

export const filterItemsByName = (
  allItems: ItemCardInfo[],
  searchTerm: string
): ItemCardInfo[] => {
  const lowerCaseSearch = searchTerm.trim().toLowerCase();

  if (!lowerCaseSearch) {
    return allItems;
  }

  return allItems.filter((item) => {
    return item.name.toLowerCase().includes(lowerCaseSearch);
  });
};

export const getItemDetailByName = async (
  name: string
): Promise<ItemDetail> => {
  const response = await api.get(`item/${name}`);
  const d = response.data;

  // Encontra a descrição do efeito (flavor_text) em inglês ou português se disponível
  const effectEntry =
    d.effect_entries.find(
      (entry: any) =>
        entry.language.name === "en" || entry.language.name === "pt"
    ) || d.effect_entries[0];

  const detail: ItemDetail = {
    name: String(d.name),
    id: Number(d.id),
    cost: Number(d.cost),
    category: String(d.category.name),
    effect: String(effectEntry?.effect || "No effect description found."),
    sprite: String(d.sprites.default),
  };

  return detail;
};
