"use client";
import clsx from "clsx";
import { ButtonHTMLAttributes, useState } from "react";

interface ButtonEspecialOrderProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  percent: number;
}

export function ButtonEspecialOrder({
  percent,
  text,
  className,
  onClick,
  ...rest
}: ButtonEspecialOrderProps) {
  const [selected, setSelected] = useState(false);

  return (
    <button
      type="button"
      onClick={(e) => {
        onClick && onClick(e);
        setSelected((prev) => !prev);
      }}
      className={clsx(
        "flex justify-between gap-4 items-center border border-zinc-300 p-4 duration-200 sliced",
        {
          "bg-zinc-100 text-black border-zinc-100": selected,
          "bg-zinc-800/90 border-zinc-500": !selected,
        },
        className
      )}
      {...rest}
    >
      {text}
      <span
        className={clsx({
          "text-black": selected,
          "text-spring-green-500": !selected,
        })}
      >
        +{percent}%
      </span>
    </button>
  );
}
