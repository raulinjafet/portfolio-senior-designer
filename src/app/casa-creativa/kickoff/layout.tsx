import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/casa-creativa-kickoff.css";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-red-hat-display",
});

export const metadata: Metadata = {
  title: "Brief de Kickoff · Casa Creativa",
  description:
    "Cuestionario privado de branding y desarrollo web para clientes de Casa Creativa.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: {
    title: "Brief de Kickoff · Casa Creativa",
    description: "Formulario privado — no indexado.",
  },
  alternates: {
    canonical: undefined,
  },
};

type KickoffLayoutProps = {
  children: React.ReactNode;
};

export default function CasaCreativaKickoffLayout({ children }: KickoffLayoutProps) {
  return (
    <html lang="es" className={`${redHatDisplay.variable} h-full`}>
      <body className={`${redHatDisplay.className} cc-kickoff-page antialiased`}>{children}</body>
    </html>
  );
}