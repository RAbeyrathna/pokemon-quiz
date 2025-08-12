"use client";

import { useRouter } from "next/navigation";

export default function GamePage() {
  const router = useRouter();

  return (
    <div>
      <h1>Pokémon Cry Quiz</h1>
      <div>
        <a>Play the game innit</a>
      </div>

      <button onClick={() => router.push("/")}>Return Home</button>
    </div>
  );
}
