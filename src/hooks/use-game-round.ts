'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export type GameRoundStats = {
  time: number;
  points: number;
  wrongAttempts: number;
  skips: number;
};

export function useGameRound() {
  const [stats, setStats] = useState<GameRoundStats>({
    time: 0,
    points: 0,
    wrongAttempts: 0,
    skips: 0,
  });
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRound = useCallback(() => {
    setStats({
      time: 0,
      points: 0,
      wrongAttempts: 0,
      skips: 0,
    });
    setIsActive(true);
  }, []);

  const endRound = useCallback(() => {
    setIsActive(false);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const resumeTimer = useCallback(() => {
    setIsActive(true);
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
    roundStats: stats,
    startRound,
    endRound,
    addPoints,
    incrementWrongAttempts,
    incrementSkips,
    pauseTimer,
    resumeTimer,
  };
}
