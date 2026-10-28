import Image from "next/image";

// `data` is certified_cms.section_two.tab_one (title, program_benefits[{ id, benefit, icon, alt_tag }]).
export default function CertifiedBenefits({ data }) {
  return (
    <section
      id="benefits"
      className="scroll-mt-(--spy-offset,96px) pt-8 pb-(--section-space) sm:pt-10 xl:pt-[calc(55*var(--rr))]"
    >
      <div className="container">
        <h2 data-reveal className="title text-ink">
          {data.title}
        </h2>
        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 sm:gap-[19px] lg:grid-cols-3 xl:mt-[calc(38*var(--rr))] 2xl:grid-cols-5 2xl:gap-[calc(21*var(--rr))]">
          {data.program_benefits.map((item, index) => (
            <li
              key={item.id}
              data-reveal
              style={{ "--reveal-delay": `${index * 0.08}s` }}
              className="flex items-center gap-[15px] rounded-[10px] bg-night px-5 py-6 text-base leading-[1.2] text-white sm:rounded-[15px] sm:text-lg xl:gap-[calc(18*var(--rr))] xl:px-[calc(22*var(--rr))] xl:py-[calc(36*var(--rr))] xl:text-fluid-22 2xl:rounded-[20px]"
            >
              <span className="relative block aspect-square w-[calc(48*var(--rr))] shrink-0">
                <Image
                  src={item.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="size-full object-contain"
                />
              </span>
              {item.benefit}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
