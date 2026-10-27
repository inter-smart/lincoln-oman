import Image from "next/image";
import CenterCarousel from "@/components/layout/common/CenterCarousel";

export default function ExteriorDesign({ data }) {
  return (
    <section
      id="exterior"
      className="scroll-mt-(--spy-offset,96px) pt-(--section-space)"
    >
      <h2 data-reveal className="container text-center title text-ink">
        {data?.title}
      </h2>
      <CenterCarousel
        label={data?.title}
        startIndex={data?.startIndex}
        dots
        className="mt-6 [--arrow-inset:calc((100%-var(--slide-w))/2+12px)] [--slide-w:88%] xl:mt-[calc(60*var(--rr))] xl:[--arrow-inset:calc((100%-var(--slide-w))/2+49*var(--rr))] xl:[--slide-w:81.67%]"
        slideClassName="basis-(--slide-w)"
        arrowClassName="top-[calc(50%-22px)] h-10 w-12 -translate-y-1/2 bg-white/30 text-white backdrop-blur-sm transition-colors hover:bg-white/50 max-sm:hidden"
      >
        {data?.items?.map((item) => (
          <div
            key={item.id}
            className="relative aspect-1568/700 overflow-hidden rounded-[10px] opacity-50 transition-[opacity,clip-path] duration-700 [clip-path:inset(5.7%_0_round_10px)] group-data-active/slide:opacity-100 group-data-active/slide:[clip-path:inset(0_0_round_10px)] sm:rounded-[15px] 2xl:rounded-[20px]"
          >
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(min-width: 1200px) 82vw, 88vw"
              className="object-cover"
            />
          </div>
        ))}
      </CenterCarousel>
    </section>
  );
}
