import type { Metadata } from "next";
import DisenarClaridadCaseStudy from "@/components/case-study/disenar-claridad/DisenarClaridadCaseStudy";

export const metadata: Metadata = {
  title: "Diseñar claridad desde cero. — Raulyn Ladera",
  description:
    "Caso de estudio sobre la definición del look & feel de la App Qik Banco Digital: identidad visual, UI Kit y experiencia bancaria accesible.",
};

export default function DisenarClaridadPage() {
  return <DisenarClaridadCaseStudy />;
}
