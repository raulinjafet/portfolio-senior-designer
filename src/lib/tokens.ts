/** CSS custom property names for runtime access (GSAP, canvas, etc.) */
export const colorTokens = {
  foreground: "--foreground",
  primary: "--primary",
  cursorDefault: "--cursor-default",
  cursorHover: "--cursor-hover",
  cursorProject: "--cursor-project",
} as const;

export type ColorTokenKey = keyof typeof colorTokens;

/** Read a resolved color token from the document root. Client-only. */
export function getColorToken(key: ColorTokenKey): string {
  if (typeof document === "undefined") return "";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(colorTokens[key])
    .trim();
}
