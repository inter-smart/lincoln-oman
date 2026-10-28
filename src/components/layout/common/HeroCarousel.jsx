"use client";

import { Children } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useCarouselState } from "@/components/layout/common/carousel-controls";

export default function HeroCarousel({
  children,
  label = "Featured vehicles",
}) {
  const [carouselRef, api] = useEmblaCarousel({ align: "start", loop: false });
  const { selected } = useCarouselState(api);
  const slides = Children.toArray(children);

  const scrollTo = (index) => api?.scrollTo(index);

  return (
    <div
      aria-roledescription="carousel"
      aria-label={label}
      ref={carouselRef}
      className="size-full overflow-hidden"
    >
      <div className="flex size-full touch-pan-y touch-pinch-zoom">
        {slides.map((slide, index) => (
          <div
            key={slide.key ?? index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
            className="relative min-w-0 shrink-0 grow-0 basis-full"
          >
            {slide}
          </div>
        ))}
      </div>
      {slides.length > 1 && (
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.key ?? index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={selected === index ? "true" : undefined}
              onClick={() => scrollTo(index)}
              className="flex size-6 items-center justify-center focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-solid"
            >
              <span
                className={`block h-1 rounded-full transition-[width,opacity] duration-300 ${selected === index ? "w-6 bg-white" : "w-2 bg-white/60"}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
