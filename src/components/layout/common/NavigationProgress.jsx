"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLabels } from "@/components/layout/common/I18nProvider";

// Longest the bar may stay if the navigation never settles.
const GIVE_UP_MS = 10000;

const keyOf = (url) => url.pathname + url.search;

// Slim top bar while a link navigation waits for the server. (A loading.js would do this too, but it streams
// a 200 shell first, so a missing page could no longer answer 404 — bad for search engines.)
export default function NavigationProgress() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const labels = useLabels();
  const [target, setTarget] = useState(null);

  const current = pathname + (search ? `?${search}` : "");
  const busy = target !== null && target !== current;

  useEffect(() => {
    function onClick(event) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor = event.target.closest?.("a[href]");
      if (
        !anchor ||
        (anchor.target && anchor.target !== "_self") ||
        anchor.hasAttribute("download")
      )
        return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const next = keyOf(url);
      if (next !== keyOf(window.location)) setTarget(next);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!busy) return;
    const timer = setTimeout(() => setTarget(null), GIVE_UP_MS);
    return () => clearTimeout(timer);
  }, [busy]);

  if (!busy) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="nav-progress pointer-events-none fixed inset-x-0 top-0 z-90 h-0.5"
    >
      <span className="nav-progress-bar block h-full bg-ember" />
      <span className="sr-only">{labels.loading}</span>
    </div>
  );
}
