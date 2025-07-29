
'use client';

import { GameContainer } from '@/components/games/game-container';
import { WordBuildingGame } from '@/components/games/word-building-game';
import { useGameRound } from '@/hooks/use-game-round';

export default function WordBuildingPage() {
  const gameRound = useGameRound();
  return (
    <GameContainer
      title="Word Building"
      instructions="Drag and drop the letters to spell the word shown in the picture."
      roundStats={gameRound.roundStats}
    >
      <WordBuildingGame gameRound={gameRound} />
    </GameContainer>
  );
}
