import { useEffect, useState } from "react";
// Hook
import { useBattle } from "../hooks/useBattle";
// Componentes
import HealthBar from "../components/battle/HealthBar";
import PokemonSelector from "../components/battle/PokemonSelector"; // <--- Novo
import Loading from "../components/ui/Loading";
import Button from "../components/ui/Button";
import AsyncImage from "../components/ui/AsyncImage";
// Services e Utils
import { getPokemonNameList } from "../services/PokemonService";
import { getTypeColor } from "../utils/constants";
import type { PokemonName } from "../types";

function Battle() {
  const { player, enemy, loading, turn, logs, winner, startBattle, attack } =
    useBattle();

  // Estados Locais para a Tela de Seleção
  const [isBattleStarted, setIsBattleStarted] = useState(false);
  const [allNames, setAllNames] = useState<PokemonName[]>([]);
  const [p1Name, setP1Name] = useState("charizard");
  const [p2Name, setP2Name] = useState("blastoise");

  // Carregar lista de nomes ao montar a página
  useEffect(() => {
    getPokemonNameList().then(setAllNames);
  }, []);

  // Função para começar a luta
  const handleStartGame = () => {
    if (p1Name && p2Name) {
      startBattle(p1Name, p2Name);
      setIsBattleStarted(true);
    }
  };

  // Função para reiniciar (voltar para seleção)
  const handleReset = () => {
    setIsBattleStarted(false);
  };

  // =========================================================
  // RENDERIZAÇÃO 1: Tela de Seleção
  // =========================================================
  if (!isBattleStarted) {
    return (
      <div
        style={{ backgroundColor: "#091D3C" }}
        className="min-vh-100 d-flex align-items-center justify-content-center p-3"
      >
        <div
          className="bg-white bg-opacity-10 p-5 rounded-4 shadow-lg w-100"
          style={{ maxWidth: "500px", backdropFilter: "blur(10px)" }}
        >
          <h1 className="text-white text-center fw-bold mb-4">Nova Batalha</h1>

          <div className="d-flex flex-column gap-4">
            <PokemonSelector
              label="Escolha seu Pokémon"
              allNames={allNames}
              selectedName={p1Name}
              onSelect={setP1Name}
            />

            <div className="text-center text-white fw-bold fs-4">VS</div>

            <PokemonSelector
              label="Escolha o Oponente"
              allNames={allNames}
              selectedName={p2Name}
              onSelect={setP2Name}
            />

            <Button
              variant="linear"
              className="mt-3 py-3 w-100"
              onClick={handleStartGame}
              disabled={!p1Name || !p2Name}
            >
              INICIAR COMBATE
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // RENDERIZAÇÃO 2: Loading da Batalha
  // =========================================================
  if (loading || !player || !enemy) {
    return (
      <div
        className="min-vh-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#091D3C" }}
      >
        <Loading />
      </div>
    );
  }

  // =========================================================
  // RENDERIZAÇÃO 3: Arena de Batalha (Código anterior)
  // =========================================================
  return (
    <div
      style={{ backgroundColor: "#091D3C" }}
      className="min-vh-100 text-white p-3 p-md-5 d-flex flex-column justify-content-center"
    >
      <div className="container py-4" style={{ maxWidth: "1000px" }}>
        {/* --- ARENA --- */}
        <div className="row g-5 align-items-end mb-5">
          {/* INIMIGO */}
          <div className="col-12 d-flex flex-column align-items-center align-items-md-end order-1 order-md-2">
            <div
              className="bg-dark bg-opacity-50 p-3 rounded-3 mb-3 w-100 shadow-sm border border-secondary"
              style={{ maxWidth: "320px" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="m-0 fw-bold text-capitalize">{enemy.name}</h5>
                <span
                  className="badge text-uppercase"
                  style={{ backgroundColor: getTypeColor(enemy.type1) }}
                >
                  {enemy.type1}
                </span>
              </div>
              <HealthBar current={enemy.currentHp} max={enemy.maxHp} />
            </div>
            <div className="position-relative">
              <AsyncImage
                src={enemy.imgAnimada || enemy.img}
                alt={enemy.name}
                style={{
                  width: "180px",
                  height: "180px",
                  objectFit: "contain",
                }}
                className={`transition-all ${
                  turn === "enemy" ? "animate-pulse scale-110" : ""
                }`}
              />
            </div>
          </div>

          {/* JOGADOR */}
          <div className="col-12 d-flex flex-column align-items-center align-items-md-start order-2 order-md-1">
            <div className="position-relative mb-3">
              <AsyncImage
                src={player.imgAnimada || player.img}
                alt={player.name}
                style={{
                  width: "220px",
                  height: "220px",
                  objectFit: "contain",
                }}
                className={`transition-all ${
                  turn === "player" ? "animate-pulse" : ""
                }`}
              />
            </div>
            <div
              className="bg-dark bg-opacity-50 p-3 rounded-3 w-100 shadow-sm border border-secondary"
              style={{ maxWidth: "320px" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="m-0 fw-bold text-capitalize">{player.name}</h5>
                <span
                  className="badge text-uppercase"
                  style={{ backgroundColor: getTypeColor(player.type1) }}
                >
                  {player.type1}
                </span>
              </div>
              <HealthBar
                current={player.currentHp}
                max={player.maxHp}
                label="HP"
              />
              <div className="text-end mt-1">
                <small className="text-muted">
                  {player.currentHp} / {player.maxHp}
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* --- CONTROLES --- */}
        <div className="row mt-4">
          <div className="col-12 col-md-7 mb-4">
            <div className="bg-light text-dark p-4 rounded-4 shadow h-100 d-flex flex-column justify-content-center">
              {winner ? (
                <div className="text-center">
                  <h2 className="fw-bold mb-4 display-6">
                    {winner === player.name
                      ? "🏆 Você Venceu!"
                      : "💀 Você Perdeu!"}
                  </h2>
                  <div className="d-flex gap-3 justify-content-center">
                    {/* Botão de Revanche (Mesmos Pokemons) */}
                    <Button
                      variant="primary"
                      className="bg-dark text-white"
                      onClick={() => startBattle(p1Name, p2Name)}
                    >
                      Revanche
                    </Button>
                    {/* Botão de Nova Seleção */}
                    <Button variant="danger" onClick={handleReset}>
                      Nova Batalha
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h5 className="fw-bold mb-3 border-bottom pb-2 border-secondary">
                    {turn === "player"
                      ? "O que você vai fazer?"
                      : `Turno de ${enemy.name}...`}
                  </h5>
                  {turn === "player" ? (
                    <div
                      className="d-grid gap-3"
                      style={{ gridTemplateColumns: "1fr 1fr" }}
                    >
                      {player.moves.map((move, index) => (
                        <button
                          key={index}
                          className="btn btn-outline-dark py-3 text-start position-relative overflow-hidden text-capitalize shadow-sm"
                          onClick={() => attack(move)}
                          style={{
                            borderLeft: `6px solid ${getTypeColor(move.type)}`,
                          }}
                        >
                          <span className="fw-bold d-block">{move.name}</span>
                          <span className="small text-muted">
                            {move.type} | Pwr: {move.power || "-"}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <h4 className="text-muted animate-pulse fst-italic">
                        Oponente está atacando...
                      </h4>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="col-12 col-md-5 mb-4">
            <div
              className="bg-black bg-opacity-75 p-3 rounded-3 text-white h-100 border border-secondary d-flex flex-column"
              style={{ maxHeight: "300px", minHeight: "250px" }}
            >
              <h6 className="text-warning mb-3 fw-bold border-bottom border-secondary pb-2">
                Log de Batalha
              </h6>
              <div className="overflow-auto flex-grow-1 pe-2 custom-scrollbar">
                <div className="d-flex flex-column-reverse">
                  {logs.map((log, i) => (
                    <div
                      key={i}
                      className="mb-2 p-2 rounded bg-white bg-opacity-10 border-start border-3"
                      style={{
                        borderColor:
                          log.turn === "player" ? "#4caf50" : "#f44336",
                      }}
                    >
                      <p className="mb-0 small text-white">{log.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Voltar (Sair da Luta no meio) */}
        {!winner && (
          <div className="mt-4 text-center">
            <button
              className="btn btn-link text-white-50 text-decoration-none"
              onClick={handleReset}
            >
              &larr; Cancelar e Voltar para Seleção
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Battle;
