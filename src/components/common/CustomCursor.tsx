"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useCursor } from "@/context/CursorContext";
import { getColorToken } from "@/lib/tokens";

const CURSOR_BASE_SIZE = 80;
const CURSOR_DEFAULT_SCALE = 0.2;
const CURSOR_PROJECT_SIZE = 64;
const CURSOR_PROJECT_SCALE = CURSOR_PROJECT_SIZE / CURSOR_BASE_SIZE;

type QuickToFn = (value: number) => void;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const xToRef = useRef<QuickToFn | null>(null);
  const yToRef = useRef<QuickToFn | null>(null);
  const { isHoveringLink, isHoveringProject, setHoveringLink, setHoveringProject } =
    useCursor();

  useGSAP(
    () => {
      const mediaQuery = window.matchMedia("(pointer: fine)");
      if (!mediaQuery.matches) return;

      const cursor = cursorRef.current;
      if (!cursor) return;

      gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
        scale: CURSOR_DEFAULT_SCALE,
        backgroundColor: getColorToken("cursorDefault"),
        force3D: true,
      });

      if (labelRef.current) {
        gsap.set(labelRef.current, { opacity: 0, scale: 0.8 });
      }

      xToRef.current = gsap.quickTo(cursor, "x", {
        duration: 0.6,
        ease: "power3.out",
      });

      yToRef.current = gsap.quickTo(cursor, "y", {
        duration: 0.6,
        ease: "power3.out",
      });

      const onMouseMove = (event: MouseEvent) => {
        xToRef.current?.(event.clientX);
        yToRef.current?.(event.clientY);
      };

      const onDocumentLeave = () => {
        setHoveringLink(false);
        setHoveringProject(false);
      };

      window.addEventListener("mousemove", onMouseMove, { passive: true });
      document.documentElement.addEventListener(
        "mouseleave",
        onDocumentLeave,
      );

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        document.documentElement.removeEventListener(
          "mouseleave",
          onDocumentLeave,
        );
        xToRef.current = null;
        yToRef.current = null;
        gsap.killTweensOf(cursor);
      };
    },
    {
      scope: cursorRef,
      dependencies: [setHoveringLink, setHoveringProject],
    },
  );

  useEffect(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor) return;

    if (isHoveringProject) {
      gsap.to(cursor, {
        scale: CURSOR_PROJECT_SCALE,
        backgroundColor: getColorToken("cursorProject"),
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });

      if (label) {
        gsap.to(label, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      return;
    }

    if (label) {
      gsap.to(label, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: "power2.in",
        overwrite: "auto",
      });
    }

    gsap.to(cursor, {
      scale: isHoveringLink ? 1 : CURSOR_DEFAULT_SCALE,
      backgroundColor: isHoveringLink
        ? getColorToken("cursorHover")
        : getColorToken("cursorDefault"),
      duration: isHoveringLink ? 0.6 : 0.2,
      ease: isHoveringLink ? "power3.out" : "power2.inOut",
      overwrite: "auto",
    });
  }, [isHoveringLink, isHoveringProject]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{ width: CURSOR_BASE_SIZE, height: CURSOR_BASE_SIZE }}
      className={`pointer-events-none fixed top-0 left-0 z-[9999] hidden items-center justify-center rounded-full will-change-transform pointer-fine:flex ${
        isHoveringProject ? "" : "mix-blend-difference"
      }`}
    >
      <span ref={labelRef} className="type-cursor-label mix-blend-normal">
        Ver
      </span>
    </div>
  );
}
