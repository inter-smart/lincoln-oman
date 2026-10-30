"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useOffersLoading } from "@/components/layout/common/OffersLoading";
import { useLocale } from "@/components/ui/locale-link";
import { localizedHref } from "@/i18n/config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { slugify } from "@/lib/slugify";

const ALL = "all";

// "Choose location" dropdown. Picking a location reloads the server page with ?location=<slug>
// (the page maps the slug back to the id for the API); "All locations" goes back to the plain URL.
export default function LocationFilter({
  locations,
  value,
  label,
  allLabel,
  basePath,
}) {
  const router = useRouter();
  const locale = useLocale();
  // Shares the transition with the offer list (spinner overlay); falls back to a local one without the provider.
  const shared = useOffersLoading();
  const [localPending, startLocalTransition] = useTransition();
  const isPending = shared?.isPending ?? localPending;
  const startTransition = shared?.startTransition ?? startLocalTransition;
  // The choice is kept locally so it shows at once; the server page can take a while to re-render.
  const [selected, setSelected] = useState(value ?? "");
  const [prevValue, setPrevValue] = useState(value);

  // Follow the URL again when it changes (back/forward, "Load more", "All locations").
  if (value !== prevValue) {
    setPrevValue(value);
    setSelected(value ?? "");
  }

  return (
    <Select
      name="location"
      value={selected}
      onValueChange={(slug) => {
        setSelected(slug === ALL ? "" : slug);
        startTransition(() =>
          router.push(
            localizedHref(
              slug === ALL ? basePath : `${basePath}?location=${slug}`,
              locale,
            ),
            {
              scroll: false,
            },
          ),
        );
      }}
    >
      <SelectTrigger
        aria-label={label}
        aria-busy={isPending}
        className="h-11 w-full rounded-sm border-silver/40 bg-white px-4 text-sm text-ink shadow-none aria-busy:opacity-70 data-placeholder:text-ink data-[size=default]:h-11 sm:w-55 sm:text-[15px] sm:data-[size=default]:h-12 lg:text-sm xl:w-[calc(256*var(--rr))] xl:text-fluid-16 xl:data-[size=default]:h-[max(40px,calc(46*var(--rr)))] [&_svg]:text-ember!"
      >
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent
        position="popper"
        align="end"
        className="border-silver/40 bg-white text-ink"
      >
        <SelectItem
          value={ALL}
          className="text-sm focus:bg-silver/20 focus:text-ink sm:text-[15px] lg:text-sm xl:text-fluid-16"
        >
          {allLabel}
        </SelectItem>
        {locations.map((location) => (
          <SelectItem
            key={location.id}
            value={slugify(location.name)}
            className="text-sm focus:bg-silver/20 focus:text-ink sm:text-[15px] lg:text-sm xl:text-fluid-16"
          >
            {location.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
