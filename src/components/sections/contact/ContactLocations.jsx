import { cn } from "@/lib/utils";
import ButtonLink from "@/components/layout/common/ButtonLink";
import CardCarousel from "@/components/layout/common/CardCarousel";
import { getCurrentDictionary } from "@/i18n/get-dictionary";

// `contact_addresses` is the raw /contact-us list; `address` is CMS HTML (one block span per line).
export default async function ContactLocations({ contact_addresses }) {
  const { common, ui } = await getCurrentDictionary();
  return (
    <section className="h-auto w-full bg-[#231F20] py-10 text-white sm:py-15 lg:py-17.5 2xl:py-21.25 3xl:py-25">
      <div className="container">
        <CardCarousel
          label={ui.showrooms}
          arrows
          arrowClassName="top-1/2 -translate-y-1/2 rounded-full bg-night/80 hidden"
          className="[--arrow-inset:-12px] [--slide-gap:0px]"
          slideClassName="basis-full sm:basis-1/2 lg:basis-1/3"
        >
          {contact_addresses.map((item, index) => (
            <div
              key={item.id}
              data-reveal
              style={{ "--reveal-delay": `${index * 0.1}s` }}
              className={cn(
                "h-full sm:ps-8 xl:ps-10 2xl:ps-12.5 3xl:ps-[calc(60*var(--rr))]",
                index === 0
                  ? "ps-0 ps-0! sm:ps-0"
                  : "border-white/15 sm:border-s",
              )}
            >
              <h2 className="font-display text-xl sm:text-lg lg:text-lg 2xl:text-2xl 3xl:text-3xl">
                {item.title}
              </h2>
              <address className="mt-4 text-sm leading-[1.7] not-italic sm:text-sm 2xl:mt-5 2xl:text-base">
                <div dangerouslySetInnerHTML={{ __html: item.address }} />
                <span className="mt-3 block xl:mt-[calc(14*var(--rr))]">
                  {common.phone}:{" "}
                  <a
                    href={`tel:${item.phone}`}
                    className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white focus-visible:outline-solid"
                  >
                    <bdi>{item.phone}</bdi>
                  </a>
                </span>
                <span className="block">
                  {common.email}:{" "}
                  <a
                    href={`mailto:${item.email}`}
                    className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white focus-visible:outline-solid"
                  >
                    <bdi>{item.email}</bdi>
                  </a>
                </span>
              </address>
              <ButtonLink
                isExternal={true}
                data={{ label: ui.getDirection, href: item.direction }}
                className="mt-3.75 2xl:mt-[calc(40*var(--rr))]"
              />
            </div>
          ))}
        </CardCarousel>
      </div>
    </section>
  );
}
