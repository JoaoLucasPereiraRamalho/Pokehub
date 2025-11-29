import { useEffect, useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
// Importa o arquivo de estilos
import "./App.css";

// Importa todos os componentes
import Header from "./components/Header";
import InitialSection from "./components/InitialSection";
import PokemonsHome from "./components/PokemonsHome";
import Compare from "./components/Compare";
import FeaturedSection from "./components/FeaturedSection";
import News from "./components/News";
import Itens from "./components/Itens";
import Battle from "./components/Battle";
import Footer from "./components/Footer";
import Pokedex from "./components/Pokedex";
import Noticias from "./components/Noticias";
import PageItens from "./components/PageItens";
import ComparePage from "./components/ComparePage";

// =================================================================
// IMPORTS CORRIGIDOS (REFATORAÇÃO)
// =================================================================

// Tipos
import {
  type ItemData,
  type ItemCardInfo,
  type PokemonDetail,
  type DescricaoPokemon,
  type PokemonInfoCard,
  type ItemDetail,
  type PokemonName,
} from "./types";

// Funções de Filtro
import { filterPokemonsCombined, filterItemsByName } from "./utils/filters";

// Chamadas de API
import {
  getPokemonInfoCards,
  getPokemonPorNome,
  getDescricaoPokemonPorNome,
  getItems,
  getItemInfoCards,
  getItemDetailByName,
  getPokemonNameList,
} from "./services/PokemonService";

// Constantes (agora vêm da pasta 'utils/constants')
import { ALL_POKEMON_TYPES, POKEMON_GENERATIONS } from "./utils/constants";

function App() {
  // =====================================================================
  // CONSTANTES E CONFIGURAÇÕES INICIAIS
  // =====================================================================

  // Listas prontas para passar aos componentes de filtro
  const allTypesList = ALL_POKEMON_TYPES;
  const allGenerationsList = POKEMON_GENERATIONS.map((g) => g.name);

  // =====================================================================
  // ESTADOS DE POKÉMON GERAL E FILTRO
  // =====================================================================

  // Lista completa (fonte de verdade) de todos os Pokémon carregados para cards
  const [allPokemons, setAllPokemons] = useState<PokemonInfoCard[]>([]);

  // Estado para o termo de busca por nome na Pokédex
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Estados para filtros de Tipo e Geração
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedGeneration, setSelectedGeneration] = useState<string | null>(
    null
  );

  // =====================================================================
  // ESTADOS DE DETALHES DO POKÉMON SELECIONADO (Painel Lateral da Pokedéx)
  // =====================================================================

  // Nome do Pokémon cujos detalhes devem ser exibidos no painel lateral
  const [pokemonDetalhes, setPokemonDetalhes] = useState<string>("bulbasaur");

  // Armazena o nome do Pokémon pesquisado (usado para mudar o 'pokemonDetalhes')
  const [pokemonPesquisado, setPokemonPesquisado] = useState<string>("");

  // Detalhes completos e descrição do Pokémon selecionado
  const [pokemonDetail, setPokemonDetails] = useState<PokemonDetail | null>(
    null
  );
  const [descricaoPokemon, setDescricaoPokemon] =
    useState<DescricaoPokemon | null>(null);

  // =====================================================================
  // ESTADOS DE ITENS
  // =====================================================================

  // Lista completa de todos os itens carregados para cards
  const [allItems, setAllItems] = useState<ItemCardInfo[]>([]);

  // Termo de busca para itens na página de Itens
  const [itemSearchTerm, setItemSearchTerm] = useState<string>("");

  // Nome e detalhes do item selecionado para exibição detalhada
  const [selectedItemName, setSelectedItemName] = useState<string>("");
  const [itemDetail, setItemDetail] = useState<ItemDetail | null>(null);

  // =====================================================================
  // ESTADOS DE COMPARAÇÃO
  // =====================================================================

  // Lista de todos os nomes de Pokémon para popular os seletores (dropdowns)
  const [allPokemonNamesList, setAllPokemonNamesList] = useState<PokemonName[]>(
    []
  );

  // Nomes dos Pokémon selecionados para comparação
  const [selectedPokemon1Name, setSelectedPokemon1Name] =
    useState<string>("bulbasaur");
  const [selectedPokemon2Name, setSelectedPokemon2Name] =
    useState<string>("charmander");

  // Detalhes completos dos Pokémon para comparação
  const [pokemon1Detail, setPokemon1Detail] = useState<PokemonDetail | null>(
    null
  );
  const [pokemon2Detail, setPokemon2Detail] = useState<PokemonDetail | null>(
    null
  );

  // =====================================================================
  // USE MEMO (Filtros e Dados Computados)
  // =====================================================================

  /**
   * Filtra a lista principal de Pokémon cards
   */
  const filteredPokemons = useMemo(() => {
    return filterPokemonsCombined(
      allPokemons,
      searchTerm,
      selectedType,
      selectedGeneration
    );
  }, [allPokemons, searchTerm, selectedType, selectedGeneration]);

  /**
   * Filtra a lista principal de Itens cards
   */
  const filteredItems = useMemo(() => {
    return filterItemsByName(allItems, itemSearchTerm);
  }, [allItems, itemSearchTerm]);

  // =====================================================================
  // USE EFFECTS (Carregamento de Dados da API)
  // =====================================================================

  /**
   * Efeito para carregar a lista inicial de cards de Pokémon
   */
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // Busca os dados dos cards (limitado a 200)
        const data = await getPokemonInfoCards(200);
        setAllPokemons(data);

        // Define o primeiro pokemon para exibição inicial no painel lateral
        if (data.length > 0) {
          setPokemonDetalhes(data[0].name);
        }
      } catch (error) {
        console.error("Erro ao carregar lista de Pokémon cards:", error);
      }
    };
    fetchPokemons();
  }, []);

  /**
   * Efeito para buscar os detalhes e descrição do Pokémon selecionado
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Busca a Descrição
        const descData = await getDescricaoPokemonPorNome(pokemonDetalhes);
        setDescricaoPokemon(descData);

        // 2. Busca os Detalhes
        const detailData = await getPokemonPorNome(pokemonDetalhes);
        setPokemonDetails(detailData);
      } catch (error) {
        console.error(
          `Erro ao carregar detalhes de ${pokemonDetalhes}:`,
          error
        );
        setPokemonDetails(null);
        setDescricaoPokemon(null);
      }
    };

    if (pokemonDetalhes) {
      fetchData();
    }
  }, [pokemonDetalhes]);

  /**
   * Efeito para atualizar o painel lateral quando o usuário digita
   */
  useEffect(() => {
    const fetchPokemonPorNome = async () => {
      // Nota: Esta função apenas busca os dados para o painel,
      // mas o painel só é atualizado via `pokemonDetalhes`
      try {
        const data = await getPokemonPorNome(pokemonPesquisado);
        setPokemonDetalhes(String(data.name));
      } catch (error) {
        // Ignora erros de "não encontrado" durante a digitação
        // console.warn(`Pokémon "${pokemonPesquisado}" não encontrado.`);
      }
    };
    if (pokemonPesquisado) {
      fetchPokemonPorNome();
    }
  }, [pokemonPesquisado]);

  //EFEITOS DE COMPARAÇÃO

  /**
   * Efeito para carregar a lista completa de nomes de Pokémon,
   */
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const names = await getPokemonNameList();
        setAllPokemonNamesList(names);
      } catch (error) {
        console.error(
          "Erro ao carregar lista de nomes para comparação:",
          error
        );
      }
    };
    fetchNames();
  }, []);

  /**
   * Efeito para carregar detalhes do Pokémon 1 para comparação.
   */
  useEffect(() => {
    const fetchDetail1 = async () => {
      if (selectedPokemon1Name) {
        try {
          const data = await getPokemonPorNome(selectedPokemon1Name);
          setPokemon1Detail(data);
        } catch (error) {
          console.error(
            `Erro ao carregar detalhes do Pokémon 1: ${selectedPokemon1Name}`,
            error
          );
          setPokemon1Detail(null);
        }
      }
    };
    fetchDetail1();
  }, [selectedPokemon1Name]);

  /**
   * Efeito para carregar detalhes do Pokémon 2 para comparação.
   */
  useEffect(() => {
    const fetchDetail2 = async () => {
      if (selectedPokemon2Name) {
        try {
          const data = await getPokemonPorNome(selectedPokemon2Name);
          setPokemon2Detail(data);
        } catch (error) {
          console.error(
            `Erro ao carregar detalhes do Pokémon 2: ${selectedPokemon2Name}`,
            error
          );
          setPokemon2Detail(null);
        }
      }
    };
    fetchDetail2();
  }, [selectedPokemon2Name]);

  //EFEITOS DE ITENS
  /**
   * Efeito para carregar a lista inicial de cards de Itens
   */
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const listData: ItemData[] = await getItems(50); // Limite de 50 itens
        const cardsData: ItemCardInfo[] = await getItemInfoCards(listData);
        setAllItems(cardsData);
      } catch (error) {
        console.error("Erro ao carregar itens:", error);
      }
    };
    fetchItems();
  }, []);

  /**
   * Efeito para buscar os detalhes do item selecionado.
   * Roda toda vez que selectedItemName muda.
   */
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const detail = await getItemDetailByName(selectedItemName);
        setItemDetail(detail);
      } catch (error) {
        console.error(
          `Erro ao carregar detalhes do item ${selectedItemName}:`,
          error
        );
        setItemDetail(null);
      }
    };

    if (selectedItemName) {
      fetchItemDetails();
    }
  }, [selectedItemName]);

  // =====================================================================
  // RENDERIZAÇÃO E ROTAS
  // =====================================================================

  return (
    <div>
      <Header />
      <Routes>
        {/* Rota da Página Inicial (Home) */}
        <Route
          path="/"
          element={
            <>
              <InitialSection />
              <PokemonsHome />
              <Compare />
              <FeaturedSection />
              <News />
              <Itens />
              <Battle />
            </>
          }
        ></Route>

        {/* Rota da Pokédex (Filtros e Detalhes) */}
        <Route
          path="/pokemons"
          element={
            <Pokedex
              // Detalhes e Descrição do Painel Lateral
              pokemonDetail={pokemonDetail}
              descricaoPokemon={descricaoPokemon}
              // Lista de Pokémon filtrada
              pokemons={filteredPokemons}
              // Props de Busca por Nome
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onSelectPokemon={setPokemonPesquisado}
              // Props de Filtro de Tipo
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              allTypes={allTypesList}
              // Props de Filtro de Geração
              selectedGeneration={selectedGeneration}
              onGenerationChange={setSelectedGeneration}
              allGenerations={allGenerationsList}
            />
          }
        />

        {/* Rota de Notícias */}
        <Route path="/Noticias" element={<Noticias />} />

        {/* Rota de Itens (Filtros e Detalhes de Itens) */}
        <Route
          path="/Itens"
          element={
            <PageItens
              items={filteredItems}
              searchTerm={itemSearchTerm}
              onSearchChange={setItemSearchTerm}
              itemDetail={itemDetail}
              onSelectItem={setSelectedItemName}
            />
          }
        />

        {/* Rota de Comparação de Pokémon */}
        <Route
          path="/Comparar"
          element={
            <ComparePage
              pokemonNames={allPokemonNamesList}
              selectedPokemon1={selectedPokemon1Name}
              selectedPokemon2={selectedPokemon2Name}
              pokemon1Detail={pokemon1Detail}
              pokemon2Detail={pokemon2Detail}
              onSelectPokemon1={setSelectedPokemon1Name}
              onSelectPokemon2={setSelectedPokemon2Name}
            />
          }
        />

        {/* Rota de Batalha (Battle) */}
        <Route path="/Battle" element={<Battle />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
