"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import CaseStudyBadge from "@/components/case-study/CaseStudyBadge";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import { useCaseStudyScrollAnimations } from "@/components/case-study/useCaseStudyScrollAnimations";
import Magnetic from "@/components/motion/Magnetic";

const ASSET_BASE = "/case-studies/disenar-claridad";

const contextParagraphs = [
  "Iniciamos el diseño y desarrollo de la aplicación desde cero utilizando una marca blanca como base, con el objetivo de evolucionar rápidamente hacia la identidad final de Qik.",
  "Mi rol comenzó enfocado en UI, pero rápidamente asumí la responsabilidad de definir el look & feel completo de la app, asegurando consistencia visual mientras el producto crecía.",
  "El reto era claro: diseñar una experiencia bancaria digital accesible, rápida y sencilla, pensada para bancarizar sectores que tradicionalmente habían estado fuera del sistema financiero.",
] as const;

const challengeItems = [
  "No existía una aplicación previa.",
  "El equipo estaba diseñando y desarrollando en paralelo.",
  "Cada diseñador tomaba decisiones visuales distintas.",
  "La colaboración con desarrollo era limitada.",
] as const;

const roleItems = [
  "Liderazgo visual del producto.",
  "Definición del look & feel de la app.",
  "Creación de style guides y UI Kit inicial.",
  "Revisión de entregables de UI.",
  "Impulso estratégico para la creación del Design System.",
] as const;

const designPrinciples = [
  "Jerarquía visual para facilitar la lectura y navegación.",
  "Contraste y uso del color para guiar la atención.",
  "Spacing consistente para crear aire y claridad.",
  "Patrones repetibles que redujeran fricción cognitiva.",
  "Microcopys visuales que acompañaran la interacción.",
] as const;

const showcasePhones = [
  { src: "showcase-productos", alt: "Pantalla Tus Productos", raised: false },
  { src: "showcase-clients", alt: "Pantalla de clientes", raised: true },
  { src: "showcase-tarjeta", alt: "Pantalla tarjeta de crédito", raised: false },
] as const;

const tokenAssets = [
  { name: "tokens-palette", alt: "Tokens de color", className: "cs-tokens-item--palette" },
  { name: "tokens-blues", alt: "Escala azul", className: "cs-tokens-item--blues" },
  { name: "tokens-caution", alt: "Componente caution", className: "cs-tokens-item--caution" },
  { name: "tokens-info", alt: "Componente info", className: "cs-tokens-item--info" },
  { name: "tokens-doc", alt: "Componente documento", className: "cs-tokens-item--doc" },
  { name: "tokens-orange", alt: "Escala naranja", className: "cs-tokens-item--orange" },
  { name: "tokens-icons", alt: "Iconografía del sistema", className: "cs-tokens-item--icons" },
] as const;

export default function DisenarClaridadCaseStudy() {
  const pageRef = useRef<HTMLElement>(null);
  useCaseStudyScrollAnimations(pageRef);

  return (
    <article ref={pageRef} className="cs-article">
      <CaseStudyHero
        badge="Producto · Identidad · Sistemas"
        title="Diseñar claridad desde cero."
        lead="Definición del look & feel de la App Qik Banco Digital, transformando una identidad visual en una experiencia clara, usable y pensada para las personas."
      />

      <section className="cs-section cs-section-content">
        <div className="cs-animate-badge">
          <CaseStudyBadge>El contexto</CaseStudyBadge>
        </div>
        <div className="cs-split">
          <p className="cs-animate-title cs-split-title type-case-section-title">
            Ingrese al equipo de Qik Banco Digital durante la fase de creación de
            marca visual, sin un producto existente.
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
        <div className="cs-animate-media cs-showcase-surface container-site-wide">
          <div className="cs-showcase-mobile">
            <Image
              src={`${ASSET_BASE}/showcase-mobile.png`}
              alt="Pantallas de la app Qik: productos, inicio y tarjeta de crédito"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <div className="cs-showcase-phones">
            {showcasePhones.map(({ src, alt, raised }) => (
              <div
                key={src}
                className={`cs-animate-stagger-item cs-showcase-phone ${
                  raised ? "cs-showcase-phone--raised" : ""
                }`}
              >
                <Image
                  src={`${ASSET_BASE}/${src}.png`}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="275px"
                />
              </div>
            ))}
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
              Esto hacía que la velocidad fuera lenta, el retrabajo constante y la
              experiencia visual inconsistente.
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
              Más que ejecutar pantallas, mi enfoque estuvo en construir una base
              que permitiera escalar el producto.
            </p>
          </div>
        </div>
      </section>

      <section className="cs-section cs-section-media">
        <div className="cs-animate-media cs-surface-media relative mx-auto aspect-[1440/504] container-site-wide overflow-hidden">
          <Image
            src={`${ASSET_BASE}/banner-full.png`}
            alt="Paleta de colores del sistema visual Qik"
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
              El look &amp; feel se construyó a partir de principios claros:
            </p>
            <ul className="cs-list">
              {designPrinciples.map((item) => (
                <li key={item} className="cs-animate-stagger-item">
                  {item}
                </li>
              ))}
            </ul>
            <div className="cs-col-block type-case-body">
              <p className="cs-animate-text">
                Busqué que la aplicación transmitiera tres sensaciones principales:
              </p>
              <p className="cs-animate-text type-case-emphasis">
                Confianza · Modernidad · Simplicidad
              </p>
              <p className="cs-animate-text">
                Qik debía sentirse ligera, accesible y diferente a la experiencia
                bancaria tradicional.
              </p>
            </div>
          </div>

          <div className="cs-decision-visual cs-animate-media">
            <div className="cs-decision-card" aria-hidden="true" />
            <span className="cs-decision-accent" aria-hidden="true" />
            <div className="cs-decision-phones">
              {[
                { src: "phones-home", alt: "Home FAB Qik" },
                { src: "phones-pago", alt: "Modal métodos de pago Qik" },
              ].map(({ src, alt }) => (
                <div key={src} className="cs-animate-stagger-item cs-decision-phone cs-device-frame">
                  <Image
                    src={`${ASSET_BASE}/${src}.png`}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="184px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section cs-section-media">
        <div className="cs-animate-media cs-surface-media container-site-wide overflow-hidden radius-xlarge">
          <div className="cs-tokens-stage">
            {tokenAssets.map(({ name, alt, className }) => (
              <div
                key={name}
                className={`cs-animate-stagger-item cs-tokens-item ${className}`}
              >
                <Image
                  src={`${ASSET_BASE}/${name}.png`}
                  alt={alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 50vw, 360px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-section cs-section-content">
        <div className="cs-split cs-split--impact">
          <div className="cs-col-block">
            <div className="cs-animate-badge">
              <CaseStudyBadge>El impacto</CaseStudyBadge>
            </div>
            <p className="cs-animate-title cs-split-title type-case-section-title">
              El trabajo en el look &amp; feel no partió de mejorar algo existente,
              sino de construir desde cero una experiencia bancaria clara, moderna y
              accesible.
            </p>
          </div>
          <div className="cs-split-body type-case-body">
            <p className="cs-animate-text">
              A través de decisiones visuales como jerarquía tipográfica, contraste,
              spacing y patrones repetibles, el producto logró transmitir una
              sensación de confianza y simplicidad desde el primer contacto.
            </p>
            <p className="cs-animate-text">
              El equipo comenzó a trabajar con mayor claridad y seguridad visual,
              mientras que la aplicación empezó a destacar por su limpieza y
              coherencia. En redes sociales y conversaciones con usuarios, uno de
              los comentarios más recurrentes ha sido cómo Qik se siente sencilla,
              intuitiva y diferente a la banca tradicional.
            </p>
            <p className="cs-animate-title type-case-lead">
              Más que una interfaz, el diseño ayudó a crear una experiencia usable
              donde lo visual guía naturalmente la interacción.
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
                Ver la aplicación funcionando por primera vez durante el evento de
                lanzamiento es un momento difícil de describir.
              </span>
            </h2>
          </div>
          <div className="space-y-6 type-case-body">
            <p className="cs-animate-text">
              Sentí una mezcla de orgullo y emoción al ver algo que comenzó como
              ideas y decisiones visuales convertirse en una herramienta real que
              impacta la vida de miles de personas.
            </p>
            <p className="cs-animate-text">
              Más allá del sistema o la estructura, lo que más me llena es escuchar
              que Qik se percibe simple, clara y bien pensada. Saber que algo que
              diseñé hoy forma parte del día a día de los usuarios dominicanos me
              recuerda por qué hago lo que hago.
            </p>
            <p className="cs-animate-title type-case-lead">
              Para mí, el diseño cobra sentido cuando deja de ser solo una pantalla
              y se convierte en una experiencia que las personas realmente usan y
              valoran.
            </p>
          </div>
        </div>
      </section>

      <section className="cs-section cs-section-content cs-section-content--narrow">
        <div className="cs-next-case">
          <p className="cs-animate-title cs-next-case-title type-case-section-title">
            Este proyecto marcó el inicio de una visión más estructurada del diseño
            dentro del banco.
          </p>
          <div className="cs-animate-text">
            <Magnetic>
              <Link
                href="/work/cobalt-design-system"
                className="type-case-link inline-block transition-colors hover:text-primary"
              >
                Descubre cómo esta base evolucionó hacia la creación de Cobalt
                Design System
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </article>
  );
}
