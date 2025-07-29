import { GameContainer } from '@/components/games/game-container';
import { EvenOddGame } from '@/components/games/even-odd-game';

export default function EvenOddPage() {
  return (
    <GameContainer
      title="Even or Odd"
      instructions="Click on all the numbers that match the rule. Are they even or odd?"
    >
      <EvenOddGame />
    </GameContainer>
  );
}
