import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { formatDate } from "@/lib/format-date";

// `item` is one API news entry: { slug, title, published_on, media: { image } }; `position` (optional) sets the photo crop.
// Newsroom card. On hover/focus the "Read More" text gives way to the pill over the photo (Figma card 2).
export default function NewsCard({ item }) {
  const { label, dateTime } = formatDate(item.published_on);

  return (
    <Link
      href={`/newsroom/${item.slug}`}
      className="group block outline-offset-4 focus-visible:outline-2 focus-visible:outline-slate"
    >
      <span className="relative block aspect-[384/572] overflow-hidden rounded-[10px] bg-night">
        <Image
          src={item.media.image}
          alt=""
          fill
          sizes="(min-width: 1200px) 25vw, (min-width: 768px) 40vw, 80vw"
          className="object-cover"
          style={{ objectPosition: item.position }}
        />
        <span
          aria-hidden
          className={buttonVariants({
            className:
              "pointer-events-none absolute right-[23px] bottom-[22px] translate-y-3 opacity-0 transition-[opacity,translate] duration-500 group-hocus:translate-y-0 group-hocus:opacity-100",
          })}
        >
          Read More
          <Image
            src="/icons/chevron-accent.svg"
            alt=""
            width={7}
            height={4}
            className="-rotate-90"
          />
        </span>
      </span>
      <time
        dateTime={dateTime}
        className="mt-[14px] block text-[14px] text-ash"
      >
        {label}
      </time>
      <span className="mt-[9px] block text-sm leading-[normal] text-ink sm:text-[15px] xl:text-fluid-23 3xl:text-[18px]">
        {item.title}
      </span>
      <span className="mt-2.5 block text-[13px] tracking-[0.7px] text-ink transition-opacity duration-300 sm:mt-[18px] sm:text-[14px] group-hocus:opacity-0">
        Read More
      </span>
    </Link>
  );
}
