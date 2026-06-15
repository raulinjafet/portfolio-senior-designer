import type { ReactNode } from "react";

type CaseStudyBadgeProps = {
  children: ReactNode;
  variant?: "light" | "on-primary";
};

const variantClassName = {
  light: "cs-badge cs-badge--light",
  "on-primary": "cs-badge cs-badge--on-primary",
} as const;

export default function CaseStudyBadge({
  children,
  variant = "light",
}: CaseStudyBadgeProps) {
  return (
    <span
      className={`type-case-badge inline-flex rounded-full border-2 px-4 py-2 ${variantClassName[variant]}`}
    >
      {children}
    </span>
  );
}
