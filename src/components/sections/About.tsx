"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Magnetic from "@/components/motion/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const aboutTitleLines = [
  "Mi enfoque constante:",
  "perfeccionar, estructurar",
  "y liderar el diseño del mañana.",
] as const;

const skills = [
  "Figma",
  "Webflow",
  "Zeplin",
  "Adobe",
  "Photoshop",
  "Illustrator",
] as const;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const lines = gsap.utils.toArray<HTMLElement>(".about-line");
      const tags = gsap.utils.toArray<HTMLElement>(".about-tag");

      if (!lines.length || !tags.length) return;

      gsap.set(lines, { y: "100%" });
      gsap.set(tags, { opacity: 0, y: 10 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      timeline.to(lines, {
        y: "0%",
        duration: 1.2,
        stagger: 0.06,
        ease: "power4.out",
      });

      timeline.to(
        tags,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: "power2.out",
        },
        "-=0.5",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:items-stretch lg:gap-x-8 lg:gap-y-0 xl:gap-x-12">
          <div className="order-1 lg:col-span-3 lg:row-start-1">
            <p className="type-eyebrow">Sobre mí</p>

            <h2 id="about-heading" className="type-section-title mt-6 max-w-sm">
              {aboutTitleLines.map((line) => (
                <span key={line} className="block overflow-hidden">
                  <span className="about-line block">{line}</span>
                </span>
              ))}
            </h2>
          </div>

          <div className="order-2 lg:col-span-5 lg:col-start-4 lg:row-span-2 lg:row-start-1">
            <div
              aria-label="Retrato del diseñador"
              className="aspect-[4/5] w-full rounded-lg bg-surface-subtle lg:aspect-auto lg:h-full lg:min-h-[640px]"
              role="img"
            />
          </div>

          <div className="order-3 flex flex-col justify-between gap-10 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:min-h-[640px]">
            <div
              aria-hidden="true"
              className="aspect-[16/10] w-full shrink-0 rounded-lg bg-surface-subtle sm:aspect-[5/3]"
            />

            <div className="flex flex-col gap-8 lg:mt-auto">
              <p className="type-body max-w-md">
                A lo largo de mi carrera, he consolidado mi experiencia liderando
                equipos de producto y escalando sistemas de diseño eficaces.
                Abordo cada proyecto conectando las necesidades reales de los
                usuarios con los objetivos estratégicos del negocio,
                transformando la complejidad en interfaces intuitivas y
                memorables.
              </p>

              <Magnetic>
                <a
                  href="#about"
                  className="type-link inline-block transition-colors duration-300 ease-out hover:text-primary"
                >
                  Conoce más sobre mi enfoque ↗
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="order-4 lg:col-span-3 lg:row-start-2 lg:self-end">
            <ul className="flex flex-wrap gap-2.5 sm:gap-3">
              {skills.map((skill) => (
                <li key={skill}>
                  <span className="about-tag type-tag inline-block rounded-full border px-4 py-2">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
