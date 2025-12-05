import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";

function BattleBanner() {
  const navigate = useNavigate();

  const leftPokemonImg =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/807.png"; // Zeraora
  const rightPokemonImg =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png"; // Lucario

  return (
    <div
      className="w-100 position-relative overflow-hidden d-flex align-items-center justify-content-center sombra-lg cursor-pointer group-hover"
      onClick={() => navigate("/Battle")}
      style={{
        minHeight: "500px",
        background:
          "linear-gradient(105deg, #FFD700 0%, #1E90FF 50%, #FF4500 50%, #8B0000 100%)",
        boxShadow: "inset 0 0 100px rgba(0,0,0,0.5)",
      }}
    >
      <div
        className="position-absolute w-100 h-100"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)",
          zIndex: 1,
        }}
      />

      <div
        className="container position-relative d-flex justify-content-center align-items-center h-100"
        style={{ zIndex: 2 }}
      >
        {/* POKEMON ESQUERDA */}
        <img
          src={leftPokemonImg}
          alt="Pokemon Left"
          className="position-absolute d-none d-md-block transition-all"
          style={{
            left: "5%",
            bottom: "0",
            height: "90%",
            objectFit: "contain",
            filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))",
            transform: "scaleX(-1)",
          }}
        />

        <div className="text-center position-relative" style={{ zIndex: 3 }}>
          <h1
            className="display-1 fw-bolder fst-italic text-white m-0"
            style={{
              fontSize: "8rem",
              textShadow: "4px 4px 0 #000, -2px -2px 0 #FF4500",
              letterSpacing: "-5px",
            }}
          >
            VS
          </h1>

          <h4 className="text-white text-uppercase fw-bold letter-spacing-2 mb-4 text-shadow">
            A Arena Suprema
          </h4>

          <div className="transition-all hover-scale">
            <Button
              variant="danger"
              className="px-5 py-3 fs-4 fw-bold rounded-pill sombra-red border-2 border-white"
            >
              BATALHAR AGORA
            </Button>
          </div>
        </div>
        <img
          src={rightPokemonImg}
          alt="Pokemon Right"
          className="position-absolute d-none d-md-block transition-all"
          style={{
            right: "5%",
            bottom: "0",
            height: "85%",
            objectFit: "contain",
            filter: "drop-shadow(0 0 20px rgba(255, 69, 0, 0.6))",
          }}
        />
      </div>

      <style>
        {`
          .cursor-pointer { cursor: pointer; }
          .group-hover:hover img { transform: scale(1.05); transition: transform 0.3s ease; }
          .group-hover:hover img.position-absolute[style*="scaleX(-1)"] { transform: scale(1.05) scaleX(-1) !important; }
        `}
      </style>
    </div>
  );
}

export default BattleBanner;
