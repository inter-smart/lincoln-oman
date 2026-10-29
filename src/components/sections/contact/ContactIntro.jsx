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

// `data` is the CMS block (title, description, working_hours_title, working_hours_description, enquiry_title);
// `form` is the static form definition (fields, action, submit …) the API does not send.
export default function ContactIntro({ data, form }) {
  return (
    <section className="block h-auto w-full py-10 sm:py-[50px_60px] lg:py-[60px_75px] 2xl:py-[75px_90px] 3xl:py-[90px_120px]">
      <div className="container grid gap-7.5 sm:gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-17.5 2xl:gap-x-20 3xl:gap-x-[calc(100*var(--rr))]">
        <div data-reveal>
          <h1 className="title">{data?.title}</h1>
          <div
            className="mt-2.5 text-xl leading-[1.3] tracking-[0.05em] text-ink sm:text-2xl xl:text-[28px] 2xl:mt-3.75 2xl:text-[37px] 3xl:text-[45px]"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          />
          {data?.text && (
            <p className="mt-3 max-w-[calc(520*var(--rr))] text-[13px] leading-[1.8] text-ink sm:text-sm 2xl:mt-5 2xl:text-base">
              {data.text}
            </p>
          )}
          {data?.working_hours_description && (
            <>
              <h2 className="mt-5 font-display text-base text-ink sm:mt-5 lg:text-lg 2xl:mt-8.75 2xl:text-2xl 3xl:text-3xl">
                {data.working_hours_title}
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.working_hours_description,
                }}
              />
            </>
          )}
        </div>
        <form
          data-reveal
          action={form?.action}
          method="post"
          style={{ "--reveal-delay": "0.1s" }}
        >
          <h2 className="title">{data?.enquiry_title}</h2>
          {form?.intro && (
            <p className="mt-2 text-[13px] text-ink sm:text-sm 2xl:text-base">
              {form.intro}
            </p>
          )}
          <div className="mt-6 grid gap-x-[calc(56*var(--rr))] gap-y-5 sm:grid-cols-2 lg:gap-y-6.25 xl:mt-[calc(36*var(--rr))] 2xl:gap-y-[calc(50*var(--rr))]">
            {form?.fields?.map((input) => (
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
                form?.terms && "flex-col items-stretch",
              )}
            >
              <label className="block flex-1">
                <span className="sr-only">{form?.message?.label}</span>
                <textarea
                  name={form?.message?.name}
                  placeholder={form?.message?.label}
                  rows={2}
                  className={`${field} resize-none pt-2`}
                />
              </label>
              {form?.terms && (
                <div className="space-y-2.5 text-[13px] text-ink sm:text-sm 2xl:text-base">
                  <p>{form.terms.text}</p>
                  <fieldset className="flex gap-6">
                    <legend className="sr-only">{form.terms.text}</legend>
                    {form.terms.choices?.map((choice) => (
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
                    {form.terms.agree}
                  </label>
                </div>
              )}
              <button
                type="submit"
                className={cn(
                  buttonVariants({ variant: "dark" }),
                  "px-7",
                  form?.terms && "self-start",
                )}
              >
                {form?.submit}
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
