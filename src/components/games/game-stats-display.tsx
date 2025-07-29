'use client';

import { Timer, Star, XCircle, SkipForward, Trophy } from 'lucide-react';
import type { GameRoundStats } from '@/hooks/use-game-round';
import type { GameSessionStats } from '@/hooks/use-game-session';
import { cn } from '@/lib/utils';

type GameStatsDisplayProps = {
  stats: GameRoundStats | GameSessionStats;
  isFinished?: boolean;
  title: string;
  className?: string;
};

export function GameStatsDisplay({ stats, isFinished, title, className }: GameStatsDisplayProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isSessionStats = 'wins' in stats;

  return (
    <div className={cn("p-2 rounded-lg text-primary font-semibold", isSessionStats ? 'bg-amber-200' : 'bg-primary/20', className)}>
      <h3 className="font-bold text-center mb-1">{title}</h3>
      <div className="flex justify-around items-center">
        {'time' in stats && (
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5" />
            <span>{formatTime(stats.time)}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span>{stats.points}</span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-500" />
          <span>{stats.wrongAttempts}</span>
        </div>
        {'skips' in stats && (
          <div className="flex items-center gap-2">
            <SkipForward className="w-5 h-5 text-gray-500" />
            <span>{stats.skips}</span>
          </div>
        )}
        {isSessionStats && (
            <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-600" />
                <span>{stats.wins} / {stats.totalGames}</span>
            </div>
        )}
      </div>
    </div>
  );
}
