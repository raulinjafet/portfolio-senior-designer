import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import DisenarClaridadCaseStudy from "@/components/case-study/disenar-claridad/DisenarClaridadCaseStudy";
import { routing, type AppLocale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudies.claridad.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function DisenarClaridadPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);

  return <DisenarClaridadCaseStudy />;
}
