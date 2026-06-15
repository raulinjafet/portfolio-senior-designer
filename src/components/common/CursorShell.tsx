"use client";

import type { ReactNode } from "react";
import { CursorProvider } from "@/context/CursorContext";
import CustomCursor from "@/components/common/CustomCursor";

type CursorShellProps = {
  children: ReactNode;
};

export default function CursorShell({ children }: CursorShellProps) {
  return (
    <CursorProvider>
      <CustomCursor />
      {children}
    </CursorProvider>
  );
}
