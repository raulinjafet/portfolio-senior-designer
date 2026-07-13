"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_START = "top 86%";
const SCROLL_START_PRIMARY = "top 92%";

type RevealOptions = {
  start?: string;
};

function revealElements(
  elements: Element[],
  from: gsap.TweenVars,
  to: gsap.TweenVars,
  options?: RevealOptions,
) {
  elements.forEach((element) => {
    gsap.set(element, from);
    gsap.to(element, {
      ...to,
      scrollTrigger: {
        trigger: element,
        start: options?.start ?? SCROLL_START,
        once: true,
      },
    });
  });
}

function getParallaxTargets(container: Element) {
  const phone = container.querySelector<HTMLElement>(".cs-claridad-loader-phone");
  if (phone) return [phone];

  return gsap.utils.toArray<HTMLElement>("img, video", container);
}

function applyMediaParallax(containers: Element[]) {
  containers.forEach((container) => {
    const targets = getParallaxTargets(container);
    if (!targets.length) return;

    targets.forEach((target) => {
      const overscale = target.classList.contains("cs-claridad-loader-phone")
        ? 1
        : 1.1;

      gsap.set(target, {
        scale: overscale,
        transformOrigin: "center center",
        force3D: true,
      });

      gsap.fromTo(
        target,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.65,
          },
        },
      );
    });
  });
}

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

      const animatedSelector =
        ".cs-animate-badge, .cs-animate-title, .cs-animate-text, .cs-animate-line, .cs-animate-media, .cs-animate-stagger-item";

      if (prefersReducedMotion) {
        gsap.set(root.querySelectorAll(animatedSelector), {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        gsap.set(root.querySelectorAll(".cs-animate-line"), { y: "0%" });
        gsap.set(
          root.querySelectorAll(
            ".cs-animate-media img, .cs-animate-media video, .cs-claridad-loader-phone",
          ),
          { yPercent: 0, scale: 1 },
        );
        return;
      }

      const badges = gsap.utils.toArray<Element>(".cs-animate-badge", root);
      const lines = gsap.utils.toArray<Element>(".cs-animate-line", root);
      const titles = gsap.utils.toArray<Element>(
        ".cs-animate-title:not(.type-case-lead)",
        root,
      );
      const texts = gsap.utils.toArray<Element>(
        ".cs-animate-text, .cs-animate-title.type-case-lead",
        root,
      );
      const media = gsap.utils.toArray<Element>(
        ".cs-animate-media:not(.cs-primary-block)",
        root,
      );
      const staggerItems = gsap.utils.toArray<Element>(
        ".cs-animate-stagger-item",
        root,
      );

      const primaryStart = (element: Element) =>
        element.closest(".cs-primary-wrap")
          ? SCROLL_START_PRIMARY
          : SCROLL_START;

      revealElements(
        badges,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
      );

      lines.forEach((line) => {
        gsap.set(line, { y: "100%" });
        gsap.to(line, {
          y: "0%",
          duration: 0.95,
          ease: "power4.out",
          scrollTrigger: {
            trigger: line,
            start: primaryStart(line),
            once: true,
          },
        });
      });

      titles.forEach((title) => {
        gsap.set(title, { opacity: 0, y: 28 });
        gsap.to(title, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: primaryStart(title),
            once: true,
          },
        });
      });

      texts.forEach((text) => {
        gsap.set(text, { opacity: 0, y: 18 });
        gsap.to(text, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: text,
            start: primaryStart(text),
            once: true,
          },
        });
      });

      staggerItems.forEach((item, index) => {
        gsap.set(item, { opacity: 0, y: 22 });
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay: Math.min(index * 0.05, 0.2),
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: primaryStart(item),
            once: true,
          },
        });
      });

      media.forEach((item) => {
        gsap.set(item, { opacity: 0, scale: 0.97, y: 20 });
        gsap.to(item, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: primaryStart(item),
            once: true,
          },
        });
      });

      applyMediaParallax(media);

      const refresh = () => ScrollTrigger.refresh();
      refresh();
      window.addEventListener("load", refresh, { once: true });
      window.addEventListener("resize", refresh);

      root.querySelectorAll("img, video").forEach((asset) => {
        if (asset instanceof HTMLImageElement && asset.complete) return;

        asset.addEventListener("load", refresh, { once: true });
        asset.addEventListener("loadedmetadata", refresh, { once: true });
        asset.addEventListener("error", refresh, { once: true });
      });

      return () => {
        window.removeEventListener("resize", refresh);
      };
    },
    { scope: pageRef },
  );
}
