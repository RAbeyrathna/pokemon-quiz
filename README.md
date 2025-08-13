# Pokémon Cry Quiz

A fun and challenging quiz game for Pokémon fans!  
Players will hear a Pokémon's cry and must choose the correct Pokémon from multiple options.  
Test your memory, learn new cries, and compete for the best score.

Take a look at the live demo [here](https://pokequiz.rabeyrathna.com/)!

---

## Features

- **Listen to Pokémon Cries** – Audio plays at the start of each round.
- **Multiple Choice Answers** – Pick the correct Pokémon from a list of options.
- **Customizable Game Settings** – Choose number of rounds, difficulty, and which Pokémon generations to include.
- **Hints** – Option to reveal a silhouette, the typing or display the dex entry once per game.
- **Switch Mode** - Potentially the option to guess the Pokémon based off the dex entry instead of the cry
- **Timer Mode** – Optional time limit for each question for added challenge.
- **Score Tracking** – View your total correct answers and accuracy at the end.
- **Replayability** – Randomized Pokémon selection each round.

---

## Technologies Used

- **HTML** – Base markup.
- **TypeScript** – Type-safe JavaScript for reliability.
- **React** – Component-based UI building.
- **Next.js** – Framework for building fast, SEO-friendly React apps with routing and API support.
- **TailwindCSS** – Utility-first styling for responsive design.
- **Firebase** – Optional authentication and data storage for leaderboards or achievements.
- **[PokéAPI](https://pokeapi.co/)** – Pokémon data, audio and sprite resources

---

## To Do

### Functionality

- [ ] Play Pokémon cry at the start of each round.
- [ ] Allow players to choose the number of rounds.
- [ ] Add optional time limit per question.
- [ ] Enable hint system with Pokémon silhouette, typing or pokedex entry (or cry if playing switch mode).
  - [ ] Will be styled like 'Who wants to be a millionaire', allowing you to use each hint once per game
- [ ] Let players choose generations included in the quiz.
- [ ] Track and display scores at the end of each game.
- [ ] Save high scores and player stats using Firebase.
- [ ] Add a "Practice Mode" with unlimited cries for learning.
- [ ] Implement difficulty levels (e.g., more answer choices for harder mode).

### Styling

- [ ] Pokémon-themed design with TailwindCSS.
- [ ] Mobile and desktop responsive layout.
- [ ] Animations for correct/incorrect answers.
- [ ] Visual effects for hints and round transitions.

### Other

- [ ] Deploy live demo on Netlify.
- [ ] Optimise audio loading for faster gameplay.
- [ ] Add sound toggle and volume control.
- [ ] Create an achievement/badge system for milestones.
