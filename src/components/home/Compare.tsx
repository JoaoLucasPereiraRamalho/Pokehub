import { useState, useEffect } from "react";
// Imports atualizados para a nova estrutura
import Card from "../cards/Card";
import Button from "../ui/Button";
import Loading from "../ui/Loading";

import { getPokemonPorNome } from "../../services/PokemonService";
import { type PokemonDetail } from "../../types";

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
    return (
      // Um container menor para o banner não ficar gigante no loading
      <div
        style={{ backgroundColor: "#091D3C", minHeight: "500px" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Loading />
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: "#091D3C" }}
      className="d-flex justify-content-center p-3 p-md-5"
    >
      {/* Container Principal "Vidro" */}
      {/* MUDANÇA: flex-lg-row (Só fica lado a lado em telas GRANDES). 
          Em tablets e celulares, fica coluna (um em cima do outro) */}
      <div className="bg-transparent d-flex flex-column flex-lg-row rounded-5 w-100 w-lg-85 align-items-center overflow-hidden">
        {/* Lado Esquerdo: Texto */}
        {/* MUDANÇA: w-lg-40. Centraliza texto no mobile/tablet */}
        <div className="w-100 w-lg-40 p-4 p-md-5 text-center text-lg-start">
          <div className="w-100 mb-4 mb-md-0">
            <h1 className="text-white display-5 fw-bold">
              COMPARAR E DESCOBRIR!
            </h1>
            <h5 className="mb-4 text-white mt-3 fw-light">
              Compare os status dos pokemons de maneira simples e rápida, veja
              de maneira dinâmica os melhores status, decida qual pokemon usar
              no seu time e descubra quais os pokemons mais fortes!
            </h5>
          </div>
          <div className="mt-4 mt-md-5">
            <Button
              variant="linear-2"
              className="py-3 px-5 w-100 w-md-auto sombra"
            >
              COMPARE JÁ
            </Button>
          </div>
        </div>

        {/* Lado Direito: Cards */}
        {/* MUDANÇA: Flex-wrap permite que os cards caiam para baixo se faltar espaço extremo */}
        <div className="w-100 w-lg-60 d-flex flex-column flex-md-row p-4 gap-3 align-items-center justify-content-center">
          {/* Wrapper para garantir que o card não estoure */}
          <div className="d-flex justify-content-center w-100 w-md-auto">
            <Card
              pokemon={pokemon1}
              bst={pokemon1 ? calculateBST(pokemon1) : 0}
              onDetailClick={() => {}}
            />
          </div>

          <h1 className="text-white my-3 my-md-0 fw-bold fst-italic">VS</h1>

          <div className="d-flex justify-content-center w-100 w-md-auto">
            <Card
              pokemon={pokemon2}
              bst={pokemon2 ? calculateBST(pokemon2) : 0}
              onDetailClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Compare;
