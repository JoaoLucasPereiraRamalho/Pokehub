import React from "react";
import { type PokemonDetail } from "../services/PokemonService";

// =====================================================================
// 1. DEFINIÇÃO DE TIPOS E CONSTANTES
// =====================================================================

interface CompareCircleProps {
  pokemon1: PokemonDetail | null;
  pokemon2: PokemonDetail | null;
}

/**
 * Estatísticas a serem usadas nos eixos do gráfico de radar.
 */
const RADAR_STATS: Array<keyof PokemonDetail> = [
  "hp",
  "attack",
  "defense",
  "specialAttack",
  "defense",
  "speed",
];

/**
 * Valor máximo teórico para uma única estatística base em Pokémon (usado para escala do radar).
 */
const MAX_STAT_VALUE = 255;

/**
 * Dimensão (largura/altura) do viewBox e do SVG.
 */
const SIZE = 200;

/**
 * Coordenada central (metade do tamanho).
 */
const CENTER = SIZE / 2;

/**
 * Número de lados do polígono (igual ao número de estatísticas).
 */
const NUM_SIDES = RADAR_STATS.length;

/**
 * O ângulo em radianos para cada fatia do gráfico.
 */
const ANGLE_SLICE = (2 * Math.PI) / NUM_SIDES;

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
// 2. FUNÇÕES DE CÁLCULO SVG (Radar)
// =====================================================================

/**
 * Calcula a coordenada (X, Y) para um ponto no gráfico de radar.
 * A distância do centro (raio) é baseada no valor da estatística.
 */
const getCoordinate = (value: number, index: number) => {
  // r é o raio: proporção do valor em relação ao valor máximo, ajustado por uma escala (0.7)
  const r = (value / MAX_STAT_VALUE) * (CENTER * 0.7);
  // O ângulo é calculado e ajustado para iniciar no topo (-Math.PI / 2)
  const angle = ANGLE_SLICE * index - Math.PI / 2;
  return {
    x: CENTER + r * Math.cos(angle),
    y: CENTER + r * Math.sin(angle),
  };
};

/**
 * Gera a string de pontos no formato "x1,y1 x2,y2 ..." necessária para o elemento polygon
 */
const generatePoints = (pokemon: PokemonDetail | null) => {
  if (!pokemon) return "";

  // Mapeia cada estatística para uma coordenada (x, y)
  return RADAR_STATS.map((stat, i) => {
    const value = pokemon[stat] as number;
    const { x, y } = getCoordinate(value, i);
    return `${x},${y}`;
  }).join(" "); // Une todas as coordenadas em uma única string separada por espaço
};

// =====================================================================
// 3. COMPONENTE REACT (CompareCircle)
// =====================================================================

const CompareCircle: React.FC<CompareCircleProps> = ({
  pokemon1,
  pokemon2,
}) => {
  // Renderização de carregamento/placeholder se nenhum Pokémon for selecionado
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

  // Gera as strings de pontos para os dois polígonos
  const points1 = generatePoints(pokemon1);
  const points2 = generatePoints(pokemon2);

  // Gera as linhas da grade (eixos do radar)
  const gridLines = RADAR_STATS.map((_, i) => {
    // Coordenada do ponto mais externo para este eixo
    const { x, y } = getCoordinate(MAX_STAT_VALUE, i);
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

  // Gera os rótulos de estatísticas (HP, ATK, etc.)
  const statLabels = RADAR_STATS.map((stat, i) => {
    // Coordenada ligeiramente fora do círculo máximo (MAX_STAT_VALUE * 1.1)
    const { x, y } = getCoordinate(MAX_STAT_VALUE * 1.1, i);
    return (
      <text
        key={`label-${stat}`}
        x={x}
        y={y}
        fill="white"
        fontSize="10"
        fontWeight="bold"
        textAnchor="middle" // Centraliza o texto no ponto
        alignmentBaseline="middle"
      >
        {STAT_MAP[stat as keyof typeof STAT_MAP]}
      </text>
    );
  });

  // Estrutura principal do SVG
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
      {/* Círculos da Grade de Referência */}
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

      {/* Linhas da Grade (Eixos) */}
      {gridLines}

      {/* Polígono do Pokémon 2 (Renderizado primeiro para ficar no fundo) */}
      {points2 && (
        <polygon
          points={points2}
          fill="rgba(220, 53, 69, 0.5)" // Vermelho (perdedor)
          stroke="rgb(220, 53, 69)"
          strokeWidth="2"
        />
      )}

      {/* Polígono do Pokémon 1 (Renderizado por cima) */}
      {points1 && (
        <polygon
          points={points1}
          fill="rgba(40, 167, 69, 0.5)" // Verde (vencedor)
          stroke="rgb(40, 167, 69)"
          strokeWidth="2"
        />
      )}

      {/* Rótulos das Estatísticas */}
      {statLabels}
    </svg>
  );
};

export default CompareCircle;
