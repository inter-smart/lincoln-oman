import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge that the custom `text-fluid-*` utility (globals.css) is a font size, not a text colour.
const twMerge = extendTailwindMerge({
  extend: { classGroups: { "font-size": [{ "text-fluid": [(value) => /^\d+$/.test(value)] }] } },
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
