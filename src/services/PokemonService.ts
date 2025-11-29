import axios from "axios";
import type {
  PokemonName,
  Pokemon,
  PokemonInfoCard,
  DescricaoPokemon,
  PokemonDetail,
  ItemData,
  ItemCardInfo,
  ItemDetail,
} from "../types";
import { getGenerationName } from "../utils/constants";

/**
 * Instância do Axios configurada para acessar a base da PokeAPI.
 */
const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
