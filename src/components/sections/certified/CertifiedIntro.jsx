import Image from "next/image";

// `data` is certified_cms.section_one (title, description HTML, image).
export default function CertifiedIntro({ data }) {
  return (
    <section className="pt-10 sm:pt-[50px] lg:pt-[60px] xl:pt-[calc(80*var(--rr))]">
      <div className="container grid items-center gap-7.5 lg:grid-cols-2 lg:gap-[28px]">
        <div
          data-reveal
          className="relative aspect-810/477 overflow-hidden rounded-[10px] sm:rounded-[15px] 2xl:rounded-[20px]"
        >
          <Image
            src={data.image}
            alt={data.title}
            fill
            sizes="(min-width: 992px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div
          data-reveal
          style={{ "--reveal-delay": "0.1s" }}
          className="lg:ps-10 xl:ps-[calc(110*var(--rr))]"
        >
          <h2 className="title text-ink">{data.title}</h2>
          <div
            className="mt-4 max-w-[530px] text-sm leading-[26px] sm:text-[15px] xl:mt-[calc(20*var(--rr))] xl:max-w-[calc(530*var(--rr))] xl:text-fluid-16"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>
      </div>
    </section>
  );
}
