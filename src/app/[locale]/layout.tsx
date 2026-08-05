import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import CursorShell from "@/components/common/CursorShell";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import PageTransition from "@/components/motion/PageTransition";
import SmoothScroll from "@/components/common/SmoothScroll";
import { routing, type AppLocale } from "@/i18n/routing";
import "@/styles/globals.css";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-red-hat-display",
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL("https://raulynladera.vercel.app"),
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://raulynladera.vercel.app/${locale}`,
      siteName: t("siteName"),
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t("ogAlt"),
        },
      ],
      locale: locale === "es" ? "es_DO" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${redHatDisplay.variable} h-full`} data-theme="light">
      <body
        className={`${redHatDisplay.className} flex min-h-screen flex-col bg-background text-foreground antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <div
            id="page-transition"
            className="page-transition"
            aria-hidden="true"
            data-layer="color-layer-02"
          />
          <PageTransition />
          <SmoothScroll>
            <CursorShell>
              <Header />
              <main className="flex min-h-screen flex-1 flex-col">{children}</main>
              <Footer />
            </CursorShell>
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
