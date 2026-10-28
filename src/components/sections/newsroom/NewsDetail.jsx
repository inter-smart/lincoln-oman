import Image from "next/image";
import NewsCard from "@/components/layout/common/NewsCard";

export default function NewsDetail({ data }) {
  const { article, recent } = data;
  return (
    <section className="h-auto w-full py-10 sm:py-[40px_50px] lg:py-[40px_70px] 2xl:py-[60px_100px]">
      <div className="container grid gap-10 lg:gap-7.5 xl:grid-cols-[minmax(0,1fr)_calc(340*var(--rr))] 2xl:grid-cols-[minmax(0,1fr)_calc(380*var(--rr))] 2xl:gap-x-[calc(50*var(--rr))]">
        <article>
          <div
            data-reveal
            className="mb-3.75 font-display text-lg leading-[1.4] font-normal text-[#1B1B1B] lg:mb-5 lg:text-xl 2xl:mb-8.75 2xl:text-2xl 3xl:text-3xl"
          >
            {article?.title}
          </div>
          <div
            data-reveal
            className="relative aspect-4/3 overflow-hidden rounded-[10px] bg-night sm:aspect-1256/596 xl:mt-[calc(36*var(--rr))]"
          >
            <Image
              src={article?.image?.src}
              alt={article?.image?.alt}
              fill
              priority
              sizes="(min-width: 1200px) 75vw, 100vw"
              className="object-cover"
              style={{ objectPosition: article?.image?.position }}
            />
          </div>
          <div
            data-reveal
            className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 sm:mt-7 xl:mt-[calc(40*var(--rr))]"
          >
            <div className="font-display text-base leading-[1.5] text-[#1B1B1B] lg:text-lg 2xl:text-2xl">
              {article?.title}
            </div>
            <time
              dateTime={article?.datetime}
              className="text-xs text-ash 2xl:text-[14px]"
            >
              {article?.date}
            </time>
          </div>
          <div
            data-reveal
            className="typography mt-5 sm:mt-6 xl:mt-[calc(30*var(--rr))] [&_p]:leading-[1.8] [&>*]:mb-3.75 sm:[&>*]:mb-5 2xl:[&>*]:mb-7.5"
            dangerouslySetInnerHTML={{ __html: article?.body }}
          />
        </article>
        <aside aria-labelledby="recent-news">
          <h2
            id="recent-news"
            data-reveal
            className="mb-3.75 font-display text-lg leading-[1.4] font-normal text-[#1B1B1B] lg:mb-5 lg:text-xl 2xl:mb-8.75 2xl:text-2xl 3xl:text-3xl"
          >
            {recent?.title}
          </h2>
          <ul className="mt-6 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:gap-y-[calc(40*var(--rr))] xl:mt-[calc(36*var(--rr))] xl:grid-cols-1 2xl:gap-y-[calc(60*var(--rr))]">
            {recent?.items?.map((item, index) => (
              <li
                key={item?.id}
                data-reveal
                style={{ "--reveal-delay": `${index * 0.1}s` }}
              >
                <NewsCard item={item} />
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
