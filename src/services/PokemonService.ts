import axios from "axios";

/**
 * Instância do Axios configurada para acessar a base da PokeAPI.
 */
const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

// =========================================================================
// 1. CONSTANTES E FUNÇÕES AUXILIARES
// =========================================================================

/**
 * Lista de todas as gerações de Pokémon, contendo o nome e o intervalo de IDs.
 */
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
 * Função auxiliar que determina o nome da Geração de um Pokémon com base no seu ID.
 */
const getGenerationName = (id: number): string => {
  const generation = POKEMON_GENERATIONS.find(
    (gen) => id >= gen.startId && id <= gen.endId
  );
  return generation ? generation.name : "Desconhecida";
};

/**
 * Lista de todos os tipos de Pokémon (para popular selects de filtro).
 */
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
// 2. DEFINIÇÃO DE TIPOS (INTERFACES)
// =========================================================================

/**
 * Tipo básico para um item de lista retornado pela API (nome e URL).
 */
export type PokemonName = {
  name: string;
  url: string;
};

/**
 * Tipo básico para um item de lista retornado pela API (nome e URL).
 * Usada aqui para Pokemons.
 */
export type Pokemon = {
  name: string;
  url: string;
};

/**
 * Tipo para dados resumidos do Pokémon, usado em cards e listas.
 */
export type PokemonInfoCard = {
  name: string;
  id: number;
  type1: string;
  type2?: string;
  img: string; // URL da imagem
  generation: string; // Nome da geração (ex: "Kanto")
};

/**
 * Tipo para a descrição de Flavor Text (texto de Pokédex).
 */
export type DescricaoPokemon = {
  flavor_text: string;
};

/**
 * Tipo para os dados detalhados de um Pokémon (Status, Habilidades, etc.).
 */
export type PokemonDetail = {
  // Stats (Estatísticas)
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;

  // Tipos
  type1: string;
  type2?: string;

  // Habilidades
  abilitie1: string;
  abilitie2?: string;

  // Dados básicos
  name: string;
  id: number;
  height: number;
  weight: number;
  is_default: boolean;

  // Sprites
  img: string; // Imagem oficial (artwork)
  imgAnimada: string; // Imagem animada (showdown)
};

/**
 * Tipo para o item de lista retornado pela API (nome e URL).
 */
export type ItemData = {
  name: string;
  url: string;
};

/**
 * Tipo para dados resumidos de um Item, usado em cards e listas.
 */
export type ItemCardInfo = {
  name: string;
  id: number;
  cost: number;
  category: string;
  img: string; // URL do sprite do item
};

/**
 * Tipo para os dados detalhados de um Item.
 */
export type ItemDetail = {
  name: string;
  id: number;
  cost: number;
  category: string;
  effect: string; // Descrição do efeito/flavor text
  sprite: string; // URL do sprite do item
};

// =========================================================================
// 3. FUNÇÕES DE BUSCA DA POKÉMON API (Dados de Pokémon)
// =========================================================================

/**
 * Busca a lista completa de nomes de Pokémon (até 10000).
 */
export const getPokemonNameList = async (): Promise<PokemonName[]> => {
  try {
    const response = await api.get(`pokemon?limit=10000`);
    return response.data.results;
  } catch (error) {
    console.error("Erro ao carregar lista de nomes:", error);
    return [];
  }
};

/**
 * Busca uma lista limitada de Pokémon (apenas nome e URL).
 */
export const getPokemons = async (limite: number): Promise<Pokemon[]> => {
  const response = await api.get(`pokemon?limit=${limite}`);
  return response.data.results;
};

/**
 * Busca e processa detalhes de uma lista de Pokémon para criar cards de informação.
 * Executa múltiplas requisições em paralelo.
 */
export const getPokemonInfoCards = async (
  limit: number
): Promise<PokemonInfoCard[]> => {
  const pokemonList = await getPokemons(limit);

  // Mapeia a lista para Promises de detalhes do Pokémon
  const detailPromises = pokemonList.map((pokemon) => {
    return api.get(pokemon.url).then((response) => response.data);
  });

  // Aguarda todas as requisições de detalhes serem concluídas
  const allDetails = await Promise.all(detailPromises);

  // Mapeia os dados brutos para o formato PokemonInfoCard
  const infoCards: PokemonInfoCard[] = allDetails.map((d: any) => ({
    name: String(d.name),
    id: Number(d.id),
    type1: String(d.types[0].type.name),
    type2: d.types[1] ? String(d.types[1].type.name) : undefined,
    // Usando o sprite de "showdown" para a imagem do card
    img: String(d.sprites.other["showdown"].front_default),
    // USANDO O CÁLCULO DA GERAÇÃO
    generation: getGenerationName(Number(d.id)),
  }));

  return infoCards;
};

/**
 * Busca a descrição do Flavor Text (texto de Pokédex) de um Pokémon pelo nome.
 */
export const getDescricaoPokemonPorNome = async (
  name: string
): Promise<DescricaoPokemon> => {
  const response = await api.get(`pokemon-species/${name}`);
  const d = response.data;

  // Tenta pegar a primeira descrição em inglês (en)
  const englishEntry = d.flavor_text_entries.find(
    (entry: any) => entry.language.name === "en"
  );

  // Limpa quebras de linha e usa a primeira entrada disponível se o inglês não for encontrado
  const flavorText = englishEntry
    ? String(englishEntry.flavor_text).replace(/\n/g, " ")
    : String(d.flavor_text_entries[0]?.flavor_text || "Sem descrição.");

  const descricao: DescricaoPokemon = {
    flavor_text: flavorText,
  };

  return descricao;
};

/**
 * Busca todos os detalhes de um Pokémon pelo nome.
 */
export const getPokemonPorNome = async (
  name: string
): Promise<PokemonDetail> => {
  const response = await api.get(`pokemon/${name}`);
  const d = response.data;

  const detail: PokemonDetail = {
    // Mapeamento dos 6 status principais
    hp: Number(d.stats[0].base_stat),
    attack: Number(d.stats[1].base_stat),
    defense: Number(d.stats[2].base_stat),
    specialAttack: Number(d.stats[3].base_stat),
    specialDefense: Number(d.stats[4].base_stat),
    speed: Number(d.stats[5].base_stat),

    // Tipos
    type1: String(d.types[0].type.name),
    type2: d.types[1] ? String(d.types[1].type.name) : undefined,

    // Habilidades
    abilitie1: String(d.abilities[0].ability.name),
    abilitie2: d.abilities[1] ? String(d.abilities[1].ability.name) : undefined,

    // Dados básicos
    name: String(d.name),
    id: Number(d.id),
    height: Number(d.height),
    weight: Number(d.weight),
    is_default: Boolean(d.is_default),

    // Sprites
    img: String(d.sprites.other["official-artwork"].front_default),
    imgAnimada: String(d.sprites.other["showdown"].front_default),
  };

  return detail;
};

// =========================================================================
// 4. FUNÇÕES DE BUSCA DA POKÉMON API (Itens)
// =========================================================================

/**
 * Busca uma lista limitada de Itens (apenas nome e URL).
 */
export const getItems = async (limite: number): Promise<ItemData[]> => {
  const response = await api.get(`item?limit=${limite}`);
  return response.data.results;
};

/**
 * Busca e processa detalhes de uma lista de Itens para criar cards de informação.
 */
export const getItemInfoCards = async (
  itemList: ItemData[]
): Promise<ItemCardInfo[]> => {
  // Mapeia a lista para Promises de detalhes do Item
  const detailPromises = itemList.map((item) => {
    return api.get(item.url).then((response) => response.data);
  });

  // Aguarda todas as requisições de detalhes serem concluídas
  const allDetails = await Promise.all(detailPromises);

  // Mapeia os dados brutos para o formato ItemCardInfo
  const infoCards: ItemCardInfo[] = allDetails.map((d: any) => ({
    name: String(d.name),
    id: Number(d.id),
    cost: Number(d.cost),
    category: String(d.category.name),
    img: String(d.sprites.default),
  }));

  return infoCards;
};

/**
 * Busca todos os detalhes de um Item pelo nome.
 */
export const getItemDetailByName = async (
  name: string
): Promise<ItemDetail> => {
  const response = await api.get(`item/${name}`);
  const d = response.data;

  // Encontra a descrição do efeito priorizando inglês ou português, mas não tem pt-br
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

// =========================================================================
// 5. FUNÇÕES DE FILTRO LOCAL
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
    return allPokemons; // Retorna tudo se a busca estiver vazia
  }

  return allPokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(lowerCaseSearch);
  });
};

/**
 * Filtra a lista de Pokémon combinando Nome, Tipo e Geração.
 */
export const filterPokemonsCombined = (
  allPokemons: PokemonInfoCard[],
  searchTerm: string,
  selectedType: string | null,
  selectedGeneration: string | null
): PokemonInfoCard[] => {
  const lowerCaseSearch = searchTerm.trim().toLowerCase();
  let currentFilter = allPokemons;

  // 1. Filtra por Nome
  if (lowerCaseSearch) {
    currentFilter = currentFilter.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(lowerCaseSearch)
    );
  }

  // 2. Filtra por Tipo
  if (selectedType) {
    const lowerCaseType = selectedType.toLowerCase();
    currentFilter = currentFilter.filter((pokemon) => {
      const isType1 = pokemon.type1.toLowerCase() === lowerCaseType;
      // Verifica o segundo tipo se existir
      const isType2 = pokemon.type2
        ? pokemon.type2.toLowerCase() === lowerCaseType
        : false;
      return isType1 || isType2;
    });
  }

  // 3. Filtra por Geração
  if (selectedGeneration) {
    // A comparação é direta, pois o nome da geração deve ser exato
    currentFilter = currentFilter.filter(
      (pokemon) => pokemon.generation === selectedGeneration
    );
  }

  return currentFilter;
};

/**
 * Filtra a lista de Itens com base no termo de busca (nome).
 */
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
