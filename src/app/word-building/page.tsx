import { GameContainer } from '@/components/games/game-container';
import { WordBuildingGame } from '@/components/games/word-building-game';

export default function WordBuildingPage() {
  return (
    <GameContainer
      title="Word Building"
      instructions="Drag and drop the letters to spell the word shown in the picture."
    >
      <WordBuildingGame />
    </GameContainer>
  );
}
