import { useState, useEffect } from "react";
import Card from "../cards/Card";
import {
  getPokemonPorNome,
  type PokemonDetail,
} from "../../services/PokemonService";

function Compare() {
  const [pokemon1, setPokemon1] = useState<PokemonDetail | null>(null);
  const [pokemon2, setPokemon2] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLegendaries = async () => {
      try {
        const [dialga, rayquaza] = await Promise.all([
          getPokemonPorNome("dialga"),
          getPokemonPorNome("rayquaza"),
        ]);

        setPokemon1(dialga);
        setPokemon2(rayquaza);
      } catch (error) {
        console.error("Erro ao carregar pokémons lendários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLegendaries();
  }, []);

  const calculateBST = (pokemon: PokemonDetail) => {
    return (
      (pokemon.hp || 0) +
      (pokemon.attack || 0) +
      (pokemon.defense || 0) +
      (pokemon.specialAttack || 0) +
      (pokemon.specialDefense || 0) +
      (pokemon.speed || 0)
    );
  };

  if (loading) {
    return <div className="text-white text-center">Carregando...</div>;
  }

  return (
    <div
      style={{ backgroundColor: "#091D3C" }}
      className="d-flex justify-content-center p-3 p-md-5"
    >
      <div className="bg-transparent d-flex flex-column flex-md-row rounded-5 w-100 w-lg-85">
        <div className="w-100 w-md-40 p-4 p-md-5 text-center text-md-start">
          <div className="w-100 mb-4 mb-md-0">
            <h1 className="text-white display-5 display-md-3 fw-bold">
              COMPARAR E DESCOBRIR!
            </h1>
            <h5 className="mb-4 text-white mt-1">
              Compare os status dos pokemons de maneira simples e rápida, veja
              de maneira dinamica os melhores status, decida qual pokemon usar
              no seu time e descubra quais os pokemons mais fortes!
            </h5>
          </div>
          <div className="mt-4 mt-md-5">
            <button className="btn-linear-2 py-4 w-100 w-md-75 sombra">
              COMPARE JÁ
            </button>
          </div>
        </div>
        <div className="w-100 w-md-60 d-flex flex-column flex-md-row p-4 p-md-5 gap-3 align-items-center justify-content-center">
          <Card
            pokemon={pokemon1}
            bst={pokemon1 ? calculateBST(pokemon1) : 0}
            onDetailClick={(name) => console.log(`Detalhes de ${name}`)}
          />
          <h1 className="text-white my-3 my-md-0">VS</h1>
          <Card
            pokemon={pokemon2}
            bst={pokemon2 ? calculateBST(pokemon2) : 0}
            onDetailClick={(name) => console.log(`Detalhes de ${name}`)}
          />
        </div>
      </div>
    </div>
  );
}

export default Compare;
