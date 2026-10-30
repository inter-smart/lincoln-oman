"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR =
  "[data-reveal]:not([data-visible]), [data-observe]:not([data-visible])";

// One observer for the whole page: marks [data-reveal] / [data-observe] elements visible once they scroll in.
// Sections stay server components — they only add the attribute; the motion lives in globals.css.
// A MutationObserver also picks up nodes React mounts later, so a remount never leaves content hidden.
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.dataset.visible = "";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    const observeAll = () =>
      document.querySelectorAll(SELECTOR).forEach((el) => observer.observe(el));
    const mutations = new MutationObserver(observeAll);

    observeAll();
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
