import Image from "next/image";

export default function InnerBanner({ data }) {
  return (
    <section className="relative z-0 block w-full max-sm:h-95 sm:h-auto">
      <div className="block aspect-1920/760 h-full w-full overflow-hidden sm:h-auto">
        <Image
          src={data?.media?.url}
          alt={data?.media?.alternativeText ?? "Inner Banner"}
          width={1920}
          height={760}
          className="size-full object-cover"
        />
      </div>
      <div className="container">
        <div className="absolute inset-[auto_0_0_0] z-1 my-5 block h-auto w-full sm:my-7.5 lg:my-10 2xl:my-17.5 3xl:my-20">
          <div className="text-center font-display text-xl leading-[1.1] font-light text-white sm:text-[25px] 2xl:text-[32px] 3xl:text-[40px]">
            {data?.title}
          </div>
        </div>
      </div>
    </section>
  );
}
