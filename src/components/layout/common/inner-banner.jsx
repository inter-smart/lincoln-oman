import Image from "next/image";
import Link from "next/link";
import ButtonLink from "@/components/layout/common/ButtonLink";

// `data` is the backend `banner` block (banner_title, banner, banner_alt_text); `text`, `link`, `actions`, `position` are optional local extras.
// `as="div"` for pages whose content already renders the <h1>
export default function InnerBanner({ data, as: Title = "h1" }) {
  return (
    <section className="relative z-0 block w-full before:absolute before:inset-[auto_0_0_0] before:z-2 before:h-[40%] before:w-full before:bg-linear-to-t before:from-black before:to-transparent before:content-[''] after:absolute after:inset-[0_0_auto_0] after:z-2 after:h-[25%] after:w-full after:bg-linear-to-b after:from-black after:to-transparent after:content-[''] max-sm:h-95 sm:h-auto">
      <div className="block aspect-1920/760 h-full w-full overflow-hidden bg-night sm:h-auto">
        {data.banner && (
          <Image
            src={data.banner}
            alt={data.banner_alt_text ?? ""}
            width={1920}
            height={760}
            priority
            sizes="100vw"
            className="size-full object-cover"
            style={{ objectPosition: data?.position }}
          />
        )}
      </div>
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/50 to-transparent"
      />
      <div className="container">
        <div className="absolute inset-[auto_0_0_0] z-3 my-5 block h-auto w-full px-4 text-center text-white sm:my-7.5 lg:my-10 2xl:my-17.5 3xl:my-20">
          <Title className="font-display text-xl leading-[1.1] font-light sm:text-[25px] 2xl:text-[32px] 3xl:text-[40px]">
            {data.banner_title}
          </Title>
          {data?.text && (
            <p className="mt-1.5 text-base tracking-[0.05em] sm:text-lg xl:mt-[calc(8*var(--rr))] xl:text-fluid-24">
              {data.text}
            </p>
          )}
          {data?.link?.label && (
            <Link
              href={data.link.href ?? "#"}
              className="mt-2 inline-flex items-center gap-1.5 text-[13px] tracking-[0.05em] underline-offset-4 hover:underline focus-visible:underline sm:text-sm xl:mt-[calc(10*var(--rr))]"
            >
              {data.link.label}
              <Image
                src="/icons/chevron-hero.svg"
                alt=""
                width={7}
                height={4}
                className="-rotate-90"
              />
            </Link>
          )}
          {data?.actions?.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-3 xl:mt-[calc(30*var(--rr))]">
              {data.actions.map((action) => (
                <ButtonLink key={action.id} data={action} arrow="white" />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
