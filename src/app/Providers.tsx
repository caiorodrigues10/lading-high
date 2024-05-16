"use client";
import { Toaster } from "@/components/ui/toaster";
import { NextUIProvider } from "@nextui-org/system";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <NextUIProvider>
      <Toaster />
      {children}
    </NextUIProvider>
  );
}
