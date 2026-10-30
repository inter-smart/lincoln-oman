import { cn } from "@/lib/utils";

// Ring spinner in the current text colour. Decorative: pair it with visible text or an sr-only label.
export function Spinner({ className }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-5 animate-spin rounded-full border-2 border-current border-t-transparent",
        className,
      )}
    />
  );
}
