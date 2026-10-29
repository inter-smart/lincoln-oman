import Image from "next/image";
import ButtonLink from "@/components/layout/common/ButtonLink";
import EmblemMark from "@/components/layout/common/EmblemMark";
import LocationFilter from "@/components/layout/common/LocationFilter";
import { formatExpiry } from "@/lib/format-date";

// `data` is { items: API special_offers, locations: [{ id, name }], locationId, loadMore: { href } | null, basePath };
// `labels` is the static copy from src/data/offers.js.
export default function OfferList({ data, labels }) {
  return (
    <section className="block h-auto w-full py-10 sm:py-[50px_40px] 2xl:py-(--section-space)">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="title">{labels.title}</h1>
          {data?.locations?.length > 0 && (
            <LocationFilter
              locations={data.locations}
              value={data.locationId}
              label={labels.locationLabel}
              allLabel={labels.allLocationsLabel}
              basePath={data.basePath}
            />
          )}
        </div>
        {data?.items?.length > 0 ? (
          <ul className="mt-6 grid gap-5 sm:mt-8 lg:grid-cols-2 xl:mt-[calc(45*var(--rr))] 2xl:gap-[calc(44*var(--rr))]">
            {data.items.map((item, index) => (
              <li
                key={item.id}
                data-reveal
                style={{ "--reveal-delay": `${(index % 2) * 0.1}s` }}
                className="relative flex flex-col overflow-hidden rounded-[10px] bg-night text-white sm:flex-row sm:rounded-[15px] 2xl:rounded-[20px]"
              >
                {item.image?.path && (
                  <>
                    <div className="relative aspect-16/10 shrink-0 sm:aspect-auto sm:w-[54%]">
                      <Image
                        src={item.image.path}
                        alt={item.image.alt ?? item.title}
                        fill
                        sizes="(min-width: 1920px) 433px, (min-width: 992px) 27vw, (min-width: 576px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <EmblemMark className="absolute start-[54%] top-1/2 hidden h-[80%] -translate-x-1/2 -translate-y-1/2 bg-[#2A2526] sm:block" />
                  </>
                )}
                <div
                  className={`relative flex flex-1 flex-col items-start p-5 sm:py-8 xl:py-[calc(40*var(--rr))] xl:pe-[calc(30*var(--rr))] ${item.image?.path ? "sm:ps-[calc(7%+1.25rem)] 2xl:ps-[calc(10%+1.25rem)]" : "sm:ps-8"}`}
                >
                  <div className="font-display text-xl leading-[1.4] sm:text-2xl lg:text-xl 3xl:text-fluid-32">
                    {item.title}
                  </div>
                  <ul className="mt-4 grid gap-2.5 text-sm sm:text-[15px] lg:text-sm xl:mt-[calc(25*var(--rr))] xl:gap-[calc(14*var(--rr))] 3xl:text-fluid-16">
                    {[
                      item.dealership,
                      item.service_center,
                      item.expires_at &&
                        `${labels.expiresLabel} ${formatExpiry(item.expires_at).label}`,
                    ]
                      .filter(Boolean)
                      .map((detail) => (
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
                    data={{
                      label: labels.learnMoreLabel,
                      href: `/special-offers/${item.slug}`,
                    }}
                    variant="light"
                    className="mt-6 xl:mt-[calc(58*var(--rr))]"
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-sm text-ink sm:mt-8 sm:text-[15px] xl:mt-[calc(45*var(--rr))] xl:text-fluid-16">
            {labels.emptyText}
          </p>
        )}
        {data?.loadMore && (
          <div className="mt-8 flex justify-center xl:mt-[calc(50*var(--rr))]">
            <ButtonLink
              data={{ label: labels.loadMoreLabel, href: data.loadMore.href }}
              variant="dark"
              scroll={false}
            />
          </div>
        )}
      </div>
    </section>
  );
}
