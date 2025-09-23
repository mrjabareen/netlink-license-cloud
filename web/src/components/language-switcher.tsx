"use client";

import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  const toggle = () => setLocale(locale === "ar" ? "en" : "ar");

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggle}
      className="gap-2"
      aria-label={locale === "ar" ? "التبديل إلى الإنجليزية" : "Switch to Arabic"}
      title={locale === "ar" ? "التبديل إلى الإنجليزية" : "Switch to Arabic"}
    >
      <Globe className="h-4 w-4" />
      {locale === "ar" ? "EN" : "AR"}
    </Button>
  );
}
