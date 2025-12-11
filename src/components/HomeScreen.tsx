import { Button } from '@/components/ui/button';

interface HomeScreenProps {
  onStart: () => void;
}

export default function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-8 max-w-md">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">나에게 딱 맞는 선물은?</h1>
        <p className="text-muted-foreground text-lg">
          간단한 질문에 답하고
          <br />
          나만을 위한 선물을 찾아보세요
        </p>
      </div>

      <Button size="lg" className="text-lg px-8 py-6" onClick={onStart}>
        시작하기
      </Button>

      <p className="text-sm text-muted-foreground">
        약 1분 정도 소요됩니다
      </p>
    </div>
  );
}
