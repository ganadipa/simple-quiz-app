"use client";

import { getPastResults } from "@/actions/quiz";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TPastResult } from "@/lib/types";
import { Session } from "next-auth";
import { useEffect, useState, useTransition } from "react";

export function PastResults({ session }: { session: Session }) {
  const [pastRes, setPastRes] = useState<TPastResult[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function get() {
      if (session.user?.email) {
        const email = session.user.email;
        const res = await getPastResults(email);
        setPastRes(res.slice(0, 5));
      }
    }

    startTransition(() => {
      get();
    });
  }, []);

  return (
    <Table className="mb-12">
      <TableCaption>Your last five quizzes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/2 text-center ">Submit Datetime</TableHead>
          <TableHead className="">Score</TableHead>
          <TableHead className="">Numbers Answered</TableHead>
          <TableHead className="">Total Correct</TableHead>
          <TableHead className="">Total Questions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isPending ? (
          <TableRow>
            <TableCell colSpan={5} rowSpan={5} className="text-center">
              Loading...
            </TableCell>
          </TableRow>
        ) : pastRes.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} rowSpan={5} className="text-center">
              You have not taken any quizzes yet.
            </TableCell>
          </TableRow>
        ) : (
          pastRes.map((result, idx) => (
            <TableRow key={idx}>
              <TableCell className="text-center">
                {result.time.toLocaleString()}
              </TableCell>
              <TableCell className="text-center">{result.score}</TableCell>
              <TableCell className="text-center">
                {result.numbersAnswered}
              </TableCell>
              <TableCell className="text-center">
                {result.totalCorrect}
              </TableCell>
              <TableCell className="text-center">
                {result.totalQuestions}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
