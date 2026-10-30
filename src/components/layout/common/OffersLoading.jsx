"use client";

import { createContext, useContext, useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";

const OffersLoadingContext = createContext(null);

// Shares one navigation transition between the location filter and the (server-rendered) offer list.
export function OffersLoadingProvider({ children }) {
  const [isPending, startTransition] = useTransition();
  return (
    <OffersLoadingContext.Provider value={{ isPending, startTransition }}>
      {children}
    </OffersLoadingContext.Provider>
  );
}

export function useOffersLoading() {
  return useContext(OffersLoadingContext);
}

// Dims the list and shows a centred spinner while a new filter result is loading.
export function OffersLoadingArea({ children }) {
  const isPending = useOffersLoading()?.isPending ?? false;
  return (
    <div className="relative" aria-busy={isPending}>
      <div
        className={
          isPending
            ? "pointer-events-none opacity-40 transition-opacity"
            : "transition-opacity"
        }
      >
        {children}
      </div>
      {isPending && (
        <div
          role="status"
          className="absolute inset-x-0 top-24 flex justify-center text-slate"
        >
          <Spinner className="size-10 border-[3px]" />
          <span className="sr-only">Loading offers…</span>
        </div>
      )}
    </div>
  );
}
