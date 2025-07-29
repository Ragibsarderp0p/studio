
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RefreshCw, Star, ToyBrick, Circle, Heart, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGameSession } from '@/hooks/use-game-session';
import { GameStatsDisplay } from '@/components/games/game-stats-display';
import type { useGameRound } from '@/hooks/use-game-round';

const COLORS = [
  { name: 'Red', value: 'bg-red-500', id: 'red' },
  { name: 'Blue', value: 'bg-blue-500', id: 'blue' },
  { name: 'Green', value: 'bg-green-500', id: 'green' },
  { name: 'Yellow', value: 'bg-yellow-400', id: 'yellow' },
];

const SHAPES = [
  (props: any) => <Heart {...props} />,
  (props: any) => <ToyBrick {...props} />,
  (props: any) => <Circle {...props} />,
  (props: any) => <Square {...props} />,
];

type SortableItem = {
  id: number;
  color: typeof COLORS[number];
  shape: typeof SHAPES[number];
};

type ColorSortingGameProps = {
  gameRound: ReturnType<typeof useGameRound>;
};

const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export function ColorSortingGame({ gameRound }: ColorSortingGameProps) {
  const { recordWin, recordLoss } = useGameSession();
  const { roundStats, startRound, endRound, addPoints, incrementWrongAttempts } = gameRound;
  
  const [items, setItems] = useState<SortableItem[]>([]);
  const [slots, setSlots] = useState<Record<string, SortableItem[]>>({});
  const [isComplete, setIsComplete] = useState(false);

  const generateNewGame = useCallback(() => {
    startRound();
    setIsComplete(false);
    const newItems: SortableItem[] = [];
    let idCounter = 0;
    COLORS.forEach(color => {
      for (let i = 0; i < 3; i++) {
        newItems.push({
          id: idCounter++,
          color,
          shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        });
      }
    });
    setItems(shuffleArray(newItems));
    setSlots({ red: [], blue: [], green: [], yellow: [] });
  }, [startRound]);

  useEffect(() => {
    generateNewGame();
  }, [generateNewGame]);

  const checkCompletion = useCallback(() => {
    if (items.length === 0) {
      const isCorrect = Object.entries(slots).every(([colorId, slottedItems]) => 
        slottedItems.length === 3 && slottedItems.every(item => item.color.id === colorId)
      );

      endRound();
      if (isCorrect) {
        setIsComplete(true);
        addPoints(100);
        recordWin(roundStats);
      } else {
        // This case should ideally not happen if logic is correct
        incrementWrongAttempts();
        recordLoss(roundStats);
      }
    }
  }, [slots, items, endRound, addPoints, incrementWrongAttempts, recordWin, recordLoss, roundStats]);


  useEffect(() => {
    checkCompletion();
  }, [slots, items, checkCompletion]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: SortableItem) => {
    e.dataTransfer.setData('itemId', item.id.toString());
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, colorId: string) => {
    e.preventDefault();
    const id = parseInt(e.dataTransfer.getData('itemId'));
    const item = items.find(i => i.id === id);

    if (item) {
        if (item.color.id === colorId) {
            setSlots(prev => ({
                ...prev,
                [colorId]: [...prev[colorId], item]
            }));
            setItems(prev => prev.filter(i => i.id !== id));
            addPoints(10);
        } else {
            incrementWrongAttempts();
            // Add a visual shake effect or something
        }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 bg-white/80 rounded-2xl shadow-2xl border-4 border-white relative">
      <div className="mb-8 mt-4">
        <h3 className="text-center text-2xl font-semibold text-primary mb-4">Items to Sort</h3>
        <div className="flex justify-center gap-4 flex-wrap bg-blue-100 p-4 rounded-lg min-h-[120px] items-center">
          {items.map(item => (
            <motion.div
              key={item.id}
              layoutId={`item-${item.id}`}
              draggable
              onDragStart={e => handleDragStart(e, item)}
              className={cn("w-16 h-16 rounded-lg flex items-center justify-center text-white cursor-grab active:cursor-grabbing shadow-md", item.color.value)}
            >
              <item.shape className="w-10 h-10" fill="currentColor" />
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-center text-2xl font-semibold text-primary mb-4">Color Bins</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 justify-center gap-4">
          {COLORS.map((color) => (
            <div
              key={color.id}
              onDrop={e => handleDrop(e, color.id)}
              onDragOver={handleDragOver}
              className={cn('h-48 rounded-lg border-4 border-dashed p-2 flex flex-col items-center', `border-${color.id}-500 bg-${color.id}-100`)}
            >
                <h4 className={cn('text-xl font-bold mb-2', `text-${color.id}-600`)}>{color.name}</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                    {slots[color.id]?.map(item => (
                        <motion.div
                            key={item.id}
                            layoutId={`item-${item.id}`}
                            className={cn("w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-md", item.color.value)}
                        >
                            <item.shape className="w-8 h-8" fill="currentColor" />
                        </motion.div>
                    ))}
                </div>
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
            className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-2xl"
          >
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
              <motion.div animate={{ rotate: 360, transition: { duration: 1, repeat: Infinity, ease: "linear" } }}>
                <Star className="w-24 h-24 text-yellow-400 mx-auto" fill="currentColor" />
              </motion.div>
              <h2 className="text-4xl font-bold text-primary mt-4">Amazing!</h2>
              <p className="text-xl mt-2">You sorted all the colors correctly!</p>
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
