"use client";

import { Children } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

// Embla card track. Slides arrive as server-rendered children; only the drag/scroll logic ships as JS.
// slideClassName sets the per-breakpoint slide width; --slide-gap sets the gutter.
export default function CardCarousel({ children, label, slideClassName, className }) {
  const [carouselRef] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const slides = Children.toArray(children);

  return (
    <section ref={carouselRef} aria-roledescription="carousel" aria-label={label} className={cn("overflow-hidden", className)}>
      <div className="ms-[calc(var(--slide-gap)*-1)] flex touch-pan-y touch-pinch-zoom">
        {slides.map((slide, index) => (
          <div
            key={slide.key ?? index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
            className={cn("min-w-0 shrink-0 grow-0 ps-(--slide-gap)", slideClassName)}
          >
            {slide}
          </div>
        ))}
      </div>
    </section>
  );
}
