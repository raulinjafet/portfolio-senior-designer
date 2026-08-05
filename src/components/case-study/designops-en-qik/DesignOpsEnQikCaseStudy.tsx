"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyNextMarquee from "@/components/case-study/CaseStudyNextMarquee";
import CaseStudyVideo from "@/components/case-study/CaseStudyVideo";
import { useCaseStudyScrollAnimations } from "@/components/case-study/useCaseStudyScrollAnimations";

const ASSET_BASE = "/case-studies/designops-en-qik";

type SummaryCard = {
  id: string;
  label: string;
  value: string;
  accent: boolean;
};

export default function DesignOpsEnQikCaseStudy() {
  const t = useTranslations("caseStudies.designops");
  const pageRef = useRef<HTMLElement>(null);
  useCaseStudyScrollAnimations(pageRef);

  const challengeParagraphs = t.raw("challengeParagraphs") as string[];
  const summaryCards = t.raw("summaryCards") as SummaryCard[];
  const structureItems = t.raw("structureItems") as string[];
  const decisionsParagraphs = t.raw("decisionsParagraphs") as string[];
  const impactItems = t.raw("impactItems") as string[];
  const learningParagraphs = t.raw("learningParagraphs") as string[];

  return (
    <article ref={pageRef} className="cs-article cs-designops">
      <CaseStudyHero
        badge={t("hero.badge")}
        title={t("hero.title")}
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
          <p className="cs-animate-badge cs-designops-label">{t("labels.challenge")}</p>
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
            {t("labels.summary")}
          </h2>
          <div className="cs-designops-summary-grid">
            {summaryCards.map(({ id, label, value, accent }) => (
              <div
                key={id}
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
              {t("structureSectionTitle")}
            </h2>
          </div>

          <div className="cs-designops-editorial">
            <p className="cs-animate-badge cs-designops-label">
              {t("structureLabel")}
            </p>
            <div className="cs-designops-copy-stack">
              <p className="cs-animate-title cs-designops-copy-lg">
                {t("structureIntro")}
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
                {t("structureClosing")}
              </p>
            </div>
          </div>

          <div className="cs-designops-principles-grid">
            <div>
              <div className="cs-animate-media cs-designops-principles-media cs-designops-principles-media--square">
                <Image
                  src={`${ASSET_BASE}/image-point-figma.png`}
                  alt={t("gridAlts.diagram")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 407px"
                />
              </div>
              <p className="cs-animate-text cs-designops-principles-caption">
                {t("gridCaptions.organization")}
              </p>
            </div>

            <div>
              <div className="cs-animate-media cs-designops-principles-media cs-designops-principles-media--square">
                <Image
                  src={`${ASSET_BASE}/name-pages-into-files.png`}
                  alt={t("gridAlts.nomenclature")}
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
                  alt={t("gridAlts.fileList")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 407px"
                />
              </div>
              <p className="cs-animate-text cs-designops-principles-caption">
                {t("gridCaptions.projects")}
              </p>
            </div>

            <div>
              <div className="cs-animate-media cs-designops-principles-media cs-designops-principles-media--tall">
                <Image
                  src={`${ASSET_BASE}/organizacion-proyectos-archivos.png`}
                  alt={t("gridAlts.orgProjects")}
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
              {t("decisionsSectionTitle")}
            </h2>
          </div>

          <div className="cs-designops-editorial">
            <p className="cs-animate-badge cs-designops-label">{t("decisionsLabel")}</p>
            <div className="cs-designops-copy-stack">
              {decisionsParagraphs.map((paragraph) => (
                <p key={paragraph} className="cs-animate-text cs-designops-copy-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section cs-designops-section cs-designops-section--showcase">
        <div className="cs-designops-inner cs-designops-inner--wide">
          <div className="cs-animate-media cs-designops-showcase-frame">
            <Image
              src={`${ASSET_BASE}/showcase-figma-qik.png`}
              alt={t("showcaseAlt")}
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
              {t("impactSectionTitle")}
            </h2>
          </div>

          <div className="cs-designops-editorial">
            <p className="cs-animate-badge cs-designops-label">{t("impactLabel")}</p>
            <div className="cs-designops-copy-stack">
              <div className="cs-impact-list">
                {impactItems.map((item, index) => (
                  <div key={item} className="cs-animate-stagger-item cs-impact-row">
                    <span className="shrink-0 type-case-impact-num">{index + 1}.</span>
                    <p className="type-case-impact-text">{item}</p>
                  </div>
                ))}
              </div>
              <p className="cs-animate-title cs-designops-impact-quote">
                {t("impactQuote")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section cs-designops-learning-wrap cs-primary-wrap">
        <div className="cs-designops-learning">
          <div className="space-y-6">
            <p className="cs-animate-badge cs-designops-label">{t("labels.learning")}</p>
            <h2 className="overflow-hidden type-case-result-title">
              <span className="cs-animate-line block will-change-transform">
                {t("learningTitle")}
              </span>
            </h2>
          </div>
          <div className="cs-designops-learning-body space-y-2 type-case-body">
            {learningParagraphs.map((paragraph) => (
              <p key={paragraph} className="cs-animate-text">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <CaseStudyNextMarquee href="/work/disenar-claridad-desde-cero" />
    </article>
  );
}
