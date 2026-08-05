"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeCookieName, type AppLocale } from "@/i18n/routing";

const locales: AppLocale[] = ["es", "en"];

export default function LocaleSwitcher() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("localeSwitcher");

  const switchLocale = (nextLocale: AppLocale) => {
    if (nextLocale === locale) return;

    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="locale-switcher" role="group" aria-label={t("label")}>
      {locales.map((item) => (
        <button
          key={item}
          type="button"
          className={`locale-switcher__btn${item === locale ? " is-active" : ""}`}
          aria-pressed={item === locale}
          onClick={() => switchLocale(item)}
        >
          {t(item)}
        </button>
      ))}
    </div>
  );
}
