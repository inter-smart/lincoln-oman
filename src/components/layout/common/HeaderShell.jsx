"use client";

import { useEffect, useState } from "react";

export default function HeaderShell({ children }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const header = document.querySelector("header");
    let lastScrollY = Math.max(window.scrollY, 0);
    let targetHide = 0;
    let currentHide = 0;
    let animationFrame = 0;

    const render = () => {
      if (!header) return;
      currentHide += (targetHide - currentHide) * 0.16;

      if (Math.abs(targetHide - currentHide) < 0.2) {
        currentHide = targetHide;
        animationFrame = 0;
      } else {
        animationFrame = window.requestAnimationFrame(render);
      }

      header.style.transform = `translate3d(0, ${-currentHide}px, 0)`;
      header.style.willChange = "transform";
      const visibleHeaderHeight = Math.max(
        0,
        (header.offsetHeight ?? 0) - currentHide,
      );
      document.documentElement.style.setProperty(
        "--header-visible-h",
        `${visibleHeaderHeight}px`,
      );
    };

    const update = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const headerHeight = header?.offsetHeight ?? 0;

      setScrolled(currentScrollY > 10);

      if (currentScrollY <= 10) {
        targetHide = 0;
      } else {
        const difference = currentScrollY - lastScrollY;
        targetHide = Math.max(
          0,
          Math.min(headerHeight, targetHide + difference),
        );
      }

      lastScrollY = currentScrollY;
      document.documentElement.style.setProperty(
        "--header-h",
        `${header?.offsetHeight ?? 0}px`,
      );

      if (!animationFrame)
        animationFrame = window.requestAnimationFrame(render);
    };
    const observer = header ? new ResizeObserver(update) : null;
    if (header) observer.observe(header);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (header) {
        header.style.removeProperty("transform");
        header.style.removeProperty("will-change");
      }
      document.documentElement.style.removeProperty("--header-h");
      document.documentElement.style.removeProperty("--header-visible-h");
    };
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="group/header fixed inset-x-0 top-0 z-100 text-white transition-[background-color,padding] duration-500 data-scrolled:bg-night/95 data-scrolled:backdrop-blur-md max-lg:h-25"
    >
      {children}
    </header>
  );
}
