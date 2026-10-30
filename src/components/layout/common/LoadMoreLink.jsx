"use client";

import Image from "next/image";
import { useLinkStatus } from "next/link";
import { useLabels } from "@/components/layout/common/I18nProvider";
import Link from "@/components/ui/locale-link";
import { buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

// Must sit inside the <Link> to read its status. The box keeps the chevron's width, so the button doesn't shift.
function Pending() {
  const { pending } = useLinkStatus();
  const labels = useLabels();
  return (
    <span className="relative flex h-3 w-3 items-center justify-center">
      {pending ? (
        <>
          <Spinner className="size-3 border-[1.5px]" />
          <span role="status" className="sr-only">
            {labels.loading}
          </span>
        </>
      ) : (
        <Image
          src="/icons/chevron-accent.svg"
          alt=""
          width={7}
          height={4}
          className="-rotate-90"
        />
      )}
    </span>
  );
}

// "Load More" pill: ButtonLink's look, with a spinner in place of the chevron while the next page loads.
// prefetch is off because a prefetched route skips the pending state.
export default function LoadMoreLink({ data, variant = "dark" }) {
  if (!data?.label) return null;

  return (
    <Link
      href={data.href}
      scroll={false}
      prefetch={false}
      className={buttonVariants({ variant })}
    >
      {data.label}
      <Pending />
    </Link>
  );
}
