import Image from "next/image";
import GalleryLightbox from "@/components/layout/common/GalleryLightbox";
import { getCurrentDictionary } from "@/i18n/get-dictionary";
import { format } from "@/i18n/format";

// The CMS sends no tile size: two wide photos, then three tall ones, repeating.
const pattern = ["half", "half", "third", "third", "third"];

const spans = {
  half: "col-span-6 aspect-794/697 sm:col-span-3",
  third: "col-span-2 aspect-514/714",
};

// Photo grid (two wide, then three tall). Each tile opens the Fancybox lightbox with the full image.
export default async function VehicleGallery({ items }) {
  const { ui } = await getCurrentDictionary();
  return (
    <section
      id="gallery"
      className="scroll-mt-(--spy-offset,96px) py-(--section-space)"
    >
      <div className="container">
        <h2 data-reveal className="text-center title text-ink">
          Gallery
        </h2>
        <GalleryLightbox className="mt-6 grid grid-cols-6 gap-2.5 sm:gap-5 xl:mt-[calc(50*var(--rr))] 2xl:gap-x-[calc(50*var(--rr))] 2xl:gap-y-[calc(45*var(--rr))]">
          {items.map((item, index) => {
            const span = pattern[index % pattern.length];
            return (
              <a
                key={item.id}
                href={item.image}
                data-fancybox="gallery"
                data-thumb-src={item.image}
                aria-label={format(ui.viewImage, { alt: item.image_alt_tag })}
                data-reveal
                style={{ "--reveal-delay": `${(index % 3) * 0.1}s` }}
                className={`group relative block overflow-hidden rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink focus-visible:outline-solid sm:rounded-[15px] 2xl:rounded-[20px] ${spans[span]}`}
              >
                <Image
                  src={item.image}
                  alt={item.image_alt_tag}
                  fill
                  sizes={
                    span === "half" ? "(min-width: 576px) 50vw, 100vw" : "33vw"
                  }
                  className="object-cover transition-transform duration-700 group-hocus:scale-105"
                />
              </a>
            );
          })}
        </GalleryLightbox>
      </div>
    </section>
  );
}
