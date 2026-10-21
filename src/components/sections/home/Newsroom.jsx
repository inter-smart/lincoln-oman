import ButtonLink from "@/components/layout/common/ButtonLink";
import CardCarousel from "@/components/layout/common/CardCarousel";
import NewsCard from "@/components/layout/common/NewsCard";

export default function Newsroom({ data }) {
  return (
    <section className="py-(--section-space)">
      <div className="container">
        <div
          data-reveal
          className="flex flex-wrap items-center justify-between gap-[16px]"
        >
          <h2 className="title text-ink">{data?.title}</h2>
          <ButtonLink data={data?.more} variant="dark" />
        </div>
        <CardCarousel
          label={data?.title}
          className="mt-[30px] [--slide-gap:16px] xl:mt-[calc(36*var(--rr))] xl:[--slide-gap:calc(35*var(--rr))]"
          slideClassName="basis-[80%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
        >
          {data?.items?.map((item, index) => (
            <div
              key={item.id}
              data-reveal
              style={{ "--reveal-delay": `${index * 0.1}s` }}
            >
              <NewsCard item={item} readMore={data?.readMore} />
            </div>
          ))}
        </CardCarousel>
      </div>
    </section>
  );
}
