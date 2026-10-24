import Image from "next/image";
import CardCarousel from "@/components/layout/common/CardCarousel";

export default function CaptionCards({
  id,
  data,
  ratio = "aspect-square",
  arrows = false,
  gap = "xl:[--slide-gap:calc(22*var(--rr))]",
}) {
  const tagline = data?.tagline;
  return (
    <section
      id={id}
      className="scroll-mt-(--spy-offset,96px) bg-night py-(--band-space) text-white"
    >
      <div className="container">
        {tagline ? (
          <div
            data-reveal
            className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between"
          >
            <h2 className="title">{data?.title}</h2>
            <p className="bg-linear-to-r from-[#3C393A] via-[#606060] to-[#3C393A] bg-clip-text font-display text-[28px] leading-[1.4] text-transparent sm:text-[40px] xl:text-[50px] 2xl:text-fluid-80">
              {tagline}
            </p>
          </div>
        ) : (
          <h2 data-reveal className="text-center title">
            {data?.title}
          </h2>
        )}
        <CardCarousel
          label={data?.title}
          arrows={arrows}
          className={`mt-[30px] [--arrow-inset:calc(-80*var(--rr))] [--caption-h:calc(30*var(--rr)+40px)] [--slide-gap:16px] xl:mt-[calc(45*var(--rr))] ${gap}`}
          slideClassName="basis-[70%] sm:basis-[45%] lg:basis-1/3 xl:basis-1/4"
          arrowClassName="top-[calc((100%-var(--caption-h))/2)] hidden -translate-y-1/2 2xl:flex"
        >
          {data?.items?.map((item, index) => (
            <figure
              key={item.id}
              data-reveal
              style={{ "--reveal-delay": `${index * 0.1}s` }}
            >
              <div
                className={`relative ${ratio} overflow-hidden rounded-[10px] sm:rounded-[15px] 2xl:rounded-[20px]`}
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1200px) 25vw, (min-width: 992px) 33vw, 70vw"
                  className="object-cover"
                  style={{ objectPosition: item.image.position }}
                />
              </div>
              <figcaption className="mt-4 font-display text-lg leading-[1.2] sm:text-xl xl:mt-[calc(30*var(--rr))] xl:text-fluid-24">
                {item.title}
              </figcaption>
            </figure>
          ))}
        </CardCarousel>
      </div>
    </section>
  );
}
