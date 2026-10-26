"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import "lenis/dist/lenis.css";

// Premium inertial scroll (Lenis). Native scroll position is kept, so the sticky header, reveal observer and anchors still work.
// Loaded after first paint to stay out of the LCP path; skipped for reduced-motion users (they keep native scrolling).
// Scrollable overlays (e.g. the menu sheet) opt out with data-lenis-prevent.
export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lenis;
    let cancelled = false;
    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.3,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 0.9,
        autoRaf: true,
        anchors: true,
      });
      lenisRef.current = lenis;
    };
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1));
    const cancelIdle = window.cancelIdleCallback ?? clearTimeout;
    const id = idle(start);
    return () => {
      cancelled = true;
      cancelIdle(id);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // A new page starts at the top; without this an in-flight Lenis tween can fight Next's own scroll reset.
  useEffect(() => {
    if (!window.location.hash)
      lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
