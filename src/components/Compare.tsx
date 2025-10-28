import { useState, useEffect } from "react";
import Card from "./Card";
import {
  getPokemonPorNome,
  type PokemonDetail,
} from "../services/PokemonService";

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
      className="d-flex justify-content-center card-compare"
    >
      <div className="m-5 bg-transparent d-flex rounded-5 w-85">
        <div className="w-40 m-5">
          <div className="w-100 h-75">
            <h1 className="text-white display-3 fw-bold">
              COMPARAR E DESCOBRIR!
            </h1>
            <h5 className="mb-5 text-white">
              Compare os status dos pokemons de maneira simples e rápida
            </h5>
          </div>
          <div className="d-flex flex-column-reverse h-25">
            <button className="btn-linear-2 py-4 w-75 sombra">
              COMPARE JÁ
            </button>
          </div>
        </div>
        <div className="w-60 d-flex p-5 gap-3 align-items-center justify-content-center">
          <Card
            pokemon={pokemon1}
            bst={pokemon1 ? calculateBST(pokemon1) : 0}
            onDetailClick={(name) => console.log(`Detalhes de ${name}`)}
          />
          <h1 className="text-white">VS</h1>
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
