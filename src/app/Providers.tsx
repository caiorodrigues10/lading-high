"use client";
import { Toaster } from "@/components/ui/toaster";
import { AppProvider } from "@/context/AppContext";
import { NextUIProvider } from "@nextui-org/system";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <NextUIProvider>
      <AppProvider>
        <Toaster />
        {children}
      </AppProvider>
    </NextUIProvider>
  );
}
