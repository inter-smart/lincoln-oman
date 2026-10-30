import { getCurrentDictionary } from "@/i18n/get-dictionary";
import ButtonLink from "@/components/layout/common/ButtonLink";

export async function generateMetadata() {
  const { ui } = await getCurrentDictionary();
  return { title: ui.pageNotFound };
}

export default async function NotFound() {
  const { pages, ui } = await getCurrentDictionary();
  const actions = [
    { id: "home", label: ui.backToHome, href: "/" },
    { id: "contact", label: pages.contactUs, href: "/contact-us" },
  ];
  return (
    <section className="flex min-h-svh items-center bg-night py-40 text-center text-white">
      <div className="container">
        <p
          data-reveal
          aria-hidden="true"
          className="font-display text-[96px] leading-none text-silver sm:text-[140px] xl:text-[calc(200*var(--rr))]"
        >
          404
        </p>
        <h1
          data-reveal
          style={{ "--reveal-delay": "0.1s" }}
          className="mt-4 title xl:mt-[calc(24*var(--rr))]"
        >
          {ui.pageNotFound}
        </h1>
        <p
          data-reveal
          style={{ "--reveal-delay": "0.2s" }}
          className="mx-auto mt-3 max-w-[520px] text-sm leading-[26px] text-silver sm:text-[15px] xl:text-fluid-16"
        >
          {ui.notFoundText}
        </p>
        <div
          data-reveal
          style={{ "--reveal-delay": "0.3s" }}
          className="mt-8 flex flex-wrap justify-center gap-2.5 xl:mt-[calc(36*var(--rr))]"
        >
          {actions.map((a) => (
            <ButtonLink key={a.id} data={a} variant="light" arrow="white" />
          ))}
        </div>
      </div>
    </section>
  );
}
