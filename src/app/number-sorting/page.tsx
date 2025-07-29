import { GameContainer } from '@/components/games/game-container';
import { NumberSortingGame } from '@/components/games/number-sorting-game';

export default function NumberSortingPage() {
  return (
    <GameContainer
      title="Number Sorting"
      instructions="Drag and drop the numbers into the empty boxes to sort them from smallest to largest."
    >
      <NumberSortingGame />
    </GameContainer>
  );
}
