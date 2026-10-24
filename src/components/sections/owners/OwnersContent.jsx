import SectionSideNav from "@/components/layout/common/SectionSideNav";
import ContentBlocks, {
  RoundedImage,
  titleClass,
} from "@/components/sections/owners/ContentBlocks";

// Sticky section sidebar beside the long-form owner content
export default function OwnersContent({ sections, navLabel }) {
  const navItems = sections?.map((section) => ({
    id: section.id,
    label: section.label,
    href: `#${section.id}`,
  }));

  return (
    <div className="container grid grid-cols-[minmax(0,1fr)] gap-6 pt-6 pb-(--section-space) sm:pt-10 lg:grid-cols-[minmax(0,383fr)_minmax(0,1168fr)] lg:gap-10 lg:pt-15 xl:gap-[calc(90*var(--rr))] xl:pt-[calc(70*var(--rr))]">
      <SectionSideNav items={navItems} label={navLabel} />
      <div className="min-w-0 text-ink">
        {sections?.map((section) => (
          <section
            key={section.id}
            id={section.id}
            data-reveal
            className="scroll-mt-(--spy-offset,96px) not-first:mt-10 xl:not-first:mt-[calc(50*var(--rr))]"
          >
            {section.image && (
              <div className="mb-8 xl:mb-[calc(60*var(--rr))]">
                <RoundedImage
                  image={section.image}
                  sizes="(min-width: 992px) 60vw, 100vw"
                />
              </div>
            )}
            <h2 className={titleClass}>{section.title}</h2>
            <ContentBlocks blocks={section.blocks} />
          </section>
        ))}
      </div>
    </div>
  );
}
