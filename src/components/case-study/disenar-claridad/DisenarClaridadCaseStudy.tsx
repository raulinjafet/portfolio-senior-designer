"use client";

import Image from "next/image";
import { useRef } from "react";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyNextMarquee from "@/components/case-study/CaseStudyNextMarquee";
import { useCaseStudyScrollAnimations } from "@/components/case-study/useCaseStudyScrollAnimations";

const ASSET_BASE = "/case-studies/disenar-claridad";

function CaseStudyVideo({
  src,
  type,
}: {
  src: string;
  type: "video/webm" | "video/mp4";
}) {
  return (
    <video
      className="cs-claridad-video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
    >
      <source src={src} type={type} />
    </video>
  );
}

const challengeParagraphs = [
  "Sin producto, sin identidad definida y con una marca blanca como único punto de partida, tuve que diseñar la experiencia bancaria de Qik desde cero.",
  "Mi rol nació enfocado en UI, pero la falta de una dirección visual clara me llevó a asumir la definición completa del look & feel — mientras el producto, el equipo y las expectativas crecían al mismo tiempo.",
  "El reto no era solo visual: había que construir una experiencia accesible, rápida y sencilla, capaz de bancarizar a personas que el sistema financiero tradicional nunca había alcanzado.",
] as const;

const summaryCards = [
  { label: "Rol", value: "UI Design Senior", accent: true },
  { label: "Herramientas", value: "Figma", accent: false },
  { label: "Duración", value: "+4 año y continuamos.", accent: false },
  { label: "Principios", value: "Confianza · Modernidad · Simplicidad", accent: false },
  { label: "Producto", value: "App Qik Banco Digital", accent: false },
  {
    label: "Resultado clave",
    value: "Una base que evolucionó a Cobalt Design System",
    accent: true,
  },
] as const;

const designPrinciples = [
  "Jerarquía visual para facilitar la lectura y navegación.",
  "Contraste y uso del color para guiar la atención.",
  "Spacing consistente para crear aire y claridad.",
  "Patrones repetibles que redujeran fricción cognitiva.",
] as const;

const impactParagraphs = [
  "A través de decisiones visuales como jerarquía tipográfica, contraste, spacing y patrones repetibles, el producto logró transmitir una sensación de confianza y simplicidad desde el primer contacto.",
  "El equipo comenzó a trabajar con mayor claridad y seguridad visual, mientras que la aplicación empezó a destacar por su limpieza y coherencia.",
  "En redes sociales y conversaciones con usuarios, uno de los comentarios más recurrentes ha sido cómo Qik se siente sencilla, intuitiva y diferente a la banca tradicional.",
] as const;

export default function DisenarClaridadCaseStudy() {
  const pageRef = useRef<HTMLElement>(null);
  useCaseStudyScrollAnimations(pageRef);

  return (
    <article ref={pageRef} className="cs-article cs-claridad">
      <CaseStudyHero
        badge="Producto · Identidad · Sistemas"
        title="Transformando identidad visual en una experiencia humana y usable."
        align="center"
        showBack={false}
        showLead={false}
      />

      <section className="cs-section cs-claridad-hero-media" aria-hidden="true">
        <div className="cs-animate-media cs-claridad-hero-media-frame">
          <CaseStudyVideo
            src={`${ASSET_BASE}/hero-video.webm`}
            type="video/webm"
          />
        </div>
      </section>

      <section className="cs-section cs-claridad-section cs-claridad-section--compact-top">
        <div className="cs-claridad-inner cs-claridad-editorial">
          <p className="cs-animate-badge cs-claridad-label">El desafío</p>
          <div className="cs-claridad-copy-stack">
            {challengeParagraphs.map((paragraph) => (
              <p key={paragraph} className="cs-animate-text cs-claridad-copy-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-section cs-claridad-section">
        <div className="cs-claridad-inner">
          <h2 className="cs-animate-title cs-claridad-page-title pb-8">
            Resumen del proyecto.
          </h2>
          <div className="cs-claridad-summary-grid">
            {summaryCards.map(({ label, value, accent }) => (
              <div
                key={label}
                className={`cs-animate-stagger-item cs-claridad-summary-card${
                  accent ? " cs-claridad-summary-card--mint" : ""
                }`}
              >
                <p className="cs-claridad-summary-label">{label}</p>
                <p className="cs-claridad-summary-value">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-section cs-claridad-section cs-claridad-section--showcase">
        <div className="cs-claridad-inner cs-claridad-inner--wide">
          <div className="cs-animate-media cs-claridad-showcase-frame">
            <CaseStudyVideo
              src={`${ASSET_BASE}/showcase-app.webm`}
              type="video/webm"
            />
          </div>
        </div>
      </section>

      <section className="cs-section cs-claridad-section">
        <div className="cs-claridad-inner">
          <div className="cs-claridad-section-heading">
            <h2 className="cs-animate-title cs-claridad-page-title">
              Principios detrás del look &amp; feel
            </h2>
          </div>

          <div className="cs-claridad-editorial">
            <p className="cs-animate-badge cs-claridad-label">estética funcional</p>
            <div className="cs-claridad-copy-stack">
              <p className="cs-animate-title cs-claridad-copy-lg">
                El look &amp; feel se construyó a partir de principios claros:
              </p>
              <ul className="cs-claridad-dot-list">
                {designPrinciples.map((item) => (
                  <li key={item} className="cs-animate-stagger-item cs-claridad-dot-item">
                    <span className="cs-claridad-dot" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="cs-animate-text cs-claridad-copy-lg pt-2">
                Busqué que la aplicación transmitiera Confianza, Modernidad,
                Simplicidad. Qik debía sentirse ligera, accesible y diferente a la
                experiencia bancaria tradicional.
              </p>
            </div>
          </div>

          <div className="cs-claridad-principles-grid">
            <div>
              <div className="cs-animate-media cs-claridad-principles-media cs-claridad-principles-media--square">
                <Image
                  src={`${ASSET_BASE}/principles-loader.png`}
                  alt="Pantalla de tarjeta de crédito en la app Qik"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 407px"
                />
              </div>
              <p className="cs-animate-text cs-claridad-principles-caption">
                Se diseñó una interfaz limpia e intuitiva; para garantizar la
                usabilidad, con algo claro en mente, estamos diseñando un banco.
              </p>
            </div>

            <div>
              <div className="cs-animate-media cs-claridad-principles-media cs-claridad-principles-media--square">
                <CaseStudyVideo
                  src={`${ASSET_BASE}/principles-grid.webm`}
                  type="video/webm"
                />
              </div>
            </div>

            <div>
              <div className="cs-animate-media cs-claridad-principles-media cs-claridad-principles-media--square cs-claridad-principles-media--loader">
                <div className="cs-claridad-loader-phone">
                  <CaseStudyVideo
                    src={`${ASSET_BASE}/principles-social.mp4`}
                    type="video/mp4"
                  />
                </div>
              </div>
              <p className="cs-animate-text cs-claridad-principles-caption">
                Se aplicaron animaciones y microinteracciones en puntos claves para
                asegurar menos ansiedad.
              </p>
            </div>

            <div>
              <div className="cs-animate-media cs-claridad-principles-media cs-claridad-principles-media--tall">
                <Image
                  src={`${ASSET_BASE}/principles-credits.png`}
                  alt="Reconocimientos del diseño de Qik"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 407px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section cs-claridad-section">
        <div className="cs-claridad-inner">
          <div className="cs-claridad-section-heading">
            <h2 className="cs-animate-title cs-claridad-page-title">
              El trabajo en el look &amp; feel no partió de mejorar algo existente,
              sino de construir desde cero una experiencia bancaria clara, moderna y
              accesible.
            </h2>
          </div>

          <div className="cs-claridad-editorial">
            <p className="cs-animate-badge cs-claridad-label">Decisiones de diseño</p>
            <div className="cs-claridad-copy-stack">
              {impactParagraphs.map((paragraph) => (
                <p key={paragraph} className="cs-animate-text cs-claridad-copy-lg">
                  {paragraph}
                </p>
              ))}
              <p className="cs-animate-title cs-claridad-impact-lead">
                Más que una interfaz, el diseño ayudó a crear una experiencia usable
                donde lo visual guía naturalmente la interacción.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section cs-claridad-learning-wrap cs-primary-wrap">
        <div className="cs-claridad-learning">
          <div className="space-y-6">
            <p className="cs-animate-badge cs-claridad-label">El aprendizaje</p>
            <h2 className="overflow-hidden type-case-result-title">
              <span className="cs-animate-line block will-change-transform">
                Ver la aplicación funcionando por primera vez durante el evento de
                lanzamiento es un momento difícil de describir.
              </span>
            </h2>
          </div>
          <div className="cs-claridad-learning-body space-y-2 type-case-body">
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

      <CaseStudyNextMarquee href="/work/cobalt-design-system" />
    </article>
  );
}
