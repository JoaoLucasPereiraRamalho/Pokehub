import { useState, useEffect, useCallback } from "react";
import type { BattleLog, BattlePokemon, Move, Turn } from "../types/battle";
import { getPokemonPorNome, getRandomMoves } from "../services/PokemonService";
import { calculateDamage } from "../utils/battleLogic";

export const useBattle = () => {
  const [player, setPlayer] = useState<BattlePokemon | null>(null);
  const [enemy, setEnemy] = useState<BattlePokemon | null>(null);
  const [turn, setTurn] = useState<Turn>("player");
  const [logs, setLogs] = useState<BattleLog[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const addLog = (message: string, turn: Turn) => {
    setLogs((prev) => [...prev, { message, turn }]);
  };

  const startBattle = useCallback(
    async (playerPokemonName: string, enemyPokemonName: string) => {
      setLoading(true);
      setLogs([]);
      setWinner(null);
      setTurn("player");

      try {
        const [p1Data, p2Data] = await Promise.all([
          getPokemonPorNome(playerPokemonName),
          getPokemonPorNome(enemyPokemonName),
        ]);

        const [p1Moves, p2Moves] = await Promise.all([
          getRandomMoves(playerPokemonName),
          getRandomMoves(enemyPokemonName),
        ]);

        setPlayer({
          ...p1Data,
          currentHp: p1Data.hp * 4,
          maxHp: p1Data.hp * 4,
          moves: p1Moves,
        });
        setEnemy({
          ...p2Data,
          currentHp: p2Data.hp * 4,
          maxHp: p2Data.hp * 4,
          moves: p2Moves,
        });

        addLog(`A batalha começou! ${p1Data.name} vs ${p2Data.name}`, "player");
      } catch (error) {
        console.error("Erro ao iniciar batalha:", error);
        addLog("Erro ao carregar dados da batalha.", "player");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleAttack = async (
    move: Move,
    attacker: BattlePokemon,
    defender: BattlePokemon,
    isPlayer: boolean
  ) => {
    const damage = calculateDamage(attacker, defender, move);

    const newHp = Math.max(0, defender.currentHp - damage);

    if (isPlayer) {
      setEnemy((prev) => (prev ? { ...prev, currentHp: newHp } : null));
      addLog(
        `${attacker.name} usou ${move.name} e causou ${damage} de dano!`,
        "player"
      );
    } else {
      setPlayer((prev) => (prev ? { ...prev, currentHp: newHp } : null));
      addLog(
        `${attacker.name} usou ${move.name} e causou ${damage} de dano!`,
        "enemy"
      );
    }

    if (newHp === 0) {
      setWinner(attacker.name);
      addLog(
        `${defender.name} desmaiou! ${attacker.name} venceu!`,
        isPlayer ? "player" : "enemy"
      );
      return;
    }

    setTurn(isPlayer ? "enemy" : "player");
  };

  useEffect(() => {
    if (turn === "enemy" && !winner && enemy && player) {
      const timer = setTimeout(() => {
        // Escolhe golpe aleatório
        const randomMove =
          enemy.moves[Math.floor(Math.random() * enemy.moves.length)];
        handleAttack(randomMove, enemy, player, false);
      }, 1500); // Espera 1.5s para dar emoção

      return () => clearTimeout(timer);
    }
  }, [turn, winner, enemy, player]);

  return {
    player,
    enemy,
    turn,
    logs,
    winner,
    loading,
    startBattle,
    attack: (move: Move) =>
      player && enemy && handleAttack(move, player, enemy, true),
  };
};
