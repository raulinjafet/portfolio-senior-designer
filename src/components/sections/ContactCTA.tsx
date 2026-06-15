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
      data-header-inverse
      className="section-padding bg-hero text-on-hero"
      aria-labelledby="contact-heading"
    >
      <div ref={contentRef} className="container-site-cta contact-cta-inner">
        <p className="type-cta-eyebrow">¿Hacemos algo juntos?</p>

        <h2 id="contact-heading" className="type-cta-title contact-cta-title">
          Lidero el diseño, estructuro sistemas y potencio tu producto digital.
        </h2>

        <div className="contact-cta-actions">
          <Magnetic>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary-lg"
            >
              Descargar CV
            </a>
          </Magnetic>

          <Magnetic>
            <a href="mailto:raulin534@gmail.com" className="btn btn-tertiary-lg">
              Contáctame
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
