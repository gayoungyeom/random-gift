'use client';

import { useEffect, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';
import GiftCard from '@/components/GiftCard';
import { useGetRecommendGift } from '@/hooks/useGetRecommendGift';
import { Gift, UserAnswer } from '@/types';

interface ResultScreenProps {
  answers: UserAnswer[];
  result: Gift | null;
  onResultReceived: (gift: Gift) => void;
  onRetryCount: () => void;
  onGoHome: () => void;
  canRetry: boolean;
}

export default function ResultScreen({
  answers,
  result,
  onResultReceived,
  onRetryCount,
  onGoHome,
  canRetry,
}: ResultScreenProps) {
  const giftCardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { gift, isLoading, error, retry } = useGetRecommendGift(
    answers,
    result,
    onRetryCount
  );

  useEffect(() => {
    if (gift && gift !== result) {
      onResultReceived(gift);
    }
  }, [gift, result, onResultReceived]);

  const handleDownload = async () => {
    if (!giftCardRef.current || !gift) return;

    setIsDownloading(true);

    try {
      const dataUrl = await toPng(giftCardRef.current, {
        pixelRatio: 2,
        backgroundColor: undefined,
      });

      const link = document.createElement('a');
      link.download = `${gift.name}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('이미지 다운로드 실패:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) return <Loading text="당신에게 딱 맞는 선물을 찾는 중..." />;
  if (error) return <ErrorMessage message={error} onRetry={retry} />;
  if (!gift) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h2 className="text-2xl font-bold">당신을 위한 선물</h2>

      <GiftCard ref={giftCardRef} gift={gift} />

      <div className="flex flex-col gap-3 w-[320px]">
        <Button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full"
        >
          {isDownloading ? '다운로드 중...' : '이미지로 저장하기'}
        </Button>
        {canRetry && (
          <Button variant="outline" onClick={retry} className="w-full">
            마음에 안 들어요 (1회 가능)
          </Button>
        )}
        <Button variant="outline" onClick={onGoHome} className="w-full">
          처음으로
        </Button>
      </div>
    </div>
  );
}
