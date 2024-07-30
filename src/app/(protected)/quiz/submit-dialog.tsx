"use client";

import { submitQuiz } from "@/actions/quiz";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useQuestionsStore } from "@/stores/questions-store";
import { useUserAnswersStore } from "@/stores/user-answers-store";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

export function SubmitDialogButton({
  session,
  onSubmit,
}: {
  session: Session;
  onSubmit: () => void;
}) {
  const questions = useQuestionsStore((state) => state.questions);
  const setQuestions = useQuestionsStore((state) => state.setQuestions);
  const { answers, setAnswers } = useUserAnswersStore((state) => {
    return {
      answers: state.answers,
      setAnswers: state.setAnswers,
    };
  });

  const [isPending, setTransition] = useTransition();
  if (!session) {
    return null;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" disabled={isPending}>
          Submit
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. You will submit your answers and you
            cannot change them later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} disabled={isPending}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
