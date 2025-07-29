
'use client';

import { GameContainer } from '@/components/games/game-container';
import { SightWordHuntGame } from '@/components/games/sight-word-hunt-game';
import { useGameRound } from '@/hooks/use-game-round';

export default function SightWordHuntPage() {
  const gameRound = useGameRound();
  return (
    <GameContainer
      title="Sight Word Hunt"
      instructions="Find and click the hidden sight words in the grid below."
      roundStats={gameRound.roundStats}
    >
      <SightWordHuntGame gameRound={gameRound}/>
    </GameContainer>
  );
}
