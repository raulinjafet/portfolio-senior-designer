import type { Metadata } from "next";
import DesignOpsEnQikCaseStudy from "@/components/case-study/designops-en-qik/DesignOpsEnQikCaseStudy";

export const metadata: Metadata = {
  title: "Optimización de la arquitectura de Figma — Raulyn Ladera",
  description:
    "Caso de estudio sobre DesignOps en Qik: reorganización de Figma, handoff técnico estandarizado y arquitectura adoptada por todo el equipo de diseño.",
};

export default function DesignOpsEnQikPage() {
  return <DesignOpsEnQikCaseStudy />;
}
