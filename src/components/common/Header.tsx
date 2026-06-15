"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import avatarImage from "@/assets/raulyn-avatar.png";
import HeaderMenuIcon from "@/components/common/HeaderMenuIcon";
import Magnetic from "@/components/motion/Magnetic";

const EMAIL = "raulin534@gmail.com";
const SCROLL_TOP_THRESHOLD = 20;

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Proyectos", href: "/#work" },
  { label: "CV", href: "/cv.pdf", external: true },
] as const;

const mobileNavLinks = [...navLinks, { label: "Contáctame", href: `mailto:${EMAIL}` }] as const;

type AppScrollDetail = {
  scroll: number;
  direction: number;
};

type HeaderTheme = "default" | "inverse";

function getHeaderTheme(): HeaderTheme {
  if (typeof document === "undefined") return "default";

  const headerHeight =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-height"),
    ) || 72;

  const zones = document.querySelectorAll<HTMLElement>("[data-header-inverse]");
  for (const zone of zones) {
    const rect = zone.getBoundingClientRect();
    if (rect.top < headerHeight && rect.bottom > 0) {
      return "inverse";
    }
  }

  return "default";
}

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [showGlass, setShowGlass] = useState(false);
  const [headerTheme, setHeaderTheme] = useState<HeaderTheme>("default");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const syncHeaderTheme = useCallback(() => {
    setHeaderTheme(getHeaderTheme());
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const updateHeader = (scroll: number, direction: number) => {
      if (scroll <= SCROLL_TOP_THRESHOLD) {
        setIsVisible(true);
        setShowGlass(false);
        syncHeaderTheme();
        return;
      }

      if (direction > 0) {
        setIsVisible(false);
        closeMenu();
        return;
      }

      if (direction < 0) {
        setIsVisible(true);
        setShowGlass(true);
      }

      syncHeaderTheme();
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

    const onResize = () => {
      syncHeaderTheme();
      if (window.innerWidth >= 768) closeMenu();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("app:scroll", onAppScroll);
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    onWindowScroll();

    const observer = new MutationObserver(syncHeaderTheme);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("app:scroll", onAppScroll);
      window.removeEventListener("scroll", onWindowScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      observer.disconnect();
    };
  }, [syncHeaderTheme, closeMenu]);

  const navLinkClassName =
    "type-header-nav header-nav-link inline-block transition-colors duration-300 ease-out hover:text-primary";

  const mobileNavLinkClassName = "header-mobile-link";

  return (
    <header
      data-header-theme={headerTheme}
      data-menu-open={menuOpen ? "" : undefined}
      className={`header-shell fixed inset-x-0 top-0 z-50 w-full ${
        isVisible || menuOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="header-bar">
        <nav
          aria-label="Main navigation"
          className={`transition-[background-color,backdrop-filter,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            showGlass && !menuOpen ? "liquid-glass-nav" : menuOpen ? "header-bar--overlay" : "bg-transparent"
          }`}
        >
          <div className="header-inner">
            <Link
              href="/"
              className="header-brand inline-flex min-w-0 items-center"
              aria-label="Raulyn Ladera — Inicio"
              onClick={closeMenu}
            >
              <img
                src={avatarImage.src}
                alt="Raulyn Ladera"
                width={44}
                height={44}
                decoding="async"
                className="header-avatar relative z-10 block shrink-0 rounded-full border-solid object-cover object-[center_18%]"
              />
              <span className="type-header-brand truncate">Soy, Raulyn Ladera. 🇻🇪</span>
            </Link>

            <div className="header-nav-desktop">
              <ul className="flex items-center gap-nav">
                {navLinks.map((item) => (
                  <li key={item.label}>
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
                <a href={`mailto:${EMAIL}`} className="btn btn-secondary-sm">
                  Contáctame
                </a>
              </Magnetic>
            </div>

            <button
              type="button"
              className="header-menu-btn"
              aria-expanded={menuOpen}
              aria-controls="header-mobile-menu"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <HeaderMenuIcon open={menuOpen} />
            </button>
          </div>
        </nav>
      </div>

      {mounted &&
        createPortal(
          <div
            id="header-mobile-menu"
            className={`header-mobile-menu ${menuOpen ? "is-open" : ""}`}
            aria-hidden={!menuOpen}
          >
            <nav aria-label="Mobile navigation" className="header-mobile-nav">
              <ul className="header-mobile-list">
                {mobileNavLinks.map((item) => (
                  <li key={item.label}>
                    {"external" in item && item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={mobileNavLinkClassName}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </a>
                    ) : item.href.startsWith("mailto:") ? (
                      <a
                        href={item.href}
                        className={mobileNavLinkClassName}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className={mobileNavLinkClassName}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>,
          document.body,
        )}
    </header>
  );
}
