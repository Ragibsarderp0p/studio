'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, RefreshCw, XCircle } from 'lucide-react';
import { useGameSession } from '@/hooks/use-game-session';
import { GameStatsDisplay } from '@/components/games/game-stats-display';
import { useGameRound } from '@/hooks/use-game-round';

const generateNumbers = (count: number) => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 100));
};

export function EvenOddGame() {
  const { sessionStats, recordWin, recordLoss } = useGameSession();
  const { roundStats, startRound, endRound, addPoints, incrementWrongAttempts } = useGameRound();
  
  const [numbers, setNumbers] = useState<number[]>([]);
  const [mode, setMode] = useState<'even' | 'odd'>('even');
  const [selected, setSelected] = useState<number[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'correct' | 'wrong'>('playing');

  const startNewGame = useCallback(() => {
    startRound();
    setGameState('playing');
    setNumbers(generateNumbers(12));
    setMode(Math.random() > 0.5 ? 'even' : 'odd');
    setSelected([]);
  }, [startRound]);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const handleNumberClick = (num: number, index: number) => {
    if (gameState !== 'playing') return;
    setSelected(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const checkAnswers = () => {
    const correctIndices = numbers.map((n, i) => (mode === 'even' ? n % 2 === 0 : n % 2 !== 0) ? i : -1).filter(i => i !== -1);
    
    const isCorrect = selected.length === correctIndices.length && selected.every(index => correctIndices.includes(index));

    endRound();
    if (isCorrect) {
      setGameState('correct');
      addPoints(numbers.length * 5); // 5 points per number
      recordWin(roundStats);
    } else {
      setGameState('wrong');
      incrementWrongAttempts();
      recordLoss(roundStats);
    }
  };

  const handleReset = () => {
    startNewGame();
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8 bg-white/80 rounded-2xl shadow-2xl border-4 border-white">
      <GameStatsDisplay stats={roundStats} title="This Round" />
      <GameStatsDisplay stats={sessionStats} title="Session Stats" className="mt-2" />
      <div className="text-center my-6 bg-primary/10 p-4 rounded-lg">
        <p className="text-2xl font-semibold text-primary">
          Click on all the <span className="font-extrabold text-accent bg-primary text-primary-foreground px-2 py-1 rounded">{mode.toUpperCase()}</span> numbers!
        </p>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-6">
        {numbers.map((num, index) => (
          <motion.button
            key={index}
            onClick={() => handleNumberClick(num, index)}
            disabled={gameState !== 'playing'}
            whileHover={{ scale: gameState === 'playing' ? 1.1 : 1 }}
            whileTap={{ scale: gameState === 'playing' ? 0.9 : 1 }}
            className={cn(
              'h-24 text-4xl font-bold rounded-lg transition-all duration-200 shadow-md flex items-center justify-center',
              selected.includes(index)
                ? 'bg-accent text-accent-foreground ring-4 ring-yellow-300'
                : 'bg-primary text-primary-foreground',
              gameState !== 'playing' && ( (mode === 'even' ? num % 2 === 0 : num % 2 !== 0) ? 'bg-green-500' : 'bg-red-500' )
            )}
          >
            {num}
          </motion.button>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <Button onClick={checkAnswers} disabled={gameState !== 'playing'} size="lg" className="text-xl">
          Check My Answers
        </Button>
        <Button onClick={handleReset} variant="outline" size="lg" className="text-xl">
          <RefreshCw className="mr-2 h-5 w-5" />
          New Game
        </Button>
      </div>

      <AnimatePresence>
        {gameState === 'correct' && (
          <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 10}} className="mt-6">
            <Alert variant="default" className="bg-green-100 border-green-500 text-green-800">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="font-bold">Excellent!</AlertTitle>
              <AlertDescription>You found all the {mode} numbers! You scored {roundStats.points} points.</AlertDescription>
            </Alert>
          </motion.div>
        )}
        {gameState === 'wrong' && (
          <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 10}} className="mt-6">
            <Alert variant="destructive">
              <XCircle className="h-5 w-5" />
              <AlertTitle className="font-bold">Not quite!</AlertTitle>
              <AlertDescription>
                Some answers are incorrect. The right answers are now green. Try a new game!
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
