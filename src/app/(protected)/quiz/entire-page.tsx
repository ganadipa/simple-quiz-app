"use client";

import React, { Suspense, useEffect, useState, useTransition } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useQuestionsStore } from "@/stores/questions-store";
import { sanitize } from "dompurify";
import Link from "next/link";
import { useUserAnswersStore } from "@/stores/user-answers-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SubmitDialogButton } from "./submit-dialog";
import { Session } from "next-auth";
import { submitQuiz } from "@/actions/quiz";
import CountdownTimer from "./countdown-timer";

export default function EntirePage({ session }: { session: Session }) {
  const { questions, setQuestions } = useQuestionsStore((state) => {
    return {
      questions: state.questions,
      setQuestions: state.setQuestions,
    };
  });
  const searchParams = useSearchParams();
  const userAnswers = useUserAnswersStore((state) => state.answers);
  const hydrated = useQuestionsStore.persist.hasHydrated();
  const router = useRouter();
  const [isPending, setTransition] = useTransition();

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (questions.length === 0) {
      redirect("/dashboard");
    }
  }, [hydrated, questions.length, router]);

  const number = Number(searchParams.get("number"));
  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (isNaN(number) || number < 1 || number > questions.length) {
      router.replace("/quiz?number=1");
    }
  });

  if (isNaN(number) || number < 1 || number > questions.length) {
    return null;
  }

  if (!hydrated) {
    return null;
  }

  if (questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[number - 1];

  function handleSubmit() {
    setTransition(() => {
      if (session.user?.email) {
        submitQuiz(userAnswers, questions, session.user?.email);
        setQuestions([]);
      }
    });
  }

  return (
    <section className="flex w-screen h-screen">
      {/* Problem description and choices*/}
      <div className="flex-1 p-6 border-r border-gray-300">
        {/* Problem description with sanitized descriptions to prevent XSS*/}
        <h1
          className="text-2xl font-bold mb-4"
          dangerouslySetInnerHTML={{
            __html: sanitize(currentQuestion.question),
          }}
        />

        {/* Choices */}
        <ul className="list-none p-0">
          {currentQuestion.choices.map((choice, index) => (
            <li key={index} className="mb-2">
              <Button
                className={cn(
                  "w-full text-left p-2 bg-gray-100 rounded hover:bg-gray-200  text-black hover:text-black",
                  {
                    "bg-blue-500 text-white":
                      userAnswers[number - 1] === choice,
                  }
                )}
                onClick={() => {
                  if (userAnswers[number - 1] === choice) {
                    useUserAnswersStore.getState().setAnswer(number - 1, "");
                  } else {
                    useUserAnswersStore
                      .getState()
                      .setAnswer(number - 1, choice);
                  }

                  router.replace(`/quiz?number=${number + 1}`);
                }}
                dangerouslySetInnerHTML={{ __html: sanitize(choice) }}
              ></Button>
            </li>
          ))}
        </ul>

        {/*Previou questions, submit, and next question button */}
        <div className="flex justify-between mt-4">
          <Button
            className="bg-red-600 p-2 rounded text-white hover:bg-red-400"
            disabled={number === 1}
          >
            <Link
              href={{
                pathname: "/quiz",
                query: {
                  number: number - 1,
                },
              }}
              replace
            >
              &#x2190; Previous
            </Link>
          </Button>

          <SubmitDialogButton session={session} onSubmit={handleSubmit} />

          <Button
            disabled={number === questions.length}
            className="bg-green-400 p-2 rounded hover:bg-green-300"
          >
            <Link
              href={{
                pathname: "/quiz",
                query: {
                  number: number + 1,
                },
              }}
              replace
            >
              Next &#x2192;
            </Link>
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="w-60 p-6 flex flex-col items-center justify-center border-l border-gray-300">
        <CountdownTimer initialTime={60 * 5} onTimeUp={handleSubmit} />
        <div className="grid grid-cols-4 gap-4">
          {questions.map((_, idx) => (
            <Link
              key={idx}
              className={cn(
                `w-10 h-10 flex items-center justify-center border rounded`,
                {
                  "bg-green-300":
                    userAnswers[idx] !== "" &&
                    questions[idx].choices.includes(userAnswers[idx]),
                  "bg-blue-100  ": number === idx + 1,
                }
              )}
              href={{
                pathname: "/quiz",
                query: {
                  number: idx + 1,
                },
              }}
              replace
            >
              {idx + 1}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
