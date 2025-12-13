import { useState, useEffect, useCallback } from "react";
import type { BattleLog, BattlePokemon, Move, Turn } from "../types/battle";
import { getPokemonPorNome, getRandomMoves } from "../services/PokemonService";
import { calculateDamage, checkHit } from "../utils/battleLogic";
import { getTypeEffectiveness } from "../utils/typeChart";

export const useBattle = () => {
  const [player, setPlayer] = useState<BattlePokemon | null>(null);
  const [enemy, setEnemy] = useState<BattlePokemon | null>(null);
  const [turn, setTurn] = useState<Turn>("player");
  const [logs, setLogs] = useState<BattleLog[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const addLog = useCallback((message: string, turn: Turn) => {
    setLogs((prev) => [...prev, { message, turn }]);
  }, []);

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
    [addLog]
  );

  const handleAttack = useCallback(
    async (
      move: Move,
      attacker: BattlePokemon,
      defender: BattlePokemon,
      isPlayer: boolean
    ): Promise<void> => {
      const defenderTypeNames: string[] = [defender.type1, defender.type2]
        .filter(Boolean)
        .map((t) => t as string);

      const effectiveness = getTypeEffectiveness(move.type, defenderTypeNames);

      const hit = checkHit(move);
      if (!hit) {
        const missMessage = `${attacker.name} usou ${move.name}, mas errou!`;
        if (isPlayer) addLog(missMessage, "player");
        else addLog(missMessage, "enemy");
        setTurn(isPlayer ? "enemy" : "player");
        return;
      }

      const baseDamage = calculateDamage(attacker, defender, move);
      const finalDamage = Math.floor(baseDamage * effectiveness);

      const newHp = Math.max(0, defender.currentHp - finalDamage);

      if (isPlayer) {
        setEnemy((prev) => (prev ? { ...prev, currentHp: newHp } : null));
        const formattedMultiplier = `x${Number(
          effectiveness % 1 === 0
            ? effectiveness
            : Number(effectiveness.toFixed(2))
        )}`;
        let effectivenessMsg = "";
        if (effectiveness > 1)
          effectivenessMsg = ` Foi super efetivo! (${formattedMultiplier})`;
        else if (effectiveness === 0)
          effectivenessMsg = ` Não teve efeito... (${formattedMultiplier})`;
        else if (effectiveness < 1)
          effectivenessMsg = ` Não foi muito efetivo... (${formattedMultiplier})`;

        const msg = `${attacker.name} usou ${move.name}.${effectivenessMsg} Causou ${finalDamage} de dano!`;
        addLog(msg, "player");
      } else {
        setPlayer((prev) => (prev ? { ...prev, currentHp: newHp } : null));
        const formattedMultiplier = `x${Number(
          effectiveness % 1 === 0
            ? effectiveness
            : Number(effectiveness.toFixed(2))
        )}`;
        let effectivenessMsg = "";
        if (effectiveness > 1)
          effectivenessMsg = ` Foi super efetivo! (${formattedMultiplier})`;
        else if (effectiveness === 0)
          effectivenessMsg = ` Não teve efeito... (${formattedMultiplier})`;
        else if (effectiveness < 1)
          effectivenessMsg = ` Não foi muito efetivo... (${formattedMultiplier})`;

        const msg = `${attacker.name} usou ${move.name}.${effectivenessMsg} Causou ${finalDamage} de dano!`;
        addLog(msg, "enemy");
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
    },
    [addLog]
  );

  useEffect(() => {
    if (turn === "enemy" && !winner && enemy && player) {
      const timer = setTimeout(() => {
        const randomMove =
          enemy.moves[Math.floor(Math.random() * enemy.moves.length)];
        handleAttack(randomMove, enemy, player, false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [turn, winner, enemy, player, handleAttack]);

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
