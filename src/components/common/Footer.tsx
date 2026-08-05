import { getTranslations } from "next-intl/server";
import Magnetic from "@/components/motion/Magnetic";
import RaulynLogotype from "@/components/common/RaulynLogotype";
import { Link } from "@/i18n/navigation";

const EMAIL = "raulin534@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/raulyn-ladera/";

const footerLinkClassName =
  "type-footer-link inline-block transition-colors duration-300 ease-out hover:text-primary";

export default async function Footer() {
  const t = await getTranslations("footer");

  const footerNavLinks = [
    { label: t("nav.home"), href: "/" as const },
    { label: t("nav.projects"), href: "/#work" as const },
    { label: t("nav.cv"), href: "/cv.pdf", external: true as const },
    { label: t("nav.linkedin"), href: LINKEDIN_URL, external: true as const },
    { label: t("nav.contact"), href: `mailto:${EMAIL}` },
  ];

  return (
    <footer className="bg-elevated text-on-inverse">
      <div className="footer-inner mx-auto w-full max-w-[var(--container-max)]">
        <div className="footer-top">
          <Link href="/" className="inline-flex shrink-0" aria-label={t("homeAria")}>
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

        <p className="type-footer-meta text-center">{t("copyright")}</p>
      </div>
    </footer>
  );
}
