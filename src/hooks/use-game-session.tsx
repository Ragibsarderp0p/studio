'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import type { GameRoundStats } from './use-game-round';

export type GameSessionStats = {
  points: number;
  wrongAttempts: number;
  wins: number;
  losses: number;
  totalGames: number;
};

type GameSessionContextType = {
  sessionStats: GameSessionStats;
  recordWin: (roundStats: GameRoundStats) => void;
  recordLoss: (roundStats: GameRoundStats) => void;
  resetSession: () => void;
};

const GameSessionContext = createContext<GameSessionContextType | undefined>(undefined);

const SESSION_STATS_KEY = 'edufun_session_stats';

const initialStats: GameSessionStats = {
  points: 0,
  wrongAttempts: 0,
  wins: 0,
  losses: 0,
  totalGames: 0,
};

export function GameSessionProvider({ children }: { children: ReactNode }) {
  const [sessionStats, setSessionStats] = useState<GameSessionStats>(initialStats);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedStats = localStorage.getItem(SESSION_STATS_KEY);
      if (storedStats) {
        setSessionStats(JSON.parse(storedStats));
      }
    } catch (error) {
      console.error("Failed to load session stats from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(SESSION_STATS_KEY, JSON.stringify(sessionStats));
      } catch (error) {
        console.error("Failed to save session stats to localStorage", error);
      }
    }
  }, [sessionStats, isLoaded]);

  const recordWin = useCallback((roundStats: GameRoundStats) => {
    setSessionStats(prev => ({
      ...prev,
      points: prev.points + roundStats.points,
      wrongAttempts: prev.wrongAttempts + roundStats.wrongAttempts,
      wins: prev.wins + 1,
      totalGames: prev.totalGames + 1,
    }));
  }, []);

  const recordLoss = useCallback((roundStats: GameRoundStats) => {
    setSessionStats(prev => ({
      ...prev,
      points: prev.points + roundStats.points,
      wrongAttempts: prev.wrongAttempts + roundStats.wrongAttempts,
      losses: prev.losses + 1,
      totalGames: prev.totalGames + 1,
    }));
  }, []);

  const resetSession = useCallback(() => {
    setSessionStats(initialStats);
  }, []);

  return (
    <GameSessionContext.Provider value={{ sessionStats, recordWin, recordLoss, resetSession }}>
      {children}
    </GameSessionContext.Provider>
  );
}

export function useGameSession() {
  const context = useContext(GameSessionContext);
  if (context === undefined) {
    throw new Error('useGameSession must be used within a GameSessionProvider');
  }
  return context;
}
