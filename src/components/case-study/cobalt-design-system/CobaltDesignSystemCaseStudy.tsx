"use client";

import Image from "next/image";
import { useRef } from "react";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyNextMarquee from "@/components/case-study/CaseStudyNextMarquee";
import CaseStudyVideo from "@/components/case-study/CaseStudyVideo";
import { useCaseStudyScrollAnimations } from "@/components/case-study/useCaseStudyScrollAnimations";

const ASSET_BASE = "/case-studies/cobalt-design-system";

const challengeParagraphs = [
  "Qik tenía un UI Kit, no un sistema. Cada diseñador decidía por su cuenta, los componentes se recreaban desde cero y el lenguaje entre diseño y desarrollo no estaba alineado.",
  "El resultado de todo esto se traducía en inconsistencia, retrabajo y una colaboración limitada entre equipos.",
  "Escalar el producto exigía crear un sistema, no seguir trabajando sobre un guideline / UI Kit.",
] as const;

const summaryCards = [
  { label: "Rol", value: "Design System Lead", accent: true },
  { label: "Herramientas", value: "Figma · Jira · Confluence", accent: false },
  { label: "Duración", value: "+1 años y continuamos.", accent: false },
  {
    label: "Principios",
    value: "Gobernanza · Design Tokens · Atomic Design",
    accent: false,
  },
  {
    label: "Habilitador de",
    value: "Themes · Modes · Colaboración Design → DEV",
    accent: false,
  },
  {
    label: "Resultado clave",
    value: "+100% velocidad en Design → DEV",
    accent: true,
  },
] as const;

const systemPrinciples = [
  "Design Tokens como lenguaje compartido entre diseño y desarrollo.",
  "Atomic Design como teoría para estructurar componentes y patrones de forma escalable.",
] as const;

const alignmentParagraphs = [
  "Trabajé directamente con líderes de arquitectura y frontend para validar la visión del sistema — mejorando la velocidad de implementación, el mantenimiento del producto y la claridad técnica.",
  "Hoy, ambos equipos comparten conceptos como tokens, componentes y patrones, lo que redujo la fricción y mejoró la comunicación.",
  "La sólida implementación de estos fundamentos fue, de hecho, lo que nos permitió escalar el ecosistema para lanzar nuevos productos como Qik Pro, soportando variaciones visuales complejas mediante la creación de un nuevo Theme Pro nativo gracias a la arquitectura basada en tokens.",
] as const;

const impactItems = [
  "Incremento superior al 100% en velocidad de equipos de diseño y desarrollo.",
  "−30% en bugs de UI durante regresiones.",
  "Consistencia y coherencia visual en la app.",
  "Onboarding más rápido para nuevos diseñadores.",
  "Mayor alineación entre diseño y desarrollo.",
] as const;

export default function CobaltDesignSystemCaseStudy() {
  const pageRef = useRef<HTMLElement>(null);
  useCaseStudyScrollAnimations(pageRef);

  return (
    <article ref={pageRef} className="cs-article cs-cobalt">
      <CaseStudyHero
        badge="Cobalt Design System"
        title="Sistema de diseño atómico con design tokens, enfocado en escalabilidad y consistencia."
        align="center"
        showBack={false}
        showLead={false}
      />

      <section className="cs-section cs-cobalt-hero-media" aria-hidden="true">
        <div className="cs-animate-media cs-cobalt-hero-media-frame">
          <CaseStudyVideo
            src={`${ASSET_BASE}/video-design-system.mp4`}
            type="video/mp4"
          />
        </div>
      </section>

      <section className="cs-section cs-cobalt-section cs-cobalt-section--compact-top">
        <div className="cs-cobalt-inner cs-cobalt-editorial">
          <p className="cs-animate-badge cs-cobalt-label">El desafío</p>
          <div className="cs-cobalt-copy-stack">
            {challengeParagraphs.map((paragraph) => (
              <p key={paragraph} className="cs-animate-text cs-cobalt-copy-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-section cs-cobalt-section">
        <div className="cs-cobalt-inner">
          <h2 className="cs-animate-title cs-cobalt-page-title pb-8">
            Resumen del proyecto.
          </h2>
          <div className="cs-cobalt-summary-grid">
            {summaryCards.map(({ label, value, accent }) => (
              <div
                key={label}
                className={`cs-animate-stagger-item cs-cobalt-summary-card${
                  accent ? " cs-cobalt-summary-card--mint" : ""
                }`}
              >
                <p className="cs-cobalt-summary-label">{label}</p>
                <p className="cs-cobalt-summary-value">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-section cs-cobalt-section cs-cobalt-section--showcase">
        <div className="cs-cobalt-inner cs-cobalt-inner--wide">
          <div className="cs-animate-media cs-cobalt-showcase-frame">
            <Image
              src={`${ASSET_BASE}/image-fundation-dls.png`}
              alt="Fundamentos del Design Language System Cobalt"
              fill
              className="object-cover"
              sizes="(max-width: 1056px) 100vw, 1056px"
            />
          </div>
        </div>
      </section>

      <section className="cs-section cs-cobalt-section">
        <div className="cs-cobalt-inner">
          <div className="cs-cobalt-section-heading">
            <h2 className="cs-animate-title cs-cobalt-page-title">
              Pensamos en escalabilidad funcional.
            </h2>
          </div>

          <div className="cs-cobalt-editorial">
            <p className="cs-animate-badge cs-cobalt-label">El sistema</p>
            <div className="cs-cobalt-copy-stack">
              <p className="cs-animate-title cs-cobalt-copy-lg">
                Cobalt fue diseñado bajo dos principios clave:
              </p>
              <ul className="cs-cobalt-dot-list">
                {systemPrinciples.map((item) => (
                  <li key={item} className="cs-animate-stagger-item cs-cobalt-dot-item">
                    <span className="cs-cobalt-dot" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="cs-animate-text cs-cobalt-copy-lg pt-2">
                El objetivo no era solo consistencia visual, sino eficiencia
                operativa y escalabilidad técnica.
              </p>
            </div>
          </div>

          <div className="cs-cobalt-principles-grid">
            <div>
              <div className="cs-animate-media cs-cobalt-principles-media cs-cobalt-principles-media--square">
                <Image
                  src={`${ASSET_BASE}/image-spacing-tokens.png`}
                  alt="Tokens de espaciado en Cobalt"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 407px"
                />
              </div>
              <p className="cs-animate-text cs-cobalt-principles-caption">
                Se definieron los tokens de forma clara, desde el color hasta los
                valores que se usan en los gap.
              </p>
            </div>

            <div>
              <div className="cs-animate-media cs-cobalt-principles-media cs-cobalt-principles-media--square">
                <CaseStudyVideo
                  src={`${ASSET_BASE}/video-grid-dls.mp4`}
                  type="video/mp4"
                />
              </div>
            </div>

            <div>
              <div className="cs-animate-media cs-cobalt-principles-media cs-cobalt-principles-media--square">
                <Image
                  src={`${ASSET_BASE}/tokens-colors.png`}
                  alt="Tokens de color globales, alias y específicos"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 407px"
                />
              </div>
              <p className="cs-animate-text cs-cobalt-principles-caption">
                Creación y agrupación de tokens de color como globales, alias y
                específicos para poder activar themes y modes que se quieran.
              </p>
            </div>

            <div>
              <div className="cs-animate-media cs-cobalt-principles-media cs-cobalt-principles-media--square">
                <Image
                  src={`${ASSET_BASE}/icon-grid.png`}
                  alt="Grid de iconografía del sistema Cobalt"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 407px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section cs-cobalt-section">
        <div className="cs-cobalt-inner">
          <div className="cs-cobalt-section-heading">
            <h2 className="cs-animate-title cs-cobalt-page-title">
              Uno de los mayores cambios fue alinear diseño y desarrollo bajo un
              mismo lenguaje.
            </h2>
          </div>

          <div className="cs-cobalt-editorial">
            <p className="cs-animate-badge cs-cobalt-label">Alineación</p>
            <div className="cs-cobalt-copy-stack">
              {alignmentParagraphs.map((paragraph) => (
                <p key={paragraph} className="cs-animate-text cs-cobalt-copy-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section cs-cobalt-section cs-cobalt-section--showcase">
        <div className="cs-cobalt-inner cs-cobalt-inner--wide">
          <div className="cs-animate-media cs-cobalt-showcase-frame">
            <CaseStudyVideo
              src={`${ASSET_BASE}/video-change-pro-tokens.mp4`}
              type="video/mp4"
            />
          </div>
        </div>
      </section>

      <section className="cs-section cs-cobalt-section">
        <div className="cs-cobalt-inner">
          <div className="cs-cobalt-section-heading">
            <h2 className="cs-animate-title cs-cobalt-page-title">
              La implementación de Cobalt transformó la forma en que el equipo
              trabaja.
            </h2>
          </div>

          <div className="cs-cobalt-editorial">
            <p className="cs-animate-badge cs-cobalt-label">El impacto</p>
            <div className="cs-cobalt-copy-stack">
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
              <p className="cs-animate-text type-case-impact-text pt-4">
                Nada valida mejor la decisión de crear un design system que la voz
                del equipo técnico que lo implementa:
              </p>
              <p className="cs-animate-title cs-cobalt-impact-quote">
                &ldquo;Sin tokens, Qik Pro no hubiese sido posible.&rdquo;
              </p>
              <p className="cs-animate-text cs-cobalt-impact-attribution">
                Justin Colón – Líder de Front-End
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section cs-cobalt-learning-wrap cs-primary-wrap">
        <div className="cs-cobalt-learning">
          <div className="space-y-6">
            <p className="cs-animate-badge cs-cobalt-label">El aprendizaje</p>
            <h2 className="overflow-hidden type-case-result-title">
              <span className="cs-animate-line block will-change-transform">
                Construir Cobalt cambió mi perspectiva como diseñador.
              </span>
            </h2>
          </div>
          <div className="cs-cobalt-learning-body space-y-2 type-case-body">
            <p className="cs-animate-text">
              Entendí que el verdadero impacto no está en una interfaz aislada,
              sino en crear estructuras que permitan que el diseño evolucione
              junto al producto y el negocio.
            </p>
            <p className="cs-animate-text">
              Hoy, ver cómo el sistema es adoptado por diseñadores, developers y
              líderes dentro del banco es una de las mayores satisfacciones de mi
              carrera.
            </p>
          </div>
        </div>
      </section>

      <CaseStudyNextMarquee href="/work/designops-en-qik" />
    </article>
  );
}
