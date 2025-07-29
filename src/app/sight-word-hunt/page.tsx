import { GameContainer } from '@/components/games/game-container';
import { SightWordHuntGame } from '@/components/games/sight-word-hunt-game';

export default function SightWordHuntPage() {
  return (
    <GameContainer
      title="Sight Word Hunt"
      instructions="Find and click the hidden sight words in the grid below."
    >
      <SightWordHuntGame />
    </GameContainer>
  );
}
