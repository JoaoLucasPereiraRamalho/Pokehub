import React from "react";
import { type PokemonDetail } from "../../types";
// Importamos do centralizador
import { STAT_DISPLAY_NAMES, STAT_KEYS } from "../../utils/constants";

interface StatusProps {
  pokemonDetail: PokemonDetail | null;
}

const Status: React.FC<StatusProps> = ({ pokemonDetail }) => {
  if (!pokemonDetail) {
    return (
      <div className="w-100 text-center">
        <p className="text-muted small">Carregando estatísticas...</p>
      </div>
    );
  }

  return (
    <div className="w-100 d-flex flex-column">
      <h6>STATS</h6>
      <div className="d-flex w-100 gap-1 justify-content-between">
        {/* Usamos a lista global STAT_KEYS para iterar */}
        {STAT_KEYS.map((statKey) => {
          // Precisamos fazer um cast para garantir que a chave existe no objeto
          const key = statKey as keyof PokemonDetail;
          const label = STAT_DISPLAY_NAMES[key];
          const value = pokemonDetail[key] as number | undefined;

          return (
            <div
              key={key}
              className="bg-light rounded-5 d-flex flex-column align-items-center p-1 sombra"
              style={{ flexGrow: 1 }}
            >
              <button
                className="btn btn-dark rounded-circle w-100 p-1"
                style={{ aspectRatio: "1 / 1", fontSize: "0.7rem" }}
              >
                {label}
              </button>
              <p className="px-1 py-1 fw-bold small text-dark m-0">
                {value ?? "—"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Status;
