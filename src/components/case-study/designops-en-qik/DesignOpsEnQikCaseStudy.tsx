"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import CaseStudyBadge from "@/components/case-study/CaseStudyBadge";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import { useCaseStudyScrollAnimations } from "@/components/case-study/useCaseStudyScrollAnimations";
import Magnetic from "@/components/motion/Magnetic";

const ASSET_BASE = "/case-studies/designops-en-qik";

const contextParagraphs = [
  "Sin una estructura clara, cada diseñador organizaba su trabajo de forma distinta, creando un entorno caótico donde encontrar información se volvía cada vez más complejo.",
  "Los archivos vivían aislados, el naming era inconsistente y muchas veces era necesario escribir por Slack para localizar diseños específicos.",
  "Aunque el negocio no presionaba directamente por este problema, era evidente que la falta de estructura afectaba la eficiencia del equipo y dificultaba la colaboración.",
] as const;

const challengeItems = [
  "Archivos desordenados dentro de Figma.",
  "Naming conventions inexistentes.",
  "Cada diseñador estructuraba su trabajo de manera distinta.",
  "Búsqueda lenta de información.",
  "Consumo difícil entre UX, UI y desarrollo.",
] as const;

const roleItems = [
  "Arquitecto del proceso.",
  "Líder operativo.",
  "Estratega de diseño.",
] as const;

const figmaStructureItems = [
  "Organización por producto, flujo y funcionalidad.",
  "Naming conventions claras.",
  "Estructura interna consistente en cada archivo.",
  "Gobernanza alineada con el Design System.",
] as const;

const operationalExpansionItems = [
  "Creación de un sistema de email design para Growth.",
  "Procesos estructurados para validación y uso de UXCam.",
  "Estandarización de cómo se construyen y consumen los archivos.",
] as const;

const adoptionBenefits = [
  "Menos fricción.",
  "Menos tiempo buscando.",
  "Mayor claridad para todos.",
] as const;

const impactMetrics = [
  "Búsqueda rápida y clara de información.",
  "Consumo más fácil entre diseñadores.",
  "Menos dependencia individual sobre los archivos.",
  "Mayor alineación en la forma de trabajar.",
  "Aumento de al menos un 80% en la velocidad de crear Email.",
] as const;

export default function DesignOpsEnQikCaseStudy() {
  const pageRef = useRef<HTMLElement>(null);
  useCaseStudyScrollAnimations(pageRef);

  return (
    <article ref={pageRef} className="cs-article">
      <CaseStudyHero
        badge="Diseño · Operación · Procesos"
        title="DesignOps en Qik."
        lead="Estructura y procesos que dieron claridad al equipo y permitieron escalar el diseño con consistencia."
      />

      <section className="cs-section cs-section-content">
        <div className="cs-animate-badge">
          <CaseStudyBadge>El contexto</CaseStudyBadge>
        </div>
        <div className="cs-split">
          <p className="cs-animate-title type-case-section-title">
            A medida que el equipo de diseño crecía dentro de Qik, también
            crecía el volumen de archivos, flujos y entregables.
          </p>
          <div className="cs-split-body type-case-body-muted">
            {contextParagraphs.map((paragraph) => (
              <p key={paragraph} className="cs-animate-text">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-section cs-section-media cs-showcase-wrap">
        <div className="cs-animate-media cs-showcase-surface cs-showcase-surface--media container-site-wide">
          <div className="cs-showcase-media">
            <Image
              src={`${ASSET_BASE}/showcase.png`}
              alt="Estructura de archivos y flujos de DesignOps en Figma"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="cs-section cs-section-content">
        <div className="cs-two-col">
          <div className="cs-col-block">
            <div className="cs-animate-badge">
              <CaseStudyBadge>El desafío</CaseStudyBadge>
            </div>
            <ul className="cs-list">
              {challengeItems.map((item) => (
                <li key={item} className="cs-animate-stagger-item">
                  {item}
                </li>
              ))}
            </ul>
            <p className="cs-animate-text type-case-body">
              Más que un problema visual, era un problema operativo.
            </p>
          </div>

          <div className="cs-col-block">
            <div className="cs-animate-badge">
              <CaseStudyBadge>Mi rol</CaseStudyBadge>
            </div>
            <p className="cs-animate-text type-case-body">
              Identifiqué que antes de escalar el diseño necesitábamos ordenar
              cómo trabajábamos.
            </p>
            <p className="cs-animate-text type-case-body">
              Sin que fuera una iniciativa impulsada por liderazgo, decidí
              tomar acción y proponer una nueva estructura para el equipo,
              asumiendo un rol que combinaba:
            </p>
            <ul className="cs-list">
              {roleItems.map((item) => (
                <li key={item} className="cs-animate-stagger-item">
                  {item}
                </li>
              ))}
            </ul>
            <p className="cs-animate-title type-case-lead">
              Tras validar la propuesta con mi jefe, inicié la transformación
              interna.
            </p>
          </div>
        </div>
      </section>

      <section className="cs-section cs-section-media">
        <div className="cs-animate-media cs-surface-media relative mx-auto aspect-[1440/504] container-site-wide overflow-hidden">
          <Image
            src={`${ASSET_BASE}/banner-1.png`}
            alt="Organización de proyectos en Figma"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      <section className="cs-section cs-section-content">
        <div className="cs-two-col">
          <div className="cs-col-block">
            <div className="cs-animate-badge">
              <CaseStudyBadge>Decisiones de diseño</CaseStudyBadge>
            </div>
            <p className="cs-animate-title type-case-section-title">
              El primer paso fue redefinir la estructura completa dentro de
              Figma:
            </p>
            <ul className="cs-list">
              {figmaStructureItems.map((item) => (
                <li key={item} className="cs-animate-stagger-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="cs-col-block cs-col-block--stagger">
            <p className="cs-animate-text type-case-body">
              Además, expandí esta visión hacia otros sistemas operativos del
              equipo:
            </p>
            <ul className="cs-list">
              {operationalExpansionItems.map((item) => (
                <li key={item} className="cs-animate-stagger-item">
                  {item}
                </li>
              ))}
            </ul>
            <p className="cs-animate-title type-case-lead">
              No se trataba solo de ordenar archivos, sino de crear una forma
              común de trabajar.
            </p>
          </div>
        </div>
      </section>

      <section className="cs-section cs-section-media">
        <div className="cs-animate-media cs-surface-media relative mx-auto aspect-[1440/504] container-site-wide overflow-hidden">
          <Image
            src={`${ASSET_BASE}/banner-2.png`}
            alt="Sistema de email design y procesos operativos"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      <section className="cs-section cs-section-content">
        <div className="cs-split cs-split--impact">
          <div className="cs-col-block">
            <div className="cs-animate-badge">
              <CaseStudyBadge>Resistencia y adopción</CaseStudyBadge>
            </div>
            <p className="cs-animate-title type-case-section-title">
              Como todo cambio estructural, al inicio hubo resistencia.
            </p>
          </div>
          <div className="cs-split-body type-case-body">
            <p className="cs-animate-title type-case-lead">
              El equipo estaba acostumbrado a su forma individual de trabajar,
              pero con el tiempo la estructura comenzó a demostrar su valor:
            </p>
            <ul className="cs-list">
              {adoptionBenefits.map((item) => (
                <li key={item} className="cs-animate-stagger-item">
                  {item}
                </li>
              ))}
            </ul>
            <p className="cs-animate-text">
              Lo que comenzó como una decisión individual se convirtió en una
              nueva rutina operativa para el equipo.
            </p>
          </div>
        </div>
      </section>

      <section className="cs-section cs-section-media">
        <div className="cs-animate-media cs-surface-media relative mx-auto aspect-[1440/504] container-site-wide overflow-hidden">
          <Image
            src={`${ASSET_BASE}/banner-3.png`}
            alt="Adopción del nuevo flujo de trabajo del equipo"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      <section className="cs-section cs-section-content">
        <div className="cs-split cs-split--metrics">
          <div className="cs-col-block">
            <div className="cs-animate-badge">
              <CaseStudyBadge>El impacto</CaseStudyBadge>
            </div>
            <p className="cs-animate-title type-case-section-title">
              Los cambios transformaron el día a día del diseño
            </p>
          </div>
          <div className="cs-split-body">
            <div className="cs-impact-list">
              {impactMetrics.map((item, index) => (
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
            <p className="cs-animate-title type-case-lead pt-8">
              Hoy, todos diseñan bajo una misma lógica operativa, permitiendo
              que el diseño sea más sostenible y colaborativo.
            </p>
          </div>
        </div>
      </section>

      <section className="cs-section cs-primary-wrap">
        <div className="cs-primary-block cs-primary-block--split mx-auto max-w-7xl">
          <div className="space-y-4">
            <div className="cs-animate-badge">
              <CaseStudyBadge variant="on-primary">Aprendizaje</CaseStudyBadge>
            </div>
            <h2 className="overflow-hidden type-case-result-title">
              <span className="cs-animate-line block will-change-transform">
                Este proceso me enseñó que muchas veces los mayores bloqueos no
                están en la creatividad, sino en la falta de estructura.
              </span>
            </h2>
          </div>
          <div className="space-y-6 type-case-body">
            <p className="cs-animate-text">
              Diseñar sistemas también significa diseñar procesos.
            </p>
            <p className="cs-animate-title type-case-lead">
              Hoy veo el DesignOps como una extensión natural del diseño de
              producto: una forma de asegurar que las ideas puedan crecer sin
              perder orden ni intención.
            </p>
          </div>
        </div>
      </section>

      <section className="cs-section cs-section-content cs-section-content--narrow">
        <div className="cs-next-case">
          <p className="cs-animate-title cs-next-case-title type-case-section-title">
            Cuando el diseño encuentra estructura, el equipo puede enfocarse en
            crear con intención.
          </p>
          <div className="cs-animate-text">
            <Magnetic>
              <Link
                href="/#work"
                className="type-case-link inline-block transition-colors hover:text-primary"
              >
                Conoce cómo estas decisiones impactaron otros proyectos dentro
                del banco
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </article>
  );
}
