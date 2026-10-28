import Image from "next/image";

// `data` is about_cms.section_four (title, description HTML, image).
export default function AboutCommitment({ data }) {
  return (
    <section className="block h-auto w-full">
      <div className="block aspect-1920/1120 h-auto w-full overflow-hidden">
        <Image
          src={data.image}
          alt={data.title}
          width={1920}
          height={1120}
          className="size-full object-cover"
        />
      </div>
      <div className="container">
        <div className="relative z-0 size-full">
          <div className="absolute inset-[auto_0_0_auto] z-1 my-5 block h-auto w-full space-y-3.75 sm:my-10 lg:my-12.5 lg:max-w-125 2xl:my-17.5 2xl:max-w-135 2xl:space-y-6.25 3xl:my-22.5 3xl:max-w-167.5">
            <div className="font-display text-[22px] leading-[1.1] text-white sm:text-[25px] 2xl:text-[32px] 3xl:text-[40px]">
              {data.title}
            </div>
            <div
              className="text-[13px] leading-[1.8] font-normal text-white 2xl:text-sm 3xl:text-base"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
