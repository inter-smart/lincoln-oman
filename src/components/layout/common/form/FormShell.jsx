"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { submitForm } from "@/app/actions/forms";
import { useLabels } from "@/components/layout/common/I18nProvider";
import { useLocale } from "@/components/ui/locale-link";
import { thankYouHref } from "@/data/thank-you";
import { localizedHref } from "@/i18n/config";
import { schemas } from "@/lib/validation/forms";
import { cn } from "@/lib/utils";

// How long the success / error line under the form stays visible.
const STATUS_MS = 5000;

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

// Resolves with a reCAPTCHA v3 token for `action`, or rejects when the script is blocked / not loaded.
function getToken(action) {
  return new Promise((resolve, reject) => {
    const grecaptcha = window.grecaptcha;
    if (!SITE_KEY || !grecaptcha?.ready) {
      reject(new Error("reCAPTCHA unavailable"));
      return;
    }
    const timer = setTimeout(
      () => reject(new Error("reCAPTCHA timeout")),
      8000,
    );
    grecaptcha.ready(() => {
      grecaptcha.execute(SITE_KEY, { action }).then(
        (token) => {
          clearTimeout(timer);
          resolve(token);
        },
        (error) => {
          clearTimeout(timer);
          reject(error);
        },
      );
    });
  });
}

const DEFAULTS = {
  contact: { name: "", email: "", phone: "", message: "" },
  owners: { name: "", email: "", subject: "", message: "" },
  offers: { name: "", email: "", subject: "", message: "" },
  offer: {
    name: "",
    email: "",
    phone: "",
    model: "",
    interested: "",
    message: "",
  },
  quote: {
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    message: "",
    marketing: "no",
    agree: false,
  },
  testDrive: {
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    date: "",
    time: "",
    message: "",
    marketing: "no",
    agree: false,
  },
};

/**
 * Client wrapper for every enquiry form: react-hook-form + the shared zod schema (validates on every change),
 * reCAPTCHA v3 token on submit, then the `submitForm` server action. The fields are children (see FormFields.jsx).
 * `tone`: "dark" when the form sits on the dark card (EnquiryForm), "light" on white.
 * `successHref`: when set, a successful submit navigates there (e.g. the test-drive thank-you page) instead of only showing the status line.
 */
export default function FormShell({
  formKey,
  tone = "light",
  successHref,
  className,
  children,
  ...props
}) {
  const methods = useForm({
    resolver: zodResolver(schemas[formKey]),
    mode: "onChange",
    defaultValues: DEFAULTS[formKey],
  });
  const router = useRouter();
  const lang = useLocale();
  const labels = useLabels();
  const { handleSubmit, setError, reset, formState } = methods;
  const [status, setStatus] = useState(null); // { ok, message }

  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(null), STATUS_MS);
    return () => clearTimeout(timer);
  }, [status]);

  const onSubmit = handleSubmit(async (values) => {
    setStatus(null);
    let token;
    try {
      token = await getToken(formKey);
    } catch {
      setStatus({
        ok: false,
        message: labels.spamCheck,
      });
      return;
    }

    let result;
    try {
      result = await submitForm(formKey, values, token, lang);
    } catch {
      result = { ok: false, message: labels.network };
    }

    if (result.ok) {
      reset();
      router.push(localizedHref(successHref ?? thankYouHref(formKey), lang));
      return;
    }
    for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
      setError(field, { type: "server", message });
    }
    setStatus({ ok: false, message: result.message });
  });

  return (
    <FormProvider {...methods}>
      {SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
          strategy="lazyOnload"
        />
      )}
      <form noValidate onSubmit={onSubmit} className={className} {...props}>
        {children}
        <div
          role="status"
          aria-live="polite"
          className={cn(
            "mt-4 text-sm sm:text-base",
            status &&
              (status.ok
                ? "font-medium"
                : tone === "dark"
                  ? "text-[#ffb4a6]"
                  : "text-[#b3261e]"),
            !status && "sr-only",
          )}
        >
          {status?.message}
        </div>
      </form>
    </FormProvider>
  );
}
