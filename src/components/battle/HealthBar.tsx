import React from "react";

interface HealthBarProps {
  current: number;
  max: number;
  label?: string; // Ex: "HP"
}

const HealthBar: React.FC<HealthBarProps> = ({ current, max, label }) => {
  // Garante que a porcentagem fique entre 0 e 100
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));

  // Define a cor baseada na porcentagem (Lógica clássica de Pokémon)
  let barColor = "#4caf50"; // Verde
  if (percentage < 50) barColor = "#ffeb3b"; // Amarelo
  if (percentage < 20) barColor = "#f44336"; // Vermelho

  return (
    <div className="w-100">
      <div
        className="d-flex justify-content-between mb-1"
        style={{ fontSize: "0.8rem" }}
      >
        {label && <span className="fw-bold">{label}</span>}
        <span>
          {current}/{max}
        </span>
      </div>

      {/* Container Cinza */}
      <div
        className="progress"
        style={{ height: "12px", backgroundColor: "#555" }}
      >
        {/* Barra Colorida Animada */}
        <div
          className="progress-bar"
          role="progressbar"
          style={{
            width: `${percentage}%`,
            backgroundColor: barColor,
            transition: "width 0.5s ease-out, background-color 0.5s", // Animação suave
          }}
        />
      </div>
    </div>
  );
};

export default HealthBar;
