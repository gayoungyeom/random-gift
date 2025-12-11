export interface Gift {
  id: string;
  name: string;
  description: string;
  image?: string;
  tags: string[];
}

export interface Question {
  id: string;
  text: string;
  yesTag: string;
  noTag: string;
}

export interface UserAnswer {
  questionId: string;
  answer: 'yes' | 'no';
  tag: string;
}

export type GameState = 'home' | 'questions' | 'result';
