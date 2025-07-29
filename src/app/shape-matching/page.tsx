
'use client';

import { GameContainer } from '@/components/games/game-container';
import { ShapeMatchingGame } from '@/components/games/shape-matching-game';
import { useGameRound } from '@/hooks/use-game-round';

export default function ShapeMatchingPage() {
  const gameRound = useGameRound();
  return (
    <GameContainer
      title="Shape Matching"
      instructions="Click on two cards to flip them over. Find all the matching pairs of shapes!"
      roundStats={gameRound.roundStats}
    >
      <ShapeMatchingGame gameRound={gameRound} />
    </GameContainer>
  );
}
