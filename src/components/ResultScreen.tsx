'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';
import { useGetRecommendGift } from '@/hooks/useGetRecommendGift';
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
  const { gift, isLoading, error, retry } = useGetRecommendGift(
    answers,
    result
  );

  useEffect(() => {
    if (gift && gift !== result) {
      onResultReceived(gift);
    }
  }, [gift, result, onResultReceived]);

  if (isLoading) return <Loading text="당신에게 딱 맞는 선물을 찾는 중..." />;
  if (error) return <ErrorMessage message={error} onRetry={retry} />;
  if (!gift) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-6 max-w-md w-full">
      <h2 className="text-2xl font-bold">당신을 위한 선물</h2>

      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{gift.name}</CardTitle>
          <CardDescription>{gift.description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex flex-wrap gap-2 justify-center">
            {gift.tags.slice(0, 3).map((tag) => (
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
