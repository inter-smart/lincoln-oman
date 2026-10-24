import Image from "next/image";
import EmblemMark from "@/components/layout/common/EmblemMark";

export default function CertifiedInspection({ data }) {
  return (
    <section
      id={data?.id}
      className="scroll-mt-(--spy-offset,96px) py-(--section-space)"
    >
      <div className="relative container grid items-center gap-7.5 lg:grid-cols-[minmax(0,762fr)_minmax(0,798fr)] lg:gap-10 xl:gap-[calc(80*var(--rr))]">
        <div
          data-reveal
          className="relative aspect-762/242 overflow-hidden rounded-[10px] sm:rounded-[15px] 2xl:rounded-[20px]"
        >
          <Image
            src={data?.image?.src}
            alt={data?.image?.alt ?? ""}
            fill
            sizes="(min-width: 992px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div
          data-reveal
          style={{ "--reveal-delay": "0.1s" }}
          className="xl:pe-[calc(150*var(--rr))]"
        >
          <h2 className="max-w-[calc(480*var(--rr))] title text-ink max-xl:max-w-none">
            {data?.title}
          </h2>
          <p className="mt-4 text-sm leading-[26px] sm:text-[15px] xl:mt-[calc(26*var(--rr))] xl:text-fluid-16">
            {data?.text}
          </p>
        </div>
        <EmblemMark className="absolute top-1/2 right-4 hidden w-[calc(94*var(--rr))] -translate-y-1/2 bg-[#e8e8e8] xl:block" />
      </div>
    </section>
  );
}
