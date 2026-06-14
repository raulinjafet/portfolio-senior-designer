"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Magnetic from "@/components/motion/Magnetic";

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const content = contentRef.current;
      if (!section || !content) return;

      gsap.fromTo(
        content,
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-hero py-32 text-on-hero lg:py-48"
      aria-labelledby="contact-heading"
    >
      <div
        ref={contentRef}
        className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
      >
        <p className="type-cta-eyebrow">¿Hacemos algo juntos?</p>

        <h2 id="contact-heading" className="type-cta-title mt-6 mb-12 max-w-3xl">
          Lidero el diseño, estructuro sistemas y potencio tu producto digital.
        </h2>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
          <Magnetic>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="type-cta-link type-cta-button"
            >
              Descargar CV
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href="mailto:raulin534@gmail.com"
              className="type-cta-link inline-block transition-colors duration-300 hover:text-primary"
            >
              Contáctarme
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
