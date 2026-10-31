import Image from "next/image";
import CardCarousel from "@/components/layout/common/CardCarousel";
import { getCurrentDictionary } from "@/i18n/get-dictionary";

export default async function InteriorExperience({ items }) {
  const { ui } = await getCurrentDictionary();
  return (
    <section
      id="interior"
      className="scroll-mt-(--spy-offset,96px) bg-night py-(--band-space) text-white"
    >
      <div className="container">
        <h2 data-reveal className="text-center title">
          {ui.interiorExperience}
        </h2>
        <CardCarousel
          label={ui.interiorExperience}
          arrows
          className="mt-[30px] [--arrow-inset:calc(-80*var(--rr))] [--slide-gap:16px] xl:mt-[calc(45*var(--rr))] xl:[--slide-gap:calc(22*var(--rr))]"
          slideClassName="basis-[85%] sm:basis-[45%] lg:basis-1/4"
          activeSlideClassName="basis-[85%] sm:basis-[75%] lg:basis-1/2"
          arrowClassName="top-1/2 hidden -translate-y-1/2 2xl:flex"
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              data-reveal
              style={{ "--reveal-delay": `${index * 0.1}s` }}
              className="relative h-90 overflow-hidden rounded-[10px] sm:h-105 sm:rounded-[15px] 2xl:h-[calc(571*var(--rr))] 2xl:rounded-[20px]"
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 992px) 50vw, 85vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/60 to-transparent"
              />
              <div className="absolute inset-x-5 bottom-5 xl:inset-x-[calc(36*var(--rr))] xl:bottom-[calc(35*var(--rr))]">
                <div className="font-display text-xl leading-[1.2] sm:text-2xl xl:text-fluid-30">
                  {item.title}
                </div>
                {item.description && (
                  <div className="mt-1 max-h-0 translate-y-3 overflow-hidden text-sm tracking-[0.05em] opacity-0 transition-[max-height,opacity,transform] duration-500 group-data-active/slide:max-h-12 group-data-active/slide:translate-y-0 group-data-active/slide:opacity-100 group-data-active/slide:delay-200 sm:text-base xl:text-fluid-18">
                    {item.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardCarousel>
      </div>
    </section>
  );
}
