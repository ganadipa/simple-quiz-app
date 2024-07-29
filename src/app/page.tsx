import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-green-300">
      <h2 className="text-white font-bold text-6xl inline-block mx-auto w-3/5 leading-snug text-center">
        You must be logged in to use this quiz application!
      </h2>
      <Link href={"/auth/signin"}>
        <Button className="bg-white text-green-950 hover:text-white">
          Log in &#x2192;
        </Button>
      </Link>
    </main>
  );
}
