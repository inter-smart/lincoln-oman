"use client";

import { Children, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useLocale } from "@/components/ui/locale-link";
import { dirOf } from "@/i18n/config";
import {
  ArrowButton,
  useCarouselState,
} from "@/components/layout/common/carousel-controls";
import { cn } from "@/lib/utils";

// Embla card track. Slides arrive as server-rendered children; only the drag/scroll logic ships as JS.
// slideClassName sets the per-breakpoint slide width; --slide-gap sets the gutter.
// arrows: prev/next buttons, placed with arrowClassName and --arrow-inset (distance from the track edge).
// activeSlideClassName: the selected slide takes this width instead (e.g. wider); arrows, hover, a click or a drag
// select a slide, and slides get data-active so their content can style itself.
export default function CardCarousel({
  children,
  label,
  slideClassName,
  activeSlideClassName,
  className,
  arrows = false,
  arrowClassName,
}) {
  // keepSnaps: one snap per slide while the track overflows (when every slide fits, Embla keeps a single snap)
  const [carouselRef, api] = useEmblaCarousel({
    direction: dirOf(useLocale()),
    align: "start",
    containScroll: activeSlideClassName ? "keepSnaps" : "trimSnaps",
  });
  const { canPrev, canNext } = useCarouselState(
    arrows && !activeSlideClassName ? api : undefined,
  );
  const slides = Children.toArray(children);
  const [current, setCurrent] = useState(0);
  const active = activeSlideClassName ? current : null;
  const snapPerSlide = () =>
    api?.scrollSnapList().length === api?.slideNodes().length;

  // A drag moves the active slide too
  useEffect(() => {
    if (!api || !activeSlideClassName) return;
    const follow = () => {
      if (api.scrollSnapList().length === api.slideNodes().length)
        setCurrent(api.selectedScrollSnap());
    };
    api.on("select", follow);
    return () => api.off("select", follow);
  }, [api, activeSlideClassName]);

  // Hover only resizes (scroll = false): scrolling would slide another card under the cursor and open it too.
  // Resizing alone keeps the hovered card under the cursor.
  const select = (index, scroll = true) => {
    setCurrent(index);
    if (scroll && snapPerSlide()) api.scrollTo(index);
  };
  const step = (delta) => {
    if (activeSlideClassName) select(current + delta);
    else if (delta < 0) api?.scrollPrev();
    else api?.scrollNext();
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className={cn("relative", className)}
    >
      <div ref={carouselRef} className="overflow-hidden">
        <div className="ms-[calc(var(--slide-gap)*-1)] flex touch-pan-y touch-pinch-zoom">
          {slides.map((slide, index) => (
            <div
              key={slide.key ?? index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              data-active={index === active || undefined}
              onClick={activeSlideClassName ? () => select(index) : undefined}
              // Mouse hover opens a slide too (not touch, and not mid-drag with a button held)
              onPointerEnter={
                activeSlideClassName && index !== active
                  ? (event) => {
                      if (event.pointerType === "mouse" && !event.buttons)
                        select(index, false);
                    }
                  : undefined
              }
              className={cn(
                "group/slide min-w-0 shrink-0 grow-0 ps-(--slide-gap)",
                activeSlideClassName &&
                  "transition-[flex-basis] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                activeSlideClassName && index !== active && "cursor-pointer",
                index === active ? activeSlideClassName : slideClassName,
              )}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
      {arrows && (
        <>
          <ArrowButton
            direction="prev"
            disabled={activeSlideClassName ? current === 0 : !canPrev}
            onClick={() => step(-1)}
            className={cn("absolute start-(--arrow-inset)", arrowClassName)}
          />
          <ArrowButton
            direction="next"
            disabled={
              activeSlideClassName ? current === slides.length - 1 : !canNext
            }
            onClick={() => step(1)}
            className={cn("absolute end-(--arrow-inset)", arrowClassName)}
          />
        </>
      )}
    </section>
  );
}
