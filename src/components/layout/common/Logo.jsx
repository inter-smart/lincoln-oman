import Image from "next/image";

// The brand PNG holds emblem + wordmark side by side; the header stacks two crops of it, as in Figma.
// In the scrolled (compact) header the wordmark folds away and only the emblem stays.
export default function Logo({ className = "" }) {
  return (
    <span
      className={`flex aspect-135/120 h-auto w-33.75 flex-col items-center ${className}`}
    >
      {/* <span className="relative block h-[59px] w-[21px] overflow-hidden">
        <Image
          src="/images/logo.png"
          alt=""
          width={600}
          height={208}
          className="absolute top-0 left-[-0.46%] h-full w-[810.44%] max-w-none"
        />
      </span>
      <span className="grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-500 group-data-scrolled/header:grid-rows-[0fr] group-data-scrolled/header:opacity-0">
        <span className="overflow-hidden">
          <span className="relative mt-[2px] block h-[61px] w-[134px] overflow-hidden">
            <Image
              src="/images/logo.png"
              alt=""
              width={600}
              height={208}
              className="absolute top-0 left-[-29.84%] h-full w-[129.92%] max-w-none"
            />
          </span>
        </span>
      </span> */}
      <Image
        src={"/images/lincoln-logo.svg"}
        alt="Lincoln Logo"
        width={135}
        height={120}
        className="size-full object-contain"
      />
    </span>
  );
}
