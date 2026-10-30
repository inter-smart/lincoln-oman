"use client";

import Image from "next/image";
import useSectionSpy from "@/components/layout/common/useSectionSpy";

const pointer =
  "absolute top-full left-1/2 h-auto w-5.5 -translate-x-1/2 sm:w-7";

// In-page tab bar: sticks under the fixed header, follows the section in view (scroll-spy)
// and slides one dark pill to the active tab. Sections use `scroll-mt-(--spy-offset)` so jumps clear header + bar.
// Before hydration (or without JS) the first tab is styled active and links are plain anchors.
export default function SectionTabs({ items, label }) {
  const { navRef, listRef, setLinkRef, active, indicator, stuck, jump } =
    useSectionSpy(items);
  const ready = indicator !== null;

  return (
    <nav
      ref={navRef}
      aria-label={label}
      data-stuck={stuck || undefined}
      style={{ top: "var(--header-visible-h, var(--header-h, 0px))" }}
      className="sticky z-20 container mt-10 sm:mt-12.5 lg:mt-15 xl:mt-[calc(82*var(--rr))]"
    >
      <ul
        ref={listRef}
        className="relative flex snap-x scrollbar-none gap-2 overflow-x-auto rounded-[10px] bg-[#f7f7f7] p-2 pb-0.5 transition-shadow duration-300 in-data-stuck:shadow-[0_10px_30px_rgb(0_0_0/0.12)] sm:p-3 sm:pb-1.5 xl:justify-between xl:gap-0 xl:ps-[calc(20*var(--rr))] xl:pe-[calc(28*var(--rr))]"
      >
        {ready && (
          <li
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 rounded-full bg-ink transition-[translate,width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              translate: `${indicator.x}px ${indicator.y}px`,
              width: indicator.w,
              height: indicator.h,
            }}
          >
            <Image
              src="/icons/tab-pointer.svg"
              alt=""
              width={28}
              height={9}
              className={pointer}
            />
          </li>
        )}
        {items.map((item, index) => {
          const isActive = index === active;
          return (
            <li key={item.id} className="relative shrink-0 snap-start pb-2.25">
              <a
                ref={setLinkRef(index)}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                onClick={(event) => jump(event, item.href, index)}
                className={`relative flex h-10 items-center rounded-full px-4 text-sm whitespace-nowrap transition-[color,background-color] duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink focus-visible:outline-solid sm:h-11.5 sm:px-6.5 sm:text-base xl:px-[calc(26*var(--rr))] xl:text-fluid-20 ${
                  isActive
                    ? `text-white ${ready ? "" : "bg-ink"}`
                    : "text-ink hover:bg-black/5"
                }`}
              >
                {item.label}
                {isActive && !ready && (
                  <Image
                    src="/icons/tab-pointer.svg"
                    alt=""
                    width={28}
                    height={9}
                    className={pointer}
                  />
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
