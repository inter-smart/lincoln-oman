import Image from "next/image";
import EmblemMark from "@/components/layout/common/EmblemMark";
import { listItems } from "@/lib/list-items";

// Full-bleed night band: copy on the left, rounded photo on the right.
// `data` is a certified_cms tab (title, description HTML, image). A description that is a <ul> renders as the
// design's dotted list (each <li> redrawn with our own bullet); "emblem" adds the watermark used by the 14 Days Exchange Promise band.
export default function CertifiedBand({
  data,
  id,
  emblem = false,
  imageRatio = "aspect-810/477",
}) {
  const points = listItems(data.description);

  return (
    <section
      id={id}
      className="relative scroll-mt-(--spy-offset,96px) overflow-hidden bg-night py-(--band-space) text-white"
    >
      <div
        className={`relative container grid items-center gap-7.5 lg:gap-[28px] ${emblem ? "lg:grid-cols-[minmax(0,878fr)_minmax(0,762fr)]" : "lg:grid-cols-2"}`}
      >
        {emblem && (
          <EmblemMark className="absolute top-1/2 left-[calc(34*var(--rr)+16px)] hidden w-[calc(92*var(--rr))] -translate-y-1/2 bg-[#2c2628] xl:block" />
        )}
        <div
          data-reveal
          className={
            emblem ? "lg:pe-10 xl:ps-[calc(272*var(--rr))]" : "lg:pe-10"
          }
        >
          <h2 className="title">{data.title}</h2>
          {points.length > 0 ? (
            <ul className="mt-6 space-y-4 text-[15px] leading-[1.2] sm:space-y-5 sm:text-base xl:mt-[calc(36*var(--rr))] xl:max-w-[calc(720*var(--rr))] xl:space-y-[calc(28*var(--rr))] xl:text-fluid-20">
              {points.map((point) => (
                <li key={point} className="flex gap-5">
                  <span
                    aria-hidden
                    className="mt-[0.35em] size-[9px] shrink-0 rounded-full bg-[#d9d9d9]"
                  />
                  <span dangerouslySetInnerHTML={{ __html: point }} />
                </li>
              ))}
            </ul>
          ) : (
            <div
              className="mt-4 text-sm leading-[26px] sm:text-[15px] xl:mt-[calc(20*var(--rr))] xl:max-w-[calc(560*var(--rr))] xl:text-fluid-16"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          )}
        </div>
        <div
          data-reveal
          style={{ "--reveal-delay": "0.15s" }}
          className={`relative overflow-hidden rounded-[10px] sm:rounded-[15px] 2xl:rounded-[20px] ${imageRatio}`}
        >
          <Image
            src={data.image}
            alt={data.title}
            fill
            sizes="(min-width: 992px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
