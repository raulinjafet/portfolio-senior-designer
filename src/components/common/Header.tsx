"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import avatarImage from "@/assets/raulyn-avatar.png";
import Magnetic from "@/components/motion/Magnetic";

const EMAIL = "raulin534@gmail.com";
const SCROLL_TOP_THRESHOLD = 20;

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Proyectos", href: "/#work" },
  { label: "CV", href: "/cv.pdf", external: true },
] as const;

const navLinkClassName =
  "type-nav inline-block transition-colors duration-300 ease-out hover:text-primary";

type AppScrollDetail = {
  scroll: number;
  direction: number;
};

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [showGlass, setShowGlass] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateHeader = (scroll: number, direction: number) => {
      if (scroll <= SCROLL_TOP_THRESHOLD) {
        setIsVisible(true);
        setShowGlass(false);
        return;
      }

      if (direction > 0) {
        setIsVisible(false);
        return;
      }

      if (direction < 0) {
        setIsVisible(true);
        setShowGlass(true);
      }
    };

    const onAppScroll = (event: Event) => {
      const { scroll, direction } = (event as CustomEvent<AppScrollDetail>).detail;
      lastScrollY.current = scroll;
      updateHeader(scroll, direction);
    };

    const onWindowScroll = () => {
      const scroll = window.scrollY;
      const direction =
        scroll > lastScrollY.current ? 1 : scroll < lastScrollY.current ? -1 : 0;
      lastScrollY.current = scroll;
      updateHeader(scroll, direction);
    };

    document.addEventListener("app:scroll", onAppScroll);
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    onWindowScroll();

    return () => {
      document.removeEventListener("app:scroll", onAppScroll);
      window.removeEventListener("scroll", onWindowScroll);
    };
  }, []);

  return (
    <header
      className={`header-shell fixed inset-x-0 top-0 z-50 w-full ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className={`transition-[background-color,backdrop-filter,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          showGlass ? "liquid-glass-nav" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3 lg:px-8">
          <Link
            href="/"
            className="inline-flex min-w-0 items-center gap-3 sm:gap-4"
            aria-label="Raulyn Ladera — Inicio"
          >
            <img
              src={avatarImage.src}
              alt="Raulyn Ladera"
              width={40}
              height={40}
              decoding="async"
              className="relative z-10 block h-10 w-10 shrink-0 rounded-full border-[1.5px] border-avatar-border object-cover object-[center_18%]"
              style={{ boxShadow: "var(--shadow-avatar)" }}
            />
            <span className="type-nav-label truncate">Soy, Raulyn Ladera. 🇻🇪</span>
          </Link>

          <div className="flex shrink-0 items-center gap-5 sm:gap-6 lg:gap-8">
            <ul className="flex items-center gap-5 sm:gap-6 lg:gap-8">
              {navLinks.map((item) => (
                <li
                  key={item.label}
                  className={item.label === "Proyectos" ? "hidden sm:list-item" : undefined}
                >
                  <Magnetic>
                    {"external" in item && item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={navLinkClassName}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className={navLinkClassName}>
                        {item.label}
                      </Link>
                    )}
                  </Magnetic>
                </li>
              ))}
            </ul>

            <Magnetic>
              <a
                href={`mailto:${EMAIL}`}
                className="type-nav inline-block rounded-full border border-foreground px-4 py-2.5 transition-colors duration-300 ease-out hover:border-primary hover:bg-primary sm:px-5 sm:py-2.5"
              >
                Contáctame
              </a>
            </Magnetic>
          </div>
        </div>
      </nav>
    </header>
  );
}
