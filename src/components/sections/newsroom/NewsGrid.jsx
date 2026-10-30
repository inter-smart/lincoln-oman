import NewsCard from "@/components/layout/common/NewsCard";

// `news` is the API news list; `title` is the section heading.
export default function NewsGrid({ title, news }) {
  return (
    <section className="py-(--section-space)">
      <div className="container">
        <h1 data-reveal className="title">
          {title}
        </h1>
        <ul className="mt-6 grid grid-cols-1 gap-x-4 gap-y-7.5 sm:grid-cols-2 sm:gap-y-[30px] lg:grid-cols-3 lg:gap-x-[calc(20*var(--rr))] lg:gap-y-[calc(40*var(--rr))] xl:mt-[calc(36*var(--rr))] xl:grid-cols-4 2xl:gap-x-[calc(35*var(--rr))] 2xl:gap-y-[calc(60*var(--rr))]">
          {news?.map((item, index) => (
            <li
              key={item.id}
              data-reveal
              style={{ "--reveal-delay": `${(index % 4) * 0.1}s` }}
            >
              <NewsCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
