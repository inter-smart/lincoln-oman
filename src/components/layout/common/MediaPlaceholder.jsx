import Image from "next/image";
import { cn } from "@/lib/utils";

// Shown in place of an image or video the CMS did not send: the Lincoln logo on a dark box.
// It fills its parent, which must be positioned and sized. Dark bands pass `bg-coal` so the box stays visible;
// `faint` is for full-width backgrounds that carry text.
export default function MediaPlaceholder({ className, faint = false }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute inset-0 flex items-center justify-center bg-night",
        className,
      )}
    >
      <Image
        src="/images/lincoln-logo.svg"
        alt=""
        width={134}
        height={122}
        className={cn(
          "h-auto max-h-[70%] w-2/5 max-w-33.75 min-w-16 object-contain",
          faint && "opacity-35",
        )}
      />
    </span>
  );
}
