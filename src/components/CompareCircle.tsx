import React from "react";
import { type PokemonDetail } from "../services/PokemonService";

interface CompareCircleProps {
  pokemon1: PokemonDetail | null;
  pokemon2: PokemonDetail | null;
}

// Lista das estatísticas para o gráfico (na ordem do hexágono)
const RADAR_STATS: Array<keyof PokemonDetail> = [
  "hp",
  "attack",
  "defense",
  "specialAttack",
  "specialDefense",
  "speed",
];
const MAX_STAT_VALUE = 255; // O valor máximo que uma estatística base pode ter (para dimensionamento)
const SIZE = 200; // Tamanho do SVG
const CENTER = SIZE / 2;
const NUM_SIDES = RADAR_STATS.length;
const ANGLE_SLICE = (2 * Math.PI) / NUM_SIDES;

// Mapeamento visual das estatísticas
// CORREÇÃO: Definimos o tipo explicitamente para as 6 chaves de estatísticas.
const STAT_MAP: { [key: string]: string } = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  specialAttack: "Sp. ATK",
  specialDefense: "Sp. DEF",
  speed: "SPD",
};

// Função auxiliar para calcular as coordenadas de um ponto do polígono
const getCoordinate = (value: number, index: number) => {
  // Escala o valor entre 0 e o raio máximo (SIZE/2)
  const r = (value / MAX_STAT_VALUE) * (CENTER * 0.7);
  const angle = ANGLE_SLICE * index - Math.PI / 2; // -PI/2 para começar no topo
  return {
    x: CENTER + r * Math.cos(angle),
    y: CENTER + r * Math.sin(angle),
  };
};

// Gera a string SVG 'points' para o polígono de estatísticas
const generatePoints = (pokemon: PokemonDetail | null) => {
  if (!pokemon) return "";
  return RADAR_STATS.map((stat, i) => {
    const value = pokemon[stat] as number;
    const { x, y } = getCoordinate(value, i);
    return `${x},${y}`;
  }).join(" ");
};

const CompareCircle: React.FC<CompareCircleProps> = ({
  pokemon1,
  pokemon2,
}) => {
  // Se faltar dados, mostra apenas a estrutura
  if (!pokemon1 && !pokemon2) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          width: SIZE,
          height: SIZE,
          border: "1px solid #444",
          borderRadius: "50%",
        }}
      >
        <span className="text-muted small">Carregando Gráfico...</span>
      </div>
    );
  }

  // Gera os pontos dos polígonos
  const points1 = generatePoints(pokemon1);
  const points2 = generatePoints(pokemon2);

  // Gera os pontos para as linhas de fundo (grid)
  const gridLines = RADAR_STATS.map((_, i) => {
    const { x, y } = getCoordinate(MAX_STAT_VALUE, i); // Usa o valor máximo
    return (
      <line
        key={`line-${i}`}
        x1={CENTER}
        y1={CENTER}
        x2={x}
        y2={y}
        stroke="#444"
        strokeWidth="1"
      />
    );
  });

  // Gera os labels das estatísticas
  const statLabels = RADAR_STATS.map((stat, i) => {
    const { x, y } = getCoordinate(MAX_STAT_VALUE * 1.1, i); // Ponto ligeiramente fora
    return (
      <text
        key={`label-${stat}`}
        x={x}
        y={y}
        fill="white"
        fontSize="10"
        fontWeight="bold"
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {STAT_MAP[stat as keyof typeof STAT_MAP]}
      </text>
    );
  });

  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
      {/* Círculos de Fundo */}
      <circle
        cx={CENTER}
        cy={CENTER}
        r={CENTER * 0.7}
        fill="none"
        stroke="#333"
        strokeWidth="1"
      />
      <circle
        cx={CENTER}
        cy={CENTER}
        r={CENTER * 0.45}
        fill="none"
        stroke="#333"
        strokeWidth="1"
      />
      <circle
        cx={CENTER}
        cy={CENTER}
        r={CENTER * 0.2}
        fill="none"
        stroke="#333"
        strokeWidth="1"
      />

      {/* Linhas de Eixo (Grid) */}
      {gridLines}

      {/* Polígono do Pokémon 2 (Camada Inferior - Vermelho) */}
      {points2 && (
        <polygon
          points={points2}
          fill="rgba(220, 53, 69, 0.5)" // Cor de Perdedor/P2 (Danger)
          stroke="rgb(220, 53, 69)"
          strokeWidth="2"
        />
      )}

      {/* Polígono do Pokémon 1 (Camada Superior - Verde) */}
      {points1 && (
        <polygon
          points={points1}
          fill="rgba(40, 167, 69, 0.5)" // Cor de Vencedor/P1 (Success)
          stroke="rgb(40, 167, 69)"
          strokeWidth="2"
        />
      )}

      {/* Labels das Estatísticas */}
      {statLabels}
    </svg>
  );
};

export default CompareCircle;
