"use client";

import { useState } from "react";
import Image from "next/image";
import EmblemMark from "@/components/layout/common/EmblemMark";

// Elongated hexagon paint chip from the design (42 × 75)
const CHIP =
  "M9 1.5Q21 0 33 1.5Q35.2 2 35.6 4.2L42 37.5L35.6 70.8Q35.2 73 33 73.5Q21 75 9 73.5Q6.8 73 6.4 70.8L0 37.5L6.4 4.2Q6.8 2 9 1.5Z";

// Colour Variants: the chips swap the car photo and the paint name.
export default function ColorPicker({ items }) {
  const [active, setActive] = useState(0);
  // The paint heading is the backend `title` of the colour entries ("Exterior Paint")
  const label = items[0]?.title;
  const current = items[active];

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[57%_1fr] lg:gap-10 xl:gap-[calc(165*var(--rr))]">
      <div className="relative aspect-880/530">
        {items.map((item, index) => (
          <Image
            key={item.id}
            src={item.image}
            alt={index === active ? `${label} ${item.color_name}` : ""}
            fill
            sizes="(min-width: 992px) 57vw, 100vw"
            className={`object-contain transition-opacity duration-500 ${index === active ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
      <div className="flex flex-col gap-6 lg:flex-row-reverse lg:justify-end lg:gap-[calc(45*var(--rr))]">
        <p aria-live="polite" className="lg:pt-[calc(18*var(--rr))]">
          <span className="block font-display text-2xl leading-[1.2] text-ink sm:text-[28px] xl:text-fluid-32">
            {label}
          </span>
          <span className="mt-1 block text-base tracking-[0.05em] text-ink sm:text-lg xl:mt-[calc(8*var(--rr))] xl:text-fluid-24">
            {current?.color_name}
          </span>
        </p>
        <ul
          aria-label={label}
          className="flex gap-4 lg:flex-col lg:gap-[calc(22*var(--rr))]"
        >
          {items.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                aria-label={item.color_name}
                aria-pressed={index === active}
                onClick={() => setActive(index)}
                className="group relative flex w-8 justify-center rounded-md p-1 focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-solid xl:w-[calc(55*var(--rr))]"
              >
                <svg
                  viewBox="0 0 42 75"
                  aria-hidden
                  className="h-auto w-full overflow-visible"
                >
                  <path d={CHIP} fill={item.color_code} />
                  {/* Outline ring on the selected chip */}
                  <path
                    d={CHIP}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    transform="translate(21 37.5) scale(1.3 1.16) translate(-21 -37.5)"
                    className="text-ink opacity-0 transition-opacity duration-300 group-aria-pressed:opacity-100"
                  />
                </svg>
                <EmblemMark className="absolute top-1/2 left-1/2 w-[27%] -translate-1/2 bg-white/15 opacity-0 mix-blend-difference transition-opacity duration-300 group-aria-pressed:opacity-100" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
