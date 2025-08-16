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

    const selectedGenerations = allGenerations.filter((g) =>
      generations.includes(g.gen)
    );

    onStart({
      rounds,
      choices,
      generations: selectedGenerations,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 space-y-6 bg-white shadow rounded-xl"
    >
      <h1 className="text-2xl font-bold text-center">Game Settings</h1>

      {/* Rounds */}
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Number of Rounds</label>
        <select
          value={rounds}
          onChange={(e) => setRounds(Number(e.target.value))}
          className="p-2 border rounded"
        >
          {[5, 10, 15].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Difficulty */}
      <div className="flex flex-col space-y-2">
        <label className="font-medium">Difficulty (Choices per Question)</label>
        <select
          value={choices}
          onChange={(e) => setChoices(Number(e.target.value))}
          className="p-2 border rounded"
        >
          {[2, 4, 6].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Generations */}
      <fieldset className="space-y-2">
        <legend className="font-medium">Select Generations</legend>
        <div className="grid grid-cols-2 gap-2">
          {allGenerations.map(({ gen, name }) => (
            <label
              key={gen}
              className="flex items-center space-x-2 border p-2 rounded cursor-pointer hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={generations.includes(gen)}
                onChange={() => toggleGeneration(gen)}
                className="h-4 w-4"
              />
              <span>
                Gen {gen} - {name}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Submit */}
      <button
        type="submit"
        className="w-full text-white py-2 px-4 font-semibold rounded bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition"
      >
        Start Game
      </button>
    </form>
  );
}
