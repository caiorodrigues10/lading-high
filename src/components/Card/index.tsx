import clsx from "clsx";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "card-sliced font-medium gap-4 before:bg-spring-green-500 before:duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}
