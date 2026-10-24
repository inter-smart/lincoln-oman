import Image from "next/image";
import { Play } from "lucide-react";
import GalleryLightbox from "@/components/layout/common/GalleryLightbox";

const spans = {
  half: "col-span-6 aspect-794/697 sm:col-span-3",
  third: "col-span-2 aspect-514/714",
};

// Photo grid (two wide, then three tall). Each tile opens the Fancybox lightbox: the full image, or `video` when set.
export default function VehicleGallery({ data }) {
  return (
    <section
      id="gallery"
      className="scroll-mt-(--spy-offset,96px) py-(--section-space)"
    >
      <div className="container">
        <h2 data-reveal className="text-center title text-ink">
          {data?.title}
        </h2>
        <GalleryLightbox className="mt-6 grid grid-cols-6 gap-2.5 sm:gap-5 xl:mt-[calc(50*var(--rr))] 2xl:gap-x-[calc(50*var(--rr))] 2xl:gap-y-[calc(45*var(--rr))]">
          {data?.items?.map((item, index) => (
            <a
              key={item?.id}
              href={item?.video ?? item?.image?.src}
              data-fancybox="gallery"
              data-type={item?.video ? "html5video" : undefined}
              data-thumb-src={item?.image?.src}
              aria-label={`${item?.video ? "Play video" : "View image"}: ${item?.image?.alt}`}
              data-reveal
              style={{ "--reveal-delay": `${(index % 3) * 0.1}s` }}
              className={`group relative block overflow-hidden rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink focus-visible:outline-solid sm:rounded-[15px] 2xl:rounded-[20px] ${spans[item.span] ?? spans.third}`}
            >
              <Image
                src={item.image.src}
                alt="Gallery Box"
                fill
                sizes={
                  item.span === "half"
                    ? "(min-width: 576px) 50vw, 100vw"
                    : "33vw"
                }
                className="object-cover transition-transform duration-700 group-hocus:scale-105"
                style={{ objectPosition: item.image.position }}
              />
              {item.video && (
                <span className="absolute top-1/2 left-1/2 flex size-14 -translate-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm">
                  <Play aria-hidden strokeWidth={1.5} className="size-6" />
                </span>
              )}
            </a>
          ))}
        </GalleryLightbox>
      </div>
    </section>
  );
}
