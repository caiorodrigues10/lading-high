import clsx from "clsx";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import NavBar from "./NavBar";

interface BodyPageProps {
  children: ReactNode;
  className?: string;
}

export function BodyPage({ children, className }: BodyPageProps) {
  return (
    <div className="relative flex w-full flex-1 flex-col items-center overflow-hidden">
      <NavBar />

      <main
        className={clsx(
          "flex h-full w-full flex-col items-center overflow-y-auto",
          className
        )}
      >
        {children}
      </main>
    </div>
  );
}
