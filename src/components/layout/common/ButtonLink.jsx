import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Pill link + chevron. The chevron SVG points down in Figma and is rotated, as in the design.
export default function ButtonLink({ data, variant, size, arrow = "accent", className, scroll, isExternal = false }) {
  if (!data?.label) return null;

  return (
    <Link href={data?.href ?? "#"} scroll={scroll} target={(data.isExternal || isExternal) ? "_blank" : "_self"} className={cn(buttonVariants({ variant, size }), className)}>
      {data.label}
      <Image
        src={arrow === "white" ? "/icons/chevron-hero.svg" : "/icons/chevron-accent.svg"}
        alt=""
        width={7}
        height={4}
        className="-rotate-90"
      />
    </Link>
  );
}
