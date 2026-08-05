import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CobaltDesignSystemCaseStudy from "@/components/case-study/cobalt-design-system/CobaltDesignSystemCaseStudy";
import { routing, type AppLocale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudies.cobalt.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CobaltDesignSystemPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);

  return <CobaltDesignSystemCaseStudy />;
}
