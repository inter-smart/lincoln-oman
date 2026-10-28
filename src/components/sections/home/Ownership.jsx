import Image from "next/image";
import ButtonLink from "@/components/layout/common/ButtonLink";

// `data` is home_cms.section_six. `description` is a CMS <ul>; each <li> becomes one row.
// Any bullet <img> the CMS put inside an <li> is stripped: the component draws every bullet itself.
export default function Ownership({ data }) {
  const items = [...data.description.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
    .map(([, html]) => html.replace(/<img[^>]*>/gi, "").trim())
    .filter(Boolean);

  return (
    <section className="relative overflow-hidden bg-night text-white">
      <div className="relative aspect-[1271/999] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[66.2%]">
        <Image
          src={data.image}
          alt={data.alt_tag ?? ""}
          fill
          sizes="(min-width: 992px) 66vw, 100vw"
          className="object-cover"
        />
      </div>
      {/* Lincoln emblem drawn in the band colour over the photo's left edge */}
      <Image
        src="/icons/emblem-cutout.svg"
        alt=""
        width={275}
        height={796}
        className="absolute top-[10.2%] left-[26.41%] hidden h-auto w-[14.34%] rotate-180 lg:block"
      />

      <div className="relative container flex flex-col justify-center py-(--band-space) lg:min-h-[clamp(640px,52vw,1000px)]">
        <div data-reveal>
          <h2 className="title">{data.title}</h2>
          <ul className="mt-[24px] flex flex-col gap-[20px] xl:mt-[calc(32*var(--rr))] xl:gap-[calc(32*var(--rr))]">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-[21px] text-sm leading-[normal] sm:text-base xl:text-fluid-25 2xl:text-[19px]"
              >
                <Image src="/icons/bullet.svg" alt="" width={10} height={10} />
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
          <ButtonLink
            data={{ label: data.button_title, href: data.button_link }}
            className="mt-[40px] xl:mt-[calc(58*var(--rr))]"
          />
        </div>
      </div>
    </section>
  );
}
