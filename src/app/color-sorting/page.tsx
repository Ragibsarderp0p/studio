
'use client';

import { GameContainer } from '@/components/games/game-container';
import { ColorSortingGame } from '@/components/games/color-sorting-game';
import { useGameRound } from '@/hooks/use-game-round';

export default function ColorSortingPage() {
  const gameRound = useGameRound();
  return (
    <GameContainer
      title="Color Sorting"
      instructions="Drag and drop the colored items into the box with the matching color."
      roundStats={gameRound.roundStats}
    >
      <ColorSortingGame gameRound={gameRound} />
    </GameContainer>
  );
}
