import { useEffect, useState } from "react";
import { useBattle } from "../hooks/useBattle";
import HealthBar from "../components/battle/HealthBar";
import PokemonSelector from "../components/battle/PokemonSelector";
import Loading from "../components/ui/Loading";
import Button from "../components/ui/Button";
import AsyncImage from "../components/ui/AsyncImage";
import { getPokemonNameList } from "../services/PokemonService";
import { getTypeColor } from "../utils/constants";
import type { PokemonName } from "../types";

function Battle() {
  const { player, enemy, loading, turn, logs, winner, startBattle, attack } =
    useBattle();

  const [isBattleStarted, setIsBattleStarted] = useState(false);
  const [allNames, setAllNames] = useState<PokemonName[]>([]);
  const [p1Name, setP1Name] = useState("charizard");
  const [p2Name, setP2Name] = useState("blastoise");

  useEffect(() => {
    getPokemonNameList().then(setAllNames);
  }, []);

  const handleStartGame = () => {
    if (p1Name && p2Name) {
      startBattle(p1Name, p2Name);
      setIsBattleStarted(true);
    }
  };

  const handleReset = () => {
    setIsBattleStarted(false);
  };

  // 1. TELA DE SELEÇÃO
  if (!isBattleStarted) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center p-3 battle-background">
        <div className="position-absolute w-100 h-100"></div>
        <div
          className="bg-transparent-3 p-4 p-md-5 rounded-4 w-100 position-relative"
          style={{ maxWidth: "500px", zIndex: 1 }}
        >
          <h1 className="text-white text-center fw-bold mb-4 text-uppercase letter-spacing-2">
            Nova Batalha
          </h1>
          <div className="d-flex flex-column gap-4">
            <PokemonSelector
              label="Escolha seu Pokemon"
              allNames={allNames}
              selectedName={p1Name}
              onSelect={setP1Name}
            />
            <div className="text-center">
              <span className="badge bg-dark fs-5 rounded-circle p-3">VS</span>
            </div>
            <PokemonSelector
              label="Escolha o Oponente"
              allNames={allNames}
              selectedName={p2Name}
              onSelect={setP2Name}
            />
            <Button
              variant="linear-2"
              className="mt-4 py-3 w-100 fw-bold fs-5 shadow-lg"
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

  // 2. LOADING
  if (loading || !player || !enemy) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-dark">
        <Loading />
      </div>
    );
  }

  // 3. ARENA DE BATALHA
  return (
    <div>
      <div className="min-vh-100 d-flex flex-column battle-background overflow-hidden">
        {/* Overlay Escuro */}
        <div
          className="position-absolute w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.2)", zIndex: 0 }}
        ></div>

        {/* Container Principal */}
        <div
          className="container py-3 flex-grow-1 d-flex flex-column justify-content-center position-relative"
          style={{ zIndex: 1, maxWidth: "1200px" }}
        >
          {/* --- CAMPO DE BATALHA --- */}
          <div className="d-flex w-100 flex-grow-1 mb-3">
            {/* ============================================================== */}
            {/* COLUNA ESQUERDA (JOGADOR / ALIADO) */}
            {/* ============================================================== */}
            <div
              className="w-50 d-flex flex-column align-items-center"
              style={{ paddingTop: "200px" }}
            >
              {/* HUD Jogador */}
              <div className="battle-hud-floating player-side scale-in-animation mb-2">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="m-0 text-capitalize battle-hud-name">
                    {player.name}
                  </h5>
                  <small className="battle-hud-lv">Lv.100</small>
                </div>
                <HealthBar
                  current={player.currentHp}
                  max={player.maxHp}
                  label="HP"
                />
              </div>

              {/* Imagem Jogador */}
              <div
                className="position-relative"
                style={{ width: "220px", height: "220px" }}
              >
                <div
                  className="battle-platform"
                  style={{ width: "280px", bottom: "-15px" }}
                ></div>
                <AsyncImage
                  src={player.backImg || player.imgAnimada}
                  alt={player.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    position: "relative",
                    zIndex: 2,
                  }}
                  className={turn === "player" ? "" : ""}
                />
              </div>
            </div>

            {/* ============================================================== */}
            {/* COLUNA DIREITA (INIMIGO) */}
            {/* ============================================================== */}
            <div
              className="w-50 d-flex flex-column align-items-center"
              // Padding menor para ficar mais no alto
              style={{ paddingTop: "50px" }}
            >
              {/* HUD Inimigo */}
              <div className="battle-hud-floating enemy-side scale-in-animation mb-2">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="m-0 text-capitalize battle-hud-name">
                    {enemy.name}
                  </h5>
                  <small className="battle-hud-lv">Lv.100</small>
                </div>
                <HealthBar current={enemy.currentHp} max={enemy.maxHp} />
              </div>

              {/* Imagem Inimigo */}
              <div
                className="position-relative"
                style={{ width: "200px", height: "200px" }}
              >
                <div className="battle-platform"></div>
                <AsyncImage
                  src={enemy.imgAnimada || enemy.img}
                  alt={enemy.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    position: "relative",
                    zIndex: 2,
                  }}
                  className={turn === "enemy" ? "animate-pulse" : ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- RODAPÉ: CAIXA DE COMANDOS --- */}
      <div className="row mt-auto position-relative" style={{ zIndex: 10 }}>
        <div className="col-12">
          <div
            className="retro-dialog-box p-4 d-flex flex-column gap-3 align-items-stretch mb-2"
            style={{ minHeight: "160px" }}
          >
            <div className="d-flex flex-column flex-md-row gap-4 align-items-stretch">
              <div className="flex-grow-1 d-flex align-items-center justify-content-center justify-content-md-start px-3 text-shadow">
                {winner ? (
                  <div className="text-center w-100">
                    <h2
                      className={`mb-2 ${
                        winner === player.name ? "text-warning" : "text-danger"
                      }`}
                    >
                      {winner === player.name ? "Vitória!" : "Derrota..."}
                    </h2>
                    <p className="fs-5 mb-3">
                      {winner === player.name
                        ? `${player.name} venceu a batalha!`
                        : `${player.name} não pode mais lutar!`}
                    </p>
                    <div className="d-flex gap-3 justify-content-center">
                      <Button
                        variant="primary"
                        className="border-white"
                        onClick={() => startBattle(p1Name, p2Name)}
                      >
                        Revanche
                      </Button>
                      <Button variant="danger" onClick={handleReset}>
                        Trocar Time
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-100">
                    <h4 className="m-0 lh-base typing-effect fw-bold">
                      {logs.length > 0
                        ? logs[logs.length - 1].message
                        : `O que ${player.name} deve fazer?`}
                    </h4>
                  </div>
                )}
              </div>

              {!winner && turn === "player" && (
                <div
                  className="d-grid gap-2 fade-in"
                  style={{
                    gridTemplateColumns: "1fr 1fr",
                    minWidth: "320px",
                  }}
                >
                  {player.moves.map((move, i) => (
                    <button
                      key={i}
                      className="btn btn-light text-capitalize fw-bold border-2 border-dark text-start position-relative overflow-hidden"
                      onClick={() => attack(move)}
                      style={{
                        boxShadow: "3px 3px 0px #000",
                        transform: "translate(-2px, -2px)",
                        borderLeft: `8px solid ${getTypeColor(move.type)}`,
                      }}
                    >
                      <span className="d-block">{move.name}</span>
                      <small className="text-muted d-flex justify-content-between mt-1">
                        <span>{move.type}</span>
                        <span>PWR {move.power || "-"}</span>
                      </small>
                    </button>
                  ))}
                </div>
              )}

              {!winner && turn === "enemy" && (
                <div className="d-flex align-items-center px-5 border-start border-secondary fade-in">
                  <span className="text-warning fst-italic fs-5 animate-pulse">
                    Aguardando movimento do oponente...
                  </span>
                </div>
              )}
            </div>

            {!winner && (
              <div className="w-100 border-top border-secondary pt-2 mt-2 text-center border-opacity-25">
                <button
                  onClick={handleReset}
                  className="btn btn-sm text-danger text-decoration-underline hover-text-succes transition-all"
                >
                  Sair da Batalha
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Battle;
