import type { ItemCardInfo, PokemonInfoCard, PokemonName } from "../types";

/**
 * Filtra a lista de Pokémon com base no termo de busca (nome).
 */
export const filterPokemonsByName = (
  allPokemons: PokemonInfoCard[],
  searchTerm: string
): PokemonInfoCard[] => {
  const lowerCaseSearch = searchTerm.trim().toLowerCase();
  if (!lowerCaseSearch) return allPokemons;

  return allPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(lowerCaseSearch)
  );
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
      const isType2 = pokemon.type2
        ? pokemon.type2.toLowerCase() === lowerCaseType
        : false;
      return isType1 || isType2;
    });
  }

  // 3. Filtra por Geração
  if (selectedGeneration) {
    currentFilter = currentFilter.filter(
      (pokemon) => pokemon.generation === selectedGeneration
    );
  }

  return currentFilter;
};

/**
 * Filtra a lista de Itens com base no termo de busca.
 */
export const filterItemsByName = (
  allItems: ItemCardInfo[],
  searchTerm: string
): ItemCardInfo[] => {
  const lowerCaseSearch = searchTerm.trim().toLowerCase();
  if (!lowerCaseSearch) return allItems;

  return allItems.filter((item) =>
    item.name.toLowerCase().includes(lowerCaseSearch)
  );
};

export const getSuggestions = (
  names: PokemonName[],
  input: string
): PokemonName[] => {
  if (input.length < 2) return [];
  const lowerInput = input.toLowerCase();
  return names
    .filter((p) => p.name.toLowerCase().startsWith(lowerInput))
    .slice(0, 5);
};
