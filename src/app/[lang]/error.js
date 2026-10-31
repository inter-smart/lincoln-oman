"use client";

import { useEffect } from "react";
import { useLabels } from "@/components/layout/common/I18nProvider";
import ButtonLink from "@/components/layout/common/ButtonLink";
import { buttonVariants } from "@/components/ui/button";

// Shown when an API page could not load data (503, timeout, network). A real API 404 still gets not-found.js.
// This boundary catches any render error, so the cause is logged (production hides the message; use the digest to find it in the server log).
export default function ErrorPage({ error, retry }) {
  const ui = useLabels();
  useEffect(() => {
    console.error("Page error:", error?.message, error?.digest);
  }, [error]);
  return (
    <section className="flex min-h-svh items-center bg-night py-40 text-center text-white">
      <div className="container">
        <p
          aria-hidden="true"
          className="font-display text-[96px] leading-none text-silver sm:text-[140px] xl:text-[calc(200*var(--rr))]"
        >
          503
        </p>
        <h1 className="mt-4 title xl:mt-[calc(24*var(--rr))]">
          {ui.serviceUnavailable}
        </h1>
        <p className="mx-auto mt-3 max-w-[520px] text-sm leading-[26px] text-silver sm:text-[15px] xl:text-fluid-16">
          {ui.serviceUnavailableText}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2.5 xl:mt-[calc(36*var(--rr))]">
          <button
            type="button"
            onClick={() => retry()}
            className={buttonVariants({ variant: "light" })}
          >
            {ui.tryAgain}
          </button>
          <ButtonLink
            data={{ label: ui.backToHome, href: "/" }}
            variant="light"
            arrow="white"
          />
        </div>
      </div>
    </section>
  );
}
