"use client";

import useSectionSpy from "@/components/layout/common/useSectionSpy";

// Below lg the nav is a sideways strip above the content; from lg it is a sidebar beside it
const isStacked = () => !window.matchMedia("(min-width: 992px)").matches;

// Sticky in-page sidebar (Owners): follows the section in view and slides one dark block to the active link.
// Sections use `scroll-mt-(--spy-offset)` so jumps land clear of the header (and the strip on small screens).
export default function SectionSideNav({ items, label }) {
  const { navRef, listRef, setLinkRef, active, indicator, stuck, jump } =
    useSectionSpy(items, isStacked);
  const ready = indicator !== null;

  return (
    <nav
      ref={navRef}
      aria-label={label}
      data-stuck={stuck || undefined}
      style={{
        top: "var(--side-nav-top, var(--header-visible-h, var(--header-h, 0px)))",
      }}
      className="sticky z-20 -mx-4 bg-white px-4 py-2 transition-shadow duration-300 in-data-stuck:shadow-[0_4px_20px_rgb(0_0_0/0.08)] lg:top-[calc(var(--header-visible-h,var(--header-h,0px))+24px)] lg:[--side-nav-top:calc(var(--header-visible-h,var(--header-h,0px))+24px)] lg:mx-0 lg:self-start lg:bg-transparent lg:p-0 lg:in-data-stuck:shadow-none"
    >
      <ul
        ref={listRef}
        className="relative flex scrollbar-none gap-1 overflow-x-auto rounded-[10px] border border-ink p-1.5 max-lg:bg-white sm:rounded-[15px] lg:flex-col lg:gap-0 lg:overflow-visible lg:p-3 xl:p-[calc(18*var(--rr))] 2xl:rounded-[20px]"
      >
        {ready && (
          <li
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 rounded-lg bg-night transition-[translate,width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              translate: `${indicator.x}px ${indicator.y}px`,
              width: indicator.w,
              height: indicator.h,
            }}
          />
        )}
        {items.map((item, index) => {
          const isActive = index === active;
          return (
            <li key={item.id} className="shrink-0">
              <a
                ref={setLinkRef(index)}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                onClick={(event) => jump(event, item.href, index)}
                className={`relative flex items-center rounded-lg px-4 py-2.5 text-sm whitespace-nowrap transition-[color,background-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink focus-visible:outline-solid sm:text-base lg:px-5 lg:py-4 lg:whitespace-normal xl:px-[calc(30*var(--rr))] xl:py-[calc(26*var(--rr))] xl:text-fluid-20 ${isActive
                    ? `text-white ${ready ? "" : "bg-night"}`
                    : "text-ink hover:bg-black/5"
                  }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
