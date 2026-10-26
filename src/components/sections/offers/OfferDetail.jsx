import Image from "next/image";

// Single offer: title, expiry, copy and eligibility list beside the offer photo.
export default function OfferDetail({ data }) {
  return (
    <section className="pb-(--section-space)">
      <div className="container">
        <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-2 xl:gap-[calc(80*var(--rr))]">
          <div data-reveal>
            <h2 className="title">{data?.title}</h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-ember sm:text-[15px] xl:mt-[calc(15*var(--rr))] xl:text-fluid-16">
              <span aria-hidden className="size-1 rounded-full bg-ember" />
              {data?.expiry}
            </p>
            <div className="mt-4 grid gap-4 text-sm leading-[1.8] text-ink sm:text-[15px] xl:mt-[calc(25*var(--rr))] xl:text-fluid-16">
              {data?.description?.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-base text-ink sm:text-lg xl:mt-[calc(40*var(--rr))] xl:gap-x-[calc(30*var(--rr))] xl:text-fluid-20">
              {data?.details?.map((detail) => (
                <li key={detail} className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className="size-1.5 shrink-0 rounded-full bg-ember"
                  />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
          <div
            data-reveal
            style={{ "--reveal-delay": "0.1s" }}
            className="relative aspect-810/415 overflow-hidden rounded-[10px] sm:rounded-[15px] 2xl:rounded-[20px]"
          >
            <Image
              src={data?.image?.src}
              alt={data?.image?.alt ?? ""}
              fill
              sizes="(min-width: 1920px) 810px, (min-width: 992px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
