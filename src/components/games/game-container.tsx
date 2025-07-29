'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { GameSessionStats } from '@/hooks/use-game-session';
import { GameStatsDisplay } from './game-stats-display';
import { useGameSession } from '@/hooks/use-game-session';

type GameContainerProps = {
  title: string;
  instructions: string;
  children: React.ReactNode;
};

export function GameContainer({ title, instructions, children }: GameContainerProps) {
  const { sessionStats } = useGameSession();
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Games
          </Link>
        </Button>
        <div className="text-center bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-2 border-white">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
            {title}
          </h1>
          <p className="text-lg text-primary/80">{instructions}</p>
        </div>
        <div className="my-4">
            <GameStatsDisplay stats={sessionStats} title="Session Stats" />
        </div>
        <div className="mt-8">
          {children}
        </div>
      </div>
    </div>
  );
}
