import CardCarousel from "@/components/layout/common/CardCarousel";
import ModelCard from "@/components/layout/common/ModelCard";

// `models` is the API list (explore_lincoln_line / featured_models); `title` comes from the page's cms block.
export default function ExploreModels({ title, models, variant = "default" }) {
  return (
    <section className="py-(--section-space)">
      <div className="container">
        <h2
          data-reveal
          className={`title text-ink ${variant === "about" ? "text-start" : "text-center"}`}
        >
          {title}
        </h2>
        <CardCarousel
          label={title}
          className="mt-[30px] [--slide-gap:16px] xl:mt-[calc(45*var(--rr))] xl:[--slide-gap:calc(22*var(--rr))]"
          slideClassName="basis-[80%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
        >
          {models?.map((model, index) => (
            <div
              key={model.slug}
              data-reveal
              style={{ "--reveal-delay": `${index * 0.1}s` }}
            >
              <ModelCard model={model} />
            </div>
          ))}
        </CardCarousel>
      </div>
    </section>
  );
}
