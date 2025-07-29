
'use client';

import { GameContainer } from '@/components/games/game-container';
import { NumberMatchingGame } from '@/components/games/number-matching-game';
import { useGameRound } from '@/hooks/use-game-round';

export default function NumberMatchingPage() {
  const gameRound = useGameRound();
  return (
    <GameContainer
      title="Number Matching"
      instructions="Click two cards to find matching numbers. Find all the pairs to win!"
      roundStats={gameRound.roundStats}
    >
      <NumberMatchingGame gameRound={gameRound} />
    </GameContainer>
  );
}
