"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import CaseStudyBadge from "@/components/case-study/CaseStudyBadge";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import { useCaseStudyScrollAnimations } from "@/components/case-study/useCaseStudyScrollAnimations";
import Magnetic from "@/components/motion/Magnetic";

const ASSET_BASE = "/case-studies/cobalt-design-system";

const contextParagraphs = [
  "Aunque ya existía una base visual inicial, la falta de estandarización generaba inconsistencias, retrabajo y una colaboración limitada entre diseño y desarrollo.",
  "Cada diseñador tomaba decisiones visuales distintas, muchos componentes se recreaban desde cero y el lenguaje entre equipos no estaba alineado.",
  "Lo que inicialmente fue un UI Kit evolucionó hacia una necesidad mayor: crear un sistema que permitiera escalar el producto sin perder coherencia.",
] as const;

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
      <CaseStudyHero
        badge="Sistema · Escalabilidad"
        title="Cobalt Design System."
        lead="Diseño y documentación de un sistema basado en design tokens y atomic design, enfocado en consistencia, eficiencia y crecimiento del producto."
      />

      <section className="cs-section cs-section-content">
        <div className="cs-animate-badge">
          <CaseStudyBadge>El contexto</CaseStudyBadge>
        </div>
        <div className="cs-split">
          <p className="cs-animate-title cs-split-title type-case-section-title">
            A medida que Qik crecía como banco digital, el producto comenzó a
            expandirse rápidamente en funcionalidades, flujos y equipos.
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
              alt="Vista general del Cobalt Design System"
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
              El crecimiento del banco exigía un cambio estructural: pasar de
              diseñar pantallas a diseñar un sistema.
            </p>
          </div>

          <div className="cs-col-block">
            <div className="cs-animate-badge">
              <CaseStudyBadge>Mi rol</CaseStudyBadge>
            </div>
            <ul className="cs-list">
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

      <section className="cs-section cs-section-media">
        <div className="cs-animate-media cs-surface-media relative mx-auto aspect-[1440/504] container-site-wide overflow-hidden">
          <Image
            src={`${ASSET_BASE}/banner-1.png`}
            alt="Componentes y patrones del sistema Cobalt"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      <section className="cs-section cs-section-content">
        <div className="cs-two-col cs-two-col--center">
          <div className="cs-col-block">
            <div className="cs-animate-badge">
              <CaseStudyBadge>Decisiones de diseño</CaseStudyBadge>
            </div>
            <p className="cs-animate-title cs-split-title type-case-section-title">
              Cobalt fue diseñado bajo dos principios clave:
            </p>
            <ul className="cs-list">
              {designPrinciples.map((item) => (
                <li key={item} className="cs-animate-stagger-item">
                  {item}
                </li>
              ))}
            </ul>
            <p className="cs-animate-title type-case-lead">
              El objetivo no era solo consistencia visual, sino eficiencia
              operativa y escalabilidad técnica.
            </p>
          </div>

          <div className="cs-decision-visual cs-animate-media">
            <div className="cs-decision-card" aria-hidden="true" />
            <div className="relative z-10 mx-auto aspect-[519/464] w-full">
              <Image
                src={`${ASSET_BASE}/design-phones.png`}
                alt="Documentación y componentes del Cobalt Design System"
                fill
                className="object-contain"
                sizes="519px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section cs-section-media">
        <div className="cs-animate-media cs-surface-media container-site-wide overflow-hidden radius-xlarge">
          <div className="relative aspect-[1184/504] w-full">
            <Image
              src={`${ASSET_BASE}/tokens-collage.png`}
              alt="Design tokens y escalas de color de Cobalt"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      <section className="cs-section cs-section-content">
        <div className="cs-split cs-split--impact">
          <div className="cs-col-block">
            <div className="cs-animate-badge">
              <CaseStudyBadge>Colaboración con desarrollo</CaseStudyBadge>
            </div>
            <p className="cs-animate-title cs-split-title type-case-section-title">
              Uno de los mayores cambios fue alinear diseño y desarrollo bajo un
              mismo lenguaje.
            </p>
          </div>
          <div className="cs-split-body type-case-body">
            <p className="cs-animate-title type-case-lead">
              Trabajé directamente con líderes de arquitectura y frontend para
              validar la visión del sistema y demostrar su impacto en:
            </p>
            <ul className="cs-list">
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

      <section className="cs-section cs-section-media">
        <div className="cs-animate-media cs-surface-media relative mx-auto aspect-[1440/504] container-site-wide overflow-hidden">
          <Image
            src={`${ASSET_BASE}/banner-2.png`}
            alt="Implementación del Cobalt Design System en producto"
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
            <p className="cs-animate-title cs-split-title type-case-section-title">
              La implementación de Cobalt transformó la forma en que el equipo
              trabaja.
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
              Además, permitió lanzar nuevos productos dentro del ecosistema,
              como Qik Pro, incluyendo variaciones visuales complejas como Theme
              Pro gracias a la arquitectura basada en tokens.
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
              Hoy, ver cómo el sistema es adoptado por diseñadores, developers y
              líderes dentro del banco es una de las mayores satisfacciones de
              mi carrera.
            </p>
          </div>
        </div>
      </section>

      <section className="cs-section cs-section-content cs-section-content--narrow">
        <div className="cs-next-case">
          <p className="cs-animate-title cs-next-case-title type-case-section-title">
            Diseñar sistemas también transformó la forma en que el equipo
            trabajaba.
          </p>
          <div className="cs-animate-text">
            <Magnetic>
              <Link
                href="/work/designops-en-qik"
                className="type-case-link inline-block transition-colors hover:text-primary"
              >
                Explora cómo estructuré la operación del diseño dentro de Qik
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </article>
  );
}
