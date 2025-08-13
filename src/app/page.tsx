"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 font-sans bg-gray-50 dark:bg-gray-900">
      <main className="flex flex-col items-center sm:items-start gap-8">
        <header className="font-mono text-3xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 text-center sm:text-left">
          Pokémon Cry Quiz
        </header>
        <p className="font-mono text-sm sm:text-lg text-gray-700 dark:text-gray-300 text-center sm:text-left">
          Try to become the very best!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            className="flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            onClick={() => router.push("/game")}
          >
            <Image src="/pokeball.png" alt="Game icon" width={20} height={20} />
            Start Game
          </button>

          <button
            className="flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            onClick={() => router.push("/faq")}
          >
            How to Play
          </button>
        </div>
      </main>
    </div>
  );
}
