import ButtonLink from "@/components/layout/common/ButtonLink";

// "Experience Lincoln Luxury" card that closes inner pages, just above the footer.
// `data` is certified_cms.section_three (title, description HTML, button{ title, link }).
export default function ContactCta({ data }) {
  return (
    <section className="pb-(--section-space)">
      <div className="container">
        <div
          data-reveal
          className="rounded-[10px] bg-night px-5 py-12 text-center text-white sm:rounded-[15px] sm:py-[60px] xl:pt-[calc(73*var(--rr))] xl:pb-[calc(93*var(--rr))] 2xl:rounded-[20px]"
        >
          <h2 className="title">{data.title}</h2>
          <div
            className="mx-auto mt-2 max-w-[720px] text-sm leading-[26px] sm:text-[15px] xl:max-w-[calc(720*var(--rr))] xl:text-fluid-16"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
          <ButtonLink
            data={{ label: data.button.title, href: data.button.link }}
            className="mt-6 xl:mt-[calc(20*var(--rr))]"
          />
        </div>
      </div>
    </section>
  );
}
