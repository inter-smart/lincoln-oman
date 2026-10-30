"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { useLocale } from "@/components/ui/locale-link";
import { localeCookie, locales, switchLocalePath } from "@/i18n/config";
import { format } from "@/i18n/format";
import { cn } from "@/lib/utils";

// Longest the overlay may stay if the navigation never settles.
const GIVE_UP_MS = 10000;

// en <-> ar toggle. Remembers the choice in a cookie (the proxy reads it for unprefixed URLs), swaps the
// locale segment of the current URL (query and hash kept) and covers the page with a loader until the new language is ready.
export default function LanguageSwitch({ labels, className }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [switchingTo, setSwitchingTo] = useState(null);

  const target = locales.find((l) => l !== locale);
  const targetName = labels.names[target];

  // Busy until the route is actually in the new language (or the safety timeout below fires).
  const busy = switchingTo !== null && switchingTo !== locale;

  useEffect(() => {
    if (!busy) return;
    const timer = setTimeout(() => setSwitchingTo(null), GIVE_UP_MS);
    return () => clearTimeout(timer);
  }, [busy]);

  function switchLanguage() {
    if (busy) return;
    document.cookie = `${localeCookie}=${target}; path=/; max-age=31536000; samesite=lax`;
    setSwitchingTo(target);
    const { search, hash } = window.location;
    startTransition(() =>
      router.replace(`${switchLocalePath(pathname, target)}${search}${hash}`),
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={switchLanguage}
        disabled={busy}
        lang={target}
        aria-label={format(labels.switchTo, { language: targetName })}
        className={cn(
          "flex h-[24px] items-center gap-[7px] text-[14px] leading-none transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white focus-visible:outline-solid disabled:opacity-60",
          className,
        )}
      >
        <Image src="/icons/globe.svg" alt="" width={15} height={15} />
        <span aria-hidden="true">{targetName}</span>
      </button>
      {busy &&
        createPortal(<SwitchOverlay text={labels.switching} />, document.body)}
    </>
  );
}

function SwitchOverlay({ text }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="lang-overlay fixed inset-0 z-[100] grid place-items-center bg-night/85 text-white backdrop-blur-md"
    >
      <div className="flex flex-col items-center gap-5">
        <span
          aria-hidden="true"
          className="size-10 animate-spin rounded-full border-2 border-white/25 border-t-ember motion-reduce:animate-pulse"
        />
        <p className="text-sm tracking-[0.7px]">{text}</p>
      </div>
    </div>
  );
}
