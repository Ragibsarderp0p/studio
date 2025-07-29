import { GameContainer } from '@/components/games/game-container';
import { NumberMatchingGame } from '@/components/games/number-matching-game';

export default function NumberMatchingPage() {
  return (
    <GameContainer
      title="Number Matching"
      instructions="Click two cards to find matching numbers. Find all the pairs to win!"
    >
      <NumberMatchingGame />
    </GameContainer>
  );
}
