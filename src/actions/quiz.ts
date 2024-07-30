"use server";

import { db } from "@/lib/db";
import { TPastResult, TQuestion, TUserAnswersStore } from "@/lib/types";
import bcrypt from "bcryptjs";

export async function submitQuiz(
  userAnswers: string[],
  questions: TQuestion[],
  userEmail: string
) {
  const totalQuestions = questions.length;
  let totalCorrect = 0,
    totalAnswered = 0;

  for (let i = 0; i < totalQuestions; i++) {
    const question = questions[i];
    const userAnswer = userAnswers[i];
    const isCorrect = await bcrypt.compare(userAnswer, question.hashedAnswer);
    if (isCorrect) {
      totalCorrect++;
    }

    if (userAnswer !== "") {
      totalAnswered++;
    }
  }

  await db.pastQuiz.create({
    data: {
      score: (totalCorrect / totalQuestions) * 100,
      userEmail,
      totalAnswered,
      totalQuestions: questions.length,
    },
  });
}

export async function getPastResults(
  userEmail: string
): Promise<TPastResult[]> {
  const pastResults = await db.pastQuiz.findMany({
    where: {
      userEmail,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const ret = pastResults.map((result) => {
    return {
      score: result.score,
      time: result.createdAt,
      numbersAnswered: result.totalAnswered,
      totalCorrect: Math.round((result.score / 100) * result.totalQuestions),
      totalQuestions: result.totalQuestions,
    };
  });

  return ret;
}
