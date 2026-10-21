import CardCarousel from "@/components/layout/common/CardCarousel";
import ModelCard from "@/components/layout/common/ModelCard";

export default function ExploreModels({ data }) {
  return (
    <section className="py-(--section-space)">
      <div className="container">
        <h2 data-reveal className="text-center title text-ink">
          {data?.title}
        </h2>
        <CardCarousel
          label={data?.title}
          className="mt-[30px] [--slide-gap:16px] xl:mt-[calc(45*var(--rr))] xl:[--slide-gap:calc(22*var(--rr))]"
          slideClassName="basis-[80%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
        >
          {data?.items?.map((item, index) => (
            <div
              key={item.id}
              data-reveal
              style={{ "--reveal-delay": `${index * 0.1}s` }}
            >
              <ModelCard item={item} />
            </div>
          ))}
        </CardCarousel>
      </div>
    </section>
  );
}
