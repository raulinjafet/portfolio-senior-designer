"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const aboutTitleLines = [
  { text: "Mi enfoque constante:", accent: true },
  { text: "perfeccionar, estructurar", accent: false },
  { text: "y liderar el diseño del mañana.", accent: false },
] as const;

const skills = [
  "Product Design",
  "Adobe siute",
  "Design System",
  "Visual Design",
  "Leadership",
  "Figma",
] as const;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const lines = gsap.utils.toArray<HTMLElement>(".about-line");
      const tags = gsap.utils.toArray<HTMLElement>(".about-tag");
      const media = gsap.utils.toArray<HTMLElement>(".about-media");

      if (!lines.length) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([...lines, ...tags, ...media], { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(lines, { y: "100%" });
      gsap.set(tags, { opacity: 0, y: 10 });
      gsap.set(media, { opacity: 0, scale: 0.96, y: 24 });

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
        media,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.85",
      );

      timeline.to(
        tags,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: "power2.out",
        },
        "-=0.55",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding"
      aria-labelledby="about-heading"
    >
      <div className="container-site">
        <div className="about-grid">
          <div className="about-left">
            <div className="about-copy">
              <p className="type-eyebrow">Sobre mí</p>

              <h2 id="about-heading" className="type-about-title mt-6">
                {aboutTitleLines.map(({ text, accent }) => (
                  <span key={text} className="about-line-wrap">
                    <span
                      className={`about-line block ${
                        accent ? "about-title-accent" : "about-title-default"
                      }`}
                    >
                      {text}
                    </span>
                  </span>
                ))}
              </h2>
            </div>

            <ul className="about-tags about-tags-list">
              {skills.map((skill) => (
                <li key={skill}>
                  <span className="about-tag">{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-portrait-wrap about-media">
            <Image
              src="/home/about-portrait.jpg"
              alt="Raulyn Ladera trabajando en un espacio al aire libre"
              fill
              className="about-portrait-img"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
          </div>

          <div className="about-side">
            <div className="about-team-wrap about-media">
              <Image
                src="/home/about-team.jpg"
                alt="Equipo de diseño en Qik"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 373px"
              />
            </div>

            <p className="about-bio about-media">
              A lo largo de mi carrera, he consolidado mi experiencia liderando
              equipos de producto y escalando sistemas de diseño eficaces. Abordo
              cada proyecto conectando las necesidades reales de los usuarios con
              los objetivos estratégicos del negocio, transformando la complejidad
              en interfaces intuitivas y memorables.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
