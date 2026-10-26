"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

const nav =
  "inline-flex size-8 items-center justify-center rounded-full text-ink hover:bg-slate hover:text-white focus-visible:bg-slate focus-visible:text-white focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-ember";

export function Calendar({ className, classNames, ...props }) {
  return (
    <DayPicker
      showOutsideDays
      className={cn("p-3", className)}
      classNames={{
        months: "relative flex flex-col",
        month_caption: "flex h-8 items-center justify-center font-display",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between",
        button_previous: nav,
        button_next: nav,
        month_grid: "mt-3 w-full border-collapse",
        weekday: "size-9 text-xs font-normal text-ash",
        day: "p-0 text-center text-sm",
        day_button:
          "size-9 rounded-full text-ink hover:bg-silver/40 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-ember",
        selected: "[&>button]:bg-slate [&>button]:text-white",
        today: "[&>button]:border [&>button]:border-ember",
        outside: "opacity-40",
        disabled: "opacity-30 [&>button]:pointer-events-none",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="size-4" aria-hidden />
          ) : (
            <ChevronRight className="size-4" aria-hidden />
          ),
      }}
      {...props}
    />
  );
}
