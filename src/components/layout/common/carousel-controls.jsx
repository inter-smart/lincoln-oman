"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const initial = { selected: null, canPrev: false, canNext: false };

// Embla position for the arrow/dot controls; `selected` is null until Embla has mounted.
export function useCarouselState(api) {
  const [state, setState] = useState(initial);

  useEffect(() => {
    if (!api) return;
    const update = () =>
      setState({
        selected: api.selectedScrollSnap(),
        canPrev: api.canScrollPrev(),
        canNext: api.canScrollNext(),
      });
    api.on("init", update).on("select", update).on("reInit", update);
    // "init" may already have fired before this effect subscribed
    const frame = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(frame);
      api.off("init", update).off("select", update).off("reInit", update);
    };
  }, [api]);

  return state;
}

// Thin arrow from the design; position and colour come from className.
export function ArrowButton({ direction, className, ...props }) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className={cn(
        "z-10 flex size-11 items-center justify-center transition-opacity duration-300 focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-solid disabled:opacity-30",
        className,
      )}
      {...props}
    >
      <Icon aria-hidden strokeWidth={1} className="size-6" />
    </button>
  );
}
