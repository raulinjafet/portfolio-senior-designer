"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import CaseStudyBadge from "@/components/case-study/CaseStudyBadge";
import { useCaseStudyScrollAnimations } from "@/components/case-study/useCaseStudyScrollAnimations";
import Magnetic from "@/components/motion/Magnetic";

const ASSET_BASE = "/case-studies/cobalt-design-system";

const challengeItems = [
  "Flujos diseñados de forma aislada.",
  "Estilos visuales inconsistentes dentro de la app.",
  "Colores y tipografías fuera del brand guideline.",
  "Baja velocidad de creación.",
  "Comunicación fragmentada con desarrollo.",
] as const;

const roleItems = [
  "Impulsé la visión del Design System dentro del banco.",
  "Presenté el proyecto a líderes técnicos y ejecutivos.",
  "Colaboré con arquitectura y frontend para alinear la implementación.",
  "Formé un equipo para auditar el producto y definir el roadmap.",
  "Lideré la creación y evolución del sistema.",
] as const;

const designPrinciples = [
  "Design Tokens como lenguaje compartido entre diseño y desarrollo.",
  "Atomic Design para estructurar componentes y patrones de forma escalable.",
] as const;

const cobaltIncludes = [
  "Sistema de gobernanza.",
  "Tokens visuales centralizados.",
  "Componentes reutilizables.",
  "Patrones de interacción.",
  "Documentación clara para diseñadores y developers.",
] as const;

const devImpactItems = [
  "Velocidad de implementación.",
  "Mantenimiento del producto.",
  "Claridad técnica.",
] as const;

const impactMetrics = [
  "Incremento superior al 100 % en velocidad de diseño.",
  "Reducción significativa del retrabajo.",
  "Consistencia visual total en la app.",
  "Onboarding más rápido para nuevos diseñadores.",
  "Mayor alineación entre diseño y desarrollo",
] as const;

export default function CobaltDesignSystemCaseStudy() {
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
                    Sistema · Escalabilidad
                  </CaseStudyBadge>
                </div>

                <h1 className="overflow-hidden type-case-hero-title">
                  <span className="cs-hero-line block will-change-transform">
                    Cobalt Design System.
                  </span>
                </h1>

                <p className="cs-hero-item type-case-hero-lead max-w-xl">
                  Diseño y documentación de un sistema basado en design tokens y
                  atomic design, enfocado en consistencia, eficiencia y
                  crecimiento del producto.
                </p>
              </div>

              <div className="cs-hero-visual">
                <div className="cs-hero-phones">
                  <span className="cs-hero-media cs-accent-bar cs-hero-accent-left hidden sm:block" />
                  <span className="cs-hero-media cs-accent-bar cs-hero-accent-right hidden sm:block" />
                  <div className="cs-hero-media cs-hero-phone cs-device-frame">
                    <Image
                      src={`${ASSET_BASE}/hero-phone-left.png`}
                      alt="Pantalla de la app Qik con sistema Cobalt"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 40vw, 200px"
                      priority
                    />
                  </div>
                  <div className="cs-hero-media cs-hero-phone cs-device-frame">
                    <Image
                      src={`${ASSET_BASE}/hero-phone-right.png`}
                      alt="Componentes del design system Cobalt en la app"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 40vw, 200px"
                      priority
                    />
                  </div>
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
            A medida que Qik crecía como banco digital, el producto comenzó a
            expandirse rápidamente en funcionalidades, flujos y equipos.
          </p>
          <div className="space-y-6 type-case-body-muted">
            <p className="cs-animate-text">
              Aunque ya existía una base visual inicial, la falta de
              estandarización generaba inconsistencias, retrabajo y una
              colaboración limitada entre diseño y desarrollo.
            </p>
            <p className="cs-animate-text">
              Cada diseñador tomaba decisiones visuales distintas, muchos
              componentes se recreaban desde cero y el lenguaje entre equipos no
              estaba alineado.
            </p>
            <p className="cs-animate-text">
              Lo que inicialmente fue un UI Kit evolucionó hacia una necesidad
              mayor: crear un sistema que permitiera escalar el producto sin
              perder coherencia.
            </p>
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="cs-section px-4 sm:px-6 lg:px-8">
        <div className="cs-animate-media cs-surface-media relative mx-auto aspect-[1352/920] max-w-[90rem] overflow-hidden">
          <Image
            src={`${ASSET_BASE}/showcase.png`}
            alt="Vista general del Cobalt Design System"
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
              El crecimiento del banco exigía un cambio estructural: pasar de
              diseñar pantallas a diseñar un sistema.
            </p>
          </div>

          <div className="space-y-4">
            <div className="cs-animate-badge">
              <CaseStudyBadge>Mi rol</CaseStudyBadge>
            </div>
            <ul className="list-disc space-y-2 pl-6 type-case-body">
              {roleItems.map((item) => (
                <li key={item} className="cs-animate-stagger-item">
                  {item}
                </li>
              ))}
            </ul>
            <p className="cs-animate-title type-case-lead">
              Más que construir componentes, mi enfoque estuvo en crear una base
              estratégica para el crecimiento del producto.
            </p>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="cs-section px-4 sm:px-6 lg:px-8">
        <div className="cs-animate-media cs-surface-media relative mx-auto aspect-[1440/504] max-w-[90rem] overflow-hidden">
          <Image
            src={`${ASSET_BASE}/banner-1.png`}
            alt="Componentes y patrones del sistema Cobalt"
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
              Cobalt fue diseñado bajo dos principios clave:
            </p>
            <ul className="list-disc space-y-2 pl-6 type-case-body">
              {designPrinciples.map((item) => (
                <li key={item} className="cs-animate-stagger-item">
                  {item}
                </li>
              ))}
            </ul>
            <div className="space-y-3 type-case-body">
              <p className="cs-animate-text">Qué incluye Cobalt:</p>
              <ul className="list-disc space-y-2 pl-6 type-case-body">
                {cobaltIncludes.map((item) => (
                  <li key={item} className="cs-animate-stagger-item">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="cs-animate-text">
                El objetivo no era solo consistencia visual, sino eficiencia
                operativa y escalabilidad técnica.
              </p>
            </div>
          </div>

          <div className="cs-animate-media cs-surface-card relative mx-auto aspect-[519/464] w-full max-w-lg overflow-hidden">
            <Image
              src={`${ASSET_BASE}/design-phones.png`}
              alt="Documentación y componentes del Cobalt Design System"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 519px"
            />
          </div>
        </div>
      </section>

      {/* Tokens collage */}
      <section className="cs-section px-4 sm:px-6 lg:px-8">
        <div className="cs-animate-media cs-surface-media relative mx-auto aspect-[1352/504] max-w-[90rem] overflow-hidden">
          <Image
            src={`${ASSET_BASE}/tokens-collage.png`}
            alt="Design tokens y escalas de color de Cobalt"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Colaboración con desarrollo */}
      <section className="cs-section mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-36">
        <div className="cs-animate-badge">
          <CaseStudyBadge>Colaboración con desarrollo</CaseStudyBadge>
        </div>
        <div className="mt-4 grid gap-10 lg:grid-cols-2 lg:gap-20">
          <p className="cs-animate-title type-case-section-title">
            Uno de los mayores cambios fue alinear diseño y desarrollo bajo un
            mismo lenguaje.
          </p>
          <div className="space-y-6 type-case-body">
            <p className="cs-animate-title type-case-lead">
              Trabajé directamente con líderes de arquitectura y frontend para
              validar la visión del sistema y demostrar su impacto en:
            </p>
            <ul className="list-disc space-y-2 pl-6 type-case-body">
              {devImpactItems.map((item) => (
                <li key={item} className="cs-animate-stagger-item">
                  {item}
                </li>
              ))}
            </ul>
            <p className="cs-animate-text">
              Hoy, ambos equipos comparten conceptos como tokens, componentes y
              patrones, lo que redujo fricción y mejoró la comunicación.
            </p>
          </div>
        </div>
      </section>

      {/* Banner 2 */}
      <section className="cs-section px-4 sm:px-6 lg:px-8">
        <div className="cs-animate-media cs-surface-media relative mx-auto aspect-[1440/504] max-w-[90rem] overflow-hidden">
          <Image
            src={`${ASSET_BASE}/banner-2.png`}
            alt="Implementación del Cobalt Design System en producto"
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
            La implementación de Cobalt transformó la forma en que el equipo
            trabaja.
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
              Además, permitió lanzar nuevos productos dentro del ecosistema,
              como Qik Pro, incluyendo variaciones visuales complejas como Theme
              Pro gracias a la arquitectura basada en tokens.
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
                Construir Cobalt cambió mi perspectiva como diseñador.
              </span>
            </h2>
          </div>
          <div className="space-y-6 type-case-body">
            <p className="cs-animate-text">
              Entendí que el verdadero impacto no está en una interfaz aislada,
              sino en crear estructuras que permitan que el diseño evolucione
              junto al producto y el negocio.
            </p>
            <p className="cs-animate-title type-case-lead">
              Hoy, ver cómo el sistema es adoptado por diseñadores, developers
              y líderes dentro del banco es una de las mayores satisfacciones de
              mi carrera.
            </p>
          </div>
        </div>
      </section>

      {/* Next case */}
      <section className="cs-section mx-auto max-w-3xl px-6 py-20 text-center sm:px-8 lg:py-36">
        <p className="cs-animate-title type-case-section-title">
          Diseñar sistemas también transformó la forma en que el equipo
          trabajaba.
        </p>
        <div className="cs-animate-text mt-6">
          <Magnetic>
            <Link
              href="/work/designops-en-qik"
              className="type-case-link inline-flex items-center gap-2 transition-colors hover:text-primary"
            >
              Explora cómo estructuré la operación del diseño dentro de Qik
            </Link>
          </Magnetic>
        </div>
      </section>
    </article>
  );
}
