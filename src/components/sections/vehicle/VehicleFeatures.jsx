import Image from "next/image";
import CardCarousel from "@/components/layout/common/CardCarousel";
import { getCurrentDictionary } from "@/i18n/get-dictionary";

export default async function VehicleFeatures({ items }) {
  const { ui } = await getCurrentDictionary();
  if (!items?.length) return null;
  return (
    <div className="container pt-8 sm:pt-10 xl:pt-[calc(70*var(--rr))]">
      <CardCarousel
        label={ui.keyFeatures}
        className="[--slide-gap:0px]"
        slideClassName="basis-[72%] sm:basis-1/2 lg:basis-1/4"
      >
        {items.map((item, index) => (
          <div
            key={item?.id}
            data-reveal
            style={{ "--reveal-delay": `${index * 0.1}s` }}
            className={`flex h-full items-center gap-4 xl:gap-[calc(24*var(--rr))] ${
              index > 0
                ? "border-s border-black/10 ps-5 lg:justify-center lg:px-5"
                : "pe-5"
            } ${index === items.length - 1 ? "lg:justify-end" : ""}`}
          >
            <div className="flex aspect-62/57 h-auto w-11 shrink-0 items-center justify-center sm:w-12.5 xl:w-[calc(62*var(--rr))]">
              <Image
                src={item.icon}
                alt=""
                width={62}
                height={57}
                className="size-full object-contain"
              />
            </div>
            <div className="font-display text-lg leading-[1.2] whitespace-pre-line text-ink sm:text-xl 2xl:text-fluid-30">
              {item.title}
            </div>
          </div>
        ))}
      </CardCarousel>
    </div>
  );
}
