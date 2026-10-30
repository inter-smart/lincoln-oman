"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "@/components/ui/locale-link";
import ButtonLink from "@/components/layout/common/ButtonLink";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

// Vehicles mega-menu panel (Figma "Component 9" Variant3): model list on the left, the hovered
// model's outlined name, cut-out and actions centred. Sizes are the 1920 frame's, scaled by --rr.
export default function VehicleMenu({ menu }) {
  const [activeId, setActiveId] = useState(menu?.items?.[0]?.id);
  const active = menu?.items?.find((item) => item.id === activeId);

  return (
    <div className="relative container h-[calc(541*var(--rr))] overflow-hidden">
      <ul className="absolute top-[calc(138*var(--rr))] flex flex-col gap-[calc(19*var(--rr))]">
        {menu?.items?.map((item) => (
          <li key={item.id}>
            <NavigationMenuLink
              asChild
              className="flex-row items-center gap-[6px] rounded-none p-0 text-fluid-16 leading-[normal] text-white hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white focus-visible:underline focus-visible:underline-offset-4"
            >
              <Link
                href={item.href}
                onMouseEnter={() => setActiveId(item.id)}
                onFocus={() => setActiveId(item.id)}
              >
                {item.label}
                <Image
                  src="/icons/menu-arrow.svg"
                  alt=""
                  width={9}
                  height={8}
                  style={{ width: 8.13195, height: 7.14222 }}
                  className={`-rotate-90 transition-opacity duration-300 rtl:rotate-90 ${item.id === activeId ? "opacity-100" : "opacity-0"}`}
                />
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>

      <div
        key={activeId}
        className="pointer-events-none absolute inset-x-0 top-0 flex animate-in flex-col items-center duration-500 fade-in"
      >
        <p
          aria-hidden
          className="absolute top-[calc(351*var(--rr))] text-[calc(200*var(--rr))] leading-[1.22] text-transparent uppercase opacity-50 [-webkit-text-stroke:1px_#fff]"
        >
          {active?.label}
        </p>
        <div className="pointer-events-auto relative mt-[calc(204*var(--rr))] flex gap-[22px]">
          <ButtonLink
            data={{ ...menu?.explore, href: active?.href }}
            size="lg"
          />
          <ButtonLink data={menu?.testDrive} size="lg" />
        </div>
        {/* Figma crop box (600:254) and the closed→open smart-animate: the car glides in from the left */}
        {active?.image && (
          <div className="relative mt-[calc(-1*var(--rr))] aspect-[600/254] w-[calc(675*var(--rr))] animate-in overflow-hidden duration-1000 ease-out fade-in slide-in-from-left-[30vw]">
            <Image
              src={active.image.src}
              alt=""
              width={active.image.width}
              height={active.image.height}
              className="absolute start-[-9.33%] top-0 h-full w-[115%] max-w-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}
