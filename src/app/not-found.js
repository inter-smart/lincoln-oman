import ButtonLink from "@/components/layout/common/ButtonLink";

export const metadata = { title: "Page Not Found" };

const actions = [
  { id: "home", label: "Back to Home", href: "/" },
  { id: "contact", label: "Contact Us", href: "/contact-us" },
];

export default function NotFound() {
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
          className="title mt-4 xl:mt-[calc(24*var(--rr))]"
        >
          Page not found
        </h1>
        <p
          data-reveal
          style={{ "--reveal-delay": "0.2s" }}
          className="mx-auto mt-3 max-w-[520px] text-sm leading-[26px] text-silver sm:text-[15px] xl:text-fluid-16"
        >
          The page you are looking for may have moved or no longer exists.
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
