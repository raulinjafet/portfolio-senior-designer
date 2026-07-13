"use client";

import Image from "next/image";
import { useRef } from "react";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyNextMarquee from "@/components/case-study/CaseStudyNextMarquee";
import CaseStudyVideo from "@/components/case-study/CaseStudyVideo";
import { useCaseStudyScrollAnimations } from "@/components/case-study/useCaseStudyScrollAnimations";

const ASSET_BASE = "/case-studies/designops-en-qik";

const challengeParagraphs = [
  "Nuestro Figma estaba organizado por squads (Cafeína Team, Dulcito de Coco, Feeling Box...), pero el producto había crecido y los diseñadores colaboraban constantemente entre squads distintos.",
  "El resultado: historias de usuario documentadas en archivos que no correspondían. Una historia del squad de Cafeína Team terminó en el archivo de otro squad, simplemente porque quien la ejecutó pertenecía a un equipo distinto — y encontrarla después se volvió tedioso.",
  "Esto no era solo desorden: nos restaba velocidad y descubribilidad en el día a día de todo el equipo de diseño.",
] as const;

const summaryCards = [
  { label: "Rol", value: "Design Ops Lead", accent: true },
  { label: "Herramientas", value: "Figma · Jira", accent: false },
  { label: "Duración", value: "3 meses", accent: false },
  { label: "Equipos involucrados", value: "Diseño · Desarrollo · Product Owner", accent: false },
  { label: "Alcance", value: "Reorganización completa de Qik en Figma", accent: false },
  {
    label: "Resultado clave",
    value: "Estructura estandarizada, adoptada por todo el equipo de diseño",
    accent: true,
  },
] as const;

const structureItems = [
  "Organización — todos los colaboradores invitados; diseñadores con permisos de edición, el resto con permisos de solo vista.",
  "Equipos — agrupados por función real: Productos, Handover, Marketing, Design System, DesignOps y Vendors.",
  "Proyectos — un espacio por cada producto, funcionalidad core o colaboración externa.",
  "Archivos — los flujos específicos de cada producto o funcionalidad, con nomenclatura basada en siglas de equipo y feature.",
  "Páginas — cada archivo dividido en UI Team, UX Team e Información del archivo (handover, cover).",
] as const;

const impactItems = [
  "Menos tiempo perdido buscando archivos o flujos mal ubicados.",
  "Rituales claros de colaboración con desarrollo: planning, refinamiento y evidencia centralizada en RFD y Jira.",
  "Handover estandarizado — cualquier diseñador puede tomar un archivo y entender su estado.",
  "Una base que se prueba, se itera y se ajusta con feedback real del equipo, no una regla fija.",
] as const;

export default function DesignOpsEnQikCaseStudy() {
  const pageRef = useRef<HTMLElement>(null);
  useCaseStudyScrollAnimations(pageRef);

  return (
    <article ref={pageRef} className="cs-article cs-designops">
      <CaseStudyHero
        badge="DesignOps · Workflow"
        title="Optimización de la arquitectura de Figma y del handoff técnico del equipo."
        align="center"
        showBack={false}
        showLead={false}
      />

      <section className="cs-section cs-designops-hero-media" aria-hidden="true">
        <div className="cs-animate-media cs-designops-hero-media-frame">
          <CaseStudyVideo
            src={`${ASSET_BASE}/hero-figma-org.mp4`}
            type="video/mp4"
          />
        </div>
      </section>

      <section className="cs-section cs-designops-section cs-designops-section--compact-top">
        <div className="cs-designops-inner cs-designops-editorial">
          <p className="cs-animate-badge cs-designops-label">El desafío</p>
          <div className="cs-designops-copy-stack">
            {challengeParagraphs.map((paragraph) => (
              <p key={paragraph} className="cs-animate-text cs-designops-copy-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-section cs-designops-section">
        <div className="cs-designops-inner">
          <h2 className="cs-animate-title cs-designops-page-title pb-8">
            Resumen del proyecto.
          </h2>
          <div className="cs-designops-summary-grid">
            {summaryCards.map(({ label, value, accent }) => (
              <div
                key={label}
                className={`cs-animate-stagger-item cs-designops-summary-card${
                  accent ? " cs-designops-summary-card--mint" : ""
                }`}
              >
                <p className="cs-designops-summary-label">{label}</p>
                <p className="cs-designops-summary-value">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-section cs-designops-section">
        <div className="cs-designops-inner">
          <div className="cs-designops-section-heading">
            <h2 className="cs-animate-title cs-designops-page-title">
              Estructurar para nuestra realidad.
            </h2>
          </div>

          <div className="cs-designops-editorial">
            <p className="cs-animate-badge cs-designops-label">Sistema estructural</p>
            <div className="cs-designops-copy-stack">
              <p className="cs-animate-title cs-designops-copy-lg">
                Propusimos una arquitectura de cinco niveles, adaptada a la realidad de
                Qik:
              </p>
              <ul className="cs-designops-dot-list">
                {structureItems.map((item) => (
                  <li key={item} className="cs-animate-stagger-item cs-designops-dot-item">
                    <span className="cs-designops-dot" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="cs-animate-text cs-designops-copy-lg pt-2">
                No existe una única forma &quot;correcta&quot; de estructurar Figma — la
                clave fue adaptar la arquitectura recomendada a cómo Qik realmente
                trabaja.
              </p>
            </div>
          </div>

          <div className="cs-designops-principles-grid">
            <div>
              <div className="cs-animate-media cs-designops-principles-media cs-designops-principles-media--square">
                <Image
                  src={`${ASSET_BASE}/image-point-figma.png`}
                  alt="Diagrama de puntos de organización en Figma"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 407px"
                />
              </div>
              <p className="cs-animate-text cs-designops-principles-caption">
                Todos colaboran dentro de Figma, sin embargo existen reglas para el
                equipo de Product que son lo que velan por mantener este software
                organizado.
              </p>
            </div>

            <div>
              <div className="cs-animate-media cs-designops-principles-media cs-designops-principles-media--square">
                <Image
                  src={`${ASSET_BASE}/name-pages-into-files.png`}
                  alt="Nomenclatura de páginas y archivos en Figma"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 407px"
                />
              </div>
            </div>

            <div>
              <div className="cs-animate-media cs-designops-principles-media cs-designops-principles-media--square">
                <Image
                  src={`${ASSET_BASE}/figma-file-list.png`}
                  alt="Lista de archivos organizados en Figma"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 407px"
                />
              </div>
              <p className="cs-animate-text cs-designops-principles-caption">
                Para garantizar una buena organización se propuso crear los
                proyectos basados en funcionalidades, producto y equipos externos
                al de Product Design.
              </p>
            </div>

            <div>
              <div className="cs-animate-media cs-designops-principles-media cs-designops-principles-media--tall">
                <Image
                  src={`${ASSET_BASE}/organizacion-proyectos-archivos.png`}
                  alt="Organización de proyectos y archivos en Figma"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 407px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section cs-designops-section">
        <div className="cs-designops-inner">
          <div className="cs-designops-section-heading">
            <h2 className="cs-animate-title cs-designops-page-title">
              Pensado para que cualquiera encuentre lo que busca.
            </h2>
          </div>

          <div className="cs-designops-editorial">
            <p className="cs-animate-badge cs-designops-label">Decisiones de diseño</p>
            <div className="cs-designops-copy-stack">
              <p className="cs-animate-text cs-designops-copy-lg">
                Cada archivo se dividió en carpetas claras: UI Team, UX Team y la
                información necesaria para el traspaso a desarrollo.
              </p>
              <p className="cs-animate-text cs-designops-copy-lg">
                Del lado de UI: exploraciones, el flujo aprobado (UI Check),
                prototipos y un archivo de descartados para no perder el histórico de
                decisiones. Del lado de UX: wireframes y benchmark. Y en ambos, una
                sección de Handover Info y un Cover con título, descripción y fecha —
                para que cualquier diseñador, nuevo o no, entienda el archivo sin tener
                que preguntar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section cs-designops-section cs-designops-section--showcase">
        <div className="cs-designops-inner cs-designops-inner--wide">
          <div className="cs-animate-media cs-designops-showcase-frame">
            <Image
              src={`${ASSET_BASE}/showcase-figma-qik.png`}
              alt="Estructura visual de archivos Figma en Qik"
              fill
              className="object-cover"
              sizes="(max-width: 1056px) 100vw, 1056px"
            />
          </div>
        </div>
      </section>

      <section className="cs-section cs-designops-section">
        <div className="cs-designops-inner">
          <div className="cs-designops-section-heading">
            <h2 className="cs-animate-title cs-designops-page-title">
              La nueva estructura no cambió lo que diseñamos, cambió cómo lo
              encontramos y cómo lo entregamos.
            </h2>
          </div>

          <div className="cs-designops-editorial">
            <p className="cs-animate-badge cs-designops-label">El impacto</p>
            <div className="cs-designops-copy-stack">
              <div className="cs-impact-list">
                {impactItems.map((item, index) => (
                  <div
                    key={item}
                    className="cs-animate-stagger-item cs-impact-row"
                  >
                    <span className="shrink-0 type-case-impact-num">
                      {index + 1}.
                    </span>
                    <p className="type-case-impact-text">{item}</p>
                  </div>
                ))}
              </div>
              <p className="cs-animate-title cs-designops-impact-quote">
                Más que una carpeta bien nombrada, esto le dio al equipo un lenguaje
                común para trabajar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section cs-designops-learning-wrap cs-primary-wrap">
        <div className="cs-designops-learning">
          <div className="space-y-6">
            <p className="cs-animate-badge cs-designops-label">El aprendizaje</p>
            <h2 className="overflow-hidden type-case-result-title">
              <span className="cs-animate-line block will-change-transform">
                Ordenar Figma me enseñó que la estructura no es burocracia — es lo que
                le da velocidad real a un equipo que crece.
              </span>
            </h2>
          </div>
          <div className="cs-designops-learning-body space-y-2 type-case-body">
            <p className="cs-animate-text">
              Antes de esto, pensaba que &quot;organizar archivos&quot; era una tarea
              menor comparada con diseñar pantallas. Hoy sé que es al revés: sin una
              base ordenada, cada pantalla nueva cuesta más de lo que debería.
            </p>
            <p className="cs-animate-text">
              La parte más valiosa no fue definir la estructura, sino lograr que el
              equipo la adoptara como su forma natural de trabajar.
            </p>
          </div>
        </div>
      </section>

      <CaseStudyNextMarquee href="/work/disenar-claridad-desde-cero" />
    </article>
  );
}
