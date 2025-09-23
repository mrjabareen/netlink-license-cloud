"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import enMessages from "@/locales/en.json";
import arMessages from "@/locales/ar.json";

type Locale = "en" | "ar";

type Messages = Record<string, string>;

type LocaleContextType = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
  setLocale: (l: Locale) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const ALL_MESSAGES: Record<Locale, Messages> = {
  en: enMessages as Messages,
  ar: arMessages as Messages,
};

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>((() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("locale");
      if (saved === "ar" || saved === "en") return saved;
      // محاولة استنتاج اللغة من المتصفح
      const nav = navigator.language?.startsWith("ar") ? "ar" : "en";
      return nav as Locale;
    }
    return "en";
  })());

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("locale", locale);
      // ضبط اتجاه الصفحة
      document.documentElement.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
      document.documentElement.setAttribute("lang", locale);
    }
  }, [locale]);

  const messages = useMemo(() => ALL_MESSAGES[locale] ?? {}, [locale]);

  const value = useMemo<LocaleContextType>(() => ({
    locale,
    dir: locale === "ar" ? "rtl" : "ltr",
    t: (key: string) => messages[key] ?? key,
    setLocale: (l: Locale) => setLocale(l),
  }), [locale, messages]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
