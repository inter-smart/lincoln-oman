import Image from "next/image";
import ShowcaseStage, {
  ShowcaseVideoCard,
} from "@/components/layout/common/ShowcaseStage";

// Full-bleed model band (Continental / Navigator): photo, headline, outlined model name, two media panels.
// Hovering or clicking the video panel swaps the section background from the photo to the video.
// `data` is one home_cms section (banner_image, title, subtitle, description, banner_title, image, alt_tag, video).
// `videoFirst` puts the video panel before the photo panel.
export default function ModelShowcase({ data, videoFirst = false }) {
  const panels = videoFirst ? ["video", "image"] : ["image", "video"];

  return (
    <section className="relative flex min-h-[clamp(720px,72vw,1385px)] flex-col justify-end overflow-hidden bg-black pt-[160px] pb-[clamp(40px,3.7vw,71px)] text-white">
      <Image
        src={data.banner_image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <ShowcaseStage video={data.video}>
        <span className="absolute inset-x-0 bottom-0 h-full bg-linear-to-b from-transparent to-black opacity-80 md:h-[64%]" />

        <div className="relative container flex flex-col items-center text-center">
          <h2
            data-reveal
            className="font-display text-[32px] leading-[1.2] md:text-[44px] xl:text-fluid-60"
          >
            {data.title}
          </h2>
          <p
            data-reveal
            className="mt-[14px] font-display text-[22px] leading-[1.2] md:text-[30px] xl:text-fluid-40"
          >
            {data.subtitle}
          </p>
          <div
            data-reveal
            className="mt-[3px] text-sm sm:text-[15px] xl:text-fluid-16"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
          <p
            aria-hidden
            data-reveal
            className="mt-[4px] text-[clamp(36px,10.42vw,200px)] leading-[1.22] text-transparent uppercase opacity-50 [-webkit-text-stroke:1px_#fff]"
          >
            {data.banner_title}
          </p>
          <ul className="relative mt-[24px] grid w-full max-w-[1365px] gap-[20px] md:-mt-[min(4.48vw,86px)] md:grid-cols-2 xl:max-w-[calc(1365*var(--rr))] xl:gap-5 2xl:gap-11.25">
            {panels.map((panel, index) => (
              <li
                key={panel}
                data-reveal
                style={{ "--reveal-delay": `${index * 0.12}s` }}
                className="relative aspect-[661/334] overflow-hidden rounded-[10px] bg-black sm:rounded-[15px] 3xl:rounded-[20px]"
              >
                {panel === "image" ? (
                  <Image
                    src={data.image}
                    alt={data.alt_tag}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <ShowcaseVideoCard
                    poster={data.image}
                    video={data.video}
                    label={data.title}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </ShowcaseStage>
    </section>
  );
}
