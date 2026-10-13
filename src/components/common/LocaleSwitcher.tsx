"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeCookieName, type AppLocale } from "@/i18n/routing";

const localeOptions: { code: AppLocale; emoji: string }[] = [
  { code: "en", emoji: "🇺🇸" },
  { code: "es", emoji: "🇪🇸" },
];

export default function LocaleSwitcher() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("localeSwitcher");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const current = localeOptions.find((option) => option.code === locale) ?? localeOptions[0];

  const switchLocale = (nextLocale: AppLocale) => {
    if (nextLocale === locale) return;

    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.replace(pathname, { locale: nextLocale });
  };

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="locale-switcher locale-switcher--dropdown">
      <button
        type="button"
        className="locale-switcher__trigger"
        aria-label={`${t("label")}: ${t(current.code)}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="locale-switcher__emoji" aria-hidden="true">
          {current.emoji}
        </span>
        <span className="locale-switcher__chevron" aria-hidden="true">
          ▾
        </span>
      </button>

      {open ? (
        <ul className="locale-switcher__menu" role="listbox" aria-label={t("label")}>
          {localeOptions.map(({ code, emoji }) => (
            <li key={code} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={code === locale}
                className={`locale-switcher__option${code === locale ? " is-active" : ""}`}
                onClick={() => {
                  setOpen(false);
                  switchLocale(code);
                }}
              >
                <span className="locale-switcher__emoji" aria-hidden="true">
                  {emoji}
                </span>
                <span className="locale-switcher__code">{t(code)}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
