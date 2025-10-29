import React, { useMemo, useState } from "react";
import {
  type PokemonDetail,
  type PokemonName,
} from "../services/PokemonService";
import CompareCircle from "./CompareCircle";
import Card from "./Card";

// =====================================================================
// 1. DEFINIÇÃO DE TIPOS E CONSTANTES
// =====================================================================

interface ComparePageProps {
  pokemonNames: PokemonName[];
  selectedPokemon1: string;
  selectedPokemon2: string;
  pokemon1Detail: PokemonDetail | null;
  pokemon2Detail: PokemonDetail | null;
  onSelectPokemon1: (name: string) => void;
  onSelectPokemon2: (name: string) => void;
}

/**
 * Nomes das chaves de estatísticas no objeto PokemonDetail que devem ser comparadas.
 */
const STAT_NAMES: Array<keyof PokemonDetail> = [
  "hp",
  "attack",
  "defense",
  "specialAttack",
  "specialDefense",
  "speed",
];

/**
 * Mapeamento das chaves de estatísticas (ex: hp -> HP).
 */
const STAT_MAP: { [key: string]: string } = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  specialAttack: "Sp. ATK",
  specialDefense: "Sp. DEF",
  speed: "SPD",
};

// =====================================================================
// 2. FUNÇÕES AUXILIARES DE LÓGICA
// =====================================================================

/**
 * Determina a classe CSS para destacar se a estatística de um Pokémon
 * é superior ou inferior à do seu oponente.
 */
const getWinnerOrLoserClass = (
  statName: keyof PokemonDetail,
  p1: PokemonDetail | null,
  p2: PokemonDetail | null,
  isP1: boolean
): string => {
  if (!p1 || !p2) return ""; // Não destaca se algum dado estiver faltando

  const stat1 = p1[statName] as number;
  const stat2 = p2[statName] as number;

  if (stat1 === stat2) {
    return ""; // Empate
  }

  // Lógica de destaque para o Pokémon 1
  if (isP1) {
    if (stat1 > stat2) return "text-success fw-bold"; // Vencedor
    if (stat1 < stat2) return "text-danger fw-bold"; // Perdedor
  }
  // Lógica de destaque para o Pokémon 2
  else {
    if (stat2 > stat1) return "text-success fw-bold"; // Vencedor
    if (stat2 < stat1) return "text-danger fw-bold"; // Perdedor
  }

  return "";
};

/**
 * Gera sugestões de autocompletar baseadas na lista completa de nomes e no input atual.
 */
const getSuggestions = (names: PokemonName[], input: string): PokemonName[] => {
  if (input.length < 2) return []; // Retorna vazio se houver poucos caracteres
  const lowerInput = input.toLowerCase();
  return names
    .filter((p) => p.name.toLowerCase().startsWith(lowerInput))
    .slice(0, 10); // Limita a 10 sugestões
};

// =====================================================================
// 3. COMPONENTE DE INPUT DE BUSCA (SearchInput)
// =====================================================================

/**
 * Componente funcional para o campo de busca com autocompletar.
 */
const SearchInput: React.FC<{
  searchName: string;
  setSearchName: (name: string) => void;
  suggestions: PokemonName[];
  isPokemon1: boolean;
  onSelect: (name: string) => void;
}> = ({ searchName, setSearchName, suggestions, isPokemon1, onSelect }) => {
  // Lida com a confirmação da seleção (clique ou Enter)
  const handleInputConfirm = (name: string) => {
    // Chama a função passada via props para atualizar o estado no App.tsx
    onSelect(name.toLowerCase().trim());
    // Atualiza o estado interno do input para refletir a seleção
    setSearchName(name.toLowerCase().trim());
  };

  return (
    <div className="position-relative w-100 mb-0">
      <div className="input-group">
        {/* Campo de input */}
        <input
          type="text"
          className="form-control p-2 text-dark bg-white w-100 text-capitalize shadow-sm border-0"
          placeholder={
            isPokemon1 ? "Pesquise por Pokémon 1" : "Pesquise por Pokémon 2"
          }
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onBlur={() => {
            // Pequeno delay para permitir o clique nas sugestões antes de fechar a lista
            setTimeout(() => {
              // Verifica se o texto digitado corresponde exatamente a uma sugestão
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
        {/* Botão de busca */}
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

      {/* Lista de Sugestões (Dropdown) */}
      {suggestions.length > 0 && searchName.length >= 2 && (
        <ul
          className="list-group position-absolute w-100 mt-1 shadow-lg"
          style={{ zIndex: 1050 }}
        >
          {suggestions.map((p) => (
            <li
              key={p.name}
              className="list-group-item list-group-item-action text-capitalize text-start"
              // Usando onMouseDown para garantir que o clique seja capturado antes do onBlur do input
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

// =====================================================================
// 4. COMPONENTE PRINCIPAL (ComparePage)
// =====================================================================

function ComparePage({
  pokemonNames,
  selectedPokemon1,
  selectedPokemon2,
  pokemon1Detail,
  pokemon2Detail,
  onSelectPokemon1,
  onSelectPokemon2,
}: ComparePageProps) {
  // Estados locais para gerenciar o texto de busca nos inputs
  const [searchName1, setSearchName1] = useState(selectedPokemon1);
  const [searchName2, setSearchName2] = useState(selectedPokemon2);

  //Memos para Autocompletar

  // Sugestões para o Pokémon 1
  const suggestions1 = useMemo(
    () => getSuggestions(pokemonNames, searchName1),
    [pokemonNames, searchName1]
  );

  // Sugestões para o Pokémon 2
  const suggestions2 = useMemo(
    () => getSuggestions(pokemonNames, searchName2),
    [pokemonNames, searchName2]
  );

  //Memos para BST

  // Cálculo do BST para o Pokémon 1
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

  // Cálculo do BST para o Pokémon 2
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

  //Funções de Renderização Local

  /**
   * Renderiza as barras de estatísticas detalhadas.
   */
  const renderStatBars = (pokemon: PokemonDetail | null, isP1: boolean) => {
    if (!pokemon)
      return (
        <div className="p-4 text-center text-muted">Aguardando seleção...</div>
      );
    const maxStat = 255; // Valor máximo de uma estatística base

    // Define a cor da barra com base no Pokémon (verde para P1, vermelho para P2)
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

  /**
   * Renderiza a tabela de comparação de estatísticas, destacando o vencedor.
   */
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
              <th className="py-2 px-3 align-middle text-capitalize">
                {pokemon1Detail.name}
              </th>
              <th className="py-2 px-3 align-middle text-capitalize">
                {pokemon2Detail.name}
              </th>
            </tr>
          </thead>
          <tbody>
            {STAT_NAMES.map((statName) => (
              <tr key={statName}>
                <td className="py-3 px-4 fw-semibold text-start text-capitalize">
                  {STAT_MAP[statName as keyof typeof STAT_MAP]}
                </td>
                {/* Valor do Pokémon 1 com destaque */}
                <td
                  className={`py-3 px-4 ${getWinnerOrLoserClass(
                    statName,
                    pokemon1Detail,
                    pokemon2Detail,
                    true // Checa como P1
                  )}`}
                >
                  {pokemon1Detail[statName] as number}
                </td>
                {/* Valor do Pokémon 2 com destaque */}
                <td
                  className={`py-3 px-4 ${getWinnerOrLoserClass(
                    statName,
                    pokemon1Detail,
                    pokemon2Detail,
                    false // Checa como P2
                  )}`}
                >
                  {pokemon2Detail[statName] as number}
                </td>
              </tr>
            ))}

            {/* Linha Total BST (Base Stat Total) */}
            <tr className="fw-bold border-top border-3 border-primary">
              <td className="py-3 px-4 text-dark fs-5 text-start">Total BST</td>
              {/* P1 BST com destaque do vencedor */}
              <td
                className={`py-3 px-4 fs-5 ${
                  bst1 > bst2
                    ? "text-success fw-bold"
                    : bst1 < bst2
                    ? "text-danger fw-bold"
                    : ""
                }`}
              >
                {bst1}
              </td>
              {/* P2 BST com destaque do vencedor */}
              <td
                className={`py-3 px-4 fs-5 ${
                  bst2 > bst1
                    ? "text-success fw-bold"
                    : bst2 < bst1
                    ? "text-danger fw-bold"
                    : ""
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

  //Principal

  return (
    <div className="min-vh-100 fundo-degrade-compare text-white p-5">
      <div className="container-fluid mx-auto">
        {/* Título */}
        <div className="d-flex justify-content-center mb-5">
          <h1 className="fs-1 fw-bold mb-2">COMPARE JÁ!</h1>
        </div>

        {/* Seleção de Pokémon (Lado a Lado) */}
        <div className="d-flex justify-content-center align-items-center gap-5">
          {/* Coluna do Pokémon 1 */}
          <div
            className="d-flex flex-column align-items-center bg-light rounded-4 shadow-lg p-5"
            style={{ width: "400px", maxWidth: "50%" }}
          >
            <SearchInput
              searchName={searchName1}
              setSearchName={setSearchName1}
              suggestions={suggestions1}
              isPokemon1={true}
              onSelect={onSelectPokemon1}
            />
            {/* O componente Card precisa de um ajuste para aceitar PokemonDetail diretamente, 
                mas aqui ele está sendo usado para renderizar a visualização */}
            <Card
              pokemon={pokemon1Detail}
              bst={bst1}
              onDetailClick={() => {}} // Não faz nada ao clicar no card de comparação
            />
          </div>

          <span className="fs-3 fw-bold text-white d-none d-sm-block">VS</span>

          {/* Coluna do Pokémon 2 */}
          <div
            className="d-flex flex-column align-items-center bg-light rounded-4 shadow-lg p-5"
            style={{ width: "400px", maxWidth: "50%" }}
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

        {/* Barras de Estatísticas e Círculo de Comparação */}
        <div className="row text-white mt-5 pt-5 align-items-center">
          {/* Barras do Pokémon 1 */}
          <div className="col-sm-12 col-md-5">
            <h5 className="text-uppercase text-center mb-4 text-success">
              Estatísticas de {pokemon1Detail?.name || "Pokémon 1"}
            </h5>
            {renderStatBars(pokemon1Detail, true)}
          </div>

          {/* Círculo de Comparação Central */}
          <div className="col-sm-12 col-md-2 d-flex justify-content-center align-items-center my-4">
            <CompareCircle
              pokemon1={pokemon1Detail}
              pokemon2={pokemon2Detail}
            />
          </div>

          {/* Barras do Pokémon 2 */}
          <div className="col-sm-12 col-md-5">
            <h5 className="text-uppercase text-center mb-4 text-danger">
              Estatísticas de {pokemon2Detail?.name || "Pokémon 2"}
            </h5>
            {renderStatBars(pokemon2Detail, false)}
          </div>
        </div>

        {/* Tabela de Comparação (Detalhada) */}
        {renderComparisonStats()}
      </div>
    </div>
  );
}

export default ComparePage;
