"use client";

import { Card, CardFooter } from "../ui/card";
import BackButton from "./back-button";

interface AuthCardProps {
  children: React.ReactNode;
  backButtonLabel: string;
  backButtonHref: string;
}

export const CardWrapper = ({
  children,
  backButtonLabel,
  backButtonHref,
}: AuthCardProps) => {
  return (
    <Card className="w-[400px] shadow-md px-6 pt-8">
      {children}

      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
