"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyNextMarquee from "@/components/case-study/CaseStudyNextMarquee";
import CaseStudyVideo from "@/components/case-study/CaseStudyVideo";
import { useCaseStudyScrollAnimations } from "@/components/case-study/useCaseStudyScrollAnimations";

const ASSET_BASE = "/case-studies/disenar-claridad";

type SummaryCard = {
  id: string;
  label: string;
  value: string;
  accent: boolean;
};

export default function DisenarClaridadCaseStudy() {
  const t = useTranslations("caseStudies.claridad");
  const pageRef = useRef<HTMLElement>(null);
  useCaseStudyScrollAnimations(pageRef);

  const challengeParagraphs = t.raw("challengeParagraphs") as string[];
  const summaryCards = t.raw("summaryCards") as SummaryCard[];
  const principlesItems = t.raw("principlesItems") as string[];
  const impactParagraphs = t.raw("impactParagraphs") as string[];
  const learningParagraphs = t.raw("learningParagraphs") as string[];

  return (
    <article ref={pageRef} className="cs-article cs-claridad">
      <CaseStudyHero
        badge={t("hero.badge")}
        title={t("hero.title")}
        align="center"
        showBack={false}
        showLead={false}
      />

      <section className="cs-section cs-claridad-hero-media" aria-hidden="true">
        <div className="cs-animate-media cs-claridad-hero-media-frame">
          <CaseStudyVideo
            src={`${ASSET_BASE}/hero-video.webm`}
            type="video/webm"
            className="cs-claridad-video"
          />
        </div>
      </section>

      <section className="cs-section cs-claridad-section cs-claridad-section--compact-top">
        <div className="cs-claridad-inner cs-claridad-editorial">
          <p className="cs-animate-badge cs-claridad-label">{t("labels.challenge")}</p>
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
            {t("labels.summary")}
          </h2>
          <div className="cs-claridad-summary-grid">
            {summaryCards.map(({ id, label, value, accent }) => (
              <div
                key={id}
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
              className="cs-claridad-video"
            />
          </div>
        </div>
      </section>

      <section className="cs-section cs-claridad-section">
        <div className="cs-claridad-inner">
          <div className="cs-claridad-section-heading">
            <h2 className="cs-animate-title cs-claridad-page-title">
              {t("labels.principlesSection")}
            </h2>
          </div>

          <div className="cs-claridad-editorial">
            <p className="cs-animate-badge cs-claridad-label">
              {t("labels.principlesLabel")}
            </p>
            <div className="cs-claridad-copy-stack">
              <p className="cs-animate-title cs-claridad-copy-lg">
                {t("principlesIntro")}
              </p>
              <ul className="cs-claridad-dot-list">
                {principlesItems.map((item) => (
                  <li key={item} className="cs-animate-stagger-item cs-claridad-dot-item">
                    <span className="cs-claridad-dot" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="cs-animate-text cs-claridad-copy-lg pt-2">
                {t("principlesClosing")}
              </p>
            </div>
          </div>

          <div className="cs-claridad-principles-grid">
            <div>
              <div className="cs-animate-media cs-claridad-principles-media cs-claridad-principles-media--square">
                <Image
                  src={`${ASSET_BASE}/principles-loader.png`}
                  alt={t("gridAlts.loader")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 407px"
                />
              </div>
              <p className="cs-animate-text cs-claridad-principles-caption">
                {t("gridCaptions.loader")}
              </p>
            </div>

            <div>
              <div className="cs-animate-media cs-claridad-principles-media cs-claridad-principles-media--square">
                <CaseStudyVideo
                  src={`${ASSET_BASE}/principles-grid.webm`}
                  type="video/webm"
                  className="cs-claridad-video"
                />
              </div>
            </div>

            <div>
              <div className="cs-animate-media cs-claridad-principles-media cs-claridad-principles-media--square cs-claridad-principles-media--loader">
                <div className="cs-claridad-loader-phone">
                  <CaseStudyVideo
                    src={`${ASSET_BASE}/principles-social.mp4`}
                    type="video/mp4"
                    className="cs-claridad-video"
                  />
                </div>
              </div>
              <p className="cs-animate-text cs-claridad-principles-caption">
                {t("gridCaptions.animations")}
              </p>
            </div>

            <div>
              <div className="cs-animate-media cs-claridad-principles-media cs-claridad-principles-media--tall">
                <Image
                  src={`${ASSET_BASE}/principles-credits.png`}
                  alt={t("gridAlts.credits")}
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
              {t("impactSectionTitle")}
            </h2>
          </div>

          <div className="cs-claridad-editorial">
            <p className="cs-animate-badge cs-claridad-label">{t("impactLabel")}</p>
            <div className="cs-claridad-copy-stack">
              {impactParagraphs.map((paragraph) => (
                <p key={paragraph} className="cs-animate-text cs-claridad-copy-lg">
                  {paragraph}
                </p>
              ))}
              <p className="cs-animate-title cs-claridad-impact-lead">
                {t("impactLead")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section cs-claridad-learning-wrap cs-primary-wrap">
        <div className="cs-claridad-learning">
          <div className="space-y-6">
            <p className="cs-animate-badge cs-claridad-label">{t("labels.learning")}</p>
            <h2 className="overflow-hidden type-case-result-title">
              <span className="cs-animate-line block will-change-transform">
                {t("learningTitle")}
              </span>
            </h2>
          </div>
          <div className="cs-claridad-learning-body space-y-2 type-case-body">
            {learningParagraphs.map((paragraph) => (
              <p key={paragraph} className="cs-animate-text">
                {paragraph}
              </p>
            ))}
            <p className="cs-animate-title type-case-lead">{t("learningLead")}</p>
          </div>
        </div>
      </section>

      <CaseStudyNextMarquee href="/work/cobalt-design-system" />
    </article>
  );
}
