import React, { useMemo, useState } from "react";
import {
  type PokemonDetail,
  type PokemonName,
} from "../services/PokemonService";
import CompareCircle from "./CompareCircle"; // Componente do gráfico de radar
import Card from "./Card"; // Componente Card adaptado

// Define as propriedades que este componente receberá do App.tsx
interface ComparePageProps {
  pokemonNames: PokemonName[];
  selectedPokemon1: string;
  selectedPokemon2: string;
  pokemon1Detail: PokemonDetail | null;
  pokemon2Detail: PokemonDetail | null;
  onSelectPokemon1: (name: string) => void;
  onSelectPokemon2: (name: string) => void;
}

// Lista das estatísticas base na ordem correta
const STAT_NAMES: Array<keyof PokemonDetail> = [
  "hp",
  "attack",
  "defense",
  "specialAttack",
  "specialDefense",
  "speed",
];

// Mapeamento visual das estatísticas
const STAT_MAP: { [key: string]: string } = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  specialAttack: "Sp. ATK",
  specialDefense: "Sp. DEF",
  speed: "SPD",
};

const STAT_COLOR_MAP: { [key: string]: string } = {
  hp: "#FF0000", // Vermelho
  attack: "#F08030", // Laranja
  defense: "#F8D030", // Amarelo
  specialAttack: "#6890F0", // Azul
  specialDefense: "#78C850", // Verde Claro
  speed: "#F85888", // Rosa
};

/**
 * Retorna a cor da barra de status com base no tipo de estatística.
 */
const getStatColor = (statName: string): string => {
  return STAT_COLOR_MAP[statName as keyof typeof STAT_MAP] || "#A8A8A8";
};

/**
 * Determina qual Pokémon tem a estatística mais alta e retorna a classe CSS de destaque.
 */
const getWinnerClass = (
  statName: keyof PokemonDetail,
  p1: PokemonDetail | null,
  p2: PokemonDetail | null
): string => {
  if (!p1 || !p2) return "bg-light";

  const stat1 = p1[statName] as number;
  const stat2 = p2[statName] as number;

  if (stat1 > stat2) return "bg-success text-white fw-bold"; // Vencedor
  if (stat2 > stat1) return "bg-danger text-white fw-bold"; // Perdedor
  return "bg-secondary text-white"; // Empate
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
    <div className="position-relative w-100 mb-3">
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

    return (
      <div className="w-100 px-3">
        {STAT_NAMES.map((statName) => {
          const value = pokemon[statName] as number;
          const label = STAT_MAP[statName as keyof typeof STAT_MAP];
          const percentage = (value / maxStat) * 100;
          const statColor = getStatColor(statName.toString());

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
                    backgroundColor: statColor,
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
                  className={`py-3 px-4 ${getWinnerClass(
                    statName,
                    pokemon1Detail,
                    pokemon2Detail
                  )}`}
                >
                  {pokemon1Detail[statName] as number}
                </td>
                <td
                  className={`py-3 px-4 ${getWinnerClass(
                    statName,
                    pokemon1Detail,
                    pokemon2Detail
                  )}`}
                >
                  {pokemon2Detail[statName] as number}
                </td>
              </tr>
            ))}

            <tr className="table-info fw-bold border-top border-3 border-primary">
              <td className="py-3 px-4 text-dark fs-5 text-start">Total BST</td>
              <td
                className={`py-3 px-4 fs-5 ${
                  bst1 > bst2
                    ? "text-success"
                    : bst2 > bst1
                    ? "text-danger"
                    : "text-secondary"
                }`}
              >
                {bst1}
              </td>
              <td
                className={`py-3 px-4 fs-5 ${
                  bst2 > bst1
                    ? "text-success"
                    : bst1 > bst2
                    ? "text-danger"
                    : "text-secondary"
                }`}
              >
                {bst2}
              </td>
            </tr>
          </tbody>
        </table>

        <p className="text-sm text-muted mt-3 text-center">
          <span className="text-success fw-bold">Verde</span> indica a
          estatística mais alta.
        </p>
      </div>
    );
  };

  return (
    <div className="min-vh-100 bg-dark text-white p-5">
      <div className="container-fluid mx-auto">
        <h1 className="fs-1 fw-bold mb-2">COMPARAR E DESCOBRIR!</h1>
        <p className="lead text-info mb-5">
          Compare os status de dois Pokémon de maneira simples e rápida.
        </p>

        <div className="d-flex justify-content-around align-items-start gap-4">
          <div className="d-flex flex-column align-items-center w-25">
            <div className="mb-2 w-100" style={{ width: 250 }}>
              <SearchInput
                searchName={searchName1}
                setSearchName={setSearchName1}
                suggestions={suggestions1}
                isPokemon1={true}
                onSelect={onSelectPokemon1}
              />
            </div>
            <Card
              pokemon={pokemon1Detail}
              bst={bst1}
              onDetailClick={() => {}}
            />
          </div>

          <span className="fs-3 fw-bold align-self-center text-secondary d-none d-sm-block">
            VS
          </span>

          <div className="d-flex flex-column align-items-center w-25">
            <div className="mb-2 w-100" style={{ width: 250 }}>
              <SearchInput
                searchName={searchName2}
                setSearchName={setSearchName2}
                suggestions={suggestions2}
                isPokemon1={false}
                onSelect={onSelectPokemon2}
              />
            </div>

            <Card
              pokemon={pokemon2Detail}
              bst={bst2}
              onDetailClick={() => {}}
            />
          </div>
        </div>

        <div className="text-center my-5">
          <button className="btn btn-danger fs-4 fw-bold p-3 shadow-lg">
            COMPARAR
          </button>
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
