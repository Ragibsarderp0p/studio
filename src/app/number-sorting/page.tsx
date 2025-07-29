
'use client';

import { GameContainer } from '@/components/games/game-container';
import { NumberSortingGame } from '@/components/games/number-sorting-game';
import { useGameRound } from '@/hooks/use-game-round';

export default function NumberSortingPage() {
  const gameRound = useGameRound();
  return (
    <GameContainer
      title="Number Sorting"
      instructions="Drag and drop the numbers into the empty boxes to sort them from smallest to largest."
      roundStats={gameRound.roundStats}
    >
      <NumberSortingGame gameRound={gameRound} />
    </GameContainer>
  );
}
