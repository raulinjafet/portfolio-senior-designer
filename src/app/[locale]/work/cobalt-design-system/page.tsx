import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CobaltDesignSystemCaseStudy from "@/components/case-study/cobalt-design-system/CobaltDesignSystemCaseStudy";
import { buildPageMetadata } from "@/i18n/metadata";
import { routing, type AppLocale } from "@/i18n/routing";

const PATHNAME = "/work/cobalt-design-system";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudies.cobalt.metadata" });

  return buildPageMetadata({
    locale,
    pathname: PATHNAME,
    title: t("title"),
    description: t("description"),
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CobaltDesignSystemPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);

  return <CobaltDesignSystemCaseStudy />;
}
