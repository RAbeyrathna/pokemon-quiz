"use client";

import { useRouter } from "next/navigation";

export default function FAQPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[var(--background)] text-[var(--foreground)] font-sans p-8 sm:p-20 gap-8">
      <header className="text-4xl sm:text-5xl font-mono font-bold text-center">
        Pokémon Cry Quiz - FAQ
      </header>

      <section className="max-w-3xl flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            What is Pokémon Cry Quiz?
          </h2>
          <p>
            Pokémon Cry Quiz is a fun game where you listen to a Pokémon&apos;s
            cry and try to guess which Pokémon it is. Each correct guess earns
            you points!
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">How to Play?</h2>
          <ol className="list-decimal list-inside flex flex-col gap-2">
            <li>
              Select the number of rounds and difficulty (number of choices per
              question).
            </li>
            <li>Choose which Pokémon generations you want to include.</li>
            <li>Click &quot;Start Game&quot; to begin.</li>
            <li>
              Listen to the Pokémon cry and select the correct Pokémon from the
              options.
            </li>
            <li>
              After each round, you’ll see if your answer was correct and your
              score updates.
            </li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Scoring</h2>
          <p>
            Each correct answer gives you 1 point. At the end of the game, you
            will see your total score and accuracy percentage.
          </p>
        </div>
      </section>

      <button
        onClick={() => router.push("/")}
        className="mt-8 px-6 py-3 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold transition-colors"
      >
        Return Home
      </button>
    </div>
  );
}
