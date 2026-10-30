import ButtonLink from "@/components/layout/common/ButtonLink";
import CardCarousel from "@/components/layout/common/CardCarousel";
import NewsCard from "@/components/layout/common/NewsCard";
import { getCurrentDictionary } from "@/i18n/get-dictionary";

// `news` is the API news list; `title` comes from the page's cms block.
export default async function Newsroom({ title, news }) {
  const { ui } = await getCurrentDictionary();
  return (
    <section className="py-(--section-space)">
      <div className="container">
        <div
          data-reveal
          className="flex flex-wrap items-center justify-between gap-[16px]"
        >
          <h2 className="title text-ink">{title}</h2>
          <ButtonLink
            data={{ label: ui.viewMore, href: "/newsroom" }}
            variant="dark"
          />
        </div>
        <CardCarousel
          label={title}
          className="mt-[30px] [--slide-gap:16px] xl:mt-[calc(36*var(--rr))] xl:[--slide-gap:calc(35*var(--rr))]"
          slideClassName="basis-[80%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
        >
          {news?.map((item, index) => (
            <div
              key={item.id}
              data-reveal
              style={{ "--reveal-delay": `${index * 0.1}s` }}
            >
              <NewsCard item={item} />
            </div>
          ))}
        </CardCarousel>
      </div>
    </section>
  );
}
