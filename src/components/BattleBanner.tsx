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
      className="w-100 position-relative overflow-hidden d-flex align-items-center justify-content-center cursor-pointer group-hover"
      onClick={() => navigate("/Battle")}
      style={{
        minHeight: "500px",
        background:
          "linear-gradient(135deg, #091D3C 0%, #1a2a6c 50%, #2a5298 100%)",
        boxShadow: "inset 0 0 50px rgba(0,0,0,0.5)",
      }}
    >
      {/* Elementos de Fundo */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          background:
            "radial-gradient(circle at center, rgba(42, 82, 152, 0.4) 0%, transparent 70%)",
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
          alt="Zeraora"
          className="position-absolute d-none d-md-block transition-all"
          style={{
            left: "5%",
            bottom: "0",
            height: "90%",
            objectFit: "contain",
            filter: "drop-shadow(0 0 20px rgba(0, 194, 203, 0.4))",
            transform: "scaleX(-1)",
          }}
        />

        {/* CENTRO */}
        <div className="text-center position-relative" style={{ zIndex: 3 }}>
          <h1
            className="display-1 fw-bolder fst-italic text-white m-0"
            style={{
              fontSize: "8rem",
              textShadow: "4px 4px 0 #031224, 0 0 30px rgba(0, 194, 203, 0.5)",
              letterSpacing: "-5px",
              fontFamily: "'Impact', sans-serif",
            }}
          >
            VS
          </h1>

          <h4 className="text-white text-uppercase fw-bold letter-spacing-2 mb-4 text-shadow opacity-75">
            Desafie seus limites
          </h4>

          <div className="transition-all hover-scale">
            {/* Botão Azul Vibrante */}
            <Button
              variant="primary"
              className="px-5 py-3 fs-4 fw-bold rounded-pill border-2 border-white shadow-lg"
              style={{
                background: "linear-gradient(90deg, #00C2CB 0%, #2a5298 100%)",
                boxShadow: "0 0 20px rgba(0, 194, 203, 0.4)",
              }}
            >
              BATALHAR AGORA
            </Button>
          </div>
        </div>

        {/* POKEMON DIREITA */}
        <img
          src={rightPokemonImg}
          alt="Lucario"
          className="position-absolute d-none d-md-block transition-all"
          style={{
            right: "5%",
            bottom: "0",
            height: "85%",
            objectFit: "contain",
            filter: "drop-shadow(0 0 20px rgba(42, 82, 152, 0.6))",
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
