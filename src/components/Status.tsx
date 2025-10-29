import React from "react";
import { type PokemonDetail } from "../services/PokemonService";

interface StatusProps {
  pokemonDetail: PokemonDetail | null;
}

// Mapeamento das estatísticas para seus rótulos de botão
const STAT_LABELS: { [key: string]: string } = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  specialAttack: "SpA",
  specialDefense: "SpD",
  speed: "SPD",
};

// Array na ordem correta para iteração
const STAT_KEYS: Array<keyof PokemonDetail> = [
  "hp",
  "attack",
  "defense",
  "specialAttack",
  "specialDefense",
  "speed",
];

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
        {STAT_KEYS.map((statKey) => {
          const label = STAT_LABELS[statKey];
          const value = pokemonDetail[statKey] as number | undefined;

          return (
            <div
              key={statKey}
              className="bg-light rounded-5 d-flex flex-column align-items-center p-1 sombra"
              style={{ flexGrow: 1 }}
            >
              <button
                className="btn btn-dark rounded-circle w-100 p-1"
                style={{ aspectRatio: "1 / 1" }}
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
