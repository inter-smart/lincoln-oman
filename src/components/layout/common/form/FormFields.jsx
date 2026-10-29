"use client";

import Image from "next/image";
import { Controller, useFormContext } from "react-hook-form";
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

// "pill": white inputs on the dark enquiry card. "underline": bottom-border inputs on white (contact pages).
const VARIANT = {
  pill: {
    field:
      "w-full rounded-sm bg-white px-4 text-sm text-ink placeholder:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white focus-visible:outline-solid aria-invalid:outline-2 aria-invalid:outline-offset-2 aria-invalid:outline-[#ffb4a6] aria-invalid:outline-solid sm:text-base xl:text-fluid-16",
    input: "h-12",
    textarea: "h-32.5 resize-none py-3",
    select:
      "h-12 data-[placeholder]:text-ink data-[size=default]:h-12 [&_svg]:text-ember!",
    error: "text-[#ffb4a6]",
    rows: 4,
  },
  underline: {
    field:
      "w-full border-0 border-b border-ink bg-transparent pb-3 xl:pb-[calc(18*var(--rr))] text-sm text-ink placeholder:text-ink focus-visible:border-ember focus-visible:outline-none aria-invalid:border-[#b3261e] sm:text-base xl:text-fluid-16",
    input: "pt-2",
    textarea: "resize-none pt-2",
    select:
      "h-auto justify-between rounded-none px-0 pt-2 shadow-none data-placeholder:text-ink data-[size=default]:h-auto [&_svg]:text-ember!",
    error: "text-[#b3261e]",
    rows: 2,
  },
};

const MAX = { name: 60, email: 254, phone: 20, message: 1000 };

function FieldError({ id, message, variant }) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      className={cn(
        "mt-1.5 text-xs leading-snug sm:text-sm",
        VARIANT[variant].error,
      )}
    >
      {message}
    </p>
  );
}

function useField(name) {
  const { register, control, formState, watch } = useFormContext();
  const error = formState.errors[name]?.message;
  return {
    register,
    control,
    error,
    errorId: `${name}-error`,
    describedBy: error ? `${name}-error` : undefined,
    watch,
  };
}

export function TextField({
  name,
  label,
  type = "text",
  autoComplete,
  variant = "pill",
  className,
}) {
  const { register, error, errorId, describedBy } = useField(name);
  const v = VARIANT[variant];
  return (
    <div className={cn("relative", className)}>
      <label className="block">
        <span className="sr-only">{label} (required)</span>
        <input
          type={type}
          autoComplete={autoComplete}
          inputMode={
            type === "tel" ? "tel" : type === "email" ? "email" : undefined
          }
          maxLength={MAX[name]}
          placeholder={`${label}*`}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${v.field} ${v.input}`}
          {...register(name)}
        />
      </label>
      <FieldError id={errorId} message={error} variant={variant} />
    </div>
  );
}

export function TextareaField({
  name = "message",
  label,
  optional,
  variant = "pill",
  className,
}) {
  const { register, error, errorId, describedBy, watch } = useField(name);
  const v = VARIANT[variant];
  const length = (watch(name) ?? "").length;
  return (
    <div className={cn("relative", className)}>
      <label className="block">
        <span className="sr-only">
          {label}
          {!optional && " (required)"}
        </span>
        <textarea
          rows={v.rows}
          maxLength={MAX.message}
          placeholder={`${label}${optional ? "" : "*"}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${v.field} ${v.textarea}`}
          {...register(name)}
        />
      </label>
      <div className="flex justify-between gap-3">
        <FieldError id={errorId} message={error} variant={variant} />
        {length > MAX.message * 0.8 && (
          <span
            className={cn("ms-auto mt-1.5 text-xs", VARIANT[variant].error)}
            aria-hidden
          >
            {length}/{MAX.message}
          </span>
        )}
      </div>
    </div>
  );
}

// `options`: strings or { value, label }.
export function SelectField({
  name,
  label,
  options,
  optional,
  variant = "pill",
  className,
}) {
  const { control, error, errorId, describedBy } = useField(name);
  const v = VARIANT[variant];
  return (
    <div className={cn("relative", className)}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            name={field.name}
            value={field.value ?? ""}
            onValueChange={field.onChange}
            onOpenChange={(open) => !open && field.onBlur()}
          >
            <SelectTrigger
              type="button"
              aria-label={optional ? label : `${label} (required)`}
              aria-invalid={error ? true : undefined}
              aria-describedby={describedBy}
              className={`${v.field} ${v.select}`}
            >
              <SelectValue placeholder={`${label}${optional ? "" : "*"}`} />
            </SelectTrigger>
            <SelectContent position="popper" className="bg-white text-ink">
              {options.map((option) => {
                const item =
                  typeof option === "string"
                    ? { value: option, label: option }
                    : option;
                return (
                  <SelectItem key={item.value} value={String(item.value)}>
                    {item.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        )}
      />
      <FieldError id={errorId} message={error} variant={variant} />
    </div>
  );
}

export function DateField({ name, label, variant = "underline", className }) {
  const { control, error, errorId, describedBy } = useField(name);
  const v = VARIANT[variant];
  return (
    <div className={cn("relative", className)}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            id={name}
            label={label}
            className={`${v.field} ${v.input}`}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            invalid={Boolean(error)}
            describedBy={describedBy}
          />
        )}
      />
      <FieldError id={errorId} message={error} variant={variant} />
    </div>
  );
}

// Marketing yes/no radios + the required "agree" checkbox (request-a-quote, book-a-test-drive).
export function TermsFields({ terms, variant = "underline" }) {
  const { register, formState } = useFormContext();
  const error = formState.errors.agree?.message;
  return (
    <div className="space-y-2.5 text-[13px] text-ink sm:text-sm 2xl:text-base">
      <p>{terms.text}</p>
      <fieldset className="flex gap-6">
        <legend className="sr-only">{terms.text}</legend>
        {terms.choices?.map((choice) => (
          <label key={choice} className="flex items-center gap-2">
            <input
              type="radio"
              value={choice.toLowerCase()}
              className="size-4 shrink-0 accent-slate"
              {...register("marketing")}
            />
            {choice}
          </label>
        ))}
      </fieldset>
      <div>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "agree-error" : undefined}
            className="size-4 shrink-0 accent-slate"
            {...register("agree")}
          />
          {terms.agree}
        </label>
        <FieldError id="agree-error" message={error} variant={variant} />
      </div>
    </div>
  );
}

export function SubmitButton({ children, variant = "light", className }) {
  const { formState } = useFormContext();
  const busy = formState.isSubmitting;
  return (
    <button
      type="submit"
      disabled={busy}
      aria-busy={busy}
      className={cn(
        buttonVariants({ variant }),
        "px-7 disabled:cursor-wait disabled:opacity-60",
        className,
      )}
    >
      {busy ? "Sending…" : children}
      <Image
        src="/icons/chevron-accent.svg"
        alt=""
        width={7}
        height={4}
        className="-rotate-90"
      />
    </button>
  );
}
