import Image from "next/image";
import Link from "next/link";

// Inner-page trail; the separator is the small Lincoln emblem from the design. The last item is the current page.
export default function Breadcrumb({ items }) {
  if (!items?.length) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="container pt-5 sm:pt-6 xl:pt-[calc(33*var(--rr))]"
    >
      <ol className="flex flex-wrap items-center gap-x-[19px] gap-y-1 text-sm tracking-[0.8px] text-ink sm:text-base xl:text-fluid-16">
        {items.map((item, index) => (
          <li key={item.id} className="flex items-center gap-[19px]">
            {index > 0 && (
              <Image
                src="/icons/breadcrumb-emblem.svg"
                alt=""
                width={4}
                height={11}
              />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-opacity hover:opacity-70"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
