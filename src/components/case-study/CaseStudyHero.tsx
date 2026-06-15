"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import Magnetic from "@/components/motion/Magnetic";

type CaseStudyHeroProps = {
  badge: ReactNode;
  title: string;
  lead: string;
  backHref?: string;
  backLabel?: string;
};

export default function CaseStudyHero({
  badge,
  title,
  lead,
  backHref = "/#work",
  backLabel = "Volver al inicio",
}: CaseStudyHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const items = gsap.utils.toArray<HTMLElement>(".cs-case-hero-item");
      const line = section.querySelector<HTMLElement>(".cs-case-hero-line");

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(items, { opacity: 1, y: 0 });
        if (line) gsap.set(line, { y: "0%" });
        return;
      }

      gsap.set(items, { opacity: 0, y: 24 });
      if (line) gsap.set(line, { y: "100%" });

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });

      timeline.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.09,
      });

      if (line) {
        timeline.to(
          line,
          {
            y: "0%",
            duration: 1,
            ease: "power4.out",
          },
          "-=0.55",
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="cs-case-hero hero-band"
      data-header-inverse
      aria-labelledby="case-hero-title"
    >
      <div className="hero-band-grid" aria-hidden="true" />

      <div className="hero-inner container-site cs-case-hero-inner">
        <div className="cs-case-hero-item cs-case-hero-back-wrap">
          <Magnetic>
            <Link href={backHref} className="btn-back">
              <span aria-hidden="true">←</span>
              {backLabel}
            </Link>
          </Magnetic>
        </div>

        <p className="cs-case-hero-item type-eyebrow">{badge}</p>

        <h1 id="case-hero-title" className="cs-case-hero-title type-hero-title">
          <span className="block overflow-hidden">
            <span className="cs-case-hero-line block will-change-transform">{title}</span>
          </span>
        </h1>

        <p className="cs-case-hero-item type-body cs-case-hero-lead">{lead}</p>
      </div>
    </section>
  );
}
