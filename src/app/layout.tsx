import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import CursorShell from "@/components/common/CursorShell";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import PageTransition from "@/components/motion/PageTransition";
import SmoothScroll from "@/components/common/SmoothScroll";
import "@/styles/globals.css";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-red-hat-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://raulynladera.vercel.app"),
  title: "Raulyn Ladera — Senior Product Designer",
  description:
    "Diseño de productos digitales donde la estética excepcional, la usabilidad científica y el rendimiento técnico funcionan en perfecta sincronía.",
  openGraph: {
    title: "Raulyn Ladera — Senior Product Designer",
    description:
      "Diseño de productos digitales donde la estética excepcional, la usabilidad científica y el rendimiento técnico funcionan en perfecta sincronía.",
    url: "https://raulynladera.vercel.app/",
    siteName: "Raulyn Ladera Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Raulyn Ladera — Senior Product Designer",
      },
    ],
    locale: "es_DO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${redHatDisplay.variable} h-full`} data-theme="light">
      <body
        className={`${redHatDisplay.className} flex min-h-screen flex-col bg-background text-foreground antialiased`}
      >
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
      </body>
    </html>
  );
}
