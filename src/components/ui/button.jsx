import { cva } from "class-variance-authority";

// Pill button from the Figma button components: outlined by default, filled slate on hover/focus.
export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-[6px] rounded-full border text-[14px] leading-none tracking-[0.7px] whitespace-nowrap transition-[background-color,border-color,color] duration-300 ease-out hover:border-slate hover:bg-slate hover:text-white focus-visible:border-slate focus-visible:bg-slate focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current cursor-pointer",
  {
    variants: {
      variant: {
        light: "border-white text-white",
        dark: "border-coal text-coal",
      },
      size: {
        default: "h-[42px] px-[24px]",
        lg: "h-[46px] px-[40px]",
      },
    },
    defaultVariants: { variant: "light", size: "default" },
  },
);
