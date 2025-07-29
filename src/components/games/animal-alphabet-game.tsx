
'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getMissingLetterForAnimal } from '@/app/animal-alphabet/actions';
import type * as Tone from 'tone';
import { useGameSession } from '@/hooks/use-game-session';
import { GameStatsDisplay } from '@/components/games/game-stats-display';
import type { useGameRound } from '@/hooks/use-game-round';

const animals = [
  'Alligator', 'Bear', 'Cat', 'Dog', 'Elephant', 'Fox', 'Giraffe', 'Hippo',
  'Iguana', 'Jaguar', 'Koala', 'Lion', 'Monkey', 'Newt', 'Octopus', 'Penguin',
  'Quail', 'Rabbit', 'Snake', 'Tiger', 'Urial', 'Vulture', 'Walrus', 'Xerus',
  'Yak', 'Zebra'
];

type AnimalAlphabetGameProps = {
  gameRound: ReturnType<typeof useGameRound>;
};

export function AnimalAlphabetGame({ gameRound }: AnimalAlphabetGameProps) {
  const { recordWin, recordLoss } = useGameSession();
  const { roundStats, startRound, endRound, addPoints, incrementWrongAttempts, incrementSkips, pauseTimer, resumeTimer } = gameRound;
  const [currentAnimal, setCurrentAnimal] = useState('');
  const [missingIndex, setMissingIndex] = useState<number | null>(null);
  const [userInput, setUserInput] = useState('');
  const [gameState, setGameState] = useState<'playing' | 'correct' | 'wrong'>('playing');
  const [loading, setLoading] = useState(true);
  const [usedAnimals, setUsedAnimals] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const synth = useRef<Tone.Synth | null>(null);

  useEffect(() => {
    import('tone').then(Tone => {
      synth.current = new Tone.Synth().toDestination();
    });
  }, []);

  const playSuccessSound = useCallback(() => {
    if (synth.current) {
      synth.current.triggerAttackRelease('C5', '8n');
    }
  }, []);

  const loadNewWord = useCallback(async (isSkip = false) => {
    if (isSkip) {
        incrementSkips();
        recordLoss(roundStats);
    }
    startRound();
    setGameState('playing');
    setUserInput('');
    setLoading(true);

    let availableAnimals = animals.filter(a => !usedAnimals.includes(a));
    if (availableAnimals.length === 0) {
      availableAnimals = animals;
      setUsedAnimals([]); 
    }
    
    const animal = availableAnimals[Math.floor(Math.random() * availableAnimals.length)];
    
    setCurrentAnimal(animal);
    const result = await getMissingLetterForAnimal(animal);

    if (result.success) {
        setMissingIndex(result.index);
    } else {
        toast({
            title: 'Oh no!',
            description: 'Could not generate a word. Please try again.',
            variant: 'destructive',
        });
    }
    setLoading(false);
    setUsedAnimals(prev => [...prev, animal]);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [usedAnimals, incrementSkips, toast, startRound, recordLoss, roundStats]);

  const startNewGame = useCallback(() => {
    startRound();
    setUsedAnimals([]);
    loadNewWord();
  }, [startRound, loadNewWord]);


  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const displayedWord = useMemo(() => {
    if (!currentAnimal || missingIndex === null) return [];
    return currentAnimal.split('').map((letter, index) => ({
      letter: index === missingIndex ? '' : letter,
      isMissing: index === missingIndex,
    }));
  }, [currentAnimal, missingIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.length !== 1 || missingIndex === null) return;

    if (userInput.toLowerCase() === currentAnimal[missingIndex].toLowerCase()) {
      setGameState('correct');
      addPoints(10);
      playSuccessSound();
      pauseTimer();
      endRound();
      recordWin(roundStats);
      setTimeout(() => {
        resumeTimer();
        loadNewWord();
      }, 1500);
    } else {
      setGameState('wrong');
      incrementWrongAttempts();
      setTimeout(() => {
        setGameState('playing');
        setUserInput('');
      }, 1000);
    }
  };
  
  const handleNewWordClick = () => {
    loadNewWord(true);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto p-4 md:p-8 shadow-2xl rounded-2xl border-4 border-white bg-white/80">
      <CardContent>
        {loading && (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
          </div>
        )}

        <AnimatePresence mode="wait">
          {!loading && (
            <motion.div
              key={currentAnimal}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4"
            >
              <div className="flex justify-center items-end flex-wrap gap-1 md:gap-2 mb-8" aria-label={`Word: ${currentAnimal.replace(/./g, (c, i) => i === missingIndex ? 'blank' : c)}`}>
                {displayedWord.map((char, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-center w-12 h-16 md:w-16 md:h-20 text-4xl md:text-5xl font-bold rounded-lg
                    ${char.isMissing ? 'bg-yellow-200 border-2 border-dashed border-yellow-400' : 'bg-primary text-primary-foreground'}`}
                  >
                    {gameState === 'correct' && char.isMissing ? currentAnimal[missingIndex] : char.letter}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                <motion.div
                  animate={gameState === 'wrong' ? 'shake' : ''}
                  variants={{ shake: { x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.5 } } }}
                >
                  <Input
                    ref={inputRef}
                    type="text"
                    maxLength={1}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="w-24 h-24 text-6xl text-center font-bold rounded-xl shadow-inner disabled:opacity-50"
                    disabled={gameState !== 'playing'}
                    aria-label="Enter the missing letter"
                  />
                </motion.div>
                <div className="flex gap-4">
                  <Button type="submit" size="lg" disabled={gameState !== 'playing' || userInput.length !== 1} className="w-40 h-14 text-xl">
                    Check
                  </Button>
                  <Button type="button" size="lg" variant="outline" onClick={handleNewWordClick} disabled={loading} className="w-40 h-14 text-xl">
                    <Sparkles className="mr-2 h-5 w-5" /> Skip
                  </Button>
                </div>
              </form>

              <AnimatePresence>
                {gameState === 'correct' && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="mt-6 text-center text-3xl font-bold text-green-600"
                  >
                    Correct! +10 points! 🎉
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
