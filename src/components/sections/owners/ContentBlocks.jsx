import Image from "next/image";

const text =
  "text-sm leading-6.5 whitespace-pre-line sm:text-[15px] xl:text-fluid-16";
const heading =
  "font-display text-xl leading-[1.2] sm:text-[22px] xl:text-fluid-25";
const sansHeading = "text-lg leading-[1.3] sm:text-xl xl:text-fluid-22";

// Shared by section titles and the 30px in-section titles
export const titleClass =
  "font-display text-[22px] leading-[1.2] sm:text-2xl md:text-[26px] xl:text-fluid-30";

export function RoundedImage({ image, sizes }) {
  return (
    <div
      className="relative z-0 h-full w-full overflow-hidden rounded-[10px] sm:rounded-[15px] 2xl:rounded-[20px]"
      style={{ aspectRatio: image.ratio }}
    >
      <Image
        src={image.src}
        alt={image.alt ?? ""}
        fill
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition: image.position }}
      />
    </div>
  );
}

function Block({ block }) {
  switch (block.type) {
    case "text":
      return <p className={`mt-3 ${text}`}>{block.text}</p>;
    case "title":
      return (
        <h3 className={`mt-6 xl:mt-[calc(24*var(--rr))] ${titleClass}`}>
          {block.text}
        </h3>
      );
    case "subtitle":
      return <p className={`mt-2 ${sansHeading}`}>{block.text}</p>;
    case "heading":
      return (
        <h3 className={`mt-6 xl:mt-[calc(30*var(--rr))] ${heading}`}>
          {block.text}
        </h3>
      );
    case "feature":
      return (
        <div className="mt-4 xl:mt-[calc(18*var(--rr))]">
          <h3 className={sansHeading}>{block.title}</h3>
          <p className={`mt-1.5 ${text}`}>{block.text}</p>
        </div>
      );
    case "list":
      return (
        <ul
          className={`mt-3 list-disc ps-4 marker:text-[0.6em] ${text} ${block.columns === 2 ? "gap-x-8 sm:columns-2" : ""}`}
        >
          {block.items.map((item) => (
            <li key={item} className="break-inside-avoid ps-1">
              {item}
            </li>
          ))}
        </ul>
      );
    case "media":
      return (
        <div className="mt-8 grid items-start gap-6 md:grid-cols-[minmax(0,455fr)_minmax(0,653fr)] xl:mt-[calc(40*var(--rr))] xl:gap-[calc(59*var(--rr))]">
          <RoundedImage
            image={block.image}
            sizes="(min-width: 768px) 30vw, 100vw"
          />
          <div className="*:first:mt-0">
            <ContentBlocks blocks={block.blocks} />
          </div>
        </div>
      );
    default:
      return null;
  }
}

// Renders CMS content blocks (see src/data/owners.js for the block types)
export default function ContentBlocks({ blocks }) {
  return blocks?.map((block, index) => <Block key={index} block={block} />);
}
