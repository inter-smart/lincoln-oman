"use client";

import { useEffect, useRef } from "react";
import { Fancybox } from "@fancyapps/ui/dist/fancybox/";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

// Opens the server-rendered `[data-fancybox]` links inside it in a Fancybox lightbox (images and videos).
export default function GalleryLightbox({ children, className }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    // Hash off: the URL hash belongs to the in-page tab bar
    Fancybox.bind(root, "[data-fancybox]", { Hash: false });
    return () => {
      Fancybox.unbind(root);
      Fancybox.close();
    };
  }, []);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
