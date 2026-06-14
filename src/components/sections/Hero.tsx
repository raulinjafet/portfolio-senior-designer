"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const h1Lines = [
  "Creo sistemas de diseño",
  "y experiencias visuales",
  "que conectan a las personas con el negocio.",
] as const;

const metrics = [
  { value: "+12", label: "años de experiencia" },
  { value: "+30", label: "proyectos realizados" },
] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const lines = gsap.utils.toArray<HTMLElement>(".hero-line");
      const preHeader = section.querySelector<HTMLElement>(".hero-preheader");
      const bottomBlock = section.querySelector<HTMLElement>(".hero-bottom");

      if (!lines.length || !preHeader || !bottomBlock) return;

      gsap.set(lines, { y: "100%" });
      gsap.set(preHeader, { opacity: 0, y: 10 });
      gsap.set(bottomBlock, { opacity: 0, y: 16 });

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

      timeline.to(
        lines,
        {
          y: "0%",
          duration: 0.95,
          stagger: 0.08,
        },
        "-=0.2",
      );

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
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="flex min-h-[85vh] items-center pt-24 pb-16 lg:pt-32 lg:pb-24"
      aria-label="Introducción"
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <p className="hero-preheader type-eyebrow">
          Product &amp; Design System Designer
        </p>

        <h1 className="type-hero-title mt-6 mb-12 max-w-5xl">
          {h1Lines.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span className="hero-line block translate-y-full will-change-transform">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero-bottom grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="flex flex-wrap gap-x-12 gap-y-8">
            {metrics.map(({ value, label }) => (
              <div key={label}>
                <p className="type-hero-metric">{value}</p>
                <p className="type-eyebrow mt-2">{label}</p>
              </div>
            ))}
          </div>

          <p className="type-body max-w-xl">
            Combinando estrategia, interfaces intuitivas y dirección de equipos
            para transformar ideas complejas en productos digitales de alto
            impacto.
          </p>
        </div>
      </div>
    </section>
  );
}
