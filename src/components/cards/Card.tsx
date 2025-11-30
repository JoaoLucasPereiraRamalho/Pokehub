import React, { useMemo } from "react";
import { type PokemonDetail } from "../../types";
// Importamos a função de cor centralizada
import { getTypeColor } from "../../utils/constants";

interface CardProps {
  pokemon: PokemonDetail | null;
  bst: number;
  onDetailClick: (name: string) => void;
}

const Card: React.FC<CardProps> = ({ pokemon, bst, onDetailClick }) => {
  // Calculamos a cor exata usando a constante
  const cardColor = useMemo(() => {
    return getTypeColor(pokemon?.type1);
  }, [pokemon]);

  if (!pokemon) {
    return (
      <div
        style={{ width: 250, height: 250 }}
        className="d-flex flex-column align-items-center justify-content-center bg-light p-3 rounded-3 text-dark shadow-lg"
      >
        <p className="text-muted mb-0">Selecione um Pokémon.</p>
      </div>
    );
  }

  return (
    <div
      style={{ minWidth: 200, overflow: "hidden", backgroundColor: cardColor }} // APLICAMOS A COR AQUI
      className="rounded-3 sombra" // Removemos as classes bg-secondary, bg-success, etc
    >
      <div className="position-relative text-white p-2">
        <h6 className="position-absolute end-0 m-2 fw-bold">
          #{pokemon.id.toString().padStart(3, "0")}
        </h6>
        <img
          className="w-100 img-fluid mx-auto d-block h-75"
          src={pokemon.img}
          alt={pokemon.name}
          style={{ maxHeight: 300 }}
        />
      </div>

      <div className="bg-light p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fs-3 fw-bold text-black m-0 text-capitalize">
            {pokemon.name}
          </h2>
          <span
            className="text-white p-2 rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: 30, height: 30, backgroundColor: cardColor }} // Badge com a mesma cor
          >
            <small className="text-uppercase">
              {pokemon.abilitie1.charAt(0)}
            </small>
          </span>
        </div>

        <div className="d-flex gap-2 mt-3">
          <div
            className="btn btn-dark rounded-3 flex-grow-1 d-flex align-items-center justify-content-between p-2"
            onClick={() => onDetailClick(pokemon.name)}
            style={{ cursor: "pointer" }}
          >
            <h6 className="text-white m-0">Ver Detalhes</h6>
            <span
              className="badge bg-info rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: 25, height: 25 }}
            >
              i
            </span>
          </div>

          <div className="d-flex flex-column gap-2" style={{ width: "40%" }}>
            <button
              className="border-0 text-white rounded-pill px-3 py-1 fw-bold"
              style={{ backgroundColor: cardColor }} // Botão BST com a cor do tipo
            >
              BST: {bst}
            </button>
            <button className="border-0 bg-dark text-white rounded-pill px-3 py-1 fw-bold">
              A
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
