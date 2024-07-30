"use client";

import { Button } from "@/components/ui/button";
import { IAPIResponse } from "@/lib/types";
import { useQuestionsStore } from "@/stores/questions-store";
import { useUserAnswersStore } from "@/stores/user-answers-store";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import bcrypt from "bcryptjs";

function shuffleArray(array: number[]) {
  for (var i = array.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

export default function StartQuiz() {
  const { questions, setQuestions } = useQuestionsStore((state) => {
    return {
      questions: state.questions,
      setQuestions: state.setQuestions,
    };
  });
  const { answers, setAnswers } = useUserAnswersStore((state) => {
    return {
      answers: state.answers,
      setAnswers: state.setAnswers,
    };
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    if (questions.length > 0) {
      router.push("/quiz?number=1");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get<IAPIResponse>(
        "https://opentdb.com/api.php?amount=10&category=9&type=multiple"
      );
      const questions = await Promise.all(
        response.data.results.map(async (question) => {
          let order = [0, 1, 2, 3];
          order = shuffleArray(order);
          return {
            question: question.question,
            hashedAnswer: await bcrypt.hash(question.correct_answer, 10),
            choices: [...question.incorrect_answers, question.correct_answer],
            order,
          };
        })
      );

      setQuestions(questions);
      setAnswers(new Array(questions.length).fill(""));

      toast.success("Questions successfully prepared!");
      router.push("/quiz?number=1");
    } catch (error) {
      toast.error("Failed to fetch questions. Please try again.");
    }
    setLoading(false);
  };
  return (
    <Button onClick={handleClick} disabled={loading} className="mx-auto">
      {questions.length === 0 ? "Start Quiz" : "Resume Quiz"}
    </Button>
  );
}
