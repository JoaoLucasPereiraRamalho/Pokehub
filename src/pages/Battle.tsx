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

  // =========================================================
  // RENDERIZAÇÃO 1: Tela de Seleção
  // =========================================================
  if (!isBattleStarted) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center p-3 battle-background">
        {/* Overlay escuro */}
        <div
          className="position-absolute w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 0 }}
        ></div>

        <div
          className="bg-dark bg-opacity-75 p-4 p-md-5 rounded-4 shadow-lg w-100 position-relative"
          style={{ maxWidth: "500px", zIndex: 1, border: "2px solid #555" }}
        >
          <h1 className="text-white text-center fw-bold mb-4 text-uppercase letter-spacing-2">
            Nova Batalha
          </h1>

          <div className="d-flex flex-column gap-4">
            <PokemonSelector
              label="Escolha seu Campeão"
              allNames={allNames}
              selectedName={p1Name}
              onSelect={setP1Name}
            />
            <div className="text-center">
              <span className="badge bg-danger fs-5 rounded-circle p-3">
                VS
              </span>
            </div>
            <PokemonSelector
              label="Escolha o Oponente"
              allNames={allNames}
              selectedName={p2Name}
              onSelect={setP2Name}
            />

            <Button
              variant="linear"
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

  // =========================================================
  // RENDERIZAÇÃO 2: Loading da Batalha
  // =========================================================
  if (loading || !player || !enemy) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-dark">
        <Loading />
      </div>
    );
  }

  // =========================================================
  // RENDERIZAÇÃO 3: Arena de Batalha (Estilo Retro)
  // =========================================================
  return (
    <div className="min-vh-100 d-flex flex-column battle-background overflow-hidden">
      {/* Overlay leve */}
      <div
        className="position-absolute w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.2)", zIndex: 0 }}
      ></div>

      <div
        className="container py-3 flex-grow-1 d-flex flex-column justify-content-center position-relative"
        style={{ zIndex: 1, maxWidth: "1000px" }}
      >
        {/* --- CAMPO DE BATALHA --- */}
        <div className="row g-0 flex-grow-1 mb-3 position-relative">
          <div className="col-12 d-flex flex-column align-items-end mb-5">
            <div
              className="bg-white bg-opacity-90 text-dark p-3 rounded-start-pill shadow-lg mb-2 border-start border-5 border-danger scale-in-animation"
              style={{ minWidth: "280px" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="m-0 fw-bold text-capitalize">{enemy.name}</h5>
                <small className="fw-bold text-muted">Lv.100</small>
              </div>
              <HealthBar current={enemy.currentHp} max={enemy.maxHp} />
            </div>

            <div
              className="position-relative me-3 me-md-5 mt-2"
              style={{ width: "200px", height: "200px" }}
            >
              <div className="battle-platform"></div> {/* Sombra no chão */}
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

          <div className="col-12 d-flex flex-column align-items-start mt-auto">
            <div
              className="position-relative ms-3 ms-md-5 mb-2"
              style={{ width: "220px", height: "220px" }}
            >
              <div
                className="battle-platform"
                style={{ width: "280px", bottom: "-15px" }}
              ></div>
              <AsyncImage
                src={player.imgAnimada || player.img}
                alt={player.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  position: "relative",
                  zIndex: 2,
                }}
                className={turn === "player" ? "animate-pulse" : ""}
              />
            </div>

            {/* HUD (Barra de Vida) */}
            <div
              className="bg-white bg-opacity-90 text-dark p-3 rounded-end-pill shadow-lg w-100 border-end border-5 border-primary scale-in-animation"
              style={{ maxWidth: "320px" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="m-0 fw-bold text-capitalize">{player.name}</h5>
                <small className="fw-bold text-muted">Lv.100</small>
              </div>
              <HealthBar
                current={player.currentHp}
                max={player.maxHp}
                label="HP"
              />
              <div className="text-end mt-1 fw-bold font-monospace small">
                {player.currentHp} / {player.maxHp}
              </div>
            </div>
          </div>
        </div>

        {/* --- CAIXA DE COMANDOS --- */}
        <div className="row mt-auto">
          <div className="col-12">
            <div
              className="retro-dialog-box p-4 d-flex flex-column flex-md-row gap-4 align-items-stretch"
              style={{ minHeight: "160px" }}
            >
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

              {/* Lado Direito: Menu de Golpes*/}
              {!winner && turn === "player" && (
                <div
                  className="d-grid gap-2 fade-in"
                  style={{ gridTemplateColumns: "1fr 1fr", minWidth: "320px" }}
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

              {/* Aviso de Espera*/}
              {!winner && turn === "enemy" && (
                <div className="d-flex align-items-center px-5 border-start border-secondary fade-in">
                  <span className="text-warning fst-italic fs-5 animate-pulse">
                    Aguardando movimento do oponente...
                  </span>
                </div>
              )}
            </div>

            {/* Botão de Desistir*/}
            {!winner && (
              <div className="text-center mt-2">
                <button
                  onClick={handleReset}
                  className="btn btn-sm text-white-50 text-decoration-underline"
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
