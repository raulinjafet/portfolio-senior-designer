"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CursorContextValue = {
  isHoveringLink: boolean;
  setHoveringLink: (hovering: boolean) => void;
  isHoveringProject: boolean;
  setHoveringProject: (hovering: boolean) => void;
};

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isHoveringProject, setIsHoveringProject] = useState(false);

  const setHoveringLink = useCallback((hovering: boolean) => {
    setIsHoveringLink(hovering);
  }, []);

  const setHoveringProject = useCallback((hovering: boolean) => {
    setIsHoveringProject(hovering);
  }, []);

  const value = useMemo(
    () => ({
      isHoveringLink,
      setHoveringLink,
      isHoveringProject,
      setHoveringProject,
    }),
    [
      isHoveringLink,
      setHoveringLink,
      isHoveringProject,
      setHoveringProject,
    ],
  );

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);

  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }

  return context;
}
