"use client";

import gsap from "gsap";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

const OVERLAY_ID = "page-transition";
const COVER_DURATION = 0.7;
const REVEAL_DURATION = 0.85;
const EASE = "power3.inOut";

let initialTransitionDone = false;

function getOverlay() {
  return document.getElementById(OVERLAY_ID);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getInternalHref(anchor: HTMLAnchorElement, currentPath: string): string | null {
  const rawHref = anchor.getAttribute("href");
  if (!rawHref) return null;
  if (rawHref.startsWith("#")) return null;
  if (rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) return null;
  if (anchor.target === "_blank" || anchor.hasAttribute("download")) return null;

  let url: URL;
  try {
    url = new URL(rawHref, window.location.origin);
  } catch {
    return null;
  }

  if (url.origin !== window.location.origin) return null;

  const next = `${url.pathname}${url.search}${url.hash}`;
  const current = `${currentPath}${window.location.search}${window.location.hash}`;

  if (next === current) return null;
  if (url.pathname === currentPath && url.hash) return null;

  return next;
}

export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();

  const readyRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const pendingNavigationRef = useRef(false);
  const previousPathnameRef = useRef(pathname);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const killTween = () => {
    tweenRef.current?.kill();
    tweenRef.current = null;
  };

  const setPointerEvents = (enabled: boolean) => {
    const overlay = getOverlay();
    if (overlay) overlay.style.pointerEvents = enabled ? "auto" : "none";
  };

  const cover = (onComplete?: () => void) => {
    const overlay = getOverlay();
    if (!overlay || prefersReducedMotion()) {
      onComplete?.();
      return;
    }

    killTween();
    isAnimatingRef.current = true;
    setPointerEvents(true);

    tweenRef.current = gsap.fromTo(
      overlay,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: COVER_DURATION,
        ease: EASE,
        onComplete: () => {
          tweenRef.current = null;
          onComplete?.();
        },
      },
    );
  };

  const reveal = () => {
    const overlay = getOverlay();
    if (!overlay || prefersReducedMotion()) {
      isAnimatingRef.current = false;
      pendingNavigationRef.current = false;
      return;
    }

    killTween();
    setPointerEvents(true);

    tweenRef.current = gsap.to(overlay, {
      yPercent: -100,
      duration: REVEAL_DURATION,
      ease: EASE,
      onComplete: () => {
        gsap.set(overlay, { yPercent: 100 });
        setPointerEvents(false);
        isAnimatingRef.current = false;
        pendingNavigationRef.current = false;
        tweenRef.current = null;
      },
    });
  };

  useLayoutEffect(() => {
    const overlay = getOverlay();
    if (!overlay) return;

    if (prefersReducedMotion()) {
      gsap.set(overlay, { yPercent: 100 });
      overlay.style.pointerEvents = "none";
      readyRef.current = true;
      return;
    }

    if (initialTransitionDone) {
      gsap.set(overlay, { yPercent: 100 });
      overlay.style.pointerEvents = "none";
      readyRef.current = true;
      return;
    }

    gsap.set(overlay, { yPercent: 0 });
    overlay.style.pointerEvents = "auto";

    killTween();
    tweenRef.current = gsap.to(overlay, {
      yPercent: -100,
      duration: REVEAL_DURATION,
      ease: EASE,
      delay: 0.15,
      onComplete: () => {
        gsap.set(overlay, { yPercent: 100 });
        overlay.style.pointerEvents = "none";
        initialTransitionDone = true;
        readyRef.current = true;
        tweenRef.current = null;
      },
    });

    return killTween;
  }, []);

  useEffect(() => {
    if (!readyRef.current) return;
    if (prefersReducedMotion()) return;
    if (previousPathnameRef.current === pathname) return;

    previousPathnameRef.current = pathname;

    if (pendingNavigationRef.current) {
      requestAnimationFrame(() => reveal());
      return;
    }

    if (isAnimatingRef.current) return;

    cover(() => {
      requestAnimationFrame(() => reveal());
    });
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!readyRef.current || isAnimatingRef.current) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = getInternalHref(anchor, pathname);
      if (!href) return;

      event.preventDefault();
      event.stopImmediatePropagation();

      pendingNavigationRef.current = true;

      cover(() => {
        router.push(href);
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, router]);

  return null;
}
