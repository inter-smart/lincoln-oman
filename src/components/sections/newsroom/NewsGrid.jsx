import NewsCard from "@/components/layout/common/NewsCard";

export default function NewsGrid({ data }) {
  return (
    <section className="py-(--section-space)">
      <div className="container">
        <h1 data-reveal className="title">
          {data?.title}
        </h1>
        <ul className="mt-6 grid grid-cols-1 gap-x-4 gap-y-7.5 sm:grid-cols-2 sm:gap-y-[30px] lg:grid-cols-3 lg:gap-x-[calc(20*var(--rr))] lg:gap-y-[calc(40*var(--rr))] xl:mt-[calc(36*var(--rr))] xl:grid-cols-4 2xl:gap-x-[calc(35*var(--rr))] 2xl:gap-y-[calc(60*var(--rr))]">
          {data?.items?.map((item, index) => (
            <li
              key={item.id}
              data-reveal
              style={{ "--reveal-delay": `${(index % 4) * 0.1}s` }}
            >
              <NewsCard item={item} readMore={data?.readMore} />
            </li>
          ))}
        </ul>
        {data?.loadingLabel && (
          <p
            data-reveal
            className="mt-10 text-center text-[13px] tracking-[0.7px] text-ink sm:mt-[50px] sm:text-[14px] xl:mt-[calc(90*var(--rr))]"
          >
            {data.loadingLabel}
          </p>
        )}
      </div>
    </section>
  );
}
