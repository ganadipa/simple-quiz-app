import { TUserAnswersStore } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useQuestionsStore } from "./questions-store";

export const useUserAnswersStore = create(
  persist<TUserAnswersStore>(
    (set) => ({
      answers: new Array(useQuestionsStore.getState().questions.length).fill(
        ""
      ),
      setAnswer: (idx: number, answer: string) =>
        set((state) => {
          const answers = [...state.answers];
          answers[idx] = answer;
          return {
            answers,
          };
        }),
      setAnswers: (answers: string[]) => {
        set(() => ({ answers }));
      },
    }),
    {
      name: "user-answers",
    }
  )
);
