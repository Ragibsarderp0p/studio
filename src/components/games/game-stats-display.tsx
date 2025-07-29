'use client';

import { Timer, Star, XCircle, SkipForward } from 'lucide-react';
import type { GameStats } from '@/hooks/use-game-stats';

type GameStatsDisplayProps = GameStats & {
    isFinished?: boolean;
};

export function GameStatsDisplay({ time, points, wrongAttempts, skips, isFinished }: GameStatsDisplayProps) {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex justify-around items-center p-2 bg-primary/20 rounded-lg text-primary font-semibold">
            <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <span>{formatTime(time)}</span>
            </div>
            <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>{points}</span>
            </div>
            <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                <span>{wrongAttempts}</span>
            </div>
            <div className="flex items-center gap-2">
                <SkipForward className="w-5 h-5 text-gray-500" />
                <span>{skips}</span>
            </div>
        </div>
    );
}
