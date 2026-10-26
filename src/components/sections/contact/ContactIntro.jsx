import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const field =
  "w-full border-0 border-b border-ink bg-transparent pb-3 text-sm text-ink placeholder:text-ink focus-visible:border-ember focus-visible:outline-none sm:text-base xl:text-fluid-16";

export default function ContactIntro({ data }) {
  return (
    <section className="block h-auto w-full py-10 sm:py-[50px_60px] lg:py-[60px_75px] 2xl:py-[75px_90px] 3xl:py-[90px_120px]">
      <div className="container grid gap-7.5 sm:gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-17.5 2xl:gap-x-20 3xl:gap-x-[calc(100*var(--rr))]">
        <div data-reveal>
          <h1 className="title">{data?.title}</h1>
          <p className="mt-2.5 text-xl leading-[1.3] tracking-[0.05em] text-ink sm:text-2xl xl:text-[28px] 2xl:mt-3.75 2xl:text-[37px] 3xl:text-[45px]">
            {data?.lead}
          </p>
          <h2 className="mt-5 font-display text-base text-ink sm:mt-5 lg:text-lg 2xl:mt-8.75 2xl:text-2xl 3xl:text-3xl">
            {data?.hours?.title}
          </h2>
          <ul className="mt-3 space-y-1.25 text-[13px] text-ink sm:text-sm xl:mt-3.75 2xl:space-y-2.5 2xl:text-base">
            {data?.hours?.items?.map((item) => (
              <li key={item.id} className={cn(item.closed && "text-ember")}>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <form
          data-reveal
          action={data?.form?.action}
          method="post"
          style={{ "--reveal-delay": "0.1s" }}
        >
          <h2 className="title">{data?.form?.title}</h2>
          <div className="mt-6 grid gap-x-[calc(50*var(--rr))] gap-y-5 sm:grid-cols-2 lg:gap-y-6.25 xl:mt-[calc(36*var(--rr))] 2xl:gap-y-[calc(50*var(--rr))]">
            {data?.form?.fields?.map((input) => (
              <label
                key={input.name}
                className={cn("block", input.wide && "sm:col-span-2")}
              >
                <span className="sr-only">{input.label} (required)</span>
                <input
                  type={input.type}
                  name={input.name}
                  autoComplete={input.autoComplete}
                  placeholder={`${input.label}*`}
                  required
                  className={`${field} pt-2`}
                />
              </label>
            ))}
            <div className="flex items-end gap-4 sm:col-span-2 sm:gap-[calc(34*var(--rr))]">
              <label className="block flex-1">
                <span className="sr-only">{data?.form?.message?.label}</span>
                <textarea
                  name={data?.form?.message?.name}
                  placeholder={data?.form?.message?.label}
                  rows={3}
                  className={`${field} resize-none pt-2`}
                />
              </label>
              <button
                type="submit"
                className={cn(buttonVariants({ variant: "dark" }), "px-7")}
              >
                {data?.form?.submit}
                <Image
                  src="/icons/chevron-accent.svg"
                  alt=""
                  width={7}
                  height={4}
                  className="-rotate-90"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
