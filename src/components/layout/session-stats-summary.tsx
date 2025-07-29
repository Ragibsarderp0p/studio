'use client';

import { useGameSession } from '@/hooks/use-game-session';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Star, XCircle, RefreshCcw } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function SessionStatsSummary() {
  const { sessionStats, resetSession } = useGameSession();

  return (
    <Card className="max-w-2xl mx-auto bg-amber-100/50 border-amber-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-3xl font-headline text-amber-800">
          Your Adventure Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around items-center text-amber-900 text-lg font-semibold">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-600" />
            <span>{sessionStats.wins} / {sessionStats.totalGames} Wins</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <span>{sessionStats.points} Points</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="w-6 h-6 text-red-500" />
            <span>{sessionStats.wrongAttempts} Mistakes</span>
          </div>
        </div>
        <div className="text-center mt-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <RefreshCcw className="mr-2" /> Reset My Adventure
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all of your session data, including points, wins, and losses. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetSession} className="bg-destructive hover:bg-destructive/90">
                  Yes, reset my adventure!
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
