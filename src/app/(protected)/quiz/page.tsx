import React from "react";
import dynamic from "next/dynamic";
import { auth } from "@/auth";

const EntirePage = dynamic(
  () => import("./entire-page").then((mod) => mod.default),
  {
    ssr: false,
  }
);

export default async function Page() {
  const session = await auth();
  if (!session) {
    return null;
  }

  return <EntirePage session={session} />;
}
