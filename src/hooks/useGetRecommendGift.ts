import { useEffect, useState, useCallback, useRef } from 'react';
import { Gift, UserAnswer } from '@/types';

interface UseGetRecommendGift {
  gift: Gift | null;
  isLoading: boolean;
  error: string | null;
  retry: () => Promise<void>;
}

async function fetchRecommendGift(
  answers: UserAnswer[],
  signal?: AbortSignal
): Promise<Gift> {
  const response = await fetch('/api/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
    signal,
  });

  if (!response.ok) {
    throw new Error('추천을 가져오는데 실패했습니다');
  }

  const data = await response.json();
  return data.gift;
}

export function useGetRecommendGift(
  answers: UserAnswer[],
  initialGift: Gift | null = null,
  onRetryCount: () => void
): UseGetRecommendGift {
  const [gift, setGift] = useState<Gift | null>(initialGift);
  const [isLoading, setIsLoading] = useState(!initialGift);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(
    async (signal?: AbortSignal) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchRecommendGift(answers, signal);
        if (!signal?.aborted) {
          setGift(result);
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        if (!signal?.aborted) {
          setError(err instanceof Error ? err.message : '오류가 발생했습니다');
        }
      } finally {
        if (!signal?.aborted) {
          setIsLoading(false);
        }
      }
    },
    [answers]
  );

  const retry = useCallback(async () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    await execute(abortControllerRef.current.signal);
    onRetryCount();
  }, [execute, onRetryCount]);

  useEffect(() => {
    if (initialGift) return;

    abortControllerRef.current = new AbortController();
    execute(abortControllerRef.current.signal);

    return () => {
      abortControllerRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGift]);

  return { gift, isLoading, error, retry };
}
