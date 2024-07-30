import { TQuestion, TQuestionsStore } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useQuestionsStore = create(
  persist<TQuestionsStore>(
    (set) => ({
      questions: [],
      setQuestions: (questions: TQuestion[]) =>
        set((state) => {
          if (questions.length === 0)
            return {
              questions: [],
            };
          else {
            if (state.questions.length === 0) {
              return {
                questions: questions,
              };
            }
            return {
              questions: state.questions,
            };
          }
        }),
    }),
    {
      name: "questions",
    }
  )
);
