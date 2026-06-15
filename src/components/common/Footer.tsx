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
    <footer className="bg-elevated text-on-inverse">
      <div className="footer-inner mx-auto w-full max-w-[var(--container-max)]">
        <div className="footer-top">
          <Link href="/" className="inline-flex shrink-0" aria-label="Raulyn Ladera — Inicio">
            <RaulynLogotype className="footer-logo w-auto" />
          </Link>

          <nav aria-label="Footer navigation">
            <ul className="footer-nav-list">
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
