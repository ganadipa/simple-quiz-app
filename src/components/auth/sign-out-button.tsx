"use client";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useUserAnswersStore } from "@/stores/user-answers-store";
import { useQuestionsStore } from "@/stores/questions-store";

export default function SignOutButton() {
  const setQuestions = useQuestionsStore((state) => state.setQuestions);
  const setAnswers = useUserAnswersStore((state) => state.setAnswers);

  function handleClick() {
    setQuestions([]);
    setAnswers([]);
  }

  return (
    <Button
      onClick={() => {
        signOut();
        handleClick();
      }}
    >
      Sign out
    </Button>
  );
}
