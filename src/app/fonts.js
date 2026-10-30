import {
  Figtree,
  IBM_Plex_Sans_Arabic,
  Libre_Caslon_Text,
} from "next/font/google";

// ponytail: stand-ins for the licensed Figma fonts (LincolnMillerB / Lincoln Proxima Nova / Xenon Nue).
// Swap to next/font/local with the brand files once supplied — the CSS variables stay the same.
export const display = Libre_Caslon_Text({
  variable: "--font-lincoln-display",
  subsets: ["latin"],
  weight: "400",
});

export const sans = Figtree({
  variable: "--font-lincoln-sans",
  subsets: ["latin"],
});

// Arabic glyphs (the two Latin stand-ins above have none). Applied under html[dir="rtl"] in globals.css;
// the browser still uses the Latin fonts for any English text inside Arabic pages. ponytail: confirm the face with the client.
export const arabic = IBM_Plex_Sans_Arabic({
  variable: "--font-lincoln-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
});
