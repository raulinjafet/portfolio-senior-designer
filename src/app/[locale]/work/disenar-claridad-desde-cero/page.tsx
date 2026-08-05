import type { Metadata } from "next";
import DisenarClaridadCaseStudy from "@/components/case-study/disenar-claridad/DisenarClaridadCaseStudy";

export const metadata: Metadata = {
  title: "Transformando identidad visual — Raulyn Ladera",
  description:
    "Caso de estudio sobre la definición del look & feel de la App Qik Banco Digital: identidad visual, principios de diseño y experiencia bancaria accesible.",
};

export default function DisenarClaridadPage() {
  return <DisenarClaridadCaseStudy />;
}
