'use client';

import { useState } from 'react';
import HomeScreen from '@/components/HomeScreen';
import QuestionScreen from '@/components/QuestionScreen';
import ResultScreen from '@/components/ResultScreen';
import { GameState, UserAnswer, Gift } from '@/types';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('home');
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [result, setResult] = useState<Gift | null>(null);
  const [retryCount, setRetryCount] = useState(0);

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

  const handleRetry = () => {
    if (retryCount < 1) {
      setRetryCount(retryCount + 1);
      setResult(null);
    }
  };

  const handleGoHome = () => {
    setGameState('home');
    setAnswers([]);
    setResult(null);
    setRetryCount(0);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      {gameState === 'home' && <HomeScreen onStart={handleStart} />}
      {gameState === 'questions' && (
        <QuestionScreen onComplete={handleQuestionsComplete} />
      )}
      {gameState === 'result' && (
        <ResultScreen
          answers={answers}
          result={result}
          onResultReceived={handleResultReceived}
          onRetry={handleRetry}
          onGoHome={handleGoHome}
          canRetry={retryCount < 1}
        />
      )}
    </main>
  );
}
