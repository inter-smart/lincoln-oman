import Image from "next/image";
import HeroVideo from "@/components/layout/common/HeroVideo";
import ButtonLink from "@/components/layout/common/ButtonLink";
import HeroCarousel from "@/components/layout/common/HeroCarousel";

export default function Hero({ data }) {
  const slides = data?.items?.length ? data.items : data ? [data] : [];

  return (
    <section
      id="top"
      className="relative h-svh max-h-[1000px] min-h-[560px] overflow-hidden bg-night text-white"
    >
      <HeroCarousel label={data?.title || "Lincoln highlights"}>
        {slides.map((slide, index) => (
          <article
            key={slide.id || index}
            className="relative size-full overflow-hidden"
          >
            {slide.media?.type === "image" && (
              <Image
                src={slide.media.url}
                alt={slide.media.alt || ""}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            )}
            {slide.media?.type === "video" && (
              <>
                {slide.media.poster && (
                  <Image
                    src={slide.media.poster}
                    alt=""
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                )}
                <HeroVideo sources={slide.media.url} />
              </>
            )}
            <Image
              src="/images/home/hero-top-shade.png"
              alt=""
              width={1024}
              height={99}
              priority={index === 0}
              className="absolute inset-x-0 top-0 h-[184px] w-full object-cover"
            />
            <Image
              src="/images/home/hero-bottom-shade.png"
              alt=""
              width={1024}
              height={180}
              priority={index === 0}
              className="absolute inset-x-0 bottom-0 h-[336px] w-full rotate-180 object-cover"
            />
            <div className="absolute inset-x-0 bottom-[61px] container flex flex-col items-center text-center">
              <h1 className="animate-in font-display text-[28px] leading-[1.2] tracking-[2px] duration-1000 fade-in slide-in-from-bottom-6 md:text-[30px] xl:text-fluid-40">
                {slide.title}
              </h1>
              <div className="mt-[26px] animate-in delay-200 duration-1000 fill-mode-backwards fade-in slide-in-from-bottom-6">
                <ButtonLink data={slide.cta} size="lg" arrow="white" />
              </div>
            </div>
          </article>
        ))}
      </HeroCarousel>
    </section>
  );
}
