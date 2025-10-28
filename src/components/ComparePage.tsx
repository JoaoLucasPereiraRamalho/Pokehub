import React, { useMemo, useState } from "react";
import {
  type PokemonDetail,
  type PokemonName,
} from "../services/PokemonService";
import CompareCircle from "./CompareCircle";
import Card from "./Card";

interface ComparePageProps {
  pokemonNames: PokemonName[];
  selectedPokemon1: string;
  selectedPokemon2: string;
  pokemon1Detail: PokemonDetail | null;
  pokemon2Detail: PokemonDetail | null;
  onSelectPokemon1: (name: string) => void;
  onSelectPokemon2: (name: string) => void;
}

const STAT_NAMES: Array<keyof PokemonDetail> = [
  "hp",
  "attack",
  "defense",
  "specialAttack",
  "specialDefense",
  "speed",
];

const STAT_MAP: { [key: string]: string } = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  specialAttack: "Sp. ATK",
  specialDefense: "Sp. DEF",
  speed: "SPD",
};

const getWinnerOrLoserClass = (
  statName: keyof PokemonDetail,
  p1: PokemonDetail | null,
  p2: PokemonDetail | null,
  isP1: boolean
): string => {
  if (!p1 || !p2) return "";

  const stat1 = p1[statName] as number;
  const stat2 = p2[statName] as number;

  if (stat1 === stat2) {
    return ""; // Empate, sem destaque
  }

  if (isP1) {
    if (stat1 > stat2) return "text-success fw-bold";
    if (stat1 < stat2) return "text-danger fw-bold";
  } else {
    if (stat2 > stat1) return "text-success fw-bold";
    if (stat2 < stat1) return "text-danger fw-bold";
  }

  return "";
};

const getSuggestions = (names: PokemonName[], input: string): PokemonName[] => {
  if (input.length < 2) return [];
  const lowerInput = input.toLowerCase();
  return names
    .filter((p) => p.name.toLowerCase().startsWith(lowerInput))
    .slice(0, 10);
};

const SearchInput: React.FC<{
  searchName: string;
  setSearchName: (name: string) => void;
  suggestions: PokemonName[];
  isPokemon1: boolean;
  onSelect: (name: string) => void;
}> = ({ searchName, setSearchName, suggestions, isPokemon1, onSelect }) => {
  const handleInputConfirm = (name: string) => {
    onSelect(name.toLowerCase().trim());
    setSearchName(name.toLowerCase().trim());
  };

  return (
    <div className="position-relative w-100 mb-0">
      <div className="input-group">
        <input
          type="text"
          className="form-control p-2 text-dark bg-white w-100 text-capitalize shadow-sm border-0"
          placeholder={
            isPokemon1 ? "Pesquise por Pokémon 1" : "Pesquise por Pokémon 2"
          }
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onBlur={() => {
            setTimeout(() => {
              const exactMatch = suggestions.find(
                (p) => p.name.toLowerCase() === searchName.toLowerCase()
              );
              if (exactMatch) {
                handleInputConfirm(exactMatch.name);
              }
            }, 150);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchName.trim()) {
              handleInputConfirm(searchName);
            }
          }}
        />
        <button
          className="btn btn-outline-secondary border-0 text-dark bg-warning shadow-sm"
          type="button"
          onClick={() => handleInputConfirm(searchName)}
          disabled={!searchName.trim()}
          style={{ width: "40px" }}
        >
          <i className="bi bi-search"></i>
        </button>
      </div>

      {suggestions.length > 0 && searchName.length >= 2 && (
        <ul
          className="list-group position-absolute w-100 mt-1 shadow-lg"
          style={{ zIndex: 1050 }}
        >
          {suggestions.map((p) => (
            <li
              key={p.name}
              className="list-group-item list-group-item-action text-capitalize text-start"
              onMouseDown={() => handleInputConfirm(p.name)}
              style={{ cursor: "pointer" }}
            >
              {p.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

function ComparePage({
  pokemonNames,
  selectedPokemon1,
  selectedPokemon2,
  pokemon1Detail,
  pokemon2Detail,
  onSelectPokemon1,
  onSelectPokemon2,
}: ComparePageProps) {
  const [searchName1, setSearchName1] = useState(selectedPokemon1);
  const [searchName2, setSearchName2] = useState(selectedPokemon2);

  const suggestions1 = useMemo(
    () => getSuggestions(pokemonNames, searchName1),
    [pokemonNames, searchName1]
  );
  const suggestions2 = useMemo(
    () => getSuggestions(pokemonNames, searchName2),
    [pokemonNames, searchName2]
  );

  const bst1 = useMemo(
    () =>
      pokemon1Detail
        ? STAT_NAMES.reduce(
            (sum, stat) => sum + (pokemon1Detail[stat] as number),
            0
          )
        : 0,
    [pokemon1Detail]
  );
  const bst2 = useMemo(
    () =>
      pokemon2Detail
        ? STAT_NAMES.reduce(
            (sum, stat) => sum + (pokemon2Detail[stat] as number),
            0
          )
        : 0,
    [pokemon2Detail]
  );

  const renderStatBars = (pokemon: PokemonDetail | null, isP1: boolean) => {
    if (!pokemon)
      return (
        <div className="p-4 text-center text-muted">Aguardando seleção...</div>
      );
    const maxStat = 255;

    // Determina a cor da barra com base no Pokémon:
    const barColor = isP1 ? "#4CAF50" : "#F44336";

    return (
      <div className="w-100 px-3">
        {STAT_NAMES.map((statName) => {
          const value = pokemon[statName] as number;
          const label = STAT_MAP[statName as keyof typeof STAT_MAP];
          const percentage = (value / maxStat) * 100;

          return (
            <div key={statName} className="mb-3">
              <div className="d-flex justify-content-between mb-1">
                <span className="fw-semibold text-uppercase">{label}</span>
                <small className="text-white">{value}</small>
              </div>
              <div className="stat-bar-container">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: barColor,
                  }}
                  aria-valuenow={value}
                  aria-valuemin={0}
                  aria-valuemax={maxStat}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderComparisonStats = () => {
    if (!pokemon1Detail || !pokemon2Detail) {
      return (
        <p className="text-white text-center mt-5 fs-5 fw-semibold">
          Selecione dois Pokémon nos menus acima para iniciar a comparação.
        </p>
      );
    }

    return (
      <div className="w-100 mt-5 p-4 bg-white rounded-3 shadow-lg">
        <h2 className="fs-3 fw-bold text-center mb-4 text-dark">
          Tabela de Estatísticas Base
        </h2>

        <table className="table table-bordered table-striped text-center">
          <thead>
            <tr className="table-secondary">
              <th className="py-2 px-3 align-middle text-start">Estatística</th>
              <th className="py-2 px-3 align-middle">{pokemon1Detail.name}</th>
              <th className="py-2 px-3 align-middle">{pokemon2Detail.name}</th>
            </tr>
          </thead>
          <tbody>
            {STAT_NAMES.map((statName) => (
              <tr key={statName}>
                <td className="py-3 px-4 fw-semibold text-start text-capitalize">
                  {STAT_MAP[statName as keyof typeof STAT_MAP]}
                </td>
                <td
                  className={`py-3 px-4 ${getWinnerOrLoserClass(
                    // Chamada da nova função
                    statName,
                    pokemon1Detail,
                    pokemon2Detail,
                    true
                  )}`}
                >
                  {pokemon1Detail[statName] as number}
                </td>
                <td
                  className={`py-3 px-4 ${getWinnerOrLoserClass(
                    // Chamada da nova função
                    statName,
                    pokemon1Detail,
                    pokemon2Detail,
                    false
                  )}`}
                >
                  {pokemon2Detail[statName] as number}
                </td>
              </tr>
            ))}

            <tr className="fw-bold border-top border-3 border-primary">
              <td className="py-3 px-4 text-dark fs-5 text-start">Total BST</td>
              <td
                className={`py-3 px-4 fs-5 ${
                  bst1 > bst2
                    ? "text-success fw-bold" // P1 BST é maior
                    : bst1 < bst2
                    ? "text-danger fw-bold" // P1 BST é menor
                    : "" // Empate
                }`}
              >
                {bst1}
              </td>
              {/* P2 BST */}
              <td
                className={`py-3 px-4 fs-5 ${
                  bst2 > bst1
                    ? "text-success fw-bold" // P2 BST é maior
                    : bst2 < bst1
                    ? "text-danger fw-bold" // P2 BST é menor
                    : "" // Empate
                }`}
              >
                {bst2}
              </td>
            </tr>
          </tbody>
        </table>

        <p className="text-sm text-muted mt-3 text-center">
          <span className="text-success fw-bold">Verde</span> indica a
          estatística mais alta.{" "}
          <span className="text-danger fw-bold">Vermelho</span> indica a
          estatística mais baixa.
        </p>
      </div>
    );
  };

  return (
    <div className="min-vh-100 fundo-degrade text-white p-5">
      <div className="container-fluid mx-auto">
        <div className="d-flex justify-content-center mb-5">
          <h1 className="fs-1 fw-bold mb-2">COMPARE JÁ!</h1>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-5">
          <div
            className="d-flex flex-column align-items-center bg-light rounded-4 shadow-lg p-5"
            style={{ width: "400px", maxWidth: "45%" }}
          >
            <SearchInput
              searchName={searchName1}
              setSearchName={setSearchName1}
              suggestions={suggestions1}
              isPokemon1={true}
              onSelect={onSelectPokemon1}
            />
            <Card
              pokemon={pokemon1Detail}
              bst={bst1}
              onDetailClick={() => {}}
            />
          </div>

          <span className="fs-3 fw-bold text-white d-none d-sm-block">VS</span>

          <div
            className="d-flex flex-column align-items-center bg-light rounded-4 shadow-lg p-5"
            style={{ width: "400px", maxWidth: "45%" }}
          >
            <SearchInput
              searchName={searchName2}
              setSearchName={setSearchName2}
              suggestions={suggestions2}
              isPokemon1={false}
              onSelect={onSelectPokemon2}
            />
            <Card
              pokemon={pokemon2Detail}
              bst={bst2}
              onDetailClick={() => {}}
            />
          </div>
        </div>

        <div className="row text-white mt-5 pt-5 align-items-center">
          <div className="col-sm-12 col-md-5">
            <h5 className="text-uppercase text-center mb-4 text-success">
              Estatísticas de {pokemon1Detail?.name || "Pokémon 1"}
            </h5>
            {renderStatBars(pokemon1Detail, true)}
          </div>

          <div className="col-sm-12 col-md-2 d-flex justify-content-center align-items-center my-4">
            <CompareCircle
              pokemon1={pokemon1Detail}
              pokemon2={pokemon2Detail}
            />
          </div>

          <div className="col-sm-12 col-md-5">
            <h5 className="text-uppercase text-center mb-4 text-danger">
              Estatísticas de {pokemon2Detail?.name || "Pokémon 2"}
            </h5>
            {renderStatBars(pokemon2Detail, false)}
          </div>
        </div>

        {renderComparisonStats()}
      </div>
    </div>
  );
}

export default ComparePage;
