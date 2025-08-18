import { Generations } from "../types/game";

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

export function pickRandomPokemonIds(
  choices: number,
  generations: Generations[]
): number[] {
  const ids = new Set<number>();
  while (ids.size < choices) {
    const randomGen =
      generations[Math.floor(Math.random() * generations.length)];
    const [startId, endId] = randomGen.range;
    const randomId =
      Math.floor(Math.random() * (endId - startId + 1)) + startId;
    ids.add(randomId);
  }
  return Array.from(ids);
}
