import Image from "next/image";

export default function AboutInfo({ data }) {
  return (
    <section className="block h-auto w-full bg-[#231F20] py-12.5 sm:py-15 lg:py-20 2xl:py-27.5 3xl:py-32.5">
      <div className="container">
        <div className="grid items-center gap-7.5 lg:grid-cols-2 lg:gap-20 xl:gap-40 2xl:gap-50 3xl:gap-75">
          <div className="h-auto w-full space-y-3.75 2xl:space-y-6.25">
            <div className="font-display text-[22px] leading-[1.1] text-white sm:text-[25px] 2xl:text-[32px] 3xl:text-[40px]">
              {data?.title}
            </div>
            <div className="text-[13px] leading-[1.8] font-normal text-white 2xl:text-sm 3xl:text-base">
              {data?.description}
            </div>
          </div>
          <div className="block h-auto w-full">
            <div className="block aspect-810/450 h-auto w-full overflow-hidden rounded-[10px] lg:rounded-xl 2xl:rounded-[20px]">
              {data?.media?.type === "image" ? (
                <Image
                  src={data?.media?.url}
                  alt={data?.media?.alternativeText ?? "About Info"}
                  width={810}
                  height={450}
                  className="size-full object-cover"
                />
              ) : (
                <video
                  src={data?.media?.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="size-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
