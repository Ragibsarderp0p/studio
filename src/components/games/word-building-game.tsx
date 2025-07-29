
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';
import Image from 'next/image';
import type { useGameRound } from '@/hooks/use-game-round';

const words = [
    { word: 'CAT', image: 'https://placehold.co/400x200', hint: 'feline pet', "data-ai-hint": "cat" },
    { word: 'SUN', image: 'https://placehold.co/400x200', hint: 'star in the sky', "data-ai-hint": "sun" },
    { word: 'DOG', image: 'https://placehold.co/400x200', hint: 'loyal friend', "data-ai-hint": "dog" },
    { word: 'BALL', image: 'https://placehold.co/400x200', hint: 'round toy', "data-ai-hint": "ball" },
];

type WordBuildingGameProps = {
  gameRound: ReturnType<typeof useGameRound>;
};

export function WordBuildingGame({ gameRound }: WordBuildingGameProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const { word, image, "data-ai-hint": aiHint } = words[currentWordIndex];

    const nextWord = () => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }
  
  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-8 bg-white/80 rounded-2xl shadow-2xl border-4 border-white text-center">
      <div className="mb-4">
        <Image src={image} alt={word} width={400} height={200} className="rounded-lg mx-auto border-4 border-white shadow-md" data-ai-hint={aiHint}/>
      </div>
      <p className="text-3xl font-bold tracking-[.5em] my-4 p-4 bg-primary/10 rounded-lg">{word}</p>

      <Button onClick={nextWord} size="lg">Next Example</Button>
    </div>
  );
}
