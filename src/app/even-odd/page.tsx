
'use client';

import { GameContainer } from '@/components/games/game-container';
import { EvenOddGame } from '@/components/games/even-odd-game';
import { useGameRound } from '@/hooks/use-game-round';

export default function EvenOddPage() {
  const gameRound = useGameRound();
  return (
    <GameContainer
      title="Even or Odd"
      instructions="Click on all the numbers that match the rule. Are they even or odd?"
      roundStats={gameRound.roundStats}
    >
      <EvenOddGame gameRound={gameRound} />
    </GameContainer>
  );
}
