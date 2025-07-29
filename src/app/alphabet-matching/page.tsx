import { GameContainer } from '@/components/games/game-container';
import { AlphabetMatchingGame } from '@/components/games/alphabet-matching-game';

export default function AlphabetMatchingPage() {
  return (
    <GameContainer
      title="Alphabet Matching"
      instructions="Click on two cards to flip them over. Find all the matching pairs of letters!"
    >
      <AlphabetMatchingGame />
    </GameContainer>
  );
}
