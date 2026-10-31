import Image, { getImageProps } from "next/image";
import Link from "@/components/ui/locale-link";
import HeroVideo from "@/components/layout/common/HeroVideo";
import ButtonLink from "@/components/layout/common/ButtonLink";

// Black fades over the photo; without media the banner stays the plain header colour (bg-night).
const shade =
  "before:absolute before:inset-[auto_0_0_0] before:z-2 before:h-[40%] before:w-full before:bg-linear-to-t before:from-black before:to-transparent before:content-[''] after:absolute after:inset-[0_0_auto_0] after:z-2 after:h-[25%] after:w-full after:bg-linear-to-b after:from-black after:to-transparent after:content-['']";

export default function InnerBanner({ data, as: Title = "h1" }) {
  const title = data.banner_title ?? data.title;
  const alt = data.banner_alt_text ?? data.alt_text;
  const desktopSrc = data.banner || data.banner_mobile;
  const image = { alt, sizes: "100vw", priority: true };
  const desktop = desktopSrc
    ? getImageProps({ ...image, src: desktopSrc, width: 1920, height: 760 })
    : null;
  const mobile =
    data.banner_mobile && data.banner_mobile !== desktopSrc
      ? getImageProps({
          ...image,
          src: data.banner_mobile,
          width: 828,
          height: 760,
        })
      : null;
  const text = data.text ?? data.description;
  const hasMedia = Boolean(data.banner || data.banner_mobile || data.video);
  return (
    <section
      className={`relative z-0 block w-full max-sm:h-95 sm:h-auto ${hasMedia ? shade : ""}`}
    >
      <div className="relative block aspect-1920/760 h-full w-full overflow-hidden bg-night sm:h-auto">
        {(data?.banner || data?.banner_mobile) && (
          <picture className="block size-full">
            {mobile && (
              <source media="(max-width: 639px)" srcSet={mobile.props.srcSet} />
            )}
            <img
              {...desktop.props}
              alt={desktop.props.alt}
              className="size-full object-cover"
            />
          </picture>
        )}
        {data.video && <HeroVideo sources={data.video} />}
      </div>
      {hasMedia && (
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/50 to-transparent"
        />
      )}
      <div className="container">
        <div className="absolute inset-[auto_0_0_0] z-3 my-5 block h-auto w-full px-4 text-center text-white sm:my-7.5 lg:my-10 2xl:my-17.5 3xl:my-20">
          <Title className="font-display text-xl leading-[1.1] font-light sm:text-[25px] 2xl:text-[32px] 3xl:text-[40px]">
            {title}
          </Title>
          {text && (
            <p className="mt-1.5 text-base tracking-[0.05em] sm:text-lg xl:mt-[calc(8*var(--rr))] xl:text-fluid-24">
              {text}
            </p>
          )}
          {data?.link?.label && (
            <Link
              href={data.link.href ?? "#"}
              target="_blank"
              className="mt-2 inline-flex items-center gap-1.5 text-[13px] tracking-[0.05em] underline-offset-4 hover:underline focus-visible:underline sm:text-sm xl:mt-[calc(10*var(--rr))]"
            >
              {data.link.label}
              <Image
                src="/icons/chevron-hero.svg"
                alt=""
                width={7}
                height={4}
                className="-rotate-90 rtl:rotate-90"
              />
            </Link>
          )}
          {data?.actions?.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-3 xl:mt-[calc(30*var(--rr))]">
              {data.actions.map((action) => (
                <ButtonLink key={action.id} data={action} arrow="white" />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
