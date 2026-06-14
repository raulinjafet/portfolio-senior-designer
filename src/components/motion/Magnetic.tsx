"use client";

import gsap from "gsap";
import { useEffect, useRef, type ReactNode } from "react";
import { useCursor } from "@/context/CursorContext";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
};

export default function Magnetic({
  children,
  strength = 0.35,
}: MagneticProps) {
  const magneticRef = useRef<HTMLDivElement>(null);
  const { setHoveringLink } = useCursor();

  useEffect(() => {
    const element = magneticRef.current;
    if (!element) return;

    const pullTowardPointer = (event: MouseEvent) => {
      const { width, height, left, top } = element.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;

      gsap.to(element, {
        x: deltaX * strength,
        y: deltaY * strength,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onMouseEnter = (event: MouseEvent) => {
      setHoveringLink(true);
      pullTowardPointer(event);
    };

    const onMouseMove = (event: MouseEvent) => {
      pullTowardPointer(event);
    };

    const onMouseLeave = () => {
      setHoveringLink(false);

      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
        overwrite: "auto",
      });
    };

    element.addEventListener("mouseenter", onMouseEnter);
    element.addEventListener("mousemove", onMouseMove);
    element.addEventListener("mouseleave", onMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", onMouseEnter);
      element.removeEventListener("mousemove", onMouseMove);
      element.removeEventListener("mouseleave", onMouseLeave);
      gsap.killTweensOf(element);
      gsap.set(element, { x: 0, y: 0 });
      setHoveringLink(false);
    };
  }, [setHoveringLink, strength]);

  return (
    <div ref={magneticRef} className="inline-block will-change-transform">
      {children}
    </div>
  );
}
