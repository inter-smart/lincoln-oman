import Image from "next/image";
import CenterCarousel from "@/components/layout/common/CenterCarousel";
import { getCurrentDictionary } from "@/i18n/get-dictionary";

export default async function ModelVariants({ items, word }) {
  const { ui } = await getCurrentDictionary();
  return (
    <section
      id="variants"
      className="scroll-mt-(--spy-offset,96px) overflow-hidden py-(--section-space)"
    >
      <h2 data-reveal className="container text-center title text-ink">
        {ui.modelVariants}
      </h2>
      <CenterCarousel
        label={ui.modelVariants}
        startIndex={Math.min(1, items.length - 1)}
        className="mt-6 [--arrow-inset:16px] xl:mt-[calc(50*var(--rr))]"
        slideClassName="basis-[70%] sm:basis-[55%] lg:basis-[46.2%]"
        arrowClassName="top-1/2 text-ink sr-only focus-visible:not-sr-only focus-visible:absolute"
      >
        {items.map((item) => (
          <div key={item.id} className="relative">
            <div className="text-center font-display text-lg leading-[1.2] whitespace-pre-line text-ink opacity-0 transition-opacity duration-500 group-data-active/slide:opacity-100 sm:text-2xl xl:text-fluid-30">
              {item.name}
            </div>
            <div className="relative mt-6 xl:mt-[calc(53*var(--rr))]">
              <span
                aria-hidden
                className="absolute inset-x-[-20%] top-[10%] text-center font-sans text-[clamp(36px,10.42vw,200px)] leading-none font-extralight tracking-[0.04em] text-transparent uppercase opacity-0 transition-opacity duration-500 [-webkit-text-stroke:1px_#C9C9C9] group-data-active/slide:opacity-50 before:absolute before:inset-[auto_0_0_0] before:z-1 before:h-[70%] before:w-full before:bg-linear-to-t before:from-white before:to-transparent before:content-['']"
              >
                {word}
              </span>
              <div className="relative z-1 aspect-887/563 w-full scale-[0.6] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-active/slide:scale-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 992px) 46vw, 70vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </CenterCarousel>
    </section>
  );
}
