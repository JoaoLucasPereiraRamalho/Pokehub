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
  let pokemonPesquisado: string = "bulbasaur";
  const [pokemons, setPokemons] = useState<PokemonInfoCard[]>([]);
  const [pokemonDetail, setPokemonDetails] = useState<PokemonDetail | null>(
    null
  );
  const [descricaoPokemon, setDescricaoPokemon] =
    useState<DescricaoPokemon | null>(null);

  const [allPokemons, setAllPokemons] = useState<PokemonInfoCard[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredPokemons = useMemo(() => {
    return filterPokemonsByName(allPokemons, searchTerm);
  }, [allPokemons, searchTerm]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const data = await getPokemonInfoCards(40); //o limite não sera sempre 20
      setPokemons(data);
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    const fetchDescricaoPorNome = async () => {
      const data = await getDescricaoPokemonPorNome(pokemonPesquisado); //não sera charmander, sera dinamico
      setDescricaoPokemon(data);
    };
    fetchDescricaoPorNome();
  }, []);

  useEffect(() => {
    const fetchPokemonPorNome = async () => {
      const data = await getPokemonPorNome(pokemonPesquisado); //não sera caterpie, sera dinamico
      setPokemonDetails(data);
    };
    fetchPokemonPorNome();
  }, []);

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
              pokemons={pokemons}
              descricaoPokemon={descricaoPokemon}
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
