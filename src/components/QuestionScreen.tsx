'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { questions } from '@/data/questions';
import { UserAnswer } from '@/types';

interface QuestionScreenProps {
  onComplete: (answers: UserAnswer[]) => void;
}

export default function QuestionScreen({ onComplete }: QuestionScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer: 'yes' | 'no') => {
    const tag = answer === 'yes' ? currentQuestion.yesTag : currentQuestion.noTag;
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

  return (
    <div className="flex flex-col items-center justify-center text-center gap-8 max-w-md w-full">
      <div className="w-full space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>질문 {currentIndex + 1}</span>
          <span>{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="py-8">
        <h2 className="text-2xl font-semibold">{currentQuestion.text}</h2>
      </div>

      <div className="flex gap-4 w-full">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 text-lg py-6"
          onClick={() => handleAnswer('no')}
        >
          아니요
        </Button>
        <Button
          size="lg"
          className="flex-1 text-lg py-6"
          onClick={() => handleAnswer('yes')}
        >
          네
        </Button>
      </div>
    </div>
  );
}
