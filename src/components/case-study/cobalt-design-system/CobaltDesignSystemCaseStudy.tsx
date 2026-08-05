"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyNextMarquee from "@/components/case-study/CaseStudyNextMarquee";
import CaseStudyVideo from "@/components/case-study/CaseStudyVideo";
import { useCaseStudyScrollAnimations } from "@/components/case-study/useCaseStudyScrollAnimations";

const ASSET_BASE = "/case-studies/cobalt-design-system";

type SummaryCard = {
  id: string;
  label: string;
  value: string;
  accent: boolean;
};

export default function CobaltDesignSystemCaseStudy() {
  const t = useTranslations("caseStudies.cobalt");
  const pageRef = useRef<HTMLElement>(null);
  useCaseStudyScrollAnimations(pageRef);

  const challengeParagraphs = t.raw("challengeParagraphs") as string[];
  const summaryCards = t.raw("summaryCards") as SummaryCard[];
  const principlesItems = t.raw("principlesItems") as string[];
  const alignmentParagraphs = t.raw("alignmentParagraphs") as string[];
  const impactItems = t.raw("impactItems") as string[];
  const learningParagraphs = t.raw("learningParagraphs") as string[];

  return (
    <article ref={pageRef} className="cs-article cs-cobalt">
      <CaseStudyHero
        badge={t("hero.badge")}
        title={t("hero.title")}
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
          <p className="cs-animate-badge cs-cobalt-label">{t("labels.challenge")}</p>
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
            {t("labels.summary")}
          </h2>
          <div className="cs-cobalt-summary-grid">
            {summaryCards.map(({ id, label, value, accent }) => (
              <div
                key={id}
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
              alt={t("showcaseAlt")}
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
              {t("labels.principlesSection")}
            </h2>
          </div>

          <div className="cs-cobalt-editorial">
            <p className="cs-animate-badge cs-cobalt-label">{t("labels.principlesLabel")}</p>
            <div className="cs-cobalt-copy-stack">
              <p className="cs-animate-title cs-cobalt-copy-lg">{t("systemIntro")}</p>
              <ul className="cs-cobalt-dot-list">
                {principlesItems.map((item) => (
                  <li key={item} className="cs-animate-stagger-item cs-cobalt-dot-item">
                    <span className="cs-cobalt-dot" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="cs-animate-text cs-cobalt-copy-lg pt-2">
                {t("systemClosing")}
              </p>
            </div>
          </div>

          <div className="cs-cobalt-principles-grid">
            <div>
              <div className="cs-animate-media cs-cobalt-principles-media cs-cobalt-principles-media--square">
                <Image
                  src={`${ASSET_BASE}/image-spacing-tokens.png`}
                  alt={t("gridAlts.spacing")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 407px"
                />
              </div>
              <p className="cs-animate-text cs-cobalt-principles-caption">
                {t("gridCaptions.spacing")}
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
                  alt={t("gridAlts.colors")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 407px"
                />
              </div>
              <p className="cs-animate-text cs-cobalt-principles-caption">
                {t("gridCaptions.colors")}
              </p>
            </div>

            <div>
              <div className="cs-animate-media cs-cobalt-principles-media cs-cobalt-principles-media--square">
                <Image
                  src={`${ASSET_BASE}/icon-grid.png`}
                  alt={t("gridAlts.icons")}
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
              {t("alignmentSectionTitle")}
            </h2>
          </div>

          <div className="cs-cobalt-editorial">
            <p className="cs-animate-badge cs-cobalt-label">{t("alignmentLabel")}</p>
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
              {t("impactSectionTitle")}
            </h2>
          </div>

          <div className="cs-cobalt-editorial">
            <p className="cs-animate-badge cs-cobalt-label">{t("impactLabel")}</p>
            <div className="cs-cobalt-copy-stack">
              <div className="cs-impact-list">
                {impactItems.map((item, index) => (
                  <div key={item} className="cs-animate-stagger-item cs-impact-row">
                    <span className="shrink-0 type-case-impact-num">{index + 1}.</span>
                    <p className="type-case-impact-text">{item}</p>
                  </div>
                ))}
              </div>
              <p className="cs-animate-text type-case-impact-text pt-4">
                {t("impactIntro")}
              </p>
              <p className="cs-animate-title cs-cobalt-impact-quote">
                &ldquo;{t("quote")}&rdquo;
              </p>
              <p className="cs-animate-text cs-cobalt-impact-attribution">
                {t("quoteAuthor")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section cs-cobalt-learning-wrap cs-primary-wrap">
        <div className="cs-cobalt-learning">
          <div className="space-y-6">
            <p className="cs-animate-badge cs-cobalt-label">{t("labels.learning")}</p>
            <h2 className="overflow-hidden type-case-result-title">
              <span className="cs-animate-line block will-change-transform">
                {t("learningTitle")}
              </span>
            </h2>
          </div>
          <div className="cs-cobalt-learning-body space-y-2 type-case-body">
            {learningParagraphs.map((paragraph) => (
              <p key={paragraph} className="cs-animate-text">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <CaseStudyNextMarquee href="/work/designops-en-qik" />
    </article>
  );
}
