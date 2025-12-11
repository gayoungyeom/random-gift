'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, UserAnswer } from '@/types';

interface ResultScreenProps {
  answers: UserAnswer[];
  result: Gift | null;
  onResultReceived: (gift: Gift) => void;
  onRetry: () => void;
  onGoHome: () => void;
  canRetry: boolean;
}

export default function ResultScreen({
  answers,
  result,
  onResultReceived,
  onRetry,
  onGoHome,
  canRetry,
}: ResultScreenProps) {
  const [isLoading, setIsLoading] = useState(!result);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!result) {
      fetchRecommendation();
    }
  }, [result]);

  const fetchRecommendation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error('추천을 가져오는데 실패했습니다');
      }

      const data = await response.json();
      onResultReceived(data.gift);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        <p className="text-muted-foreground">당신에게 딱 맞는 선물을 찾는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <p className="text-destructive">{error}</p>
        <Button onClick={fetchRecommendation}>다시 시도</Button>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-6 max-w-md w-full">
      <h2 className="text-2xl font-bold">당신을 위한 선물</h2>

      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{result.name}</CardTitle>
          <CardDescription>{result.description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex flex-wrap gap-2 justify-center">
            {result.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 w-full">
        {canRetry && (
          <Button variant="outline" onClick={onRetry} className="w-full">
            마음에 안 들어요 (1회 가능)
          </Button>
        )}
        <Button onClick={onGoHome} className="w-full">
          처음으로
        </Button>
      </div>
    </div>
  );
}
