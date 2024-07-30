import Navbar from "@/components/navbar";
import React from "react";
import { PastResults } from "./past-results";
import { auth } from "@/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
