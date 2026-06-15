"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_START = "top 82%";
const SCROLL_START_PRIMARY = "top 92%";

export function useCaseStudyScrollAnimations(
  pageRef: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const root = pageRef.current;
      if (!root) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const sections = gsap.utils.toArray<HTMLElement>(".cs-section", root);

      if (prefersReducedMotion) {
        sections.forEach((section) => {
          gsap.set(section.querySelectorAll(".cs-animate-badge, .cs-animate-title, .cs-animate-text, .cs-animate-media, .cs-animate-stagger-item"), {
            opacity: 1,
            y: 0,
            scale: 1,
          });
          gsap.set(section.querySelectorAll(".cs-animate-line"), { y: "0%" });
        });
        return;
      }

      sections.forEach((section) => {
        const isPrimarySection = section.classList.contains("cs-primary-wrap");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: isPrimarySection ? SCROLL_START_PRIMARY : SCROLL_START,
            once: true,
          },
        });

        const badge = section.querySelector(".cs-animate-badge");
        const lines = section.querySelectorAll(".cs-animate-line");
        const titles = section.querySelectorAll(".cs-animate-title");
        const texts = section.querySelectorAll(".cs-animate-text");
        const media = section.querySelectorAll(
          ".cs-animate-media:not(.cs-primary-block)",
        );
        const staggerItems = section.querySelectorAll(
          ".cs-animate-stagger-item",
        );

        if (badge) {
          gsap.set(badge, { opacity: 0, y: 14 });
          timeline.to(badge, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
          });
        }

        if (lines.length) {
          gsap.set(lines, { y: "100%" });
          timeline.to(
            lines,
            {
              y: "0%",
              duration: 0.95,
              stagger: 0.05,
              ease: "power4.out",
            },
            badge ? "-=0.45" : 0,
          );
        }

        if (titles.length) {
          gsap.set(titles, { opacity: 0, y: 28 });
          timeline.to(
            titles,
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.07,
              ease: "power3.out",
            },
            lines.length || badge ? "-=0.55" : 0,
          );
        }

        if (texts.length) {
          gsap.set(texts, { opacity: 0, y: 18 });
          timeline.to(
            texts,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.07,
              ease: "power2.out",
            },
            "-=0.65",
          );
        }

        if (staggerItems.length) {
          gsap.set(staggerItems, { opacity: 0, y: 22 });
          timeline.to(
            staggerItems,
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.09,
              ease: "power3.out",
            },
            "-=0.55",
          );
        }

        if (media.length) {
          gsap.set(media, { opacity: 0, scale: 0.97, y: 20 });
          timeline.to(
            media,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1,
              stagger: 0.1,
              ease: "power3.out",
            },
            "-=0.75",
          );
        }
      });

      const refresh = () => ScrollTrigger.refresh();
      refresh();
      window.addEventListener("load", refresh, { once: true });
      window.addEventListener("resize", refresh);

      return () => {
        window.removeEventListener("resize", refresh);
      };
    },
    { scope: pageRef },
  );
}
