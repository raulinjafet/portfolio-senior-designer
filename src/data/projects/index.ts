export type ProjectAccent = "primary" | "secondary" | "accent";

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  accent: ProjectAccent;
  image: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    id: "01",
    slug: "disenar-claridad-desde-cero",
    title: "Diseñar claridad desde cero.",
    category: "Producto · Identidad · Sistemas",
    year: "2026",
    accent: "primary",
    image: "/projects/design-system.jpg",
    imageAlt: "Interfaz de design system con componentes UI y tokens de color",
  },
  {
    id: "02",
    slug: "cobalt-design-system",
    title: "Cobalt Design System.",
    category: "Sistema · Escalabilidad",
    year: "2026",
    accent: "secondary",
    image: "/projects/digital-banking.jpg",
    imageAlt: "Sistema de diseño Cobalt con componentes escalables",
  },
  {
    id: "03",
    slug: "designops-en-qik",
    title: "DesignOps en Qik.",
    category: "Diseño · Operación · Procesos",
    year: "2025",
    accent: "accent",
    image: "/projects/designops.jpg",
    imageAlt: "Equipo de diseño colaborando en un flujo de trabajo DesignOps en Qik",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
