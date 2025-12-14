'use client';

import { useState } from 'react';
import HomeScreen from '@/components/HomeScreen';
import QuestionScreen from '@/components/QuestionScreen';
import ResultScreen from '@/components/ResultScreen';
import { GameState, UserAnswer, Gift } from '@/types';

const RETRY_LIMIT = 1;

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('home');
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [result, setResult] = useState<Gift | null>(null);
  const [retryCount, setRetryCount] = useState(RETRY_LIMIT);

  const handleStart = () => {
    setGameState('questions');
    setAnswers([]);
  };

  const handleQuestionsComplete = (userAnswers: UserAnswer[]) => {
    setAnswers(userAnswers);
    setGameState('result');
  };

  const handleResultReceived = (gift: Gift) => {
    setResult(gift);
  };

  const handleRetryCount = () => {
    setRetryCount((prev) => prev - 1);
  };

  const handleGoHome = () => {
    setGameState('home');
    setAnswers([]);
    setResult(null);
    setRetryCount(RETRY_LIMIT);
  };

  return (
    <main className="min-h-svh flex items-center justify-center p-4 overflow-auto">
      {gameState === 'home' && <HomeScreen onStart={handleStart} />}
      {gameState === 'questions' && (
        <QuestionScreen
          onComplete={handleQuestionsComplete}
          onGoHome={handleGoHome}
        />
      )}
      {gameState === 'result' && (
        <ResultScreen
          answers={answers}
          result={result}
          onResultReceived={handleResultReceived}
          onRetryCount={handleRetryCount}
          onGoHome={handleGoHome}
          canRetry={retryCount > 0}
        />
      )}
    </main>
  );
}
