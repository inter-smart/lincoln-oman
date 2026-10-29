import FormShell from "@/components/layout/common/form/FormShell";
import {
  DateField,
  SelectField,
  SubmitButton,
  TermsFields,
  TextareaField,
  TextField,
} from "@/components/layout/common/form/FormFields";
import { cn } from "@/lib/utils";

export default function ContactIntro({ data, form }) {
  // Contact Us passes `form` separately (its CMS block has no form); quote / test drive carry it in data.form.
  const formData = form ?? data?.form;
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
          {data?.textHtml && (
            <div
              className="mt-3 max-w-[calc(520*var(--rr))] text-[13px] leading-[1.8] text-ink sm:text-sm 2xl:mt-5 2xl:text-base"
              dangerouslySetInnerHTML={{ __html: data.textHtml }}
            />
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
        <FormShell
          formKey={formData?.formKey ?? "contact"}
          data-reveal
          style={{ "--reveal-delay": "0.1s" }}
        >
          <h2 className="title">{formData?.title}</h2>
          {formData?.intro && (
            <p className="mt-2 text-[13px] text-ink sm:text-sm 2xl:text-base">
              {formData.intro}
            </p>
          )}
          {formData?.introHtml && (
            <div
              className="mt-2 text-[13px] text-ink sm:text-sm 2xl:text-base"
              dangerouslySetInnerHTML={{ __html: formData.introHtml }}
            />
          )}
          <div className="mt-6 grid gap-x-[calc(56*var(--rr))] gap-y-5 sm:grid-cols-2 lg:gap-y-6.25 xl:mt-[calc(36*var(--rr))] 2xl:gap-y-[calc(50*var(--rr))]">
            {formData?.fields?.map((input) => {
              const className = input.wide ? "sm:col-span-2" : undefined;
              if (input.date) {
                return (
                  <DateField
                    key={input.name}
                    name={input.name}
                    label={input.label}
                    className={className}
                  />
                );
              }
              if (input.options) {
                return (
                  <SelectField
                    key={input.name}
                    name={input.name}
                    label={input.label}
                    options={input.options}
                    optional={input.optional}
                    variant="underline"
                    className={className}
                  />
                );
              }
              return (
                <TextField
                  key={input.name}
                  name={input.name}
                  label={input.label}
                  type={input.type}
                  autoComplete={input.autoComplete}
                  variant="underline"
                  className={className}
                />
              );
            })}
            <div
              className={cn(
                "flex items-end gap-4 sm:col-span-2 sm:gap-[calc(34*var(--rr))]",
                formData?.terms && "flex-col items-stretch",
              )}
            >
              <TextareaField
                name={formData?.message?.name}
                label={formData?.message?.label}
                optional={formData?.message?.optional}
                variant="underline"
                className="flex-1"
              />
              {formData?.terms && <TermsFields terms={formData.terms} />}
              <SubmitButton
                variant="dark"
                className={formData?.terms && "self-start"}
              >
                {formData?.submit}
              </SubmitButton>
            </div>
          </div>
        </FormShell>
      </div>
    </section>
  );
}
