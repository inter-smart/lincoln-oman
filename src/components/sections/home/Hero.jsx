import Image from "next/image";
import ButtonLink from "@/components/layout/common/ButtonLink";
import HeroVideo from "@/components/layout/common/HeroVideo";

export default function Hero({ data }) {
  return (
    <section id="top" className="relative h-svh max-h-[1000px] min-h-[560px] overflow-hidden bg-night text-white">
      {data?.poster && <Image src={data.poster} alt="" fill priority sizes="100vw" className="object-cover" />}
      <HeroVideo sources={data?.video} />
      <Image src="/images/home/hero-top-shade.png" alt="" width={1024} height={99} priority className="absolute inset-x-0 top-0 h-[184px] w-full object-cover" />
      <Image src="/images/home/hero-bottom-shade.png" alt="" width={1024} height={180} priority className="absolute inset-x-0 bottom-0 h-[336px] w-full rotate-180 object-cover" />

      <div className="container absolute inset-x-0 bottom-[61px] flex flex-col items-center text-center">
        <h1 className="animate-in fade-in slide-in-from-bottom-6 font-display duration-1000 text-[28px] leading-[1.2] tracking-[2px] md:text-[30px] xl:text-fluid-40">
          {data?.title}
        </h1>
        <div className="mt-[26px] animate-in fade-in slide-in-from-bottom-6 delay-200 duration-1000 fill-mode-backwards">
          <ButtonLink data={data?.cta} size="lg" arrow="white" />
        </div>
      </div>
    </section>
  );
}
