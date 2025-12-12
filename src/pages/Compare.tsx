import { useState, useEffect } from "react";
import ComparePageVisual from "../components/CompareView";
import {
  getPokemonNameList,
  getPokemonPorNome,
} from "../services/PokemonService";
import { type PokemonName, type PokemonDetail } from "../types";

const ComparePageWrapper = () => {
  const [allPokemonNamesList, setAllPokemonNamesList] = useState<PokemonName[]>(
    []
  );
  const [selectedPokemon1Name, setSelectedPokemon1Name] =
    useState<string>("alakazam");
  const [selectedPokemon2Name, setSelectedPokemon2Name] =
    useState<string>("tyranitar");

  const [pokemon1Detail, setPokemon1Detail] = useState<PokemonDetail | null>(
    null
  );
  const [pokemon2Detail, setPokemon2Detail] = useState<PokemonDetail | null>(
    null
  );

  // Carregar lista de nomes para o autocomplete
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const names = await getPokemonNameList();
        setAllPokemonNamesList(names);
      } catch (error) {
        console.error("Erro ao carregar nomes:", error);
      }
    };
    fetchNames();
  }, []);

  // Carregar Pokemon 1
  useEffect(() => {
    const fetchDetail1 = async () => {
      if (!selectedPokemon1Name) return;
      try {
        const data = await getPokemonPorNome(selectedPokemon1Name);
        setPokemon1Detail(data);
      } catch (error) {
        console.error("Erro ao carregar Pokemon 1:", error);
        setPokemon1Detail(null);
      }
    };
    fetchDetail1();
  }, [selectedPokemon1Name]);

  // Carregar Pokemon 2
  useEffect(() => {
    const fetchDetail2 = async () => {
      if (!selectedPokemon2Name) return;
      try {
        const data = await getPokemonPorNome(selectedPokemon2Name);
        setPokemon2Detail(data);
      } catch (error) {
        console.error("Erro ao carregar Pokemon 2:", error);
        setPokemon2Detail(null);
      }
    };
    fetchDetail2();
  }, [selectedPokemon2Name]);

  return (
    <ComparePageVisual
      pokemonNames={allPokemonNamesList}
      selectedPokemon1={selectedPokemon1Name}
      selectedPokemon2={selectedPokemon2Name}
      pokemon1Detail={pokemon1Detail}
      pokemon2Detail={pokemon2Detail}
      onSelectPokemon1={setSelectedPokemon1Name}
      onSelectPokemon2={setSelectedPokemon2Name}
    />
  );
};

export default ComparePageWrapper;
