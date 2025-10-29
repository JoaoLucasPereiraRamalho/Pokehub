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

  // A partir daqui, reestruturamos o layout para garantir a responsividade
  // Vamos mapear todos os 8 cards em um único contêiner flexível que quebra.
  // Usamos 'row' e classes 'col-' para controle total.

  return (
    <div
      style={{ backgroundColor: "#091D3C" }}
      className="container-fluid py-5"
    >
      <h1 className="d-flex justify-content-center py-5 text-white">
        Pokemons
      </h1>

      {/* NOVO LAYOUT DE CARDS: Usa 'row' para quebrar e 'g-3' para espaçamento (gap) */}
      {/* 'justify-content-center' garante que as linhas incompletas fiquem centralizadas */}
      <div
        className="row justify-content-center g-3 mx-auto"
        style={{ maxWidth: "1200px" }}
      >
        {pokemonDetails.map((pokemon) => (
          // col-6: Ocupa 50% da largura (2 cards por linha) no X-Small.
          // col-md-3: Ocupa 25% da largura (4 cards por linha) no Medium e Large.
          <div
            key={pokemon.id}
            className="col-6 col-md-3 d-flex justify-content-center"
          >
            <Card
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
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center">
        <button className="btn-linear-2 py-3 mt-5 w-50 w-md-25 sombra">
          <h3>Carregar mais</h3>
        </button>
      </div>
    </div>
  );
}

export default PokemonsHome;
