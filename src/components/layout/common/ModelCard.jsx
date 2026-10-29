import Image from "next/image";
import Link from "next/link";
import HoverVideo from "@/components/layout/common/HoverVideo";

// "Explore Lincoln Line" card (Figma 01–04, Default → Variant2 on hover/focus):
// a video plays, a dark gradient rises, and the three specs and the "—+" mark fade up over it.
// `model` is one API model: { slug, name, image, video, features: [{ title, icon }] }.
// `position` (optional) sets the photo crop; it defaults to centred.
export default function ModelCard({ model }) {
  return (
    <Link
      href={`/vehicles/${model.slug}`}
      className="group relative block aspect-[394/638] overflow-hidden rounded-[10px] bg-night text-white outline-offset-4 focus-visible:outline-2 focus-visible:outline-slate sm:rounded-[15px] 2xl:rounded-[20px]"
    >
      {model.image && (
        <Image
          src={model.image}
          alt=""
          fill
          sizes="(min-width: 1200px) 25vw, (min-width: 768px) 40vw, 80vw"
          className="object-cover"
          style={{ objectPosition: model.position }}
        />
      )}
      {/* Figma's hover variant is a video fill: it plays while hovered and rewinds on hover-out */}
      {model.video && <HoverVideo src={model.video} />}
      <span className="absolute inset-x-0 top-[52.2%] bottom-0 bg-linear-to-b from-transparent to-black opacity-0 transition-opacity duration-500 group-hocus:opacity-100" />

      <ul className="absolute inset-x-0 top-[73%] flex translate-y-4 justify-between px-[clamp(14px,6.35%,25px)] opacity-0 transition-[opacity,translate] duration-500 2xl:top-[77%] group-hocus:translate-y-0 group-hocus:opacity-100 group-hocus:delay-100">
        {model.features?.map((feature) => (
          <li
            key={feature.title}
            className="flex flex-col items-center gap-[10px] text-center text-[10px] leading-[normal] whitespace-pre-line 2xl:text-[13px] 3xl:text-[14px]"
          >
            {feature.icon && (
              <Image
                src={feature.icon}
                alt=""
                width={28}
                height={28}
                className="h-[24px] w-auto"
              />
            )}
            {feature.title}
          </li>
        ))}
      </ul>
      <span className="absolute bottom-[20px] left-5 text-lg leading-[normal] xl:text-fluid-25 2xl:left-[25px] 2xl:text-[19px]">
        {model.name}
      </span>
      <div className="absolute right-5 bottom-6.25 flex aspect-35/15 h-auto w-7.5 -translate-x-3 items-center justify-center overflow-hidden opacity-0 transition-[opacity,translate] duration-500 2xl:right-6.25 2xl:w-8.75 group-hocus:translate-x-0 group-hocus:opacity-100">
        <Image
          src="/icons/card-plus-hover.svg"
          alt=""
          width={33}
          height={14}
          className="size-full object-contain"
        />
      </div>
    </Link>
  );
}
