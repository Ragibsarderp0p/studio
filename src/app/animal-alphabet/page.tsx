import { GameContainer } from '@/components/games/game-container';
import { AnimalAlphabetGame } from '@/components/games/animal-alphabet-game';

export default function AnimalAlphabetPage() {
  return (
    <GameContainer
      title="Animal Alphabet"
      instructions="An animal name is shown with a missing letter. Type the correct letter to win!"
    >
      <AnimalAlphabetGame />
    </GameContainer>
  );
}
