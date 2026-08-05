import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import DesignOpsEnQikCaseStudy from "@/components/case-study/designops-en-qik/DesignOpsEnQikCaseStudy";
import { routing, type AppLocale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudies.designops.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function DesignOpsEnQikPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);

  return <DesignOpsEnQikCaseStudy />;
}
