"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
  label: string;
  href: string;
}

export default function BackButton({ label, href }: BackButtonProps) {
  return (
    <Link href={href} className="mx-auto">
      <Button variant="link" className="font-normal w-full" size={"sm"}>
        {label}
      </Button>
    </Link>
  );
}
