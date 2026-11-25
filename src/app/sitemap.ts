import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getLocalizedUrl, SITE_URL } from "@/i18n/metadata";
import { locales } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", ...projects.map((p) => `/work/${p.slug}`)];

  return locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: path === "/" ? getLocalizedUrl(locale) : `${SITE_URL}/${locale}${path}`,
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : 0.7,
    })),
  );
}