"use client";
import { useEffect, useRef } from "react";

export default function GalleryLightbox({ children, className }) {
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    let Fancybox;
    let cancelled = false;

    Promise.all([
      import("@fancyapps/ui/dist/fancybox/"),
      import("@fancyapps/ui/dist/fancybox/fancybox.css"),
    ]).then(([module]) => {
      if (cancelled) return;
      Fancybox = module.Fancybox;
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
    });

    return () => {
      cancelled = true;
      if (!Fancybox) return;
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
