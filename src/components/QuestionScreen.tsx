'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { questions } from '@/data/questions';
import { UserAnswer } from '@/types';

interface QuestionScreenProps {
  onComplete: (answers: UserAnswer[]) => void;
  onGoHome: () => void;
}

export default function QuestionScreen({
  onComplete,
  onGoHome,
}: QuestionScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer: 'yes' | 'no') => {
    const tag =
      answer === 'yes' ? currentQuestion.yesTag : currentQuestion.noTag;
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer,
      tag,
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setAnswers(answers.slice(0, -1));
    } else {
      onGoHome();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center gap-8 max-w-md w-full">
      <div className="w-full space-y-2">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <button
            onClick={handleBack}
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <span>←</span>
            <span>{currentIndex === 0 ? '처음으로' : '이전'}</span>
          </button>
          <span>
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="py-8 min-h-32 flex items-center justify-center">
        <h2 className="text-2xl font-semibold break-keep">
          {currentQuestion.text}
        </h2>
      </div>

      <div className="flex gap-4 w-full">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 text-lg py-6 rounded-full"
          onClick={() => handleAnswer('no')}
        >
          아니요
        </Button>
        <Button
          size="lg"
          className="flex-1 text-lg py-6 rounded-full"
          onClick={() => handleAnswer('yes')}
        >
          네
        </Button>
      </div>
    </div>
  );
}
