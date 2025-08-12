import { useState, useEffect, useRef } from "react";

import { GameSettings, PokemonOption } from "../types/game";

const generationRanges: Record<number, [number, number]> = {
  1: [1, 151], // Kanto
  2: [152, 251], // Johto
  3: [252, 386], // Hoenn
  4: [387, 493], // Sinnoh
  5: [494, 649], // Unova
  6: [650, 721], // Kalos
  7: [722, 809], // Alola
  8: [810, 898], // Galar
  9: [899, 1010], // Paldea
};

export function usePokemonQuiz(settings: GameSettings | null) {
  const [options, setOptions] = useState<PokemonOption[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<PokemonOption | null>(
    null
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [gameSettings, setGameSettings] = useState<GameSettings | null>(
    settings
  );
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fetchPokemonData = async (settings: GameSettings) => {
    const { choices, generations } = settings;

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

  const startGame = (settings: GameSettings) => {
    setGameSettings(settings);
    setRound(1);
    setScore(0);
    setGameOver(false);
    setHasStarted(true);
    fetchPokemonData(settings);
  };

  useEffect(() => {
    if (!gameOver && hasStarted && gameSettings) {
      // Only fetch on round change after game has started
      fetchPokemonData(gameSettings);
    }
  }, [round]);

  const handleAnswerClick = (name: string) => {
    setSelectedAnswer(name);

    if (name === correctAnswer?.name) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (gameSettings && round < gameSettings.rounds) {
        setRound((prev) => prev + 1);
      } else {
        setGameOver(true);
      }
    }, 1500);
  };

  const handlePlayCry = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return {
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
  };
}
