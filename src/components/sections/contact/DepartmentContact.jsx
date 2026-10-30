import Image from "next/image";
import EmblemMark from "@/components/layout/common/EmblemMark";
import { cn } from "@/lib/utils";

// `data` is the /contact-us `contact_cms` block (bottom_section_title, bottom_section_image); `department_contacts` is the raw list.
export default function DepartmentContact({ data, department_contacts }) {
  return (
    <section className="block h-auto w-full py-10 sm:py-15 lg:py-17.5 2xl:py-22.5 3xl:py-30">
      <div className="container grid items-center gap-8 xl:grid-cols-[calc(120*var(--rr))_minmax(0,1fr)_calc(483*var(--rr))] xl:gap-x-[calc(50*var(--rr))]">
        <EmblemMark className="h-[calc(320*var(--rr))] bg-[#f3f3f3] max-xl:hidden" />
        <div data-reveal>
          <div className="mb-5 font-display text-lg leading-[1.1] text-[#1B1B1B] sm:mb-3.75 2xl:mb-5 2xl:text-2xl 3xl:mb-7.5 3xl:text-3xl">
            {data.bottom_section_title}
          </div>
          <ul className="grid max-lg:mx-[-25px] max-sm:mx-0 sm:grid-cols-2 lg:grid-cols-3">
            {department_contacts.map((item, index) => (
              <li
                key={item.id}
                className={cn(
                  "border-silver/60 py-3.75 sm:px-6 lg:border-s xl:px-6.25 2xl:py-[calc(30*var(--rr))] lg:[&:nth-child(3n+1)]:border-s-0 lg:[&:nth-child(3n+1)]:ps-0",
                  index < 3 && "lg:border-b",
                  index < department_contacts.length - 1 && "max-sm:border-b",
                  index > 0 &&
                    index < 3 &&
                    "lg:relative lg:after:absolute lg:after:-start-[6px] lg:after:-bottom-[6px] lg:after:z-10 lg:after:size-3 lg:after:scale-[400%] lg:after:rounded-full lg:after:bg-white lg:after:content-[''] 2xl:after:scale-[700%]",
                )}
              >
                <div className="mb-2.5 font-display text-base 2xl:mb-3.75 2xl:text-lg 3xl:text-xl">
                  {item?.title}
                </div>
                <p className="text-xs leading-[1.7] 3xl:text-base">
                  <span className="block">
                    Email:{" "}
                    <a
                      href={`mailto:${item?.email}`}
                      className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink focus-visible:outline-solid"
                    >
                      {item.email}
                    </a>
                  </span>
                  <span className="block">
                    Telephone:{" "}
                    <a
                      href={`tel:${item?.phone}`}
                      className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink focus-visible:outline-solid"
                    >
                      {item?.phone}
                    </a>
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
        {data?.bottom_section_image && (
          <div
            data-reveal
            style={{ "--reveal-delay": "0.1s" }}
            className="relative aspect-483/323 overflow-hidden rounded-[10px] lg:rounded-xl 2xl:rounded-[15px] 3xl:rounded-[20px]"
          >
            <Image
              src={data?.bottom_section_image}
              alt={data?.bottom_section_title}
              fill
              sizes="(min-width: 1200px) 25vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
