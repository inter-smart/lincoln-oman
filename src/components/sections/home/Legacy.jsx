import Image from "next/image";
import ButtonLink from "@/components/layout/common/ButtonLink";

export default function Legacy({ data }) {
  return (
    <section className="bg-night py-(--band-space) text-center text-white">
      <div className="container flex flex-col items-center">
        {/* Emblem widens to the full wordmark as it scrolls in (Figma "image 3" Default → Variant2) */}
        <div data-observe className="legacy-logo relative h-(--logo-h) overflow-hidden [--logo-h:min(110px,calc((100vw-32px)/2.884))] md:[--logo-h:130px] xl:[--logo-h:calc(164*var(--rr))]">
          <Image src="/images/logo.png" alt="Lincoln" width={600} height={208} className="absolute top-0 left-0 h-full w-[calc(var(--logo-h)*2.884)] max-w-none" />
        </div>
        <h2 data-reveal className="title mt-[60px] xl:mt-[calc(115*var(--rr))]">
          {data?.title}
        </h2>
        <p data-reveal className="mt-[18px] max-w-[836px] text-[15px] xl:max-w-[calc(836*var(--rr))] leading-[26px] xl:text-fluid-16">
          {data?.text}
        </p>
        <div data-reveal className="mt-[32px]">
          <ButtonLink data={data?.cta} />
        </div>
      </div>
    </section>
  );
}
