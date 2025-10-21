import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import {
  getPokemons,
  getPokemonPorNome,
  type PokemonDetail,
} from "./services/PokemonService";
import InitialSection from "./components/InitialSection";
import PokemonsHome from "./components/PokemonsHome";
import Compare from "./components/Compare";
import FeaturedSection from "./components/FeaturedSection";
import News from "./components/News";
import Itens from "./components/Itens";
import Battle from "./components/Battle";
import Footer from "./components/Footer";

function App() {
  const [pokemons, setPokemons] = useState<{ name: string; url: string }[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail | null>(
    null
  );

  useEffect(() => {
    const fetchPokemons = async () => {
      const data = await getPokemons(20); //o limite não sera sempre 20
      setPokemons(data);
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    const fetchPokemonPorNome = async () => {
      const data = await getPokemonPorNome("charmander"); //não sera caterpie, sera dinamico
      setPokemonDetails(data);
    };
    fetchPokemonPorNome();
  }, []);

  return (
    <div>
      <Header />
      <InitialSection />
      <PokemonsHome />
      <Compare />
      <FeaturedSection />
      <News />
      <Itens />
      <Battle />
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
        <h1>Detalhes Pokemon</h1>
        <div key={pokemonDetails ? pokemonDetails.id : "loading"}>
          <p>Id: {pokemonDetails ? pokemonDetails.id : "loading"}</p>
          <p>height: {pokemonDetails ? pokemonDetails.height : "loading"}</p>
          <p>weight: {pokemonDetails ? pokemonDetails.weight : "loading"}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
