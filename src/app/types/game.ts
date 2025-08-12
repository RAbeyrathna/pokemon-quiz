export type PokemonOption = {
  name: string;
  cry: string;
};

export type Generations = {
  gen: number;
  name: string;
  range: [number, number];
};

export type GameSettings = {
  rounds: number;
  choices: number;
  generations: Generations[];
};
