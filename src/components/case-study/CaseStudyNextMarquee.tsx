"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

type CaseStudyNextMarqueeProps = {
  href: string;
  label?: string;
  repeatCount?: number;
};

const DEFAULT_REPEAT_COUNT = 6;
const MARQUEE_DURATION = 28;

export default function CaseStudyNextMarquee({
  href,
  label = "Siguiente Caso",
  repeatCount = DEFAULT_REPEAT_COUNT,
}: CaseStudyNextMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const items = (keyPrefix: string) =>
    Array.from({ length: repeatCount }, (_, index) => (
      <span
        key={`${keyPrefix}-${index}`}
        className="cs-next-marquee__item"
        aria-hidden={keyPrefix !== "a" || index > 0}
      >
        {label}
      </span>
    ));

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const startMarquee = () => {
      tweenRef.current?.kill();

      const loopWidth = track.scrollWidth / 2;
      if (!loopWidth) return;

      gsap.set(track, { x: 0, force3D: true });
      tweenRef.current = gsap.to(track, {
        x: -loopWidth,
        duration: MARQUEE_DURATION,
        ease: "none",
        repeat: -1,
      });
    };

    startMarquee();

    const resizeObserver = new ResizeObserver(startMarquee);
    resizeObserver.observe(track);

    return () => {
      resizeObserver.disconnect();
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  }, [label, repeatCount]);

  const pauseMarquee = () => {
    tweenRef.current?.pause();
  };

  const resumeMarquee = () => {
    tweenRef.current?.play();
  };

  return (
    <section className="cs-section cs-next-marquee-section">
      <Link
        href={href}
        className="cs-next-marquee"
        aria-label={`${label}: ver proyecto`}
        onMouseEnter={pauseMarquee}
        onMouseLeave={resumeMarquee}
        onFocus={pauseMarquee}
        onBlur={resumeMarquee}
      >
        <div className="cs-next-marquee__viewport">
          <div ref={trackRef} className="cs-next-marquee__track">
            <div className="cs-next-marquee__group">{items("a")}</div>
            <div className="cs-next-marquee__group" aria-hidden="true">
              {items("b")}
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
