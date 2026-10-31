"use client";
import { Children } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useLabels } from "@/components/layout/common/I18nProvider";
import { useLocale } from "@/components/ui/locale-link";
import { dirOf } from "@/i18n/config";
import { format } from "@/i18n/format";
import {
  ArrowButton,
  useCarouselState,
} from "@/components/layout/common/carousel-controls";
import { cn } from "@/lib/utils";

// Looping Embla track with the active slide centred (Model Variants, Exterior Design).
// The active slide gets data-active, so server-rendered children style themselves with
// `group-data-active/slide:`. Clicking a side slide brings it to the centre.
export default function CenterCarousel({
  children,
  label,
  slideClassName,
  className,
  startIndex = 0,
  arrowClassName,
  dots = false,
}) {
  const labels = useLabels();
  const [carouselRef, api] = useEmblaCarousel({
    direction: dirOf(useLocale()),
    loop: true,
    align: "center",
    containScroll: false,
    startIndex,
  });
  const { selected } = useCarouselState(api);
  const slides = Children.toArray(children);
  const active = selected ?? startIndex;

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className={cn("relative", className)}
    >
      <div ref={carouselRef} className="overflow-hidden">
        <div className="flex touch-pan-y touch-pinch-zoom">
          {slides.map((slide, index) => (
            <div
              key={slide.key ?? index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              data-active={index === active || undefined}
              onClick={
                index === active ? undefined : () => api?.scrollTo(index)
              }
              className={cn(
                "group/slide min-w-0 shrink-0 grow-0",
                index !== active && "cursor-pointer",
                slideClassName,
              )}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
      <ArrowButton
        direction="prev"
        onClick={() => api?.scrollPrev()}
        className={cn("absolute start-(--arrow-inset)", arrowClassName)}
      />
      <ArrowButton
        direction="next"
        onClick={() => api?.scrollNext()}
        className={cn("absolute end-(--arrow-inset)", arrowClassName)}
      />
      {dots && (
        <div className="mt-5 flex justify-center xl:mt-[calc(35*var(--rr))]">
          {slides.map((slide, index) => (
            <button
              key={slide.key ?? index}
              type="button"
              aria-label={format(labels.goToSlide, { n: index + 1 })}
              aria-current={index === active || undefined}
              onClick={() => api?.scrollTo(index)}
              className="group flex size-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-solid"
            >
              <span className="size-[11px] rounded-full bg-[#d9d9d9] transition-colors duration-300 group-aria-current:bg-ember" />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
