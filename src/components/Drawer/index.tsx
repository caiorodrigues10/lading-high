import clsx from "clsx";
import { ReactNode } from "react";

interface IDrawerProps {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
}

export function Drawer({ children, className, isOpen }: IDrawerProps) {
  return (
    <div
      className={clsx(
        "fixed z-40 top-0 right-0 opacity-100  w-screen h-screen bg-zinc-900  duration-1000",
        className,
        {
          "opacity-0 translate-x-full": !isOpen,
        }
      )}
    >
      {children}
    </div>
  );
}
