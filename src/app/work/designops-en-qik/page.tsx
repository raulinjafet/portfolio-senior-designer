import type { Metadata } from "next";
import DesignOpsEnQikCaseStudy from "@/components/case-study/designops-en-qik/DesignOpsEnQikCaseStudy";

export const metadata: Metadata = {
  title: "DesignOps en Qik. — Raulyn Ladera",
  description:
    "Caso de estudio sobre la estructura y procesos de DesignOps en Qik Banco Digital: gobernanza en Figma, naming conventions y escalabilidad del equipo de diseño.",
};

export default function DesignOpsEnQikPage() {
  return <DesignOpsEnQikCaseStudy />;
}
