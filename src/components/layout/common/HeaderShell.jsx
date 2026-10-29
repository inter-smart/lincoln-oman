"use client";

import { useEffect, useState } from "react";

// Sticky header: transparent over the hero, solid and compact once the page scrolls.
// Only the scroll flag lives here; the header content is server-rendered and passed in as children.
export default function HeaderShell({ children }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const header = document.querySelector("header");
    const update = () => {
      setScrolled(window.scrollY > 10);
      document.documentElement.style.setProperty(
        "--header-h",
        `${header?.offsetHeight ?? 0}px`,
      );
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
      document.documentElement.style.removeProperty("--header-h");
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
