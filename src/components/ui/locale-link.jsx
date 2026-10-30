"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { defaultLocale, hasLocale, localizedHref } from "@/i18n/config";

/** Current route locale for client code (falls back to the default outside a [lang] route). */
export function useLocale() {
  const { lang } = useParams();
  return hasLocale(lang) ? lang : defaultLocale;
}

/** next/link that keeps the visitor's language: internal paths get the /en or /ar prefix. */
export default function LocaleLink({ href, ...props }) {
  const locale = useLocale();
  return (
    <Link
      href={typeof href === "string" ? localizedHref(href, locale) : href}
      {...props}
    />
  );
}
