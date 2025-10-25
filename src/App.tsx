import { useEffect, useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import {
  getPokemonInfoCards,
  getPokemonPorNome,
  getDescricaoPokemonPorNome,
  filterPokemonsByName,
  type PokemonDetail,
  type DescricaoPokemon,
  type PokemonInfoCard,
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

function App() {
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

  const filteredPokemons = useMemo(() => {
    // A função de filtro é chamada apenas quando a lista completa (allPokemons)
    // ou o termo de busca (searchTerm) muda.
    return filterPokemonsByName(allPokemons, searchTerm);
  }, [allPokemons, searchTerm]);

  useEffect(() => {
    const fetchPokemons = async () => {
      // Chama a função otimizada para buscar todos os dados dos cards.
      const data = await getPokemonInfoCards(40);
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
            />
          }
        />
      </Routes>
      <Footer />
      <div>
        <h1>Lista de Pokemons</h1>
        {pokemons.map((pokemon) => (
          <div key={pokemon.name}>
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
      <div>
        <h1>Lista de Descricoes</h1>

        <p>{descricaoPokemon ? descricaoPokemon.flavor_text : "loading"}</p>
      </div>
      <div>
        <h1>Detalhes Pokemon</h1>
        <div key={pokemonDetail ? pokemonDetail.id : "loading"}>
          <p>Id: {pokemonDetail ? pokemonDetail.id : "loading"}</p>
          <p>height: {pokemonDetail ? pokemonDetail.height : "loading"}</p>
          <p>weight: {pokemonDetail ? pokemonDetail.weight : "loading"}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
