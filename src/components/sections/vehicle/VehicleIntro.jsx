import Image from "next/image";
import { listItems, textBeforeList } from "@/lib/list-items";

// `data` is the vehicle's section_one: description is CMS HTML ("paragraph + <ul>"); the component draws the list bullets itself.

export default function VehicleIntro({ data }) {
  const list = listItems(data?.description);
  return (
    <section className="pt-(--section-space)">
      <div className="container grid items-center gap-7.5 lg:grid-cols-[55%_1fr] lg:gap-10 xl:gap-[calc(123*var(--rr))]">
        <div
          data-reveal
          className="relative aspect-895/506 overflow-hidden rounded-[10px] bg-black sm:rounded-[15px] 2xl:rounded-[20px]"
        >
          {data?.video && (
            <video
              src={data.video}
              aria-label={data?.title}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="size-full object-cover"
            />
          )}
        </div>
        <div data-reveal style={{ "--reveal-delay": "0.1s" }}>
          <div className="title text-ink">{data?.title}</div>
          <div
            className="mt-4 max-w-[500px] text-sm leading-[26px] sm:text-[15px] xl:mt-[calc(30*var(--rr))] xl:max-w-[calc(500*var(--rr))] xl:text-fluid-15"
            dangerouslySetInnerHTML={{
              __html: textBeforeList(data?.description),
            }}
          />
          {list.length > 0 && (
            <ul className="mt-6 flex flex-col gap-3 sm:gap-4 xl:mt-[calc(40*var(--rr))] xl:gap-[calc(30*var(--rr))]">
              {list.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 font-display text-lg leading-[1.2] text-ink sm:text-xl xl:gap-[calc(20*var(--rr))] xl:text-fluid-24"
                >
                  <Image
                    src="/icons/breadcrumb-emblem.svg"
                    alt=""
                    width={7}
                    height={19}
                    className="h-[0.8em] w-auto shrink-0"
                  />
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
