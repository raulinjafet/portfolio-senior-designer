"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_START = "top 82%";

export function useCaseStudyScrollAnimations(
  pageRef: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const root = pageRef.current;
      if (!root) return;

      const heroItems = gsap.utils.toArray<HTMLElement>(".cs-hero-item");
      const heroMedia = gsap.utils.toArray<HTMLElement>(".cs-hero-media");

      if (heroItems.length) {
        gsap.set(heroItems, { opacity: 0, y: 24 });
        gsap.to(heroItems, {
          opacity: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.09,
          ease: "power3.out",
          delay: 0.12,
        });
      }

      const heroLines = gsap.utils.toArray<HTMLElement>(".cs-hero-line");
      if (heroLines.length) {
        gsap.set(heroLines, { y: "100%" });
        gsap.to(heroLines, {
          y: "0%",
          duration: 1,
          ease: "power4.out",
          delay: 0.22,
        });
      }

      if (heroMedia.length) {
        gsap.set(heroMedia, { opacity: 0, scale: 0.94, y: 32 });
        gsap.to(heroMedia, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.05,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.28,
        });
      }

      const sections = gsap.utils.toArray<HTMLElement>(".cs-section");

      sections.forEach((section) => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: SCROLL_START,
            once: true,
          },
        });

        const badge = section.querySelector(".cs-animate-badge");
        const lines = section.querySelectorAll(".cs-animate-line");
        const titles = section.querySelectorAll(".cs-animate-title");
        const texts = section.querySelectorAll(".cs-animate-text");
        const media = section.querySelectorAll(".cs-animate-media");
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
    },
    { scope: pageRef },
  );
}
