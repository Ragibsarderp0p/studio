'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RefreshCw, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const shuffleArray = (array: number[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export function NumberSortingGame() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [slots, setSlots] = useState<(number | null)[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  
  const sortedNumbers = useMemo(() => [...numbers].sort((a, b) => a - b), [numbers]);

  const generateNewGame = useCallback(() => {
    setIsComplete(false);
    const newNumbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 99) + 1);
    setNumbers(shuffleArray(newNumbers));
    setSlots(new Array(5).fill(null));
  }, []);

  useEffect(() => {
    generateNewGame();
  }, [generateNewGame]);

  useEffect(() => {
    if (slots.every(s => s !== null)) {
      const isCorrect = slots.every((s, i) => s === sortedNumbers[i]);
      if (isCorrect) {
        setIsComplete(true);
      }
    }
  }, [slots, sortedNumbers]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, num: number) => {
    e.dataTransfer.setData('number', num.toString());
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    const num = parseInt(e.dataTransfer.getData('number'));
    if (slots[index] === null) {
      setSlots(prev => {
        const newSlots = [...prev];
        newSlots[index] = num;
        return newSlots;
      });
      setNumbers(prev => prev.filter(n => n !== num));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSlotClick = (index: number) => {
    const num = slots[index];
    if (num !== null) {
        setSlots(prev => {
            const newSlots = [...prev];
            newSlots[index] = null;
            return newSlots;
        });
        setNumbers(prev => [...prev, num]);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8 bg-white/80 rounded-2xl shadow-2xl border-4 border-white">
      <div className="mb-8">
        <h3 className="text-center text-2xl font-semibold text-primary mb-4">Unsorted Numbers</h3>
        <div className="flex justify-center gap-4 flex-wrap bg-blue-100 p-4 rounded-lg min-h-[100px] items-center">
          {numbers.map(num => (
            <motion.div
              key={num}
              layout
              draggable
              onDragStart={e => handleDragStart(e, num)}
              className="w-20 h-20 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-3xl font-bold cursor-grab active:cursor-grabbing shadow-md"
            >
              {num}
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
                    layoutId={`num-${slot}`}
                    className="w-full h-full bg-accent text-accent-foreground rounded-lg flex items-center justify-center shadow-md"
                >
                    {slot}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-8">
        <Button onClick={generateNewGame} size="lg" className="text-xl">
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
            className="absolute inset-0 bg-black/30 flex items-center justify-center"
          >
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
              <motion.div animate={{ rotate: 360, transition: { duration: 1, repeat: Infinity, ease: "linear" } }}>
                <Star className="w-24 h-24 text-yellow-400 mx-auto" fill="currentColor" />
              </motion.div>
              <h2 className="text-4xl font-bold text-primary mt-4">Well Done!</h2>
              <p className="text-xl mt-2">You sorted all the numbers correctly!</p>
              <Button onClick={generateNewGame} size="lg" className="mt-6 text-xl">Play Again</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
