"use client";

import { useEffect, useState } from "react";

// Sticky header: transparent over the hero, solid and compact once the page scrolls.
// Only the scroll flag lives here; the header content is server-rendered and passed in as children.
export default function HeaderShell({ children }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 10);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="group/header fixed inset-x-0 top-0 z-30 text-white transition-[background-color,padding] duration-500 data-scrolled:bg-night/95 data-scrolled:backdrop-blur-md"
    >
      {children}
    </header>
  );
}
