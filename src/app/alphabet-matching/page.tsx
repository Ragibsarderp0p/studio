
'use client';

import { GameContainer } from '@/components/games/game-container';
import { AlphabetMatchingGame } from '@/components/games/alphabet-matching-game';
import { useGameRound } from '@/hooks/use-game-round';

export default function AlphabetMatchingPage() {
  const gameRound = useGameRound();
  return (
    <GameContainer
      title="Alphabet Matching"
      instructions="Click on two cards to flip them over. Find all the matching pairs of letters!"
      roundStats={gameRound.roundStats}
    >
      <AlphabetMatchingGame gameRound={gameRound} />
    </GameContainer>
  );
}
