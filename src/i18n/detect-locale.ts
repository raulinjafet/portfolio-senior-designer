import type { NextRequest } from "next/server";
import type { AppLocale } from "./routing";
import { localeCookieName } from "./routing";

const SPANISH_SPEAKING_COUNTRIES = new Set([
  "ES",
  "MX",
  "AR",
  "CO",
  "CL",
  "PE",
  "VE",
  "EC",
  "GT",
  "DO",
  "HN",
  "PY",
  "SV",
  "NI",
  "CR",
  "PA",
  "UY",
  "PR",
  "BO",
  "CU",
  "GQ",
]);

const ENGLISH_PREFERRED_COUNTRIES = new Set([
  "US",
  "CA",
  "GB",
  "AU",
  "NZ",
  "IE",
  "SG",
  "IN",
  "PH",
]);

function parseAcceptLanguage(header: string | null): AppLocale | null {
  if (!header) return null;

  const languages = header
    .split(",")
    .map((part) => {
      const [tag, qValue] = part.trim().split(";q=");
      return {
        tag: tag?.toLowerCase() ?? "",
        q: qValue ? Number.parseFloat(qValue) : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of languages) {
    if (tag.startsWith("es")) return "es";
    if (tag.startsWith("en")) return "en";
  }

  return null;
}

export function detectLocale(request: NextRequest): AppLocale {
  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  if (cookieLocale === "es" || cookieLocale === "en") {
    return cookieLocale;
  }

  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase();
  if (country) {
    if (ENGLISH_PREFERRED_COUNTRIES.has(country)) return "en";
    if (SPANISH_SPEAKING_COUNTRIES.has(country)) return "es";
  }

  const acceptLanguage = parseAcceptLanguage(
    request.headers.get("accept-language"),
  );
  if (acceptLanguage) return acceptLanguage;

  return "es";
}
