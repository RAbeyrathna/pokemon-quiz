"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

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

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [round, setRound] = useState(1);
  const [totalRounds, setTotalRounds] = useState(5);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const fetchPokemonData = async () => {
    const getRandomId = () => Math.floor(Math.random() * 151) + 1;

    const ids = new Set<number>();
    while (ids.size < 4) {
      ids.add(getRandomId());
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
      if (round < totalRounds) {
        setRound((prev) => prev + 1);
        fetchPokemonData();
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

      {!gameOver && (
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
            Score: {score} / {totalRounds}
          </p>
          <p>Accuracy: {Math.round((score / totalRounds) * 100)}%</p>
          <button
            onClick={() => {
              setScore(0);
              setRound(1);
              setGameOver(false);
              fetchPokemonData();
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
