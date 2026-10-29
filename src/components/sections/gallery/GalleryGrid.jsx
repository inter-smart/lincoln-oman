import Image from "next/image";
import GalleryLightbox from "@/components/layout/common/GalleryLightbox";

const spans = {
  half: "col-span-6 aspect-794/697 sm:col-span-3",
  third: "col-span-2 aspect-514/714",
  wide: "col-span-6 aspect-1624/759",
};

const sizes = {
  half: "(min-width: 576px) 50vw, 100vw",
  third: "33vw",
  wide: "100vw",
};

const radius =
  "overflow-hidden rounded-[10px] md:rounded-[15px] 2xl:rounded-[20px]";

export default function GalleryGrid({ data }) {
  return (
    <section className="py-(--section-space)">
      <div className="container">
        <h1 data-reveal className="title">
          {data?.title}
        </h1>
        {data?.video && (
          <video
            data-reveal
            controls
            playsInline
            preload="none"
            poster={data.video.poster}
            aria-label={data.video.label}
            className={`mt-6 aspect-1624/705 w-full bg-black object-cover xl:mt-[calc(30*var(--rr))] ${radius}`}
          >
            <source src={data.video.src} type="video/mp4" />
          </video>
        )}
        <GalleryLightbox className="mt-2.5 grid grid-cols-6 gap-2.5 sm:mt-5 md:gap-5 2xl:mt-[calc(45*var(--rr))] 2xl:gap-x-[calc(50*var(--rr))] 2xl:gap-y-[calc(45*var(--rr))]">
          {data?.items?.map((item, index) => (
            <a
              key={item.id}
              href={item.image.src}
              data-fancybox="gallery"
              data-thumb-src={item.image.src}
              aria-label={`View image: ${item.image.alt}`}
              data-reveal
              style={{ "--reveal-delay": `${(index % 3) * 0.1}s` }}
              className={`group relative block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink focus-visible:outline-solid ${radius} ${spans[item.span] ?? spans.third}`}
            >
              <Image
                src={item.image.src}
                alt=""
                fill
                sizes={sizes[item.span] ?? sizes.third}
                className="object-cover transition-transform duration-700 group-hocus:scale-105"
                style={{ objectPosition: item.image.position }}
              />
            </a>
          ))}
        </GalleryLightbox>
      </div>
    </section>
  );
}
