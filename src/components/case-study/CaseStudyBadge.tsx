import type { ReactNode } from "react";

type CaseStudyBadgeProps = {
  children: ReactNode;
  variant?: "light" | "on-primary";
};

const variantClassName = {
  light: "border-primary-border text-foreground-subtle",
  "on-primary": "border-on-primary bg-transparent text-on-primary",
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
