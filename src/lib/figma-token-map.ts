/**
 * Figma Design Tokens → site token mapping.
 * Source: Design-Tokens (A0I8Bj7ILZECjTxgjGvD4W)
 */

export const figmaColorMap = {
  background: "green/0",
  foreground: "text/color_text → neutral/600",
  primary: "layer/color-layer-05 → green/500",
  secondary: "green/700",
  accent: "green/300",
  surface: "layer/color-layer-03 → neutral/100",
  card: "neutral/0",
  hero: "layer/color-layer-02 → neutral/600",
  onHero: "text/color_text_inverse → green/0",
  muted: "text/color_text_accent_neutral → neutral/500",
  primaryBorder: "border/color-border-04 → green/300",
} as const;

/** Figma text style → site .type-* class (Phase 2 aligned) */
export const figmaTypographyMap = {
  "caption/caption_default": {
    class: "type-eyebrow, type-cta-eyebrow, type-case-badge, type-tag",
    size: "14px",
    weight: 500,
    case: "uppercase",
    tracking: "0.7px",
    leading: "16px",
  },
  "heading/heading-2x_large": {
    class: "type-hero-title @ lg (1024px+)",
    size: "72px (--font-size-4xl)",
    weight: 700,
    leading: "115%",
    tracking: "-2px",
  },
  "heading/heading-x_large": {
    class: "type-hero-title @ md, type-cta-title @ lg",
    size: "64px (--font-size-3xl)",
    weight: 700,
    leading: "115%",
    tracking: "-2px",
  },
  "heading/heading-large": {
    class: "type-section-title @ xl, type-cta-title @ md, type-hero-metric @ lg",
    size: "48px (--font-size-2xl)",
    weight: 700,
    leading: "115%",
    tracking: "-1px",
  },
  "heading/heading-medium": {
    class: "type-hero @ base, type-section-title @ md, type-project @ lg, type-cta @ base, type-case-section-title, type-case-result-title, type-case-impact-num",
    size: "32px (--font-size-xl)",
    weight: 700,
    leading: "115%",
    tracking: "-0.5px",
  },
  "heading/heading-small": {
    class: "type-section-title @ base, type-project @ md, type-case-lead",
    size: "24px (--font-size-lg)",
    weight: 700,
    leading: "115%",
    tracking: "-0.5px",
  },
  "body/body_large": {
    class: "type-body @ lg, type-case-impact-text",
    size: "20px (--font-size-md)",
    weight: 400,
    leading: "150%",
  },
  "body/body_medium": {
    class: "type-body @ base, type-case-body, type-case-body-muted, type-footer-*",
    size: "18px (--font-size-sm)",
    weight: 400,
    leading: "150%",
  },
  "body/body_small": {
    class: "type-project-meta, type-project-index",
    size: "14px (--font-size-xs)",
    weight: 400,
    leading: "150%",
  },
  "button/button_medium": {
    class: "type-nav (header CTA), type-cta-link, type-case-link",
    size: "18px (--font-size-sm)",
    weight: 500,
    leading: "150%",
  },
  "button/button_small": {
    class: "type-nav, type-project-meta",
    size: "14px (--font-size-xs)",
    weight: 500,
    leading: "150%",
  },
} as const;

export const figmaSizeScale = {
  xs: 14,
  sm: 18,
  md: 20,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
  "4xl": 72,
} as const;

/** Figma spacing/radius → site layout utilities (Phase 3) */
export const figmaLayoutMap = {
  "spacing/2x-large": {
    token: "--spacing-2x-large",
    value: "128px",
    usage: ".section-padding, .cs-section-content (base)",
  },
  "spacing/3x-large": {
    token: "--spacing-3x-large",
    value: "152px",
    usage: ".cs-section-content @ lg",
  },
  "spacing/small": {
    token: "--spacing-small",
    value: "32px",
    usage: ".container-padding-x, .btn-*-lg padding, .gap-nav",
  },
  "corner_radius/large": {
    token: "--radius-large",
    value: "40px",
    usage: ".radius-large, .cs-surface-media, .project-preview",
  },
  "corner_radius/xlarge": {
    token: "--radius-xlarge",
    value: "88px",
    usage: ".btn-*, .cs-surface-media @ lg",
  },
  "button/secondary_small": {
    class: ".btn-secondary-sm",
    spec: "spec.css → --spec-btn-secondary-*",
  },
  "button/secondary_large": {
    class: ".btn-secondary-lg",
    spec: "spec.css → --spec-btn-secondary-*",
  },
  "button/tertiary_large": {
    class: ".btn-tertiary-lg",
    spec: "spec.css → --spec-btn-tertiary-*",
  },
} as const;
