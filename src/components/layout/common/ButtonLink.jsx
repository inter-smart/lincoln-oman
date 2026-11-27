import Image from "next/image";
import Link from "@/components/ui/locale-link";
import DownloadLink from "@/components/layout/common/DownloadLink";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Pill link + chevron. The chevron SVG points down in Figma and is rotated, as in the design.
export default function ButtonLink({
  data,
  variant,
  size,
  arrow = "accent",
  className,
  scroll,
  isExternal = false,
}) {
  if (!data?.label) return null;

  const classes = cn(buttonVariants({ variant, size }), className);
  const icon = (
    <Image
      src={
        arrow === "white"
          ? "/icons/chevron-hero.svg"
          : "/icons/chevron-accent.svg"
      }
      alt="Icon"
      title="Icon"
      aria-hidden="true"
      width={7}
      height={4}
      className="-rotate-90 rtl:rotate-90"
    />
  );

  // Not the locale Link: it would prefix the file URL with /en.
  if (data.download) {
    return (
      <DownloadLink href={data.href} label={data.label} className={classes}>
        {icon}
      </DownloadLink>
    );
  }

  return (
    <Link
      href={data?.href ?? "#"}
      scroll={scroll}
      target={data.isExternal || isExternal ? "_blank" : "_self"}
      className={classes}
    >
      {data.label}
      {icon}
    </Link>
  );
}
