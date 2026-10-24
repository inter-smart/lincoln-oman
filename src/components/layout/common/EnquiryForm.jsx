import Image from "next/image";
import EmblemMark from "@/components/layout/common/EmblemMark";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-sm bg-white px-4 text-sm text-ink placeholder:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white focus-visible:outline-solid sm:text-base xl:text-fluid-16";

// "How may I help you?" card: photo beside a short enquiry form. Native validation only;
// labels are visually hidden because the design shows them as placeholders.
// Without data.image the left column is the emblem watermark + title (special-offers band).
export default function EnquiryForm({ data }) {
  return (
    <section className="pb-(--section-space)">
      <div className="container">
        <div
          data-reveal
          className="grid items-center gap-6 rounded-[10px] bg-night p-4 text-white sm:rounded-[15px] sm:p-6 lg:grid-cols-[minmax(0,455fr)_minmax(0,1053fr)] lg:gap-8 xl:gap-[calc(45*var(--rr))] xl:py-[calc(45*var(--rr))] xl:ps-[calc(38*var(--rr))] xl:pe-[calc(50*var(--rr))] 2xl:rounded-[20px]"
        >
          {data?.image ? (
            <div className="relative aspect-455/359 overflow-hidden rounded-[10px] max-lg:hidden">
              <Image
                src={data.image.src}
                alt={data.image.alt ?? ""}
                fill
                sizes="(min-width: 992px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex items-center gap-5 xl:gap-[calc(35*var(--rr))]">
              <EmblemMark className="h-20 shrink-0 bg-white/10 sm:h-32 xl:h-[calc(270*var(--rr))]" />
              <h2 className="title whitespace-pre-line">{data?.title}</h2>
            </div>
          )}
          <form action={data?.action} method="post">
            {data?.image && <h2 className="title">{data.title}</h2>}
            <div
              className={cn(
                "grid gap-3.5 sm:grid-cols-3",
                data?.image && "mt-5 xl:mt-[calc(30*var(--rr))]",
              )}
            >
              {data?.fields?.map((input) => (
                <label key={input.name} className="block">
                  <span className="sr-only">{input.label} (required)</span>
                  <input
                    type={input.type}
                    name={input.name}
                    autoComplete={input.autoComplete}
                    placeholder={`${input.label}*`}
                    required
                    className={`${field} h-12`}
                  />
                </label>
              ))}
            </div>
            <label className="mt-4 block">
              <span className="sr-only">{data?.message?.label}</span>
              <textarea
                name={data?.message?.name}
                placeholder={data?.message?.label}
                rows={4}
                className={`${field} h-32.5 resize-none py-3`}
              />
            </label>
            <div className="mt-5 flex justify-end">
              <button
                type="submit"
                className={cn(buttonVariants({ variant: "light" }), "px-7")}
              >
                {data?.submit}
                <Image
                  src="/icons/chevron-accent.svg"
                  alt=""
                  width={7}
                  height={4}
                  className="-rotate-90"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
