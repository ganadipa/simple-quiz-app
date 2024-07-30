export type TAuthResponse = {
  ok: boolean;
  message: string;
};

export type TQuestion = {
  question: string;
  hashedAnswer: string;
  choices: string[];
  order: number[];
};

export type TQuestionsStore = {
  questions: TQuestion[];
  setQuestions: (questions: TQuestion[]) => void;
};

export type TUserAnswersStore = {
  answers: string[];
  setAnswers: (answers: string[]) => void;
  setAnswer: (idx: number, answer: string) => void;
};

export interface APIQuestionAttributes {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface IAPIResponse {
  response_code: number;
  results: APIQuestionAttributes[];
}

export type TPastResult = {
  score: number;
  time: Date;
  numbersAnswered: number;
  totalCorrect: number;
  totalQuestions: number;
};

export interface ITimerStore {
  targetTime: number;
  setTargetTime: (time: number) => void;
}
