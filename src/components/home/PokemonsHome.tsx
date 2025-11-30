import { useState, useEffect } from "react";
import Card from "../cards/Card";
import {
  getPokemonInfoCards,
  getPokemonPorNome,
  type PokemonInfoCard,
  type PokemonDetail,
} from "../../services/PokemonService";

function PokemonsHome() {
  // Estados para gerenciar dados e carregamento
  const [pokemons, setPokemons] = useState<PokemonInfoCard[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(true);

  // Efeito que roda uma vez para carregar os Pokémon
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // Busca dados básicos para 8 Pokémon
        const basicData = await getPokemonInfoCards(8);
        setPokemons(basicData);

        // Cria promises para buscar os detalhes de cada um
        const detailsPromises = basicData.map((pokemon) =>
          getPokemonPorNome(pokemon.name)
        );

        // Espera todos os detalhes serem carregados
        const details = await Promise.all(detailsPromises);
        setPokemonDetails(details);
      } catch (error) {
        console.error("Erro ao carregar pokemons:", error);
      } finally {
        // Termina o estado de carregamento
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []); // Array de dependências vazio: roda apenas no montagem

  // Exibe "Carregando..." enquanto os dados não chegam
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

      {/* Grid para exibir os cards */}
      <div
        className="row justify-content-center g-3 mx-auto"
        style={{ maxWidth: "1200px" }}
      >
        {/* Mapeia os detalhes para renderizar cada Card */}
        {pokemonDetails.map((pokemon) => (
          <div
            key={pokemon.id}
            className="col-6 col-md-3 d-flex justify-content-center"
          >
            <Card
              pokemon={pokemon}
              // Calcula o BST (Base Stat Total) para o card
              bst={
                (pokemon.hp || 0) +
                (pokemon.attack || 0) +
                (pokemon.defense || 0) +
                (pokemon.specialAttack || 0) +
                (pokemon.specialDefense || 0) +
                (pokemon.speed || 0)
              }
              onDetailClick={(name) => console.log(`Detalhes de ${name}`)} // Função de clique
            />
          </div>
        ))}
      </div>

      {/* Botão para carregar mais itens (funcionalidade futura) */}
      <div className="d-flex justify-content-center">
        <button className="btn-linear-2 py-3 mt-5 w-50 w-md-25 sombra">
          <h3>Carregar mais</h3>
        </button>
      </div>
    </div>
  );
}

export default PokemonsHome;
