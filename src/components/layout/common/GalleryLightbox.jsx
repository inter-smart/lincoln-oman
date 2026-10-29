"use client";
import { useEffect, useRef } from "react";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

export default function GalleryLightbox({ children, className }) {
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    Fancybox.bind(root, "[data-fancybox]", {
      Hash: false,
      hideScrollbar: true,
      on: {
        initLayout: () => {
          window.dispatchEvent(new Event("lincoln:overlay-open"));
          document
            .querySelectorAll(".fancybox__container")
            .forEach((container) => {
              container.setAttribute("data-lenis-prevent", "");
            });
        },
        destroy: () => {
          window.dispatchEvent(new Event("lincoln:overlay-close"));
        },
      },
    });
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
