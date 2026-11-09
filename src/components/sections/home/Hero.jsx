import Image from "next/image";
import HeroVideo from "@/components/layout/common/HeroVideo";
import ButtonLink from "@/components/layout/common/ButtonLink";
import HeroCarousel from "@/components/layout/common/HeroCarousel";
import { getCurrentDictionary } from "@/i18n/get-dictionary";

// `slides` is the API's `sliders` list.
export default async function Hero({ slides }) {
  const { ui } = await getCurrentDictionary();
  return (
    <section
      id="top"
      className="relative h-svh max-h-[1000px] min-h-[560px] overflow-hidden bg-night text-white"
    >
      <HeroCarousel label={ui.featuredVehicles}>
        {slides.map((slide, index) => (
          <article
            key={slide.id}
            className="relative size-full overflow-hidden"
          >
            {slide.media_type === "image" && slide.image && (
              <Image
                src={slide.image}
                alt={slide.image_alt_text || slide.title || ""}
                title={slide.image_alt_text || slide.title || ""}
                fill
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : undefined}
                sizes="100vw"
                className="object-cover"
              />
            )}
            {slide.media_type === "video" && (
              <>
                {slide.video_thumbnail_image && (
                  <Image
                    src={slide.video_thumbnail_image}
                    alt={slide.title ?? ""}
                    title={slide.title ?? ""}
                    fill
                    priority={index === 0}
                    fetchPriority={index === 0 ? "high" : undefined}
                    sizes="100vw"
                    className="object-cover"
                  />
                )}
                <HeroVideo sources={slide.video} />
              </>
            )}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[184px] bg-linear-to-b from-black/60 to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[336px] bg-linear-to-t from-black/70 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-[61px] container flex flex-col items-center text-center">
              <h1
                className={`font-display text-[28px] leading-[1.2] tracking-[2px] md:text-[30px] xl:text-fluid-40 ${index === 0 ? "" : "animate-in duration-1000 fade-in slide-in-from-bottom-6"}`}
              >
                {slide.title}
              </h1>
              <div className="mt-[26px] animate-in delay-200 duration-1000 fill-mode-backwards fade-in slide-in-from-bottom-6">
                <ButtonLink
                  data={{ label: slide.action_title, href: slide.action_url }}
                  size="lg"
                  arrow="white"
                />
              </div>
            </div>
          </article>
        ))}
      </HeroCarousel>
    </section>
  );
}
