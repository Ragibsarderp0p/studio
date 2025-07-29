
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { useGameRound } from '@/hooks/use-game-round';

const wordsToFind = ['THE', 'AND', 'YOU', 'WAS', 'FOR'];

type SightWordHuntGameProps = {
  gameRound: ReturnType<typeof useGameRound>;
};

export function SightWordHuntGame({ gameRound }: SightWordHuntGameProps) {
    const [foundWords, setFoundWords] = useState<string[]>([]);
  
  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-8 bg-white/80 rounded-2xl shadow-2xl border-4 border-white text-center">
      <h2 className="text-2xl font-bold text-primary mb-4">Coming Soon!</h2>
      <p className="text-lg mb-6">The word hunt is being prepared. Check back soon!</p>
      
      <div className="bg-primary/10 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-primary mb-2">Words to Find:</h3>
        <div className="flex justify-center gap-4 flex-wrap">
            {wordsToFind.map(word => (
                <span key={word} className="px-3 py-1 bg-accent rounded-full text-lg font-semibold">{word}</span>
            ))}
        </div>
      </div>
      
      <div className="grid grid-cols-10 gap-1 p-4 bg-blue-100 rounded-lg">
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.repeat(4).slice(0, 100).split('').map((letter, i) => (
            <div key={i} className="w-10 h-10 flex items-center justify-center bg-white rounded text-primary font-bold text-xl">{letter}</div>
        ))}
      </div>

       <Button size="lg" className="mt-6">New Puzzle</Button>
    </div>
  );
}
