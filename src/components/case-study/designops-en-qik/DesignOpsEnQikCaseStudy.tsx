"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import CaseStudyBadge from "@/components/case-study/CaseStudyBadge";
import { useCaseStudyScrollAnimations } from "@/components/case-study/useCaseStudyScrollAnimations";
import Magnetic from "@/components/motion/Magnetic";

const ASSET_BASE = "/case-studies/designops-en-qik";

const challengeItems = [
  "Archivos desordenados dentro de Figma.",
  "Naming conventions inexistentes.",
  "Cada diseñador estructuraba su trabajo de manera distinta.",
  "Búsqueda lenta de información.",
  "Consumo difícil entre UX, UI y desarrollo.",
] as const;

const roleFocusItems = [
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
  "menos fricción",
  "menos tiempo buscando",
  "mayor claridad para todos",
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
      {/* Hero */}
      <div className="cs-hero-shell">
        <div className="mx-auto max-w-7xl">
          <div className="cs-hero-panel">
            <div className="cs-hero-grid">
              <div className="space-y-5 text-on-hero lg:space-y-6">
                <div className="cs-hero-item">
                  <Magnetic>
                    <Link
                      href="/#work"
                      className="cs-back-btn type-case-back-btn"
                    >
                      <span aria-hidden="true">←</span>
                      Volver
                    </Link>
                  </Magnetic>
                </div>

                <div className="cs-hero-item">
                  <CaseStudyBadge>
                    Diseño · Operación · Procesos
                  </CaseStudyBadge>
                </div>

                <h1 className="overflow-hidden type-case-hero-title">
                  <span className="cs-hero-line block will-change-transform">
                    DesignOps en Qik.
                  </span>
                </h1>

                <p className="cs-hero-item type-case-hero-lead max-w-xl">
                  Estructura y procesos que dieron claridad al equipo y
                  permitieron escalar el diseño con consistencia.
                </p>
              </div>

              <div className="cs-hero-visual">
                <div className="cs-hero-media relative flex min-h-[14rem] items-center justify-center sm:min-h-[18rem] lg:min-h-[24rem]">
                  <Image
                    src={`${ASSET_BASE}/hero-visual.png`}
                    alt=""
                    width={627}
                    height={572}
                    className="h-auto w-full max-w-sm object-contain opacity-90 sm:max-w-md"
                    priority
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* El contexto */}
      <section className="cs-section mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-36">
        <div className="cs-animate-badge">
          <CaseStudyBadge>El contexto</CaseStudyBadge>
        </div>
        <div className="mt-4 grid gap-10 lg:grid-cols-2 lg:gap-20">
          <p className="cs-animate-title type-case-section-title">
            A medida que el equipo de diseño crecía dentro de Qik, también
            crecía el volumen de archivos, flujos y entregables.
          </p>
          <div className="space-y-6 type-case-body-muted">
            <p className="cs-animate-text">
              Sin una estructura clara, cada diseñador organizaba su trabajo de
              forma distinta, creando un entorno caótico donde encontrar
              información se volvía cada vez más complejo.
            </p>
            <p className="cs-animate-text">
              Los archivos vivían aislados, el naming era inconsistente y muchas
              veces era necesario escribir por Slack para localizar diseños
              específicos.
            </p>
            <p className="cs-animate-text">
              Aunque el negocio no presionaba directamente por este problema,
              era evidente que la falta de estructura afectaba la eficiencia del
              equipo y dificultaba la colaboración.
            </p>
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="cs-section px-4 sm:px-6 lg:px-8">
        <div className="cs-animate-media cs-surface-media relative mx-auto aspect-[1352/920] max-w-[90rem] overflow-hidden">
          <Image
            src={`${ASSET_BASE}/showcase.png`}
            alt="Estructura de archivos y flujos de DesignOps en Figma"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Desafío + Rol */}
      <section className="cs-section mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-4">
            <div className="cs-animate-badge">
              <CaseStudyBadge>El desafío</CaseStudyBadge>
            </div>
            <ul className="list-disc space-y-2 pl-6 type-case-body">
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

          <div className="space-y-4">
            <div className="cs-animate-badge">
              <CaseStudyBadge>Mi rol</CaseStudyBadge>
            </div>
            <div className="space-y-6 type-case-body">
              <p className="cs-animate-text">
                Identifiqué que antes de escalar el diseño necesitábamos ordenar
                cómo trabajábamos.
              </p>
              <p className="cs-animate-text">
                Sin que fuera una iniciativa impulsada por liderazgo, decidí
                tomar acción y proponer una nueva estructura para el equipo,
                asumiendo un rol que combinaba:
              </p>
              <ul className="list-disc space-y-2 pl-6 type-case-body">
                {roleFocusItems.map((item) => (
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
        </div>
      </section>

      {/* Banner */}
      <section className="cs-section px-4 sm:px-6 lg:px-8">
        <div className="cs-animate-media cs-surface-media relative mx-auto aspect-[1440/504] max-w-[90rem] overflow-hidden">
          <Image
            src={`${ASSET_BASE}/banner-1.png`}
            alt="Organización de proyectos en Figma"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Decisiones de diseño */}
      <section className="cs-section mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            <div className="cs-animate-badge">
              <CaseStudyBadge>Decisiones de diseño</CaseStudyBadge>
            </div>
            <p className="cs-animate-title type-case-section-title">
              El primer paso fue redefinir la estructura completa dentro de
              Figma:
            </p>
            <ul className="list-disc space-y-2 pl-6 type-case-body">
              {figmaStructureItems.map((item) => (
                <li key={item} className="cs-animate-stagger-item">
                  {item}
                </li>
              ))}
            </ul>
            <div className="space-y-3 type-case-body">
              <p className="cs-animate-text">
                Además, expandí esta visión hacia otros sistemas operativos del
                equipo:
              </p>
              <ul className="list-disc space-y-2 pl-6 type-case-body">
                {operationalExpansionItems.map((item) => (
                  <li key={item} className="cs-animate-stagger-item">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="cs-animate-text">
                No se trataba solo de ordenar archivos, sino de crear una forma
                común de trabajar.
              </p>
            </div>
          </div>

          <div className="cs-animate-media cs-surface-card relative mx-auto aspect-[519/464] w-full max-w-lg overflow-hidden">
            <Image
              src={`${ASSET_BASE}/design-structure.png`}
              alt="Estructura interna de archivos Figma del equipo de diseño"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 519px"
            />
          </div>
        </div>
      </section>

      {/* Banner 2 */}
      <section className="cs-section px-4 sm:px-6 lg:px-8">
        <div className="cs-animate-media cs-surface-media relative mx-auto aspect-[1440/504] max-w-[90rem] overflow-hidden">
          <Image
            src={`${ASSET_BASE}/banner-2.png`}
            alt="Sistema de email design y procesos operativos"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Resistencia y adopción */}
      <section className="cs-section mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-36">
        <div className="cs-animate-badge">
          <CaseStudyBadge>Resistencia y adopción</CaseStudyBadge>
        </div>
        <div className="mt-4 grid gap-10 lg:grid-cols-2 lg:gap-20">
          <p className="cs-animate-title type-case-section-title">
            Como todo cambio estructural, al inicio hubo resistencia.
          </p>
          <div className="space-y-6 type-case-body">
            <p className="cs-animate-title type-case-lead">
              El equipo estaba acostumbrado a su forma individual de trabajar,
              pero con el tiempo la estructura comenzó a demostrar su valor:
            </p>
            <ul className="list-disc space-y-2 pl-6 type-case-body">
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

      {/* Banner 3 */}
      <section className="cs-section px-4 sm:px-6 lg:px-8">
        <div className="cs-animate-media cs-surface-media relative mx-auto aspect-[1440/504] max-w-[90rem] overflow-hidden">
          <Image
            src={`${ASSET_BASE}/banner-3.png`}
            alt="Adopción del nuevo flujo de trabajo del equipo"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      {/* El impacto */}
      <section className="cs-section mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-36">
        <div className="cs-animate-badge">
          <CaseStudyBadge>El impacto</CaseStudyBadge>
        </div>
        <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,411px)_1fr] lg:gap-24">
          <p className="cs-animate-title type-case-section-title">
            Los cambios transformaron el día a día del diseño
          </p>
          <div className="space-y-8">
            <div className="cs-impact-list">
              {impactMetrics.map((item, index) => (
                <div
                  key={item}
                  className="cs-animate-stagger-item flex items-center gap-6 py-4 sm:gap-8"
                >
                  <span className="shrink-0 type-case-impact-num">
                    {index + 1}.
                  </span>
                  <p className="type-case-hero-lead">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <p className="cs-animate-title type-case-lead">
              Hoy, todos diseñan bajo una misma lógica operativa, permitiendo
              que el diseño sea más sostenible y colaborativo.
            </p>
          </div>
        </div>
      </section>

      {/* Aprendizaje */}
      <section className="cs-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 cs-primary-block lg:grid-cols-2 lg:gap-20">
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
            <p className="cs-animate-text">
              Hoy veo el DesignOps como una extensión natural del diseño de
              producto: una forma de asegurar que las ideas puedan crecer sin
              perder orden ni intención.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cs-section mx-auto max-w-3xl px-6 py-20 text-center sm:px-8 lg:py-36">
        <p className="cs-animate-title type-case-section-title">
          Cuando el diseño encuentra estructura, el equipo puede enfocarse en
          crear con intención.
        </p>
        <div className="cs-animate-text mt-6">
          <Magnetic>
            <Link
              href="/#work"
              className="type-case-link inline-flex items-center gap-2 transition-colors hover:text-primary"
            >
              Conoce cómo estas decisiones impactaron otros proyectos dentro del
              banco
            </Link>
          </Magnetic>
        </div>
      </section>
    </article>
  );
}
