import type { Metadata } from "next";
import { routing } from "./routing";

export const SITE_URL = "https://raulynladera.vercel.app";

function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") return "";
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function getLocalizedUrl(locale: string, pathname = ""): string {
  const path = normalizePathname(pathname);
  return `${SITE_URL}/${locale}${path}`;
}

export function getLocaleAlternates(
  locale: string,
  pathname = "",
): NonNullable<Metadata["alternates"]> {
  const path = normalizePathname(pathname);

  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, `${SITE_URL}/${loc}${path}`]),
  ) as Record<string, string>;

  languages["x-default"] = `${SITE_URL}/${routing.defaultLocale}${path}`;

  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages,
  };
}

type PageMetadataOptions = {
  locale: string;
  pathname?: string;
  title: string;
  description: string;
};

export function buildPageMetadata({
  locale,
  pathname = "",
  title,
  description,
}: PageMetadataOptions): Metadata {
  const url = getLocalizedUrl(locale, pathname);

  return {
    title,
    description,
    alternates: getLocaleAlternates(locale, pathname),
    openGraph: {
      title,
      description,
      url,
      locale: locale === "es" ? "es_DO" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_DO"],
      type: "website",
    },
  };
}
