import Image from "next/image";
import ButtonLink from "@/components/layout/common/ButtonLink";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EmblemMark from "@/components/layout/common/EmblemMark";

export default function OfferList({ data }) {
  return (
    <section className="block h-auto w-full py-10 sm:py-[50px_40px] 2xl:py-(--section-space)">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="title">{data?.title}</h1>
          <Select name="location">
            <SelectTrigger
              aria-label={data?.location?.label}
              className="h-11 w-full rounded-sm border-silver/40 bg-white px-4 text-sm text-ink shadow-none data-[placeholder]:text-ink data-[size=default]:h-11 sm:w-[220px] sm:text-[15px] sm:data-[size=default]:h-12 lg:text-sm xl:w-[calc(256*var(--rr))] xl:text-fluid-16 xl:data-[size=default]:h-[max(40px,calc(46*var(--rr)))] [&_svg]:text-ember!"
            >
              <SelectValue placeholder={data?.location?.label} />
            </SelectTrigger>
            <SelectContent
              position="popper"
              align="end"
              className="border-silver/40 bg-white text-ink"
            >
              {data?.location?.options?.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="text-sm focus:bg-silver/20 focus:text-ink sm:text-[15px] lg:text-sm xl:text-fluid-16"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ul className="mt-6 grid gap-5 sm:mt-8 lg:grid-cols-2 xl:mt-[calc(45*var(--rr))] 2xl:gap-[calc(44*var(--rr))]">
          {data?.items?.map((item, index) => (
            <li
              key={item.id}
              data-reveal
              style={{ "--reveal-delay": `${(index % 2) * 0.1}s` }}
              className="relative flex flex-col overflow-hidden rounded-[10px] bg-night text-white sm:flex-row sm:rounded-[15px] 2xl:rounded-[20px]"
            >
              <div className="relative aspect-16/10 shrink-0 sm:aspect-auto sm:w-[54%]">
                <Image
                  src={item.image}
                  alt={item.alt ?? "WaterMark"}
                  fill
                  sizes="(min-width: 1920px) 433px, (min-width: 992px) 27vw, (min-width: 576px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <EmblemMark className="absolute start-[54%] top-1/2 hidden h-[80%] -translate-x-1/2 -translate-y-1/2 bg-[#2A2526] sm:block" />
              <div className="relative flex flex-1 flex-col items-start p-5 sm:py-8 sm:ps-[calc(5%+1.25rem)] xl:py-[calc(40*var(--rr))] xl:pe-[calc(30*var(--rr))] 2xl:ps-[calc(10%+1.25rem)]">
                <div className="font-display text-xl leading-[1.4] whitespace-pre-line sm:text-2xl lg:text-xl 3xl:text-fluid-32">
                  {item.title}
                </div>
                <ul className="mt-4 grid gap-2.5 text-sm sm:text-[15px] lg:text-sm xl:mt-[calc(25*var(--rr))] xl:gap-[calc(14*var(--rr))] 3xl:text-fluid-16">
                  {item.details?.map((detail) => (
                    <li key={detail} className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="size-1.5 shrink-0 rounded-full bg-ember"
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  data={item.cta}
                  variant="light"
                  className="mt-6 xl:mt-[calc(58*var(--rr))]"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
