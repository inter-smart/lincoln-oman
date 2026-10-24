import Image from "next/image";

export default function VehicleIntro({ data }) {
  return (
    <section className="pt-(--section-space)">
      <div className="container grid items-center gap-7.5 lg:grid-cols-[55%_1fr] lg:gap-10 xl:gap-[calc(123*var(--rr))]">
        <div
          data-reveal
          className="relative aspect-895/506 overflow-hidden rounded-[10px] bg-black sm:rounded-[15px] 2xl:rounded-[20px]"
        >
          {data?.video?.src && (
            <video
              src={data?.video?.src}
              poster={data?.video?.poster}
              aria-label={data?.video?.label}
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
          <div className="mt-4 max-w-[500px] text-sm leading-[26px] sm:text-[15px] xl:mt-[calc(30*var(--rr))] xl:max-w-[calc(500*var(--rr))] xl:text-fluid-15">
            {data?.text}
          </div>
          {data?.list?.length > 0 && (
            <ul className="mt-6 flex flex-col gap-3 sm:gap-4 xl:mt-[calc(40*var(--rr))] xl:gap-[calc(30*var(--rr))]">
              {data?.list?.map((item) => (
                <li
                  key={item?.id}
                  className="flex items-center gap-4 font-display text-lg leading-[1.2] text-ink sm:text-xl xl:gap-[calc(20*var(--rr))] xl:text-fluid-24"
                >
                  <Image
                    src="/icons/breadcrumb-emblem.svg"
                    alt="Logo"
                    width={7}
                    height={19}
                    className="h-[0.8em] w-auto shrink-0"
                  />
                  {item?.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
