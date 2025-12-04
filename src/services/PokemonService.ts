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
import type { Move } from "../types/battle";

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
    const response = await api.get(`pokemon?limit=500`);
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
 * Busca a descrição do Flavor Text de um Pokémon pelo nome.
 */
export const getDescricaoPokemonPorNome = async (
  name: string
): Promise<DescricaoPokemon> => {
  try {
    const response = await api.get(`pokemon-species/${name}`);
    const d = response.data;

    // Tenta achar em Português primeiro, senão vai para Inglês
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entry =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      d.flavor_text_entries.find((e: any) => e.language.name === "pt-br") ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      d.flavor_text_entries.find((e: any) => e.language.name === "en");

    if (!entry) {
      return { flavor_text: "Descrição não disponível." };
    }

    // 2. Limpeza do texto
    let text = String(entry.flavor_text);

    text = text
      .replace(/[\n\f\r]/g, " ")
      .replace(/\s+/g, " ")
      .replace("POKéMON", "Pokémon")
      .trim();

    return {
      flavor_text: text,
    };
  } catch (error) {
    console.error("Erro ao buscar descrição:", error);
    return { flavor_text: "Erro ao carregar descrição." };
  }
};

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

// =========================================================================
// 5. FUNÇÕES DE BATALHA (Moves)
// =========================================================================

/**
 * Busca detalhes de um movimento (golpe) pela URL.
 */
export const getMoveDetails = async (url: string): Promise<Move> => {
  try {
    const response = await api.get(url);
    const d = response.data;

    return {
      name: d.name.replace("-", " "),
      power: d.power || 0,
      type: d.type.name,
      accuracy: d.accuracy || 100,
    };
  } catch (error) {
    console.error("Erro ao buscar move:", error);
    return { name: "Struggle", power: 50, type: "normal", accuracy: 100 };
  }
};

export const getRandomMoves = async (pokemonName: string): Promise<Move[]> => {
  try {
    const response = await api.get(`pokemon/${pokemonName}`);
    const allMoves = response.data.moves;

    if (!allMoves || allMoves.length === 0) return [];

    // 1. Filtrar apenas movimentos aprendidos por LEVEL-UP
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const naturalMoves = allMoves.filter((moveEntry: any) => {
      const details = moveEntry.version_group_details;
      // Verifica se em alguma versão o método de aprendizado foi level-up
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return details.some((d: any) => d.move_learn_method.name === "level-up");
    });

    // 2. Ordenar pelos que são aprendidos mais tarde (nível 100 -> nível 1)
    // Isso garante que pegamos os golpes mais "maduros" do Pokémon
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    naturalMoves.sort((a: any, b: any) => {
      // Pega o nível de aprendizado da última versão disponível (geralmente a mais recente)
      const levelA =
        a.version_group_details[a.version_group_details.length - 1]
          .level_learned_at;
      const levelB =
        b.version_group_details[b.version_group_details.length - 1]
          .level_learned_at;
      return levelB - levelA;
    });

    // 3. Pegar APENAS os Top 4 movimentos mais recentes
    // (Isso já inclui status moves fortes como Dragon Dance ou Swords Dance se forem level alto)
    const topMoves = naturalMoves.slice(0, 4);

    // 4. Buscar detalhes (Power, Type, Accuracy) apenas desses 4
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const movesPromises = topMoves.map((m: any) => getMoveDetails(m.move.url));
    const movesWithStats = await Promise.all(movesPromises);

    return movesWithStats;
  } catch (error) {
    console.error("Erro ao selecionar moves naturais:", error);
    return [{ name: "Tackle", power: 40, type: "normal", accuracy: 100 }];
  }
};
