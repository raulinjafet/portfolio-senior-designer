"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lenisEasing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: lenisEasing,
      orientation: "vertical",
      smoothWheel: true,
    });

    let lastScroll = 0;

    lenis.on("scroll", (instance: Lenis) => {
      ScrollTrigger.update();

      const scroll = instance.scroll;
      const direction =
        scroll > lastScroll ? 1 : scroll < lastScroll ? -1 : 0;
      lastScroll = scroll;

      document.dispatchEvent(
        new CustomEvent("app:scroll", {
          detail: { scroll, direction },
        }),
      );
    });

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
