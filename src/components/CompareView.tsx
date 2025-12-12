import React, { useMemo, useState } from "react";
import CompareCircle from "./vizualizations/CompareCircle";
import Card from "./cards/Card";
import { type PokemonDetail, type PokemonName } from "../types";
import { STAT_DISPLAY_NAMES, STAT_KEYS } from "../utils/constants";

// =====================================================================
// 1. DEFINIÇÃO DE PROPS
// =====================================================================

interface CompareViewProps {
  pokemonNames: PokemonName[];
  selectedPokemon1: string;
  selectedPokemon2: string;
  pokemon1Detail: PokemonDetail | null;
  pokemon2Detail: PokemonDetail | null;
  onSelectPokemon1: (name: string) => void;
  onSelectPokemon2: (name: string) => void;
}

// =====================================================================
// 2. FUNÇÕES AUXILIARES DE LÓGICA
// =====================================================================

/**
 * Determina a classe CSS para destacar vencedor/perdedor
 */
const getWinnerOrLoserClass = (
  statName: keyof PokemonDetail,
  p1: PokemonDetail | null,
  p2: PokemonDetail | null,
  isP1: boolean
): string => {
  if (!p1 || !p2) return "";

  // Forçamos o tipo para garantir que é number, pois sabemos que os stats são numbers
  const stat1 = p1[statName] as number;
  const stat2 = p2[statName] as number;

  if (stat1 === stat2) return "";

  if (isP1) {
    return stat1 > stat2 ? "text-success fw-bold" : "text-danger fw-bold";
  } else {
    return stat2 > stat1 ? "text-success fw-bold" : "text-danger fw-bold";
  }
};

/**
 * Gera sugestões de autocompletar
 */
const getSuggestions = (names: PokemonName[], input: string): PokemonName[] => {
  if (input.length < 2) return [];
  const lowerInput = input.toLowerCase();
  return names
    .filter((p) => p.name.toLowerCase().startsWith(lowerInput))
    .slice(0, 10);
};

// =====================================================================
// 3. COMPONENTE DE INPUT DE BUSCA
// =====================================================================

const SearchInput: React.FC<{
  searchName: string;
  setSearchName: (name: string) => void;
  suggestions: PokemonName[];
  isPokemon1: boolean;
  onSelect: (name: string) => void;
}> = ({ searchName, setSearchName, suggestions, isPokemon1, onSelect }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputConfirm = (name: string) => {
    onSelect(name.toLowerCase().trim());
    setSearchName(name.toLowerCase().trim());
    setShowSuggestions(false); // Fecha sugestões ao confirmar
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
          // 1. Abre a lista quando foca
          onFocus={() => setShowSuggestions(true)}
          // 2. Fecha a lista quando perde o foco
          onBlur={() => {
            setTimeout(() => {
              setShowSuggestions(false); // Esconde a lista

              const exactMatch = suggestions.find(
                (p) => p.name.toLowerCase() === searchName.toLowerCase()
              );
              if (exactMatch) handleInputConfirm(exactMatch.name);
            }, 150);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchName.trim()) {
              handleInputConfirm(searchName);
            }
          }}
        />
        {/* Botão de lupa simples */}
      </div>

      {/* Lista de Sugestões */}
      {showSuggestions && suggestions.length > 0 && searchName.length >= 2 && (
        <ul
          className="list-group position-absolute w-100 mt-1"
          style={{ zIndex: 1050 }}
        >
          {suggestions.map((p) => (
            <li
              key={p.name}
              className="list-group-item list-group-item-action text-capitalize text-start"
              onMouseDown={(e) => {
                e.preventDefault();
                handleInputConfirm(p.name);
              }}
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

// =====================================================================
// 4. COMPONENTE PRINCIPAL
// =====================================================================

function CompareView({
  pokemonNames,
  selectedPokemon1,
  selectedPokemon2,
  pokemon1Detail,
  pokemon2Detail,
  onSelectPokemon1,
  onSelectPokemon2,
}: CompareViewProps) {
  const [searchName1, setSearchName1] = useState(selectedPokemon1);
  const [searchName2, setSearchName2] = useState(selectedPokemon2);

  // Memos para Autocompletar
  const suggestions1 = useMemo(
    () => getSuggestions(pokemonNames, searchName1),
    [pokemonNames, searchName1]
  );

  const suggestions2 = useMemo(
    () => getSuggestions(pokemonNames, searchName2),
    [pokemonNames, searchName2]
  );

  // Memos para BST (Base Stat Total)
  const bst1 = useMemo(
    () =>
      pokemon1Detail
        ? STAT_KEYS.reduce(
            (sum, stat) =>
              sum + (pokemon1Detail[stat as keyof PokemonDetail] as number),
            0
          )
        : 0,
    [pokemon1Detail]
  );

  const bst2 = useMemo(
    () =>
      pokemon2Detail
        ? STAT_KEYS.reduce(
            (sum, stat) =>
              sum + (pokemon2Detail[stat as keyof PokemonDetail] as number),
            0
          )
        : 0,
    [pokemon2Detail]
  );

  // --- Renderização de Barras ---
  const renderStatBars = (pokemon: PokemonDetail | null, isP1: boolean) => {
    if (!pokemon)
      return <div className="p-4 text-center text-muted">Aguardando...</div>;

    const maxStat = 255;
    const barColor = isP1 ? "#4CAF50" : "#F44336";

    return (
      <div className="w-100 px-3">
        {STAT_KEYS.map((statKey) => {
          const key = statKey as keyof PokemonDetail;
          const value = pokemon[key] as number;
          const label = STAT_DISPLAY_NAMES[key];
          const percentage = (value / maxStat) * 100;

          return (
            <div key={key} className="mb-3">
              <div className="d-flex justify-content-between mb-1">
                <span className="fw-semibold text-uppercase">{label}</span>
                <small className="text-white">{value}</small>
              </div>
              <div className="stat-bar-container">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${percentage}%`, backgroundColor: barColor }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // --- Renderização da Tabela ---
  const renderComparisonStats = () => {
    if (!pokemon1Detail || !pokemon2Detail) {
      return (
        <p className="text-white text-center mt-5 fs-5 fw-semibold">
          Selecione dois Pokémon para comparar.
        </p>
      );
    }

    return (
      <div className="w-100 mt-5 p-3 p-md-4 bg-white rounded-3 shadow-lg">
        <h2 className="fs-3 fw-bold text-center mb-4 text-dark">
          Tabela de Estatísticas Base
        </h2>

        {/* MUDANÇA: Responsividade da tabela */}
        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center align-middle">
            <thead>
              <tr className="table-secondary">
                <th className="py-2 px-3 text-start">Estatística</th>
                <th className="py-2 px-3 text-capitalize">
                  {pokemon1Detail.name}
                </th>
                <th className="py-2 px-3 text-capitalize">
                  {pokemon2Detail.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {STAT_KEYS.map((statKey) => {
                const key = statKey as keyof PokemonDetail;
                return (
                  <tr key={key}>
                    <td className="py-2 px-3 fw-semibold text-start text-capitalize">
                      {STAT_DISPLAY_NAMES[key]}
                    </td>
                    <td
                      className={`py-2 px-3 ${getWinnerOrLoserClass(
                        key,
                        pokemon1Detail,
                        pokemon2Detail,
                        true
                      )}`}
                    >
                      {pokemon1Detail[key] as number}
                    </td>
                    <td
                      className={`py-2 px-3 ${getWinnerOrLoserClass(
                        key,
                        pokemon1Detail,
                        pokemon2Detail,
                        false
                      )}`}
                    >
                      {pokemon2Detail[key] as number}
                    </td>
                  </tr>
                );
              })}
              <tr className="fw-bold border-top border-3 border-primary">
                <td className="py-3 px-3 text-dark fs-5 text-start">
                  Total BST
                </td>
                <td
                  className={`py-3 px-3 fs-5 ${
                    bst1 > bst2
                      ? "text-success"
                      : bst1 < bst2
                      ? "text-danger"
                      : ""
                  }`}
                >
                  {bst1}
                </td>
                <td
                  className={`py-3 px-3 fs-5 ${
                    bst2 > bst1
                      ? "text-success"
                      : bst2 < bst1
                      ? "text-danger"
                      : ""
                  }`}
                >
                  {bst2}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-muted mt-3 text-center small">
          <span className="text-success fw-bold">Verde</span> indica o maior
          valor. <span className="text-danger fw-bold">Vermelho</span> indica o
          menor valor.
        </p>
      </div>
    );
  };

  // --- Renderização Principal ---
  return (
    <div className="min-vh-100 fundo-degrade-compare text-white p-3 p-md-5">
      <div className="container-fluid mx-auto">
        <div className="d-flex justify-content-center mb-5">
          <h1
            className="display-1 fw-bolder fst-italic text-white m-0"
            style={{
              fontSize: "3rem",
              textShadow: "4px 4px 0 #031224, 0 0 30px rgba(0, 194, 203, 0.5)",
              letterSpacing: "1px",
              fontFamily: "'Impact', sans-serif",
            }}
          >
            COMPARE JÁ!
          </h1>
        </div>

        {/* Layout flexível (Coluna no mobile, Linha no desktop) */}
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-4 gap-md-5">
          {/* Coluna P1 */}
          <div
            className="d-flex flex-column align-items-center bg-light rounded-4 sombra p-4 p-md-5"
            style={{ width: "100%", maxWidth: "350px" }}
          >
            <SearchInput
              searchName={searchName1}
              setSearchName={setSearchName1}
              suggestions={suggestions1}
              isPokemon1={true}
              onSelect={onSelectPokemon1}
            />
            <div className="mt-4 w-100 d-flex justify-content-center">
              <Card
                pokemon={pokemon1Detail}
                bst={bst1}
                onDetailClick={() => {}}
              />
            </div>
          </div>

          <h1
            className="display-1 fw-bolder fst-italic text-white m-0"
            style={{
              fontSize: "8rem",
              // Sombra mais suave em azul escuro
              textShadow: "4px 4px 0 #031224, 0 0 30px rgba(0, 194, 203, 0.5)",
              letterSpacing: "-5px",
              fontFamily: "'Impact', sans-serif",
            }}
          >
            VS
          </h1>

          {/* Coluna P2 */}
          <div
            className="d-flex flex-column align-items-center bg-light rounded-4 sombra p-4 p-md-5"
            style={{ width: "100%", maxWidth: "350px" }}
          >
            <SearchInput
              searchName={searchName2}
              setSearchName={setSearchName2}
              suggestions={suggestions2}
              isPokemon1={false}
              onSelect={onSelectPokemon2}
            />
            <div className="mt-4 w-100 d-flex justify-content-center">
              <Card
                pokemon={pokemon2Detail}
                bst={bst2}
                onDetailClick={() => {}}
              />
            </div>
          </div>
        </div>

        {/* Gráficos e Barras */}
        <div className="row text-white mt-5 pt-5 align-items-center">
          <div className="col-sm-12 col-md-5">
            <h5 className="text-uppercase text-center mb-4 text-success">
              {pokemon1Detail?.name || "Pokémon 1"}
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
              {pokemon2Detail?.name || "Pokémon 2"}
            </h5>
            {renderStatBars(pokemon2Detail, false)}
          </div>
        </div>

        {renderComparisonStats()}
      </div>
    </div>
  );
}

export default CompareView;
