import { Input, InputProps } from "@nextui-org/react";

export function TextInput({ ...rest }: InputProps) {
  const styles = {
    label: "!text-white text-sm",
    input: [
      "bg-transparent",
      "!text-white/90 text-sm",
      "placeholder:text-zinc-500 dark:placeholder:text-white/60",
    ],
    inputWrapper: [
      "shadow-xl",
      "!bg-zinc-800",
      "hover:!bg-zinc-800",
      "focus-within:!bg-zinc-800",
      "!cursor-text",
    ],
    clearButton: "text-red-400",
  };

  return <Input {...rest} classNames={{ ...styles }} />;
}
