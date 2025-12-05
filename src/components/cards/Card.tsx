import React, { useMemo } from "react";
import { type PokemonDetail } from "../../types";
import { getTypeColor } from "../../utils/constants";
import AsyncImage from "../ui/AsyncImage";

interface CardProps {
  pokemon: PokemonDetail | null;
  bst: number;
  onDetailClick: (name: string) => void;
}

/**
 * Função auxiliar para escurecer a cor e criar o gradiente.
 */
const adjustBrightness = (color: string, amount: number) => {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
};

const Card: React.FC<CardProps> = ({ pokemon, bst, onDetailClick }) => {
  // Cálculo do Gradiente
  const headerBackground = useMemo(() => {
    if (!pokemon) return "#ccc";

    const baseColor = getTypeColor(pokemon.type1);
    const darkerColor = adjustBrightness(baseColor, -85);

    return `linear-gradient(135deg, ${baseColor} 0%, ${darkerColor} 100%)`;
  }, [pokemon]);

  // --- ESTADO VAZIO (Placeholder) ---
  if (!pokemon) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center rounded-3 bg-light text-dark h-100"
        style={{ minHeight: "350px", border: "2px dashed #ccc" }}
      >
        <p className="text-muted fw-bold mb-0">Selecione um Pokémon</p>
      </div>
    );
  }

  return (
    <div
      className="rounded-3 overflow-hidden shadow-lg bg-white h-100 transition-all hover-scale"
      style={{ minWidth: "220px" }}
    >
      {/* --- TOPO COM GRADIENTE --- */}
      <div
        className="position-relative d-flex justify-content-center align-items-center"
        style={{
          background: headerBackground,
          height: "200px",
        }}
      >
        {/* Efeito de Textura */}
        <div
          className="position-absolute"
          style={{ opacity: 0.1, right: "-10%", top: "-10%", width: "150px" }}
        >
          <img src="/src/assets/pokeball-white.png" alt="" className="w-100" />
        </div>

        {/* ID */}
        <span
          className="position-absolute top-0 end-0 m-2 text-white fw-bold opacity-75 small"
          style={{ zIndex: 2 }}
        >
          #{pokemon.id.toString().padStart(3, "0")}
        </span>

        {/* Imagem do Pokémon */}
        <AsyncImage
          className="w-75 h-75 object-contain drop-shadow"
          src={pokemon.img}
          alt={pokemon.name}
          style={{ zIndex: 2 }}
        />
      </div>

      {/* --- CORPO BRANCO --- */}
      <div className="p-3">
        {/* Nome e Indicador de Tipo */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fs-4 fw-bold m-0 text-capitalize text-dark text-truncate">
            {pokemon.name}
          </h2>

          {/* Bolinha com a cor sólida base */}
          <span
            className="rounded-circle shadow-sm"
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: getTypeColor(pokemon.type1),
            }}
            title={`Tipo: ${pokemon.type1}`}
          />
        </div>

        {/* Botões e Stats */}
        <div className="d-flex gap-2 align-items-stretch">
          {/* Botão Ver Detalhes */}
          <div
            className="btn btn-dark rounded-3 flex-grow-1 d-flex align-items-center justify-content-between px-3 py-2 border-0 shadow-sm"
            onClick={() => onDetailClick(pokemon.name)}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex flex-column align-items-start lh-1">
              <span
                className="fw-bold"
                style={{ fontSize: "0.7rem", opacity: 0.8 }}
              >
                Ver
              </span>
              <span className="fw-bold" style={{ fontSize: "0.85rem" }}>
                Detalhes
              </span>
            </div>

            <span
              className="badge rounded-circle d-flex align-items-center justify-content-center text-white ms-1"
              style={{ width: 20, height: 20, backgroundColor: "#00b4d8" }}
            >
              <small style={{ fontSize: "0.6rem" }}>➜</small>
            </span>
          </div>

          {/* Coluna de Stats */}
          <div className="d-flex flex-column gap-1" style={{ width: "35%" }}>
            <div
              className="rounded-1 px-1 py-1 fw-bold text-center d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "#e9ecef",
                fontSize: "0.65rem",
                color: "#495057",
              }}
            >
              BST: {bst}
            </div>
            <div
              className="rounded-1 px-1 py-1 fw-bold text-center text-white"
              style={{ backgroundColor: "#adb5bd", fontSize: "0.65rem" }}
            >
              ★
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
