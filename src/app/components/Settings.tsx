"use client";
import { useState } from "react";

import { GameSettings } from "../types/game";
import { generations as allGenerations } from "../hooks/usePokemonQuiz";

type SettingsProps = {
  onStart: (settings: GameSettings) => void;
};

export default function Settings({ onStart }: SettingsProps) {
  const [rounds, setRounds] = useState(5);
  const [choices, setChoices] = useState(4);
  const [generations, setGenerations] = useState<number[]>([1]);

  const toggleGeneration = (gen: number) => {
    if (generations.includes(gen)) {
      setGenerations(generations.filter((g) => g !== gen));
    } else {
      setGenerations([...generations, gen]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (generations.length === 0) {
      alert("Please select at least one generation");
      return;
    }

    // Map number array to full generation objects here
    const selectedGenerations = allGenerations.filter((g) =>
      generations.includes(g.gen)
    );

    onStart({ rounds, choices, generations: selectedGenerations });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Number of Rounds:
        <select
          value={rounds}
          onChange={(e) => setRounds(Number(e.target.value))}
        >
          {[5, 10, 15].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </label>

      <label>
        Difficulty (Choices per Question):
        <select
          value={choices}
          onChange={(e) => setChoices(Number(e.target.value))}
        >
          {[2, 4, 6].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </label>

      <fieldset>
        <legend>Select Generations</legend>
        {allGenerations.map(({ gen, name }) => (
          <label key={gen}>
            <input
              type="checkbox"
              checked={generations.includes(gen)}
              onChange={() => toggleGeneration(gen)}
            />
            Generation {gen} - {name}
          </label>
        ))}
      </fieldset>

      <button type="submit">Start Game</button>
    </form>
  );
}
