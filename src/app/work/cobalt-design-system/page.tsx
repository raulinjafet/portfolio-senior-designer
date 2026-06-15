import type { Metadata } from "next";
import CobaltDesignSystemCaseStudy from "@/components/case-study/cobalt-design-system/CobaltDesignSystemCaseStudy";

export const metadata: Metadata = {
  title: "Cobalt Design System. — Raulyn Ladera",
  description:
    "Caso de estudio sobre el diseño y documentación de Cobalt: un sistema basado en design tokens y atomic design para escalar Qik Banco Digital.",
};

export default function CobaltDesignSystemPage() {
  return <CobaltDesignSystemCaseStudy />;
}
