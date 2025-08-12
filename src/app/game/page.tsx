"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Settings from "../components/Settings";
import {
  usePokemonQuiz,
  generations as allGenerations,
} from "../hooks/usePokemonQuiz";
import { GameSettings } from "../types/game";

export default function GamePage() {
  const router = useRouter();

  const defaultGameSettings: GameSettings = {
    rounds: 5,
    choices: 4,
    generations: allGenerations,
  };

  const [gameSettings, setGameSettings] =
    useState<GameSettings>(defaultGameSettings);
  const [gameStarted, setGameStarted] = useState(false);

  const quiz = usePokemonQuiz(gameStarted ? gameSettings : null);

  const onStart = (settings: GameSettings) => {
    setGameSettings(settings);
    setGameStarted(true);
    quiz.startGame(settings);
  };

  const onResetGame = () => {
    setGameStarted(false);
  };

  if (!gameStarted) {
    // Show Settings form first, no game yet
    return (
      <div>
        <h1>Pokémon Cry Quiz</h1>
        <Settings onStart={onStart} />
        <button onClick={() => router.push("/")}>Return Home</button>
      </div>
    );
  }

  // Game has started — destructure the hook's state and handlers
  const {
    options,
    correctAnswer,
    selectedAnswer,
    round,
    score,
    gameOver,
    audioRef,
    handleAnswerClick,
    handlePlayCry,
  } = quiz;

  return (
    <div>
      <h1>Pokémon Cry Quiz</h1>

      {!gameOver && (
        <>
          <div>
            Round {round} of {gameSettings.rounds}
          </div>

          {correctAnswer && (
            <>
              <audio ref={audioRef} src={correctAnswer.cry} autoPlay />
              <button onClick={handlePlayCry}>Play Cry</button>
            </>
          )}

          <div>
            {options.map((pokemon) => (
              <div key={pokemon.name}>
                <button onClick={() => handleAnswerClick(pokemon.name)}>
                  {pokemon.name}
                </button>
              </div>
            ))}
          </div>

          {selectedAnswer && (
            <p>
              {selectedAnswer === correctAnswer?.name
                ? "✅ Correct!"
                : `❌ Wrong! It was ${correctAnswer?.name}`}
            </p>
          )}
        </>
      )}

      {gameOver && (
        <div>
          <h1>Game Over!</h1>
          <p>
            Score: {score} / {gameSettings.rounds}
          </p>
          <p>Accuracy: {Math.round((score / gameSettings.rounds) * 100)}%</p>
          <button onClick={() => quiz.startGame(gameSettings)}>
            Play Again
          </button>
          <button onClick={onResetGame}>Change Settings</button>
        </div>
      )}

      <button onClick={() => router.push("/")}>Return Home</button>
    </div>
  );
}
