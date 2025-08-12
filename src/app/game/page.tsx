"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import Settings, { GameSettings, SettingsProps } from "../components/Settings";

type PokemonOption = {
  name: string;
  cry: string;
};

export default function GamePage() {
  const router = useRouter();

  const [options, setOptions] = useState<PokemonOption[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<PokemonOption | null>(
    null
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [gameStarted, setGameStarted] = useState(false);

  const [gameSettings, setGameSettings] = useState({
    rounds: 5,
    choices: 4,
    generations: [1],
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Current game states
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  //Start game settings
  const startGame = (settings: {
    rounds: number;
    choices: number;
    generations: number[];
  }) => {
    setGameSettings(settings);
    setGameStarted(true);

    setScore(0);
    setRound(1);
    setGameOver(false);
    fetchPokemonData(settings);
  };

  useEffect(() => {
    if (gameStarted && !gameOver) {
      fetchPokemonData(gameSettings);
    }
  }, [gameStarted, round, gameOver]);

  const fetchPokemonData = async (settings: GameSettings) => {
    const { choices, generations } = settings;

    const generationRanges: Record<number, [number, number]> = {
      1: [1, 151],
      2: [152, 251],
      3: [252, 386],
    };

    const ids = new Set<number>();
    while (ids.size < choices) {
      const randomGen =
        generations[Math.floor(Math.random() * generations.length)];
      const [startId, endId] = generationRanges[randomGen];
      const randomId =
        Math.floor(Math.random() * (endId - startId + 1)) + startId;
      ids.add(randomId);
    }

    const promises = Array.from(ids).map(async (id) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      return {
        name: data.name,
        cry: data.cries.latest,
      };
    });

    const fetchedOptions = await Promise.all(promises);
    const randomCorrect =
      fetchedOptions[Math.floor(Math.random() * fetchedOptions.length)];

    setOptions(fetchedOptions);
    setCorrectAnswer(randomCorrect);
    setSelectedAnswer(null);
  };

  const handleAnswerClick = (name: string) => {
    setSelectedAnswer(name);

    if (name === correctAnswer?.name) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (round < gameSettings.rounds) {
        setRound((prev) => prev + 1);
        fetchPokemonData(gameSettings);
      } else {
        setGameOver(true);
      }
    }, 1500);
  };

  const handlePlayCry = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // restart from beginning
      audioRef.current.play();
    }
  };

  return (
    <div>
      <h1>Pokémon Cry Quiz</h1>

      {!gameStarted && (
        <>
          <Settings onStart={startGame} />
        </>
      )}

      {!gameOver && gameStarted && (
        <>
          {/* Play Cry */}
          {correctAnswer && (
            <>
              <audio ref={audioRef} src={correctAnswer.cry} autoPlay />
              <button onClick={handlePlayCry}>Play Cry</button>
            </>
          )}

          {/* Show Options */}
          <div>
            {options.map((pokemon) => (
              <div key={pokemon.name}>
                <button onClick={() => handleAnswerClick(pokemon.name)}>
                  {pokemon.name}
                </button>
              </div>
            ))}
          </div>

          {/* Show Result */}
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
              setScore(0);
              setRound(1);
              setGameOver(false);
              fetchPokemonData(gameSettings);
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
