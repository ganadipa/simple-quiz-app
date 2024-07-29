import React from "react";
import { signOut } from "@/auth";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center border-b w-full border-white/10 py-2 max-w-[780px] mx-auto bg-zinc-800/20 px-4 -translate-x-1/2 rounded-b fixed top-0 left-1/2">
      <ul className="flex space-x-4">
        <li>
          <Image
            src={"/blank-profile.jpg"}
            alt="profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </li>
        <li>
          <form
            action={async (formData) => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit">Sign out</Button>
          </form>
        </li>
      </ul>
    </header>
  );
}
