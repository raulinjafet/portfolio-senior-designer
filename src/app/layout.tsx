import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import CursorShell from "@/components/common/CursorShell";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import SmoothScroll from "@/components/common/SmoothScroll";
import "@/styles/globals.css";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-red-hat-display",
});

export const metadata: Metadata = {
  title: "Raulyn Ladera — Product Designer",
  description: "Portfolio of a growth-driven product designer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${redHatDisplay.variable} h-full`}>
      <body
        className={`${redHatDisplay.className} flex min-h-screen flex-col bg-background text-foreground antialiased`}
      >
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
