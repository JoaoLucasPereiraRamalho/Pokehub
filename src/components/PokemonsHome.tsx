import { useState, useEffect } from "react";
import Card from "./Card";
import {
  getPokemonInfoCards,
  getPokemonPorNome,
  type PokemonInfoCard,
  type PokemonDetail,
} from "../services/PokemonService";

function PokemonsHome() {
  const [pokemons, setPokemons] = useState<PokemonInfoCard[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // Primeiro busca a lista básica de pokémons
        const basicData = await getPokemonInfoCards(8);
        setPokemons(basicData);

        // Depois busca os detalhes de cada um
        const detailsPromises = basicData.map((pokemon) =>
          getPokemonPorNome(pokemon.name)
        );

        const details = await Promise.all(detailsPromises);
        setPokemonDetails(details);
      } catch (error) {
        console.error("Erro ao carregar pokemons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Carregando...</div>;
  }

  return (
    <div
      style={{ backgroundColor: "#091D3C" }}
      className="container-fluid py-5"
    >
      <h1 className="d-flex justify-content-center py-5 text-white">
        Pokemons
      </h1>

      <div className="d-flex justify-content-center gap-3">
        {pokemonDetails.slice(0, 4).map((pokemon) => (
          <Card
            key={pokemon.id}
            pokemon={pokemon}
            bst={
              (pokemon.hp || 0) +
              (pokemon.attack || 0) +
              (pokemon.defense || 0) +
              (pokemon.specialAttack || 0) +
              (pokemon.specialDefense || 0) +
              (pokemon.speed || 0)
            }
            onDetailClick={(name) => console.log(`Detalhes de ${name}`)}
          />
        ))}
      </div>

      <div className="d-flex justify-content-center gap-3 mt-3">
        {pokemonDetails.slice(4, 8).map((pokemon) => (
          <Card
            key={pokemon.id}
            pokemon={pokemon}
            bst={
              (pokemon.hp || 0) +
              (pokemon.attack || 0) +
              (pokemon.defense || 0) +
              (pokemon.specialAttack || 0) +
              (pokemon.specialDefense || 0) +
              (pokemon.speed || 0)
            }
            onDetailClick={(name) => console.log(`Detalhes de ${name}`)}
          />
        ))}
      </div>

      <div className="d-flex justify-content-center">
        <button className="btn btn-success py-3 mt-5 w-25">
          <h3>Carregar mais</h3>
        </button>
      </div>
    </div>
  );
}

export default PokemonsHome;
