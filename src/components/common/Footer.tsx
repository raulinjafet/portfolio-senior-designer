import Link from "next/link";
import Magnetic from "@/components/motion/Magnetic";
import RaulynLogotype from "@/components/common/RaulynLogotype";

const EMAIL = "raulin534@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/raulyn-ladera/";

const footerNavLinks = [
  { label: "Inicio", href: "/" },
  { label: "Proyectos", href: "/#work" },
  { label: "CV", href: "/cv.pdf", external: true },
  { label: "Linkedin", href: LINKEDIN_URL, external: true },
  { label: "Contáctame", href: `mailto:${EMAIL}` },
] as const;

const footerLinkClassName =
  "type-footer-link inline-block transition-colors duration-300 ease-out hover:text-primary";

export default function Footer() {
  return (
    <footer className="bg-inverse text-on-inverse">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-14 sm:px-8 lg:px-20 lg:py-[4.5rem]">
        <div className="flex w-full flex-col gap-8 border-b border-inverse-border pb-8 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="inline-flex shrink-0" aria-label="Raulyn Ladera — Inicio">
            <RaulynLogotype className="h-10 w-auto sm:h-12" />
          </Link>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:gap-x-[4.5rem]">
              {footerNavLinks.map(({ label, href, ...rest }) => (
                <li key={label}>
                  <Magnetic>
                    {"external" in rest && rest.external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={footerLinkClassName}
                      >
                        {label}
                      </a>
                    ) : href.startsWith("mailto:") ? (
                      <a href={href} className={footerLinkClassName}>
                        {label}
                      </a>
                    ) : (
                      <Link href={href} className={footerLinkClassName}>
                        {label}
                      </Link>
                    )}
                  </Magnetic>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="type-footer-meta text-center">© 2026 – Raulyn Ladera</p>
      </div>
    </footer>
  );
}
