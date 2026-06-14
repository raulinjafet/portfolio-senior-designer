"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import CaseStudyBadge from "@/components/case-study/CaseStudyBadge";
import { useCaseStudyScrollAnimations } from "@/components/case-study/useCaseStudyScrollAnimations";
import Magnetic from "@/components/motion/Magnetic";

const ASSET_BASE = "/case-studies/disenar-claridad";

export default function DisenarClaridadCaseStudy() {
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
                    Producto · Identidad · Sistemas
                  </CaseStudyBadge>
                </div>

                <h1 className="overflow-hidden type-case-hero-title">
                  <span className="cs-hero-line block will-change-transform">
                    Diseñar claridad desde cero.
                  </span>
                </h1>

                <p className="cs-hero-item type-case-hero-lead max-w-xl">
                  Definición del look &amp; feel de la App Qik Banco Digital,
                  transformando una identidad visual en una experiencia clara,
                  usable y pensada para las personas.
                </p>
              </div>

              <div className="cs-hero-visual">
                <div className="cs-hero-phones">
                  <span className="cs-hero-media cs-accent-bar cs-hero-accent-left hidden sm:block" />
                  <span className="cs-hero-media cs-accent-bar cs-hero-accent-right hidden sm:block" />
                  <div className="cs-hero-media cs-hero-phone cs-device-frame">
                    <Image
                      src={`${ASSET_BASE}/hero-login.png`}
                      alt="Pantalla de login Qik Banco Digital"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 40vw, 200px"
                      priority
                    />
                  </div>
                  <div className="cs-hero-media cs-hero-phone cs-device-frame">
                    <Image
                      src={`${ASSET_BASE}/hero-prestamos.png`}
                      alt="Pantalla de préstamos Qik Banco Digital"
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
            Ingresé al equipo de Qik Banco Digital durante la fase de creación
            de marca visual, sin un producto existente.
          </p>
          <div className="space-y-6 type-case-body-muted">
            <p className="cs-animate-text">
              Iniciamos el diseño y desarrollo de la aplicación desde cero
              utilizando una marca blanca como base, con el objetivo de
              evolucionar rápidamente hacia la identidad final de Qik.
            </p>
            <p className="cs-animate-text">
              Mi rol comenzó enfocado en UI, pero rápidamente asumí la
              responsabilidad de definir el look &amp; feel completo de la app,
              asegurando consistencia visual mientras el producto crecía.
            </p>
            <p className="cs-animate-text">
              El reto era claro: diseñar una experiencia bancaria digital
              accesible, rápida y sencilla, pensada para bancarizar sectores que
              tradicionalmente habían estado fuera del sistema financiero.
            </p>
          </div>
        </div>
      </section>

      {/* Showcase 3 phones */}
      <section className="cs-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[90rem] cs-surface-block">
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-start md:gap-10 lg:gap-12">
            {[
              { src: "showcase-productos", alt: "Pantalla Tus Productos" },
              { src: "showcase-clients", alt: "Pantalla de clientes" },
              { src: "showcase-tarjeta", alt: "Pantalla tarjeta de crédito" },
            ].map(({ src, alt }, index) => (
              <div
                key={src}
                className={`cs-animate-stagger-item relative aspect-[9/19] w-full max-w-[275px] overflow-hidden rounded-2xl ${
                  index === 1 ? "md:mt-16" : ""
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

      {/* Desafío + Rol */}
      <section className="cs-section mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-4">
            <div className="cs-animate-badge">
              <CaseStudyBadge>El desafío</CaseStudyBadge>
            </div>
            <ul className="list-disc space-y-2 pl-6 type-case-body">
              {[
                "No existía una aplicación previa.",
                "El equipo estaba diseñando y desarrollando en paralelo.",
                "Cada diseñador tomaba decisiones visuales distintas.",
                "La colaboración con desarrollo era limitada.",
              ].map((item) => (
                <li key={item} className="cs-animate-stagger-item">
                  {item}
                </li>
              ))}
            </ul>
            <p className="cs-animate-text type-case-body">
              Esto hacía que la velocidad fuera lenta, el retrabajo constante y
              la experiencia visual inconsistente.
            </p>
          </div>

          <div className="space-y-4">
            <div className="cs-animate-badge">
              <CaseStudyBadge>Mi rol</CaseStudyBadge>
            </div>
            <ul className="list-disc space-y-2 pl-6 type-case-body">
              {[
                "Liderazgo visual del producto.",
                "Definición del look & feel de la app.",
                "Creación de style guides y UI Kit inicial.",
                "Revisión de entregables de UI.",
                "Impulso estratégico para la creación del Design System.",
              ].map((item) => (
                <li key={item} className="cs-animate-stagger-item">
                  {item}
                </li>
              ))}
            </ul>
            <p className="cs-animate-title type-case-lead">
              Más que ejecutar pantallas, mi enfoque estuvo en construir una
              base que permitiera escalar el producto.
            </p>
          </div>
        </div>
      </section>

      {/* Full width banner */}
      <section className="cs-section px-4 sm:px-6 lg:px-8">
        <div className="cs-animate-media cs-surface-media relative mx-auto aspect-[1440/504] max-w-[90rem] overflow-hidden">
          <Image
            src={`${ASSET_BASE}/banner-full.png`}
            alt="Paleta de colores del sistema visual Qik"
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
              El look &amp; feel se construyó a partir de principios claros:
            </p>
            <ul className="list-disc space-y-2 pl-6 type-case-body">
              {[
                "Jerarquía visual para facilitar la lectura y navegación.",
                "Contraste y uso del color para guiar la atención.",
                "Spacing consistente para crear aire y claridad.",
                "Patrones repetibles que redujeran fricción cognitiva.",
                "Microcopys visuales que acompañaran la interacción.",
              ].map((item) => (
                <li key={item} className="cs-animate-stagger-item">
                  {item}
                </li>
              ))}
            </ul>
            <div className="space-y-3 type-case-body">
              <p className="cs-animate-text">
                Busqué que la aplicación transmitiera tres sensaciones
                principales:
              </p>
              <p className="cs-animate-text type-case-emphasis">
                Confianza · Modernidad · Simplicidad
              </p>
              <p className="cs-animate-text">
                Qik debía sentirse ligera, accesible y diferente a la
                experiencia bancaria tradicional.
              </p>
            </div>
          </div>

          <div className="relative mx-auto h-[28rem] w-full max-w-lg">
            <div className="absolute bottom-0 right-0 h-[18rem] w-full cs-surface-card" />
            <span className="cs-accent-bar-sm absolute left-0 top-12" />
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-6">
              {[
                { src: "phones-home", alt: "Home FAB Qik" },
                { src: "phones-pago", alt: "Modal métodos de pago Qik" },
              ].map(({ src, alt }) => (
                <div
                  key={src}
                  className="cs-animate-stagger-item relative aspect-[9/19] w-[9.5rem] overflow-hidden rounded-2xl cs-device-frame sm:w-[11.5rem]"
                >
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

      {/* Tokens collage */}
      <section className="cs-section px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto hidden h-[504px] max-w-[90rem] cs-surface-media overflow-hidden lg:block">
          <Image src={`${ASSET_BASE}/tokens-palette.png`} alt="Tokens de color" width={347} height={125} className="cs-animate-stagger-item absolute left-[115px] top-12" />
          <Image src={`${ASSET_BASE}/tokens-blues.png`} alt="Escala azul" width={360} height={288} className="cs-animate-stagger-item absolute bottom-0 left-[115px]" />
          <Image src={`${ASSET_BASE}/tokens-caution.png`} alt="Componente caution" width={212} height={112} className="cs-animate-stagger-item absolute left-[611px] top-[52px]" />
          <Image src={`${ASSET_BASE}/tokens-info.png`} alt="Componente info" width={212} height={112} className="cs-animate-stagger-item absolute left-[611px] top-[196px]" />
          <Image src={`${ASSET_BASE}/tokens-doc.png`} alt="Componente documento" width={210} height={112} className="cs-animate-stagger-item absolute left-[611px] top-[340px]" />
          <Image src={`${ASSET_BASE}/tokens-orange.png`} alt="Escala naranja" width={360} height={289} className="cs-animate-stagger-item absolute right-[143px] top-0" />
          <Image src={`${ASSET_BASE}/tokens-icons.png`} alt="Iconografía del sistema" width={408} height={120} className="cs-animate-stagger-item absolute bottom-[48px] right-[116px]" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:hidden">
          {[
            "tokens-palette",
            "tokens-blues",
            "tokens-caution",
            "tokens-info",
            "tokens-doc",
            "tokens-orange",
            "tokens-icons",
          ].map((name) => (
            <div
              key={name}
              className="cs-animate-stagger-item cs-surface-thumb relative aspect-[16/10] overflow-hidden"
            >
              <Image
                src={`${ASSET_BASE}/${name}.png`}
                alt=""
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* El impacto */}
      <section className="cs-section mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-36">
        <div className="cs-animate-badge">
          <CaseStudyBadge>El impacto</CaseStudyBadge>
        </div>
        <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,411px)_1fr] lg:gap-24">
          <p className="cs-animate-title type-case-section-title">
            El trabajo en el look &amp; feel no partió de mejorar algo
            existente, sino de construir desde cero una experiencia bancaria
            clara, moderna y accesible.
          </p>
          <div className="space-y-8 type-case-body">
            <p className="cs-animate-text">
              A través de decisiones visuales como jerarquía tipográfica,
              contraste, spacing y patrones repetibles, el producto logró
              transmitir una sensación de confianza y simplicidad desde el
              primer contacto.
            </p>
            <p className="cs-animate-text">
              El equipo comenzó a trabajar con mayor claridad y seguridad visual,
              mientras que la aplicación empezó a destacar por su limpieza y
              coherencia. En redes sociales y conversaciones con usuarios, uno de
              los comentarios más recurrentes ha sido cómo Qik se siente
              sencilla, intuitiva y diferente a la banca tradicional.
            </p>
            <p className="cs-animate-title type-case-lead">
              Más que una interfaz, el diseño ayudó a crear una experiencia
              usable donde lo visual guía naturalmente la interacción.
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
                Ver la aplicación funcionando por primera vez durante el evento
                de lanzamiento es un momento difícil de describir.
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
              Más allá del sistema o la estructura, lo que más me llena es
              escuchar que Qik se percibe simple, clara y bien pensada. Saber que
              algo que diseñé hoy forma parte del día a día de los usuarios
              dominicanos me recuerda por qué hago lo que hago.
            </p>
            <p className="cs-animate-title type-case-lead">
              Para mí, el diseño cobra sentido cuando deja de ser solo una
              pantalla y se convierte en una experiencia que las personas
              realmente usan y valoran.
            </p>
          </div>
        </div>
      </section>

      {/* Next case */}
      <section className="cs-section mx-auto max-w-3xl px-6 py-20 text-center sm:px-8 lg:py-36">
        <p className="cs-animate-title type-case-section-title">
          Este proyecto marcó el inicio de una visión más estructurada del
          diseño dentro del banco.
        </p>
        <div className="cs-animate-text mt-6">
          <Magnetic>
            <Link
              href="/work/cobalt-design-system"
              className="type-case-link inline-flex items-center gap-2 transition-colors hover:text-primary"
            >
              Descubre cómo esta base evolucionó hacia la creación de Cobalt
              Design System
            </Link>
          </Magnetic>
        </div>
      </section>
    </article>
  );
}
