import { useEffect, useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import {
  getPokemonInfoCards,
  getPokemonPorNome,
  getDescricaoPokemonPorNome,
  filterPokemonsByName,
  filterPokemonsCombined,
  getItems,
  getItemInfoCards,
  filterItemsByName,
  getItemDetailByName,
  type ItemData,
  type ItemCardInfo,
  ALL_POKEMON_TYPES,
  POKEMON_GENERATIONS,
  type PokemonDetail,
  type DescricaoPokemon,
  type PokemonInfoCard,
  type ItemDetail,
} from "./services/PokemonService";
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

function App() {
  const allTypesList = ALL_POKEMON_TYPES;
  const allGenerationsList = POKEMON_GENERATIONS.map((g) => g.name);

  const [selectedType, setSelectedType] = useState<string | null>(null); // NOVO
  const [selectedGeneration, setSelectedGeneration] = useState<string | null>(
    null
  ); // NOVO

  const [pokemonDetalhes, setPokemonDetalhes] = useState<string>("bulbasaur");
  const [pokemonPesquisado, setPokemonPesquisado] = useState<string>("");
  const [pokemons, setPokemons] = useState<PokemonInfoCard[]>([]);
  const [pokemonDetail, setPokemonDetails] = useState<PokemonDetail | null>(
    null
  );
  const [descricaoPokemon, setDescricaoPokemon] =
    useState<DescricaoPokemon | null>(null);

  const [allPokemons, setAllPokemons] = useState<PokemonInfoCard[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Lista completa de todos os itens
  const [allItems, setAllItems] = useState<ItemCardInfo[]>([]);
  // Termo de busca para itens
  const [itemSearchTerm, setItemSearchTerm] = useState<string>("");

  const [selectedItemName, setSelectedItemName] = useState<string>("");
  const [itemDetail, setItemDetail] = useState<ItemDetail | null>(null);

  // USEMEMO PARA ITENS: Aplica a busca por nome na lista de itens.
  const filteredItems = useMemo(() => {
    return filterItemsByName(allItems, itemSearchTerm);
  }, [allItems, itemSearchTerm]);

  // EFEITO PARA CARREGAMENTO INICIAL DE ITENS
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const listData: ItemData[] = await getItems(50); // Busca os primeiros 50 itens (Limite)
        const cardsData: ItemCardInfo[] = await getItemInfoCards(listData);
        setAllItems(cardsData);
      } catch (error) {
        console.error("Erro ao carregar itens:", error);
      }
    };
    fetchItems();
  }, []);

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

  const filteredPokemons = useMemo(() => {
    // Usando a função combinada que você criou.
    return filterPokemonsCombined(
      allPokemons,
      searchTerm,
      selectedType,
      selectedGeneration
    );
  }, [allPokemons, searchTerm, selectedType, selectedGeneration]);

  useEffect(() => {
    const fetchPokemons = async () => {
      // Chama a função otimizada para buscar todos os dados dos cards.
      const data = await getPokemonInfoCards(200);
      // Salva na lista COMPLETA, que é a fonte para a filtragem.
      setAllPokemons(data);

      // Define o primeiro pokemon para ser exibido no painel lateral
      if (data.length > 0) {
        setPokemonDetalhes(data[0].name);
      }
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // 1. Busca a Descrição (para a div lateral)
      const descData = await getDescricaoPokemonPorNome(pokemonDetalhes);
      setDescricaoPokemon(descData);

      // 2. Busca os Detalhes (para a div lateral)
      const detailData = await getPokemonPorNome(pokemonDetalhes);
      setPokemonDetails(detailData);
    };

    // Só tenta buscar se o nome do Pokémon estiver definido
    if (pokemonDetalhes) {
      fetchData();
    }
  }, [pokemonDetalhes]);

  useEffect(() => {
    const fetchPokemonPorNome = async () => {
      const data = await getPokemonPorNome(pokemonPesquisado);
      setPokemonDetalhes(String(data.name));
    };
    fetchPokemonPorNome();
  }, [pokemonPesquisado]);

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/home"
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
        <Route
          path="/pokemons"
          element={
            <Pokedex
              pokemonDetail={pokemonDetail}
              pokemons={filteredPokemons}
              descricaoPokemon={descricaoPokemon}
              // NOVO: Passa o termo de busca e a função para atualizá-lo
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              // NOVO: Passa a função para selecionar um pokemon (opcional, mas bom para clicar no card)
              onSelectPokemon={setPokemonPesquisado}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              allTypes={allTypesList} // CORRIGIDO: Passa a lista de tipos
              // Props de Filtro de Geração
              selectedGeneration={selectedGeneration}
              onGenerationChange={setSelectedGeneration}
              allGenerations={allGenerationsList}
            />
          }
        />
        <Route path="/Noticias" element={<Noticias />} />
        <Route
          path="/Itens"
          element={
            <PageItens
              items={filteredItems}
              searchTerm={itemSearchTerm}
              onSearchChange={setItemSearchTerm}
              itemDetail={itemDetail} // Detalhes carregados pelo useEffect
              onSelectItem={setSelectedItemName} // Função para mudar o item selecionado
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
