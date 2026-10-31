import Image from "next/image";
import LoadMoreLink from "@/components/layout/common/LoadMoreLink";
import GalleryLightbox from "@/components/layout/common/GalleryLightbox";
import { getCurrentDictionary } from "@/i18n/get-dictionary";
import { format } from "@/i18n/format";

const spans = {
  half: "col-span-6 aspect-794/697 sm:col-span-3",
  third: "col-span-2 aspect-514/714",
  wide: "col-span-6 aspect-1624/759",
};

// The CMS sends no tile size, so photos repeat this pattern in order (the Figma layout).
const pattern = ["half", "half", "third", "third", "third", "wide"];

const sizes = {
  half: "(min-width: 576px) 50vw, 100vw",
  third: "33vw",
  wide: "100vw",
};

const radius =
  "overflow-hidden rounded-[10px] md:rounded-[15px] 2xl:rounded-[20px]";

// Gallery page: title, featured video, then the photo grid. Each photo opens in the Fancybox lightbox.
// `loadMore` is { href } while more pages exist, else null.
// `galleries` is the raw /galleries list: one { media_type: "video", video } and many { media_type: "image", image }.
export default async function GalleryGrid({ title, galleries, loadMore }) {
  const { ui } = await getCurrentDictionary();
  const film = galleries.find(
    (item) => item.media_type === "video" && item.video?.path,
  );
  const photos = galleries.filter(
    (item) => item.media_type === "image" && item.image?.path,
  );

  return (
    <section className="py-(--section-space)">
      <div className="container">
        <h1 data-reveal className="title">
          {title}
        </h1>
        {film && (
          <video
            data-reveal
            controls
            playsInline
            preload="none"
            poster={film.video.thumbnail ?? undefined}
            aria-label={ui.galleryFilm}
            className={`mt-6 aspect-1624/705 w-full bg-black object-cover xl:mt-[calc(30*var(--rr))] ${radius}`}
          >
            <source src={film.video.path} type="video/mp4" />
          </video>
        )}
        <GalleryLightbox className="mt-2.5 grid grid-cols-6 gap-2.5 sm:mt-5 md:gap-5 2xl:mt-[calc(45*var(--rr))] 2xl:gap-x-[calc(50*var(--rr))] 2xl:gap-y-[calc(45*var(--rr))]">
          {photos.map((item, index) => {
            const span = pattern[index % pattern.length];
            return (
              <a
                key={item.id}
                href={item.image.path}
                data-fancybox="gallery"
                data-thumb-src={item.image.path}
                aria-label={format(ui.viewImage, { alt: item.image.alt })}
                data-reveal
                style={{ "--reveal-delay": `${(index % 3) * 0.1}s` }}
                className={`group relative block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink focus-visible:outline-solid ${radius} ${spans[span]}`}
              >
                <Image
                  src={item.image.path}
                  alt=""
                  fill
                  sizes={sizes[span]}
                  className="object-cover transition-transform duration-700 group-hocus:scale-105"
                />
              </a>
            );
          })}
        </GalleryLightbox>
        {loadMore && (
          <div className="mt-8 flex justify-center xl:mt-[calc(50*var(--rr))]">
            <LoadMoreLink
              data={{ label: ui.loadMore, href: loadMore.href }}
              variant="dark"
            />
          </div>
        )}
      </div>
    </section>
  );
}
