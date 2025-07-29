'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RefreshCw, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';

type Card = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const generateCards = (pairs: number): Card[] => {
  const letters = [...alphabet].sort(() => 0.5 - Math.random()).slice(0, pairs);
  const cardValues = [...letters, ...letters.map(l => l.toLowerCase())];
  const shuffled = cardValues.sort(() => Math.random() - 0.5);
  return shuffled.map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false,
  }));
};

export function AlphabetMatchingGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const isGameWon = useMemo(() => cards.length > 0 && cards.every(c => c.isMatched), [cards]);

  const startNewGame = useCallback(() => {
    setCards(generateCards(8));
    setFlippedIndices([]);
    setIsChecking(false);
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      setIsChecking(true);
      const [firstIndex, secondIndex] = flippedIndices;
      if (cards[firstIndex].value.toLowerCase() === cards[secondIndex].value.toLowerCase()) {
        setCards(prev =>
          prev.map(card =>
            card.id === firstIndex || card.id === secondIndex
              ? { ...card, isMatched: true }
              : card
          )
        );
        setFlippedIndices([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(card =>
              card.id === firstIndex || card.id === secondIndex
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedIndices([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [flippedIndices, cards]);

  const handleCardClick = (index: number) => {
    if (isChecking || cards[index].isFlipped || flippedIndices.length === 2) {
      return;
    }

    setCards(prev =>
      prev.map(card => (card.id === index ? { ...card, isFlipped: true } : card))
    );
    setFlippedIndices(prev => [...prev, index]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 bg-white/80 rounded-2xl shadow-2xl border-4 border-white relative">
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div key={card.id} className="perspective-[1000px]">
            <motion.div
              className="relative w-full h-24 md:h-32 cursor-pointer"
              onClick={() => handleCardClick(index)}
              animate={{ rotateY: card.isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Card Back */}
              <div className="absolute w-full h-full bg-primary rounded-lg flex items-center justify-center backface-hidden shadow-md">
                <span className="text-5xl text-primary-foreground font-bold">?</span>
              </div>
              {/* Card Front */}
              <div className={cn("absolute w-full h-full rounded-lg flex items-center justify-center text-5xl font-bold shadow-lg",
                "backface-hidden rotate-y-180",
                card.isMatched ? "bg-green-400 text-white" : "bg-accent text-accent-foreground")}>
                {card.value}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button onClick={startNewGame} size="lg" className="text-xl">
          <RefreshCw className="mr-2 h-5 w-5" />
          Reset Game
        </Button>
      </div>

      <AnimatePresence>
        {isGameWon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-2xl"
          >
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
              <PartyPopper className="w-24 h-24 text-accent mx-auto" />
              <h2 className="text-4xl font-bold text-primary mt-4">You Won!</h2>
              <p className="text-xl mt-2">Amazing memory skills!</p>
              <Button onClick={startNewGame} size="lg" className="mt-6 text-xl">Play Again</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
