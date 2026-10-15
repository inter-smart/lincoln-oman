import Image from "next/image";
import Link from "next/link";
import HoverVideo from "@/components/layout/common/HoverVideo";

// "Explore Lincoln Line" card (Figma 01–04, Default → Variant2 on hover/focus):
// a video plays, a dark gradient rises, and the three specs and the "—+" mark fade up over it.
export default function ModelCard({ item }) {
  return (
    <Link
      href={item?.href ?? "#"}
      className="group relative block aspect-[394/638] overflow-hidden rounded-[20px] bg-night text-white outline-offset-4 focus-visible:outline-2 focus-visible:outline-slate"
    >
      <Image
        src={item?.image}
        alt=""
        fill
        sizes="(min-width: 1200px) 25vw, (min-width: 768px) 40vw, 80vw"
        className="object-cover"
        style={{ objectPosition: item?.position }}
      />
      {/* Figma's hover variant is a video fill: it plays while hovered and rewinds on hover-out */}
      {item?.video && <HoverVideo src={item.video} />}
      <span className="absolute inset-x-0 top-[52.2%] bottom-0 bg-linear-to-b from-transparent to-black opacity-0 transition-opacity duration-500 group-hocus:opacity-100" />

      <ul className="absolute inset-x-0 top-[77%] flex translate-y-4 justify-between px-[clamp(14px,6.35%,25px)] opacity-0 transition-[opacity,translate] duration-500 group-hocus:translate-y-0 group-hocus:opacity-100 group-hocus:delay-100">
        {item?.specs?.map((spec) => (
          <li key={spec.id} className="flex flex-col items-center gap-[10px] text-center text-[13px] leading-[normal] whitespace-pre-line 3xl:text-[14px]">
            <Image src={spec.icon.src} alt="" width={Math.ceil(spec.icon.width)} height={Math.ceil(spec.icon.height)} className="h-[24px] w-auto" />
            {spec.label}
          </li>
        ))}
      </ul>

      <span className="absolute bottom-[20px] left-[25px] text-[19px] leading-[normal] xl:text-fluid-25">{item?.name}</span>
      <Image
        src="/icons/card-plus-hover.svg"
        alt=""
        width={33}
        height={14}
        className="absolute right-[27px] bottom-[29px] -translate-x-3 opacity-0 transition-[opacity,translate] duration-500 group-hocus:translate-x-0 group-hocus:opacity-100"
      />
    </Link>
  );
}
