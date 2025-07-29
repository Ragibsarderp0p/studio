'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RefreshCw, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGameSession } from '@/hooks/use-game-session';
import { GameStatsDisplay } from '@/components/games/game-stats-display';
import { useGameRound } from '@/hooks/use-game-round';

type SortableNumber = {
  id: number;
  value: number;
};

const shuffleArray = (array: SortableNumber[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export function NumberSortingGame() {
  const { recordWin, recordLoss } = useGameSession();
  const { roundStats, startRound, endRound, addPoints, incrementWrongAttempts } = useGameRound();
  
  const [items, setItems] = useState<SortableNumber[]>([]);
  const [slots, setSlots] = useState<(SortableNumber | null)[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  
  const sortedValues = useMemo(() => items.map(i => i.value).sort((a, b) => a - b), [items]);

  const generateNewGame = useCallback(() => {
    startRound();
    setIsComplete(false);
    const newNumbers = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      value: Math.floor(Math.random() * 99) + 1,
    }));
    setItems(shuffleArray(newNumbers));
    setSlots(new Array(5).fill(null));
  }, [startRound]);

  useEffect(() => {
    generateNewGame();
  }, [generateNewGame]);

  const checkCompletion = useCallback(() => {
    if (slots.every(s => s !== null) && items.length === 0) {
      const isCorrect = slots.every((s, i) => s!.value === sortedValues[i]);
      endRound();
      if (isCorrect) {
        setIsComplete(true);
        addPoints(50);
        recordWin(roundStats);
      } else {
        incrementWrongAttempts();
        recordLoss(roundStats);
        // Maybe provide feedback that the order is wrong
      }
    }
  }, [slots, items, sortedValues, endRound, addPoints, incrementWrongAttempts, recordWin, recordLoss, roundStats]);


  useEffect(() => {
    checkCompletion();
  }, [slots, items, checkCompletion]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: SortableNumber) => {
    e.dataTransfer.setData('numberId', item.id.toString());
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    const id = parseInt(e.dataTransfer.getData('numberId'));
    const item = items.find(n => n.id === id);

    if (item && slots[index] === null) {
      setSlots(prev => {
        const newSlots = [...prev];
        newSlots[index] = item;
        return newSlots;
      });
      setItems(prev => prev.filter(n => n.id !== id));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSlotClick = (index: number) => {
    const item = slots[index];
    if (item !== null) {
        setSlots(prev => {
            const newSlots = [...prev];
            newSlots[index] = null;
            return newSlots;
        });
        setItems(prev => [...prev, item].sort(() => Math.random() - 0.5));
    }
  };
  
  const handleReset = () => {
    generateNewGame();
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8 bg-white/80 rounded-2xl shadow-2xl border-4 border-white relative">
      <GameStatsDisplay stats={roundStats} title="This Round" />
      <div className="mb-8 mt-4">
        <h3 className="text-center text-2xl font-semibold text-primary mb-4">Unsorted Numbers</h3>
        <div className="flex justify-center gap-4 flex-wrap bg-blue-100 p-4 rounded-lg min-h-[100px] items-center">
          {items.map(item => (
            <motion.div
              key={item.id}
              layoutId={`item-${item.id}`}
              draggable
              onDragStart={e => handleDragStart(e, item)}
              className="w-20 h-20 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-3xl font-bold cursor-grab active:cursor-grabbing shadow-md"
            >
              {item.value}
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-center text-2xl font-semibold text-primary mb-4">Sorted Numbers</h3>
        <div className="flex justify-center gap-4 flex-wrap bg-green-100 p-4 rounded-lg min-h-[100px] items-center">
          {slots.map((slot, i) => (
            <div
              key={i}
              onDrop={e => handleDrop(e, i)}
              onDragOver={handleDragOver}
              onClick={() => handleSlotClick(i)}
              className={cn(
                'w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-3xl font-bold border-2 border-dashed border-gray-400',
                slot !== null && 'cursor-pointer'
              )}
            >
              {slot !== null && (
                <motion.div
                    layoutId={`item-${slot.id}`}
                    className="w-full h-full bg-accent text-accent-foreground rounded-lg flex items-center justify-center shadow-md"
                >
                    {slot.value}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-8">
        <Button onClick={handleReset} size="lg" className="text-xl">
          <RefreshCw className="mr-2 h-5 w-5" />
          New Game
        </Button>
      </div>

      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-2xl"
          >
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
              <motion.div animate={{ rotate: 360, transition: { duration: 1, repeat: Infinity, ease: "linear" } }}>
                <Star className="w-24 h-24 text-yellow-400 mx-auto" fill="currentColor" />
              </motion.div>
              <h2 className="text-4xl font-bold text-primary mt-4">Well Done!</h2>
              <p className="text-xl mt-2">You sorted all the numbers correctly!</p>
               <div className="mt-4">
                <GameStatsDisplay stats={roundStats} isFinished={true} title="Round Stats"/>
              </div>
              <Button onClick={generateNewGame} size="lg" className="mt-6 text-xl">Play Again</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
