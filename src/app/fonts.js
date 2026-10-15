import { Figtree, Libre_Caslon_Text } from "next/font/google";

// ponytail: stand-ins for the licensed Figma fonts (LincolnMillerB / Lincoln Proxima Nova / Xenon Nue).
// Swap to next/font/local with the brand files once supplied — the CSS variables stay the same.
export const display = Libre_Caslon_Text({ variable: "--font-lincoln-display", subsets: ["latin"], weight: "400" });

export const sans = Figtree({ variable: "--font-lincoln-sans", subsets: ["latin"] });
