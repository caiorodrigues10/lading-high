import { Spinner } from "@nextui-org/react";
import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface EspecialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "success" | "danger";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

export function EspecialButton({
  children,
  className,
  variant,
  rightIcon,
  leftIcon,
  disabled,
  isLoading = false,
  loadingText = "Carregando...",
  ...rest
}: EspecialButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={clsx(
        "button-sliced before:duration-200 hover:!text-black duration-200 cursor-pointer font-medium gap-4 group disabled:cursor-not-allowed disabled:opacity-80",
        {
          "before:bg-spring-green-500  !text-spring-green-500 before:active:!bg-spring-green-600":
            variant === "success",
          "before:bg-red-500  !text-red-500 before:active:!bg-red-600":
            variant === "danger",
          "before:active:!bg-zinc-300 ": !variant,
          "justify-between !flex items-center": leftIcon || rightIcon,
        },
        className
      )}
      {...rest}
    >
      {!isLoading ? (
        <>
          {leftIcon && leftIcon}
          {children}
          {rightIcon && rightIcon}
        </>
      ) : (
        <div className="flex gap-4">
          {loadingText}
          <Spinner
            size="sm"
            color={variant === "success" ? "success" : "current"}
            classNames={{
              circle1: "group-hover:!border-b-black",
              circle2: "group-hover:!border-b-black",
            }}
          />
        </div>
      )}
    </button>
  );
}
