"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const h1Full =
  "Creo sistemas de diseño y experiencias visuales que conectan a las personas con el negocio.";

const h1Lines = [
  "Creo sistemas de diseño",
  "y experiencias visuales que",
  "conectan a las personas con el negocio.",
] as const;

const metrics = [
  { value: 12, label: "años de experiencia" },
  { value: 30, label: "proyectos realizados" },
] as const;

function isDesktopHero() {
  return window.matchMedia("(min-width: 1024px)").matches;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const desktop = isDesktopHero();
      const unifiedTitle = section.querySelector<HTMLElement>(".hero-title-unified");
      const splitLines = gsap.utils.toArray<HTMLElement>(".hero-line");
      const preHeader = section.querySelector<HTMLElement>(".hero-preheader");
      const bottomBlock = section.querySelector<HTMLElement>(".hero-bottom");
      const metricValues = gsap.utils.toArray<HTMLElement>(".hero-metric-value");
      const metricLabels = gsap.utils.toArray<HTMLElement>(".hero-metric-label");
      const grid = section.querySelector<HTMLElement>(".hero-band-grid");
      const inner = section.querySelector<HTMLElement>(".hero-inner");

      if (!preHeader || !bottomBlock) return;
      if (desktop && !splitLines.length) return;
      if (!desktop && !unifiedTitle) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        metricValues.forEach((el) => {
          const target = Number(el.dataset.target);
          el.textContent = `+${target}`;
        });
        gsap.set([preHeader, bottomBlock, unifiedTitle, ...metricLabels], {
          opacity: 1,
          y: 0,
        });
        gsap.set(splitLines, { y: "0%" });
        return;
      }

      gsap.set(preHeader, { opacity: 0, y: 10 });
      gsap.set(bottomBlock, { opacity: 0, y: 16 });
      gsap.set(metricLabels, { opacity: 0, y: 8 });
      metricValues.forEach((el) => {
        el.textContent = "+0";
      });

      if (desktop) {
        gsap.set(splitLines, { y: "100%" });
      } else if (unifiedTitle) {
        gsap.set(unifiedTitle, { opacity: 0, y: 20 });
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0,
      });

      timeline.to(preHeader, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      if (desktop) {
        timeline.to(
          splitLines,
          {
            y: "0%",
            duration: 0.95,
            stagger: 0.08,
          },
          "-=0.2",
        );
      } else if (unifiedTitle) {
        timeline.to(
          unifiedTitle,
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.2",
        );
      }

      timeline.to(
        bottomBlock,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.45",
      );

      metricValues.forEach((el, index) => {
        const target = Number(el.dataset.target);
        const counter = { value: 0 };

        timeline.to(
          counter,
          {
            value: target,
            duration: 1.35,
            ease: "power2.out",
            snap: { value: 1 },
            onUpdate: () => {
              el.textContent = `+${Math.round(counter.value)}`;
            },
          },
          index === 0 ? "-=0.55" : "-=1.15",
        );
      });

      timeline.to(
        metricLabels,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.9",
      );

      if (grid) {
        gsap.to(grid, {
          yPercent: 55,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      if (inner) {
        gsap.to(inner, {
          y: 220,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });

        gsap.to(inner, {
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-header-inverse
      className="hero-band"
      aria-label="Introducción"
    >
      <div className="hero-band-grid" aria-hidden="true" />

      <div className="hero-inner container-site">
        <p className="hero-preheader type-eyebrow">
          Product &amp; Design System Designer.
        </p>

        <div className="hero-title-block">
          <h1 className="type-hero-title">
            <span className="hero-title-unified">{h1Full}</span>

            <span className="hero-title-split">
              {h1Lines.map((line) => (
                <span key={line} className="block overflow-hidden">
                  <span className="hero-line block will-change-transform">{line}</span>
                </span>
              ))}
            </span>
          </h1>
        </div>

        <div className="hero-bottom">
          <div className="hero-metrics">
            {metrics.map(({ value, label }) => (
              <div key={label} className="hero-metric-item">
                <p
                  className="hero-metric-value type-hero-metric"
                  data-target={value}
                  aria-live="polite"
                >
                  +0
                </p>
                <p className="hero-metric-label type-eyebrow">{label}</p>
              </div>
            ))}
          </div>

          <p className="hero-body-copy type-body">
            Combinando estrategia, interfaces intuitivas y dirección de equipos
            para transformar ideas complejas en productos digitales de alto
            impacto.
          </p>
        </div>
      </div>
    </section>
  );
}
