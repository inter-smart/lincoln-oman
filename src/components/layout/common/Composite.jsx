import Image from "next/image";

// Renders a Figma icon that exports as several positioned SVG parts.
// parts: [src, x, y, width, height, maskSrc?] in px inside a width × height box.
// HTML width/height attributes must be integers, so exact sub-pixel sizes go in the style.
export default function Composite({ parts, width, height, className = "" }) {
  return (
    <span
      aria-hidden
      className={`relative block shrink-0 overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {parts.map(([src, x, y, w, h, mask]) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={Math.ceil(w)}
          height={Math.ceil(h)}
          className="absolute max-w-none"
          style={{
            left: x,
            top: y,
            width: w,
            height: h,
            ...(mask && {
              maskImage: `url(${mask})`,
              maskSize: "100% 100%",
              maskRepeat: "no-repeat",
            }),
          }}
        />
      ))}
    </span>
  );
}

// Steering-wheel rail icon (Figma "Group 51" row 4), positions from the design.
export const wheelIcon = {
  width: 21.8,
  height: 20.1,
  parts: [
    ["/icons/wheel-part-1.svg", 9.03, 11.75, 3.73632, 6.74778],
    ["/icons/wheel-part-2.svg", 9.03, 11.75, 3.73627, 6.74778],
    ["/icons/wheel-part-3.svg", 5.06, 7.87, 13.4681, 5.19816],
    ["/icons/wheel-part-4.svg", 3.07, 0, 15.6065, 4.90774],
    ["/icons/wheel-part-5.svg", 2.76, 8.09, 11.0263, 5.55573],
    ["/icons/wheel-part-6.svg", 2.8, 10, 4.79202, 0.656969],
    ["/icons/wheel-part-7.svg", 14.21, 10, 4.79202, 0.656969],
    ["/icons/wheel-part-8.svg", 10.58, 15.33, 0.656969, 2.9925],
    ["/icons/wheel-part-9.svg", 0, 2.72, 21.7896, 17.3707],
  ],
};

// "Crafted by" agency logo (Figma footer 251:457); the clip-path rectangle is the box's overflow-hidden.
const c = (n) => `/icons/credit/${n}.svg`;
export const creditLogo = {
  width: 96.5,
  height: 14.98,
  parts: [
    [c("v8"), 1.15, 10.9, 0.96, 1.45],
    [c("g8"), 6.91, 5.23, 3.07, 4.17, c("g7")],
    [c("v9"), 2.11, 7.23, 4.61, 4.28],
    [c("g11"), 0.96, 5.56, 3.26, 4.56, c("g10")],
    [c("g13"), 0.58, 7.62, 10.37, 7.34, c("g12")],
    [c("g15"), 0, 0, 10.18, 7.28, c("g14")],
    [c("v10"), 52.22, 3.22, 6.91, 8.51],
    [c("v11"), 61.06, 3.28, 8.83, 8.45],
    [c("v12"), 70.85, 3.28, 9.41, 8.4],
    [c("v13"), 89.47, 3.28, 6.91, 8.4],
    [c("v14"), 81.22, 3.28, 7.68, 8.45],
    [c("v15"), 13.82, 5.84, 1.92, 5.89],
    [c("v16"), 17.66, 3.28, 7.1, 8.45],
    [c("v17"), 25.92, 3.28, 6.91, 8.45],
    [c("v18"), 34.18, 3.28, 6.34, 8.45],
    [c("v19"), 42.05, 3.28, 7.87, 8.45],
    [c("v20"), 13.82, 3.28, 1.92, 1.89],
  ],
};
