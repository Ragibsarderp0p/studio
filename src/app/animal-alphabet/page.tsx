
'use client';

import { GameContainer } from '@/components/games/game-container';
import { AnimalAlphabetGame } from '@/components/games/animal-alphabet-game';
import { useGameRound } from '@/hooks/use-game-round';

export default function AnimalAlphabetPage() {
  const gameRound = useGameRound();
  return (
    <GameContainer
      title="Animal Alphabet"
      instructions="An animal name is shown with a missing letter. Type the correct letter to win!"
      roundStats={gameRound.roundStats}
    >
      <AnimalAlphabetGame gameRound={gameRound} />
    </GameContainer>
  );
}
