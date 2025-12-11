import { useState, useEffect } from "react";
import Card from "../cards/Card";
import Button from "../ui/Button";
import Loading from "../ui/Loading";
import {
  getPokemonInfoCards,
  getPokemonPorNome,
} from "../../services/PokemonService";
import { type PokemonDetail } from "../../types";

function PokemonsHome() {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const basicData = await getPokemonInfoCards(8);

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
    return <Loading />;
  }

  return (
    <div className="container-fluid py-5">
      <h1 className="d-flex justify-content-center py-5 text-white">
        Pokemons
      </h1>

      <div
        className="row justify-content-center g-3 mx-auto"
        style={{ maxWidth: "950px" }}
      >
        {pokemonDetails.map((pokemon) => (
          <div
            key={pokemon.id}
            className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center"
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

      {/* Botão para carregar mais itens usando o componente Button novo */}
      <div className="d-flex justify-content-center mt-5">
        <Button variant="linear-2" className="w-25 w-md-25 py-3">
          <h3 className="m-0 fs-4">Carregar mais</h3>
        </Button>
      </div>
    </div>
  );
}

export default PokemonsHome;
