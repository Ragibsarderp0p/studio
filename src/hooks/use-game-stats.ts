'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export type GameStats = {
  time: number;
  points: number;
  wrongAttempts: number;
  skips: number;
};

export function useGameStats() {
  const [stats, setStats] = useState<GameStats>({
    time: 0,
    points: 0,
    wrongAttempts: 0,
    skips: 0,
  });
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = useCallback(() => {
    setStats(prev => ({...prev, time: 0}));
    setIsActive(true);
  }, []);

  const endGame = useCallback(() => {
    setIsActive(false);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const resumeTimer = useCallback(() => {
    setIsActive(true);
  }, []);

  const resetStats = useCallback(() => {
    setStats({
      time: 0,
      points: 0,
      wrongAttempts: 0,
      skips: 0,
    });
    setIsActive(false);
  }, []);

  const addPoints = useCallback((amount: number) => {
    setStats(prev => ({ ...prev, points: prev.points + amount }));
  }, []);

  const incrementWrongAttempts = useCallback(() => {
    setStats(prev => ({ ...prev, wrongAttempts: prev.wrongAttempts + 1 }));
  }, []);

  const incrementSkips = useCallback(() => {
    setStats(prev => ({ ...prev, skips: prev.skips + 1 }));
  }, []);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setStats(prev => ({ ...prev, time: prev.time + 1 }));
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive]);

  return {
    stats,
    startGame,
    endGame,
    addPoints,
    incrementWrongAttempts,
    incrementSkips,
    resetStats,
    pauseTimer,
    resumeTimer
  };
}
