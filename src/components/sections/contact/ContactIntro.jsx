import Image from "next/image";
import DatePicker from "@/components/layout/common/DatePicker";
import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const field =
  "w-full border-0 border-b border-ink bg-transparent pb-3 xl:pb-[calc(18*var(--rr))] text-sm text-ink placeholder:text-ink focus-visible:border-ember focus-visible:outline-none sm:text-base xl:text-fluid-16";

export default function ContactIntro({ data }) {
  return (
    <section className="block h-auto w-full py-10 sm:py-[50px_60px] lg:py-[60px_75px] 2xl:py-[75px_90px] 3xl:py-[90px_120px]">
      <div className="container grid gap-7.5 sm:gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-17.5 2xl:gap-x-20 3xl:gap-x-[calc(100*var(--rr))]">
        <div data-reveal>
          <h1 className="title">{data?.title}</h1>
          <p className="mt-2.5 text-xl leading-[1.3] tracking-[0.05em] text-ink sm:text-2xl xl:text-[28px] 2xl:mt-3.75 2xl:text-[37px] 3xl:text-[45px]">
            {data?.lead}
          </p>
          {data?.text && (
            <p className="mt-3 max-w-[calc(520*var(--rr))] text-[13px] leading-[1.8] text-ink sm:text-sm 2xl:mt-5 2xl:text-base">
              {data.text}
            </p>
          )}
          {data?.hours && (
            <>
              <h2 className="mt-5 font-display text-base text-ink sm:mt-5 lg:text-lg 2xl:mt-8.75 2xl:text-2xl 3xl:text-3xl">
                {data.hours.title}
              </h2>
              <ul className="mt-3 space-y-1.25 text-[13px] text-ink sm:text-sm xl:mt-3.75 2xl:space-y-2.5 2xl:text-base">
                {data.hours.items?.map((item) => (
                  <li key={item.id} className={cn(item.closed && "text-ember")}>
                    {item.label}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <form
          data-reveal
          action={data?.form?.action}
          method="post"
          style={{ "--reveal-delay": "0.1s" }}
        >
          <h2 className="title">{data?.form?.title}</h2>
          {data?.form?.intro && (
            <p className="mt-2 text-[13px] text-ink sm:text-sm 2xl:text-base">
              {data.form.intro}
            </p>
          )}
          <div className="mt-6 grid gap-x-[calc(56*var(--rr))] gap-y-5 sm:grid-cols-2 lg:gap-y-6.25 xl:mt-[calc(36*var(--rr))] 2xl:gap-y-[calc(50*var(--rr))]">
            {data?.form?.fields?.map((input) => (
              <div
                key={input.name}
                className={cn("relative", input.wide && "sm:col-span-2")}
              >
                {input.date ? (
                  <DatePicker
                    name={input.name}
                    label={input.label}
                    className={`${field} pt-2`}
                  />
                ) : input.options ? (
                  <Select name={input.name} required={!input.optional}>
                    <SelectTrigger
                      aria-label={
                        input.optional
                          ? input.label
                          : `${input.label} (required)`
                      }
                      className={`${field} h-auto justify-between rounded-none px-0 pt-2 shadow-none data-placeholder:text-ink data-[size=default]:h-auto [&_svg]:text-ember!`}
                    >
                      <SelectValue
                        placeholder={`${input.label}${input.optional ? "" : "*"}`}
                      />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="bg-white text-ink"
                    >
                      {input.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <label className="block">
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
                )}
              </div>
            ))}
            <div
              className={cn(
                "flex items-end gap-4 sm:col-span-2 sm:gap-[calc(34*var(--rr))]",
                data?.form?.terms && "flex-col items-stretch",
              )}
            >
              <label className="block flex-1">
                <span className="sr-only">{data?.form?.message?.label}</span>
                <textarea
                  name={data?.form?.message?.name}
                  placeholder={data?.form?.message?.label}
                  rows={2}
                  className={`${field} resize-none pt-2`}
                />
              </label>
              {data?.form?.terms && (
                <div className="space-y-2.5 text-[13px] text-ink sm:text-sm 2xl:text-base">
                  <p>{data.form.terms.text}</p>
                  <fieldset className="flex gap-6">
                    <legend className="sr-only">{data.form.terms.text}</legend>
                    {data.form.terms.choices?.map((choice) => (
                      <label key={choice} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="marketing"
                          value={choice.toLowerCase()}
                          className="size-4 shrink-0 accent-slate"
                        />
                        {choice}
                      </label>
                    ))}
                  </fieldset>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="agree"
                      required
                      className="size-4 shrink-0 accent-slate"
                    />
                    {data.form.terms.agree}
                  </label>
                </div>
              )}
              <button
                type="submit"
                className={cn(
                  buttonVariants({ variant: "dark" }),
                  "px-7",
                  data?.form?.terms && "self-start",
                )}
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
