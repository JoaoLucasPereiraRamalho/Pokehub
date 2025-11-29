import { useState, useEffect, useMemo } from "react";
import Pokedex from "../components/Pokedex";
import {
  getPokemonInfoCards,
  getPokemonPorNome,
  getDescricaoPokemonPorNome,
} from "../services/PokemonService";
import { filterPokemonsCombined } from "../utils/filters";
import { ALL_POKEMON_TYPES, POKEMON_GENERATIONS } from "../utils/constants";
import {
  type PokemonDetail,
  type DescricaoPokemon,
  type PokemonInfoCard,
} from "../types";

const PokedexPage = () => {
  const [allPokemons, setAllPokemons] = useState<PokemonInfoCard[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedGeneration, setSelectedGeneration] = useState<string | null>(
    null
  );

  const [pokemonDetalhes, setPokemonDetalhes] = useState<string>("bulbasaur");
  const [pokemonPesquisado, setPokemonPesquisado] = useState<string>("");
  const [pokemonDetail, setPokemonDetails] = useState<PokemonDetail | null>(
    null
  );
  const [descricaoPokemon, setDescricaoPokemon] =
    useState<DescricaoPokemon | null>(null);

  const allTypesList = ALL_POKEMON_TYPES;
  const allGenerationsList = POKEMON_GENERATIONS.map((g) => g.name);

  const filteredPokemons = useMemo(() => {
    return filterPokemonsCombined(
      allPokemons,
      searchTerm,
      selectedType,
      selectedGeneration
    );
  }, [allPokemons, searchTerm, selectedType, selectedGeneration]);

  // --- Chamadas de API ---

  // Carrega a lista inicial
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await getPokemonInfoCards(200);
        setAllPokemons(data);
        if (data.length > 0) setPokemonDetalhes(data[0].name);
      } catch (error) {
        console.error("Erro ao carregar lista Pokedex:", error);
      }
    };
    fetchPokemons();
  }, []);

  // Carrega detalhes do Pokémon selecionado
  useEffect(() => {
    const fetchData = async () => {
      if (!pokemonDetalhes) return;
      try {
        const descData = await getDescricaoPokemonPorNome(pokemonDetalhes);
        setDescricaoPokemon(descData);
        const detailData = await getPokemonPorNome(pokemonDetalhes);
        setPokemonDetails(detailData);
      } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
        setPokemonDetails(null);
        setDescricaoPokemon(null);
      }
    };
    fetchData();
  }, [pokemonDetalhes]);

  // Atualiza seleção quando pesquisa ou clica
  useEffect(() => {
    if (pokemonPesquisado) {
      setPokemonDetalhes(pokemonPesquisado);
    }
  }, [pokemonPesquisado]);

  return (
    <Pokedex
      pokemonDetail={pokemonDetail}
      descricaoPokemon={descricaoPokemon}
      pokemons={filteredPokemons}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onSelectPokemon={setPokemonPesquisado}
      selectedType={selectedType}
      onTypeChange={setSelectedType}
      allTypes={allTypesList}
      selectedGeneration={selectedGeneration}
      onGenerationChange={setSelectedGeneration}
      allGenerations={allGenerationsList}
    />
  );
};

export default PokedexPage;
