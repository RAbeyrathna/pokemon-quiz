import { useState, useEffect, useRef } from "react";

import { GameSettings, Generations, PokemonOption } from "../types/game";

export const generations: Generations[] = [
  { gen: 1, name: "Kanto", range: [1, 151] },
  { gen: 2, name: "Johto", range: [152, 251] },
  { gen: 3, name: "Hoenn", range: [252, 386] },
  { gen: 4, name: "Sinnoh", range: [387, 493] },
  { gen: 5, name: "Unova", range: [494, 649] },
  { gen: 6, name: "Kalos", range: [650, 721] },
  { gen: 7, name: "Alola", range: [722, 809] },
  { gen: 8, name: "Galar", range: [810, 898] },
  { gen: 9, name: "Paldea", range: [899, 1010] },
];

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
      // Pick a random generation object from the generations array
      const randomGenObj =
        generations[Math.floor(Math.random() * generations.length)];

      // Destructure the start and end of the range from the picked gen's range
      const [startId, endId] = randomGenObj.range;

      // Pick a random Pokemon ID within the range
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
        sprite: data.sprites.front_default,
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

    if (gameSettings && round < gameSettings.rounds) {
      setRound((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
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
