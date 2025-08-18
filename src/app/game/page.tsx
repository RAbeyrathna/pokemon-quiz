"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 font-sans">
        <Settings onStart={onStart} />
        <button
          className="px-5 py-2 mt-5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
          onClick={() => router.push("/")}
        >
          Return Home
        </button>
      </div>
    );
  }

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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 font-sans bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Who&apos;s that Pokémon?
        </h1>

        {!gameOver && (
          <>
            <p className=" text-gray-600 font-medium">
              Round {round} of {gameSettings.rounds}
            </p>

            <div className="">
              {correctAnswer?.sprite && (
                <Image
                  src={correctAnswer.sprite}
                  alt={correctAnswer.name}
                  width={96}
                  height={96}
                  className="mx-auto filter brightness-0"
                />
              )}
            </div>

            {correctAnswer && (
              <div className="mb-6">
                <audio ref={audioRef} src={correctAnswer.cry} autoPlay />
                <button
                  onClick={handlePlayCry}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Play Cry
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              {options.map((pokemon) => (
                <button
                  key={pokemon.name}
                  onClick={() => handleAnswerClick(pokemon.name)}
                  className="px-4 py-3 rounded-lg bg-gray-100 hover:bg-indigo-100 text-gray-800 font-medium shadow-sm transition-colors"
                >
                  {pokemon.name}
                </button>
              ))}
            </div>
          </>
        )}

        {gameOver && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Game Over!</h2>
            <p className="text-gray-700 font-medium mb-2">
              Score: <span className="font-bold">{score}</span> /{" "}
              {gameSettings.rounds}
            </p>
            <p className="text-gray-700 font-medium mb-6">
              Accuracy:{" "}
              <span className="font-bold">
                {Math.round((score / gameSettings.rounds) * 100)}%
              </span>
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => quiz.startGame(gameSettings)}
                className="px-5 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
              >
                Play Again
              </button>
              <button
                onClick={onResetGame}
                className="px-5 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition-colors"
              >
                Change Settings
              </button>
            </div>
          </div>
        )}

        <button
          className="mt-8 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
          onClick={() => router.push("/")}
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
