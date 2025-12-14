import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface HomeScreenProps {
  onStart: () => void;
}

export default function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 max-w-md px-6">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-150" />
        <Image
          src="/icon.svg"
          alt="선물 상자"
          width={160}
          height={160}
          className="relative drop-shadow-lg animate-bounce-slow"
          priority
        />
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          나에게 딱 맞는 선물은?
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          간단한 질문에 답하고
          <br />
          나만을 위한 특별한 선물을 찾아보세요
        </p>
      </div>

      <Button
        size="lg"
        className="text-lg px-16 py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
        onClick={onStart}
      >
        시작하기
      </Button>

      <p className="text-sm text-muted-foreground/70">
        약 1분 정도 소요됩니다
      </p>
    </div>
  );
}
