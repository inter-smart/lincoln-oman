import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

// Newsroom card. On hover/focus the "Read More" text gives way to the pill over the photo (Figma card 2).
export default function NewsCard({ item, readMore }) {
  return (
    <Link href={item?.href ?? "#"} className="group block outline-offset-4 focus-visible:outline-2 focus-visible:outline-slate">
      <span className="relative block aspect-[384/572] overflow-hidden rounded-[10px] bg-night">
        <Image
          src={item?.image}
          alt=""
          fill
          sizes="(min-width: 1200px) 25vw, (min-width: 768px) 40vw, 80vw"
          className="object-cover"
          style={{ objectPosition: item?.position }}
        />
        <span
          aria-hidden
          className={buttonVariants({
            className:
              "pointer-events-none absolute right-[23px] bottom-[22px] translate-y-3 opacity-0 transition-[opacity,translate] duration-500 group-hocus:translate-y-0 group-hocus:opacity-100",
          })}
        >
          {readMore}
          <Image src="/icons/chevron-accent.svg" alt="" width={7} height={4} className="-rotate-90" />
        </span>
      </span>
      <time dateTime={item?.datetime} className="mt-[14px] block text-[14px] text-ash">{item?.date}</time>
      <span className="mt-[9px] block text-sm sm:text-[15px] 3xl:text-[18px] leading-[normal] text-ink xl:text-fluid-23">{item?.title}</span>
      <span className="mt-2.5 sm:mt-[18px] block text-[13px] sm:text-[14px] tracking-[0.7px] text-ink transition-opacity duration-300 group-hocus:opacity-0">{readMore}</span>
    </Link>
  );
}
