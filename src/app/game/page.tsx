"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Settings, { GameSettings } from "../components/Settings";
import { usePokemonQuiz } from "../hooks/usePokemonQuiz";

export default function GamePage() {
  const router = useRouter();
  const [gameStarted, setGameStarted] = useState(false);
  const initialSettings = { rounds: 5, choices: 4, generations: [1] };

  const {
    options,
    correctAnswer,
    selectedAnswer,
    gameSettings,
    round,
    score,
    gameOver,
    audioRef,
    startGame,
    handleAnswerClick,
    handlePlayCry,
  } = usePokemonQuiz(initialSettings);

  const onStart = (settings: GameSettings) => {
    startGame(settings);
    setGameStarted(true);
  };

  return (
    <div>
      <h1>Pokémon Cry Quiz</h1>

      {!gameStarted && <Settings onStart={onStart} />}

      {gameStarted && !gameOver && (
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
          <button
            onClick={() => {
              startGame(gameSettings);
            }}
          >
            Play Again
          </button>
        </div>
      )}

      <button onClick={() => router.push("/")}>Return Home</button>
    </div>
  );
}
