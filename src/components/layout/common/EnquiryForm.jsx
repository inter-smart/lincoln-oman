import Image from "next/image";
import EmblemMark from "@/components/layout/common/EmblemMark";
import FormShell from "@/components/layout/common/form/FormShell";
import {
  SelectField,
  SubmitButton,
  TextareaField,
  TextField,
} from "@/components/layout/common/form/FormFields";
import { cn } from "@/lib/utils";

// "How may I help you?" card: photo beside a short enquiry form. Fields, real-time zod validation and reCAPTCHA
// live in the client leaves under form/ (data.formKey picks the schema); labels are visually hidden because the design shows them as placeholders.
// Without data.image the left column is the emblem watermark + title (special-offers band).
export default function EnquiryForm({ data }) {
  // Content is either { title, image: { src, alt } } (local pages) or the CMS's { enquiry_title, enquiry_image: { path } }
  const title = data?.title ?? data?.enquiry_title;
  const image = data?.image?.src
    ? data.image
    : data?.enquiry_image?.path
      ? { src: data.enquiry_image.path, alt: title }
      : null;

  return (
    <section
      className={cn(
        "pb-(--section-space)",
        data?.spaced && "pt-8 sm:pt-10 xl:pt-[calc(55*var(--rr))]",
      )}
    >
      <div className="container">
        <div
          data-reveal
          className="grid items-center gap-6 rounded-[10px] bg-night p-4 text-white sm:rounded-[15px] sm:p-6 lg:grid-cols-[minmax(0,455fr)_minmax(0,1053fr)] lg:gap-8 xl:gap-[calc(45*var(--rr))] xl:py-[calc(45*var(--rr))] xl:ps-[calc(38*var(--rr))] xl:pe-[calc(50*var(--rr))] 2xl:rounded-[20px]"
        >
          {image ? (
            <div className="relative aspect-455/359 overflow-hidden rounded-[10px] max-lg:hidden">
              <Image
                src={image.src}
                alt={image.alt ?? ""}
                fill
                sizes="(min-width: 992px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex items-center gap-5 xl:gap-[calc(35*var(--rr))]">
              <EmblemMark className="h-20 shrink-0 bg-white/10 sm:h-32 xl:h-[calc(270*var(--rr))]" />
              <h2 className="title whitespace-pre-line">{title}</h2>
            </div>
          )}
          <FormShell formKey={data?.formKey ?? "contact"} tone="dark">
            {image && <h2 className="title">{title}</h2>}
            <div
              className={cn(
                "grid gap-3.5 sm:grid-cols-3",
                image && "mt-5 xl:mt-[calc(30*var(--rr))]",
              )}
            >
              {data?.fields?.map((input) => (
                <TextField
                  key={input.name}
                  name={input.name}
                  label={input.label}
                  type={input.type}
                  autoComplete={input.autoComplete}
                />
              ))}
            </div>
            {data?.selects && (
              <div className="mt-3.5 grid gap-3.5 sm:grid-cols-2">
                {data.selects.map((select) => (
                  <SelectField
                    key={select.name}
                    name={select.name}
                    label={select.label}
                    options={select.options}
                  />
                ))}
              </div>
            )}
            <TextareaField
              name={data?.message?.name}
              label={data?.message?.label}
              optional={data?.message?.optional}
              className="mt-4"
            />
            <div className="mt-5 flex justify-end">
              <SubmitButton>{data?.submit}</SubmitButton>
            </div>
          </FormShell>
        </div>
      </div>
    </section>
  );
}
