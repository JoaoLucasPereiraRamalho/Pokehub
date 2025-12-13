import { useState, useEffect } from "react";
import Card from "../cards/Card";
import Button from "../ui/Button";
import Loading from "../ui/Loading";

import { getPokemonPorNome } from "../../services/PokemonService";
import { type PokemonDetail } from "../../types";
import { useNavigate } from "react-router-dom";

function Compare() {
  const navigate = useNavigate();
  const [pokemon1, setPokemon1] = useState<PokemonDetail | null>(null);
  const [pokemon2, setPokemon2] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLegendaries = async () => {
      try {
        const [zekrom, ceruledge] = await Promise.all([
          getPokemonPorNome("zekrom"),
          getPokemonPorNome("ceruledge"),
        ]);

        setPokemon1(zekrom);
        setPokemon2(ceruledge);
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
      <div
        style={{ backgroundColor: "#091D3C", minHeight: "500px" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Loading />
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center p-5 p-md-5">
      {/* Container Principal */}
      <div
        className="d-flex flex-column flex-lg-row rounded-5 w-85 w-lg-85 align-items-center overflow-hidden bg-transparent"
        style={{
          minHeight: "450px",
          maxHeight: "1100px",
        }}
      >
        {/* Lado Esquerdo: Texto */}
        <div className="w-100 w-lg-40 p-4 p-md-5 text-center text-lg-start">
          <div className="w-100 mb-4 mb-md-0">
            <h1 className="text-white display-5 fw-bold text-uppercase">
              COMPARAR E <br /> DESCOBRIR!
            </h1>
            <h5
              className="mb-4 text-white-50 mt-3 fw-normal fs-6"
              style={{ lineHeight: "1.6" }}
            >
              Compare os status dos pokemons de maneira simples e rápida, veja
              de maneira dinâmica os melhores status, decida qual pokemon usar
              no seu time e descubra quais os pokemons mais fortes!
            </h5>
          </div>
          <div className="mt-4 mt-md-5">
            {/* Botão Azul Escuro Sólido */}
            <Button
              variant="linear-3"
              className="py-3 px-5 w-100 w-md-auto fw-bold rounded-pill"
              onClick={() => navigate("/Comparar")}
              style={{
                backgroundColor: "#031224",
                color: "white",
                border: "none",
                minWidth: "200px",
              }}
            >
              COMPARE JÁ
            </Button>
          </div>
        </div>

        {/* Lado Direito: Cards */}
        <div className="w-100 w-lg-60 d-flex flex-column flex-md-row p-4 gap-3 align-items-center justify-content-center">
          {/* Card 1 */}
          <div
            className="d-flex justify-content-center"
            style={{ width: "240px" }}
          >
            <Card
              pokemon={pokemon1}
              bst={pokemon1 ? calculateBST(pokemon1) : 0}
              onDetailClick={() => {}}
            />
          </div>

          <h1
            className="display-1 fw-bolder fst-italic text-white m-0"
            style={{
              fontSize: "5rem",
              // Sombra mais suave em azul escuro
              textShadow: "4px 4px 0 #031224, 0 0 30px rgba(0, 194, 203, 0.5)",
              letterSpacing: "-5px",
              fontFamily: "'Impact', sans-serif",
            }}
          >
            VS
          </h1>

          {/* Card 2 */}
          <div
            className="d-flex justify-content-center"
            style={{ width: "240px" }}
          >
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
