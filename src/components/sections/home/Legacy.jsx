import Image from "next/image";
import ButtonLink from "@/components/layout/common/ButtonLink";
import { getCurrentDictionary } from "@/i18n/get-dictionary";

export default async function Legacy({ data, variant = "default" }) {
  const { ui } = await getCurrentDictionary();
  return (
    <section
      className={`${variant === "about" ? "bg-white text-[#1B1B1B]" : "bg-night text-white"} py-(--band-space) text-center`}
    >
      <div className="container flex flex-col items-center">
        <div
          data-observe
          className="legacy-logo relative h-(--logo-h) overflow-hidden [--logo-h:min(110px,calc((100vw-100px)/2.884))] md:[--logo-h:130px] xl:[--logo-h:calc(164*var(--rr))]"
        >
          <Image
            src="/images/logo.png"
            alt="Lincoln"
            width={600}
            height={208}
            className={`absolute start-0 top-0 h-full w-[calc(var(--logo-h)*2.884)] max-w-none ${variant === "about" && "invert"}`}
          />
        </div>
        <h2
          data-reveal
          className="mt-7.5 title lg:mt-10 xl:mt-[calc(115*var(--rr))] 2xl:mt-12.5 3xl:mt-17.5"
        >
          {data.title}
        </h2>
        <div
          data-reveal
          className="mt-[18px] max-w-[836px] text-sm leading-[26px] sm:text-[15px] xl:max-w-[calc(836*var(--rr))] xl:text-fluid-16"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
        <div data-reveal className="mt-[32px]">
          <ButtonLink
            data={
              variant === "about"
                ? { label: ui.hearStory, href: "" }
                : { label: data.button_name, href: data.link }
            }
            variant={variant === "about" ? "dark" : "light"}
          />
        </div>
      </div>
    </section>
  );
}
