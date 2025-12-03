import { useEffect } from "react";
import { useBattle } from "../hooks/useBattle";

import Loading from "../components/ui/Loading";
import Button from "../components/ui/Button";
import AsyncImage from "../components/ui/AsyncImage";
import { getTypeColor } from "../utils/constants";
import HealthBar from "../components/battle/HealthBar";

function Battle() {
  const { player, enemy, loading, turn, logs, winner, startBattle, attack } =
    useBattle();

  useEffect(() => {
    startBattle("charizard", "blastoise");
  }, [startBattle]);

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

  return (
    <div
      style={{ backgroundColor: "#091D3C" }}
      className="min-vh-100 text-white p-3 p-md-5"
    >
      <div className="container py-4" style={{ maxWidth: "900px" }}>
        <div className="row g-5 align-items-end mb-5">
          <div className="col-12 d-flex flex-column align-items-center align-items-md-end order-1 order-md-2">
            <div
              className="bg-dark bg-opacity-50 p-3 rounded-3 mb-3 w-100"
              style={{ maxWidth: "300px" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="m-0 fw-bold text-capitalize">{enemy.name}</h5>
                <span
                  className="badge"
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
                className={turn === "enemy" ? "animate-pulse" : ""}
              />
            </div>
          </div>

          <div className="col-12 d-flex flex-column align-items-center align-items-md-start order-2 order-md-1">
            <div className="position-relative mb-3">
              <AsyncImage
                src={player.imgAnimada || player.img}
                alt={player.name}
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "contain",
                }}
                className={turn === "player" ? "animate-pulse" : ""}
              />
            </div>

            <div
              className="bg-dark bg-opacity-50 p-3 rounded-3 w-100"
              style={{ maxWidth: "300px" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="m-0 fw-bold text-capitalize">{player.name}</h5>
                <span
                  className="badge"
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
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 col-md-7 mb-4">
            <div className="bg-light text-dark p-4 rounded-4 shadow h-100">
              {winner ? (
                <div className="text-center">
                  <h2 className="fw-bold mb-3">
                    {winner === player.name ? "Você Venceu!" : "Você Perdeu!"}
                  </h2>
                  <Button
                    variant="danger"
                    onClick={() => startBattle("charizard", "blastoise")}
                  >
                    Batalhar Novamente
                  </Button>
                </div>
              ) : (
                <>
                  <h5 className="fw-bold mb-3 border-bottom pb-2">
                    Escolha um ataque:
                  </h5>
                  {turn === "player" ? (
                    <div
                      className="d-grid gap-2 d-md-grid"
                      style={{ gridTemplateColumns: "1fr 1fr" }}
                    >
                      {player.moves.map((move, index) => (
                        <button
                          key={index}
                          className="btn btn-outline-dark py-3 text-capitalize fw-bold position-relative overflow-hidden"
                          onClick={() => attack(move)}
                          style={{
                            borderLeft: `5px solid ${getTypeColor(move.type)}`,
                          }}
                        >
                          {move.name}
                          <div className="small text-muted fw-normal">
                            Poder: {move.power > 0 ? move.power : "-"}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <h4 className="text-muted animate-pulse">
                        Oponente está pensando...
                      </h4>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="col-12 col-md-5 mb-4">
            <div
              className="bg-black bg-opacity-75 p-3 rounded-3 text-white h-100 overflow-auto"
              style={{ maxHeight: "300px", minHeight: "200px" }}
            >
              <h6 className="text-warning mb-3">Log de Batalha:</h6>
              <div className="d-flex flex-column-reverse">
                {" "}
                {logs.map((log, i) => (
                  <p
                    key={i}
                    className={`mb-1 small ${
                      log.turn === "player" ? "text-info" : "text-danger"
                    }`}
                  >
                    ➤ {log.message}
                  </p>
                ))}
                {logs.length === 0 && (
                  <span className="text-muted fst-italic">
                    A batalha vai começar...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Battle;
